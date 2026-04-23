// =============================================
// Change Status of product (single)
// =============================================
const buttonChangeStatus = document.querySelectorAll("[button-change-status]");
if (buttonChangeStatus.length > 0) {
    const formChangeStatus = document.querySelector("#form-change-status");
    const path = formChangeStatus.getAttribute("data-path");

    buttonChangeStatus.forEach(button => {
        button.addEventListener("click", () => {
            const statusCurrent = button.getAttribute("data-status");
            const id = button.getAttribute("data-id");
            const statusChange = statusCurrent === "active" ? "inactive" : "active";

            const action = path + `${statusChange}/${id}`;
            formChangeStatus.action = action;

            // Ensure hidden _method exists (method-override)
            let methodInput = formChangeStatus.querySelector("input[name='_method']");
            if (!methodInput) {
                methodInput = document.createElement('input');
                methodInput.type = 'hidden';
                methodInput.name = '_method';
                formChangeStatus.appendChild(methodInput);
            }
            methodInput.value = 'PATCH';
            formChangeStatus.submit();
        });
    });
}

// =============================================
// Button Delete product
// =============================================
const buttonDelete = document.querySelectorAll("[button-delete]");
if (buttonDelete.length > 0) {
    buttonDelete.forEach(button => {
        button.addEventListener("click", (e) => {
            e.preventDefault();
            const id = button.getAttribute("data-id");
            if (confirm("Bạn có chắc chắn muốn xóa sản phẩm này?")) {
                const formDelete = document.createElement("form");
                formDelete.method = "POST";
                formDelete.action = `/admin/products/delete/${id}`;

                const methodInput = document.createElement("input");
                methodInput.type = "hidden";
                methodInput.name = "_method";
                methodInput.value = "DELETE";
                formDelete.appendChild(methodInput);

                document.body.appendChild(formDelete);
                formDelete.submit();
            }
        });
    });
}

// =============================================
// Upload Image Preview
// =============================================
const uploadImage = document.querySelector("[upload-image]");
if (uploadImage) {
    const uploadImageInput   = uploadImage.querySelector("[upload-image-input]");
    const uploadImagePreview = uploadImage.querySelector("[upload-image-preview]");
    const closeImagePreview  = uploadImage.querySelector("[close-image-preview]");

    uploadImageInput.addEventListener("change", (e) => {
        const file = e.target.files[0];
        if (file) {
            uploadImagePreview.src = URL.createObjectURL(file);
            uploadImagePreview.style.display = "block";
            if (closeImagePreview) {
                closeImagePreview.style.display = "inline-block";
            }
        }
    });

    if (closeImagePreview) {
        closeImagePreview.addEventListener("click", () => {
            uploadImageInput.value = "";
            uploadImagePreview.src = "";
            uploadImagePreview.style.display = "none";
            closeImagePreview.style.display = "none";
        });
    }
}
// End Upload Image Preview

// Change Status of product
const buttonChangeStatus = document.querySelectorAll("[button-change-status]");
if (buttonChangeStatus.length > 0) {
    const formChangeStatus = document.querySelector("#form-change-status");
    const path = formChangeStatus.getAttribute("data-path");
    
    buttonChangeStatus.forEach(button => {
        button.addEventListener("click", () => {
            const statusCurrent = button.getAttribute("data-status");
            const id = button.getAttribute("data-id");

            const statusChange = statusCurrent === "active" ? "inactive" : "active";
            // console.log(statusCurrent);
            // console.log(id);
            // console.log(statusChange);
            
            const action = path + `${statusChange}/${id}`;
            formChangeStatus.action = action;
            // ensure hidden _method exists (method-override)
            let methodInput = formChangeStatus.querySelector("input[name='_method']");
            if (!methodInput) {
                methodInput = document.createElement('input');
                methodInput.type = 'hidden';
                methodInput.name = '_method';
                formChangeStatus.appendChild(methodInput);
            }
            methodInput.value = 'PATCH';
            formChangeStatus.submit();  
            console.log(action);                     
        });
    });
}

// Button Delete
const buttonDelete = document.querySelectorAll("[button-delete]");
if (buttonDelete.length > 0) {
    buttonDelete.forEach(button => {
        button.addEventListener("click", () => {
            const id = button.getAttribute("data-id");
            if (confirm("Bạn có chắc chắn muốn xóa sản phẩm này?")) {
                // Create a form to submit the DELETE request
                const formDelete = document.createElement("form");
                formDelete.method = "POST";
                formDelete.action = `/admin/products/delete/${id}`;
                // Add hidden input for method override
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

// Upload Image Preview
const uploadImage = document.querySelector("[upload-image]");
if (uploadImage) {
    const uploadImageInput = uploadImage.querySelector("[upload-image-input]");
    const uploadImagePreview = uploadImage.querySelector("[upload-image-preview]");
    const closeImagePreview = uploadImage.querySelector("[close-image-preview]");

    uploadImageInput.addEventListener("change", (e) => {
        const file = e.target.files[0];
        if (file) {
            uploadImagePreview.src = URL.createObjectURL(file);
            uploadImagePreview.style.display = "block";
            if(closeImagePreview) {
                closeImagePreview.style.display = "inline-block";
            }
        }
    });

    if(closeImagePreview) {
        closeImagePreview.addEventListener("click", () => {
            uploadImageInput.value = "";
            uploadImagePreview.src = "";
            uploadImagePreview.style.display = "none";
            closeImagePreview.style.display = "none";
        });
    }
}
// End Upload Image Preview


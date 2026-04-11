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


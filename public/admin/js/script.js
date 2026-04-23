const buttonsStatus = document.querySelectorAll("[button-status]");
const searchInput = document.querySelector("[search-input]");
const searchButton = document.getElementById("search-button");

let url = new URL(window.location.href);

// Set active button based on URL parameter
function setActiveButtonFromParam() {
    const statusParam = url.searchParams.get("status");
    buttonsStatus.forEach(btn => {
        const s = btn.getAttribute("button-status");
        if ((statusParam === null || statusParam === "") && s === "") {
            btn.classList.add("active");
        } else if (statusParam === s) {
            btn.classList.add("active");
        } else {
            btn.classList.remove("active");
        }
    });
}

// Event listeners for status filter buttons
if (buttonsStatus.length > 0) {
    setActiveButtonFromParam();
    buttonsStatus.forEach(button => {
        button.addEventListener("click", () => {
            const status = button.getAttribute("button-status");

            if (status) {
                url.searchParams.set("status", status);
            } else {
                url.searchParams.delete("status");
            }

            buttonsStatus.forEach(b => b.classList.remove("active"));
            button.classList.add("active");
            window.location.href = url.href;
        });
    });
}

// Search functionality
if (searchInput) {
    // prefill input from URL
    searchInput.value = url.searchParams.get("q") || "";

    const doSearch = () => {
        const q = searchInput.value.trim();
        if (q) url.searchParams.set("q", q);
        else url.searchParams.delete("q");
        // preserve status param if present
        window.location.href = url.href;
    };

    searchInput.addEventListener("keydown", (e) => {
        if (e.key === "Enter") {
            e.preventDefault();
            doSearch();
        }
    });

    if (searchButton) {
        searchButton.addEventListener("click", doSearch);
    }
}

// Pagination
const paginationButtons = document.querySelectorAll("[button-pagination]");
paginationButtons.forEach(button => {
    button.addEventListener("click", () => {
        const page = button.getAttribute("button-pagination");
        
        if (page) {
            url.searchParams.set("page", page);
            window.location.href = url.href;
        }
    });
});
// End Pagination

// Checkbox-multi
const checkboxMulti = document.querySelector("[checkbox-multi]");
if (checkboxMulti) {
    const inputCheckAll = checkboxMulti.querySelector("#check-all");
    const inputsId = checkboxMulti.querySelectorAll("input[name='id']");

    if (inputCheckAll) {
        inputCheckAll.addEventListener("click", () => {
            inputsId.forEach(input => input.checked = inputCheckAll.checked);
        });
    }

    if (inputsId.length > 0) {
        const updateCheckAllState = () => {
            const allChecked = Array.from(inputsId).every(i => i.checked);
            if (inputCheckAll) inputCheckAll.checked = allChecked;
        };
        updateCheckAllState();
        inputsId.forEach((input) => {
            input.addEventListener("change", updateCheckAllState);
        });
    }
}
// End Checkbox-multi

// Form change multi
const formChangeMulti = document.querySelector("#form-change-multi");
if (formChangeMulti) {
    formChangeMulti.addEventListener("submit", (e) => {
        e.preventDefault();

        const checkboxMulti = document.querySelector("[checkbox-multi]");
        const inputsChecked = checkboxMulti.querySelectorAll(
            "input[name='id']:checked"
        );

        const typeChange = e.target.elements.type.value;

        if (typeChange === "-- Select action --") {
            alert("Please select an action.");
            return;
        }

        if (inputsChecked.length > 0) {
            if (typeChange === "delete-all") {
                if (!confirm("Are you sure you want to delete all selected records?")) {
                    return;
                }
            }

            let ids = [];
            inputsChecked.forEach((input) => {
                const id = input.value;

                if (typeChange === "change-position") {
                    const position = input
                        .closest("tr")
                        .querySelector("input[name='position']");
                    ids.push(`${id}-${position.value}`);
                } else {
                    ids.push(id);
                }
            });

            const idsInput = formChangeMulti.querySelector("input[name='ids']");
            if (idsInput) {
                idsInput.value = ids.join(",");
                formChangeMulti.submit();
            }
        } else {
            alert("Please select at least one item.");
        }
    });
}
// End Form change multi

// Show alert(s)
const showAlerts = document.querySelectorAll("[show-alert]");
if (showAlerts.length > 0) {
    showAlerts.forEach((showAlert) => {
        const time = parseInt(showAlert.getAttribute("data-time")) || 3000;
        const closeAlert = showAlert.querySelector("[close-alert]");

        let timeoutId = setTimeout(() => {
            showAlert.classList.add("alert-hidden");
            setTimeout(() => {
              showAlert.remove();
            }, 500);
        }, time);

        if (closeAlert) {
            closeAlert.addEventListener("click", () => {
                clearTimeout(timeoutId);
                showAlert.remove();
            });
        }
    });
}
// End Show alert

// Change Status
const buttonChangeStatus = document.querySelectorAll("[button-change-status]");
if (buttonChangeStatus.length > 0) {
    const formChangeStatus = document.querySelector("#form-change-status");
    const path = formChangeStatus.getAttribute("data-path");
    
    buttonChangeStatus.forEach(button => {
        button.addEventListener("click", () => {
            const statusCurrent = button.getAttribute("data-status");
            const id = button.getAttribute("data-id");

            const statusChange = statusCurrent === "active" ? "inactive" : "active";
            
            const action = path + `${statusChange}/${id}?_method=PATCH`;
            formChangeStatus.action = action;
            formChangeStatus.submit();  
        });
    });
}
// End Change Status

// Delete Item
const buttonDelete = document.querySelectorAll("[button-delete]");
if (buttonDelete.length > 0) {
    const formDeleteItem = document.querySelector("#form-delete-item");
    const path = formDeleteItem.getAttribute("data-path");

    buttonDelete.forEach(button => {
        button.addEventListener("click", () => {
            const isConfirm = confirm("Are you sure you want to delete this item?");

            if (isConfirm) {
                const id = button.getAttribute("data-id");
                const action = `${path}/${id}?_method=DELETE`;
                formDeleteItem.action = action;
                formDeleteItem.submit();
            }
        });
    });
}
// End Delete Item

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

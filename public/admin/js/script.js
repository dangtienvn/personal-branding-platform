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

// Checkbox-multi
const checkboxMulti = document.querySelector("[checkbox-multi]");
if (checkboxMulti) {
    // check-all is an element with id "check-all"
    const inputCheckAll = checkboxMulti.querySelector("#check-all");
    const inputsId = checkboxMulti.querySelectorAll("input[name='id']");

    if (inputCheckAll) {
        inputCheckAll.addEventListener("click", () => {
            inputsId.forEach(input => input.checked = inputCheckAll.checked);
        });
    }

    // When submitting the multi-change form, gather selected ids into the `ids` input
    const formChangeMulti = document.getElementById("form-change-multi");
    if (formChangeMulti) {
        formChangeMulti.addEventListener("submit", (e) => {
            const checked = Array.from(inputsId).filter(i => i.checked).map(i => i.value);
            const idsInput = formChangeMulti.querySelector("input[name='ids']");
            if (checked.length === 0) {
                e.preventDefault();
                alert("Vui lòng chọn ít nhất một mục.");
                return;
            }
            if (idsInput) {
                idsInput.value = checked.join(",");
            }
        });
    }
    // Update 'check-all' when individual checkboxes change, and set initial state
    if (inputsId.length > 0) {
        const updateCheckAllState = () => {
            const allChecked = Array.from(inputsId).every(i => i.checked);
            if (inputCheckAll) inputCheckAll.checked = allChecked;
        };

        // initial state
        updateCheckAllState();

        inputsId.forEach((input) => {
            input.addEventListener("change", updateCheckAllState);
        });
    }
}

// Form change multi
const formChangeMulti = document.querySelector("[form-change-multi]");
if (formChangeMulti) {
    formChangeMulti.addEventListener("submit", (e) => {

        e.preventDefault();
        const checkboxMulti = document.querySelector("[checkbox-multi]");
        const inputsChecked = checkboxMulti.querySelectorAll(
            "input[name='id']:checked"
        );

        // Get the selected action type from the form
        const typeChange = e.target.elements.type.value;

        const idsInput = formChangeMulti.querySelector("input[name='ids']");

        if (typeChange === "delete-all") {
            if (confirm("Bạn có chắc chắn muốn xóa tất cả sản phẩm đã chọn?")) {
                formChangeMulti.action = "/admin/products/delete-multi";
                formChangeMulti.submit();
            }
        }


        if (inputsChecked.length > 0) {
            let ids = [];
            inputsChecked.forEach((input) => {
                const id = input.value;

                if (typeChange === "change-position") {
                    const position = input
                        .closest("tr")
                        .querySelector("input[name='position']");
                        ids.push(`${id} - ${position.value}`);
                } else {
                    ids.push(id);
                }
            });

            console.log(ids.join(","));
            if (idsInput) idsInput.value = ids.join(",");
            formChangeMulti.submit(); 
        } else {
            alert("Vui lòng chọn ít nhất một mục.");
        }
    });
}

// Show alert
const showAlert = document.querySelector("[show-alert]");
if (showAlert) {
    const time = parseInt(showAlert.getAttribute("data-time")) || 3000;
    const closeAlert = showAlert.querySelector("[close-alert]");

    setTimeout(() => {
        showAlert.classList.add("alert-hidden");
        // Remove after transition
        setTimeout(() => {
          showAlert.style.display = "none";
        }, 500); 
    }, time);

    if (closeAlert) {
        closeAlert.addEventListener("click", () => {
            showAlert.style.display = "none";
        });
    }
}
// End Show alert

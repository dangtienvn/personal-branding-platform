tinymce.init({
    selector: "textarea.textarea-mce",
    elementpath: false, 
    branding: false,    
    plugins: "image upload link",
    toolbar: "undo redo | bold italic | alignleft aligncenter alignright alignjustify | image upload link",
    file_picker_types: "image",
    images_upload_handler: function (blobInfo, progress) {
        return new Promise((resolve, reject) => {
            let formData = new FormData();
            formData.append("file", blobInfo.blob(), blobInfo.filename());

            fetch("/admin/upload/image", {
                method: "POST",
                body: formData,
            })
                .then((res) => {
                    if (!res.ok) {
                        return reject("HTTP Error: " + res.status);
                    }
                    return res.json();
                })
                .then((data) => {
                    if (!data || !data.url) {
                        return reject("Upload failed or invalid response");
                    }
                    resolve(data.url);
                })
                .catch((err) => {
                    reject("Upload failed");
                });
        });
    },
}); 
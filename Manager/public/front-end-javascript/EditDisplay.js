Dropzone.options.myAwesomeDropzone = {
    paramName: "file", // The name that will be used to transfer the file
    maxFilesize: 2, // MB
    parallelUploads: 10,
    maxFiles: 10,
    init: function () {
        this.on("success", function (file, response) {
            location.reload();//reload after success
        });
    }
};

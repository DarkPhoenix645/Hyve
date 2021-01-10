if (window.XMLHttpRequest) {
    function convertBytes(input) {
        if (input < 999999) {
            input = input /  1000
            return(input.toFixed(2) + " KB ")
        } else if (input < 999999999 && input > 999999) {
            input = input /  1000000
            return(input.toFixed(2) + " MB ")
        } else if (input <= 999999999999 && input > 999999999) {
            input = input /  1000000000
            return(input.toFixed(2) + " GB ")
        }
    }

    function input(type) {
        if (type === "file") {
            document.querySelector("#progress-bar").value = 0
            document.querySelector("#readout").classList.add("hidden")
            document.querySelector("#upload-input-file").click()
        }
        else if (type = "folder") {
            document.querySelector("#progress-bar").value = 0
            document.querySelector("#readout").classList.add("hidden")
            document.querySelector("#upload-input-folder").click()
        }
    }

    function upload(event) {
        if (event) {
            var files = event.target.files
            var xhr = new XMLHttpRequest()
            var formData = new FormData()
            xhr.open("POST", "/api/upload")
            for (i = 0; i <= files.length; i++) {
                if (i !== files.length) {
                    var file = files[i]
                    formData.append('file' + i, file)
                }
                else { console.log("Added files to formData"), console.log(formData.getAll("uploads ")) }
            }
            xhr.onprogress = (event) => {
                console.log(`Uploaded ${event.loaded} of ${event.total} bytes`)
                var percentComplete = event.loaded / event.total;
                percentComplete = parseInt(percentComplete * 100);
                document.querySelector("#readout").classList.remove("hidden")
                document.querySelector('#status').innerHTML = percentComplete + '% uploaded'
                document.querySelector('#loaded_n_total').innerHTML = convertBytes(event.loaded) + ' completed out of ' + convertBytes(event.total)
                document.querySelector("#progress-bar").value = percentComplete
            }
            xhr.send(formData)
        } else {throw "No files/folders passed!"}
    }
} else { alert("Please use a different browser, yours does not support AJAX!") }
// document.querySelector("#progress-bar").value = 100
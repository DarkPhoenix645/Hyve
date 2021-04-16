if (window.XMLHttpRequest) {
    var toPrint = ""
    var curr = new XMLHttpRequest

    function cancelOne() {
        var cancelOne = new XMLHttpRequest
        job_id = prompt("Please enter the job number you want to cancel", "Job ID")
        if (job_id !== null) {
            cancelOne.open("GET", "/cancelOne?job_id=" + job_id)
            cancelOne.send()
            toast(`Cancellation request for job ${job_id} sent`, "success")
        } else if (job_id === null) {
            toast("Cancellation request was not sent!", "warn")
        }
    }

    function cancelAll() {
        var cancelAll = new XMLHttpRequest
        cancelAll.open("GET", "/cancelAll")
        cancelAll.send()
        toast("Universal cancellation request sent", "success")
    }

    function print(fileName) {
        if (fileName === undefined) {
            var xhttp = new XMLHttpRequest
            var fileName = prompt("Please enter the name of the file you want to print. Don't forget the extension! \nRemember that this file must already be present on the server. If you want to print a file that's not on the server, please upload it first.") 
            if (fileName !== null) {
                xhttp.open("POST", "/printFile?fileName=" + fileName)
                xhttp.send()
                toast("Print Request Sent!", "success");
            }
        } else if (fileName !== undefined) {
            var xhttp = new XMLHttpRequest
            xhttp.open("POST", "/printFile?fileName=" + fileName)
            xhttp.send()
            toast(`Print Request Sent for ${fileName}!`, "success")
            document.getElementById("printButton").innerHTML = "Print"
            document.getElementById("progressBar").classList.add = "hidden"
            document.getElementById("status").innerHTML = ""
            document.getElementById("loaded_n_total").innerHTML = ""
        }
    }

    function getCurrentJobs() {
        curr.open("GET", "/currentJobs")
        curr.send()
    }

    curr.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            var response = this.responseText
            if (response != "\"\"") {
            var date =  new Date().getFullYear();
            var regex = new RegExp(date, "g")
            var dateReplace = " " + date + " </td><td>"
            var response = response.replace(/\s+/g, '')
            var response = response.replace(regex, dateReplace)
            var response = response.replace(/"/g, "")
            var response = response.replace(/-/g, " ")
            var Obj1 = {Mon: " </td><td>Monday ", Tue: " </td><td>Tuesday ", Wed: " </td><td>Wedenesday ", Thu: " </td><td>Thursday ", Fri: " </td><td>Friday ", Sat: " </td><td>Saturday ", Sun: " </td><td>Sunday "}; 
            var response = response.replace(/Mon|Tue|Wed|Thu|Fri|Sat|Sun/g, function(matched){return Obj1[matched];})
            var Obj2 = {Jan: " January ", Feb: " February ", Mar: " March ", Apr: " April ", May: " May ", Jun: " June ", Jul: " July ", Aug: " August ", Sep: " September ", Oct: " October ", Nov: " November ", Dec: "December"}; 
            var response = response.replace(/Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec/g, function(matched){return Obj2[matched];})
            var Obj3 = {AM: " AM ", PM: " PM "}; 
            var response = response.replace(/AM|PM/g, function(matched){return Obj3[matched];})
            var Obj4 = {Deskjet: "<tr><td>Deskjet", J410: "J410</td><td>", IST: "IST</td></tr><br>"}; 
            var response = response.replace(/Deskjet|J410|IST/g, function(matched){return Obj4[matched];}); 
            var output = response.replace(/<tr><td>Deskjet/, "<tr><th>Printer Name</th><th>Job Number</th><th>Date</th><th>Time</th></tr><tr><td>Deskjet"); 
            document.getElementById("serverResponse").innerHTML = output
            document.getElementById("currButton").innerHTML = "Refresh"
            curr.open("GET", "/currentJobs");
        } else {
            document.getElementById("serverResponse").innerHTML = ""
            document.getElementById("null").innerHTML = "No print jobs listed!"
            document.getElementById("currButton").innerHTML = "Refresh"
            curr.open("GET", "/currentJobs");
        } 
        }
    };

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

    function input(event) {
        document.querySelector("#progress-bar").value = 0
        document.querySelector("#readout").classList.add("hidden")
        upload(event, "file")
    }

    function upload(event, type) {
        if (event) {
            var files = event.target.files
            var xhr = new XMLHttpRequest()
            var formData = new FormData()
            xhr.open("POST", "/api/upload?type=" + type)
            for (i = 0; i < files.length; i++) {
                var file = files[i]
                formData.append('file' + i, file)
            }
            xhr.upload.onprogress = (event) => {
                var percentComplete = event.loaded / event.total;
                percentComplete = parseInt(percentComplete * 100);
                document.querySelector("#readout").classList.remove("hidden")
                document.querySelector('#status').innerHTML = percentComplete + '% uploaded'
                document.querySelector('#loaded_n_total').innerHTML = convertBytes(event.loaded) + ' completed out of ' + convertBytes(event.total)
                document.querySelector("#progress-bar").value = percentComplete
            }
            xhr.onerror = () => { console.error("Upload Failed!") }
            xhr.onabort = () => { console.error("Upload Cancelled!") }
            xhr.onabort = () => { console.error("Upload Cancelled!") }
            xhr.onload = () => { console.log(`Upload Finished!\nServer response: ${xhr.response}`) }
            xhr.send(formData)
        } else {throw "No files/folders passed!"}
    }
} else { toast("Please use a different browser, yours does not support AJAX!", "incorrect") }

function toast(message, type, url) {
    if (type === "success") { var color = "#7cc20c"; }
    if (type === "warn") { var color = "#e0a016"; }
    if (type === "incorrect") { var color = "#ff0000"; }
    if (type === "info") { var color = "#7cc20c"; var image = "/public/images/animation.gif" }    
    if (type !== "input") {
        Toastify({
            text: message,
            duration: 3000,
            close: false,
            destination: url,
            newWindow: true,
            gravity: "bottom",
            position: "right",
            backgroundColor: color
        }).showToast();
    }
    console.log(message, type, url)
}
function fileName() {
    if (document.getElementById("printButton").innerHTML === "Print") {
        print()
    } else {
        var fileName = document.getElementById("printButton").innerHTML.replace(/Print /, "")
        print(fileName)
    }
}

var curr = new XMLHttpRequest

function getCurrentJobs() {
    curr.open("GET", "/currentJobs")
    curr.send()
}

function cancelOne() {
    var cancelOne = new XMLHttpRequest
    job_id = prompt("Please enter the job number you want to cancel", "Job ID")
    if (job_id !== null) {
        cancelOne.open("GET", "/cancelOne?job_id=" + job_id)
        cancelOne.send()
        alert("Cancellation request for job " + job_id + " sent")
    } else if (job_id === null) {
        alert("Cancellation request was not sent!")
    }
}

function cancelAll() {
    var cancelAll = new XMLHttpRequest
    cancelAll.open("GET", "/cancelAll")
    cancelAll.send()
    alert("Universal cancellation request sent")
}

function print(fileName) {
    if (fileName === undefined) {
        var xhttp = new XMLHttpRequest
        var fileName = prompt("Please enter the name of the file you want to print. Don't forget the extension! \nRemember that this file must already be present on the server. If you want to print a file that's not on the server, please upload it first.") 
        if (fileName !== null) {
            xhttp.open("POST", "/printFile?fileName=" + fileName)
            xhttp.send()
            alert("Print Request Sent!");
        }
    } else if (fileName !== undefined) {
        var xhttp = new XMLHttpRequest
        xhttp.open("POST", "/printFile?fileName=" + fileName)
        xhttp.send()
        alert("Print Request Sent for " + fileName + "!")
        document.getElementById("printButton").innerHTML = "Print"
        document.getElementById("progressBar").classList.add = "hidden"
        document.getElementById("status").innerHTML = ""
        document.getElementById("loaded_n_total").innerHTML = ""
    }
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

function _(el) {
    return document.getElementById(el);
}

function uploadFile() {
    _("progressBar").classList.remove("hidden")
    var file = _("file").files[0];
    var formdata = new FormData();
    formdata.append("file", file);
    var ajax = new XMLHttpRequest();
    ajax.upload.addEventListener("progress", progressHandler, false);
    ajax.addEventListener("load", completeHandler(event, file), false);
    ajax.addEventListener("error", errorHandler, false);
    ajax.addEventListener("abort", abortHandler, false);
    ajax.open("POST", "/uploadServer");
    ajax.send(formdata);
}

function convertBytes(input) {
    if (input <  999999) {
        input = input /  1000
        return(input.toFixed(2) + " KB / ")
    } else if (input <  999999999 && input > 999999) {
        input = input /  1000000
        return(input.toFixed(2) + " MB / ")
    } else if (input <  999999999999 && input > 999999999) {
        input = input /  1000000000
        return(input.toFixed(2) + " GB / ")
    }
}

function convertOutputBytes(input) {
    if (input <  999999) {
        input = input /  1000
        return(input.toFixed(2) + " KB ")
    } else if (input <  999999999 && input > 999999) {
        input = input /  1000000
        return(input.toFixed(2) + " MB ")
    } else if (input <  999999999999 && input > 999999999) {
        input = input /  1000000000
        return(input.toFixed(2) + " GB ")
    }
}

function progressHandler(event) {
    _("loaded_n_total").innerHTML = "Uploaded " + convertBytes(event.loaded) + convertOutputBytes(event.total);
    var percent = (event.loaded / event.total) * 100;
    _("progressBar").value = Math.round(percent);
    _("status").innerHTML = Math.round(percent) + "% uploaded";
}

function completeHandler(event, file) {
    _("status").innerHTML = event.target.responseText + "!";
    _("uploadButton").innerHTML = "Upload Another File"
    _("printButton").innerHTML = "Print " + file.name
    _("progressBar").value = 100
}

function errorHandler(event) {
    _("status").innerHTML = "Upload Failed!"
    _("loaded_n_total").innerHTML = "Keep in mind that the upload cap is 10 GB."
}

function abortHandler(event) {
    _("status").innerHTML = "Upload Aborted!"
    _("loaded_n_total").innerHTML = "Why would you do that?"
}
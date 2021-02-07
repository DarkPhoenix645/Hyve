//Table Heading and Heading Text Generation
var table = document.getElementById('serverResponse');
var thead = document.createElement('thead')
var tbody = document.createElement('tbody')
var tr = document.createElement('tr')
var icon = document.createElement('th')
var fileName = document.createElement('th')
var size = document.createElement('th')
var lastModified = document.createElement('th')
var downloadButton = document.createElement('th')
var textName = document.createTextNode("Name")
var textSize = document.createTextNode("Size")
var textLastModified = document.createTextNode("Last Modified")
var textDownloadButton = document.createTextNode("")
fileName.appendChild(textName)
size.appendChild(textSize)
lastModified.appendChild(textLastModified)
downloadButton.appendChild(textDownloadButton)
tr.appendChild(downloadButton)
tr.appendChild(icon)
tr.appendChild(fileName)
tr.appendChild(size)
tr.appendChild(lastModified)
thead.appendChild(tr)
table.appendChild(thead)
var counter = 0

//Getting content from server
var xhttp = new XMLHttpRequest
xhttp.open("GET", "/api/listFiles")
xhttp.send()
xhttp.onreadystatechange = function() {
    if (this.readyState == 4) {
        response = JSON.parse(this.responseText)
        var totalFiles = response.totalFiles
        var totalFolders = response.totalFolders
        for (i = 1; i <= totalFiles; i++) { generator(i, false) }
        for (i = 1; i <= totalFolders; i++) { generator(i, true) }
        table.appendChild(tbody)
        console.log(table)
        document.getElementById("json").innerHTML += `\n${JSON.stringify(response, null, 2)}`
}}

function download(link) {
    console.log(link.replace("59.89.42.63", "localhost"))
    window.open(link.replace("59.89.42.63", "localhost"))
}

//Processing Content
function generator(i, isFolder) {
    counter += 1
    isFolder === true ? type = "folders" : type = "files"
    var tr = document.createElement('tr')
    var icon = document.createElement('td')
    var name = document.createElement('td')
    var size = document.createElement('td')
    var lastModified = document.createElement('td')
    var downloadElement = document.createElement('div')
    var downloadButton = document.createElement('input')
    var downloadLabel = document.createElement('label')
    var wrapper = document.createElement('td')
    var imgIcon = document.createElement('img')
        imgIcon.src = "https://upload.wikimedia.org/wikipedia/commons/thumb/5/59/OneDrive_Folder_Icon.svg/1200px-OneDrive_Folder_Icon.svg.png"
        imgIcon.height = "40"
        imgIcon.width = "40"
    var textName = document.createTextNode(response[type][i].name)
    var textSize = document.createTextNode(response[type][i].size)
    var textLastModified = document.createTextNode(response[type][i].birthTime)
    downloadElement.classList.add("col-6")
    downloadElement.classList.add("col-12-small")
    downloadButton.setAttribute("type", "checkbox")
    downloadButton.setAttribute("id", "test" + counter)
    downloadButton.setAttribute("name", "test" + counter)
    downloadLabel.setAttribute("for", "test" + counter)
    icon.appendChild(imgIcon)
    name.appendChild(textName)
    size.appendChild(textSize)
    lastModified.appendChild(textLastModified)
    downloadElement.appendChild(downloadButton)
    downloadElement.appendChild(downloadLabel)
    wrapper.appendChild(downloadElement)
    tr.appendChild(wrapper)
    tr.appendChild(icon)
    tr.appendChild(name)
    tr.appendChild(size)
    tr.appendChild(lastModified)
    tbody.appendChild(tr)
}
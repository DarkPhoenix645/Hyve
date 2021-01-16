var xhttp = new XMLHttpRequest
xhttp.open("GET", "/api/listFiles")
xhttp.send()
xhttp.onreadystatechange = function() {
    if (this.readyState == 4) {
        var response = JSON.parse(this.responseText)
        var totalFiles = response.totalFiles
        var totalFolders = response.totalFolders
        var table = document.getElementById('serverResponse');
        var thead = document.createElement('thead')
        var tbody = document.createElement('tbody')
        var tr = document.createElement('tr')
        var icon = document.createElement('th')
        var name = document.createElement('th')
        var size = document.createElement('th')
        var lastModified = document.createElement('th')
        var downloadButton = document.createElement('th')
        var textName = document.createTextNode("Name")
        var textSize = document.createTextNode("Size")
        var textLastModified = document.createTextNode("Last Modified")
        var textDownloadButton = document.createTextNode("Download")
        name.appendChild(textName)
        size.appendChild(textSize)
        lastModified.appendChild(textLastModified)
        downloadButton.appendChild(textDownloadButton)
        tr.appendChild(icon)
        tr.appendChild(name)
        tr.appendChild(size)
        tr.appendChild(lastModified)
        tr.appendChild(downloadButton)
        thead.appendChild(tr)
        table.appendChild(thead)
        for (i = 1; i <= totalFiles; i++) {
            var tr = document.createElement('tr')
            var icon = document.createElement('td')
            var name = document.createElement('td')
            var size = document.createElement('td')
            var lastModified = document.createElement('td')
            var downloadButton = document.createElement('td')
            var wrapper = document.createElement('div')
            var imgIcon = document.createElement('img')
                imgIcon.src = response.folders[i].type || "https://img.icons8.com/cotton/452/yellow-file--v1.png"
                imgIcon.height = "40"
                imgIcon.width = "40"
            var textName = document.createTextNode(response.files[i].name)
            var textSize = document.createTextNode(response.files[i].size)
            var textLastModified = document.createTextNode(response.files[i].birthTime)
            downloadButton.classList.add("icon")
            downloadButton.classList.add("fa-download")
            downloadButton.setAttribute("onclick", `download("${response.files[i].downloadLink}")`)
            icon.appendChild(imgIcon)
            name.appendChild(textName)
            size.appendChild(textSize)
            lastModified.appendChild(textLastModified)
            wrapper.appendChild(downloadButton)
            tr.appendChild(icon)
            tr.appendChild(name)
            tr.appendChild(size)
            tr.appendChild(lastModified)
            tr.appendChild(wrapper)
            tbody.appendChild(tr)
        }
        for (i = 1; i <= totalFolders; i++) {
            var tr = document.createElement('tr')
            var icon = document.createElement('td')
            var name = document.createElement('td')
            var size = document.createElement('td')
            var lastModified = document.createElement('td')
            var downloadButton = document.createElement('td')
            var wrapper = document.createElement('div')
            var imgIcon = document.createElement('img')
                imgIcon.src = response.folders[i].type || "https://upload.wikimedia.org/wikipedia/commons/thumb/5/59/OneDrive_Folder_Icon.svg/1200px-OneDrive_Folder_Icon.svg.png"
                imgIcon.height = "40"
                imgIcon.width = "40"
            var textName = document.createTextNode(response.folders[i].name)
            var textSize = document.createTextNode(response.folders[i].size)
            var textLastModified = document.createTextNode(response.folders[i].birthTime)
            downloadButton.classList.add("icon")
            downloadButton.classList.add("fa-download")
            downloadButton.setAttribute("onclick", `download("${response.folders[i].downloadLink}")`)
            icon.appendChild(imgIcon)
            name.appendChild(textName)
            size.appendChild(textSize)
            lastModified.appendChild(textLastModified)
            wrapper.appendChild(downloadButton)
            tr.appendChild(icon)
            tr.appendChild(name)
            tr.appendChild(size)
            tr.appendChild(lastModified)
            tr.appendChild(wrapper)
            tbody.appendChild(tr)
        }
        table.appendChild(tbody)
        console.log(table)
        document.getElementById("json").innerHTML += `\n${JSON.stringify(response, null, 2)}`
}}

function download(link) {
    console.log(link.replace("59.89.42.63", "localhost"))
    window.open(link.replace("59.89.42.63", "localhost"))
}
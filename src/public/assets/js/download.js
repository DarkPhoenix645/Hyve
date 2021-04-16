var table, thead, tbody, tr, icon, fileName, size, lastModified, textName, textSize, textLastModified;

function generateTableTemplate () {
    table = document.getElementById('serverResponse');
    thead = document.createElement('thead')
    tbody = document.createElement('tbody')
    tr = document.createElement('tr')
    icon = document.createElement('th')
    fileName = document.createElement('th')
    size = document.createElement('th')
    lastModified = document.createElement('th')
    textName = document.createTextNode("Name")
    textSize = document.createTextNode("Size")
    textLastModified = document.createTextNode("Last Modified")
    fileName.appendChild(textName)
    size.appendChild(textSize)
    lastModified.appendChild(textLastModified)
    tr.appendChild(icon)
    tr.appendChild(fileName)
    tr.appendChild(size)
    tr.appendChild(lastModified)
    thead.appendChild(tr)
    table.appendChild(thead)
}

var counter = 0

var xhttp = new XMLHttpRequest
xhttp.open("GET", "/api/listFiles")
xhttp.send()
xhttp.onreadystatechange = function() {
    if (this.readyState == 4) {
        response = this.responseText
        if(response === "No files found!") {
            document.getElementById('emptyResponse').innerText = response
            document.getElementById("rawButton").classList.add('hidden')
        } else {
            response = JSON.parse(response)
            generateTableTemplate()
            var { totalFiles, totalFolders } = response
            for (i = 1; i <= totalFiles; i++) { generator(i, false) }
            for (i = 1; i <= totalFolders; i++) { generator(i, true) }
            table.appendChild(tbody)
            console.log(table)
            document.getElementById("json").innerHTML += `\n${JSON.stringify(response, null, 2)}`
        }
}}

function download(link) {
    console.log(link.replace("59.89.42.63", "localhost"))
    window.open(link.replace("59.89.42.63", "localhost"))
}

function generator(i, isFolder) {
    counter += 1
    isFolder === true ? type = "folders" : type = "files"
    var tr = document.createElement('tr')
    var icon = document.createElement('td')
    var name = document.createElement('td')
    var wrapper = document.createElement('a')
        wrapper.setAttribute('href', response[type][i].downloadLink)
    var size = document.createElement('td')
    var lastModified = document.createElement('td')
    var imgIcon = document.createElement('img')
        imgIcon.src = `public/images/File Type Icons/${response[type][i].type}.svg`
        imgIcon.height = "40"
        imgIcon.width = "40"
        imgIcon.setAttribute('style', 'filter: invert(.75);')
        imgIcon.setAttribute('onerror', 'this.onerror=null;this.src=\'public/images/File Type Icons/generic.svg\';')
        imgIcon.setAttribute('id', `img${counter}`)
    var textName = document.createTextNode(response[type][i].name)
    var textSize = document.createTextNode(response[type][i].size)
    var textLastModified = document.createTextNode(response[type][i].birthTime)
    icon.appendChild(imgIcon)
    wrapper.appendChild(textName)
    name.appendChild(wrapper)
    size.appendChild(textSize)
    lastModified.appendChild(textLastModified)
    tr.appendChild(icon)
    tr.appendChild(name)
    tr.appendChild(size)
    tr.appendChild(lastModified)
    tbody.appendChild(tr)
}

changeIconSize()
window.onresize = changeIconSize

function changeIconSize() {
    var imgArr = document.querySelectorAll('img')
    if (window.innerWidth <= 800 && window.innerHeight <= 500) {
        for (i = 0; i < imgArr.length; i++) {
            var image = document.getElementById(`img${i + 1}`)
            image.width = 25
            image.height = 25
        }
    } else if (window.innerWidth <= 1024 && window.innerHeight <= 600) {
        for (i = 0; i < imgArr.length; i++) {
            var image = document.getElementById(`img${i + 1}`)
            image.width = 30
            image.height = 30
        }
    } else if (window.innerWidth <= 1920 && window.innerHeight <= 900) {
        for (i = 0; i < imgArr.length; i++) {
            var image = document.getElementById(`img${i + 1}`)
            image.width = 40
            image.height = 40
        }
    } else if (window.innerWidth > 1920 && window.innerHeight > 900) {
        for (i = 0; i < imgArr.length; i++) {
            var image = document.getElementById(`img${i + 1}`)
            image.width = 50
            image.height = 50
        }
    }
}
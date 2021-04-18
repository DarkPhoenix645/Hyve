import fs from 'fs';
import { exec } from "child_process";
import helpers from "../helpers";

function manageUploads (subDir, files) {
    subDir.forEach((dir) => {
        fs.mkdirSync(process.env.UPLOADS_DIR1 + dir, (err) => {
            if (err) { console.log(err) }
        })
    })
    files.forEach((file) => {
        fs.renameSync(file.path, process.env.UPLOADS_DIR1 + file.name)
    })
};

async function zip (files, date) {
    return new Promise((resolve) => {
        const name = `${process.env.DOWNLOADS_DIR}Hyve-${date}.zip`
        exec(`cd "${process.env.UPLOADS_DIR1}" && zip "${name}" "${files}" -r`, (error, _, stderr) => {
            if (error) { resolve("Error!") }
            else if (stderr) { console.log(stderr), resolve("Error!") }
            resolve(name);
        })
    })
};

function processData (files) {
    return new Promise((resolve) => {
    var data = { totalItems:"", files:{}, folders:{} }
    var buffer = { name: "", size: "", birthTime: "", downloadLink: "", type: "" }
    var fileCounter = 0
    var dirCounter = 0
    files.forEach((item) => {
        fs.stat(process.env.UPLOADS_DIR1 +  item, async function(err, stats) {
            if (stats.isFile() === false) {
                dirCounter += 1
                buffer.name = item 
                buffer.birthTime = (new Date(stats.birthtimeMs).toLocaleString('default', { weekday: 'short', year: 'numeric', month: 'long', day: 'numeric' })).slice(5)
                buffer.size = "-"
                buffer.downloadLink = "/api/download?folder=" + encodeURI(item)
                buffer.type = "-"
                data.folders[dirCounter] = buffer
                buffer = { name: "", size: "", birthTime: "", downloadLink: "", type: "" }
            } else if (stats.isFile() === true) {
                fileCounter += 1
                buffer.name = item 
                buffer.birthTime = (new Date(stats.birthtimeMs).toLocaleString('default', { weekday: 'short', year: 'numeric', month: 'long', day: 'numeric' })).slice(5)
                buffer.size = await helpers.convertBytes(stats.size, true)
                buffer.downloadLink = "/api/download?file=" + encodeURI(item)
                buffer.type = item.substring(item.lastIndexOf(".") + 1, item.length)
                data.files[fileCounter] = buffer
                buffer = { name: "", size: "", birthTime: "", downloadLink: "", type: "" }
            } else if (err) {console.log(err)}
            if (dirCounter + fileCounter === files.length) {
                data.totalItems = files.length
                data.totalFolders = dirCounter
                data.totalFiles = fileCounter
                resolve(data)
            }
        })
    })
})};

export default {
    manageUploads,
    zip,
    processData
}
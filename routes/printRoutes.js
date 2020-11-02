require("dotenv").config()
const functions = require("../functions");
const formidable = require("formidable");
const fs = require("fs");
const { exec } = require("child_process");
const util = require("util");
var nameChanger = util.promisify(fs.rename)

module.exports = function(app) {
    app.post('/printFile', (req, res) => {
        functions.getDateTime(req.ip, req.url, req.method) 
        var fileName = "'" + __dirname.replace(/\/routes/, "") + "/uploads/" + req.query.fileName + "'"      
        functions.printFunction(fileName);
        res.status('200').send('Print Job Recieved!');
    });

    app.get('/cancelAll', (req, res) => {
        functions.getDateTime(req.ip, req.url, req.method) 
        functions.cancelAll();
        res.status(200);
    });
    
    app.get('/cancelOne', (req, res) => {
        functions.getDateTime(req.ip, req.url, req.method) 
        functions.cancelOne(req.query.job_id);
        res.status(200);
    });

    app.get('/currentJobs', async (req, res) => {
        functions.getDateTime(req.ip, req.url, req.method) 
        currentJobs = await functions.getCurrentJobs()
        currentJobs = JSON.stringify(currentJobs)
        res.status(200).send(currentJobs);
    });

    app.get('/downloadFiles', async(req, res) => {
        functions.getDateTime(req.ip, req.url, req.method) 
        if (req.query.files.includes("..;..") === true) {
            var files = "uploads/" + req.query.files.replace(/..;..|%20/g, " uploads/")
            fileName = await(functions.download(files, Date.now()))
            try {
                res.download(process.env.UPLOADS_DIR1 + fileName)
            } catch (err) {
                try {
                    res.download(process.env.UPLOADS_DIR2 + fileName)
                } catch (err) {
                    res.download(process.env.UPLOADS_DIR3 + fileName)
                }
            }
        } else {
            try {
                res.download(process.env.UPLOADS_DIR1 + req.query.files)
            } catch (err) {
                try {
                    res.download(process.env.UPLOADS_DIR2 + req.query.files)
                } catch (err) {
                    res.download(process.env.UPLOADS_DIR3 + req.query.files)
                }
            }
        }
    })

    app.get('/downloadDir', async(req, res) => {
        functions.getDateTime(req.ip, req.url, req.method) 
        if (req.query.files.includes("..;..") === true) {
            var files = "uploads/" + req.query.files.replace(/..;..|%20/g, " uploads/")
            fileName = await(functions.download(files, Date.now()))
            res.download("/home/nilanjan/Desktop/Hyve/downloads/" + fileName)
        } else {
            fileName = await(functions.download(req.query.files, Date.now()))
            res.download("/home/nilanjan/Desktop/Hyve/downloads/" + fileName)
        }
    })

    app.post('/listFiles', async(req, res) => {
        functions.getDateTime(req.ip, req.url, req.method) 
        var files = await fs.readdirSync(process.env.UPLOADS_DIR1)
        if (files.length === 0) {
            res.send(files)
        } else if (files.length !== 0) {
        files.forEach((item, index) => {
        arr = []
        fs.stat(process.env.UPLOADS_DIR1 + "/" + item, function(err, stats) {
            if (stats.isFile() === false) {
                arr.push("link:/downloadDir?files=" + item.replace(/ /g, "%20") + "filename:" + item + "Size:------------" + "BirthTime:" + stats.birthtime)
            } else if (stats.isFile() === true) {
                arr.push("link:/downloadFiles?files=" + item.replace(/ /g, "%20") + "filename:" + item + "Size:" + functions.convertBytes(stats.size) + "BirthTime:" + stats.birthtime)
            } else if (err) {console.log(err)}
            if (index === (files.length - 1)) {
                arr = "[" + arr.toString()
                var x = arr.replace(/ \(India Standard Time\)/g, "")
                x = x.replace(/\[/, "<tr><th>Name</th><th>Size</th><th>Creation Time</th></tr>")
                x = x.replace(/link:/g, "<tr><td><a href=\"")
                x = x.replace(/filename:/g, "\">")
                x = x.replace(/Size:/g, "</td><td>")
                x = x.replace(/BirthTime:/g, "</td><td>")
                x = x.replace(/,/g, "</td></tr>")
                x = x + "</td></tr>"
                res.send(x)
            } 
        })
    })}
    })

    app.post('/uploadFile', async function(req, res){
        functions.getDateTime(req.ip, req.url, req.method)
        var form = new formidable.IncomingForm();
        form.maxFileSize = 10000 * 1024 * 1024
        form.multiples = true;
        form.uploadDir = __dirname.replace("/routes", "/uploads/")

        form.on('file', async function(field, file) { nameChanger(file.path, form.uploadDir + file.name); });
        form.on('error', function(err) { console.log('An error has occured: ' + err); });
        form.on('end', function() { res.end('File(s) uploaded and saved!'); });
        form.parse(req);
      });
      
    app.post('/uploadDir', async function(req, res){
        functions.getDateTime(req.ip, req.url, req.method)
        var form = new formidable.IncomingForm();
        form.maxFileSize = 10000 * 1024 * 1024
        form.multiples = true;
        form.uploadDir = __dirname.replace("/routes", "/uploads/")
        
        form.on('file', async function(field, file) {
            nameChanger(file.path, form.uploadDir + file.name);
            exec("cd " + form.uploadDir + " && unzip '" + form.uploadDir + file.name + "'", (error, stdout, stderr) => {
                if (error) {console.log(`${error}`)} else if (stderr) {console.log(`${stderr}`)}
                exec("sudo rm -rf '" + form.uploadDir + file.name + "'", (error, stdout, stderr) => {
                    if (error) {console.log(`${error}`)} else if (stderr) {console.log(`${stderr}`)}
                })
            })
        });
        
        form.on('error', function(err) { console.log('An error has occured: ' + err); });
        form.on('end', function() { res.end('Folder uploaded and saved!'); });
        form.parse(req);
    });

    app.get("/data", async(req, res) => {
        var arr = await functions.getCPU()
        arr = arr.filter(item => item)
        res.send(arr)
        res.end();
    })
}
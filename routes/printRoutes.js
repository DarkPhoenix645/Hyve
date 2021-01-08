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

    app.get('/api/download', async(req, res) => {
        functions.getDateTime(req.ip, req.url, req.method) 
        if (req.query.folder) {
            var folder = req.query.folder
            if (folder.includes("..;..") === true) {
                var folders = req.query.files.replace(/..;..|%20/g, " ")
                var outputZip = await(functions.zip(folders, Date.now()))
                outputZip === "Error!" ? res.send("Error!") : res.download(outputZip)
            } else {
                outputZip = await(functions.zip(folder, Date.now()))
                outputZip === "Error!" ? res.send("Error!") : res.download(outputZip)
            }
        }
    })

    app.get('/api/listFiles', async(req, res) => {
        functions.getDateTime(req.ip, req.url, req.method)
        var files = await fs.readdirSync(process.env.UPLOADS_DIR1)
        var output = await functions.processData(files)
        res.send(output)
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
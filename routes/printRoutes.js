require("dotenv").config()
const functions = require("../functions");
const formidable = require("formidable");
const fs = require("fs");
const { exec } = require("child_process");

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

    app.get('/api/download', async(req, res) => {
        functions.getDateTime(req.ip, req.url, req.method) 
        if (req.query.folder) {
            var query = req.query.folder
            if (query.includes("..;..") === true) {
                var folders = query.replace(/..;..|%20/g, '" "')
                var outputZip = await functions.zip(folders, Date.now())
                outputZip === "Error!" ? res.status(500).send("Error!") : res.status(200).download(outputZip)
            } else {
                if (fs.existsSync(process.env.UPLOADS_DIR1 + query)) {
                    outputZip = await functions.zip(folder, Date.now())
                    outputZip === "Error!" ? res.status(500).send("An error occurred while zipping the folder!") : res.status(200).download(outputZip)
                } else { res.status(404).send("Folder not found!") }
            }
        }
        else if (req.query.file) {
            var query = req.query.file
            if (req.query.file.includes("..;..") === true) {
                var files = query.replace(/..;..|%20/g, '" "')
                var outputZip = await functions.zip(files, Date.now())
                outputZip === "Error!" ? res.status(500).send("Error!") : res.status(200).download(outputZip)
            } else {
                fs.existsSync(process.env.UPLOADS_DIR1 + query) === true ? 
                    res.status(200).download(process.env.UPLOADS_DIR1 + query) : 
                    res.status(404).send("File not found!")
            }
        }
    })

    app.get('/api/listFiles', async(req, res) => {
        functions.getDateTime(req.ip, req.url, req.method)
        var files = await fs.readdirSync(process.env.UPLOADS_DIR1)
        var output = await functions.processData(files)
        res.json(output)
    })

    app.post('/api/upload', async function(req, res){
        functions.getDateTime(req.ip, req.url, req.method)
        var form = new formidable.IncomingForm();
        var subDir = []
        var files = []
        form.maxFileSize = 10000 * 1024 * 1024
        form.multiples = true;
        form.uploadDir = process.env.UPLOADS_DIR1
        form.on('file', async function(field, file) {
            var x = file.name.replace(/\/[^\/]+$/,"")
            if (!subDir.includes(x)) { subDir.push(x) } 
            files.push(file)
        });
        form.on('error', function(err) { console.log('An error has occured: ' + err); });
        form.on('end', function() { 
            functions.manageUploads(subDir, files)
            res.end('File(s) uploaded and saved!'); 
        });
        form.parse(req);
      });
      
    app.post('/api/uploadDir', async function(req, res){
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
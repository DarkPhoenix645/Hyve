import functions from "../scripts/functions";
import formidable from "formidable";
import { requireAuth } from "../scripts/authChecker";
import fs from "fs";

module.exports = function(app) {
    app.post('/printFile', requireAuth, (req, res) => { 
        var fileName = `'${process.env.UPLOADS_DIR1}${req.query.fileName}'`      
        functions.printFunction(fileName);
        res.status('200')
    });

    app.get('/cancelAll', requireAuth, (req, res) => {
        functions.cancelAll();
        res.status(200);
    });
    
    app.get('/cancelOne', requireAuth, (req, res) => {
        functions.cancelOne(req.query.job_id);
        res.status(200);
    });

    app.get('/currentJobs', requireAuth, async (req, res) => {
        currentJobs = await functions.getCurrentJobs()
        currentJobs = JSON.stringify(currentJobs)
        res.status(200).send(currentJobs);
    });

    app.get('/api/download', requireAuth, async(req, res) => {
        if (req.query.folder) {
            var query = req.query.folder
            if (query.includes("..;..") === true) {
                var folders = query.replace(/..;..|%20/g, '" "')
                var outputZip = await functions.zip(folders, Date.now())
                if (outputZip === "Error!") { res.status(500).send("Error!") }
                res.status(200).download(outputZip, (err) => {
                    if (err) {
                        console.log(err)
                        return
                    }
                    fs.unlinkSync(outputZip)
                    res.end()
                })
            } else {
                if (fs.existsSync(process.env.UPLOADS_DIR1 + query)) {
                    outputZip = await functions.zip(query, Date.now())
                    if (outputZip === "Error!") { res.status(500).send("Error!") }
                    res.status(200).download(outputZip, (err) => {
                        if (err) {
                            console.log(err)
                            return
                        }
                        fs.unlinkSync(outputZip)
                        res.end()
                    })
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

    app.post('/api/upload', requireAuth, async function(req, res){
        if (req.query.type === "folder") {
            var form = new formidable.IncomingForm();
            var subDir = []
            var files = []
            form.maxFileSize = 10000 * 1024 * 1024
            form.multiples = true;
            form.uploadDir = process.env.UPLOADS_DIR1
            form.on('file', function(field, file) {
                var x = file.name.replace(/\/[^\/]+$/,"")
                if (!subDir.includes(x)) { subDir.push(x) } 
                files.push(file)
            });
            form.on('error', function(err) { 
                console.log('An error has occured: ' + err); 
            });
            form.on('end', function() { 
                functions.manageUploads(subDir, files)
                res.end('File(s) uploaded and saved!'); 
            });
            form.parse(req);
        } 
        else if (req.query.type === "file") {
            var form = new formidable.IncomingForm();
            form.maxFileSize = 10000 * 1024 * 1024
            form.multiples = true;
            form.uploadDir = process.env.UPLOADS_DIR1
            form.on('file', function(field, file) {
                fs.renameSync(file.path, process.env.UPLOADS_DIR1 + file.name)
            });
            form.on('error', function(err) { 
                console.log('An error has occured: ' + err); 
            });
            form.on('end', function() { 
                res.end('File(s) uploaded and saved!'); 
            });
            form.parse(req);
        }
    });

    app.get('/api/listFiles', requireAuth, (req, res) => {
        var files = fs.readdirSync(process.env.UPLOADS_DIR1)
        async function middle (files) {
            var output = await functions.processData(files)
            res.json(output)
        }
        files.length === 0 ? res.send("No files found!") : middle(files)
    })
      
    app.get("/data", requireAuth, async(req, res) => {
        var arr = await functions.getCPU()
        arr = arr.filter(item => item)
        res.send(arr)
        res.end();
    })
}
import { Router } from 'express';
import formidable from 'formidable';
import fs from 'fs';
import functions from '../scripts/media/mediaFunctions';
import { requireAuth } from '../scripts/auth/authChecker';
const router = new Router();

router.get('/api/download', requireAuth, async(req, res) => {
    
    // Only folders prop present in body object
    if (req.body['folders'] && !req.body['files']) {
        const folders = req.body['folders'];

        if (folders.length >= 1) {
            for (const folder of folders) {
                if (!fs.existsSync(process.env.UPLOADS_DIR1 + folder)) { res.status(404).send(`Folder ${folder} not found!`); return; };
            };

            try {
                const outputZip = await functions.zip(folders, Date.now());
                res.status(200).download(outputZip, () => {
                    fs.unlinkSync(outputZip);
                    res.end();
                });
            } catch (err) {
                res.status(500).send('An unexpected error occurred!');
                console.log(err);
            };
        } else { res.status(400).send('No files requested!'); };

    }

    // Only files prop present in body object
    else if (req.body['files'] && !req.body['folders']) {
        const files = req.body['files'];
        
        if (files.length === 1) {
            res.status(200).download(process.env.UPLOADS_DIR1 + files[0])
        } else if (files.length > 1) {
            for (const file of files) {
                if (!fs.existsSync(process.env.UPLOADS_DIR1 + file)) { res.status(404).send(`File ${file} not found!`); return; };
            };
    
            try {
                const outputZip = await functions.zip(files, Date.now());
                res.status(200).download(outputZip, () => {
                    fs.unlinkSync(outputZip);
                    res.end();
                });
            } catch (err) {
                res.status(500).send('An unexpected error occurred!');
                console.log(err);
            };
        } else { res.status(400).send('No files requested!'); };
    } 
    
    // Both folders and files props present in body object
    else if (req.body['files'] && req.body['folders']) {
        const files = req.body['files'];
        const folders = req.body['folders'];

        if (files.length >= 1 && folders.length >= 1) {
            const items = [...files, ...folders];

            for (const item of items) {
                if (!fs.existsSync(process.env.UPLOADS_DIR1 + item)) { res.status(404).send(`File/Folder ${item} not found!`); return; };
            };

            try {
                const outputZip = await functions.zip(items, Date.now());
                res.status(200).download(outputZip, () => {
                    fs.unlinkSync(outputZip);
                    res.end();
                });
            } catch (err) {
                res.status(500).send('An unexpected error occurred!');
                console.log(err);
            };
        } else { res.status(400).send('No files/folders requested!'); };
    } 
    
    // Neither folders nor files props present in body object i.e. essentially empty request
    else { res.status(400).send('No files/folders requested!'); };
});

router.post('/api/upload', requireAuth, async function(req, res){
    if (req.query.type === 'folder') {
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
    else if (req.query.type === 'file') {
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

router.get('/api/listFiles', requireAuth, (req, res) => {
    var files = fs.readdirSync(process.env.UPLOADS_DIR1)
    async function middle (files) {
        var output = await functions.processData(files)
        res.json(output)
    }
    files.length === 0 ? res.send('No files found!') : middle(files)
});

export default router;
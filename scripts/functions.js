require('dotenv').config()
const { exec } = require('child_process');
const fs = require('fs');
const port = process.env.PORT;
const functions = require("./print")
var memArr = []
var public_ip = ""
var local_ip = ""

function convert(fileName) {
    var file = fileName
    fileName = fileName.substring(fileName.lastIndexOf("/") + 1)
    fileName = fileName.substring(0, fileName.lastIndexOf("."))
    fileName = `${process.env.UPLOADS_DIR1}${fileName}.pdf`
    exec(`unoconv --format pdf --output ${fileName} ${file}`, (error, stdout, stderr) => {
        if (error) {console.log(`${error}`)} else if (stderr) {console.log("stderr" + `${stderr}`)}
        console.log(fileName)
        functions.printFunction(fileName)
    })
}

function mkdir(dir) {
    fs.mkdirSync(process.env.UPLOADS_DIR1 + dir, (err) => {
        if (err) { console.log(err) }
    })
}

function nameChanger(file) {
    fs.renameSync(file.path, process.env.UPLOADS_DIR1 + file.name)
}

function ip() {
    return new Promise(resolve => {
        var arr = []
        exec(process.env.SERVER_LOG_LOCAL_IP, (error, stdout, stderr) => {
            if (error) {
                console.log(`error: ${error.message}`);
                return;
            }
            if (stderr) {
                console.log(`An error occured : ${stderr}`);
                return;
            }
            stdout = `${stdout}`;
            stdout = stdout.replace(/(\r\n|\n|\r)/gm,"");
            stdout = stdout.replace(" ", "");
            local_ip = "http://" + stdout + ':' + port
            arr.push(local_ip)
        });
        
        exec(process.env.SERVER_LOG_PUBLIC_IP, (error, stdout, stderr) => {
            if (error) {
                console.log(`error: ${error.message}`);
                return;
            }
            if (stderr) {
                console.log(`An error occured : ${stderr}`);
                return;
            }
            stdout = `${stdout}`;
            stdout = stdout.replace(/(\r\n|\n|\r)/gm,"");
            stdout = stdout.replace(" ","")
            public_ip = "http://" + stdout + ':' + port
            arr.push(public_ip)
            resolve(arr)
        });
    })
} 


module.exports = {
    printFunction: (fileName) => {
        exec(`lp ${fileName}`, (error, stdout, stderr) => {
            if (error) {
                console.log(`An error occurred while executing the print job : ${error}`)
                convert(fileName)
            } else if (stderr) {
                console.log(`An error occurred while executing the print job : ${stderr}`)
            }
            var optimisedOutput = stdout.replace('request id is', 'Request ID for print job is')
            var optimisedOutput = optimisedOutput.replace(/(\r\n|\n|\r)/gm,"")
            console.log(optimisedOutput);
        })
    },

    cancelAll: () => {
        exec(process.env.CANCEL_ALL_EXEC, (error, stdout, stderr) => {
            if (error) { console.log(error) } 
            else if (stderr) { console.log(stderr) }
            console.log(stdout);
        })
    },

    cancelOne: (job_id) => {
        exec(process.env.CANCEL_ONE_EXEC + job_id, (error, stdout, stderr) => {
            if (error) { console.log(`An error occurred while cancelling the print job : ${error}`) } 
            else if (stderr) { console.log(`An error occurred while cancelling the print job : ${stderr}`) }
            console.log(stdout);
        })
    },

    getCurrentJobs: async() => {
        return new Promise((resolve) => {
            exec(process.env.CURRENT_PRINT_JOBS, (error, stdout, stderr) => {
                if (error) { console.log(`An error occurred : ${error}`) }
                else if (stderr) { console.log(`An error occurred : ${error}`) }
                currentJobs = stdout.replace(/(\r\n|\n|\r)/gm,"")
                var Obj = { 
                    Deskjet_1050_J410: "Printer name : Deskjet 1050 J410", 
                    nilanjan: " ", 
                    4096: " " 
                }; 
                currentJobs = currentJobs.replace(/Deskjet_1050_J410|nilanjan|4096/gi, function(matched){ return Obj[matched]; }); 
                currentJobs = currentJobs.replace(/Monday|Tuesday|Wedenesday|Thursday|Friday|Saturday|Sunday/gi, ' Date & Time')
                resolve(currentJobs);
            })
        })
    },

    manageUploads: async(subDir, files) => {
        await subDir.forEach(mkdir)
        files.forEach(nameChanger)
    },

    zip: async(files, date) => {
        return new Promise((resolve) => {
            exec(`cd uploads && zip "${process.env.DOWNLOADS_DIR}${date}.zip" "${files}" -r`, (error, stdout, stderr) => {
                if (error) { resolve("Error!") }
                else if (stderr) { resolve("Error!") }
                else if (stdout) { resolve(`${process.env.DOWNLOADS_DIR}${date}.zip`); }
            })
        })
    },

    convertBytes: (input) => {
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
    },

    processData: (files) => {
        return new Promise((resolve) => {
        var data = { totalItems:"", files:{}, folders:{} }
        var buffer = { name: "", size: "", birthTime: "", downloadLink: "" }
        var fileCounter = 0
        var dirCounter = 0
        files.forEach((item, index) => {
            fs.stat(process.env.UPLOADS_DIR1 +  item, async function(err, stats) {
                if (stats.isFile() === false) {
                    dirCounter += 1
                    buffer.name = item 
                    buffer.birthTime = (new Date(stats.birthtimeMs).toLocaleString('default', { weekday: 'short', year: 'numeric', month: 'long', day: 'numeric' })).slice(5)
                    buffer.size = "-"
                    buffer.downloadLink = public_ip + "/api/download?folder=" + encodeURI(item)
                    data.folders[dirCounter] = buffer
                    buffer = { name: "", size: "", birthTime: "", downloadLink: "" }
                } else if (stats.isFile() === true) {
                    fileCounter += 1
                    buffer.name = item 
                    buffer.birthTime = (new Date(stats.birthtimeMs).toLocaleString('default', { weekday: 'short', year: 'numeric', month: 'long', day: 'numeric' })).slice(5)
                    buffer.size = await functions.convertBytes(stats.size, true)
                    buffer.downloadLink = public_ip + "/api/download?file=" + encodeURI(item)
                    data.files[fileCounter] = buffer
                    buffer = { name: "", size: "", birthTime: "", downloadLink: "" }
                } else if (err) {console.log(err)}
                if (dirCounter + fileCounter === files.length) {
                    data.totalItems = files.length
                    data.totalFolders = dirCounter
                    data.totalFiles = fileCounter
                    resolve(data)
                }
            })
        })
    })
    },

    getCPU: async() => {
        return new Promise((resolve) => {
            exec(process.env.CPU_EXEC, async(error, stdout, stderr) => {
                if (error) {console.log(`${error}`)} else if (stderr) {console.log(`${stderr}`)}
                var cpuUsage = await functions.cpuUsage()
                var out = `${stdout}`
                out = out.replace(/  /g, "")
                out = out.replace(/(\r\n|\n|\r)/g, "xy")
                out = out.split("xy")
                out.length = 8
                out = cpuUsage.concat(out)
                usedMem = await functions.getUsedMem()
                usedMem = await functions.convertBytes(usedMem)
                totalMem = await functions.getTotalMem()
                totalMem = await functions.convertBytes(totalMem)
                core = await functions.singleCore()
                memArr.push("Memory used: " + usedMem)
                memArr.push("Total memory: " + totalMem)
                out = out.concat(memArr)
                out = core.concat(out)
                memArr = []
                core = []
                resolve(out)
            })
        })
    },

    shutDown: () => {
        exec("shutdown +5", (error, stderr, stdout) => {
            if (error) {
                console.log(`error: ${error.message}`);
                return;
            }
            if (stderr) {
                console.log(`An error occured : ${stderr}`);
                return;
            }
            stdout = `${stdout}`;
            stdout = stdout.replace(/(\r\n|\n|\r)/gm,"");
            console.log(stdout)
        });
    },
    
    serverLogging : async() => {
        var ip_arr = await ip()
        console.log("Server running at", ip_arr[0])
        console.log("Server also running at", ip_arr[1])
    }
}
require('dotenv').config()
const { exec } = require('child_process');
const os = require('os');
const fs = require('fs');
const port = 8080;
const functions = require("./print")
var memArr = []

function convert(fileName) {
    exec("soffice --convert-to pdf " + fileName + " --outdir " + __dirname + "/uploads", (error, stdout, stderr) => {
        if (error) {console.log("err" + `${error}`)} else if (stderr) {console.log("stderr" + `${stderr}`)}
        stdout = `${stdout}`
        stdout = stdout.replace(/(\r\n|\n|\r)/gm, "")
        stdout = stdout.replace(/using.+/g,"$'")
        stdout = /\/([^->]*)$/.exec(stdout)[1]
        functions.printFunction("/" + stdout)
    })
}

module.exports = {
    getDateTime: (ip, url, method) => {
        var dt = Date()
        d = dt.slice(4, 15).replace(/ /g, "/")
        t = dt.slice(16, 33).replace("GMT", "GMT ")
        console.log(method.toUpperCase() + " request from " + ip.replace(/::ffff:192.168./, "(Local Client) 192.168.") + " for URL " + url + " at " + t + " on " + d) 
    },

    printFunction: (fileName) => {
        exec("lp " + fileName, (error, stdout, stderr) => {
            if (error) {
                console.log("An error occurred while executing the print job : " + `${error}`)
                convert(fileName)
            } else if (stderr) {
                console.log("An error occurred while executing the print job : " +`${stderr}`);
            }
            stdout = `${stdout}`
            var optimisedOutput = stdout.replace('request id is', 'Request ID for print job is')
            var optimisedOutput = optimisedOutput.replace(/(\r\n|\n|\r)/gm,"")
            console.log(optimisedOutput);
        })
    },

    cancelAll: () => {
        exec(process.env.CANCEL_ALL_EXEC, (error, stdout, stderr) => {
            if (error) {
                console.log(`${error}`)
            } else if (stderr) {
                console.log(`${stderr}`)
            }
            var stdout = `${stdout}`
            console.log(stdout);
        })
    },

    cancelOne: (job_id) => {
        exec(process.env.CANCEL_ONE_EXEC + job_id, (error, stdout, stderr) => {
            if (error) {
                optimisedOutput = "An error occurred while cancelling the print job : " + `${error}`;
            } else if (stderr) {
                optimisedOutput = "An error occurred while cancelling the print job : " + `${stderr}`;
            }
            var stdout = `${stdout}`
            console.log(stdout);
        })
    },

    getCurrentJobs: async() => {
        return new Promise((resolve) => {
            exec(process.env.CURRENT_PRINT_JOBS, (error, stdout, stderr) => {
                if (error) {
                    optimisedOutput = "An error occurred : " + `${error}`;
                } else if (stderr) {
                    optimisedOutput = "An error occurred : " + `${stderr}`;
                }
                currentJobs = `${stdout}`
                currentJobs = currentJobs.replace(/(\r\n|\n|\r)/gm,"")
                var Obj = { 
                    Deskjet_1050_J410: "Printer name : Deskjet 1050 J410", 
                    nilanjan: " ", 
                    4096: " " 
                }; 
                currentJobs = currentJobs.replace(/Deskjet_1050_J410|nilanjan|4096/gi, function(matched){ 
                    return Obj[matched]; 
                }); 
                currentJobs = currentJobs.replace(/Monday|Tuesday|Wedenesday|Thursday|Friday|Saturday|Sunday/gi, ' Date & Time')
                resolve(currentJobs);
            })
        })
    },

    download: async(files, date) => {
        return new Promise((resolve) => {
            exec("cd " + process.env.UPLOADS_DIR1 + " && " + process.env.ZIP_EXEC + " " + process.env.DOWNLOADS_DIR + date + ".zip " + process.env.UPLOADS_DIR1 + files + " -r", (error, stdout, stderr) => {
                if (error) {console.log(`${error}`)} else if (stderr) {console.log(`${stderr}`)}
                resolve("Hyve-" + date + ".zip");
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
    
    serverLogging : () => {
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
            console.log('Server running at http://' + stdout + ':' + port)
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
            console.log('Server also running at http://' + stdout + ':' + port)
        });
    }
}
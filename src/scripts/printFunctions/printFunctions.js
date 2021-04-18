import { exec } from "child_process";

function printFunction (fileName) {
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
}

function convert(fileName) {
    var file = fileName
    fileName = fileName.substring(fileName.lastIndexOf("/") + 1)
    fileName = fileName.substring(0, fileName.lastIndexOf("."))
    fileName = `${process.env.UPLOADS_DIR1}${fileName}.pdf`
    exec(`unoconv --format pdf --output ${fileName} ${file}`, (error, _, stderr) => {
        if (error) {console.log(`${error}`)} else if (stderr) {console.log("stderr" + `${stderr}`)}
        console.log(fileName)
        printFunction(fileName)
    })
}

function cancelAll () {
    exec(process.env.CANCEL_ALL_EXEC, (error, stdout, stderr) => {
        if (error) { console.log(error) } 
        else if (stderr) { console.log(stderr) }
        console.log(stdout);
    })
}

function cancelOne (job_id) {
    exec(process.env.CANCEL_ONE_EXEC + job_id, (error, stdout, stderr) => {
        if (error) { console.log(`An error occurred while cancelling the print job : ${error}`) } 
        else if (stderr) { console.log(`An error occurred while cancelling the print job : ${stderr}`) }
        console.log(stdout);
    })
}

async function getCurrentJobs() {
    return new Promise((resolve) => {
        exec(process.env.CURRENT_PRINT_JOBS, (error, stdout, stderr) => {
            if (error) { console.log(`An error occurred : ${error}`) }
            else if (stderr) { console.log(`An error occurred : ${error}`) }
            var currentJobs = stdout.replace(/(\r\n|\n|\r)/gm,"")
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
}

export default {
    printFunction,
    cancelAll,
    cancelOne,
    getCurrentJobs
};
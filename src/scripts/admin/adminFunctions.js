import { exec } from 'child_process';
import functions from "./adminData";
import helpers from "../helpers";
var memArr = [];

async function getCPU() {
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
            var usedMem = await functions.getUsedMem()
            usedMem = await helpers.convertBytes(usedMem)
            var totalMem = await functions.getTotalMem()
            totalMem = await helpers.convertBytes(totalMem)
            var core = await functions.singleCore()
            memArr.push("Memory used: " + usedMem)
            memArr.push("Total memory: " + totalMem)
            out = out.concat(memArr)
            out = core.concat(out)
            memArr = []
            core = []
            resolve(out)
        })
    })
}

function shutDown(time) {
    if (typeof time !== 'number') { return new Error('Invalid time value!'); };
    exec(`shutdown +${time}`, (error, stderr, stdout) => {
        if (error) { return new Error(error); };
        if (stderr) { return new Error(stderr); };
        stdout = `${stdout}`;
        stdout = stdout.replace(/(\r\n|\n|\r)/gm,"");
        console.log(stdout);
    });
}

function stop(time) {
    if (typeof time !== 'number') { return new Error('Invalid time value!'); };
    setTimeout(() => { process.exit(0) }, time);
}

export default {
    getCPU,
    shutDown,
    stop
}
import { exec } from "child_process";
import cpuStat from "./cpu";
var coreCount = cpuStat.totalCores()
var memArr = []

//Helper Functions for Exported Functions
function getCoreUsage(i) {
    return new Promise(async(resolve) => {
        if (i === 0) {
            cpuStat.usagePercent({coreIndex: i,sampleMs: 250,},
            async function(err, percent, _) {
                if (err) {resolve(console.log(err))}
                var x = await percent
                resolve("Core 1: " + x.toFixed(2) + "%");
            });
        } else {
            cpuStat.usagePercent({coreIndex: i,sampleMs: 250,},
                async function(err, percent, _) {
                    if (err) {resolve(console.log(err))}
                    var x = await percent
                    resolve(x);
            });
        }
    })
}

function maxClock() {
    return new Promise(async(resolve) => {
        exec("lscpu | grep 'CPU max MHz'", (error, stdout, stderr) => {
            if (error) { return new Error(error) };
            if (stderr) { return new Error(stderr) };
            var out = parseFloat(`${stdout}`.replace(/CPU max MHz:| |(\r\n|\n|\r)/g, "")) / 1000
            resolve(out)
        })
    })
}

async function cpuUsage () {
    var max = await maxClock()
    return new Promise((resolve) => {
    cpuStat.usagePercent(function (err, percent, _) {
        if (err) { return new Error(err); }
        var currentClock = cpuStat.avgClockMHz()
        var arr = "CPU: " + percent.toFixed(2) + "%," + "Current CPU Clock:" + (currentClock / 1000).toFixed(2) + ",Max CPU Clock:" + max.toFixed(2)
        arr = arr.split(",")
        resolve(arr);
    });
    })
};

async function singleCore() {
    return new Promise(async(resolve) => {
        for (let i = 0; i <= coreCount; i++) {
            if (i < coreCount) {var core = await getCoreUsage(i); memArr.push(core);}
            else if (i === coreCount) {resolve(memArr); memArr = [];}
        }
    })
};

async function getUsedMem() {
    return new Promise((resolve) => {
        exec("free -b  | grep ^Mem | tr -s ' ' | cut -d ' ' -f 3", (error, stdout, stderr) => {
            if (error) {console.log(`${error}`)} else if (stderr) {console.log(`${stderr}`)}
            stdout = `${stdout}`.replace(/(\r\n|\n|\r)/gm, "")
            resolve(stdout);
        })
    })
};

async function getTotalMem() {
    return new Promise((resolve) => {
        exec("free -b  | grep ^Mem | tr -s ' ' | cut -d ' ' -f 2", (error, stdout, stderr) => {
            if (error) {console.log(`${error}`)} else if (stderr) {console.log(`${stderr}`)}
            stdout = `${stdout}`.replace(/(\r\n|\n|\r)/gm, "")
            resolve(stdout);
        })
    })
};

//Exported Functions
export default {
    cpuUsage,
    singleCore,
    getUsedMem,
    getTotalMem
}
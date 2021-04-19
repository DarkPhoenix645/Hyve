import { networkInterfaces } from 'os';
import fs from 'fs';
import http from 'http';
import test from './media/mediaFunctions';
const port = process.env.PORT;
const securePort = process.env.SECURE_PORT;
var ip_obj = {};

function check (fileName, relativeDir) {
    var result = fs.existsSync(__dirname.substring(0, __dirname.lastIndexOf('/')) + relativeDir + fileName)
    return result
}

function convertBytes (input, humanReadable) {
    return new Promise((resolve) => {
        if (input < 999999) {
            input = input /  1000
            humanReadable === true ? resolve(input.toFixed(2) + " KB") : resolve(input.toFixed(2))
        } else if (input < 999999999 && input > 999999) {
            input = input /  1000000
            humanReadable === true ? resolve(input.toFixed(2) + " MB") : resolve(input.toFixed(2))
        } else if (input < 999999999999 && input > 999999999) {
            input = input /  1000000000
            humanReadable === true ? resolve(input.toFixed(2) + " GB") : resolve(input.toFixed(2))
        }
    })
}

async function ip() {
    var public_ip = '';
    var local_ip = [];

    return new Promise(resolve => {
        try {
            for (const name of Object.keys(networkInterfaces())) {
                for (const net of networkInterfaces()[name]) {
                    if (net.family === 'IPv4' && net.internal !== true) { local_ip.push(net.address); };
                };
            };
            
            http.get('http://checkip.amazonaws.com/', async (res) => {
                res.setEncoding('utf8');
                res.on('data', (chunk) => {
                    public_ip += chunk;
                });

                res.on('end', () => {
                    public_ip = public_ip.replace(/(\r\n|\n|\r)/gm, '');
                    ip_obj = { 'public_ip': public_ip, 'local_ip': local_ip };
                    resolve(1);
                });

                res.on('error', (e) => {
                    throw new Error(e);
                })
            });
        } catch (e) {
            console.log(e);
            resolve(0);
        }
    })
};

async function serverLogging (arg) {
    if (arg === 0) { 
        const local_ip_arr = ip_obj['local_ip'];
        console.log(`Server running at ${ip_obj['public_ip']}:${securePort}`);
        for (let i = 0; i < local_ip_arr.length; i++) { console.log(`Server running at ${local_ip_arr[i]}:${securePort}`) };
    };
    if (arg === 1) { 
        console.log(`Connected to database with URL ${process.env.DATABASE_LOGIN}`);
    };
    if (arg === 2) {
        const local_ip_arr = ip_obj['local_ip'];
        console.log(`Server running at ${ip_obj['public_ip']}:${port}`);
        for (let i = 0; i < local_ip_arr.length; i++) { console.log(`Server running at ${local_ip_arr[i]}:${port}`) };
    };
}

function dateMsToHuman (date) {
    const dt = Date(date);
    const d = dt.slice(4, 15).replace(/ /g, "/");
    const t = dt.slice(16, 24);
    const offset = dt.slice(26, 33);

    return { d, t, offset, dt };
}

export default {
    check,
    convertBytes,
    ip,
    serverLogging,
    dateMsToHuman
}
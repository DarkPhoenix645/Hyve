var script = "";
var exec_interpreter = "";

if (process.env.NODE_ENVIRONMENT === "production") {
    script = "dist/app.js";
    exec_interpreter = "node";
}

if (process.env.NODE_ENVIRONMENT === "development") {
    script = "src/app.js";
    exec_interpreter = "babel-node";
}

module.exports = {
    apps: [{
        name: "Hyve",
        script: script,
        exec_interpreter: exec_interpreter,
        max_restarts: 10,
        env: {
            CURRENT_PRINT_JOBS: "lpstat",
            PRINT_EXEC: "lp ",
            CANCEL_ALL_EXEC: "cancel -a",
            CANCEL_ONE_EXEC: "cancel Deskjet-1050-J410-",
            DOWNLOADS_DIR: "/home/nilanjan/Desktop/Git/Hyve/data/downloads-temp/",
            UPLOADS_DIR1: "/home/nilanjan/Desktop/Git/Hyve/data/uploads-temp/",
            CPU_EXEC: "lscpu | grep -E 'Architecture|Vendor ID|Model name'",
            SERVER_LOG_LOCAL_IP: "hostname -I",
            SERVER_LOG_PUBLIC_IP: "dig +short myip.opendns.com @resolver1.opendns.com",
            PORT: 8080,
            SECURE_PORT: 8443,
            JWT_SECRET: "",
            DATABASE_LOGIN: ""
        }
    }]
}
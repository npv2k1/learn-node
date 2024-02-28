console.log("start");

let pidusage = require("pidusage");

const cp = require("child_process");

const child = cp.spawn("ls");

console.log("🚀 ~ file: index.js:8 ~ child", child.pid);

child.on("message", function (payload) {
  console.log(payload.memUsage);
});
pidusage(child.pid, function (err, stats) {
  console.log(stats, err);
});
/*
Output: 
{
   cpu: 10.0,            // percentage (from 0 to 100*vcore)
   memory: 357306368,    // bytes
   ppid: 312,            // PPID
   pid: 727,             // PID
   ctime: 867000,        // ms user + system time
   elapsed: 6650000,     // ms since the start of the process
   timestamp: 864000000  // ms since epoch
}
*/

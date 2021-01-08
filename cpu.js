var os = require('os');

module.exports = {
  usagePercent: usagePercent,
  totalCores: totalCores,
  clockMHz: clockMHz,
  avgClockMHz: avgClockMHz,
};


function usagePercent(opts, cb) {
  //declarations
  var cpus = os.cpus();
  var timeUsed;
  var timeUsed0 = 0;
  var timeUsed1 = 0;
  var timeIdle;
  var timeIdle0 = 0;
  var timeIdle1 = 0;
  var cpu1;
  var cpu0;
  var time;

  if (typeof opts === 'function') {
    cb = opts;
    opts = {
      coreIndex: -1,
      sampleMs: 1000,
    };
  } else {
    opts.coreIndex = opts.coreIndex || -1;
    opts.sampleMs = opts.sampleMs || 1000;
  }

  //check if logical core exists
  if (opts.coreIndex < -1 ||
      opts.coreIndex >= cpus.length ||
      typeof opts.coreIndex !== 'number' ||
      Math.abs(opts.coreIndex % 1) !== 0
  ) {
    _error(opts.coreIndex, cpus.length);
    return cb('coreIndex "' + opts.coreIndex + '" out of bounds, ' +
      'should be [0, ' + (cpus.length - 1) + ']');
  }

  //all cpu's average
  if (opts.coreIndex === -1) {
    //first measurement
    cpu0 = os.cpus();
    time = process.hrtime();

    setTimeout(function() {
      //second measurement
      cpu1 = os.cpus();

      var diff = process.hrtime(time);
      var diffSeconds = diff[0] + diff[1] * 1e-9;

      //number crunching and outputs
      for (var i = 0; i < cpu1.length; i++) {
        timeUsed1 += cpu1[i].times.user;
        timeUsed1 += cpu1[i].times.nice;
        timeUsed1 += cpu1[i].times.sys;
        timeIdle1 += cpu1[i].times.idle;
      }

      for (i = 0; i < cpu0.length; i++) {
        timeUsed0 += cpu0[i].times.user;
        timeUsed0 += cpu0[i].times.nice;
        timeUsed0 += cpu0[i].times.sys;
        timeIdle0 += cpu0[i].times.idle;
      }

      timeUsed = timeUsed1 - timeUsed0;
      timeIdle = timeIdle1 - timeIdle0;

      var percent = (timeUsed / (timeUsed + timeIdle)) * 100;
      
      return cb(null, percent, diffSeconds);
    }, opts.sampleMs);

  //for just one cpu core
  } else {
    //take first measurement
    cpu0 = os.cpus();
    time = process.hrtime();

    setTimeout(function() {
      //take second measurement
      cpu1 = os.cpus();

      var diff = process.hrtime(time);
      var diffSeconds = diff[0] + diff[1] * 1e-9;

      //number crunching and outputs
      timeUsed1 += cpu1[opts.coreIndex].times.user;
      timeUsed1 += cpu1[opts.coreIndex].times.nice;
      timeUsed1 += cpu1[opts.coreIndex].times.sys;
      timeIdle1 += cpu1[opts.coreIndex].times.idle;
      timeUsed0 += cpu0[opts.coreIndex].times.user;
      timeUsed0 += cpu0[opts.coreIndex].times.nice;
      timeUsed0 += cpu0[opts.coreIndex].times.sys;
      timeIdle0 += cpu0[opts.coreIndex].times.idle;
      
      var timeUsed = timeUsed1 - timeUsed0;
      var timeIdle = timeIdle1 - timeIdle0;
      var percent = (timeUsed / (timeUsed + timeIdle)) * 100;

      return cb(null, "Core " + (opts.coreIndex + 1) + ": " + percent.toFixed(2) + "%", diffSeconds);
    }, opts.sampleMs);

  }
}

function totalCores() {
  return os.cpus().length;
}

function clockMHz(coreIndex) {
  var cpus = os.cpus();

  //check if input is actually a core
  if (coreIndex < 0 ||
      coreIndex >= cpus.length ||
      typeof coreIndex !== 'number' ||
      Math.abs(coreIndex % 1) !== 0
  ) {
    _error(coreIndex, cpus.length);
    return 'coreIndex "' + coreIndex + '" out of bounds, ' + 'should be [0, ' + (cpus.length - 1) + ']';
  }
  return cpus[coreIndex].speed;
}

function avgClockMHz() {
  var cpus = os.cpus();
  var totalHz = 0;

  for (var i = 0; i < cpus.length; i++) {
    totalHz += cpus[i].speed;
  }

  var avgHz = totalHz / cpus.length;
  return avgHz;
}

function _error(coreIndex, cores) {
  var errMsg = 'Error: Core "' + coreIndex + '" not found, use one of ' + '[0, ' + (cores - 1) + '], ' + 'Your system only has ' + cores + ' cores.';
  console.log(errMsg);
}

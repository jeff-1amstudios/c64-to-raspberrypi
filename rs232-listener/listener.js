#!/usr/bin/env node
'use strict';

var SerialPort = require("serialport");

const mode = 0; // 0 = stdin/out (for use in VICE emulator), 1 = real serial port (assumes /dev/ttyUSB0)

function write(str) {
  str = str.toUpperCase();
  str = str.replace(/\n/g, '\r');
  if (mode === 1) {
    port.write(str, (e, bytesWritten) => {
      if (e) {
        console.error('error', e);
      }
    });
  }
  else {
    process.stdout.write(str);
  }
}

if (mode === 0) {
  // seems to be needed to 'wake up' the connection
  process.stdout.write('\x00');

  process.stdin.on('readable', () => {
    var chunk = process.stdin.read();
    if (chunk) {
      var raw = chunk.toString();
      process.stderr.write(raw.replace(/\r/g, '\n'));
      write(raw);
    }
  });

  process.stdin.on('end', () => {
    process.exit(0);
  });
  process.stdin.on('close', () => {
    process.exit(0);
  });
  process.stdout.on('error', () => {
    process.stderr.write('stdout error');
  });
}
else {
  var port = new SerialPort("/dev/ttyUSB0", {
    baudrate: 300
  });
  port.on('data', (data) => {
    if (data && data.length > 0) {
      var raw = data.toString();
      process.stderr.write(raw.replace(/\r/g, '\n'));
    }
  });

  process.stdin.on('readable', () => {
    var chunk = process.stdin.read();
    if (chunk) {
      var raw = chunk.toString();
      write(raw);
    }
  });
}

console.error('Listening...');
#!/usr/bin/env node

// load global modules
const program = require(`commander`);

// uses bar-server.js
program
    .version(`0.1.0`)
    .command(`service [name]`, `handles service commands`)
    .parse(process.argv);
#!/usr/bin/env node

// loading globals
const program = require(`commander`);
const express = require(`express`);
const app = express();

// loading classes
const BarService = require(`./classes/bar-service`);

// var config = require('./config/default.json')
var config = require(`./config/default.json`);
var boards = require(`./config/boards.json`);

config.port = 4300;
program
    .version(`0.0.1`)
    .command(`start`)
    .option(`-p, --port [port]`, `broadcast port`)
    .action((options) => {
        config.port = options.port || config.port;
        const server = new BarService(config, boards);
        server.start();
    });

program.parse(process.argv);
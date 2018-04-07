#!/usr/bin/env node

// loading globals
var program = require(`commander`);
const ClientService = require(`./classes/client-service.js`);

//
var cs = new ClientService();
// loading config files
var config = require(`./config/default.json`);
var boards = require(`./config/boards.json`);

/**
 * command: bar service start
 * port - broadcast port | default 4300
 */

program
    .command(`start`)
    .description(`launches the bar service in the background`)
    .option(`-p, --port [port]`, `broadcast port`)
    .action((options) => {
        config.port = options.port || config.port;
        cs.startService();
    });

/**
 * command: bar service stop
 */
program
    .command(`stop`)
    .description(`stops the service`)
    .action(() => {
        cs.stopService();
    });

/**
 * command: bar service status
 * gets the status of the service
 */

program
    .command(`status`)
    .description(`shows the status of the service`)
    .action(() => {
        cs.statusCheck();
    });

program.parse(process.argv);
#!/usr/bin/env node

// load global modules
const program = require(`commander`);
const express = require(`express`);

// uses bar-server.js
program
    .version(`0.1.0`)
    .command(`service [name]`, `handles service commands`)
    .parse(process.argv);
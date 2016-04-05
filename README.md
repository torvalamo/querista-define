# querista-define

![node version](http://img.shields.io/node/v/querista-define.svg)
[![npm version](https://badge.fury.io/js/querista-define.svg)](https://badge.fury.io/js/querista-define)

Mainly for internal use with Querista, hence lack of documentation.

Requires node to be run with `--harmony_rest_parameters` until they are included by default.

## Install

    npm install querista-define

## Use

    const define = require('querista-define');

E.g.:

    const blueprint = define('./def/pgsql');

where `def/pgsql` is a folder containing all the blueprints for pgsql statements.
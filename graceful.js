'use strict';

let functions = [];

let runFunctions = function() {
    for (var f in functions) {
        if (typeof functions[f] != "function") {
            continue;
        }
        if (functions[f]()) {
            return true;
        }
    }
    return false;
}

/**
 * clears all added functions.
 */
let clear = function() {
    functions = []
}

/**
 * add adds a new function to be called when an interrupt is received.
 * @param {f} function the function to add. If f returns true, shutdown will be prevented
 * and any other functions remaining in the chain will not be executed.
 */
let add = function(f) {
    functions.push(f)
}

function handle() {
    if (!runFunctions()) {
        process.exit()
    }
}

process.on('SIGINT', () => handle());
process.on('SIGTERM', () => handle());

module.exports = {
    add: add,
    clear: clear
}
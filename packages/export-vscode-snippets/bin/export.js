#!/usr/bin/env node

import {exportSnippets} from '../dist/main.mjs';

/**
 * Catch and report unexpected error.
 * @param {any} error The thrown error object.
 * @returns {void}
 */
function onCatchError(error) {
    console.error('Something went wrong. export-vscode-snippets. follow error message.');
    console.error(`${error.message}`);

    process.exit(1);
}

(function main() {
    process.on('uncaughtException', onCatchError);
    process.on('unhandledRejection', onCatchError);

    try {
        exportSnippets();
    } catch (err) {
        onCatchError(err);
    }
}());

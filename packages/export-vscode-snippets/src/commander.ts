import {program} from 'commander';

export const getOptions = (_argv: string[]): {
    config: string,
} => {
    program.option('-c, --config [string]', 'path to .export-snippets.config.js');
    program.parse(_argv);

    return program.opts();
};

import Snippet = export_vscode_snippets.Snippet; // eslint-disable-line
import SnippetType = export_vscode_snippets.SnippetType; // eslint-disable-line
import ExportSnippetsConfig = export_vscode_snippets.ExportSnippetsConfig; // eslint-disable-line
import SnippetsFile = export_vscode_snippets.SnippetsFile; // eslint-disable-line
import SnippetFinder = export_vscode_snippets.SnippetFinder; // eslint-disable-line
import {writeFileSync} from 'fs';
import {resolve} from 'path';
import {getOptions} from './commander';

export const generateSnippetsJson = (snippets: Snippet[]): SnippetsFile => {
    const result: SnippetsFile = {};

    snippets.forEach((snippet) => {
        if (Object.prototype.hasOwnProperty.call(result, snippet.name)) {
            return;
        }

        result[snippet.name] = {
            prefix: snippet.prefix,
            body: snippet.body.split('\n'),
            description: snippet.description,
        };
    });

    return result;
};

export const writeSnippetsJson = (snippets: Snippet[], type: SnippetType): void => {
    const result = generateSnippetsJson(snippets);

    writeFileSync(`${type}.json`, JSON.stringify(result, null, '  '), {encoding: 'utf-8'});
};

export const exportSnippets = async () => {
    // set commander options.
    const cwd = process.cwd();
    const argv = getOptions(process.argv);

    if (!argv.config) {
        console.error('export-vscode-snippets', 'please set path to .export-snippets.config.js');

        return;
    }

    const configModule = await import(resolve(cwd, argv.config));
    const config: ExportSnippetsConfig = configModule.default;
    const promises: Promise<SnippetFinder>[] = [];

    config.snippetFinderList.forEach((finder) => {
        promises.push(import(finder.finderName));
    });

    const finderList = await Promise.all(promises);

    finderList.forEach((finder, index) => {
        const snippetFinder = config.snippetFinderList[index];

        finder.findSnippets(config.src, snippetFinder.snippetSelector).then((snippets) => {
            writeSnippetsJson(snippets, snippetFinder.type);
        });
    });
};

import Snippet = export_vscode_snippets.Snippet; // eslint-disable-line
import SnippetSelector = export_vscode_snippets.SnippetSelector; // eslint-disable-line
import {globby} from 'globby';
import {HtmlParser} from './htmlParser';
import {Options} from 'node-html-parser';
import {HTMLFinderOption} from '../types';

export const type = 'html';

export const getEntries = (src: string): Promise<string[]> => {
    return globby([src, '!**/node_modules/**'], {
        expandDirectories: {
            extensions: ['html'],
        },
    });
};

export const findSnippets = async (src: string, snippetSelector: SnippetSelector, options?: HTMLFinderOption): Promise<Snippet[]> => {
    const entries = await getEntries(src);
    const result: Snippet[] = [];

    if (entries.length === 0) {
        console.log('There is no entry file.');

        return result;
    }

    const parser = new HtmlParser(snippetSelector);
    const parserOption = options?.['html-node-parser'] as Options;

    if (!parserOption) {
        console.log('There is no html-node-parser options.');
    }

    for (let i = 0, len = entries.length; i < len; i++) {
        const entryFile = entries[i];
        const html = parser.load(entryFile);
        const DOM = parser.parse(html, parserOption);
        const snippets = parser.find(DOM);

        result.push(...snippets);
    }

    return result;
};

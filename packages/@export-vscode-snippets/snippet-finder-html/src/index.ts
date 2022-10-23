import Snippet = export_vscode_snippets.Snippet; // eslint-disable-line
import SnippetSelector = export_vscode_snippets.SnippetSelector; // eslint-disable-line
import {globby} from 'globby';
import {HtmlParser} from './htmlParser';

export const type = 'html';

export const findSnippets = async (src: string, snippetSelector: SnippetSelector): Promise<Snippet[]> => {
    const entries = await globby([src, '!**/node_modules/**'], {
        expandDirectories: {
            extensions: ['html'],
        },
    });

    if (entries.length === 0) {
        console.log('There is no entry file.');
    }

    const result: Snippet[] = [];
    const parser = new HtmlParser(snippetSelector);

    for (let i = 0, len = entries.length; i < len; i++) {
        const entryFile = entries[i];
        const html = parser.load(entryFile);
        const DOM = parser.parse(html);
        const snippets = parser.find(DOM);

        result.push(...snippets);
    }

    return result;
};

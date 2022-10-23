import SnippetSelector = export_vscode_snippets.SnippetSelector; // eslint-disable-line
import Snippet = export_vscode_snippets.Snippet; // eslint-disable-line
import {readFileSync} from 'fs';
import {resolve} from 'path';
import {HTMLElement, parse} from 'node-html-parser';
const cwd = process.cwd();

export class HtmlParser {
    private _selector: SnippetSelector;

    constructor(selector: SnippetSelector) {
        this._selector = selector;
    }

    load(fileName: string): string {
        const filename = resolve(cwd, fileName);

        return readFileSync(filename, 'utf-8');
    }

    parse(html: string): HTMLElement {
        return parse(html);
    }

    find(dom: HTMLElement): Snippet[] {
        const result: Snippet[] = [];
        const snippets = dom.querySelectorAll(this._selector.module);

        snippets.forEach((snippet) => {
            const name = snippet.querySelector(this._selector.nameElement);
            const prefix = snippet.querySelector(this._selector.prefixElement);
            const code = snippet.querySelector(this._selector.codeElement);
            const description = snippet.querySelector(this._selector.descriptionElement);

            result.push({
                name: name?.textContent || '',
                prefix: prefix?.textContent || '',
                body: code?.innerHTML.trim() || '',
                description: description?.textContent || '',
            });
        });

        return result;
    }
}

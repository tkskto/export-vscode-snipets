import {Options} from 'globby';

export type HTMLFinderOption = {
    'html-node-parser': Options
};

export function findSnippets(
    src: string,
    snippetSelector: SnippetSelector,
    options: HTMLFinderOption
): Promise<Snippet[]>;

export const type: 'html';

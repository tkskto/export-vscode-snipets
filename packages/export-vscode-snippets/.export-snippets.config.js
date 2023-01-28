export default {
    src: 'test/fixture/**',
    output: {
        dir: '.vscode',
    },
    snippetFinderList: [{
        type: 'html',
        finderName: '@export-vscode-snippets/snippet-finder-html',
        snippetSelector: {
            module: '.module',
            nameElement: '.name',
            prefixElement: '.prefix',
            codeElement: '.code',
            descriptionElement: '.description',
        },
    }],
};

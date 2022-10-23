declare namespace export_vscode_snippets {
    type SnippetType = 'html';
    type SnippetSelector = {
        module: string
        nameElement: string
        prefixElement: string
        codeElement: string
        descriptionElement: string
    }

    export function writeSnippetsJson(snippets: Snippet[], type: SnippetType): void;
    export function exportSnippets(): void;

    interface SnippetsFile {
        [key:string]: {
            prefix: string
            body: string[]
            description: string
        }
    }

    interface Snippet {
        prefix: string
        name: string
        body: string
        description: string
    }

    interface SnippetFinder {
        type: SnippetType
        findSnippets: (src: string, snippetSelector: SnippetSelector) => Promise<Snippet[]>
    }

    interface ExportSnippetsConfig {
        src: string
        snippetFinderList: {
            type: SnippetType
            finderName: string
            snippetSelector: SnippetSelector
        }[]
    }
}

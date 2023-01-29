import {HtmlParser} from '../../src/htmlParser';

describe('html parse test', () => {
    it('one snippet', () => {
        const parser = new HtmlParser({
            module: '.module',
            nameElement: '.name',
            prefixElement: '.prefix',
            codeElement: '.code',
            descriptionElement: '.description',
        });

        const html = parser.load('test/fixture/index.html');
        const DOM = parser.parse(html, {comment: true});
        const snippets = parser.find(DOM);

        expect(snippets.length).toBe(1);
        expect(snippets).toStrictEqual([
            {
                name: '見出し1',
                prefix: 'heading1',
                body: '<h1><span>見出し1テキスト</span></h1><!-- /見出し-->',
                description: '見出しレベル1に使用します。',
            },
        ]);
    });

    it('two snippet', () => {
        const parser = new HtmlParser({
            module: '.mod',
            nameElement: '.name',
            prefixElement: '.pre',
            codeElement: 'code',
            descriptionElement: '.desc',
        });

        const html = parser.load('test/fixture/subdirectory/index.html');
        const DOM = parser.parse(html);
        const snippets = parser.find(DOM);

        expect(snippets.length).toBe(2);
        expect(snippets).toStrictEqual([
            {
                name: '見出し2',
                prefix: 'heading2',
                body: '<h2><span>見出し2テキスト</span></h2>',
                description: '見出しレベル2に使用します。',
            },
            {
                name: '見出し3',
                prefix: 'heading3',
                body: '<h3><span>見出し3テキスト</span></h3>',
                description: '見出しレベル3に使用します。',
            },
        ]);
    });
});

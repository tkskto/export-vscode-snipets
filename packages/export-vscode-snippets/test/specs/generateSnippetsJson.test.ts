import {generateSnippetsJson} from '../../src/main';

describe('generateSnippets test', () => {
    it('nothing', () => {
        const json = generateSnippetsJson([]);

        expect(json).toStrictEqual({});
    });
    it('one snippets', () => {
        const json = generateSnippetsJson([{
            prefix: 'prefix',
            name: 'name',
            body: 'body',
            descriptions: 'description',
        }]);

        expect(json).toStrictEqual({
            name: {
                prefix: 'prefix',
                body: ['body'],
                description: 'description',
            },
        });
    });
});

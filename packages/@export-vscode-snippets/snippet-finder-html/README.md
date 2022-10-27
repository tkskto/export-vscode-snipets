# @export-vscode-snippets/snippet-finder-html

[export-vscode-snippets](https://github.com/tkskto/export-vscode-snippets/)で利用するHTMLファイルからスニペットを生成するためのスニペットファインダーです。

## 使い方

次のコマンドを入力してパッケージをインストールします。

```
npm i export-vscode-snippets @export-vscode-snippets/snippet-finder-html
```

`.export-snippets.config.mjs`というファイルをルートに作成し、次の内容を記載します。

```javascript
export default {
    src: 'src/to/html/**',
    snippetFinderList: [{
        type: 'html', // 固定
        finderName: '@export-vscode-snippets/snippet-finder-html', // 固定
        snippetSelector: {
            module: '.module', // スニペットに登録したいモジュール、コンポーネントのセレクターを指定します。
            nameElement: '.name', // スニペットに登録される名前となるテキストコンテンツを持つ要素のセレクターを指定します。 
            prefixElement: '.prefix', // スニペットのプレフィックスとなるテキストコンテンツを持つ要素のセレクターを指定します。 
            codeElement: '.code', // 実際にスニペットとして登録されるコードを持つ要素のセレクターを指定します
            descriptionElement: '.description', // スニペットの説明文となるテキストコンテンツを持つ要素のセレクターを指定します
        },
    }],
};
```

準備がおわったら次のコマンドを実行します。

```
npx export-vscode-snippets -c .export-snippets.config.mjs
```

うまくいけば`html.code-snippets`というファイルが出力されるので`.vscode`フォルダにそのまま設置します。

以上です。パッケージ名前が長くてすみません。カッコいい名前が思いつきませんでした。

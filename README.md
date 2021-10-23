# Popup-Weblio
Search English words without leaving the current page for Japanese.現在のページから離れずにポップアップでWeblio(https://ejje.weblio.jp/) で英単語検索できるChrome拡張機能。

Chromeのジグゾーパズルのアイコンからこの拡張機能をクリックするか、`Alt+P`（Macの場合`Option+P`）でポップアップhtmlが呼び起こされます。
同じアプリで起動しているので速く、ポップアップされたウィンドウにフォーカスしなくてもいいので用が済めば`cmd+W`ですぐに消せる。
また、デフォルトでページの倍率を75%にしているので、大体の単語はスクロールせずとも日本語意味までは表示されるようにしています。
<img width="419" alt="スクリーンショット 2021-10-23 12 40 22" src="https://user-images.githubusercontent.com/43945931/138541139-8e7203f5-cbe1-4fa8-bd4b-61c83c78758d.png">

↓分かりにくいgifです...
![画面収録-2021-10-23-12 31 43 (1)](https://user-images.githubusercontent.com/43945931/138541853-207a06f9-c958-4042-842a-75826ed0ee4b.gif)



# Chrome拡張の導入方法
1. このリポジトリをGitHubからクローンするかzipファイルとしてダウンロード
2. Chromeを起動しの拡張機能の管理ページ(chrome://extensions)で、画面右上のトグルボタンをクリックしてChromeのデベロッパーモードをオンにします。
3. デベロッパーモードを起動すると表示されるバーの一番左の「パッケージ化されていない拡張機能を読み込む」というボタンを押し、先程このリポジトリをダウンロードしたフォルダを選択する。

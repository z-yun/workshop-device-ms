## 機能一覧

```
- ログイン / ログアウト

- Auth認証
  - ページ権限
  - 権限パーミッション
  - 権限設定
  - 外部IDでログイン

- 複数環境デプロイ
  - dev
  - sit
  - stage
  - prod

- 共通機能
  - 多言語切替
  - テーマ切替
  - サイトメニュー（ルートから生成）
  - パンくずリストナビゲーション
  - タブナビゲーション
  - Svg Sprite アイコン
  - ローカル/バックエンド モック データ
  - Screenfull

- WYSIWYG
  - TinyMCE
  - Markdown
  - JSON

- Excel
  - エクスポート
  - インポート
  - リード
  - Zip

- テーブル
  - ダイナミックテーブル
  - ドラッグアンドドロップテーブル
  - インラインエディットテーブル

- エラーページ
  - 401
  - 404

- コンポーネント
  - アバターアップロード
  - トップに戻る
  - ドラッグダイアログ
  - ドラッグ選択
  - ドラッグKanban
  - ドラッグリスト
  - ペインの分割
  - Dropzone
  - スティッキー
  - CountTo

- 高度なサンプル
- エラーログ
- ダッシュボード
- ガイドページ
- ECharts
- クリップボード
- Markdown to html
```

## Getting started

```bash
# clone the project
git clone -b i18n git@github.com:PanJiaChen/vue-element-admin.git

# enter the project directory
cd vue-element-admin

# install dependency
npm install

# develop
npm run dev
```

http://localhost:9527 が自動的に開きます。

## Build

```bash
# build for test environment
npm run build:stage

# build for production environment
npm run build:prod
```

## Advanced

```bash
# preview the release environment effect
npm run preview

# preview the release environment effect + static resource analysis
npm run preview -- --report

# code format check
npm run lint

# code format check and auto fix
npm run lint -- --fix
```
## Browsers support

Modern browsers and Internet Explorer 10+.

| [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/edge/edge_48x48.png" alt="IE / Edge" width="24px" height="24px" />](https://godban.github.io/browsers-support-badges/)</br>IE / Edge | [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/firefox/firefox_48x48.png" alt="Firefox" width="24px" height="24px" />](https://godban.github.io/browsers-support-badges/)</br>Firefox | [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/chrome/chrome_48x48.png" alt="Chrome" width="24px" height="24px" />](https://godban.github.io/browsers-support-badges/)</br>Chrome | [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/safari/safari_48x48.png" alt="Safari" width="24px" height="24px" />](https://godban.github.io/browsers-support-badges/)</br>Safari |
| --------- | --------- | --------- | --------- |
| IE10, IE11, Edge | last 2 versions | last 2 versions | last 2 versions |
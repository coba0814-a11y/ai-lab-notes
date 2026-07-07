# AI Lab Notes

大学生が実際に使ったAIツール(Gemini / Claude / Perplexity / NotebookLMなど)の
使用感を、実験ノートのように記録していく個人ブログ。広告収入(Google AdSense)を
将来的な収益源として想定した構成になっている。

- フレームワーク: [Astro](https://astro.build/)(静的サイト生成)
- 記事管理: Markdown(`src/content/posts/`)
- デザインコンセプト: 物理の実験ノート風(通し番号・グラフ用紙の背景・赤い罫線)

## セットアップ

```bash
npm install
npm run dev       # http://localhost:4321 で確認
```

## 記事の追加方法

1. `src/content/posts/` に新しい `.md` ファイルを作る(ファイル名がそのままURLになる)
2. 冒頭のフロントマターを埋める

```markdown
---
title: "記事タイトル"
description: "検索結果やSNSシェア時に表示される説明文(100字前後推奨)"
entryNumber: 4              # 通し番号。既存記事と重複しないように
pubDate: 2026-08-04
tools: ["Claude", "NotebookLM"]   # 記事で扱うツール
status: "draft"              # 体験談を書き終えたら "published" に変更
---
```

3. 本文をMarkdownで書く。既存記事(`tool-comparison.md` など)を見ると、
   「📝 ここに自分の体験を追記」という形で、実体験を書き足す場所を
   意図的に空けてある。**これは大事な部分で、AIに生成させた一般論だけの記事は
   AdSenseの審査に通りにくく、読者にも刺さらない。** 実際に使ってみた
   具体的なエピソード・数字・失敗談を必ず埋めること。
4. `status: "published"` にしてビルド・デプロイすれば公開される。

### 記事の書き方を手伝ってほしい時

見出し構成の下書きや言い回しの相談はAIに手伝ってもらってOKだが、
「実際に何をやって何を感じたか」の核の部分は自分の言葉で書くのがおすすめ。
(このやり方が結局、読まれる記事になりやすい)

## デプロイ手順(Vercel想定)

1. GitHubにこのリポジトリをpush
2. [Vercel](https://vercel.com/) でGitHub連携し、このリポジトリをインポート
   - Framework Preset: Astro が自動検出される
   - Build Command: `npm run build`
   - Output Directory: `dist`
3. デプロイ後に発行されるURLを確認

Netlifyの場合も同様の手順(Build command: `npm run build` / Publish directory: `dist`)。

### 独自ドメインを使う場合

`astro.config.mjs` の `SITE_URL` を、実際に取得したドメインに変更してから
再ビルド・再デプロイする(サイトマップやOGP画像のURLに影響するため)。

## Google Search Console / Analytics の設定

1. [Search Console](https://search.google.com/search-console) にサイトを登録し、
   発行された確認用メタタグを `src/layouts/BaseLayout.astro` 内の
   `<!-- <meta name="google-site-verification" ... -->` 部分に貼り付けてコメントアウトを外す
2. [Google Analytics](https://analytics.google.com/) でGA4プロパティを作成し、
   測定ID(`G-XXXXXXX`)を同じく `BaseLayout.astro` 内のコメントアウト部分に設定する
3. サイトマップは自動生成される(`https://<ドメイン>/sitemap-index.xml`)。
   Search Consoleに登録しておくとインデックスが早くなる。

## Google AdSense申請の注意点

- **審査には、ある程度の記事数(目安10本以上)と独自性のあるコンテンツが必要。**
  下書き記事の「📝 ここに自分の体験を追記」を埋めきってから申請するのがおすすめ。
- 自動生成だけの薄いコンテンツはポリシー違反リスクがあるため、
  必ず自分の体験・意見を加えた上で公開すること。
- 申請〜承認までに数日〜数週間かかることがある。
- 承認後、発行されたコードを `src/layouts/BaseLayout.astro` の
  AdSenseスニペット部分に設置し、`src/components/AdSlot.astro` 内の
  コメントアウトされた `<ins class="adsbygoogle">` タグに差し替える。

## ディレクトリ構成

```
src/
  components/     Header, Footer, PostCard, AdSlotなどの共通パーツ
  content/posts/  記事本体(Markdown)
  content.config.ts  記事のフロントマター定義(スキーマ)
  layouts/        BaseLayout(全体) / PostLayout(記事詳細)
  pages/          index(一覧) / about / posts/[...slug](記事詳細)
  styles/         デザイントークン(色・フォント・グリッド背景)
```

## 運用の目安

- 週1〜2本のペースで更新(無理をしないことが継続のコツ)
- Search Consoleで「どの記事が読まれているか」を定期的に確認し、
  反応の良かったテーマを深掘りしていく

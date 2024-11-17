# webpro_06
10月29日



## コイントスをするプログラム
### このプログラムの概要
このプログラムでは，コイントスをしたときの裏表を予想して選択し，選択した裏表が当たっているかを表示するプログラムである．
このプログラムの処理の流れは下記のフローチャートの通りである．
```mermaid
flowchart TD;

start["開始"];
end1["終了"]
hand["選択されたものを受け取る"]
if1{"選択された裏表が当たっているか"}
if2{"ランダムで生成された数字が1か"}
win1["当たり"]
win2["勝ちのカウントを1カウント"]
loose["ハズレ"]
count["合計回数を1カウント"]

start --> hand
hand --> if2
if2 --> |yes| 表
if2 --> |no| 裏
表 --> if1
裏 --> if1
if1 -->|yes| win1
win1 --> win2
win2 --> count
if1 -->|no| loose
loose --> count
count --> end1
```

### このプログラムの使用方法
1. ターミナルで```node app5.js ```を打ちプログラムを起動する
1. Webブラウザでlocalhost:8080/public/cointoss.htmlにアクセスする
1. 表と裏の選択肢から1つを選び送信する


##　じゃんけんをするプログラム
### このプログラムについて
```mermaid
flowchart TD;

start["開始"];
end1["終了"]
if{"条件に合うか"}
win["勝ち"]
loose["負け"]

start --> if
if -->|yes| win
win --> end1
if -->|no| loose
loose --> end1
```
### プログラムの使用方法
1. ```node app5.js ```でプログラムを起動する
1. Webブラウザでlocalhost:8080/public/janken.htmlにアクセスする
1. 自分の手を入力する

## ファイルの一覧
ファイル名 | 説明
-|-
app5.js | プログラム本体
public/janken.html | じゃんけんの開始画面
views/janken.ejs | じゃんけんのテンプレートファイル
public/cointoss.html | コイントスの開始画面
views/cointoss.ejs | コイントスのテンプレートファイル


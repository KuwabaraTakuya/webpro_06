const express = require("express");
const app = express();

app.set('view engine', 'ejs');
app.use("/public", express.static(__dirname + "/public"));

app.get("/hello1", (req, res) => {
  const message1 = "Hello world";
  const message2 = "Bon jour";
  res.render('show', { greet1:message1, greet2:message2});
});

app.get("/hello2", (req, res) => {
  res.render('show', { greet1:"Hello world", greet2:"Bon jour"});
});

app.get("/icon", (req, res) => {
  res.render('icon', { filename:"./public/Apple_logo_black.svg", alt:"Apple Logo"});
});

app.get("/luck", (req, res) => {
  const num = Math.floor( Math.random() * 6 + 1 );
  let luck = '';
  if( num==1 ) luck = '大吉';
  else if( num==2 ) luck = '中吉';
  console.log( 'あなたの運勢は' + luck + 'です' );
  res.render( 'luck', {number:num, luck:luck} );
});

app.get("/janken", (req, res) => {
  let hand = req.query.hand;
  let win = Number( req.query.win );
  let total = Number( req.query.total );
  console.log( {hand, win, total});
  const num = Math.floor( Math.random() * 3 + 1 );
  let cpu = '';
  if( num==1 ) cpu = 'グー';
  else if( num==2 ) cpu = 'チョキ';
  else cpu = 'パー';
  // ここに勝敗の判定を入れる
  // 今はダミーで人間の勝ちにしておく

  let judgement = '';
  if(hand == cpu){
    judgement = "引き分け";
  }
  else if(
    (hand == "グー" && cpu == "チョキ") ||
    (hand == "パー" && cpu == "グー") ||
    (hand == "チョキ" && cpu == "パー") 
  ){
    judgement = "勝ち";
    win += 1;
  }else{
    judgement = "負け";
  }  
  total += 1;
  const display = {
    your: hand,
    cpu: cpu,
    judgement: judgement,
    win: win,
    total: total
  }
  res.render( 'janken', display );
});

app.get("/cointoss", (req, res) => {
  const value = req.query.radio;
  let win = Number( req.query.win );
  let total = Number( req.query.total );
  let hand = '';
  console.log( {hand, win, total});
  const num = Math.floor( Math.random() * 2 + 1 );
  let cpu = '';
  if( num==1 ) cpu = '表';
  else if( num==2 ) cpu = '裏';

  if(value == 1){
    hand = '表';
  }else if(value == 2){
    hand = '裏';
  }

  let judgement = '';
  if(hand == cpu){ 
    judgement = "当たり";
    win += 1;
  }else{
    judgement = "ハズレ";
  }  
  total += 1;
  
  const display = {
    your: hand,
    cpu: cpu,
    judgement: judgement,
    win: win,
    total: total
  }
  res.render( 'cointoss', display );
});

app.get("/uranai", (req, res) => {
  let value = req.query.number;
  let result = '';
  const num1 = Math.floor( Math.random() * 100 + 1 );
  const num2 = Number( value );  

  if(num2 > 100 || num2 < 1){
    result = "1から100の数字を入れてください"
  }else if(num2 == num1){
    result = "今日の運勢は大吉です．"
  }else if(num1-10 < num2 && num2 < num1+10){
    result = "今日の運勢は吉です．"
  }else if(num1-30 < num2 && num2 < num1+30){
    result = "今日の運勢は小吉です．"
  }else if(num1-50 < num2 && num2 < num1+50){
    result = "今日の運勢は末吉です．"
  }else{
    result = "今日の運勢は凶です．"
  }

  const display = {
    cpu: num1,
    number: num2,
    result: result
  }
  res.render( 'uranai', display );
});

app.listen(8080, () => console.log("Example app listening on port 8080!"));

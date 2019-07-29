"use strict";
// 起動時に以下を実行
window.onload = firstScript;
function firstScript() {
  const lengthLs = localStorage.length;
  document.getElementById("countLs").innerHTML = lengthLs;
};
// 単語のセットを定義

function pushData(){
  //入力されたデータを取得
  var nu = document.getElementById("num").value;
  var wo = document.getElementById("word").value;
  var de = document.getElementById("description").value;

  //①データをオブジェクト保存する
  var array = [];
  var flashcards = {

      word: wo,
      desc: de
  }
  array.push(flashcards);
  //②JSONデータに変換して登録する
  var setjson = JSON.stringify(flashcards);
  localStorage.setItem(nu, setjson);
};　
//  ランダム表示は総数を取ってくる関数を使う

function deleteData(){
  document.getElementById("displayLs").textContent = "";
};
// Localstorage内のデータを全て表示
function showData() {
  document.getElementById("displayLs").textContent = "";
  Object.keys(localStorage).forEach(function(key) {
    var d = JSON.parse(window.localStorage.getItem(key));
    document.getElementById("displayLs").insertAdjacentHTML("afterbegin", `キー：${key}　 ワード：${d.word}　翻訳：${d.desc} <br>`);
  });
};
// Localstorageからランダムで1件を表示
function randomData() {
  document.getElementById("randomLs").textContent = "";
  Object.keys(localStorage).forEach(function(key) {
    var d = JSON.parse(window.localStorage.getItem(key));
    document.getElementById("displayLs").insertAdjacentHTML("afterbegin", `キー：${key}　 ワード：${d.word}　翻訳：${d.desc} <br>`);
  });
};

//dataAというキーでフォームの値を取得
let getLs = localStorage.getItem('dataA');
//ボタンを押してテキストを表示
function disMa(){
  let textForm = lookForm.value;
  let getLs = localStorage.getItem('dataA');
  document.getElementById("displayManual").innerHTML = getLs;
};
//自動でテキストを表示
function disLs(){
  let getLs = localStorage.getItem('dataA');
  document.getElementById("displayLs").innerHTML = getLs;
};
//id:wordを関数にする
let lookForm = document.getElementById("word");
// 入力フォームの値を取得する
function addData(){
  //空白の場合アラートを出して実行しない
  if (lookForm.value == "") {
      alert("フォームが空欄です");
  }
  //値があれば実行する
  else {
    let textForm = lookForm.value;
    localStorage.setItem('dataA', textForm);
    disMa();
    document.submit.reset();
  }
};
//LocalStorageのデータを全て破棄する
function dumpLsdata(){
  localStorage.clear()
};

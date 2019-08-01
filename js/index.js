"use strict";
// 起動時に以下を実行
window.onload = firstScript;
function firstScript() {
  let lengthLs = localStorage.length;
  document.getElementById("countLs").innerHTML = lengthLs;
};

// 単語のセットを定義
function pushData(){
  //入力されたデータを取得
  var nu = document.getElementById("num").value;
  var wo = document.getElementById("word").value;
  var de = document.getElementById("description").value;

  //データをオブジェクトに保存する
  var array = [];
  var flashcards = {
      word: wo,
      desc: de
  }
  array.push(flashcards);
  //JSONデータに変換して登録する
  var setjson = JSON.stringify(flashcards);
  localStorage.setItem(nu, setjson);
};　

// displayLsのテキストを削除
function deleteData(){
  document.getElementById("tableLs").textContent = "";
};

// Localstorage内のデータを全て表示
function viewData() {
//  document.getElementById("tableLs").textContent = ""; //初期化
  Object.keys(localStorage).forEach(function(key){
  var d = JSON.parse(localStorage.getItem(key));
  //document.getElementById("tableLs").insertAdjacentHTML("afterbegin", `キー：${key}　 ワード：${d.word}　翻訳：${d.desc} <br>`);
  document.getElementById("tableLs").insertAdjacentHTML("afterbegin", `<tr id="${key}"><td>${d.word}</td><td>${d.desc}</td><td><button type="button">削除</button></td></tr>`);
  });
};

function deleteRow() {
  // この行を削除する処理を追加。 removeRow(this)_?
};
// Localstorage内のデータを全て表示（旧）
function showData() {
  document.getElementById("displayLs").textContent = "";
  Object.keys(localStorage).forEach(function(key) {
    var d = JSON.parse(window.localStorage.getItem(key));
    document.getElementById("displayLs").insertAdjacentHTML("afterbegin", `キー：${key}　 ワード：${d.word}　翻訳：${d.desc} <br>`);
  });
};


// Localstorageからランダムで1件を表示
function randomData() {
  const v = localStorage.length;
  if (v == "") {
    alert("LocalStorageにデータがありません");
  } else {
      document.getElementById("randomLs").textContent = "";
      const lengthLs = localStorage.length;
      const ranNum = Math.floor(Math.random() * lengthLs); // 最大数からランダムで
      const nl = localStorage.key(ranNum);
      const lsg = JSON.parse(window.localStorage.getItem(nl));
      document.getElementById("randomLs").insertAdjacentHTML("afterbegin", `ワード：${lsg.word}　翻訳：${lsg.desc} <br>`); 
  }
};



// ランダムに数字を表示
function randomNumber() {
  let ranNum = Math.floor(Math.random() * 10);
  document.getElementById("randomDisplay").innerHTML = ranNum;
};

//LocalStorage内のデータを全て破棄する
function dumpLsdata(){
  localStorage.clear()
};

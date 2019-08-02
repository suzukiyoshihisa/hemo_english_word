"use strict";
// 起動時に以下を実行
window.onload = viewData;
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

// Localstorage内のデータを全て表示
function viewData() {
//  document.getElementById("tableLs").textContent = ""; //初期化
  Object.keys(localStorage).forEach(function(key){
  var d = JSON.parse(localStorage.getItem(key));
  //document.getElementById("tableLs").insertAdjacentHTML("afterbegin", `キー：${key}　 ワード：${d.word}　翻訳：${d.desc} <br>`);
    document.getElementById("tableLs").insertAdjacentHTML("beforeend",
      `<tr id="${key}">
        <td>${d.word}</td>
        <td>${d.desc}</td>
        <td><button type="button" onclick="deleteRow(this)">削除</button></td>
      </tr>`);
  });
};

function deleteRow(obj) {
  // 削除ボタンを押下された行を取得
  const tr = obj.parentNode.parentNode;
  // trのインデックスを取得して行を削除する
  tr.parentNode.deleteRow(tr.sectionRowIndex);
};

//LocalStorage内のデータを全て破棄する
function dumpLsdata(){
  localStorage.clear()
};

"use strict";
// 起動時に以下を実行
window.onload = firstFunction;

// Localstorage内のデータを全て表示
function firstFunction() {

  Object.keys(localStorage).forEach(function(key){
  const d = JSON.parse(localStorage.getItem(key));
    document.getElementById("tableLs").insertAdjacentHTML("beforeend",
      `<tr id="${key}">
        <td>${d.word}</td>
        <td>${d.desc}</td>
        <td><button type="button" onclick="deleteLsData(this)">削除</button></td>
      </tr>`);
  });
    //  LocalStorageが保有する件数を表示
    let lengthLs = localStorage.length;
    document.getElementById("countLs").innerHTML = lengthLs;
};

// 単語のセットを定義
function pushData(){
  //入力されたデータを取得
  let nu = document.getElementById("num").value;
  let wo = document.getElementById("word").value;
  let de = document.getElementById("description").value;

  //データをオブジェクトに保存する
  let array = [];
  let flashcards = {
      word: wo,
      desc: de
  }
  array.push(flashcards);
  //JSONデータに変換して登録する
  const setjson = JSON.stringify(flashcards);
  localStorage.setItem(nu, setjson);
};　

// 削除ボタンを押すと表示されている列とLocalstorageの両方を削除
function deleteLsData(pushedDeleteButton) {
  const rows = pushedDeleteButton.parentNode.parentNode;  // 削除ボタンを押された行のtr行を選択
  const pickTrId = rows.getAttribute("id");  // rowsで取得した行のidを取得
  localStorage.removeItem(pickTrId);  // localstorageからidと同名のキーを削除
  rows.parentNode.deleteRow(rows.sectionRowIndex);  // rowsでtbody内の行番号を指定して削除
};

//LocalStorage内のデータを全て破棄する
function dumpLsdata(){
  localStorage.clear()
};

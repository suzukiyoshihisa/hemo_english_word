"use strict";
// 起動時に以下を実行
window.onload = firstFunction;

// Localstorage内のデータを全て表示
function firstFunction() {
  document.getElementById("tableLs").innerHTML= "<tr><td>単語</td><td>訳</td><td></td></tr>";
  Object.keys(localStorage).forEach(function(key){
  var d = JSON.parse(localStorage.getItem(key));
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
function pushData() {
  if (document.getElementById('word').value == "" ||document.getElementById('description').value == "") {
    alert("入力項目が空欄です");
  } else {
  let numKey = 0;
  Object.keys(localStorage).forEach(function (key) {
    let insertKey = Number(key);
    if (numKey < insertKey) {
      numKey = insertKey;
    } 
    }
  );
  let realKey = numKey + 1;

  //入力されたデータを取得
  var wo = document.getElementById("word").value;
  var de = document.getElementById("description").value;

  //データをオブジェクトに保存する
  var flashcards = {
      word: wo,
      desc: de
  }
  //JSONデータに変換して登録する
  var setjson = JSON.stringify(flashcards);
    localStorage.setItem(realKey, setjson);
    document.submit.reset();
  }
};　

// 削除ボタンを押すと表示されている列とLocalstorageの両方を削除
function deleteLsData(AAA) {
  let askDelete = window.confirm("削除してもよろしいですか？");
  if (askDelete) {
    const rows = AAA.parentNode.parentNode;  // 削除ボタンを押された行のtr行を選択
    const pickTrId = rows.getAttribute("id");  // rowsで取得した行のidを取得
    localStorage.removeItem(pickTrId);  // localstorageからidと同名のキーを削除
    rows.parentNode.deleteRow(rows.sectionRowIndex);  // rowsでtbody内の行番号を指定して削除
  }
};

//LocalStorage内のデータを全て破棄する
function dumpLsdata() {
  let askDelete = window.confirm("【注意】全てのデータを削除しようとしています！本当によろしいですか？");
  if (askDelete) {
    localStorage.clear()
  }
};

//保存時にリロードをかける
document.getElementById("saveLs").addEventListener("click", firstFunction);
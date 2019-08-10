"use strict";
// 起動時に以下を実行
window.onload = firstFunction;

// Localstorage内のデータを全て表示
function firstFunction() {
  document.getElementById("tableLocalStorage").innerHTML =
    "<tr><td>単語</td><td>訳</td><td>お気に入り</td><td>削除</td></tr>";
  Object.keys(localStorage).forEach(function(key) {
    const d = JSON.parse(localStorage.getItem(key));
    document.getElementById("tableLocalStorage").insertAdjacentHTML(
      "beforeend",
      `<tr data-key="${key}">
        <td>${d.word}</td>
        <td>${d.description}</td>
        <td data-fav="fav_${d.favorite}"><button type="button" onclick="addFavorite(this)">★</button></td>
        <td><button type="button" onclick="deleteLocalStorageData(this)">削除</button></td>
      </tr>`
    );
  });
  showLength();
}

//  LocalStorageが保有する件数を表示
function showLength() {
  const lengthLocalStorage = localStorage.length;
  document.getElementById("countLocalStorage").innerHTML = lengthLocalStorage;
}

// 新しい単語をLocalStorageに保存
function pushData() {
  if (
    document.getElementById("word").value == "" ||
    document.getElementById("description").value == ""
  ) {
    alert("入力項目が空欄です"); //データが空欄だったら警告
  } else {
    let numKey = 0;
    Object.keys(localStorage).forEach(function(key) {
      if (numKey < Number(key)) {
        numKey = Number(key);
      }
    });
    const realKey = numKey + 1; //一番大きいKeyの数字に1を足したものを新規のKeyとする

    //入力されたデータを取得
    const data_word = document.getElementById("word").value;
    const data_description = document.getElementById("description").value;
    const data_favorite = 0;
    const data_understanding = 0;

    //データをオブジェクトに保存する
    const flashcards = {
      word: data_word,
      description: data_description,
      favorite: data_favorite,
      understanding: data_understanding
    };
    //JSONデータに変換して登録する
    const setjson = JSON.stringify(flashcards);
    localStorage.setItem(realKey, setjson);
    document.submit.reset(); // 保存後にフォームをリセット
  }
}
// 削除ボタンを押すと表示されている列とLocalstorageの両方を削除
function deleteLocalStorageData(pushedDeleteButton) {
  const askDelete = window.confirm("削除してもよろしいですか？");
  if (askDelete) {
    const rows = pushedDeleteButton.parentNode.parentNode; // 削除ボタンを押された行のtr行を選択
    const pickTrId = rows.getAttribute("data-key"); // rowsで取得した行のidを取得
    localStorage.removeItem(pickTrId); // localstorageからidと同名のキーを削除
    rows.parentNode.deleteRow(rows.sectionRowIndex); // rowsでtbody内の行番号を指定して削除
  }
  showLength();
}

// お気に入りに追加
function addFavorite(addFavorite) {
  const getTrId = addFavorite.parentNode.dataset.fav; // お気に入りが押された行のidを選択
  const getTd = addFavorite.parentNode.parentNode; // 削除ボタンを押された行のtr行を選択
  const pickTrId = getTd.getAttribute("data-key"); // rowsで取得した行のidを取得
  const pickLocalStorage = JSON.parse(localStorage.getItem(pickTrId)); // rowsで取得した行のデータを取得してparse
  if (getTrId === "fav_0") {
    pickLocalStorage["favorite"] = "1"; //　お気に入りをオン
    const setjson = JSON.stringify(pickLocalStorage); // 再度stringfy
    localStorage.setItem(pickTrId, setjson);
    firstFunction();
  } else {
    pickLocalStorage["favorite"] = "0"; //　お気に入りをオフ
    const setjson = JSON.stringify(pickLocalStorage); // 再度stringfy
    localStorage.setItem(pickTrId, setjson);
    firstFunction();
  } //
}

//LocalStorage内のデータを全て破棄する
function dumpLocalStorageData() {
  const askDelete = window.confirm(
    "【注意】全てのデータを削除しようとしています！本当によろしいですか？"
  );
  if (askDelete) {
    localStorage.clear();
  }
}

//保存時にリロードをかける
document.getElementById("saveLocalStorage").addEventListener("click", firstFunction);

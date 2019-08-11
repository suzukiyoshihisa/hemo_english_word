"use strict";
// 起動時に以下を実行
window.onload = firstFunction;

// Localstorage内のデータを全て表示
function firstFunction() {
  displayQuiz();
  showLength();
  showAllData();
}

function showAllData() {
  document.getElementById("tableLocalStorage").innerHTML =
  `<tr>
<td>単語</td>
<td>訳</td>
<td>理解度</td>
<td>わかる</td>
<td>わからん</td>
<td>お気に入り</td>
<td>削除</td>
</tr>`;
Object.keys(localStorage).forEach(function (key) {
  const d = JSON.parse(localStorage.getItem(key));
  document.getElementById("tableLocalStorage").insertAdjacentHTML(
    "beforeend",
    `<tr data-key="${key}">
      <td class="font-weight-bold font-large">${d.word}</td>
      <td>${d.definition}</td>
      <td style="text-align: center">${d.understanding}</td>
      <td><button type="button" class="btn btn-primary" onclick="understandWord(this,1)">OK</button></td>
      <td><button type="button" class="btn btn-danger" onclick="understandWord(this,-1)">NG</button></td>
      <td data-fav="fav_${d.favorite}" style="text-align: center"><button type="button" class="btn btn-light" onclick="addFavorite(this)">⭐️</button></td>
      <td><button type="button" class="btn btn-danger" onclick="deleteLocalStorageData(this)">×</button></td>
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
    document.getElementById("definition").value == ""
  ) {
    alert("入力項目が空欄です"); //データが空欄だったら警告
  } else {
    let numKey = 0;
    Object.keys(localStorage).forEach(function (key) {
      if (numKey < Number(key)) {
        numKey = Number(key);
      }
    });
    const realKey = numKey + 1; //一番大きいKeyの数字に1を足したものを新規のKeyとする

    //入力されたデータを取得
    const data_word = document.getElementById("word").value;
    const data_definition = document.getElementById("definition").value;
    const data_favorite = 0;
    const data_understanding = 0;

    //データをオブジェクトに保存する
    const flashcards = {
      word: data_word,
      definition: data_definition,
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
    showAllData();
  } else {
    pickLocalStorage["favorite"] = "0"; //　お気に入りをオフ
    const setjson = JSON.stringify(pickLocalStorage); // 再度stringfy
    localStorage.setItem(pickTrId, setjson);
    showAllData();
  }
}
// 理解度チェック
function understandWord(addFavorite, checkScore) {
  const getTrId = addFavorite.parentNode.dataset.fav; // お気に入りが押された行のidを選択
  const getTd = addFavorite.parentNode.parentNode; // 削除ボタンを押された行のtr行を選択
  const pickTrId = getTd.getAttribute("data-key"); // rowsで取得した行のidを取得
  const pickLocalStorage = JSON.parse(localStorage.getItem(pickTrId)); // rowsで取得した行のデータを取得してparse
  if(checkScore === 1){ // 理解度のスコアをあげる
    pickLocalStorage["understanding"] = pickLocalStorage["understanding"] + 1;
  }else if(checkScore === -1){ // 理解度のスコアを下げる
    pickLocalStorage["understanding"] = pickLocalStorage["understanding"] - 1;
  }
    const setjson = JSON.stringify(pickLocalStorage); // 再度stringfy
    localStorage.setItem(pickTrId, setjson);
    showAllData();
}

// クイズ表示
function displayQuiz() {
  const localStorageLength = localStorage.length;
    document.getElementById("randomLocalStorage").textContent = "";
    const randomNumber = Math.floor(Math.random() * localStorageLength); // 最大数からランダムで
    const key = localStorage.key(randomNumber);
    const d = JSON.parse(window.localStorage.getItem(key));
  document.getElementById("randomLocalStorage").insertAdjacentHTML("afterbegin",
    `<div data-key="${key}">
        <div id="quizWord" class="display-2 mb-3">${d.word}</div>
        <div id="quizDefinition" class="display-4 mb-3" style="visibility: hidden;">${d.definition}</div>
        <div id="answerButton" >
        <button type="button" class="btn-lg btn-primary" onclick="checkAnswer(this)">正解をみる</button>
        </div>
      </div>
      `
      // <button type="button" class="btn btn-primary" onclick="answerQuiz(this,1)">OK</button>
      // <button type="button" class="btn btn-danger" onclick="answerQuiz(this,-1)">NG</button>
  );
};

function checkAnswer(ans) {
  const def = document.getElementById("quizDefinition");
  console.log(def);
  def.style.visibility = "visible";
  const getTrId = ans.parentNode.id; // お気に入りが押された行のidを選択
  document.getElementById("answerButton").innerHTML = `
    <button type="button" class="btn-lg btn-primary" onclick="answerQuiz(this,1)">おぼえた</button>
      <button type="button" class="btn-lg btn-danger" onclick="answerQuiz(this,-1)">わからない</button>
      `;
}

// 理解度チェックQUIZ用
function answerQuiz(addScore, checkScore) {
  const getTrId = addScore.parentNode.parentNode.dataset.key; // お気に入りが押された行のidを選択
  console.log(getTrId);
  const pickLocalStorage = JSON.parse(localStorage.getItem(getTrId)); // rowsで取得した行のデータを取得してparse
  if(checkScore === 1){ // 理解度のスコアをあげる
    pickLocalStorage["understanding"] = pickLocalStorage["understanding"] + 1;
  }else if(checkScore === -1){ // 理解度のスコアを下げる
    pickLocalStorage["understanding"] = pickLocalStorage["understanding"] - 1;
  }
    const setjson = JSON.stringify(pickLocalStorage); // 再度stringfy
    localStorage.setItem(getTrId, setjson);
  displayQuiz();
  showAllData();
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
document.getElementById("saveLocalStorage").addEventListener("click", showAllData);



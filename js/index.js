"use strict";
// 起動時に以下を実行
window.onload = firstFunction;

// Localstorage内のデータを全て表示
function firstFunction() {
  arreyLocalStorage();
  // displayQuiz();
  showLength();
  showAllData();

}

function showAllData() {
  document.getElementById("tableLocalStorage").innerHTML =
    `<thead>
  <th scope="col">Word</th>
  <th scope="col">Definition</th>
  <th scope="col">Understanding</th>
  <th scope="col">Favorite</th>
  <th scope="col">Delete</th>
</tr>
</thead>`;
  Object.keys(localStorage).forEach(function (key) {
    const d = JSON.parse(localStorage.getItem(key));
    document.getElementById("tableLocalStorage").insertAdjacentHTML(
      "beforeend",
      `<tr data-key="${key}">
      <td class="t-txt-word">${d.word}</td>
      <td>${d.definition}</td>
      <td data-us="${d.understanding}" style="text-align: center">
      <div class="progress">
      <div class="progressBar" style="width: ${d.understanding}rem">
      </div>
      </div>
      </td>
      <td data-fav="fav_${d.favorite}" style="text-align: center"><button type="button" class="btn btn-light" onclick="addFavorite(this)"><i class="fas fa-star fa-2x"></i></button></td>
      <td style="text-align: center"><button type="button" class="" onclick="deleteLocalStorageData(this)"><i class="far fa-trash-alt fa-2x"></i></button></td>
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
  arreyLocalStorage();
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
  arreyLocalStorage();
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
// function understandWord(addFavorite, checkScore) {
//   const getTrId = addFavorite.parentNode.dataset.fav; // お気に入りが押された行のidを選択
//   const getTd = addFavorite.parentNode.parentNode; // 削除ボタンを押された行のtr行を選択
//   const pickTrId = getTd.getAttribute("data-key"); // rowsで取得した行のidを取得
//   const pickLocalStorage = JSON.parse(localStorage.getItem(pickTrId)); // rowsで取得した行のデータを取得してparse
//   if (checkScore === 1) { // 理解度のスコアをあげる
//     pickLocalStorage["understanding"] = pickLocalStorage["understanding"] + 1;
//   } else if (checkScore === -1) { // 理解度のスコアを下げる
//     pickLocalStorage["understanding"] = pickLocalStorage["understanding"] - 1;
//   }
//   const setjson = JSON.stringify(pickLocalStorage); // 再度stringfy
//   localStorage.setItem(pickTrId, setjson);
//   showAllData();
// }

/*
// クイズ１件表示
function displayQuiz() {
  const localStorageLength = localStorage.length;
  document.getElementById("randomLocalStorage").textContent = "";
  const randomNumber = Math.floor(Math.random() * localStorageLength); // 最大数からランダムで
  const key = localStorage.key(randomNumber);
  const d = JSON.parse(window.localStorage.getItem(key));
  document.getElementById("randomLocalStorage").insertAdjacentHTML("afterbegin",
    `<div data-key="${key}">
      <div class="quiz-card">
        <div class ="quiz-word">
        ${d.word}
        </div>
        <div id="quizDefinition" style="visibility: hidden;">${d.definition}</div>
        </div>

      <div id="answerButton">
        <button type="button" id="" class="quiz-button" onclick="checkAnswer()">Flip</button>
      </div>
      </div>
    </div>
      `
    // <button type="button" class="btn btn-primary" onclick="answerQuiz(this,1)">OK</button>
    // <button type="button" class="btn btn-danger" onclick="answerQuiz(this,-1)">NG</button>
  );
};
*/

// 配列生成（understandingが満点の問題以外を表示）
function arreyLocalStorage() {
  window.arrayLS = [];

  Object.keys(localStorage).forEach(function (key) {
    const d = JSON.parse(localStorage.getItem(key));
    if (d.understanding < 10) {
      arrayLS.push(key);
    }
  })
  if (arrayLS.length === 0) {
    document.getElementById("randomLocalStorage").textContent = "すべての単語を習得しました！新しい単語を登録しましょう！"; //表示項目を空欄にする
    console.log("０件です");
  }else {
  var a = arrayLS.length;
  while (a) {
    const j = Math.floor( Math.random() * a );
    const t = arrayLS[--a];
    arrayLS[a] = arrayLS[j];
    arrayLS[j] = t;
  }
  displayQuiz(); // 問題生成
  }
}

// ランダム表示テスト
function displayQuiz() {
  document.getElementById("randomLocalStorage").textContent = ""; //表示項目を空欄にする
  if (arrayLS.length === 0) {
    console.log("一巡したので再生成します");
    arreyLocalStorage();
  } else {
    let target = arrayLS.shift(); //配列から最初の数字を引用して削除する
    console.log(target);
    // let key = localStorage.key(target);
    let d = JSON.parse(window.localStorage.getItem(target));
    console.log(d);
    document.getElementById("randomLocalStorage").insertAdjacentHTML("afterbegin",
      `<div data-key="${target}">
      <div class="quiz-card">
        <div class ="quiz-word">
        ${d.word}
        </div>
        <div id="quizDefinition" style="visibility: hidden;">${d.definition}</div>
        </div>

      <div id="answerButton">
        <button type="button" id="" class="quiz-button" onclick="checkAnswer()">Flip</button>
      </div>
      </div>
    </div>
      `
    )
  }
}
  // for (let i = 0; i < localStorageLength; i++ ) {
  //   const randomNumber = Math.floor(Math.random() * localStorageLength); // 最大数からランダムで数字を取得
  //   const key = localStorage.key(randomNumber);
  //   const d = JSON.parse(window.localStorage.getItem(key));
  //   console.log(key);
  //   if (d.understanding < 10 ) {
      // document.getElementById("randomLocalStorage").insertAdjacentHTML("afterbegin",
      // `<div data-key="${key}">
      //   <div class="quiz-card">
      //     <div class ="quiz-word">
      //     ${d.word}
      //     </div>
      //     <div id="quizDefinition" style="visibility: hidden;">${d.definition}</div>
      //     </div>
  
      //   <div id="answerButton">
      //     <button type="button" id="" class="quiz-button" onclick="checkAnswer()">Flip</button>
      //   </div>
      //   </div>
      // </div>
      //   `
  //   );
  //     break;
  //   }
  // }
// };

// // ランダム表示テスト
// function displayQuiz() {
//   const localStorageLength = localStorage.length; //全体数を取得
//   document.getElementById("randomLocalStorage").textContent = ""; //表示項目を空欄にする

//   for (let i = 0; i < localStorageLength; i++ ) {
//     const randomNumber = Math.floor(Math.random() * localStorageLength); // 最大数からランダムで数字を取得
//     const key = localStorage.key(randomNumber);
//     const d = JSON.parse(window.localStorage.getItem(key));
//     console.log(key);
//     if (d.understanding < 10 ) {
//       document.getElementById("randomLocalStorage").insertAdjacentHTML("afterbegin",
//       `<div data-key="${key}">
//         <div class="quiz-card">
//           <div class ="quiz-word">
//           ${d.word}
//           </div>
//           <div id="quizDefinition" style="visibility: hidden;">${d.definition}</div>
//           </div>
  
//         <div id="answerButton">
//           <button type="button" id="" class="quiz-button" onclick="checkAnswer()">Flip</button>
//         </div>
//         </div>
//       </div>
//         `
//     );
//       break;
//     }
//   }
// };

// 正解を見るボタン
function checkAnswer(ans) {
  const def = document.getElementById("quizDefinition");
  def.style.visibility = "visible";
  document.getElementById("answerButton").innerHTML = `
    <button type="button" class="answerOK" onclick="answerQuiz(this,1)">Got it</button>
      <button type="button" class="answerNG" onclick="answerQuiz(this,-1)">I'm not sure</button>
      `;
}

// 理解度チェックQUIZ用
function answerQuiz(addScore, checkScore) {
  const getTrId = addScore.parentNode.parentNode.dataset.key;
  const pickLocalStorage = JSON.parse(localStorage.getItem(getTrId)); // rowsで取得した行のデータを取得してparse
  if (checkScore === 1) { // 理解度のスコアをあげる
    pickLocalStorage["understanding"] = pickLocalStorage["understanding"] + 1;
  } else if (checkScore === -1) {
    if ((0 < pickLocalStorage["understanding"]) && (pickLocalStorage["understanding"] < 10)) {
      pickLocalStorage["understanding"] = pickLocalStorage["understanding"] - 1;
    }
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


// jsonファイルの読み込み・LocalStorageへの一括登録
const form = document.forms.jsonForm;
form.jsonFile.addEventListener('change', function (e) {
  var result = e.target.files[0];
  //FileReaderのインスタンスを作成する
  var reader = new FileReader();
  //読み込んだファイルの中身を取得する
  reader.readAsText(result);
  //ファイルの中身を取得後に処理を行う
  reader.addEventListener('load', function () {
    const jsondata = JSON.parse(reader.result);
    Object.keys(jsondata).forEach(function (key) {
      const flashcards = {
        word: jsondata[key].word,
        definition: jsondata[key].definition,
        favorite: 0,
        understanding: 0
      };
      const setjson = JSON.stringify(flashcards);
      localStorage.setItem(jsondata[key].key, setjson);
    })
  })
})

// Enterキーが押下されたとき次のフィールドにフォーカスする
window.onkeydown = keydown; // キーの入力を監視してkeydownを発動
function keydown(e) {
  if (e.keyCode === 13) {
    var obj = document.activeElement;
    obj.nextElementSibling.focus();
  }
}



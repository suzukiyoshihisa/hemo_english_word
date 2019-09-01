"use strict";

// 起動時に以下を実行
window.onload = firstFunction;

// Localstorage内のデータを全て表示
function firstFunction() {
  arreyLocalStorage();
}

  //保存時にリロードをかける
  document.getElementById("saveLocalStorage").addEventListener("click", showAllData);
  
  
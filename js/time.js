// DOM要素をキャッシュするための変数
let textElement = null;
let barElement = null;

// 今年の経過率を計算する関数
function getYearProgress() {
  // 現在の年を取得
  let date = new Date();
  let year = date.getFullYear();

  // 今年の元日0時のunixタイムスタンプを取得
  let startOfYear = new Date(year, 0, 1, 0, 0, 0, 0).getTime();

  // 現在のunixタイムスタンプを取得
  let now = date.getTime();

  // 来年の元日0時のunixタイムスタンプを取得
  let startOfNextYear = new Date(year + 1, 0, 1, 0, 0, 0, 0).getTime();

  // 今年の総ミリ秒数を計算
  let totalMillisecondsThisYear = startOfNextYear - startOfYear;

  // 今年経過したミリ秒数を計算
  let elapsedMillisecondsThisYear = now - startOfYear;

  // 今年の経過率を計算
  let yearProgress = (elapsedMillisecondsThisYear / totalMillisecondsThisYear) * 100;
  return yearProgress;
}


function display() {
  // DOM要素がまだ取得できていなければ取得する（初回のみ実行される）
  if (!textElement) {
    textElement = document.getElementById("yearProgress");
    barElement = document.getElementById("progressBar");
  }

  const progress = getYearProgress();

  // 1. テキストの更新
  if (textElement) {
    textElement.innerText = progress.toFixed(8); // 桁数は好みで調整してください
  }

  // 2. プログレスバーの更新 (CSSのwidthを書き換える)
  if (barElement) {
    barElement.style.width = progress + "%";
  }
}

// 読み込み完了後に開始
window.onload = function() {
  display();
  setInterval(display, 50);
};
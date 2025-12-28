function getYearProgress() {
  // 現在の年を取得
  let date = new Date();
  year = date.getFullYear();

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
  let progress = getYearProgress();
  document.getElementById("yearProgress").innerText = progress.toFixed(10);
}

window.onload = display;

setInterval(display, 50);
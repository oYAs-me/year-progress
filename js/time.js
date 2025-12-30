// DOM要素をキャッシュするための変数
let textElement = null;
let barElement = null;
let dateElement = null;

// 今年の経過率を計算する関数
function getYearProgress(date) {
  // 現在の年を取得
  if (!date) {
    date = new Date();
  }
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

// Xでシェアする関数
function shareOnX() {
  const progress = getYearProgress().toFixed(8); // 現在の％を取得
  const year = new Date().getFullYear();
  
  // 投稿文を作成
  const text = `${year}年は ${progress}% 経過しました\n`;
  
  // URLやハッシュタグの設定
  const url = "https://oyas-me.github.io/year-progress/"; 
  const hashtags = "YearProgress";

  // Xの投稿画面のURLを作成 (エンコード処理)
  const twitterUrl = `https://x.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent(url)}&hashtags=${hashtags}`;

  // 新しいタブで開く
  window.open(twitterUrl, '_blank');
}

function display() {
  // DOM要素がまだ取得できていなければ取得する（初回のみ実行される）
  if (!textElement || !barElement || !dateElement) {
    textElement = document.getElementById("yearProgress");
    barElement = document.getElementById("progressBar");
    dateElement = document.getElementById("currentDate");

    // シェアボタンの設定
    shareButtonElement = document.getElementById("shareBtn");
    if (shareButtonElement) {
      shareButtonElement.onclick = shareOnX;
    }
  }

  const now = new Date();
  const progress = getYearProgress(now);

  // 1. 日付の更新
  if (dateElement) {
    const dateStr = now.toLocaleDateString("ja-JP", {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit"
    });
    dateElement.innerText = dateStr;
  }

  // 2. テキストの更新 (既存)
  if (textElement) {
    textElement.innerText = progress.toFixed(8);
  }

  // 3. プログレスバーの更新 (既存)
  if (barElement) {
    barElement.style.width = progress + "%";
  }
}

// 読み込み完了後に開始
window.onload = function() {
  display();
  setInterval(display, 50);
};

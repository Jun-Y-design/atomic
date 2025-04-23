console.log("script.js が読み込まれました。");

const elements = [
  { number: 1, symbol: "H",  name: "水素"   },
  { number: 2, symbol: "He", name: "ヘリウム" },
  { number: 3, symbol: "Li", name: "リチウム" },
  { number: 4, symbol: "Be", name: "ベリリウム" },
  { number: 5, symbol: "B",  name: "ホウ素"   },
  { number: 6, symbol: "C",  name: "炭素"     },
  { number: 7, symbol: "N",  name: "窒素"     },
  { number: 8, symbol: "O",  name: "酸素"     },
  { number: 9, symbol: "F",  name: "フッ素"   },
  { number:10, symbol: "Ne", name: "ネオン"   },
  { number:11, symbol: "Na", name: "ナトリウム" },
  { number:12, symbol: "Mg", name: "マグネシウム" },
  { number:13, symbol: "Al", name: "アルミニウム" },
  { number:14, symbol: "Si", name: "ケイ素"   },
  { number:15, symbol: "P",  name: "リン"     },
  { number:16, symbol: "S",  name: "硫黄"     },
  { number:17, symbol: "Cl", name: "塩素"     },
  { number:18, symbol: "Ar", name: "アルゴン" },
  { number:19, symbol: "K",  name: "カリウム" },
  { number:20, symbol: "Ca", name: "カルシウム" }
];

let current;
let score = 0;
let quizMode = "mode1";
let activeMode;  // 実際に出題しているサブモード ("mode1" or "mode2" or "mode4")

// モード切替
function changeMode() {
  quizMode = document.querySelector('input[name="quizMode"]:checked').value;
  nextQuestion();
}

// ランダムに要素を選ぶ
function getRandomElement() {
  return elements[Math.floor(Math.random() * elements.length)];
}

// 問題表示
function displayQuestion() {
  current = getRandomElement();
  document.getElementById("result").textContent = "";

  // ランダムモード時はサブモードを決定
  if (quizMode === "mode3") {
    activeMode = Math.random() < 0.5 ? "mode1" : "mode2";
  } else {
    activeMode = quizMode;
  }

  const q = document.getElementById("questionArea");
  const a = document.getElementById("answers");

  if (activeMode === "mode1") {
    q.innerHTML = `<p><strong>元素記号:</strong> ${current.symbol} → 元素名は？</p>`;
    a.innerHTML = `<input type="text" id="answer" placeholder="例：水素" autocomplete="off">`;
  }
  else if (activeMode === "mode2") {
    q.innerHTML = `<p><strong>元素名:</strong> ${current.name} → 元素記号は？</p>`;
    a.innerHTML = `<input type="text" id="answer" placeholder="例：H" autocomplete="off">`;
  }
  else { // mode4
    q.innerHTML = `<p><strong>原子番号:</strong> ${current.number} → 元素記号と元素名は？</p>`;
    a.innerHTML = `
      <input type="text" id="symbolAnswer" placeholder="元素記号" autocomplete="off">
      <input type="text" id="nameAnswer"   placeholder="元素名" autocomplete="off">
    `;
  }
}

// 回答チェック
function checkAnswer() {
  let correct = false;
  let msg = "";

  if (activeMode === "mode1") {
    const user = document.getElementById("answer").value.trim();
    correct = (user === current.name);
    msg = correct
      ? "正解です！"
      : `不正解です。正解は「${current.name}」です。`;
  }
  else if (activeMode === "mode2") {
    const user = document.getElementById("answer").value.trim();
    correct = (user === current.symbol);
    msg = correct
      ? "正解です！"
      : `不正解です。正解は「${current.symbol}」です。`;
  }
  else { // mode4
    const us = document.getElementById("symbolAnswer").value.trim();
    const un = document.getElementById("nameAnswer").value.trim();
    correct = (us === current.symbol && un === current.name);
    msg = correct
      ? "正解です！"
      : `不正解です。正解は「${current.symbol}（${current.name}）」です。`;
  }

  document.getElementById("result").textContent = msg;
  score = correct ? score + 1 : 0;
  document.getElementById("score").textContent = `連続正解スコア: ${score}`;
}

// 次の問題
function nextQuestion() {
  displayQuestion();
}

// 初期表示
window.addEventListener("DOMContentLoaded", () => {
  nextQuestion();
});

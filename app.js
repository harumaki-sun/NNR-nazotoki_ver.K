let missions = [];
let currentIndex = 0;
let state = "code";
showScreen("codeScreen");

// JSON読み込み
fetch("missions.json")
  .then(res => res.json())
  .then(data => {
    missions = data;
    showMission();
  });

// 時刻
function updateTime() {
  const now = new Date();
  document.getElementById("time").textContent =
    now.toLocaleTimeString();
}
setInterval(updateTime, 1000);

// 問題表示
function showMission() {
  // ここでは何もしない or 初期化だけ
}

function showScreen(screen) {
  document.getElementById("codeScreen").style.display = "none";
  document.getElementById("questionScreen").style.display = "none";
  document.getElementById("resultScreen").style.display = "none";
  document.getElementById("explanationScreen").style.display = "none";

  document.getElementById(screen).style.display = "block";
}

function checkCode() {
  const code = document.getElementById("codeInput").value;
  const mission = missions[currentIndex];

  // 👇 分岐問題の場合
  if (mission.branch) {
    const pattern = mission.patterns[code];

    if (pattern) {
      currentMission = pattern; // ← 今回用の問題を保存
      document.getElementById("question").textContent = pattern.question;
      showScreen("questionScreen");
    } else {
      alert("コードが違います");
    }
    return;
  }

  // 👇 通常問題
  if (code === mission.code) {
    currentMission = mission;
    document.getElementById("question").textContent = mission.question;
    showScreen("questionScreen");
  } else {
    alert("コードが違います");
  }
}
// 判定
function checkAnswer() {
  const input = document.getElementById("answerInput").value;

  if (input === currentMission.answer) {
    const result = document.getElementById("result");
    result.textContent = "⭕ 正解！";
    result.classList.add("pop");

    showScreen("resultScreen");

    // 👇 2秒後にフェードして解説へ
    setTimeout(() => {
      const screen = document.getElementById("resultScreen");

      // フェードアウト
      screen.classList.add("fade-out");

      setTimeout(() => {
        screen.classList.remove("fade-out");

        goExplanation();

        // フェードイン（お好み）
        const next = document.getElementById("explanationScreen");
        next.classList.add("fade-in");

        setTimeout(() => {
          next.classList.remove("fade-in");
        }, 500);

      }, 500); // フェード時間
    }, 2000);

  } else {
    document.getElementById("errorMessage").textContent = "❌ 不正解！";
    document.getElementById("answerInput").value = "";
    document.getElementById("answerInput").focus();
  }
}

function goExplanation() {
  document.getElementById("explanation").textContent =
    currentMission.explanation;

  showScreen("explanationScreen");
}

// 次へ
function nextMission() {
  currentIndex++;

  if (currentIndex >= missions.length) {
    showClearScreen();
    return;
  }

  document.getElementById("codeInput").value = "";
  document.getElementById("answerInput").value = "";
  document.getElementById("question").textContent = "";
  document.getElementById("result").textContent = "";
  document.getElementById("errorMessage").textContent = "";
  document.getElementById("clearScreen").style.display = "none";

  // 👇 問題はここで出さない
  showScreen("codeScreen");
}

function showClearScreen() {
  showScreen("clearScreen");
}
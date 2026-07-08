/* ==========================================================================
   PROJECT SHOWCASE: LIVE INTERACTIVE PREVIEW WIDGETS
   ========================================================================== */

export function initInteractivePreviews() {
  initMathPotWidget();
  initFocusAppWidget();
  initGeopoliticsWidget();
  initMakeMyListWidget();
  initYuvaDrishtiWidget();
}

/* --- 1. MathPot Interactive Widget --- */
function initMathPotWidget() {
  const startBtns = document.querySelectorAll("#btn-math-start, .btn-trigger-math");
  const questionEl = document.getElementById("math-question");
  const optionsContainer = document.getElementById("math-options");
  const scoreYouEl = document.getElementById("math-score-you");
  const scoreOppEl = document.getElementById("math-score-opp");
  const timerEl = document.getElementById("math-timer");

  if (!questionEl || !optionsContainer) return;

  let timerId = null;
  let timeLeft = 15;
  let scoreYou = 0;
  let scoreOpp = 0;
  let isPlaying = false;

  const startMatch = () => {
    if (isPlaying) {
      clearInterval(timerId);
    }
    isPlaying = true;
    timeLeft = 15;
    scoreYou = 0;
    scoreOpp = 0;
    if (scoreYouEl) scoreYouEl.textContent = scoreYou;
    if (scoreOppEl) scoreOppEl.textContent = scoreOpp;
    if (timerEl) timerEl.textContent = timeLeft;

    nextQuestion();

    // Start timer
    timerId = setInterval(() => {
      timeLeft--;
      if (timerEl) timerEl.textContent = timeLeft;

      // Random opponent scoring
      if (Math.random() > 0.6) {
        scoreOpp += 10;
        if (scoreOppEl) scoreOppEl.textContent = scoreOpp;
      }

      if (timeLeft <= 0) {
        clearInterval(timerId);
        isPlaying = false;
        endMatch();
      }
    }, 1000);
  };

  const nextQuestion = () => {
    if (!isPlaying) return;
    const a = Math.floor(Math.random() * 40) + 10;
    const b = Math.floor(Math.random() * 40) + 10;
    const isAdd = Math.random() > 0.5;
    const ans = isAdd ? a + b : a - b;
    const op = isAdd ? "+" : "-";

    questionEl.textContent = `${a} ${op} ${b} = ?`;
    optionsContainer.innerHTML = "";

    // Generate 3 choices including the correct answer
    const choices = [ans, ans + Math.floor(Math.random() * 6) - 3, ans + Math.floor(Math.random() * 10) - 5];
    // Ensure uniqueness and shuffle
    const uniqueChoices = Array.from(new Set(choices));
    while (uniqueChoices.length < 3) {
      uniqueChoices.push(ans + Math.floor(Math.random() * 14) - 7);
    }
    uniqueChoices.sort(() => Math.random() - 0.5);

    uniqueChoices.forEach((val) => {
      const btn = document.createElement("button");
      btn.className = "btn-math-start";
      btn.textContent = val;
      btn.style.background = "rgba(255, 255, 255, 0.1)";
      btn.onclick = () => {
        if (val === ans) {
          scoreYou += 15;
          if (scoreYouEl) scoreYouEl.textContent = scoreYou;
          btn.style.background = "#10b981";
        } else {
          scoreOpp += 5;
          if (scoreOppEl) scoreOppEl.textContent = scoreOpp;
          btn.style.background = "#ef4444";
        }
        setTimeout(nextQuestion, 250);
      };
      optionsContainer.appendChild(btn);
    });
  };

  const endMatch = () => {
    optionsContainer.innerHTML = `<button class="btn-math-start" id="btn-math-restart">Play Again (${scoreYou > scoreOpp ? "You Won! 🎉" : "Good Try!"})</button>`;
    const restartBtn = document.getElementById("btn-math-restart");
    if (restartBtn) restartBtn.onclick = startMatch;
    questionEl.textContent = `Match Finished! Final Score: ${scoreYou} - ${scoreOpp}`;
  };

  startBtns.forEach((btn) => btn.addEventListener("click", startMatch));
}

/* --- 2. Focus App Interactive Widget --- */
function initFocusAppWidget() {
  const toggleBtn = document.getElementById("btn-focus-toggle");
  const cardTriggerBtn = document.getElementById("btn-focus-card-trigger");
  const circle = document.getElementById("breathing-circle");
  const textEl = document.getElementById("breathing-text");

  if (!circle || !textEl) return;

  let isBreathing = false;
  let cycleId = null;

  const startBreathing = () => {
    if (isBreathing) {
      clearInterval(cycleId);
      circle.classList.remove("inhale", "exhale");
      textEl.textContent = "Tap to Breathe";
      if (toggleBtn) toggleBtn.textContent = "Start 4-7-8 Breathing Cycle";
      if (cardTriggerBtn) cardTriggerBtn.innerHTML = '<i data-lucide="wind"></i><span>Try Exercise</span>';
      isBreathing = false;
      return;
    }

    isBreathing = true;
    if (toggleBtn) toggleBtn.textContent = "Stop Breathing Session";
    if (cardTriggerBtn) cardTriggerBtn.innerHTML = '<i data-lucide="square"></i><span>Stop Session</span>';

    const runCycle = () => {
      // Inhale (4s)
      circle.classList.remove("exhale");
      circle.classList.add("inhale");
      textEl.textContent = "Breathe In (4s)...";

      setTimeout(() => {
        if (!isBreathing) return;
        textEl.textContent = "Hold (7s)...";
      }, 4000);

      setTimeout(() => {
        if (!isBreathing) return;
        circle.classList.remove("inhale");
        circle.classList.add("exhale");
        textEl.textContent = "Breathe Out (8s)...";
      }, 7000);
    };

    runCycle();
    cycleId = setInterval(runCycle, 15000); // Total 15s cycle
  };

  if (toggleBtn) toggleBtn.addEventListener("click", startBreathing);
  if (cardTriggerBtn) cardTriggerBtn.addEventListener("click", startBreathing);
  circle.addEventListener("click", startBreathing);
}

/* --- 3. Geopolitics Simulator Interactive Widget --- */
function initGeopoliticsWidget() {
  const choices = document.querySelectorAll(".btn-geo-choice");
  const resetBtn = document.getElementById("btn-geo-reset");
  const questionEl = document.getElementById("geo-question");
  const econEl = document.getElementById("stat-econ");
  const dipEl = document.getElementById("stat-dip");
  const secEl = document.getElementById("stat-sec");

  if (!questionEl) return;

  let econ = 78;
  let dip = 65;
  let sec = 80;

  const dilemmas = [
    {
      q: "Global AI Chip Shortage Detected. How will you respond?",
      c1: "Subsidize Domestic Fabs (+Econ, -Dip)",
      c2: "Sign International Treaty (+Dip, -Sec)",
      eff1: { e: +8, d: -10, s: +5 },
      eff2: { e: -5, d: +12, s: -8 }
    },
    {
      q: "Automated Drone Swarms Deployed by Neighboring State. Action?",
      c1: "Implement Cyber Defense Shield (-Econ, +Sec)",
      c2: "Initiate Emergency Bilateral Summit (+Dip, -Sec)",
      eff1: { e: -12, d: -4, s: +15 },
      eff2: { e: +3, d: +14, s: -10 }
    },
    {
      q: "Quantum Decryption Breakthrough Announced by Rival Alliance.",
      c1: "Mandate Post-Quantum Encryption Mandate (-Econ, +Sec)",
      c2: "Share Intelligence with Neutral States (+Dip, +Sec)",
      eff1: { e: -9, d: 0, s: +14 },
      eff2: { e: -4, d: +11, s: +7 }
    }
  ];

  let currentIdx = 0;

  const updateDisplay = () => {
    if (econEl) econEl.textContent = `${Math.min(100, Math.max(0, econ))}%`;
    if (dipEl) dipEl.textContent = `${Math.min(100, Math.max(0, dip))}%`;
    if (secEl) secEl.textContent = `${Math.min(100, Math.max(0, sec))}%`;

    const current = dilemmas[currentIdx];
    questionEl.textContent = current.q;
    const btns = document.querySelectorAll(".btn-geo-choice");
    if (btns[0]) btns[0].textContent = current.c1;
    if (btns[1]) btns[1].textContent = current.c2;
  };

  choices.forEach((btn) => {
    btn.addEventListener("click", () => {
      const choiceNum = btn.getAttribute("data-choice");
      const current = dilemmas[currentIdx];
      const eff = choiceNum === "1" ? current.eff1 : current.eff2;

      econ += eff.e;
      dip += eff.d;
      sec += eff.s;

      currentIdx = (currentIdx + 1) % dilemmas.length;
      updateDisplay();

      // Button click feedback
      btn.style.transform = "scale(0.95)";
      setTimeout(() => { btn.style.transform = ""; }, 150);
    });
  });

  if (resetBtn) {
    resetBtn.addEventListener("click", () => {
      currentIdx = (currentIdx + 1) % dilemmas.length;
      updateDisplay();
    });
  }
}

/* --- 4. MakeMyList Interactive Widget --- */
function initMakeMyListWidget() {
  const inputEl = document.getElementById("list-input");
  const generateBtn = document.getElementById("btn-generate-list");
  const sampleBtn = document.getElementById("btn-random-prompt");
  const outputEl = document.getElementById("list-output");

  if (!inputEl || !generateBtn || !outputEl) return;

  const samplePrompts = [
    "Prep keynote, research AI policy, fix Docker bug",
    "Read 50 pages of geopolitics book, write newsletter, gym workout",
    "Build Framer motion prototype, audit Smart City chatbot logs, review PRs",
    "Prepare campus debate speech, organize NSS volunteer roster, call mentor"
  ];

  const parseAndRender = (text) => {
    const items = text.split(/,|;|\band\b/i).map((s) => s.trim()).filter(Boolean);
    outputEl.innerHTML = "";

    if (items.length === 0) {
      outputEl.innerHTML = '<div class="list-item"><span class="tag-priority low">Info</span> Please enter tasks above!</div>';
      return;
    }

    items.forEach((item, idx) => {
      const priorities = ["high", "med", "low", "high"];
      const labels = ["High", "Med", "Dev", "Civic"];
      const icons = ["🎯", "📚", "🐳", "🚀", "⚡"];
      const pIdx = idx % priorities.length;

      const div = document.createElement("div");
      div.className = "list-item";
      div.style.opacity = "0";
      div.style.transform = "translateY(10px)";
      div.style.transition = "all 0.3s ease";
      div.innerHTML = `<span class="tag-priority ${priorities[pIdx]}">${labels[pIdx]}</span> ${icons[idx % icons.length]} ${item}`;
      outputEl.appendChild(div);

      setTimeout(() => {
        div.style.opacity = "1";
        div.style.transform = "translateY(0)";
      }, idx * 100);
    });
  };

  generateBtn.addEventListener("click", () => {
    parseAndRender(inputEl.value);
  });

  inputEl.addEventListener("keydown", (e) => {
    if (e.key === "Enter") parseAndRender(inputEl.value);
  });

  if (sampleBtn) {
    sampleBtn.addEventListener("click", () => {
      const randomPrompt = samplePrompts[Math.floor(Math.random() * samplePrompts.length)];
      inputEl.value = randomPrompt;
      parseAndRender(randomPrompt);
    });
  }
}

/* --- 5. Yuva Drishti Interactive Widget --- */
function initYuvaDrishtiWidget() {
  const tabs = document.querySelectorAll(".yuva-tab");
  const contentEl = document.getElementById("yuva-article-content");

  if (!contentEl) return;

  const articles = {
    ai: {
      date: "FEATURED ESSAY • JULY 2026",
      title: "The Algorithmic Public Square: How AI Models Shape Civic Discourse",
      snippet: "An empirical examination of how recommendation algorithms and generative models influence youth perspectives on governance and democratic participation..."
    },
    youth: {
      date: "SPECIAL REPORT • JUNE 2026",
      title: "From Campus Debates to Policy Tables: The New Wave of Youth Civic Leadership",
      snippet: "Analyzing the structural shift in how Gen-Z leadership communities like Sanchar Sangram and NSS drive localized smart-city policy reforms..."
    },
    policy: {
      date: "DISCOURSE ARCHIVE • MAY 2026",
      title: "Geopolitics of the Semiconductor Supply Chain: Why India's Fabs Matter",
      snippet: "Exploring the strategic intersection of economic sovereignty, global technology alliances, and the future of hardware independence..."
    }
  };

  tabs.forEach((tab) => {
    tab.addEventListener("click", () => {
      tabs.forEach((t) => t.classList.remove("active"));
      tab.classList.add("active");

      const key = tab.getAttribute("data-tab");
      const data = articles[key];

      if (data) {
        contentEl.style.opacity = "0";
        setTimeout(() => {
          contentEl.innerHTML = `
            <span class="article-date">${data.date}</span>
            <h4>${data.title}</h4>
            <p>${data.snippet}</p>
            <span class="read-more-link">Read full investigation →</span>
          `;
          contentEl.style.opacity = "1";
        }, 150);
      }
    });
  });
}

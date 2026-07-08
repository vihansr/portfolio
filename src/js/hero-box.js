/* ==========================================================================
   HERO SECTION: INTERACTIVE PROJECTS BOX & ESCAPING PILLS
   ========================================================================== */

const projectData = {
  mathpot: {
    title: "MathPot",
    badge: "Multiplayer & Real-Time",
    desc: "Real-time multiplayer mathematics game built to understand low-latency state synchronization, WebSocket concurrency, and interactive competitive gaming mechanics.",
    targetCard: "#card-mathpot"
  },
  "focus-app": {
    title: "Focus App (Cognitive Flow)",
    badge: "Cognitive Training",
    desc: "Attention and concentration training platform designed to improve cognitive focus through interactive breathing exercises, audio feedback, and structured neuroscience timers.",
    targetCard: "#card-focus"
  },
  geopolitics: {
    title: "Geopolitics Simulator (Make My Country)",
    badge: "Simulation & AI LLM",
    desc: "An immersive simulation where users become leaders of major nations and experience the consequences of diplomatic, economic, and military decisions in real-time.",
    targetCard: "#card-geopolitics"
  },
  makemylist: {
    title: "MakeMyList",
    badge: "AI Workflow",
    desc: "AI powered productivity tool that transforms chaotic ideas and prompt dumps into structured, priority-tagged, and organized actionable checklists.",
    targetCard: "#card-makemylist"
  },
  "yuva-drishti": {
    title: "Yuva Drishti",
    badge: "Journalism & Discourse",
    desc: "Research and journalism initiative focused on youth perspectives, public affairs, ethical AI governance, and meaningful socio-political discussions.",
    targetCard: "#card-yuva"
  }
};

export function initHeroBox() {
  const box = document.getElementById("interactive-projects-box");
  const modal = document.getElementById("pill-modal");
  const modalClose = document.getElementById("close-pill-modal");
  const modalTitle = document.getElementById("pill-modal-title");
  const modalBadge = document.getElementById("pill-modal-badge");
  const modalDesc = document.getElementById("pill-modal-desc");
  const modalJump = document.getElementById("pill-modal-jump");
  const pills = document.querySelectorAll(".project-pill");
  const particleContainer = document.getElementById("box-particles");

  if (!box) return;

  // Generate background particles inside box
  createBoxParticles(particleContainer, 15);

  // Toggle box expansion on click or hover
  box.addEventListener("mouseenter", () => {
    box.classList.add("expanded");
  });

  box.addEventListener("mouseleave", () => {
    box.classList.remove("expanded");
  });

  box.addEventListener("click", (e) => {
    // If clicked directly on the box (not a pill), toggle expanded
    if (!e.target.closest(".project-pill")) {
      box.classList.toggle("expanded");
    }
  });

  // Handle pill clicks
  pills.forEach((pill) => {
    pill.addEventListener("click", (e) => {
      e.stopPropagation(); // Don't collapse box
      const projectKey = pill.getAttribute("data-project");
      const data = projectData[projectKey];

      if (data && modal) {
        modalTitle.textContent = data.title;
        modalBadge.textContent = data.badge;
        modalDesc.textContent = data.desc;
        modalJump.setAttribute("href", data.targetCard);

        modal.classList.remove("hidden");
        document.body.style.overflow = "hidden"; // prevent background scroll while modal open
      }
    });
  });

  // Close Modal Handler
  const closeModal = () => {
    if (modal) {
      modal.classList.add("hidden");
      document.body.style.overflow = "";
    }
  };

  if (modalClose) {
    modalClose.addEventListener("click", closeModal);
  }

  if (modal) {
    modal.addEventListener("click", (e) => {
      if (e.target === modal) closeModal();
    });
  }

  if (modalJump) {
    modalJump.addEventListener("click", () => {
      closeModal();
      // Smooth scroll will be handled by native scroll-behavior: smooth
    });
  }

  // Handle Escape key
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && !modal?.classList.contains("hidden")) {
      closeModal();
    }
  });
}

function createBoxParticles(container, count) {
  if (!container) return;
  for (let i = 0; i < count; i++) {
    const dot = document.createElement("div");
    dot.className = "box-particle-dot";
    const size = Math.random() * 4 + 2;
    const x = Math.random() * 90;
    const y = Math.random() * 80 + 10;
    const duration = Math.random() * 6 + 4;
    const delay = Math.random() * 2;

    dot.style.cssText = `
      position: absolute;
      width: ${size}px;
      height: ${size}px;
      left: ${x}%;
      top: ${y}%;
      background: rgba(6, 182, 212, ${Math.random() * 0.6 + 0.2});
      border-radius: 50%;
      pointer-events: none;
      box-shadow: 0 0 8px rgba(6, 182, 212, 0.8);
      animation: floatDot ${duration}s ease-in-out infinite alternate;
      animation-delay: -${delay}s;
    `;
    container.appendChild(dot);
  }

  // Inject animation keyframes dynamically if not present
  if (!document.getElementById("box-particle-keyframes")) {
    const style = document.createElement("style");
    style.id = "box-particle-keyframes";
    style.textContent = `
      @keyframes floatDot {
        0% { transform: translateY(0) translateX(0) scale(1); opacity: 0.3; }
        100% { transform: translateY(-25px) translateX(15px) scale(1.4); opacity: 0.9; }
      }
    `;
    document.head.appendChild(style);
  }
}

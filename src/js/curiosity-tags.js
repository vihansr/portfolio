/* ==========================================================================
   INTERESTS SECTION: CURIOSITY TAGS & INSIGHT DRAWER
   ========================================================================== */

const topicInsights = {
  technology: {
    name: "Technology",
    headline: "The Universal Lever for Human Capability",
    body: "Technology is not just syntax and servers—it is the architecture of modern society. I am fascinated by how low-level systems and high-level abstractions empower individuals to solve systemic problems at scale."
  },
  ai: {
    name: "Artificial Intelligence",
    headline: "Augmenting Cognition & Creative Synthesis",
    body: "Beyond the hype, AI represents a fundamental transformation in human-computer interaction. From language models to cognitive training tools, I explore how AI can act as an amplifier for curiosity and productivity."
  },
  geopolitics: {
    name: "Geopolitics",
    headline: "The Invisible Currents Shaping Our World",
    body: "Understanding power dynamics, trade corridors, and diplomatic alliances is essential for any builder. Technology does not exist in a vacuum; policy and geopolitics dictate the supply chains, hardware, and regulations of tomorrow."
  },
  policy: {
    name: "Public Policy",
    headline: "Engineering Societal Systems & Civic Tech",
    body: "Working with the Indore Municipal Corporation on Smart City initiatives taught me that good policy is like clean code: it creates robust frameworks that allow communities and public services to thrive without friction."
  },
  journalism: {
    name: "Journalism",
    headline: "The Discipline of Truth & Clear Discourse",
    body: "Through Yuva Drishti, I explored how investigative rigor and clear storytelling elevate public discourse. In an era of algorithmic echo chambers, objective analysis and well-researched journalism are vital."
  },
  speaking: {
    name: "Public Speaking",
    headline: "Oratory as a Tool for Community Alignment",
    body: "Leading debate and rhetoric at Sanchar Sangram reinforced that ideas only matter if you can communicate them persuasively. Public speaking is the bridge between technical invention and human empathy."
  },
  startups: {
    name: "Startups",
    headline: "Rapid Experimentation & Value Creation",
    body: "Startups are the ultimate scientific method for business: hypothesize a solution, build an MVP, test against reality, and iterate. I am drawn to the speed and accountability of zero-to-one product building."
  },
  automation: {
    name: "Automation",
    headline: "Eliminating the Tedious to Focus on the Meaningful",
    body: "If a task feels repetitive, I automate it. Whether it is parsing data with MakeMyList or scripting workflow pipelines, automation liberates time and mental energy for creative, high-impact problem solving."
  },
  economics: {
    name: "Economics",
    headline: "Incentive Structures & Resource Allocation",
    body: "Economics explains why products succeed, how nations compete, and how incentives shape human behavior. I study micro and macroeconomics to build sustainable business models and realistic simulations."
  },
  community: {
    name: "Community Building",
    headline: "Fostering Environments of Collective Curiosity",
    body: "From IEEE to NSS and Sanchar Sangram, my greatest joy has been bringing passionate people together. When you build a culture of intellectual generosity, everyone learns and ships faster."
  }
};

export function initCuriosityTags() {
  const tags = document.querySelectorAll(".curiosity-tag");
  const drawer = document.getElementById("topic-drawer");
  const closeBtn = document.getElementById("close-drawer");
  const nameEl = document.getElementById("drawer-topic-name");
  const headlineEl = document.getElementById("drawer-headline");
  const bodyEl = document.getElementById("drawer-body");

  if (!drawer || !tags.length) return;

  const openDrawer = (topicKey) => {
    const data = topicInsights[topicKey];
    if (data && nameEl && headlineEl && bodyEl) {
      nameEl.textContent = data.name;
      headlineEl.textContent = data.headline;
      bodyEl.textContent = data.body;
      
      drawer.classList.remove("hidden");
      document.body.style.overflow = "hidden";
    }
  };

  const closeDrawer = () => {
    drawer.classList.add("hidden");
    document.body.style.overflow = "";
  };

  tags.forEach((tag) => {
    tag.addEventListener("click", () => {
      const topicKey = tag.getAttribute("data-topic");
      openDrawer(topicKey);
    });
  });

  if (closeBtn) {
    closeBtn.addEventListener("click", closeDrawer);
  }

  drawer.addEventListener("click", (e) => {
    if (e.target === drawer) closeDrawer();
  });

  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && !drawer.classList.contains("hidden")) {
      closeDrawer();
    }
  });
}

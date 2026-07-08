/* ==========================================================================
   STORYTELLING & SCROLL REVEAL ANIMATIONS
   ========================================================================== */

export function initScrollStorytelling() {
  const revealElements = document.querySelectorAll("[data-reveal]");
  
  // Create Intersection Observer for general scroll reveal
  const observerOptions = {
    root: null,
    rootMargin: "0px 0px -80px 0px",
    threshold: 0.15
  };

  const revealObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const el = entry.target;
        const delay = el.getAttribute("data-delay") || 0;
        
        setTimeout(() => {
          el.classList.add("revealed");
        }, parseInt(delay, 10));
        
        // Unobserve once revealed for clean performance
        observer.unobserve(el);
      }
    });
  }, observerOptions);

  revealElements.forEach((el) => {
    revealObserver.observe(el);
  });

  // Storytelling specific step highlights
  const storySteps = document.querySelectorAll(".story-step, .story-card, .story-bio");
  const storyObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("story-active");
        
        // Add subtle floating pulse animation
        if (entry.target.classList.contains("story-card")) {
          entry.target.style.boxShadow = "0 15px 35px -5px rgba(99, 102, 241, 0.25)";
        }
      }
    });
  }, { threshold: 0.3 });

  storySteps.forEach((step) => storyObserver.observe(step));

  // Timeline nodes interactive illumination
  const timelineItems = document.querySelectorAll(".timeline-item");
  const timelineObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const node = entry.target.querySelector(".timeline-node");
        if (node) {
          node.style.transform = "scale(1.2)";
          node.style.borderColor = "var(--accent-cyan)";
          node.style.boxShadow = "0 0 25px var(--accent-cyan)";
          setTimeout(() => {
            node.style.transform = "scale(1)";
          }, 600);
        }
      }
    });
  }, { threshold: 0.4 });

  timelineItems.forEach((item) => timelineObserver.observe(item));
}

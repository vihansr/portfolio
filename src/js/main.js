/* ==========================================================================
   VIHAN SINGH RATHORE PORTFOLIO - MAIN ORCHESTRATION SCRIPT
   ========================================================================== */

import { initHeroBox } from "./hero-box.js";
import { initScrollStorytelling } from "./story-scroll.js";
import { initInteractivePreviews } from "./interactive-previews.js";
import { initCuriosityTags } from "./curiosity-tags.js";

document.addEventListener("DOMContentLoaded", () => {
  // 1. Initialize Lucide Icons
  if (window.lucide) {
    window.lucide.createIcons();
  }

  // 2. Initialize Core Interactive Modules
  initHeroBox();
  initScrollStorytelling();
  initInteractivePreviews();
  initCuriosityTags();

  // 3. Initialize Mobile Navigation Toggle
  initMobileNav();

  // 4. Initialize Copy-to-Clipboard for Email
  initCopyEmail();

  // 5. Initialize Custom Cursor Glow Tracking
  initCursorGlow();

  // 6. Initialize Navbar Scroll Behavior & Active Links
  initNavbarScroll();
});

/* --- Mobile Navigation Menu --- */
function initMobileNav() {
  const btn = document.getElementById("mobile-menu-btn");
  const menu = document.getElementById("mobile-menu");
  const links = document.querySelectorAll(".mobile-link");

  if (!btn || !menu) return;

  btn.addEventListener("click", () => {
    menu.classList.toggle("hidden");
  });

  links.forEach((link) => {
    link.addEventListener("click", () => {
      menu.classList.add("hidden");
    });
  });
}

/* --- Copy Email to Clipboard --- */
function initCopyEmail() {
  const copyBtns = document.querySelectorAll(".btn-copy-email");
  copyBtns.forEach((btn) => {
    btn.addEventListener("click", () => {
      const email = btn.getAttribute("data-email") || "vihansrathore2006@gmail.com";
      navigator.clipboard.writeText(email).then(() => {
        const feedback = btn.querySelector("#copy-feedback");
        if (feedback) {
          const originalHTML = feedback.innerHTML;
          feedback.innerHTML = '<i data-lucide="check"></i> Copied!';
          if (window.lucide) window.lucide.createIcons();
          
          setTimeout(() => {
            feedback.innerHTML = originalHTML;
            if (window.lucide) window.lucide.createIcons();
          }, 2000);
        }
      });
    });
  });
}

/* --- Custom Cursor Glow Tracking --- */
function initCursorGlow() {
  const glow = document.getElementById("cursor-glow");
  if (!glow) return;

  window.addEventListener("mousemove", (e) => {
    // Smooth trailing with CSS translation
    glow.style.left = `${e.clientX}px`;
    glow.style.top = `${e.clientY}px`;
  });
}

/* --- Navbar Scroll Behavior --- */
function initNavbarScroll() {
  const nav = document.querySelector(".navbar");
  if (!nav) return;

  window.addEventListener("scroll", () => {
    if (window.scrollY > 50) {
      nav.style.top = "0.75rem";
      nav.querySelector(".nav-container").style.background = "rgba(255, 255, 255, 0.92)";
      nav.querySelector(".nav-container").style.borderColor = "rgba(255, 255, 255, 1)";
      nav.querySelector(".nav-container").style.boxShadow = "0 15px 35px -10px rgba(15, 23, 42, 0.12)";
    } else {
      nav.style.top = "1.5rem";
      nav.querySelector(".nav-container").style.background = "rgba(255, 255, 255, 0.75)";
      nav.querySelector(".nav-container").style.borderColor = "rgba(255, 255, 255, 0.9)";
      nav.querySelector(".nav-container").style.boxShadow = "0 10px 30px -10px rgba(15, 23, 42, 0.08)";
    }
  });
}

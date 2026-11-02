// ---- Reveal on scroll ----
(function initReveal() {
  document.documentElement.classList.add("js");
  const items = document.querySelectorAll(".reveal");
  if (!("IntersectionObserver" in window)) {
    items.forEach(el => el.classList.add("in"));
    return;
  }
  // Stagger index for card contents
  document.querySelectorAll(".card.reveal").forEach(card => {
    Array.from(card.children).forEach((child, i) => child.style.setProperty("--i", i));
  });
  // Toggle both ways so the animation replays on every page change
  const io = new IntersectionObserver(entries => {
    entries.forEach(e => e.target.classList.toggle("in", e.isIntersecting));
  }, { threshold: 0.05, rootMargin: "0px 0px 10% 0px" });
  items.forEach(el => io.observe(el));
})();

// ---- Countdown (Ghurchari, 20 Nov 2026, 4:00 PM IST) ----
(function initCountdown() {
  const target = new Date("2026-11-20T16:00:00+05:30").getTime();
  const els = {
    days: document.getElementById("cd-days"),
    hours: document.getElementById("cd-hours"),
    mins: document.getElementById("cd-mins"),
    secs: document.getElementById("cd-secs")
  };
  const pad = n => String(n).padStart(2, "0");

  function tick() {
    const diff = target - Date.now();
    if (diff <= 0) {
      els.days.textContent = els.hours.textContent = els.mins.textContent = els.secs.textContent = "00";
      clearInterval(timer);
      return;
    }
    els.days.textContent = pad(Math.floor(diff / 86400000));
    els.hours.textContent = pad(Math.floor((diff / 3600000) % 24));
    els.mins.textContent = pad(Math.floor((diff / 60000) % 60));
    els.secs.textContent = pad(Math.floor((diff / 1000) % 60));
  }

  const timer = setInterval(tick, 1000);
  tick();
})();

// ---- Music toggle ----
(function initMusic() {
  const audio = document.getElementById("bgMusic");
  const bar = document.querySelector(".floating-bar");
  const btn = document.getElementById("musicToggle");
  const iconOn = document.getElementById("musicIconOn");
  const iconOff = document.getElementById("musicIconOff");
  let playing = false;

  // Show the button only when assets/audio/bg-music.mp3 is actually deployed
  fetch(audio.getAttribute("src"), { method: "HEAD" })
    .then(r => { if (r.ok) bar.hidden = false; })
    .catch(() => {});

  btn.addEventListener("click", () => {
    if (!playing) {
      audio.play().then(() => {
        playing = true;
        iconOn.style.display = "none";
        iconOff.style.display = "block";
      }).catch(() => {
        // No audio file added yet at assets/audio/bg-music.mp3
      });
    } else {
      audio.pause();
      playing = false;
      iconOn.style.display = "block";
      iconOff.style.display = "none";
    }
  });
})();

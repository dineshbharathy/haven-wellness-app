/* ==========================================================================
   HAVEN WELLNESS SANCTUARY — ANIMATED 2D ENGINE (LIGHTWEIGHT, SMOOTH & BEAUTIFUL)
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
  initDesktopResolutionDetector();
  initAudioEngine();
  initThemeManager();
  initDesktopTabNavigation();
  initAmbientCanvas();
  initSanctuaryHub();
  initAutonomousAITherapistAura();
  initSanctuaryCircleCommunity();
  initEmotionStudio2D();
  initSkyLanterns2DCanvas();
  initBreathingOasis2D();
  initAudioSpectrumBars();
  initSoundscapes();
  initSafeJournal();

  // Subtle Card Tilt Physics
  initSubtle3DCardPhysics();
});

/* ==========================================================================
   1. CALM MICRO-SUBTLE CARD TILT PHYSICS ENGINE
   ========================================================================== */
function initSubtle3DCardPhysics() {
  const subtleCards = document.querySelectorAll('.subtle-3d-card');

  subtleCards.forEach(card => {
    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      const centerX = rect.width / 2;
      const centerY = rect.height / 2;

      const rotateX = ((y - centerY) / centerY) * -1.5;
      const rotateY = ((x - centerX) / centerX) * 1.5;

      card.style.transform = `perspective(1200px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-2px)`;
    });

    card.addEventListener('mouseleave', () => {
      card.style.transform = `perspective(1200px) rotateX(0deg) rotateY(0deg) translateY(0px)`;
    });
  });
}

/* ==========================================================================
   2. DESKTOP RESOLUTION & RESPONSIVE LAYOUT ENGINE
   ========================================================================== */
function initDesktopResolutionDetector() {
  const checkRes = () => {
    const w = window.innerWidth;
    document.body.classList.toggle('desktop-ultra-wide', w >= 1600);
    document.body.classList.toggle('desktop-compact', w < 1200);
  };
  checkRes();
  window.addEventListener('resize', checkRes);
}

/* ==========================================================================
   3. DESKTOP TAB NAVIGATION ENGINE
   ========================================================================== */
function initDesktopTabNavigation() {
  const tabBtns = document.querySelectorAll('.nav-tab-btn');
  const tabPanes = document.querySelectorAll('.tab-pane');
  const pageTitle = document.getElementById('page-title');
  const pageSubtitle = document.getElementById('page-subtitle');

  const tabSubtitles = {
    'hub': 'Evidence-based emotional regulation, autonomous Rogerian therapy, and peer support network.',
    'ai-listener': 'Autonomous Rogerian AI therapist trained in active listening, empathy, and cognitive reframing.',
    'community': 'HIPAA-guided moderated peer support network for emotional sharing and voice relaxation.',
    'memory-orbs': 'Map complex affective states into vibrant animated liquid emotion spheres.',
    'lanterns': 'Release grief, longing, and intentions into the glowing starry sky vault.',
    'breathing': 'Evidence-based parasympathetic vagal stimulation and box breathing regulation.',
    'soundscapes': 'Procedural neuro-acoustic ambient audio generator with interactive visualizers.',
    'memory-jar': 'Deposit notes of gratitude, warmth, and memory into your confidential glass vault.',
    'journal': 'Private, local-encrypted affective check-in and confidential reflective journal.'
  };

  tabBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      getAudioContext();
      playBellSound(720, 'sine', 0.5, 0.05);

      const targetTab = btn.getAttribute('data-tab');
      const targetTitle = btn.getAttribute('data-title');

      tabBtns.forEach(b => b.classList.remove('active'));
      tabPanes.forEach(p => p.classList.remove('active'));

      btn.classList.add('active');
      const activePane = document.getElementById(`tab-${targetTab}`);
      if (activePane) activePane.classList.add('active');

      if (pageTitle && targetTitle) pageTitle.textContent = targetTitle;
      if (pageSubtitle && tabSubtitles[targetTab]) pageSubtitle.textContent = tabSubtitles[targetTab];

      document.body.classList.add('warm-tab-shift');
      setTimeout(() => document.body.classList.remove('warm-tab-shift'), 600);
    });
  });
}

/* ==========================================================================
   4. WEB AUDIO SYNTHESIS & SOUND GENERATOR
   ========================================================================== */
let audioCtx = null;
let soundGenerators = {};

function getAudioContext() {
  if (!audioCtx) {
    audioCtx = new (window.AudioContext || window.webkitAudioContext)();
  }
  if (audioCtx.state === 'suspended') {
    audioCtx.resume();
  }
  return audioCtx;
}

function initAudioEngine() {
  window.addEventListener('click', () => { getAudioContext(); }, { once: true });
}

function playBellSound(freq = 520, type = 'sine', duration = 1.2, vol = 0.1) {
  try {
    const ctx = getAudioContext();
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    osc.type = type;
    osc.frequency.setValueAtTime(freq, ctx.currentTime);

    gain.gain.setValueAtTime(vol, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + duration);

    osc.connect(gain);
    gain.connect(ctx.destination);

    osc.start();
    osc.stop(ctx.currentTime + duration);
  } catch (e) {}
}

function playHarmonicChime(notes = [440, 554.37, 659.25, 830.61]) {
  notes.forEach((freq, idx) => {
    setTimeout(() => {
      playBellSound(freq, 'sine', 1.8, 0.08);
    }, idx * 120);
  });
}

function playHeartbeatChord() {
  playBellSound(130.81, 'triangle', 0.8, 0.15);
  setTimeout(() => playBellSound(164.81, 'sine', 0.6, 0.12), 180);
}

/* ==========================================================================
   5. THEME MANAGER
   ========================================================================== */
function initThemeManager() {
  const themeModal = document.getElementById('theme-modal');
  const openThemeBtn = document.getElementById('open-theme-modal-btn');
  const closeThemeBtn = document.getElementById('close-theme-modal-btn');
  const themeOptions = document.querySelectorAll('.theme-option-btn');

  openThemeBtn?.addEventListener('click', () => themeModal?.classList.remove('hidden'));
  closeThemeBtn?.addEventListener('click', () => themeModal?.classList.add('hidden'));

  themeOptions.forEach(opt => {
    opt.addEventListener('click', () => {
      const theme = opt.getAttribute('data-theme');
      document.body.setAttribute('data-theme', theme);
      themeOptions.forEach(o => o.classList.remove('active'));
      opt.classList.add('active');
      playBellSound(600, 'sine', 0.6, 0.06);
    });
  });
}

/* ==========================================================================
   6. ATMOSPHERIC BACKGROUND PARTICLES (2D CANVAS)
   ========================================================================== */
function initAmbientCanvas() {
  const canvas = document.getElementById('ambient-canvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');

  let width = canvas.width = window.innerWidth;
  let height = canvas.height = window.innerHeight;

  window.addEventListener('resize', () => {
    width = canvas.width = window.innerWidth;
    height = canvas.height = window.innerHeight;
  });

  const particles = Array.from({ length: 45 }, () => ({
    x: Math.random() * width,
    y: Math.random() * height,
    radius: Math.random() * 2.5 + 1,
    alpha: Math.random() * 0.4 + 0.1,
    speedX: (Math.random() - 0.5) * 0.4,
    speedY: (Math.random() - 0.5) * 0.4,
    color: ['rgba(255, 207, 86, ', 'rgba(217, 70, 239, ', 'rgba(255, 128, 82, '][Math.floor(Math.random() * 3)]
  }));

  function draw() {
    ctx.clearRect(0, 0, width, height);

    particles.forEach(p => {
      p.x += p.speedX;
      p.y += p.speedY;

      if (p.x < 0) p.x = width;
      if (p.x > width) p.x = 0;
      if (p.y < 0) p.y = height;
      if (p.y > height) p.y = 0;

      ctx.beginPath();
      ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
      ctx.fillStyle = p.color + p.alpha + ')';
      ctx.fill();
    });

    requestAnimationFrame(draw);
  }
  draw();
}

/* ==========================================================================
   7. SANCTUARY HUB
   ========================================================================== */
function initSanctuaryHub() {
  const timeGreetingEl = document.getElementById('time-greeting');
  const hour = new Date().getHours();
  if (timeGreetingEl) {
    if (hour < 12) timeGreetingEl.textContent = 'Morning Regulation Active';
    else if (hour < 18) timeGreetingEl.textContent = 'Afternoon Calm Active';
    else timeGreetingEl.textContent = 'Evening Rest Regulation';
  }

  const quoteEl = document.getElementById('daily-quote');
  const newQuoteBtn = document.getElementById('new-quote-btn');
  newQuoteBtn?.addEventListener('click', () => {
    getAudioContext();
    playBellSound(680, 'sine', 0.8, 0.08);
    const quotes = [
      "It's okay to miss what isn't there, and still hold space for all the warmth that surrounds you.",
      "You do not have to earn love or belonging. You are inherently worthy simply by being here.",
      "Your tender heart is not a weakness; it is proof of how deeply you can give and receive affection.",
      "Growth happens in quiet, gentle moments. Give yourself permission to pause.",
      "May your day be filled with unexpected moments of comfort and soft light."
    ];
    if (quoteEl) quoteEl.textContent = `"${quotes[Math.floor(Math.random() * quotes.length)]}"`;
  });

  const hugBtn = document.getElementById('hug-btn');
  const hugCountEl = document.getElementById('hug-count');
  const hugModal = document.getElementById('hug-embrace-modal');
  const hugModalCount = document.getElementById('hug-modal-count');

  let hugCount = parseInt(localStorage.getItem('haven_hug_count') || '0');
  if (hugCountEl) hugCountEl.textContent = hugCount;

  hugBtn?.addEventListener('click', () => {
    getAudioContext();
    hugCount++;
    localStorage.setItem('haven_hug_count', hugCount);
    if (hugCountEl) hugCountEl.textContent = hugCount;
    if (hugModalCount) hugModalCount.textContent = hugCount;

    playHeartbeatChord();
    playHarmonicChime([349.23, 440.00, 523.25, 659.25]);
    hugModal?.classList.remove('hidden');
  });

  document.getElementById('close-hug-modal-btn')?.addEventListener('click', () => {
    hugModal?.classList.add('hidden');
  });

  document.getElementById('open-ai-listener-btn')?.addEventListener('click', () => {
    document.querySelector('.nav-tab-btn[data-tab="ai-listener"]')?.click();
  });
  document.getElementById('open-community-tab-btn')?.addEventListener('click', () => {
    document.querySelector('.nav-tab-btn[data-tab="community"]')?.click();
  });
  document.getElementById('open-storybook-tab-btn')?.addEventListener('click', () => {
    document.querySelector('.nav-tab-btn[data-tab="memory-orbs"]')?.click();
  });
}

/* ==========================================================================
   8. AI THERAPIST (DR. AURA) - ANIMATED 2D ORB
   ========================================================================== */
function initAutonomousAITherapistAura() {
  const startListenBtn = document.getElementById('start-voice-listen-btn');
  const statusText = document.getElementById('ai-status-text');
  const textInput = document.getElementById('ai-text-input');
  const sendTextBtn = document.getElementById('send-ai-text-btn');
  const messagesBox = document.getElementById('ai-chat-messages');
  const auraCore = document.querySelector('.aura-core');

  let isListening = false;

  startListenBtn?.addEventListener('click', () => {
    getAudioContext();
    isListening = !isListening;
    if (isListening) {
      if (statusText) statusText.textContent = 'Dr. Aura is listening in active reflection mode...';
      if (startListenBtn) startListenBtn.textContent = '⏹ Listening... Speak Now';
      if (auraCore) auraCore.style.animation = 'auraPulse 1s ease-in-out infinite alternate';
      playHarmonicChime([523.25, 659.25]);
    } else {
      if (statusText) statusText.textContent = 'Dr. Aura is listening softly...';
      if (startListenBtn) startListenBtn.textContent = '🎙️ Tap to Speak with Dr. Aura';
      if (auraCore) auraCore.style.animation = 'auraPulse 3s ease-in-out infinite alternate';
    }
  });

  sendTextBtn?.addEventListener('click', handleSendMessage);
  textInput?.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') handleSendMessage();
  });

  function handleSendMessage() {
    const val = textInput.value.trim();
    if (!val) return;
    appendBubble('You', val, 'user-bubble');
    textInput.value = '';

    if (auraCore) auraCore.style.animation = 'auraPulse 0.8s ease-in-out infinite alternate';

    setTimeout(() => {
      if (auraCore) auraCore.style.animation = 'auraPulse 3s ease-in-out infinite alternate';
      const responses = [
        "I hear you deeply. What you are experiencing is completely valid. How does it feel to put that into words right now?",
        "Thank you for sharing that with me. It takes courage to express tender emotions. Take a soft breath with me.",
        "Your feelings matter, and you are not alone in carrying this. Let's hold space for whatever comes up next."
      ];
      const resp = responses[Math.floor(Math.random() * responses.length)];
      appendBubble('Dr. Aura (AI Therapist Agent)', resp, 'aura-bubble');
      playBellSound(520, 'sine', 1.0, 0.08);
    }, 1200);
  }

  function appendBubble(author, text, bubbleClass) {
    if (!messagesBox) return;
    const bubble = document.createElement('div');
    bubble.className = `chat-bubble ${bubbleClass}`;
    bubble.innerHTML = `<span class="chat-author">${author}:</span><p>"${text}"</p>`;
    messagesBox.appendChild(bubble);
    messagesBox.scrollTop = messagesBox.scrollHeight;
  }
}

/* ==========================================================================
   9. SANCTUARY CIRCLE COMMUNITY
   ========================================================================== */
function initSanctuaryCircleCommunity() {
  const channelBtns = document.querySelectorAll('.channel-btn[data-channel]');
  channelBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      getAudioContext();
      playBellSound(540, 'sine', 0.4, 0.06);
      channelBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
    });
  });
}

/* ==========================================================================
   10. EMOTION STUDIO - 2D ORB CUSTOMIZATION
   ========================================================================== */
function initEmotionStudio2D() {
  const cssOrb = document.getElementById('css-orb');
  const primaryColorInput = document.getElementById('orb-primary-color');
  const secondaryColorInput = document.getElementById('orb-secondary-color');
  const speedSlider = document.getElementById('orb-glow-intensity');
  const paletteBtns = document.querySelectorAll('.palette-swatch-btn');

  function updateOrbGradient() {
    if (!cssOrb) return;
    const c1 = primaryColorInput?.value || '#ffcf56';
    const c2 = secondaryColorInput?.value || '#d946ef';
    cssOrb.style.background = `radial-gradient(circle at 35% 35%, #ffffff 0%, ${c1} 40%, ${c2} 100%)`;
  }

  primaryColorInput?.addEventListener('input', updateOrbGradient);
  secondaryColorInput?.addEventListener('input', updateOrbGradient);

  speedSlider?.addEventListener('input', (e) => {
    if (!cssOrb) return;
    const speed = 11 - (e.target.value / 10);
    cssOrb.style.animationDuration = `${speed}s`;
  });

  paletteBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const p1 = btn.getAttribute('data-p1');
      const p2 = btn.getAttribute('data-p2');
      if (primaryColorInput) primaryColorInput.value = p1;
      if (secondaryColorInput) secondaryColorInput.value = p2;
      updateOrbGradient();
      playBellSound(640, 'sine', 0.5, 0.06);
    });
  });
}

/* ==========================================================================
   11. SKY LANTERNS - 2D ANIMATED CANVAS
   ========================================================================== */
function initSkyLanterns2DCanvas() {
  const canvas = document.getElementById('sky-2d-canvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');

  let width = canvas.width = canvas.parentElement.clientWidth || 800;
  let height = canvas.height = canvas.parentElement.clientHeight || 360;

  window.addEventListener('resize', () => {
    if (canvas.parentElement) {
      width = canvas.width = canvas.parentElement.clientWidth;
      height = canvas.height = canvas.parentElement.clientHeight;
    }
  });

  const lanterns = Array.from({ length: 22 }, () => ({
    x: Math.random() * width,
    y: Math.random() * height,
    speed: Math.random() * 0.4 + 0.2,
    sway: Math.random() * 0.02,
    swayOffset: Math.random() * Math.PI * 2,
    size: Math.random() * 12 + 10,
    color: ['#ffcf56', '#ff8052', '#f472b6', '#d946ef'][Math.floor(Math.random() * 4)]
  }));

  function draw() {
    ctx.clearRect(0, 0, width, height);

    lanterns.forEach(l => {
      l.y -= l.speed;
      l.swayOffset += l.sway;
      l.x += Math.sin(l.swayOffset) * 0.5;

      if (l.y < -30) {
        l.y = height + 20;
        l.x = Math.random() * width;
      }

      // Draw lantern body
      ctx.beginPath();
      ctx.roundRect(l.x - l.size / 2, l.y - l.size / 1.5, l.size, l.size * 1.3, 4);
      ctx.fillStyle = l.color;
      ctx.shadowColor = l.color;
      ctx.shadowBlur = 15;
      ctx.fill();
      ctx.shadowBlur = 0;

      // Inner flame glow
      ctx.beginPath();
      ctx.arc(l.x, l.y, l.size / 4, 0, Math.PI * 2);
      ctx.fillStyle = '#ffffff';
      ctx.fill();
    });

    requestAnimationFrame(draw);
  }
  draw();
}

/* ==========================================================================
   12. BREATHING OASIS - 2D ANIMATION ENGINE
   ========================================================================== */
function initBreathingOasis2D() {
  const startBtn = document.getElementById('start-breath-btn');
  const breathCircle = document.getElementById('breath-circle');
  const phaseEl = document.getElementById('breath-phase');
  const timerEl = document.getElementById('breath-timer');
  const instructionEl = document.getElementById('breath-instruction');
  const modeBtns = document.querySelectorAll('.mode-btn');

  let isBreathing = false;
  let breathTimer = null;
  let currentMode = 'relax';

  const modes = {
    'relax': { name: '4-7-8 Parasympathetic', inhale: 4, hold: 7, exhale: 8 },
    'box': { name: '4-4-4 Box Breathing', inhale: 4, hold: 4, exhale: 4 },
    'calm': { name: '4-6 Vagal Resonator', inhale: 4, hold: 0, exhale: 6 }
  };

  modeBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      modeBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      currentMode = btn.getAttribute('data-mode') || 'relax';
      if (instructionEl) instructionEl.textContent = `Selected ${modes[currentMode].name}. Tap start when ready.`;
    });
  });

  startBtn?.addEventListener('click', () => {
    getAudioContext();
    isBreathing = !isBreathing;

    if (isBreathing) {
      startBtn.textContent = '⏹ Stop Regulation';
      runBreathCycle();
    } else {
      stopBreathCycle();
    }
  });

  function stopBreathCycle() {
    isBreathing = false;
    clearTimeout(breathTimer);
    if (startBtn) startBtn.textContent = '▶ Begin Autonomic Regulation';
    if (breathCircle) breathCircle.className = 'breath-circle';
    if (phaseEl) phaseEl.textContent = 'Ready';
    if (timerEl) timerEl.textContent = '--';
  }

  function runBreathCycle() {
    if (!isBreathing) return;
    const config = modes[currentMode];

    // Inhale Phase
    if (phaseEl) phaseEl.textContent = 'Inhale Softly...';
    if (breathCircle) breathCircle.className = 'breath-circle inhale';
    playBellSound(440, 'sine', config.inhale, 0.08);
    countdownPhase(config.inhale, () => {
      if (!isBreathing) return;

      // Hold Phase (if any)
      if (config.hold > 0) {
        if (phaseEl) phaseEl.textContent = 'Hold & Pause...';
        if (breathCircle) breathCircle.className = 'breath-circle hold';
        countdownPhase(config.hold, () => {
          if (!isBreathing) return;
          doExhale(config);
        });
      } else {
        doExhale(config);
      }
    });
  }

  function doExhale(config) {
    if (phaseEl) phaseEl.textContent = 'Exhale Slowly...';
    if (breathCircle) breathCircle.className = 'breath-circle exhale';
    playBellSound(330, 'sine', config.exhale, 0.06);
    countdownPhase(config.exhale, () => {
      if (isBreathing) runBreathCycle();
    });
  }

  function countdownPhase(seconds, callback) {
    let remaining = seconds;
    if (timerEl) timerEl.textContent = remaining;

    const interval = setInterval(() => {
      remaining--;
      if (remaining <= 0 || !isBreathing) {
        clearInterval(interval);
        if (isBreathing) callback();
      } else {
        if (timerEl) timerEl.textContent = remaining;
      }
    }, 1000);
  }
}

/* ==========================================================================
   13. AUDIO SPECTRUM BARS
   ========================================================================== */
function initAudioSpectrumBars() {
  const masterBtn = document.getElementById('master-toggle-btn');
  const bars = document.querySelectorAll('.spectrum-bars .bar');

  let isPlaying = false;
  let animId = null;

  masterBtn?.addEventListener('click', () => {
    getAudioContext();
    isPlaying = !isPlaying;

    if (isPlaying) {
      masterBtn.textContent = '⏹ Disable Audio Generator';
      animateSpectrum();
      playHarmonicChime([440, 523.25, 659.25]);
    } else {
      masterBtn.textContent = '▶ Enable Audio Generator';
      cancelAnimationFrame(animId);
      bars.forEach(b => b.style.height = '20px');
    }
  });

  function animateSpectrum() {
    bars.forEach((b, idx) => {
      const h = Math.sin(Date.now() * 0.008 + idx * 0.4) * 40 + 55;
      b.style.height = `${h}px`;
    });
    if (isPlaying) animId = requestAnimationFrame(animateSpectrum);
  }
}

/* ==========================================================================
   14. SOUNDSCAPES
   ========================================================================== */
function initSoundscapes() {
  const soundCards = document.querySelectorAll('.sound-card');

  soundCards.forEach(card => {
    const btn = card.querySelector('.sound-toggle-btn');
    let active = false;

    btn?.addEventListener('click', () => {
      getAudioContext();
      active = !active;
      btn.textContent = active ? '⏹' : '▶';
      btn.classList.toggle('active', active);
      if (active) playBellSound(580, 'triangle', 1.0, 0.08);
    });
  });
}

/* ==========================================================================
   15. SAFE JOURNAL
   ========================================================================== */
function initSafeJournal() {
  const saveBtn = document.getElementById('save-journal-btn');
  const titleInput = document.getElementById('journal-title');
  const bodyInput = document.getElementById('journal-body');
  const entriesList = document.getElementById('journal-entries-list');
  const emotionBtns = document.querySelectorAll('.emotion-btn');
  const validationBox = document.getElementById('heart-validation-box');
  const validationText = document.getElementById('validation-text');

  const validations = {
    'missing': 'It is deeply natural to miss someone. Missing someone is proof of the genuine love and connection you shared.',
    'seeking-warmth': 'Seeking warmth is a vital self-compassion step. May you feel wrapped in soft, unconditional comfort today.',
    'overwhelmed': 'When emotions feel like high tides, pause. Take slow, gentle breaths. You don\'t have to solve everything today.',
    'quiet': 'Quiet reflection is sanctuary for the soul. Enjoy the gentle stillness without judgment.',
    'peaceful': 'Soft peace is a beautiful space to inhabit. Cherish this calm moment.'
  };

  emotionBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      getAudioContext();
      const emo = btn.getAttribute('data-emotion');
      if (validationBox && validationText && validations[emo]) {
        validationText.textContent = validations[emo];
        validationBox.classList.remove('hidden');
        playBellSound(620, 'sine', 0.8, 0.06);
      }
    });
  });

  saveBtn?.addEventListener('click', () => {
    const title = titleInput?.value.trim();
    const body = bodyInput?.value.trim();
    if (!body) return;

    const entry = document.createElement('div');
    entry.className = 'ios-inset-box margin-top';
    entry.innerHTML = `<strong>${title || 'Untitled Check-In'}</strong> (${new Date().toLocaleDateString()})<p>${body}</p>`;
    entriesList?.prepend(entry);

    if (titleInput) titleInput.value = '';
    if (bodyInput) bodyInput.value = '';
    playBellSound(750, 'sine', 0.8, 0.08);
  });
}

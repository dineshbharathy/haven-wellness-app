/* ==========================================================================
   HAVEN WELLNESS SANCTUARY — ANIMATED 2D ENGINE (LIGHTWEIGHT, SMOOTH & BEAUTIFUL)
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
  // Initialize Lucide Icons
  if (window.lucide) {
    window.lucide.createIcons();
  }

  initDesktopResolutionDetector();
  initAudioEngine();
  initThemeManager();
  initDesktopTabNavigation();
  initSpotlightSearchDashboard();
  initAmbientCanvas();
  initSanctuaryHub();
  initAutonomousAITherapistAura();
  initSanctuaryCircleCommunity();
  initEmotionStudio2D();
  initHandPaintableOrbCanvas();
  initSkyLanterns2DCanvas();
  init3DLanternSkyWorld();
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
   3. DESKTOP TAB NAVIGATION ENGINE (WITH DIRECTIONAL RAINBOW CURTAIN WIPE)
   ========================================================================== */
const tabOrder = [
  'hub',
  'ai-listener',
  'community',
  'memory-orbs',
  'lanterns',
  'breathing',
  'soundscapes',
  'memory-jar',
  'journal'
];
let currentTabIndex = 0;

function initDesktopTabNavigation() {
  const tabBtns = document.querySelectorAll('.nav-tab-btn');
  const tabPanes = document.querySelectorAll('.tab-pane');
  const pageTitle = document.getElementById('page-title');
  const pageSubtitle = document.getElementById('page-subtitle');
  const curtain = document.getElementById('rainbow-wipe-curtain');

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
      const targetIndex = tabOrder.indexOf(targetTab);

      if (targetIndex === currentTabIndex) return;

      // Directional wipe logic:
      // If target is to the right (targetIndex > currentTabIndex), wipe from right to left like opening a curtain.
      // If target is to the left (targetIndex < currentTabIndex), wipe from left to right.
      const directionClass = targetIndex > currentTabIndex ? 'wipe-from-right' : 'wipe-from-left';
      currentTabIndex = targetIndex;

      if (curtain) {
        // Trigger wipe overlay
        curtain.className = `rainbow-wipe-curtain ${directionClass}`;

        // Switch tab content at peak curtain cover (250ms)
        setTimeout(() => {
          tabBtns.forEach(b => b.classList.remove('active'));
          tabPanes.forEach(p => p.classList.remove('active'));

          btn.classList.add('active');
          const activePane = document.getElementById(`tab-${targetTab}`);
          if (activePane) activePane.classList.add('active');

          if (pageTitle && targetTitle) pageTitle.textContent = targetTitle;
          if (pageSubtitle && tabSubtitles[targetTab]) pageSubtitle.textContent = tabSubtitles[targetTab];

          if (window.lucide) window.lucide.createIcons();
        }, 250);

        // Reset curtain after wipe finishes
        setTimeout(() => {
          curtain.className = 'rainbow-wipe-curtain';
        }, 550);
      } else {
        tabBtns.forEach(b => b.classList.remove('active'));
        tabPanes.forEach(p => p.classList.remove('active'));

        btn.classList.add('active');
        const activePane = document.getElementById(`tab-${targetTab}`);
        if (activePane) activePane.classList.add('active');

        if (pageTitle && targetTitle) pageTitle.textContent = targetTitle;
        if (pageSubtitle && tabSubtitles[targetTab]) pageSubtitle.textContent = tabSubtitles[targetTab];

        if (window.lucide) window.lucide.createIcons();
      }

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

/* ==========================================================================
   16. SPOTLIGHT SEARCH DASHBOARD ENGINE
   ========================================================================== */
function initSpotlightSearchDashboard() {
  const spotlightModal = document.getElementById('spotlight-search-modal');
  const spotlightTriggerBtn = document.getElementById('open-spotlight-btn');
  const spotlightInput = document.getElementById('spotlight-input');
  const spotlightResults = document.getElementById('spotlight-results');

  const spotlightData = [
    // Sanctuary Navigation & Tabs
    { title: 'Sanctuary Overview', category: 'Navigation', type: 'nav', target: 'hub', icon: 'home', desc: 'Main clinical wellness sanctuary dashboard' },
    { title: 'Clinical AI Therapist (Dr. Aura)', category: 'Navigation', type: 'nav', target: 'ai-listener', icon: 'bot', desc: 'Autonomous Rogerian therapy & consultation' },
    { title: 'Sanctuary Circle Peer Network', category: 'Navigation', type: 'nav', target: 'community', icon: 'users', desc: 'HIPAA-guided moderated peer channels & voice lounges' },
    { title: 'Cognitive Emotion Studio', category: 'Navigation', type: 'nav', target: 'memory-orbs', icon: 'sparkles', desc: 'Map complex affective states into animated Emotion Orbs' },
    { title: 'Release Sky Vault', category: 'Navigation', type: 'nav', target: 'lanterns', icon: 'send', desc: 'Release grief & intentions into the starry sky' },
    { title: 'Autonomic Regulation', category: 'Navigation', type: 'nav', target: 'breathing', icon: 'wind', desc: '4-7-8 parasympathetic & box breathing exercises' },
    { title: 'Neuro-Acoustic Soundscapes', category: 'Navigation', type: 'nav', target: 'soundscapes', icon: 'music', desc: 'Procedural ambient sound generator & audio' },
    { title: 'Cognitive Memory Vault', category: 'Navigation', type: 'nav', target: 'memory-jar', icon: 'archive', desc: 'Confidential glass jar memory vault & notes' },
    { title: 'Clinical Heart Journal', category: 'Navigation', type: 'nav', target: 'journal', icon: 'heart', desc: 'Private encrypted reflective journal' },

    // Clinical Therapy Actions
    { title: 'Speak with Dr. Aura', category: 'Quick Action', type: 'action', action: 'speak-aura', icon: 'mic', desc: 'Start voice consultation with AI therapist agent' },
    { title: 'Begin 4-7-8 Parasympathetic Breathing', category: 'Quick Action', type: 'action', action: 'start-breath', icon: 'play', desc: 'Start autonomic regulation breathing cycle' },
    { title: 'Experience Warm Embrace Ritual', category: 'Quick Action', type: 'action', action: 'hug-embrace', icon: 'heart-handshake', desc: 'Receive a gentle warm embrace' },
    { title: 'Somatic Tea Mindfulness Pause (30s)', category: 'Quick Action', type: 'action', action: 'brew-tea', icon: 'coffee', desc: '30-second somatic pause' },
    { title: 'Reflective Reframing Statement', category: 'Quick Action', type: 'action', action: 'new-quote', icon: 'sparkles', desc: 'Generate cognitive reframing reflection' },
    { title: 'Release Intentional Lantern', category: 'Quick Action', type: 'action', action: 'open-lantern-modal', icon: 'send', desc: 'Write & release a floating lantern' },
    { title: 'Draw Comfort Note from Vault', category: 'Quick Action', type: 'action', action: 'draw-note', icon: 'sparkles', desc: 'Draw a comfort note from your glass jar' },
    { title: 'Deposit Note into Memory Jar', category: 'Quick Action', type: 'action', action: 'add-note', icon: 'pen-tool', desc: 'Write a note of gratitude or memory' },

    // Soundscapes Audio
    { title: 'Window Rain Soundscape', category: 'Soundscapes', type: 'action', action: 'toggle-rain', icon: 'cloud-rain', desc: 'Pink noise window rain frequency' },
    { title: 'Cozy Campfire Crackle', category: 'Soundscapes', type: 'action', action: 'toggle-campfire', icon: 'flame', desc: 'Warm acoustic campfire crackle' },
    { title: 'Ocean Waves Rolling Tides', category: 'Soundscapes', type: 'action', action: 'toggle-ocean', icon: 'waves', desc: 'Lowpass ocean waves sound' },
    { title: 'Forest Breeze Air', category: 'Soundscapes', type: 'action', action: 'toggle-breeze', icon: 'wind', desc: 'Subtle air forest breeze' },
    { title: 'Harmonic Sine Chimes', category: 'Soundscapes', type: 'action', action: 'toggle-chimes', icon: 'bell', desc: 'Harmonic sine wave chimes' },

    // Peer Channels
    { title: '# general-sanctuary', category: 'Peer Channels', type: 'nav', target: 'community', channel: 'general', icon: 'message-square', desc: 'Supportive space for peer reflection' },
    { title: '# family-and-longing', category: 'Peer Channels', type: 'nav', target: 'community', channel: 'family-longing', icon: 'message-square', desc: 'Support for parental detachment & longing' },
    { title: '# daily-wins-and-warmth', category: 'Peer Channels', type: 'nav', target: 'community', channel: 'daily-wins', icon: 'message-square', desc: 'Sharing daily wins & soft warmth' },
    { title: '🔊 tea-and-rest-lounge', category: 'Peer Channels', type: 'nav', target: 'community', channel: 'voice-lounge', icon: 'volume-2', desc: 'Voice lounge for talking softly' },

    // Theme Customization
    { title: 'Luminous Sunset Glass Theme', category: 'Themes', type: 'theme', theme: 'premium-white', icon: 'palette', desc: 'Sunset gradient glassmorphism theme' },
    { title: 'Midnight Emerald Theme', category: 'Themes', type: 'theme', theme: 'midnight-emerald', icon: 'palette', desc: 'Deep emerald clinical theme' },
    { title: 'Twilight Sunset Theme', category: 'Themes', type: 'theme', theme: 'twilight-sunset', icon: 'palette', desc: 'Twilight purple theme' },
    { title: 'Rose Quartz Theme', category: 'Themes', type: 'theme', theme: 'rose-quartz', icon: 'palette', desc: 'Soft rose quartz theme' }
  ];

  let selectedIndex = 0;
  let currentFilteredItems = [];

  function openSpotlight() {
    if (!spotlightModal) return;
    getAudioContext();
    playBellSound(700, 'sine', 0.4, 0.05);
    spotlightModal.classList.remove('hidden');
    if (spotlightInput) {
      spotlightInput.value = '';
      spotlightInput.focus();
    }
    renderResults('');
  }

  function closeSpotlight() {
    if (!spotlightModal) return;
    spotlightModal.classList.add('hidden');
  }

  spotlightTriggerBtn?.addEventListener('click', openSpotlight);

  // Global Keyboard Shortcuts (Cmd+K / Ctrl+K)
  window.addEventListener('keydown', (e) => {
    if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
      e.preventDefault();
      if (spotlightModal?.classList.contains('hidden')) {
        openSpotlight();
      } else {
        closeSpotlight();
      }
    } else if (e.key === 'Escape' && !spotlightModal?.classList.contains('hidden')) {
      closeSpotlight();
    }
  });

  spotlightInput?.addEventListener('input', (e) => {
    renderResults(e.target.value.trim());
  });

  spotlightInput?.addEventListener('keydown', (e) => {
    if (currentFilteredItems.length === 0) return;

    if (e.key === 'ArrowDown') {
      e.preventDefault();
      selectedIndex = (selectedIndex + 1) % currentFilteredItems.length;
      updateHighlight();
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      selectedIndex = (selectedIndex - 1 + currentFilteredItems.length) % currentFilteredItems.length;
      updateHighlight();
    } else if (e.key === 'Enter') {
      e.preventDefault();
      if (currentFilteredItems[selectedIndex]) {
        executeSpotlightItem(currentFilteredItems[selectedIndex]);
      }
    }
  });

  function renderResults(query) {
    if (!spotlightResults) return;
    spotlightResults.innerHTML = '';
    selectedIndex = 0;

    const lowerQuery = query.toLowerCase();
    const filtered = spotlightData.filter(item => 
      item.title.toLowerCase().includes(lowerQuery) ||
      item.desc.toLowerCase().includes(lowerQuery) ||
      item.category.toLowerCase().includes(lowerQuery)
    );

    currentFilteredItems = filtered;

    if (filtered.length === 0) {
      spotlightResults.innerHTML = `
        <div class="ios-inset-box text-center" style="padding: 24px;">
          <p style="color: var(--text-soft); font-size: 0.9rem;">No results found for "${query}". Try searching "Aura", "Rain", "4-7-8", or "Theme".</p>
        </div>
      `;
      return;
    }

    // Group items by category
    const grouped = {};
    filtered.forEach(item => {
      if (!grouped[item.category]) grouped[item.category] = [];
      grouped[item.category].push(item);
    });

    let globalItemIndex = 0;

    Object.keys(grouped).forEach(category => {
      const groupEl = document.createElement('div');
      groupEl.className = 'spotlight-group';

      const titleEl = document.createElement('div');
      titleEl.className = 'spotlight-group-title';
      titleEl.textContent = category;
      groupEl.appendChild(titleEl);

      grouped[category].forEach(item => {
        const itemIdx = globalItemIndex;
        const itemEl = document.createElement('div');
        itemEl.className = `spotlight-item ${itemIdx === selectedIndex ? 'selected' : ''}`;
        itemEl.setAttribute('data-index', itemIdx);

        itemEl.innerHTML = `
          <div class="spotlight-item-left">
            <div class="spotlight-item-icon">
              <i data-lucide="${item.icon}"></i>
            </div>
            <div class="spotlight-item-info">
              <span class="spotlight-item-title">${item.title}</span>
              <span class="spotlight-item-subtitle">${item.desc}</span>
            </div>
          </div>
          <span class="spotlight-badge">${item.category}</span>
        `;

        itemEl.addEventListener('click', () => executeSpotlightItem(item));
        groupEl.appendChild(itemEl);
        globalItemIndex++;
      });

      spotlightResults.appendChild(groupEl);
    });

    if (window.lucide) window.lucide.createIcons();
  }

  function updateHighlight() {
    const items = spotlightResults.querySelectorAll('.spotlight-item');
    items.forEach((item, idx) => {
      item.classList.toggle('selected', idx === selectedIndex);
      if (idx === selectedIndex) {
        item.scrollIntoView({ block: 'nearest' });
      }
    });
  }

  function executeSpotlightItem(item) {
    closeSpotlight();
    playBellSound(750, 'sine', 0.5, 0.08);

    if (item.type === 'nav') {
      const btn = document.querySelector(`.nav-tab-btn[data-tab="${item.target}"]`);
      btn?.click();
      if (item.channel) {
        setTimeout(() => {
          const chanBtn = document.querySelector(`.channel-btn[data-channel="${item.channel}"]`);
          chanBtn?.click();
        }, 300);
      }
    } else if (item.type === 'theme') {
      document.body.setAttribute('data-theme', item.theme);
      const opt = document.querySelector(`.theme-option-btn[data-theme="${item.theme}"]`);
      if (opt) {
        document.querySelectorAll('.theme-option-btn').forEach(o => o.classList.remove('active'));
        opt.classList.add('active');
      }
    } else if (item.type === 'action') {
      switch (item.action) {
        case 'speak-aura':
          document.querySelector('.nav-tab-btn[data-tab="ai-listener"]')?.click();
          setTimeout(() => document.getElementById('start-voice-listen-btn')?.click(), 400);
          break;
        case 'start-breath':
          document.querySelector('.nav-tab-btn[data-tab="breathing"]')?.click();
          setTimeout(() => document.getElementById('start-breath-btn')?.click(), 400);
          break;
        case 'hug-embrace':
          document.getElementById('hug-btn')?.click();
          break;
        case 'brew-tea':
          document.getElementById('brew-tea-btn')?.click();
          break;
        case 'new-quote':
          document.getElementById('new-quote-btn')?.click();
          break;
        case 'open-lantern-modal':
          document.querySelector('.nav-tab-btn[data-tab="lanterns"]')?.click();
          setTimeout(() => document.getElementById('open-lantern-modal-btn')?.click(), 400);
          break;
        case 'draw-note':
          document.querySelector('.nav-tab-btn[data-tab="memory-jar"]')?.click();
          setTimeout(() => document.getElementById('draw-note-btn')?.click(), 400);
          break;
        case 'add-note':
          document.querySelector('.nav-tab-btn[data-tab="memory-jar"]')?.click();
          setTimeout(() => document.getElementById('add-note-btn')?.click(), 400);
          break;
        case 'toggle-rain':
        case 'toggle-campfire':
        case 'toggle-ocean':
        case 'toggle-breeze':
        case 'toggle-chimes':
          const soundName = item.action.replace('toggle-', '');
          document.querySelector('.nav-tab-btn[data-tab="soundscapes"]')?.click();
          setTimeout(() => {
            const card = document.querySelector(`.sound-card[data-sound="${soundName}"]`);
            card?.querySelector('.sound-toggle-btn')?.click();
          }, 400);
          break;
      }
    }
  }
}

/* ==========================================================================
   17. HAND-PAINTABLE ORB CANVAS & APP-WIDE GRADIENT BINDING ENGINE
   ========================================================================== */
function initHandPaintableOrbCanvas() {
  const canvas = document.getElementById('paint-orb-canvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');

  const width = canvas.width = 220;
  const height = canvas.height = 220;
  const radius = width / 2;

  let isPainting = false;
  let currentBrushColor = '#d946ef';
  let paintedColorsList = ['#ffcf56', '#d946ef', '#ff8052'];

  // Initialize Canvas with Soft Radial Base
  function drawBaseOrb() {
    ctx.clearRect(0, 0, width, height);

    // Create circular clip path
    ctx.save();
    ctx.beginPath();
    ctx.arc(radius, radius, radius - 4, 0, Math.PI * 2);
    ctx.clip();

    // Base background gradient
    const bgGrad = ctx.createRadialGradient(radius * 0.7, radius * 0.7, 10, radius, radius, radius);
    bgGrad.addColorStop(0, '#ffffff');
    bgGrad.addColorStop(0.4, '#ffcf56');
    bgGrad.addColorStop(0.75, '#ff8052');
    bgGrad.addColorStop(1, '#d946ef');

    ctx.fillStyle = bgGrad;
    ctx.fill();
    ctx.restore();
  }

  drawBaseOrb();

  // Paint Swatches & Color Picker
  const colorBtns = document.querySelectorAll('.paint-color-btn');
  const customPicker = document.getElementById('custom-brush-color');

  colorBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      colorBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      currentBrushColor = btn.getAttribute('data-color') || '#d946ef';
      if (!paintedColorsList.includes(currentBrushColor)) {
        paintedColorsList.unshift(currentBrushColor);
      }
    });
  });

  customPicker?.addEventListener('input', (e) => {
    currentBrushColor = e.target.value;
    if (!paintedColorsList.includes(currentBrushColor)) {
      paintedColorsList.unshift(currentBrushColor);
    }
  });

  // Pointer Painting Events
  function paintAtPosition(x, y) {
    ctx.save();
    ctx.beginPath();
    ctx.arc(radius, radius, radius - 4, 0, Math.PI * 2);
    ctx.clip();

    const rad = Math.random() * 25 + 20;
    const grad = ctx.createRadialGradient(x, y, 0, x, y, rad);
    grad.addColorStop(0, currentBrushColor);
    grad.addColorStop(0.6, currentBrushColor + 'aa');
    grad.addColorStop(1, 'transparent');

    ctx.fillStyle = grad;
    ctx.beginPath();
    ctx.arc(x, y, rad, 0, Math.PI * 2);
    ctx.fill();
    ctx.restore();

    // Dynamically update CSS preview orb
    updateCSSOrbPreview();
  }

  function getCanvasCoords(e) {
    const rect = canvas.getBoundingClientRect();
    return {
      x: (e.clientX - rect.left) * (width / rect.width),
      y: (e.clientY - rect.top) * (height / rect.height)
    };
  }

  canvas.addEventListener('pointerdown', (e) => {
    isPainting = true;
    const { x, y } = getCanvasCoords(e);
    paintAtPosition(x, y);
  });

  canvas.addEventListener('pointermove', (e) => {
    if (!isPainting) return;
    const { x, y } = getCanvasCoords(e);
    paintAtPosition(x, y);
  });

  window.addEventListener('pointerup', () => { isPainting = false; });
  window.addEventListener('pointercancel', () => { isPainting = false; });

  document.getElementById('clear-orb-paint-btn')?.addEventListener('click', () => {
    drawBaseOrb();
    playBellSound(600, 'sine', 0.5, 0.05);
    updateCSSOrbPreview();
  });

  function updateCSSOrbPreview() {
    const cssOrb = document.getElementById('css-orb');
    if (!cssOrb) return;
    const c1 = paintedColorsList[0] || '#ffcf56';
    const c2 = paintedColorsList[1] || '#d946ef';
    const c3 = paintedColorsList[2] || '#ff8052';
    cssOrb.style.background = `radial-gradient(circle at 35% 35%, #ffffff 0%, ${c1} 35%, ${c2} 70%, ${c3} 100%)`;
  }

  // CRITICAL REQUIREMENT: Apply Painted Gradient to ENTIRE Sanctuary App!
  document.getElementById('apply-paint-theme-btn')?.addEventListener('click', () => {
    getAudioContext();
    playHarmonicChime([523.25, 659.25, 783.99, 1046.50]);

    const c1 = paintedColorsList[0] || '#ffcf56';
    const c2 = paintedColorsList[1] || '#ff8052';
    const c3 = paintedColorsList[2] || '#f472b6';
    const c4 = paintedColorsList[3] || '#d946ef';

    // Update CSS Custom Properties App-Wide
    document.documentElement.style.setProperty('--sun-gold', c1);
    document.documentElement.style.setProperty('--coral', c2);
    document.documentElement.style.setProperty('--rose', c3);
    document.documentElement.style.setProperty('--magenta', c4);

    // Apply smooth glow shift
    document.body.classList.add('warm-tab-shift');
    setTimeout(() => document.body.classList.remove('warm-tab-shift'), 800);
  });
}

/* ==========================================================================
   18. DEDICATED 3D LANTERN SKY WORLD (WASD + SPECTATE + CAROUSEL)
   ========================================================================== */
function init3DLanternSkyWorld() {
  const enterBtn = document.getElementById('enter-3d-sky-world-btn');
  const overlay = document.getElementById('lantern-3d-world-overlay');
  const canvas = document.getElementById('lantern-world-canvas');
  const exitBtn = document.getElementById('exit-3d-world-btn');
  const spectatePanel = document.getElementById('spectate-glass-panel');
  const closeSpectateBtn = document.getElementById('close-spectate-panel-btn');

  if (!canvas || !window.THREE) return;

  let scene, camera, renderer, animationId;
  let lanterns = [];
  let stars;
  let selectedLanternMesh = null;

  // WASD Controls State
  const keys = { w: false, a: false, s: false, d: false };
  let isMouseDown = false;
  let mouseX = 0, mouseY = 0;
  let cameraRotation = { yaw: 0, pitch: 0 };
  let moveSpeed = 0.15;

  function initScene() {
    scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2(0x0a0518, 0.035);

    const w = window.innerWidth;
    const h = window.innerHeight;

    camera = new THREE.PerspectiveCamera(55, w / h, 0.1, 1000);
    camera.position.set(0, 0, 12);

    renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: true });
    renderer.setSize(w, h);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

    // Lights
    const ambient = new THREE.AmbientLight(0xffffff, 0.7);
    scene.add(ambient);

    const dirLight = new THREE.DirectionalLight(0xffcf56, 1.5);
    dirLight.position.set(5, 10, 7);
    scene.add(dirLight);

    // Starry Particles
    const starGeo = new THREE.BufferGeometry();
    const starCount = 300;
    const starPos = new Float32Array(starCount * 3);
    for (let i = 0; i < starCount * 3; i += 3) {
      starPos[i] = (Math.random() - 0.5) * 60;
      starPos[i + 1] = (Math.random() - 0.5) * 40;
      starPos[i + 2] = (Math.random() - 0.5) * 60;
    }
    starGeo.setAttribute('position', new THREE.BufferAttribute(starPos, 3));
    const starMat = new THREE.PointsMaterial({ color: 0xffcf56, size: 0.15, transparent: true, opacity: 0.8 });
    stars = new THREE.Points(starGeo, starMat);
    scene.add(stars);

    // Create 3D Glowing Lanterns
    lanterns = [];
    const colors = [0xffcf56, 0xff8052, 0xd946ef, 0x34d399, 0x60a5fa];

    for (let i = 0; i < 28; i++) {
      const group = new THREE.Group();

      // Outer Lantern Cylinder Body
      const bodyGeo = new THREE.CylinderGeometry(0.35, 0.42, 0.8, 16);
      const bodyMat = new THREE.MeshStandardMaterial({
        color: colors[i % colors.length],
        roughness: 0.25,
        metalness: 0.1,
        transparent: true,
        opacity: 0.88,
        emissive: colors[i % colors.length],
        emissiveIntensity: 0.4
      });
      const body = new THREE.Mesh(bodyGeo, bodyMat);
      group.add(body);

      // Inner Flame Light Core
      const flameGeo = new THREE.SphereGeometry(0.15, 16, 16);
      const flameMat = new THREE.MeshBasicMaterial({ color: 0xffffff });
      const flame = new THREE.Mesh(flameGeo, flameMat);
      flame.position.y = -0.1;
      group.add(flame);

      const pointLight = new THREE.PointLight(colors[i % colors.length], 1.5, 4);
      pointLight.position.y = -0.1;
      group.add(pointLight);

      // Position in 3D Space
      group.position.set(
        (Math.random() - 0.5) * 22,
        (Math.random() - 0.5) * 12,
        (Math.random() - 0.5) * 16 - 2
      );
      group.userData = {
        id: i + 1,
        floatSpeed: 0.003 + Math.random() * 0.003,
        swayOffset: Math.random() * Math.PI * 2,
        date: `Aug ${Math.floor(Math.random() * 5) + 1}, 2026`,
        title: ['Light of Peace & Warmth', 'Dear Dad • Floating Intention', 'A Soft Memory for Tomorrow', 'Quiet Reflection Sky'][i % 4],
        note: '"I hold space for the warmth you left behind, and I honor your memory with every quiet sunset."'
      };

      scene.add(group);
      lanterns.push(group);
    }
  }

  // Event Listeners for WASD Navigation
  window.addEventListener('keydown', (e) => {
    if (overlay.classList.contains('hidden')) return;
    const k = e.key.toLowerCase();
    if (k in keys) keys[k] = true;
  });

  window.addEventListener('keyup', (e) => {
    if (overlay.classList.contains('hidden')) return;
    const k = e.key.toLowerCase();
    if (k in keys) keys[k] = false;
  });

  // Mouse Look Dragging
  canvas.addEventListener('mousedown', (e) => {
    isMouseDown = true;
    mouseX = e.clientX;
    mouseY = e.clientY;
  });

  window.addEventListener('mouseup', () => { isMouseDown = false; });

  canvas.addEventListener('mousemove', (e) => {
    if (!isMouseDown || overlay.classList.contains('hidden')) return;
    const deltaX = e.clientX - mouseX;
    const deltaY = e.clientY - mouseY;
    mouseX = e.clientX;
    mouseY = e.clientY;

    cameraRotation.yaw -= deltaX * 0.003;
    cameraRotation.pitch -= deltaY * 0.003;
    cameraRotation.pitch = Math.max(-Math.PI / 3, Math.min(Math.PI / 3, cameraRotation.pitch));

    camera.rotation.set(cameraRotation.pitch, cameraRotation.yaw, 0, 'YXZ');
  });

  // Scroll Zoom
  canvas.addEventListener('wheel', (e) => {
    if (overlay.classList.contains('hidden')) return;
    camera.position.z += e.deltaY * 0.01;
    camera.position.z = Math.max(2, Math.min(30, camera.position.z));
  });

  // Raycaster Spectate Lantern Click
  const raycaster = new THREE.Raycaster();
  const mouse = new THREE.Vector2();

  canvas.addEventListener('click', (e) => {
    if (overlay.classList.contains('hidden')) return;
    mouse.x = (e.clientX / window.innerWidth) * 2 - 1;
    mouse.y = -(e.clientY / window.innerHeight) * 2 + 1;

    raycaster.setFromCamera(mouse, camera);
    const intersects = raycaster.intersectObjects(lanterns.map(g => g.children[0]));

    if (intersects.length > 0) {
      const clickedMesh = intersects[0].object.parent;
      spectateLantern(clickedMesh);
    }
  });

  function spectateLantern(lanternGroup) {
    selectedLanternMesh = lanternGroup;
    const data = lanternGroup.userData;

    getAudioContext();
    playHarmonicChime([523.25, 659.25, 783.99]);

    // Animate lantern towards camera left half
    lanternGroup.position.set(-2.5, 0, camera.position.z - 4);

    // Populate spectate glass panel
    const dateBadge = document.getElementById('spectate-date-badge');
    const titleEl = document.getElementById('spectate-title');
    const noteEl = document.getElementById('spectate-note');

    if (dateBadge) dateBadge.textContent = data.date;
    if (titleEl) titleEl.textContent = data.title;
    if (noteEl) noteEl.textContent = data.note;

    spectatePanel?.classList.remove('hidden');
    if (window.lucide) window.lucide.createIcons();
  }

  closeSpectateBtn?.addEventListener('click', () => {
    spectatePanel?.classList.add('hidden');
  });

  // Spinning 3D Photo Carousel Nav Logic
  let carouselAngle = 0;
  const carouselSpinner = document.getElementById('carousel-spinner');
  document.getElementById('carousel-prev-btn')?.addEventListener('click', () => {
    carouselAngle += 120;
    if (carouselSpinner) carouselSpinner.style.transform = `rotateY(${carouselAngle}deg)`;
    playBellSound(620, 'sine', 0.4, 0.05);
  });
  document.getElementById('carousel-next-btn')?.addEventListener('click', () => {
    carouselAngle -= 120;
    if (carouselSpinner) carouselSpinner.style.transform = `rotateY(${carouselAngle}deg)`;
    playBellSound(620, 'sine', 0.4, 0.05);
  });

  // Animation Frame Loop
  function animate3DWorld() {
    animationId = requestAnimationFrame(animate3DWorld);

    // WASD Movement
    const dir = new THREE.Vector3();
    camera.getWorldDirection(dir);
    dir.y = 0; // Move along horizontal plane
    dir.normalize();

    const sideDir = new THREE.Vector3().crossVectors(dir, new THREE.Vector3(0, 1, 0)).negate();

    if (keys.w) camera.position.addScaledVector(dir, moveSpeed);
    if (keys.s) camera.position.addScaledVector(dir, -moveSpeed);
    if (keys.a) camera.position.addScaledVector(sideDir, -moveSpeed);
    if (keys.d) camera.position.addScaledVector(sideDir, moveSpeed);

    // Float Lanterns
    lanterns.forEach(l => {
      if (l !== selectedLanternMesh) {
        l.position.y += l.userData.floatSpeed;
        l.userData.swayOffset += 0.02;
        l.position.x += Math.sin(l.userData.swayOffset) * 0.005;
        l.rotation.y += 0.005;

        if (l.position.y > 10) l.position.y = -8;
      }
    });

    if (stars) stars.rotation.y += 0.0003;

    renderer.render(scene, camera);
  }

  // Open 3D World Overlay
  enterBtn?.addEventListener('click', () => {
    getAudioContext();
    playHarmonicChime([440, 523.25, 659.25, 880]);
    overlay?.classList.remove('hidden');
    if (!scene) initScene();
    animate3DWorld();
  });

  // Exit 3D World
  exitBtn?.addEventListener('click', () => {
    cancelAnimationFrame(animationId);
    overlay?.classList.add('hidden');
    spectatePanel?.classList.add('hidden');
  });

  window.addEventListener('resize', () => {
    if (scene && camera && renderer) {
      const w = window.innerWidth;
      const h = window.innerHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    }
  });
}

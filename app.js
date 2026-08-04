/* ==========================================================================
   HAVEN WELLNESS SANCTUARY — APPLICATION ENGINE (JS)
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
  // Init Modules
  initAudioEngine();
  initThemeManager();
  initTabNavigation();
  initAmbientCanvas();
  initSanctuaryHub();
  initSkyLanterns();
  initBreathingOasis();
  initSoundscapes();
  initMemoryJar();
  initSafeJournal();
});

/* ==========================================================================
   CENTRAL AUDIO ENGINE (WEB AUDIO API)
   ========================================================================== */
let audioCtx = null;
let masterGainNode = null;

function getAudioContext() {
  if (!audioCtx) {
    audioCtx = new (window.AudioContext || window.webkitAudioContext)();
    masterGainNode = audioCtx.createGain();
    const masterSlider = document.getElementById('master-volume-slider');
    masterGainNode.gain.value = masterSlider ? parseFloat(masterSlider.value) : 0.7;
    masterGainNode.connect(audioCtx.destination);
  }
  if (audioCtx.state === 'suspended') {
    audioCtx.resume();
  }
  return audioCtx;
}

// Play a soft bell / chime / tone UI sound
function playBellSound(freq = 440, type = 'sine', duration = 1.5, vol = 0.2) {
  try {
    const ctx = getAudioContext();
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    osc.type = type;
    osc.frequency.setValueAtTime(freq, ctx.currentTime);

    gain.gain.setValueAtTime(vol, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + duration);

    osc.connect(gain);
    gain.connect(masterGainNode);

    osc.start();
    osc.stop(ctx.currentTime + duration + 0.1);
  } catch (e) {
    console.log('Audio playback prevented or unsupported', e);
  }
}

// Play a warm harmonic chime (multiple notes)
function playHarmonicChime(freqs = [523.25, 659.25, 783.99, 1046.50]) {
  freqs.forEach((f, index) => {
    setTimeout(() => {
      playBellSound(f, 'sine', 2.0, 0.12);
    }, index * 120);
  });
}

/* ==========================================================================
   1. THEME MANAGER
   ========================================================================== */
function initThemeManager() {
  const themeToggleBtn = document.getElementById('theme-toggle-btn');
  const themeModal = document.getElementById('theme-modal');
  const themeOptionBtns = document.querySelectorAll('.theme-option-btn');

  const savedTheme = localStorage.getItem('haven_theme') || 'twilight';
  setTheme(savedTheme);

  themeToggleBtn?.addEventListener('click', () => {
    getAudioContext();
    playBellSound(600, 'sine', 0.5, 0.08);
    themeModal?.classList.remove('hidden');
  });

  themeOptionBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const theme = btn.getAttribute('data-theme');
      setTheme(theme);
      playBellSound(750, 'sine', 0.6, 0.1);
      themeOptionBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      themeModal?.classList.add('hidden');
    });
  });

  // Modal Close Handlers
  document.querySelectorAll('.modal-close-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      playBellSound(350, 'sine', 0.3, 0.05);
      const modalId = btn.getAttribute('data-modal');
      document.getElementById(modalId)?.classList.add('hidden');
    });
  });
}

function setTheme(theme) {
  document.body.setAttribute('data-theme', theme);
  localStorage.setItem('haven_theme', theme);
}

/* ==========================================================================
   2. TAB NAVIGATION
   ========================================================================== */
function initTabNavigation() {
  const navBtns = document.querySelectorAll('.nav-btn');
  const tabPanes = document.querySelectorAll('.tab-pane');

  navBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      getAudioContext();
      playBellSound(520, 'sine', 0.4, 0.06);

      const tabId = btn.getAttribute('data-tab');

      navBtns.forEach(b => b.classList.remove('active'));
      tabPanes.forEach(p => p.classList.remove('active'));

      btn.classList.add('active');
      document.getElementById(`tab-${tabId}`)?.classList.add('active');

      if (tabId === 'lanterns') {
        window.dispatchEvent(new Event('resize'));
      }
    });
  });
}

/* ==========================================================================
   3. AMBIENT BACKGROUND CANVAS
   ========================================================================== */
function initAmbientCanvas() {
  const canvas = document.getElementById('ambient-canvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');

  let width = (canvas.width = window.innerWidth);
  let height = (canvas.height = window.innerHeight);

  window.addEventListener('resize', () => {
    width = canvas.width = window.innerWidth;
    height = canvas.height = window.innerHeight;
  });

  const particles = [];
  const count = 45;

  for (let i = 0; i < count; i++) {
    particles.push({
      x: Math.random() * width,
      y: Math.random() * height,
      radius: Math.random() * 2 + 0.5,
      alpha: Math.random() * 0.8 + 0.2,
      vx: (Math.random() - 0.5) * 0.3,
      vy: -Math.random() * 0.4 - 0.1,
      pulse: Math.random() * 0.02 + 0.005
    });
  }

  function render() {
    ctx.clearRect(0, 0, width, height);

    particles.forEach(p => {
      p.x += p.vx;
      p.y += p.vy;
      p.alpha += Math.sin(Date.now() * p.pulse) * 0.01;

      if (p.y < 0) p.y = height;
      if (p.x < 0) p.x = width;
      if (p.x > width) p.x = 0;

      ctx.beginPath();
      ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(255, 255, 255, ${Math.max(0.1, Math.min(0.9, p.alpha))})`;
      ctx.shadowBlur = 8;
      ctx.shadowColor = '#ffffff';
      ctx.fill();
    });

    requestAnimationFrame(render);
  }

  render();
}

/* ==========================================================================
   4. SANCTUARY HUB & MINI-RITUALS
   ========================================================================== */
const COMFORT_QUOTES = [
  "It's okay to miss what isn't there, and still hold space for all the warmth that surrounds you.",
  "You do not have to earn love or belonging. You are inherently worthy simply by being here.",
  "On days when family feels distant, remember that you are capable of building your own gentle home.",
  "Your tender heart is not a weakness; it is proof of how deeply you can give and receive affection.",
  "Take things one breath at a time. The world can wait while you rest.",
  "You carry light inside you that nobody can ever take away."
];

const AFFIRMATIONS = [
  "I am deserving of affection, peace, and soft quiet happiness.",
  "My feelings are valid, and it is natural to long for connection.",
  "I am choosing to treat myself with unconditional kindness today.",
  "I surround myself with people who value, cherish, and see me.",
  "Even when I feel fragmented, I am whole and enough."
];

function initSanctuaryHub() {
  const timeGreetingEl = document.getElementById('time-greeting');
  const hour = new Date().getHours();
  if (hour < 12) timeGreetingEl.textContent = 'Good Morning';
  else if (hour < 18) timeGreetingEl.textContent = 'Good Afternoon';
  else timeGreetingEl.textContent = 'Good Evening';

  const quoteEl = document.getElementById('daily-quote');
  const newQuoteBtn = document.getElementById('new-quote-btn');
  newQuoteBtn?.addEventListener('click', () => {
    getAudioContext();
    playBellSound(680, 'sine', 0.8, 0.08);
    const randomQuote = COMFORT_QUOTES[Math.floor(Math.random() * COMFORT_QUOTES.length)];
    quoteEl.textContent = `"${randomQuote}"`;
  });

  // Hug Counter & Warm Chime
  const hugBtn = document.getElementById('hug-btn');
  const hugCountEl = document.getElementById('hug-count');
  let hugCount = parseInt(localStorage.getItem('haven_hug_count') || '0');
  hugCountEl.textContent = hugCount;

  hugBtn?.addEventListener('click', (e) => {
    getAudioContext();
    hugCount++;
    localStorage.setItem('haven_hug_count', hugCount);
    hugCountEl.textContent = hugCount;

    // Soft warm chord sound
    playHarmonicChime([349.23, 440.00, 523.25, 659.25]);
    createHeartBurst(e.clientX, e.clientY);
  });

  // Tea Ritual
  const brewTeaBtn = document.getElementById('brew-tea-btn');
  let teaInterval = null;

  brewTeaBtn?.addEventListener('click', () => {
    getAudioContext();
    if (brewTeaBtn.disabled) return;
    brewTeaBtn.disabled = true;
    let secondsLeft = 30;

    playBellSound(440, 'sine', 1.0, 0.1);
    brewTeaBtn.textContent = `🍵 Steeping Comfort... (${secondsLeft}s)`;
    document.getElementById('tea-steam').style.opacity = '1';

    teaInterval = setInterval(() => {
      secondsLeft--;
      if (secondsLeft % 5 === 0 && secondsLeft > 0) {
        playBellSound(587.33, 'sine', 0.5, 0.04);
      }
      if (secondsLeft > 0) {
        brewTeaBtn.textContent = `🍵 Steeping Comfort... (${secondsLeft}s)`;
      } else {
        clearInterval(teaInterval);
        brewTeaBtn.disabled = false;
        playHarmonicChime([523.25, 659.25, 783.99]);
        brewTeaBtn.textContent = '✨ Cup Ready! Take a Mindful Sip';
        setTimeout(() => {
          brewTeaBtn.textContent = '✨ Start 30s Tea Ritual';
        }, 5000);
      }
    }, 1000);
  });

  // Affirmations
  const affirmationText = document.getElementById('affirmation-text');
  const flipAffirmationBtn = document.getElementById('flip-affirmation-btn');
  flipAffirmationBtn?.addEventListener('click', () => {
    getAudioContext();
    playBellSound(620, 'sine', 0.6, 0.08);
    const next = AFFIRMATIONS[Math.floor(Math.random() * AFFIRMATIONS.length)];
    affirmationText.style.opacity = '0';
    setTimeout(() => {
      affirmationText.textContent = `"${next}"`;
      affirmationText.style.opacity = '1';
    }, 200);
  });
}

function createHeartBurst(x, y) {
  for (let i = 0; i < 14; i++) {
    const heart = document.createElement('div');
    heart.textContent = ['❤️', '💖', '✨', '🌸', '🤍'][Math.floor(Math.random() * 5)];
    heart.style.position = 'fixed';
    heart.style.left = `${x}px`;
    heart.style.top = `${y}px`;
    heart.style.pointerEvents = 'none';
    heart.style.fontSize = `${Math.random() * 16 + 14}px`;
    heart.style.zIndex = '9999';
    heart.style.transition = 'all 1s cubic-bezier(0.1, 0.8, 0.3, 1)';

    document.body.appendChild(heart);

    const angle = Math.random() * Math.PI * 2;
    const dist = Math.random() * 90 + 40;
    const tx = Math.cos(angle) * dist;
    const ty = Math.sin(angle) * dist - 60;

    requestAnimationFrame(() => {
      heart.style.transform = `translate(${tx}px, ${ty}px) scale(1.4)`;
      heart.style.opacity = '0';
    });

    setTimeout(() => heart.remove(), 1000);
  }
}

/* ==========================================================================
   5. SKY LANTERNS OF RELEASE
   ========================================================================== */
function initSkyLanterns() {
  const skyCanvas = document.getElementById('sky-canvas');
  if (!skyCanvas) return;
  const ctx = skyCanvas.getContext('2d');
  const viewport = document.getElementById('sky-viewport');

  let width = (skyCanvas.width = viewport.clientWidth);
  let height = (skyCanvas.height = viewport.clientHeight);

  window.addEventListener('resize', () => {
    if (viewport.clientWidth > 0) {
      width = skyCanvas.width = viewport.clientWidth;
      height = skyCanvas.height = viewport.clientHeight;
    }
  });

  let lanterns = JSON.parse(localStorage.getItem('haven_lanterns') || '[]');
  const releasedCountEl = document.getElementById('released-count');
  releasedCountEl.textContent = `${lanterns.length} lanterns floating softly`;

  const activeLanterns = lanterns.map(l => ({
    ...l,
    x: l.x || Math.random() * (width - 60) + 30,
    y: l.y || Math.random() * (height - 100) + 50,
    vy: -Math.random() * 0.3 - 0.1,
    sway: Math.random() * Math.PI * 2,
    size: 24
  }));

  function renderSky() {
    ctx.clearRect(0, 0, width, height);

    // Stars
    for (let i = 0; i < 40; i++) {
      const sx = (Math.sin(i * 99 + Date.now() * 0.001) * 0.5 + 0.5) * width;
      const sy = (Math.cos(i * 33 + Date.now() * 0.001) * 0.5 + 0.5) * height;
      ctx.fillStyle = `rgba(255, 255, 255, ${Math.sin(Date.now() * 0.002 + i) * 0.3 + 0.5})`;
      ctx.beginPath();
      ctx.arc(sx, sy, Math.random() * 1.5 + 0.5, 0, Math.PI * 2);
      ctx.fill();
    }

    // Lanterns
    activeLanterns.forEach(l => {
      l.y += l.vy;
      l.sway += 0.02;
      l.x += Math.sin(l.sway) * 0.3;

      if (l.y < -50) l.y = height + 30;

      const glow = ctx.createRadialGradient(l.x, l.y, 2, l.x, l.y, l.size * 1.8);
      glow.addColorStop(0, l.color || '#ffb347');
      glow.addColorStop(1, 'transparent');

      ctx.fillStyle = glow;
      ctx.beginPath();
      ctx.arc(l.x, l.y, l.size * 1.8, 0, Math.PI * 2);
      ctx.fill();

      ctx.fillStyle = l.color || '#ffb347';
      ctx.beginPath();
      ctx.roundRect(l.x - 10, l.y - 14, 20, 26, 4);
      ctx.fill();

      ctx.fillStyle = '#ffffff';
      ctx.beginPath();
      ctx.arc(l.x, l.y + 2, 4, 0, Math.PI * 2);
      ctx.fill();
    });

    requestAnimationFrame(renderSky);
  }

  renderSky();

  const openModalBtn = document.getElementById('open-lantern-modal-btn');
  const lanternModal = document.getElementById('lantern-modal');
  const releaseConfirmBtn = document.getElementById('release-lantern-confirm-btn');
  const lanternMsgInput = document.getElementById('lantern-message');

  openModalBtn?.addEventListener('click', () => {
    getAudioContext();
    playBellSound(550, 'sine', 0.5, 0.08);
    lanternModal?.classList.remove('hidden');
  });

  releaseConfirmBtn?.addEventListener('click', () => {
    const msg = lanternMsgInput.value.trim();
    if (!msg) return;

    getAudioContext();
    // Ascending flight chime sound
    playHarmonicChime([440, 554.37, 659.25, 880]);

    const selectedColor = document.querySelector('input[name="lantern-color"]:checked')?.value || '#ffb347';

    const newLantern = {
      message: msg,
      color: selectedColor,
      date: new Date().toLocaleDateString(),
      x: width / 2 + (Math.random() - 0.5) * 100,
      y: height - 60,
      vy: -Math.random() * 0.4 - 0.2,
      sway: Math.random() * Math.PI * 2,
      size: 26
    };

    activeLanterns.push(newLantern);
    lanterns.push({ message: msg, color: selectedColor, date: newLantern.date });
    localStorage.setItem('haven_lanterns', JSON.stringify(lanterns));

    releasedCountEl.textContent = `${lanterns.length} lanterns floating softly`;
    lanternMsgInput.value = '';
    lanternModal?.classList.add('hidden');
  });
}

/* ==========================================================================
   6. BREATHING OASIS
   ========================================================================== */
function initBreathingOasis() {
  const startBtn = document.getElementById('start-breath-btn');
  const breathCircle = document.getElementById('breath-circle');
  const breathPhase = document.getElementById('breath-phase');
  const breathTimer = document.getElementById('breath-timer');
  const breathInstruction = document.getElementById('breath-instruction');
  const modeBtns = document.querySelectorAll('.mode-btn');

  let mode = 'relax';
  let isBreathing = false;
  let cycleTimeout = null;

  modeBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      getAudioContext();
      playBellSound(480, 'sine', 0.4, 0.06);
      modeBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      mode = btn.getAttribute('data-mode');
      if (isBreathing) stopBreathing();
    });
  });

  startBtn?.addEventListener('click', () => {
    getAudioContext();
    if (isBreathing) {
      stopBreathing();
    } else {
      startBreathing();
    }
  });

  function startBreathing() {
    isBreathing = true;
    startBtn.textContent = '⏹ Stop Breathing';
    runPhaseCycle();
  }

  function stopBreathing() {
    isBreathing = false;
    clearTimeout(cycleTimeout);
    playBellSound(330, 'sine', 0.6, 0.06);
    startBtn.textContent = '▶ Start Breathing';
    breathPhase.textContent = 'Ready';
    breathTimer.textContent = '--';
    breathInstruction.textContent = 'Click start whenever you are ready to begin softly breathing together.';
    breathCircle.parentElement.className = 'breathing-visualizer';
  }

  function runPhaseCycle() {
    if (!isBreathing) return;

    let phases = [];
    if (mode === 'relax') {
      phases = [
        { name: 'Inhale', duration: 4, class: 'breath-expand', guide: 'Breathe in softly through your nose...', pitch: 523.25 },
        { name: 'Hold', duration: 7, class: 'breath-hold', guide: 'Hold softly and let peace settle...', pitch: 659.25 },
        { name: 'Exhale', duration: 8, class: 'breath-shrink', guide: 'Release gently through your mouth...', pitch: 392.00 }
      ];
    } else if (mode === 'box') {
      phases = [
        { name: 'Inhale', duration: 4, class: 'breath-expand', guide: 'Inhale peace...', pitch: 523.25 },
        { name: 'Hold', duration: 4, class: 'breath-hold', guide: 'Hold gently...', pitch: 659.25 },
        { name: 'Exhale', duration: 4, class: 'breath-shrink', guide: 'Exhale tension...', pitch: 440.00 },
        { name: 'Pause', duration: 4, class: 'breath-shrink', guide: 'Rest softly...', pitch: 349.23 }
      ];
    } else {
      phases = [
        { name: 'Inhale', duration: 4, class: 'breath-expand', guide: 'Breathe in light...', pitch: 523.25 },
        { name: 'Exhale', duration: 6, class: 'breath-shrink', guide: 'Breathe out heaviness...', pitch: 392.00 }
      ];
    }

    let pIndex = 0;

    function executePhase() {
      if (!isBreathing) return;
      const current = phases[pIndex];

      // Soft singing bowl chime on phase change
      playBellSound(current.pitch, 'sine', 2.5, 0.12);

      breathPhase.textContent = current.name;
      breathInstruction.textContent = current.guide;
      breathCircle.parentElement.className = `breathing-visualizer ${current.class}`;

      let timeLeft = current.duration;
      breathTimer.textContent = timeLeft;

      const countdown = setInterval(() => {
        if (!isBreathing) {
          clearInterval(countdown);
          return;
        }
        timeLeft--;
        if (timeLeft > 0) {
          breathTimer.textContent = timeLeft;
        } else {
          clearInterval(countdown);
          pIndex = (pIndex + 1) % phases.length;
          executePhase();
        }
      }, 1000);
    }

    executePhase();
  }
}

/* ==========================================================================
   7. PROCEDURAL SOUNDSCAPES (WEB AUDIO API)
   ========================================================================== */
function initAudioEngine() {
  // Global click listener to resume AudioContext if suspended
  window.addEventListener('click', () => {
    if (audioCtx && audioCtx.state === 'suspended') {
      audioCtx.resume();
    }
  }, { once: false });
}

function initSoundscapes() {
  let isAudioEnabled = false;

  const masterToggleBtn = document.getElementById('master-toggle-btn');
  const masterSlider = document.getElementById('master-volume-slider');

  const activeNodes = {
    rain: null,
    campfire: null,
    ocean: null,
    breeze: null,
    chimes: null
  };

  masterToggleBtn?.addEventListener('click', () => {
    const ctx = getAudioContext();

    isAudioEnabled = !isAudioEnabled;
    masterToggleBtn.textContent = isAudioEnabled ? '⏸ Pause Sanctuary Audio' : '▶ Enable Sound Generator';
    masterToggleBtn.classList.toggle('secondary-btn', isAudioEnabled);

    if (isAudioEnabled) {
      playBellSound(600, 'sine', 0.8, 0.1);
    } else {
      stopAllSounds();
    }
  });

  masterSlider?.addEventListener('input', (e) => {
    if (masterGainNode) {
      masterGainNode.gain.value = parseFloat(e.target.value);
    }
  });

  // Sound Tiles Controls
  document.querySelectorAll('.sound-card').forEach(card => {
    const type = card.getAttribute('data-sound');
    const toggleBtn = card.querySelector('.sound-toggle-btn');
    const volSlider = card.querySelector('.sound-volume');

    toggleBtn.addEventListener('click', () => {
      getAudioContext();
      if (!isAudioEnabled) {
        masterToggleBtn.click();
      }

      if (card.classList.contains('playing')) {
        card.classList.remove('playing');
        toggleBtn.textContent = '▶';
        stopSound(type);
      } else {
        card.classList.add('playing');
        toggleBtn.textContent = '⏸';
        playSound(type, parseFloat(volSlider.value));
      }
    });

    volSlider.addEventListener('input', (e) => {
      if (activeNodes[type] && activeNodes[type].gain) {
        activeNodes[type].gain.gain.value = parseFloat(e.target.value);
      }
    });
  });

  function playSound(type, volume) {
    const ctx = getAudioContext();
    if (!ctx || !isAudioEnabled) return;

    const gainNode = ctx.createGain();
    gainNode.gain.value = volume;
    gainNode.connect(masterGainNode);

    if (type === 'rain') {
      // Soft Pink Rain Noise
      const bufferSize = ctx.sampleRate * 2;
      const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
      const data = buffer.getChannelData(0);
      let b0 = 0, b1 = 0, b2 = 0, b3 = 0, b4 = 0, b5 = 0, b6 = 0;
      for (let i = 0; i < bufferSize; i++) {
        const white = Math.random() * 2 - 1;
        b0 = 0.99886 * b0 + white * 0.0555179;
        b1 = 0.99332 * b1 + white * 0.0750759;
        b2 = 0.96900 * b2 + white * 0.1538520;
        b3 = 0.86650 * b3 + white * 0.3104856;
        b4 = 0.55000 * b4 + white * 0.5329522;
        b5 = -0.7616 * b5 - white * 0.0168980;
        data[i] = (b0 + b1 + b2 + b3 + b4 + b5 + b6 + white * 0.5362) * 0.04;
        b6 = white * 0.115926;
      }
      const source = ctx.createBufferSource();
      source.buffer = buffer;
      source.loop = true;

      const filter = ctx.createBiquadFilter();
      filter.type = 'lowpass';
      filter.frequency.value = 1100;

      source.connect(filter);
      filter.connect(gainNode);
      source.start();

      activeNodes.rain = { source, gain: gainNode };
    } else if (type === 'campfire') {
      // Cozy Low Crackle Fire
      const bufferSize = ctx.sampleRate * 2;
      const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
      const data = buffer.getChannelData(0);
      for (let i = 0; i < bufferSize; i++) {
        const isPop = Math.random() < 0.0015;
        data[i] = isPop ? (Math.random() * 2 - 1) * 0.4 : (Math.random() * 2 - 1) * 0.015;
      }
      const source = ctx.createBufferSource();
      source.buffer = buffer;
      source.loop = true;

      const filter = ctx.createBiquadFilter();
      filter.type = 'lowpass';
      filter.frequency.value = 700;

      source.connect(filter);
      filter.connect(gainNode);
      source.start();

      activeNodes.campfire = { source, gain: gainNode };
    } else if (type === 'ocean') {
      // Gentle Ocean Waves LFO
      const bufferSize = ctx.sampleRate * 2;
      const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
      const data = buffer.getChannelData(0);
      for (let i = 0; i < bufferSize; i++) {
        data[i] = (Math.random() * 2 - 1) * 0.07;
      }
      const source = ctx.createBufferSource();
      source.buffer = buffer;
      source.loop = true;

      const filter = ctx.createBiquadFilter();
      filter.type = 'lowpass';
      filter.frequency.value = 350;

      const lfo = ctx.createOscillator();
      lfo.frequency.value = 0.12; // 8s wave cycle
      const lfoGain = ctx.createGain();
      lfoGain.gain.value = 450;

      lfo.connect(lfoGain);
      lfoGain.connect(filter.frequency);
      lfo.start();

      source.connect(filter);
      filter.connect(gainNode);
      source.start();

      activeNodes.ocean = { source, lfo, gain: gainNode };
    } else if (type === 'breeze') {
      // Night Forest Breeze
      const bufferSize = ctx.sampleRate * 2;
      const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
      const data = buffer.getChannelData(0);
      for (let i = 0; i < bufferSize; i++) {
        data[i] = (Math.random() * 2 - 1) * 0.05;
      }
      const source = ctx.createBufferSource();
      source.buffer = buffer;
      source.loop = true;

      const filter = ctx.createBiquadFilter();
      filter.type = 'bandpass';
      filter.frequency.value = 400;
      filter.Q.value = 1.5;

      const lfo = ctx.createOscillator();
      lfo.frequency.value = 0.18;
      const lfoGain = ctx.createGain();
      lfoGain.gain.value = 250;

      lfo.connect(lfoGain);
      lfoGain.connect(filter.frequency);
      lfo.start();

      source.connect(filter);
      filter.connect(gainNode);
      source.start();

      activeNodes.breeze = { source, lfo, gain: gainNode };
    } else if (type === 'chimes') {
      // Celestial Chimes
      const chimeTimer = setInterval(() => {
        if (!activeNodes.chimes) return;
        const freqs = [523.25, 659.25, 783.99, 1046.50, 1318.51, 1567.98];
        const freq = freqs[Math.floor(Math.random() * freqs.length)];

        const osc = ctx.createOscillator();
        const oscGain = ctx.createGain();

        osc.type = 'sine';
        osc.frequency.value = freq;
        oscGain.gain.setValueAtTime(0.08, ctx.currentTime);
        oscGain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + 3.5);

        osc.connect(oscGain);
        oscGain.connect(gainNode);

        osc.start();
        osc.stop(ctx.currentTime + 3.6);
      }, 3000);

      activeNodes.chimes = { timer: chimeTimer, gain: gainNode };
    }
  }

  function stopSound(type) {
    if (activeNodes[type]) {
      if (activeNodes[type].source) activeNodes[type].source.stop();
      if (activeNodes[type].lfo) activeNodes[type].lfo.stop();
      if (activeNodes[type].timer) clearInterval(activeNodes[type].timer);
      activeNodes[type] = null;
    }
  }

  function stopAllSounds() {
    Object.keys(activeNodes).forEach(type => stopSound(type));
    document.querySelectorAll('.sound-card').forEach(c => {
      c.classList.remove('playing');
      c.querySelector('.sound-toggle-btn').textContent = '▶';
    });
  }
}

/* ==========================================================================
   8. MEMORY JAR & COMFORT NOTES
   ========================================================================== */
const DEFAULT_NOTES = [
  "You carry immense strength within you, even on days when you feel soft or quiet.",
  "It's completely okay to miss your dad and feel the weight of empty space. Your love is real.",
  "You do not have to be strong all the time. Rest is allowed and necessary.",
  "The people who love you hold you close in their thoughts every single day.",
  "Your happiness matters, your peace matters, and you are cherished."
];

function initMemoryJar() {
  const container = document.getElementById('notes-inside-container');
  const drawBtn = document.getElementById('draw-note-btn');
  const addBtn = document.getElementById('add-note-btn');

  const noteModal = document.getElementById('note-display-modal');
  const noteTextEl = document.getElementById('note-modal-text');

  const addNoteModal = document.getElementById('add-note-modal');
  const customInput = document.getElementById('custom-note-input');
  const saveCustomBtn = document.getElementById('save-custom-note-btn');

  let notes = JSON.parse(localStorage.getItem('haven_notes') || '[]');
  if (notes.length === 0) {
    notes = [...DEFAULT_NOTES];
    localStorage.setItem('haven_notes', JSON.stringify(notes));
  }

  function renderJarContents() {
    container.innerHTML = '';
    const displayCount = Math.min(notes.length, 14);
    for (let i = 0; i < displayCount; i++) {
      const particle = document.createElement('div');
      particle.className = 'jar-note-particle';
      particle.style.setProperty('--rot', (Math.random() - 0.5) * 30);
      container.appendChild(particle);
    }
  }

  renderJarContents();

  // Draw note
  drawBtn?.addEventListener('click', () => {
    getAudioContext();
    playHarmonicChime([659.25, 783.99, 1046.50]);
    const note = notes[Math.floor(Math.random() * notes.length)];
    noteTextEl.textContent = `"${note}"`;
    noteModal?.classList.remove('hidden');
  });

  // Add custom note
  addBtn?.addEventListener('click', () => {
    getAudioContext();
    playBellSound(520, 'sine', 0.5, 0.08);
    addNoteModal?.classList.remove('hidden');
  });

  saveCustomBtn?.addEventListener('click', () => {
    const val = customInput.value.trim();
    if (!val) return;

    getAudioContext();
    playHarmonicChime([523.25, 659.25, 783.99]);
    notes.push(val);
    localStorage.setItem('haven_notes', JSON.stringify(notes));
    renderJarContents();
    customInput.value = '';
    addNoteModal?.classList.add('hidden');
  });
}

/* ==========================================================================
   9. HEART CHECK-IN & SAFE JOURNAL
   ========================================================================== */
const VALIDATIONS = {
  'missing': "It is completely natural to miss family or feel that empty space. Your longing comes from a place of deep love. Allow yourself to feel it without judgment.",
  'seeking-warmth': "You deserve to be held in tenderness today. Wrap yourself in cozy comfort, sip warm tea, and let loved ones support you.",
  'overwhelmed': "Take a step back. You don't have to solve everything right now. Take three deep breaths; you are safe here.",
  'quiet': "Quiet reflection is a gift to your heart. Embrace the silence and honor your inner space.",
  'peaceful': "Hold onto this soft peace. Let it gently fill your heart and warm your day."
};

function initSafeJournal() {
  const emotionBtns = document.querySelectorAll('.emotion-btn');
  const validationBox = document.getElementById('heart-validation-box');
  const validationText = document.getElementById('validation-text');

  const titleInput = document.getElementById('journal-title');
  const bodyInput = document.getElementById('journal-body');
  const saveBtn = document.getElementById('save-journal-btn');
  const listContainer = document.getElementById('journal-entries-list');

  emotionBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      getAudioContext();
      playBellSound(580, 'sine', 0.6, 0.08);

      emotionBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const emotion = btn.getAttribute('data-emotion');
      validationText.textContent = VALIDATIONS[emotion] || 'Your heart is safe here.';
      validationBox.classList.remove('hidden');
    });
  });

  let entries = JSON.parse(localStorage.getItem('haven_journal') || '[]');

  function renderEntries() {
    if (entries.length === 0) {
      listContainer.innerHTML = '<p class="empty-state">No entries yet. Write whenever you feel ready.</p>';
      return;
    }

    listContainer.innerHTML = entries.map(e => `
      <div class="entry-card">
        <div class="entry-card-header">
          <span>${e.date}</span>
        </div>
        <div class="entry-card-title">${escapeHtml(e.title)}</div>
        <div class="entry-card-body">${escapeHtml(e.body)}</div>
      </div>
    `).join('');
  }

  renderEntries();

  saveBtn?.addEventListener('click', () => {
    const title = titleInput.value.trim() || 'Untitled Reflection';
    const body = bodyInput.value.trim();

    if (!body) return;

    getAudioContext();
    playHarmonicChime([440, 554.37, 659.25]);

    const newEntry = {
      title,
      body,
      date: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
    };

    entries.unshift(newEntry);
    localStorage.setItem('haven_journal', JSON.stringify(entries));

    titleInput.value = '';
    bodyInput.value = '';
    renderEntries();
  });
}

function escapeHtml(str) {
  return str.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
}

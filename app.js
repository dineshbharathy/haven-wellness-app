/* ==========================================================================
   HAVEN WELLNESS SANCTUARY — THREE.JS 3D REACTIVE ORB ENGINE & APP (JS)
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
  initDesktopResolutionDetector();
  initAudioEngine();
  initThemeManager();
  initDesktopTabNavigation();
  initAmbientCanvas();
  initSanctuaryHub();
  initAutonomousAITherapistAura();
  initAuthSurveyFlow();
  initSanctuaryCircleCommunity();
  initAppleCallEngine();
  initThreeJSOrbStudio();
  initSkyLanterns();
  initBreathingOasis();
  initSoundscapes();
  initMemoryJar();
  initSafeJournal();
});

/* ==========================================================================
   RESOLUTION DETECTOR
   ========================================================================== */
function initDesktopResolutionDetector() {
  const resIndicator = document.getElementById('resolution-indicator');

  function updateResolution() {
    const width = window.innerWidth;
    const height = window.innerHeight;
    let modeText = 'Full Desktop Glass Layout';

    if (width < 768) modeText = 'Compact Resolution';
    else if (width < 1100) modeText = 'Medium Resolution';

    if (resIndicator) {
      resIndicator.textContent = `${width}x${height} • ${modeText}`;
    }
  }

  updateResolution();
  window.addEventListener('resize', updateResolution);
}

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

function initAudioEngine() {
  const unlockAudio = () => {
    getAudioContext();
  };
  window.addEventListener('click', unlockAudio, { once: false });
  window.addEventListener('touchstart', unlockAudio, { once: false });
}

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
    console.log('Audio playback prevented', e);
  }
}

function playHarmonicChime(freqs = [523.25, 659.25, 783.99, 1046.50]) {
  freqs.forEach((f, index) => {
    setTimeout(() => {
      playBellSound(f, 'sine', 2.0, 0.12);
    }, index * 120);
  });
}

function playHeartbeatChord() {
  const ctx = getAudioContext();
  const t = ctx.currentTime;

  const osc1 = ctx.createOscillator();
  const gain1 = ctx.createGain();
  osc1.type = 'sine';
  osc1.frequency.setValueAtTime(80, t);
  osc1.frequency.exponentialRampToValueAtTime(45, t + 0.4);
  gain1.gain.setValueAtTime(0.4, t);
  gain1.gain.exponentialRampToValueAtTime(0.001, t + 0.4);
  osc1.connect(gain1);
  gain1.connect(masterGainNode);
  osc1.start(t);
  osc1.stop(t + 0.4);

  setTimeout(() => {
    const t2 = ctx.currentTime;
    const osc2 = ctx.createOscillator();
    const gain2 = ctx.createGain();
    osc2.type = 'sine';
    osc2.frequency.setValueAtTime(95, t2);
    osc2.frequency.exponentialRampToValueAtTime(50, t2 + 0.45);
    gain2.gain.setValueAtTime(0.35, t2);
    gain2.gain.exponentialRampToValueAtTime(0.001, t2 + 0.45);
    osc2.connect(gain2);
    gain2.connect(masterGainNode);
    osc2.start(t2);
    osc2.stop(t2 + 0.45);
  }, 220);
}

/* Procedural Apple Marimba Ringtone Synthesizer */
let appleRingtoneTimer = null;

function playAppleRingtone() {
  stopAppleRingtone();
  const ctx = getAudioContext();

  function triggerMarimbaStrum() {
    const notes = [
      { f: 1046.50, delay: 0 },
      { f: 1318.51, delay: 120 },
      { f: 1567.98, delay: 240 },
      { f: 2093.00, delay: 360 },
      { f: 1567.98, delay: 600 },
      { f: 1318.51, delay: 720 },
      { f: 1046.50, delay: 840 }
    ];

    notes.forEach(n => {
      setTimeout(() => {
        if (!appleRingtoneTimer) return;
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = 'triangle';
        osc.frequency.setValueAtTime(n.f, ctx.currentTime);
        gain.gain.setValueAtTime(0.25, ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + 0.35);

        osc.connect(gain);
        gain.connect(masterGainNode);
        osc.start();
        osc.stop(ctx.currentTime + 0.36);
      }, n.delay);
    });
  }

  triggerMarimbaStrum();
  appleRingtoneTimer = setInterval(triggerMarimbaStrum, 2400);
}

function stopAppleRingtone() {
  if (appleRingtoneTimer) {
    clearInterval(appleRingtoneTimer);
    appleRingtoneTimer = null;
  }
}

/* Real-Time Network Broadcast Channel */
const sanctuaryBroadcast = window.BroadcastChannel ? new BroadcastChannel('haven_sanctuary_network') : null;

/* ==========================================================================
   1. THEME MANAGER
   ========================================================================== */
function initThemeManager() {
  const themeToggleBtn = document.getElementById('theme-toggle-btn');
  const themeModal = document.getElementById('theme-modal');
  const themeOptionBtns = document.querySelectorAll('.theme-option-btn');

  const savedTheme = localStorage.getItem('haven_theme') || 'premium-white';
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
   2. DESKTOP TAB NAVIGATION & COZY WARM SHIFT TRANSITIONS
   ========================================================================== */
function initDesktopTabNavigation() {
  const tabBtns = document.querySelectorAll('.nav-tab-btn');
  const tabPanes = document.querySelectorAll('.tab-pane');
  const pageTitleEl = document.getElementById('page-title');

  tabBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      getAudioContext();
      playHarmonicChime([440, 554.37, 659.25]);

      document.body.classList.add('warm-tab-shift');
      setTimeout(() => document.body.classList.remove('warm-tab-shift'), 650);

      const tabId = btn.getAttribute('data-tab');
      const title = btn.getAttribute('data-title') || 'Sanctuary';

      tabBtns.forEach(b => b.classList.remove('active'));
      tabPanes.forEach(p => p.classList.remove('active'));

      btn.classList.add('active');
      document.getElementById(`tab-${tabId}`)?.classList.add('active');

      if (pageTitleEl) pageTitleEl.textContent = title;

      if (tabId === 'memory-orbs') {
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
  const count = 50;

  for (let i = 0; i < count; i++) {
    particles.push({
      x: Math.random() * width,
      y: Math.random() * height,
      radius: Math.random() * 2.5 + 0.5,
      alpha: Math.random() * 0.7 + 0.3,
      vx: (Math.random() - 0.5) * 0.3,
      vy: -Math.random() * 0.4 - 0.1,
      pulse: Math.random() * 0.02 + 0.005,
      color: ['#ffcf56', '#ff8052', '#d946ef', '#ffffff'][Math.floor(Math.random() * 4)]
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
      ctx.fillStyle = p.color;
      ctx.globalAlpha = Math.max(0.1, Math.min(0.8, p.alpha));
      ctx.shadowBlur = 10;
      ctx.shadowColor = p.color;
      ctx.fill();
    });

    ctx.globalAlpha = 0.035;
    for (let n = 0; n < 200; n++) {
      const rx = Math.random() * width;
      const ry = Math.random() * height;
      ctx.fillStyle = Math.random() > 0.5 ? '#ffffff' : '#000000';
      ctx.fillRect(rx, ry, 1.5, 1.5);
    }
    ctx.globalAlpha = 1.0;

    requestAnimationFrame(render);
  }

  render();
}

/* ==========================================================================
   4. FIRST-TIME 3-QUESTION AUTH & SURVEY ONBOARDING FLOW
   ========================================================================== */
let currentUserProfile = null;

function initAuthSurveyFlow() {
  const authModal = document.getElementById('auth-survey-modal');
  const openAuthBtn = document.getElementById('open-auth-modal-btn');
  const userHeaderTag = document.getElementById('header-user-badge');

  const modalTitle = document.getElementById('auth-modal-title');
  const modalSubtitle = document.getElementById('auth-modal-subtitle');
  const toggleModeBtn = document.getElementById('auth-toggle-mode-btn');
  const toggleText = document.getElementById('auth-toggle-text');

  const usernameInput = document.getElementById('survey-username');
  const passwordInput = document.getElementById('survey-password');
  const struggleSelect = document.getElementById('survey-struggle-select');
  const submitBtn = document.getElementById('auth-submit-btn');

  let isSignUpMode = true;

  const savedProfile = localStorage.getItem('haven_user_profile');
  if (savedProfile) {
    currentUserProfile = JSON.parse(savedProfile);
    updateUserDisplay();
  } else {
    setTimeout(() => authModal?.classList.remove('hidden'), 500);
  }

  openAuthBtn?.addEventListener('click', () => {
    getAudioContext();
    playBellSound(600, 'sine', 0.5, 0.08);
    authModal?.classList.remove('hidden');
  });

  toggleModeBtn?.addEventListener('click', () => {
    getAudioContext();
    isSignUpMode = !isSignUpMode;
    if (isSignUpMode) {
      modalTitle.textContent = 'Welcome to Haven Sanctuary';
      modalSubtitle.textContent = 'Complete your 3-question survey to enter the sanctuary.';
      struggleSelect.parentElement.style.display = 'flex';
      submitBtn.textContent = '✨ Complete Survey & Enter Haven';
      toggleText.textContent = 'Already have a Haven account?';
      toggleModeBtn.textContent = 'Log In';
    } else {
      modalTitle.textContent = 'Log In to Haven';
      modalSubtitle.textContent = 'Enter your username and password to return to your sanctuary.';
      struggleSelect.parentElement.style.display = 'none';
      submitBtn.textContent = '🔒 Log In';
      toggleText.textContent = 'Need to create an account?';
      toggleModeBtn.textContent = 'Sign Up Survey';
    }
  });

  submitBtn?.addEventListener('click', () => {
    const username = usernameInput.value.trim();
    const password = passwordInput.value.trim();
    const struggle = struggleSelect.value;

    if (!username || !password) return;

    getAudioContext();
    playHarmonicChime([523.25, 659.25, 783.99, 1046.50]);

    currentUserProfile = {
      username,
      struggle: isSignUpMode ? struggle : (currentUserProfile?.struggle || 'Online & Safe'),
      avatar: '🤍'
    };

    localStorage.setItem('haven_user_profile', JSON.stringify(currentUserProfile));
    updateUserDisplay();

    authModal?.classList.add('hidden');
  });

  function updateUserDisplay() {
    if (!currentUserProfile) return;
    if (userHeaderTag) userHeaderTag.textContent = `👤 ${currentUserProfile.username}`;
    
    const myNameEl = document.getElementById('circle-my-username');
    const myStruggleEl = document.getElementById('circle-my-struggle');
    if (myNameEl) myNameEl.textContent = currentUserProfile.username;
    if (myStruggleEl) myStruggleEl.textContent = currentUserProfile.struggle;
  }
}

/* ==========================================================================
   5. SANCTUARY HUB & VIRTUAL HUG HAPPINESS RITUAL
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

const HUG_APPRECIATION_NOTES = [
  "You are so deeply appreciated, cherished, and worthy of all the soft warmth in the world.",
  "Someone out there is holding quiet space for you today. You matter more than you know.",
  "Wrap your arms around yourself for a second—feel that gentle heartbeat. You are safe.",
  "Your presence brings warmth to this sanctuary. Never doubt how bright your light shines.",
  "It is brave to carry a gentle heart in a noisy world. Thank you for being here."
];

function initSanctuaryHub() {
  const timeGreetingEl = document.getElementById('time-greeting');
  const hour = new Date().getHours();
  if (hour < 12) timeGreetingEl.textContent = 'Morning Regulation Active';
  else if (hour < 18) timeGreetingEl.textContent = 'Afternoon Calm Active';
  else timeGreetingEl.textContent = 'Evening Rest Regulation';

  const quoteEl = document.getElementById('daily-quote');
  const newQuoteBtn = document.getElementById('new-quote-btn');
  newQuoteBtn?.addEventListener('click', () => {
    getAudioContext();
    playBellSound(680, 'sine', 0.8, 0.08);
    const randomQuote = COMFORT_QUOTES[Math.floor(Math.random() * COMFORT_QUOTES.length)];
    quoteEl.textContent = `"${randomQuote}"`;
  });

  const hugBtn = document.getElementById('hug-btn');
  const hugCountEl = document.getElementById('hug-count');
  const hugModal = document.getElementById('hug-embrace-modal');
  const hugModalCount = document.getElementById('hug-modal-count');
  const hugNoteEl = document.getElementById('hug-affirmation-note');
  const closeHugModalBtn = document.getElementById('close-hug-modal-btn');

  let hugCount = parseInt(localStorage.getItem('haven_hug_count') || '0');
  hugCountEl.textContent = hugCount;

  hugBtn?.addEventListener('click', (e) => {
    getAudioContext();
    hugCount++;
    localStorage.setItem('haven_hug_count', hugCount);
    hugCountEl.textContent = hugCount;
    if (hugModalCount) hugModalCount.textContent = hugCount;

    playHeartbeatChord();
    playHarmonicChime([349.23, 440.00, 523.25, 659.25]);

    const randomNote = HUG_APPRECIATION_NOTES[Math.floor(Math.random() * HUG_APPRECIATION_NOTES.length)];
    if (hugNoteEl) hugNoteEl.textContent = `"${randomNote}"`;

    hugModal?.classList.remove('hidden');
    createHeartBurst(e.clientX || window.innerWidth / 2, e.clientY || window.innerHeight / 2);
  });

  closeHugModalBtn?.addEventListener('click', () => {
    getAudioContext();
    playBellSound(440, 'sine', 0.4, 0.06);
    hugModal?.classList.add('hidden');
  });

  const openAIListenerBtn = document.getElementById('open-ai-listener-btn');
  openAIListenerBtn?.addEventListener('click', () => {
    document.querySelector('.nav-tab-btn[data-tab="ai-listener"]')?.click();
  });

  const openCommunityTabBtn = document.getElementById('open-community-tab-btn');
  openCommunityTabBtn?.addEventListener('click', () => {
    document.querySelector('.nav-tab-btn[data-tab="community"]')?.click();
  });

  const openStorybookBtn = document.getElementById('open-storybook-tab-btn');
  openStorybookBtn?.addEventListener('click', () => {
    document.querySelector('.nav-tab-btn[data-tab="memory-orbs"]')?.click();
  });

  const brewTeaBtn = document.getElementById('brew-tea-btn');
  let teaInterval = null;

  brewTeaBtn?.addEventListener('click', () => {
    getAudioContext();
    if (brewTeaBtn.disabled) return;
    brewTeaBtn.disabled = true;
    let secondsLeft = 30;

    playBellSound(440, 'sine', 1.0, 0.1);
    brewTeaBtn.textContent = `🍵 Steeping... (${secondsLeft}s)`;
    document.getElementById('tea-steam').style.opacity = '1';

    teaInterval = setInterval(() => {
      secondsLeft--;
      if (secondsLeft % 5 === 0 && secondsLeft > 0) {
        playBellSound(587.33, 'sine', 0.5, 0.04);
      }
      if (secondsLeft > 0) {
        brewTeaBtn.textContent = `🍵 Steeping... (${secondsLeft}s)`;
      } else {
        clearInterval(teaInterval);
        brewTeaBtn.disabled = false;
        playHarmonicChime([523.25, 659.25, 783.99]);
        brewTeaBtn.textContent = '✨ Cup Ready! Take a Sip';
        setTimeout(() => {
          brewTeaBtn.textContent = '✨ Brew Tea (30s)';
        }, 5000);
      }
    }, 1000);
  });

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
  for (let i = 0; i < 20; i++) {
    const heart = document.createElement('div');
    heart.textContent = ['❤️', '💖', '✨', '🌸', '🤍', '🕯️'][Math.floor(Math.random() * 6)];
    heart.style.position = 'fixed';
    heart.style.left = `${x}px`;
    heart.style.top = `${y}px`;
    heart.style.pointerEvents = 'none';
    heart.style.fontSize = `${Math.random() * 20 + 16}px`;
    heart.style.zIndex = '9999';
    heart.style.transition = 'all 1.2s cubic-bezier(0.1, 0.8, 0.3, 1)';

    document.body.appendChild(heart);

    const angle = Math.random() * Math.PI * 2;
    const dist = Math.random() * 140 + 50;
    const tx = Math.cos(angle) * dist;
    const ty = Math.sin(angle) * dist - 80;

    requestAnimationFrame(() => {
      heart.style.transform = `translate(${tx}px, ${ty}px) scale(1.5) rotate(${(Math.random() - 0.5) * 40}deg)`;
      heart.style.opacity = '0';
    });

    setTimeout(() => heart.remove(), 1200);
  }
}

/* ==========================================================================
   6. DR. AURA — AUTONOMOUS AI THERAPIST
   ========================================================================== */
function initAutonomousAITherapistAura() {
  const startListenBtn = document.getElementById('start-voice-listen-btn');
  const orbContainer = document.getElementById('ai-voice-orb');
  const orbStatusIcon = document.getElementById('ai-orb-status-icon');
  const statusText = document.getElementById('ai-status-text');
  const synthToggleBtn = document.getElementById('toggle-speech-synth-btn');

  const textInput = document.getElementById('ai-text-input');
  const sendTextBtn = document.getElementById('send-ai-text-btn');
  const messagesBox = document.getElementById('ai-chat-messages');

  let isListening = false;
  let isSynthEnabled = true;
  let recognition = null;
  let conversationHistory = [];

  synthToggleBtn?.addEventListener('click', () => {
    isSynthEnabled = !isSynthEnabled;
    synthToggleBtn.classList.toggle('active', isSynthEnabled);
    if (!isSynthEnabled && window.speechSynthesis) {
      window.speechSynthesis.cancel();
    }
  });

  const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
  if (SpeechRecognition) {
    recognition = new SpeechRecognition();
    recognition.continuous = false;
    recognition.interimResults = false;
    recognition.lang = 'en-US';

    recognition.onstart = () => {
      isListening = true;
      orbContainer.classList.add('ai-listening');
      orbStatusIcon.textContent = '🔊';
      statusText.textContent = 'Dr. Aura is listening to your voice...';
      startListenBtn.textContent = '⏹ Listening... Speak Now';
    };

    recognition.onresult = (event) => {
      const transcript = event.results[0][0].transcript;
      if (transcript) {
        handleUserChatMessage(transcript);
      }
    };

    recognition.onerror = () => { stopVoiceListen(); };
    recognition.onend = () => { stopVoiceListen(); };
  } else {
    if (startListenBtn) startListenBtn.textContent = '💬 Type to Speak with Dr. Aura';
  }

  startListenBtn?.addEventListener('click', () => {
    getAudioContext();
    if (isListening) {
      stopVoiceListen();
    } else {
      if (recognition) {
        try { recognition.start(); } catch (e) { stopVoiceListen(); }
      } else {
        textInput.focus();
      }
    }
  });

  function stopVoiceListen() {
    isListening = false;
    orbContainer.classList.remove('ai-listening');
    orbStatusIcon.textContent = '🎙️';
    statusText.textContent = 'Dr. Aura is listening softly...';
    startListenBtn.textContent = '🎙️ Tap to Speak with Dr. Aura';
    if (recognition) {
      try { recognition.stop(); } catch (e) {}
    }
  }

  sendTextBtn?.addEventListener('click', () => {
    const val = textInput.value.trim();
    if (!val) return;
    handleUserChatMessage(val);
    textInput.value = '';
  });

  textInput?.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') sendTextBtn.click();
  });

  async function handleUserChatMessage(userText) {
    getAudioContext();
    playBellSound(520, 'sine', 0.4, 0.08);

    appendBubble('You', userText, 'user-bubble');

    statusText.textContent = 'Dr. Aura is reflecting softly...';
    orbContainer.classList.add('ai-listening');

    await new Promise(resolve => setTimeout(resolve, 800));

    const response = generateAutonomousTherapistResponse(userText, conversationHistory);
    conversationHistory.push({ user: userText, ai: response });

    orbContainer.classList.remove('ai-listening');
    appendBubble('Dr. Aura (AI Therapist Agent)', response, 'aura-bubble');
    statusText.textContent = 'Dr. Aura is here for you.';

    if (isSynthEnabled) {
      speakTherapistResponse(response);
    }
  }

  function appendBubble(author, text, bubbleClass) {
    const bubble = document.createElement('div');
    bubble.className = `chat-bubble ${bubbleClass}`;
    bubble.innerHTML = `
      <span class="chat-author">${escapeHtml(author)}:</span>
      <p>"${escapeHtml(text)}"</p>
    `;
    messagesBox.appendChild(bubble);
    messagesBox.scrollTop = messagesBox.scrollHeight;
  }
}

function generateAutonomousTherapistResponse(input, history) {
  const text = input.toLowerCase();

  const reflections = [];

  if (text.includes('dad') || text.includes('father') || text.includes('daddy') || text.includes('paternal')) {
    reflections.push(
      "I hear how deeply you long for your dad and how heavy parental detachment can feel. What you are feeling is completely valid—your desire for unconditional parental warmth comes from a place of deep love. Take a soft breath; you are safe to feel that ache here without judgment.",
      "Longing for your dad and wishing for that bond is one of the most tender, human feelings anyone can experience. Even when parents feel distant, your heart's capacity to love remains whole and beautiful. I am right here with you.",
      "It is painful when the connection with a parent isn't what your heart deserved. Please remind yourself today: your longing is proof of your emotional depth, not your weakness."
    );
  }
  else if (text.includes('alone') || text.includes('lonely') || text.includes('detached') || text.includes('isolated') || text.includes('empty')) {
    reflections.push(
      "Feeling detached or isolated can make your inner world feel so quiet and distant. Please know that feeling this way doesn't mean you are broken or unwanted. I am right here with you, holding a warm, gentle space for your heart.",
      "When detachment sets in, it's often your mind's way of protecting a very tender heart. You don't have to force yourself to feel everything at once. Let's take it slowly together.",
      "Even in moments of deep solitude, your presence matters profoundly. You are building a safe sanctuary within yourself, and I am standing by your side."
    );
  }
  else {
    reflections.push(
      "Thank you for sharing your heart so openly with me. I am listening closely to everything you carry inside. Your feelings matter so much, and you are surrounded by care and safety here.",
      "I hear you. Whatever you are reflecting on today, know that your experience is honored and understood here. How does it feel to put that into words?",
      "Thank you for trusting me with your thoughts. I am holding space for you to express whatever comes up next without any pressure."
    );
  }

  return reflections[Math.floor(Math.random() * reflections.length)];
}

function speakTherapistResponse(text) {
  if (!window.speechSynthesis) {
    playHarmonicChime([523.25, 659.25, 783.99]);
    return;
  }
  window.speechSynthesis.cancel();

  const utterance = new SpeechSynthesisUtterance(text);
  utterance.rate = 0.88;
  utterance.pitch = 1.05;

  const voices = window.speechSynthesis.getVoices();
  const preferredVoice = voices.find(v => 
    v.name.includes('Google US English') ||
    v.name.includes('en-US-Neural2') ||
    v.name.includes('Samantha') ||
    v.name.includes('Victoria') ||
    v.name.includes('Karen') ||
    v.name.includes('Zira')
  ) || voices.find(v => v.lang.startsWith('en'));

  if (preferredVoice) utterance.voice = preferredVoice;

  window.speechSynthesis.speak(utterance);
}

/* ==========================================================================
   7. SANCTUARY CIRCLE COMMUNITY
   ========================================================================== */
const SANCTUARY_CHANNELS = {
  general: {
    title: '# general-sanctuary',
    desc: 'A gentle space for friendly hellos, quiet thoughts, and comfort.',
    messages: [
      { id: 1, author: 'Sophia 🌸', avatar: '🌸', tag: 'Gold Member', time: '10:14 AM', text: 'Good morning everyone! Sending a quiet hug to anyone who needs one today. 🍵', reactions: { hug: 5, support: 3 } },
      { id: 2, author: 'Aria 🌙', avatar: '🌙', tag: 'Peer Support', time: '10:18 AM', text: 'Thank you Sophia. Sipping chamomile tea right now and listening to the window rain soundscape.', reactions: { hug: 4, warmth: 6 } },
      { id: 3, author: 'Leo 🏮', avatar: '🏮', tag: 'Sanctuary Friend', time: '10:22 AM', text: 'Released a lantern earlier for my dad. It feels nice knowing we carry these feelings together.', reactions: { hug: 8, support: 7, warmth: 9 } }
    ]
  },
  'family-longing': {
    title: '# family-and-longing',
    desc: 'Safe channel to talk about missing parents, dad longing, and attachment healing.',
    messages: [
      { id: 10, author: 'Maya 🌿', avatar: '🌿', tag: 'Attachment Peer', time: 'Yesterday', text: 'Sometimes family holidays make me feel so detached. Does anyone else get that empty ache in their chest?', reactions: { support: 12, hug: 15 } },
      { id: 11, author: 'Elena 🔮', avatar: '🔮', tag: 'Sanctuary Friend', time: 'Yesterday', text: 'Yes Maya, 100%. Creating the Inside Out Orbs helped me realize that sadness and longing can exist alongside hope. You are not alone.', reactions: { warmth: 10, hug: 11 } }
    ]
  },
  'daily-wins': {
    title: '# daily-wins-and-warmth',
    desc: 'Celebrate small victories, gentle moments, and self-kindness.',
    messages: [
      { id: 20, author: 'Noah ☀️', avatar: '☀️', tag: 'Daily Regular', time: '8:30 AM', text: 'My win today: I didn\'t judge myself for feeling quiet. I just took 5 deep breaths in the Breathing Oasis.', reactions: { warmth: 9, support: 6 } }
    ]
  },
  'voice-lounge': {
    title: '🔊 tea-and-rest-lounge',
    desc: 'Voice & text lounge. Connect your mic to talk softly with online sanctuary peers.',
    messages: [
      { id: 30, author: 'System 🌸', avatar: '🎧', tag: 'Voice Bot', time: 'Live', text: 'Voice lounge active. 4 peers currently listening and brewing tea.', reactions: { warmth: 5 } }
    ]
  }
};

const ONLINE_FRIENDS = [
  { name: 'Sophia 🌸', handle: 'sophia_sanctuary', avatar: '🌸', status: 'Online • In Sanctuary', color: '#ff8052' },
  { name: 'Aria 🌙', handle: 'aria_moon', avatar: '🌙', status: 'Online • Listening to Rain', color: '#d946ef' },
  { name: 'Leo 🏮', handle: 'leo_sky', avatar: '🏮', status: 'Online • Releasing Lantern', color: '#ffcf56' },
  { name: 'Elena 🔮', handle: 'elena_orbs', avatar: '🔮', status: 'Online • Creating Orb', color: '#34d399' },
  { name: 'Maya 🌿', handle: 'maya_haven', avatar: '🌿', status: 'Online • In Voice Lounge', color: '#60a5fa' }
];

function initSanctuaryCircleCommunity() {
  const channelBtns = document.querySelectorAll('.channel-btn[data-channel]');
  const titleEl = document.getElementById('current-channel-title');
  const descEl = document.getElementById('current-channel-desc');
  const messagesBox = document.getElementById('discord-messages-box');
  const friendsListContainer = document.getElementById('online-friends-list');

  const chatInput = document.getElementById('discord-chat-input');
  const sendBtn = document.getElementById('send-discord-msg-btn');

  const addFriendBtn = document.getElementById('open-add-friend-modal-btn');
  const addFriendModal = document.getElementById('add-friend-modal');
  const confirmAddFriendBtn = document.getElementById('confirm-add-friend-btn');
  const friendHandleInput = document.getElementById('friend-input-handle');

  const voiceBanner = document.getElementById('voice-lounge-banner');
  const voiceToggleBtn = document.getElementById('toggle-voice-connect-btn');

  let currentChannelKey = 'general';
  let isVoiceConnected = false;
  let friends = [...ONLINE_FRIENDS];

  if (sanctuaryBroadcast) {
    sanctuaryBroadcast.onmessage = (event) => {
      const data = event.data;
      if (data.type === 'NEW_CHAT_MESSAGE') {
        SANCTUARY_CHANNELS[data.channel].messages.push(data.message);
        if (currentChannelKey === data.channel) {
          renderChannelMessages(currentChannelKey);
        }
        playHarmonicChime([659.25, 783.99]);
      } else if (data.type === 'INCOMING_APPLE_CALL') {
        window.triggerAppleIncomingCall(data.callerName, data.callerAvatar);
      }
    };
  }

  function renderFriendsSidebar() {
    friendsListContainer.innerHTML = friends.map(f => `
      <div class="friend-item">
        <div class="friend-main-info">
          <div class="friend-avatar" style="background: ${f.color}; color:#ffffff;">
            ${f.avatar}
            <div class="friend-status-dot"></div>
          </div>
          <div class="friend-info">
            <span class="friend-name">${escapeHtml(f.name)}</span>
            <span class="friend-activity">${escapeHtml(f.status)}</span>
          </div>
        </div>
        <button class="call-friend-btn" title="Call ${escapeHtml(f.name)}" onclick="startAppleCallWithFriend('${escapeHtml(f.name)}', '${f.avatar}')">
          📞
        </button>
      </div>
    `).join('');
  }

  renderFriendsSidebar();

  function renderChannelMessages(channelKey) {
    const channelData = SANCTUARY_CHANNELS[channelKey] || SANCTUARY_CHANNELS.general;
    titleEl.textContent = channelData.title;
    descEl.textContent = channelData.desc;

    if (channelKey === 'voice-lounge') {
      voiceBanner.classList.remove('hidden');
    } else if (!isVoiceConnected) {
      voiceBanner.classList.add('hidden');
    }

    messagesBox.innerHTML = channelData.messages.map(m => `
      <div class="peer-msg-item">
        <div class="peer-avatar" style="background: linear-gradient(135deg, #ffcf56, #d946ef); color:#ffffff;">
          ${m.avatar}
        </div>
        <div class="peer-msg-content">
          <div class="peer-msg-header">
            <span class="peer-name">${escapeHtml(m.author)}</span>
            <span class="peer-tag" style="background: #d946ef;">${escapeHtml(m.tag)}</span>
            <span class="peer-time">${m.time}</span>
          </div>
          <div class="peer-bubble">
            ${escapeHtml(m.text)}
          </div>
          <div class="peer-reactions-row">
            <button class="reaction-btn" onclick="handlePeerReaction(this, 'hug')">❤️ Hug (${m.reactions.hug || 0})</button>
            <button class="reaction-btn" onclick="handlePeerReaction(this, 'support')">🌸 Support (${m.reactions.support || 0})</button>
            <button class="reaction-btn" onclick="handlePeerReaction(this, 'warmth')">🕯️ Warmth (${m.reactions.warmth || 0})</button>
          </div>
        </div>
      </div>
    `).join('');

    messagesBox.scrollTop = messagesBox.scrollHeight;
  }

  renderChannelMessages('general');

  channelBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      getAudioContext();
      playBellSound(540, 'sine', 0.4, 0.06);

      const chKey = btn.getAttribute('data-channel');
      channelBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      currentChannelKey = chKey;
      renderChannelMessages(chKey);
    });
  });

  sendBtn?.addEventListener('click', () => {
    const val = chatInput.value.trim();
    if (!val) return;

    getAudioContext();
    playBellSound(620, 'sine', 0.5, 0.08);

    const now = new Date();
    const timeStr = now.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' });
    const authorName = currentUserProfile?.username || 'You (Sanctuary Member)';

    const newMsg = {
      id: Date.now(),
      author: authorName,
      avatar: '🤍',
      tag: 'Sanctuary Member',
      time: timeStr,
      text: val,
      reactions: { hug: 1, warmth: 1 }
    };

    SANCTUARY_CHANNELS[currentChannelKey].messages.push(newMsg);
    renderChannelMessages(currentChannelKey);
    chatInput.value = '';

    if (sanctuaryBroadcast) {
      sanctuaryBroadcast.postMessage({
        type: 'NEW_CHAT_MESSAGE',
        channel: currentChannelKey,
        message: newMsg
      });
    }

    setTimeout(() => {
      const peerResponses = [
        { author: 'Sophia 🌸', avatar: '🌸', tag: 'Gold Member', text: 'Thank you for sharing that with us! Sending so much love. ❤️' },
        { author: 'Aria 🌙', avatar: '🌙', tag: 'Peer Support', text: 'I hear you so deeply. Your feelings are always safe here.' }
      ];
      const randomPeer = peerResponses[Math.floor(Math.random() * peerResponses.length)];
      const peerMsg = {
        id: Date.now(),
        author: randomPeer.author,
        avatar: randomPeer.avatar,
        tag: randomPeer.tag,
        time: new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' }),
        text: randomPeer.text,
        reactions: { hug: 3, warmth: 4 }
      };
      SANCTUARY_CHANNELS[currentChannelKey].messages.push(peerMsg);
      renderChannelMessages(currentChannelKey);
      playHarmonicChime([659.25, 783.99]);
    }, 2500);
  });

  chatInput?.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') sendBtn.click();
  });

  addFriendBtn?.addEventListener('click', () => {
    getAudioContext();
    playBellSound(600, 'sine', 0.5, 0.08);
    addFriendModal?.classList.remove('hidden');
  });

  confirmAddFriendBtn?.addEventListener('click', () => {
    const handle = friendHandleInput.value.trim();
    if (!handle) return;

    getAudioContext();
    playHarmonicChime([523.25, 659.25, 783.99]);

    const newFriend = {
      name: `${handle.split('_')[0] || handle} ✨`,
      handle: handle,
      avatar: '✨',
      status: 'Online • Added Friend',
      color: '#d946ef'
    };

    friends.unshift(newFriend);
    renderFriendsSidebar();
    friendHandleInput.value = '';
    addFriendModal?.classList.add('hidden');
  });

  voiceToggleBtn?.addEventListener('click', () => {
    getAudioContext();
    isVoiceConnected = !isVoiceConnected;
    if (isVoiceConnected) {
      playHarmonicChime([523.25, 659.25, 783.99, 1046.50]);
      voiceToggleBtn.textContent = '🔊 Connected';
      document.getElementById('voice-lounge-text').textContent = 'Connected to Voice Lounge • You are unmuted & safe';
    } else {
      playBellSound(350, 'sine', 0.5, 0.06);
      voiceToggleBtn.textContent = '🔇 Leave Voice';
      document.getElementById('voice-lounge-text').textContent = 'Connected to Voice Lounge • Talking softly';
    }
  });

  window.handlePeerReaction = function(btn, type) {
    getAudioContext();
    playBellSound(700, 'sine', 0.3, 0.06);
    btn.style.transform = 'scale(1.25)';
    setTimeout(() => btn.style.transform = 'scale(1)', 200);
  };
}

/* ==========================================================================
   8. FULL-SCREEN APPLE CALL ENGINE
   ========================================================================== */
function initAppleCallEngine() {
  const appleOverlay = document.getElementById('apple-call-overlay');
  const callerAvatarEl = document.getElementById('apple-caller-avatar');
  const callerNameEl = document.getElementById('apple-caller-name');
  const callStatusEl = document.getElementById('apple-call-status');

  const incomingActions = document.getElementById('apple-incoming-actions');
  const activeActions = document.getElementById('apple-active-actions');

  const acceptBtn = document.getElementById('apple-accept-btn');
  const declineBtn = document.getElementById('apple-decline-btn');
  const muteBtn = document.getElementById('apple-mute-btn');
  const speakerBtn = document.getElementById('apple-speaker-btn');
  const endBtn = document.getElementById('apple-end-btn');

  let activeCallTimer = null;
  let callSeconds = 0;

  window.startAppleCallWithFriend = function(friendName, friendAvatar) {
    getAudioContext();
    callerNameEl.textContent = friendName;
    callerAvatarEl.textContent = friendAvatar;
    callStatusEl.textContent = 'Calling Haven Sanctuary Voice...';

    incomingActions.classList.remove('hidden');
    activeActions.classList.add('hidden');
    appleOverlay.classList.remove('hidden');

    playAppleRingtone();

    const callSignal = {
      type: 'INCOMING_APPLE_CALL',
      callerName: currentUserProfile?.username || 'Sanctuary Member',
      callerAvatar: '🤍',
      timestamp: Date.now()
    };

    if (sanctuaryBroadcast) sanctuaryBroadcast.postMessage(callSignal);

    setTimeout(() => {
      if (!appleOverlay.classList.contains('hidden') && callStatusEl.textContent.includes('Calling')) {
        acceptAppleCall();
      }
    }, 2800);
  };

  window.triggerAppleIncomingCall = function(callerName, callerAvatar) {
    getAudioContext();
    callerNameEl.textContent = callerName;
    callerAvatarEl.textContent = callerAvatar;
    callStatusEl.textContent = 'Incoming Haven Sanctuary Voice Call...';

    incomingActions.classList.remove('hidden');
    activeActions.classList.add('hidden');
    appleOverlay.classList.remove('hidden');

    playAppleRingtone();
  };

  acceptBtn?.addEventListener('click', acceptAppleCall);
  declineBtn?.addEventListener('click', endAppleCall);
  endBtn?.addEventListener('click', endAppleCall);

  function acceptAppleCall() {
    stopAppleRingtone();
    getAudioContext();
    playHarmonicChime([523.25, 659.25, 783.99, 1046.50]);

    incomingActions.classList.add('hidden');
    activeActions.classList.remove('hidden');

    callSeconds = 0;
    callStatusEl.textContent = '🟢 Call Connected (00:00)';

    clearInterval(activeCallTimer);
    activeCallTimer = setInterval(() => {
      callSeconds++;
      const mins = String(Math.floor(callSeconds / 60)).padStart(2, '0');
      const secs = String(callSeconds % 60).padStart(2, '0');
      callStatusEl.textContent = `🟢 Call Connected (${mins}:${secs})`;
    }, 1000);
  }

  function endAppleCall() {
    stopAppleRingtone();
    getAudioContext();
    playBellSound(330, 'sine', 0.6, 0.08);

    clearInterval(activeCallTimer);
    appleOverlay.classList.add('hidden');
    callStatusEl.textContent = 'Call Ended';
  }

  muteBtn?.addEventListener('click', () => {
    getAudioContext();
    muteBtn.classList.toggle('active');
    playBellSound(440, 'sine', 0.3, 0.05);
  });

  speakerBtn?.addEventListener('click', () => {
    getAudioContext();
    speakerBtn.classList.toggle('active');
    playBellSound(550, 'sine', 0.3, 0.05);
  });
}

/* ==========================================================================
   9. THREE.JS 3D REACTIVE MEMORY ORB STUDIO ENGINE
   ========================================================================== */
const EMOTION_META = {
  joy: { name: 'Joy', color: '#ffd700', icon: '💛' },
  sadness: { name: 'Sadness / Longing', color: '#4169e1', icon: '💙' },
  nostalgia: { name: 'Nostalgia', color: '#ff69b4', icon: '🩷' },
  fear: { name: 'Fear', color: '#9370db', icon: '💜' },
  anger: { name: 'Anger', color: '#ff4500', icon: '❤️' },
  anxiety: { name: 'Anxiety', color: '#00ced1', icon: '🩵' },
  disgust: { name: 'Disgust', color: '#3cb371', icon: '💚' },
  vulnerability: { name: 'Vulnerability', color: '#ff7f50', icon: '🧡' },
  solitude: { name: 'Quiet Solitude', color: '#708090', icon: '🩶' }
};

function initThreeJSOrbStudio() {
  const canvas = document.getElementById('orb-3d-canvas');
  const container = document.getElementById('threejs-orb-container');
  if (!canvas || !container || !window.THREE) return;

  const width = container.clientWidth || 440;
  const height = container.clientHeight || 260;

  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 1000);
  camera.position.z = 4.5;

  const renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: true });
  renderer.setSize(width, height);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

  // Ambient & Dynamic Point Lights
  const ambientLight = new THREE.AmbientLight(0xffffff, 0.8);
  scene.add(ambientLight);

  const primaryPointLight = new THREE.PointLight(0xffcf56, 2.5, 10);
  primaryPointLight.position.set(2, 2, 3);
  scene.add(primaryPointLight);

  const secondaryPointLight = new THREE.PointLight(0xd946ef, 2.0, 10);
  secondaryPointLight.position.set(-2, -2, 2);
  scene.add(secondaryPointLight);

  // 3D Sphere Geometry & Material
  const geometry = new THREE.IcosahedronGeometry(1.4, 64);
  const originalPositions = geometry.attributes.position.clone();

  const material = new THREE.MeshStandardMaterial({
    color: 0xffffff,
    roughness: 0.15,
    metalness: 0.1,
    transparent: true,
    opacity: 0.92
  });

  const orbMesh = new THREE.Mesh(geometry, material);
  scene.add(orbMesh);

  // Orbiting Particle Cloud
  const particleCount = 120;
  const particleGeo = new THREE.BufferGeometry();
  const particlePos = new Float32Array(particleCount * 3);

  for (let i = 0; i < particleCount * 3; i += 3) {
    const u = Math.random();
    const v = Math.random();
    const theta = u * 2.0 * Math.PI;
    const phi = Math.acos(2.0 * v - 1.0);
    const r = 1.9 + Math.random() * 0.8;

    particlePos[i] = r * Math.sin(phi) * Math.cos(theta);
    particlePos[i + 1] = r * Math.sin(phi) * Math.sin(theta);
    particlePos[i + 2] = r * Math.cos(phi);
  }

  particleGeo.setAttribute('position', new THREE.BufferAttribute(particlePos, 3));
  const particleMat = new THREE.PointsMaterial({
    color: 0xffcf56,
    size: 0.05,
    transparent: true,
    opacity: 0.8
  });
  const particles = new THREE.Points(particleGeo, particleMat);
  scene.add(particles);

  // Interaction State
  let mouseX = 0, mouseY = 0;
  let targetRotationX = 0, targetRotationY = 0;
  let distortionSpeed = 0.003;
  let waveAmplitude = 0.18;

  container.addEventListener('mousemove', (e) => {
    const rect = container.getBoundingClientRect();
    mouseX = (e.clientX - rect.left - rect.width / 2) * 0.001;
    mouseY = (e.clientY - rect.top - rect.height / 2) * 0.001;
    distortionSpeed = 0.008;
  });

  container.addEventListener('mouseleave', () => {
    mouseX = 0; mouseY = 0;
    distortionSpeed = 0.003;
  });

  // Dynamic 3D Vertex Distortion Animation Loop
  let clock = new THREE.Clock();

  function animate() {
    requestAnimationFrame(animate);

    const elapsedTime = clock.getElapsedTime();

    // Rotate Orb mesh smoothly
    targetRotationY += (mouseX - targetRotationY) * 0.05;
    targetRotationX += (mouseY - targetRotationX) * 0.05;

    orbMesh.rotation.y += 0.004 + targetRotationY;
    orbMesh.rotation.x += 0.002 + targetRotationX;
    particles.rotation.y -= 0.002;

    // Liquid Vertex Wave Displacement
    const positionAttribute = geometry.attributes.position;
    const vertex = new THREE.Vector3();

    for (let i = 0; i < positionAttribute.count; i++) {
      vertex.fromBufferAttribute(originalPositions, i);
      const wave = Math.sin(vertex.x * 2.5 + elapsedTime * 2.5) *
                   Math.cos(vertex.y * 2.5 + elapsedTime * 2.5) *
                   Math.sin(vertex.z * 2.5 + elapsedTime * 2.5);

      vertex.multiplyScalar(1 + wave * waveAmplitude);
      positionAttribute.setXYZ(i, vertex.x, vertex.y, vertex.z);
    }
    geometry.computeVertexNormals();
    positionAttribute.needsUpdate = true;

    renderer.render(scene, camera);
  }

  animate();

  // Responsive Resizing
  window.addEventListener('resize', () => {
    if (container.clientWidth > 0) {
      const w = container.clientWidth;
      const h = container.clientHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    }
  });

  // Slider & Color Input Event Bindings
  const emoRanges = document.querySelectorAll('.emo-range');
  const primaryColorInput = document.getElementById('orb-primary-color');
  const secondaryColorInput = document.getElementById('orb-secondary-color');
  const glowIntensityInput = document.getElementById('orb-glow-intensity');
  const paletteBtns = document.querySelectorAll('.palette-swatch-btn');
  const blendLabel = document.getElementById('orb-blend-label');

  function updateThreeJSColors() {
    const pHex = primaryColorInput ? primaryColorInput.value : '#ffcf56';
    const sHex = secondaryColorInput ? secondaryColorInput.value : '#d946ef';
    const intensityVal = glowIntensityInput ? parseInt(glowIntensityInput.value) : 65;

    primaryPointLight.color.set(pHex);
    secondaryPointLight.color.set(sHex);
    particleMat.color.set(pHex);

    waveAmplitude = (intensityVal / 100) * 0.28;

    const activeEmotions = [];
    emoRanges.forEach(range => {
      const emoKey = range.getAttribute('data-emo');
      const val = parseInt(range.value);
      if (val > 0) {
        activeEmotions.push({ key: emoKey, val, meta: EMOTION_META[emoKey] });
      }
    });

    if (activeEmotions.length > 0) {
      activeEmotions.sort((a, b) => b.val - a.val);
      material.color.set(activeEmotions[0].meta.color);
      if (blendLabel) blendLabel.textContent = activeEmotions.map(e => `${e.meta.icon} ${e.meta.name}`).join(' • ');
    } else {
      material.color.set(pHex);
      if (blendLabel) blendLabel.textContent = 'Three.js 3D Liquid Orb Studio';
    }
  }

  emoRanges.forEach(r => r.addEventListener('input', updateThreeJSColors));
  primaryColorInput?.addEventListener('input', updateThreeJSColors);
  secondaryColorInput?.addEventListener('input', updateThreeJSColors);
  glowIntensityInput?.addEventListener('input', updateThreeJSColors);

  paletteBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      getAudioContext();
      playBellSound(640, 'sine', 0.4, 0.06);

      const p1 = btn.getAttribute('data-p1');
      const p2 = btn.getAttribute('data-p2');

      if (primaryColorInput) primaryColorInput.value = p1;
      if (secondaryColorInput) secondaryColorInput.value = p2;

      updateThreeJSColors();
    });
  });

  updateThreeJSColors();

  // Storybook Integration
  initStorybookReader();
}

function initStorybookReader() {
  const orbSegmentBtns = document.querySelectorAll('.segmented-btn[data-orb-view]');
  const orbSubviews = document.querySelectorAll('.orb-subview');

  orbSegmentBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      getAudioContext();
      playBellSound(480, 'sine', 0.4, 0.06);

      const targetView = btn.getAttribute('data-orb-view');
      orbSegmentBtns.forEach(b => b.classList.remove('active'));
      orbSubviews.forEach(v => v.classList.remove('active'));

      btn.classList.add('active');
      document.getElementById(`orb-view-${targetView}`)?.classList.add('active');
    });
  });

  let memories = JSON.parse(localStorage.getItem('haven_memories') || '[]');
  let currentPageIndex = 0;

  const prevPageBtn = document.getElementById('book-prev-btn');
  const nextPageBtn = document.getElementById('book-next-btn');
  const pageIndicator = document.getElementById('book-page-indicator');

  const pageOrb = document.getElementById('book-page-orb');
  const pageDate = document.getElementById('book-page-date');
  const pageEmotions = document.getElementById('page-emotions');
  const pagePhotoBox = document.getElementById('book-page-photo-container');
  const pagePhotoImg = document.getElementById('book-page-photo');

  const pageTitle = document.getElementById('book-page-title');
  const pageText = document.getElementById('book-page-text');

  const saveBtn = document.getElementById('save-memory-orb-btn');
  const titleInput = document.getElementById('orb-title-input');
  const noteInput = document.getElementById('orb-note-input');
  const photoInput = document.getElementById('orb-photo-input');
  const photoPreviewBox = document.getElementById('photo-preview-container');

  function renderStorybookPage(index) {
    if (memories.length === 0) {
      if (pageIndicator) pageIndicator.textContent = 'Page 0 of 0';
      if (pageTitle) pageTitle.textContent = 'My Emotional Storybook';
      if (pageText) pageText.textContent = 'No memories logged yet. Create your first Memory Orb on the left to turn the pages.';
      if (pageDate) pageDate.textContent = new Date().toLocaleDateString();
      if (pageOrb) pageOrb.style.background = 'radial-gradient(circle at 35% 35%, #ffffff, #ffcf56 35%, #ff8052 70%, #d946ef 100%)';
      if (pageEmotions) pageEmotions.innerHTML = '<span class="emo-pill-badge" style="background:#ffcf56; color:#2a083b;">💛 Warmth</span>';
      if (pagePhotoBox) pagePhotoBox.classList.add('hidden');
      return;
    }

    currentPageIndex = Math.max(0, Math.min(index, memories.length - 1));
    const item = memories[currentPageIndex];

    if (pageIndicator) pageIndicator.textContent = `Page ${currentPageIndex + 1} of ${memories.length}`;
    if (pageDate) pageDate.textContent = `${item.date} • ${item.time || ''}`;
    if (pageOrb) {
      pageOrb.style.background = item.gradient || 'radial-gradient(circle at 35% 35%, #ffffff, #ffd700 40%, #4169e1 100%)';
      pageOrb.style.boxShadow = `0 0 25px ${item.primaryColor || '#ffd700'}`;
    }

    if (pageEmotions) {
      pageEmotions.innerHTML = Object.keys(item.emotions || {})
        .filter(k => item.emotions[k] > 0)
        .map(k => {
          const meta = EMOTION_META[k];
          return `<span class="emo-pill-badge" style="background:${meta.color};">${meta.icon} ${meta.name} (${item.emotions[k]}%)</span>`;
        }).join('');
    }

    if (item.photoUrl && pagePhotoBox) {
      pagePhotoImg.src = item.photoUrl;
      pagePhotoBox.classList.remove('hidden');
    } else if (pagePhotoBox) {
      pagePhotoBox.classList.add('hidden');
    }

    if (pageTitle) pageTitle.textContent = item.title || 'Emotional Memory';
    if (pageText) pageText.textContent = item.note || 'No text written.';
  }

  renderStorybookPage(0);

  prevPageBtn?.addEventListener('click', () => {
    if (currentPageIndex > 0) {
      getAudioContext();
      playHarmonicChime([523.25, 659.25]);
      renderStorybookPage(currentPageIndex - 1);
    }
  });

  nextPageBtn?.addEventListener('click', () => {
    if (currentPageIndex < memories.length - 1) {
      getAudioContext();
      playHarmonicChime([659.25, 783.99]);
      renderStorybookPage(currentPageIndex + 1);
    }
  });

  saveBtn?.addEventListener('click', () => {
    const title = titleInput.value.trim() || 'Today\'s 3D Emotional Memory';
    const note = noteInput.value.trim();

    getAudioContext();
    playHarmonicChime([440, 554.37, 659.25, 880]);

    const activeEmotionsMap = {};
    const emoRanges = document.querySelectorAll('.emo-range');
    emoRanges.forEach(range => {
      const k = range.getAttribute('data-emo');
      const val = parseInt(range.value);
      if (val > 0) activeEmotionsMap[k] = val;
    });

    const pColor = document.getElementById('orb-primary-color')?.value || '#ffcf56';
    const sColor = document.getElementById('orb-secondary-color')?.value || '#d946ef';

    const now = new Date();
    const newMemory = {
      id: `memory_${Date.now()}`,
      title,
      note,
      emotions: activeEmotionsMap,
      gradient: `radial-gradient(circle at 35% 35%, #ffffff 0%, ${pColor} 40%, ${sColor} 100%)`,
      primaryColor: pColor,
      date: now.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
      time: now.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })
    };

    memories.unshift(newMemory);
    localStorage.setItem('haven_memories', JSON.stringify(memories));

    if (titleInput) titleInput.value = '';
    if (noteInput) noteInput.value = '';

    document.querySelector('.segmented-btn[data-orb-view="storybook"]')?.click();
    renderStorybookPage(0);
  });
}

/* ==========================================================================
   10. SKY LANTERNS
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
  const todayStr = new Date().toISOString().split('T')[0];
  lanterns = lanterns.map((l, index) => ({
    id: l.id || `lantern_${Date.now()}_${index}`,
    message: l.message,
    color: l.color || '#ffcf56',
    date: l.date || new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
    rawDate: l.rawDate || todayStr,
    time: l.time || 'Evening'
  }));

  const releasedCountEl = document.getElementById('released-count');
  releasedCountEl.textContent = `${lanterns.length} lanterns floating`;

  const activeLanternObjects = lanterns.map(l => ({
    ...l,
    x: Math.random() * (width - 40) + 20,
    y: Math.random() * (height - 80) + 40,
    vy: -Math.random() * 0.3 - 0.1,
    sway: Math.random() * Math.PI * 2,
    size: 20
  }));

  function renderSky() {
    ctx.clearRect(0, 0, width, height);

    activeLanternObjects.forEach(l => {
      l.y += l.vy;
      l.sway += 0.02;
      l.x += Math.sin(l.sway) * 0.3;

      if (l.y < -40) l.y = height + 20;

      const glow = ctx.createRadialGradient(l.x, l.y, 2, l.x, l.y, l.size * 1.6);
      glow.addColorStop(0, l.color || '#ffcf56');
      glow.addColorStop(1, 'transparent');

      ctx.fillStyle = glow;
      ctx.beginPath();
      ctx.arc(l.x, l.y, l.size * 1.6, 0, Math.PI * 2);
      ctx.fill();

      ctx.fillStyle = l.color || '#ffcf56';
      ctx.beginPath();
      ctx.roundRect(l.x - 8, l.y - 12, 16, 22, 3);
      ctx.fill();
    });

    requestAnimationFrame(renderSky);
  }

  renderSky();
}

/* ==========================================================================
   11. BREATHING OASIS
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
    breathInstruction.textContent = 'Tap start when you are ready to breathe softly.';
    breathCircle.parentElement.className = 'breathing-visualizer';
  }

  function runPhaseCycle() {
    if (!isBreathing) return;

    let phases = [
      { name: 'Inhale', duration: 4, class: 'breath-expand', guide: 'Breathe in softly...', pitch: 523.25 },
      { name: 'Hold', duration: 7, class: 'breath-hold', guide: 'Hold softly...', pitch: 659.25 },
      { name: 'Exhale', duration: 8, class: 'breath-shrink', guide: 'Release gently...', pitch: 392.00 }
    ];

    let pIndex = 0;

    function executePhase() {
      if (!isBreathing) return;
      const current = phases[pIndex];

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
   12. PROCEDURAL WEB AUDIO SOUNDSCAPES
   ========================================================================== */
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
    masterToggleBtn.textContent = isAudioEnabled ? '⏸ Pause Sanctuary Audio' : '▶ Enable Generator';
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
        data[i] = (b0 + b1 + b2 + b3 + b4 + b5 + b6 + white * 0.5362) * 0.05;
        b6 = white * 0.115926;
      }
      const source = ctx.createBufferSource();
      source.buffer = buffer;
      source.loop = true;

      const filter = ctx.createBiquadFilter();
      filter.type = 'lowpass';
      filter.frequency.value = 1200;

      source.connect(filter);
      filter.connect(gainNode);
      source.start();

      activeNodes.rain = { source, gain: gainNode };
    } else if (type === 'campfire') {
      const bufferSize = ctx.sampleRate * 2;
      const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
      const data = buffer.getChannelData(0);
      for (let i = 0; i < bufferSize; i++) {
        const isPop = Math.random() < 0.002;
        data[i] = isPop ? (Math.random() * 2 - 1) * 0.5 : (Math.random() * 2 - 1) * 0.02;
      }
      const source = ctx.createBufferSource();
      source.buffer = buffer;
      source.loop = true;

      const filter = ctx.createBiquadFilter();
      filter.type = 'lowpass';
      filter.frequency.value = 800;

      source.connect(filter);
      filter.connect(gainNode);
      source.start();

      activeNodes.campfire = { source, gain: gainNode };
    } else if (type === 'ocean') {
      const bufferSize = ctx.sampleRate * 2;
      const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
      const data = buffer.getChannelData(0);
      for (let i = 0; i < bufferSize; i++) {
        data[i] = (Math.random() * 2 - 1) * 0.08;
      }
      const source = ctx.createBufferSource();
      source.buffer = buffer;
      source.loop = true;

      const filter = ctx.createBiquadFilter();
      filter.type = 'lowpass';
      filter.frequency.value = 350;

      const lfo = ctx.createOscillator();
      lfo.frequency.value = 0.12;
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
      const bufferSize = ctx.sampleRate * 2;
      const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
      const data = buffer.getChannelData(0);
      for (let i = 0; i < bufferSize; i++) {
        data[i] = (Math.random() * 2 - 1) * 0.06;
      }
      const source = ctx.createBufferSource();
      source.buffer = buffer;
      source.loop = true;

      const filter = ctx.createBiquadFilter();
      filter.type = 'bandpass';
      filter.frequency.value = 450;
      filter.Q.value = 1.5;

      const lfo = ctx.createOscillator();
      lfo.frequency.value = 0.18;
      const lfoGain = ctx.createGain();
      lfoGain.gain.value = 300;

      lfo.connect(lfoGain);
      lfoGain.connect(filter.frequency);
      lfo.start();

      source.connect(filter);
      filter.connect(gainNode);
      source.start();

      activeNodes.breeze = { source, lfo, gain: gainNode };
    } else if (type === 'chimes') {
      const chimeTimer = setInterval(() => {
        if (!activeNodes.chimes) return;
        const freqs = [523.25, 659.25, 783.99, 1046.50, 1318.51, 1567.98];
        const freq = freqs[Math.floor(Math.random() * freqs.length)];

        const osc = ctx.createOscillator();
        const oscGain = ctx.createGain();

        osc.type = 'sine';
        osc.frequency.value = freq;
        oscGain.gain.setValueAtTime(0.09, ctx.currentTime);
        oscGain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + 3.5);

        osc.connect(oscGain);
        oscGain.connect(gainNode);

        osc.start();
        osc.stop(ctx.currentTime + 3.6);
      }, 2500);

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
   13. MEMORY JAR
   ========================================================================== */
const DEFAULT_NOTES = [
  "You carry immense strength within you, even on days when you feel soft or quiet.",
  "It's completely okay to miss your dad and feel the weight of empty space. Your love is real.",
  "You do not have to be strong all the time. Rest is allowed and necessary.",
  "The people who love you hold you close in their thoughts every single day."
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
    const displayCount = Math.min(notes.length, 12);
    for (let i = 0; i < displayCount; i++) {
      const particle = document.createElement('div');
      particle.className = 'jar-note-particle';
      particle.style.setProperty('--rot', (Math.random() - 0.5) * 30);
      container.appendChild(particle);
    }
  }

  renderJarContents();

  drawBtn?.addEventListener('click', () => {
    getAudioContext();
    playHarmonicChime([659.25, 783.99, 1046.50]);
    const note = notes[Math.floor(Math.random() * notes.length)];
    noteTextEl.textContent = `"${note}"`;
    noteModal?.classList.remove('hidden');
  });

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
   14. HEART CHECK-IN & SAFE JOURNAL
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

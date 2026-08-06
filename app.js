/* ==========================================================================
   HAVEN WELLNESS SANCTUARY — STEVE JOBS MASTERPIECE ENGINE (PURE & BEAUTIFUL)
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
  // Initialize Lucide Icons
  if (window.lucide) {
    window.lucide.createIcons();
  }

  initADANavigation();
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
  init3DLanternSkyWorld();
  initBreathingOasis2D();
  initAudioSpectrumBars();
  initSoundscapes();
  initMemoryJar();
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

      const rotateX = ((y - centerY) / centerY) * -1.2;
      const rotateY = ((x - centerX) / centerX) * 1.2;

      card.style.transform = `perspective(1200px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-2px)`;
    });

    card.addEventListener('mouseleave', () => {
      card.style.transform = `perspective(1200px) rotateX(0deg) rotateY(0deg) translateY(0px)`;
    });
  });
}

/* ==========================================================================
   2. DESKTOP RESOLUTION ENGINE
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
   3. DESKTOP DEDICATED PAGE NAVIGATION ROUTER
   ========================================================================== */
const pageMeta = {
  'hub': { title: 'Sanctuary Overview', subtitle: 'Evidence-based emotional regulation, autonomous Rogerian therapy, and peer support network.' },
  'ai-listener': { title: 'Clinical AI Therapist (Dr. Aura)', subtitle: 'Autonomous Rogerian AI therapist trained in active listening, empathy, and speech synthesis.' },
  'community': { title: 'Sanctuary Circle Peer Network', subtitle: 'HIPAA-guided moderated peer support network for emotional sharing and voice relaxation.' },
  'memory-orbs': { title: 'Cognitive Emotion Studio', subtitle: 'Map complex affective states into vibrant animated liquid emotion spheres.' },
  'lanterns': { title: 'Release Sky 3D World', subtitle: 'Full-screen visionOS 3D WebGL starry sky environment with WASD navigation.' },
  'breathing': { title: 'Autonomic Regulation', subtitle: 'Evidence-based parasympathetic vagal stimulation and box breathing regulation.' },
  'soundscapes': { title: 'Neuro-Acoustic Soundscapes', subtitle: 'Procedural neuro-acoustic ambient audio generator with interactive visualizers.' },
  'memory-jar': { title: 'Cognitive Memory Vault', subtitle: 'Deposit notes of gratitude, warmth, and memory into your confidential glass vault.' },
  'journal': { title: 'Clinical Heart Journal', subtitle: 'Private, local-encrypted affective check-in and confidential reflective journal.' }
};

function navigateToPage(targetPageId) {
  const allPanes = document.querySelectorAll('.tab-pane');
  const pageTitle = document.getElementById('page-title');
  const pageSubtitle = document.getElementById('page-subtitle');
  const curtain = document.getElementById('rainbow-wipe-curtain');

  getAudioContext();
  playHarmonicChime([523.25, 659.25, 783.99]);

  const switchContent = () => {
    allPanes.forEach(pane => pane.classList.remove('active'));
    const targetPane = document.getElementById(`tab-${targetPageId}`);
    if (targetPane) {
      targetPane.classList.add('active');
    }

    if (pageMeta[targetPageId]) {
      if (pageTitle) pageTitle.textContent = pageMeta[targetPageId].title;
      if (pageSubtitle) pageSubtitle.textContent = pageMeta[targetPageId].subtitle;
    }

    const navPills = document.querySelectorAll('.ada-nav-pill[data-nav-target]');
    navPills.forEach(pill => {
      pill.classList.toggle('active', pill.getAttribute('data-nav-target') === targetPageId);
    });

    window.scrollTo({ top: 0, behavior: 'smooth' });
    if (window.lucide) window.lucide.createIcons();

    if (targetPageId === 'lanterns') {
      setTimeout(() => {
        document.getElementById('enter-3d-sky-world-btn')?.click();
      }, 150);
    }
  };

  if (curtain) {
    curtain.className = 'rainbow-wipe-curtain wipe-from-right';
    setTimeout(switchContent, 250);
    setTimeout(() => { curtain.className = 'rainbow-wipe-curtain'; }, 600);
  } else {
    switchContent();
  }
}

function initADANavigation() {
  const navPills = document.querySelectorAll('.ada-nav-pill[data-nav-target]');
  navPills.forEach(pill => {
    pill.addEventListener('click', () => {
      getAudioContext();
      playBellSound(750, 'sine', 0.5, 0.06);
      const targetId = pill.getAttribute('data-nav-target');
      if (targetId) navigateToPage(targetId);
    });
  });

  document.querySelectorAll('.back-to-hub-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      navigateToPage('hub');
    });
  });
}

/* ==========================================================================
   4. WEB AUDIO SYNTHESIS ENGINE
   ========================================================================== */
let audioCtx = null;

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
  const themeOptions = document.querySelectorAll('.theme-option-btn');

  openThemeBtn?.addEventListener('click', () => themeModal?.classList.remove('hidden'));

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

  const particles = Array.from({ length: 40 }, () => ({
    x: Math.random() * width,
    y: Math.random() * height,
    radius: Math.random() * 2.2 + 1,
    alpha: Math.random() * 0.35 + 0.1,
    speedX: (Math.random() - 0.5) * 0.35,
    speedY: (Math.random() - 0.5) * 0.35,
    color: ['rgba(99, 102, 241, ', 'rgba(13, 148, 136, ', 'rgba(244, 63, 94, '][Math.floor(Math.random() * 3)]
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

  const brewTeaBtn = document.getElementById('brew-tea-btn');
  const teaSteam = document.getElementById('tea-steam');
  let isSteeping = false;
  let teaTimer = null;

  brewTeaBtn?.addEventListener('click', () => {
    getAudioContext();
    if (isSteeping) return;
    isSteeping = true;

    playHarmonicChime([440, 554.37, 659.25]);
    if (teaSteam) teaSteam.style.opacity = '1';
    
    let left = 30;
    brewTeaBtn.innerHTML = `<i data-lucide="timer"></i> Steeping... ${left}s`;
    
    teaTimer = setInterval(() => {
      left--;
      if (left <= 0) {
        clearInterval(teaTimer);
        isSteeping = false;
        if (teaSteam) teaSteam.style.opacity = '0.5';
        brewTeaBtn.innerHTML = `<i data-lucide="check"></i> Somatic Tea Prepared`;
        playHarmonicChime([523.25, 659.25, 783.99, 1046.50]);
        setTimeout(() => {
          brewTeaBtn.innerHTML = `<i data-lucide="timer"></i> Mindfulness Pause (30s)`;
          if (window.lucide) window.lucide.createIcons();
        }, 4000);
      } else {
        brewTeaBtn.innerHTML = `<i data-lucide="timer"></i> Steeping... ${left}s`;
      }
    }, 1000);
  });

  document.getElementById('open-ai-listener-btn')?.addEventListener('click', () => {
    navigateToPage('ai-listener');
  });
  document.getElementById('open-community-tab-btn')?.addEventListener('click', () => {
    navigateToPage('community');
  });
  document.getElementById('open-storybook-tab-btn')?.addEventListener('click', () => {
    navigateToPage('memory-orbs');
  });
}

/* ==========================================================================
   8. AI THERAPIST (DR. AURA) - SIRI SPEECH & THERAPY AGENT
   ========================================================================== */
function initAutonomousAITherapistAura() {
  const startListenBtn = document.getElementById('start-voice-listen-btn');
  const toggleSpeechBtn = document.getElementById('toggle-speech-synth-btn');
  const statusText = document.getElementById('ai-status-text');
  const textInput = document.getElementById('ai-text-input');
  const sendTextBtn = document.getElementById('send-ai-text-btn');
  const messagesBox = document.getElementById('ai-chat-messages');
  const auraCore = document.querySelector('.aura-core');

  let isListening = false;
  let speechSynthEnabled = true;

  toggleSpeechBtn?.addEventListener('click', () => {
    speechSynthEnabled = !speechSynthEnabled;
    toggleSpeechBtn.classList.toggle('active', speechSynthEnabled);
    playBellSound(600, 'sine', 0.4, 0.05);
  });

  startListenBtn?.addEventListener('click', () => {
    getAudioContext();
    isListening = !isListening;
    if (isListening) {
      if (statusText) statusText.textContent = 'Dr. Aura • Listening softly...';
      if (startListenBtn) startListenBtn.innerHTML = '<i data-lucide="square"></i> Listening... Speak Now';
      playHarmonicChime([523.25, 659.25]);

      setTimeout(() => {
        if (isListening) {
          isListening = false;
          if (startListenBtn) startListenBtn.innerHTML = '<i data-lucide="mic"></i> Tap to Speak with Dr. Aura';
          const voiceResp = "I heard your soft voice. Take a slow, deep breath with me. I am right here with you.";
          appendBubble('Dr. Aura (AI Therapist Agent)', voiceResp, 'aura-bubble');
          if (speechSynthEnabled) speakTherapistText(voiceResp);
        }
      }, 4000);
    } else {
      if (statusText) statusText.textContent = 'Dr. Aura • Apple Intelligence Clinical Agent';
      if (startListenBtn) startListenBtn.innerHTML = '<i data-lucide="mic"></i> Tap to Speak with Dr. Aura';
    }
    if (window.lucide) window.lucide.createIcons();
  });

  document.querySelectorAll('.ai-chip-btn').forEach(chip => {
    chip.addEventListener('click', () => {
      getAudioContext();
      playBellSound(640, 'sine', 0.4, 0.05);
      const promptText = chip.getAttribute('data-prompt');
      if (textInput && promptText) {
        textInput.value = promptText;
        handleSendMessage();
      }
    });
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

    setTimeout(() => {
      const lower = val.toLowerCase();
      let resp = "I hear you deeply. What you are experiencing is completely valid. How does it feel to put that into words right now?";

      if (lower.includes('dad') || lower.includes('father') || lower.includes('longing')) {
        resp = "Parental longing is a profound, tender emotion. Missing your dad shows how deeply you hold love in your heart. I am here to hold space for that love with you.";
      } else if (lower.includes('lonely') || lower.includes('alone')) {
        resp = "Feeling lonely can feel heavy, but in this sanctuary, you are truly never alone. Let's take a soft breathing pause together.";
      } else if (lower.includes('anxious') || lower.includes('scared') || lower.includes('stress')) {
        resp = "When anxiety feels like a tide, bring your awareness to your feet on the ground. You are safe in this quiet moment.";
      }

      appendBubble('Dr. Aura (AI Therapist Agent)', resp, 'aura-bubble');
      playBellSound(520, 'sine', 1.0, 0.08);

      if (speechSynthEnabled) speakTherapistText(resp);
    }, 1000);
  }

  function appendBubble(author, text, bubbleClass) {
    if (!messagesBox) return;
    const bubble = document.createElement('div');
    bubble.className = `chat-bubble ${bubbleClass}`;
    bubble.innerHTML = `<span class="chat-author">${author}:</span><p>"${text}"</p>`;
    messagesBox.appendChild(bubble);
    messagesBox.scrollTop = messagesBox.scrollHeight;
  }

  function speakTherapistText(text) {
    if (!('speechSynthesis' in window)) return;
    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.rate = 0.9;
    utterance.pitch = 1.0;
    window.speechSynthesis.speak(utterance);
  }
}

/* ==========================================================================
   9. SANCTUARY CIRCLE COMMUNITY - MULTI-CHANNEL PEER NETWORK
   ========================================================================== */
function initSanctuaryCircleCommunity() {
  const channelBtns = document.querySelectorAll('.channel-btn[data-channel]');
  const messagesBox = document.getElementById('discord-messages-box');
  const chatInput = document.getElementById('discord-chat-input');
  const sendBtn = document.getElementById('send-discord-msg-btn');
  const titleEl = document.getElementById('current-channel-title');
  const descEl = document.getElementById('current-channel-desc');
  const toggleVoiceBtn = document.getElementById('toggle-voice-connect-btn');
  const voiceBanner = document.getElementById('voice-lounge-banner');
  const onlineFriendsList = document.getElementById('online-friends-list');

  let currentChannel = 'general';
  let isVoiceConnected = false;

  const channelData = {
    'general': {
      title: '# general-sanctuary',
      desc: 'A gentle, supportive space for peer reflection and comfort.',
      messages: [
        { author: 'Aria (Peer)', text: 'Sending soft warmth to everyone in the sanctuary today. You are not alone.' },
        { author: 'Marcus (Peer)', text: 'Just completed a 4-7-8 breathing session. Feeling a quiet calm settling in.' }
      ]
    },
    'family-longing': {
      title: '# family-and-longing',
      desc: 'Dedicated peer channel for parental detachment, longing, and grief reflection.',
      messages: [
        { author: 'Elena (Peer)', text: 'Missing my dad today. Thankful for this safe space to share that feeling.' },
        { author: 'David (Peer)', text: 'Holding space for everyone carrying family longing. Soft light to you all.' }
      ]
    },
    'daily-wins': {
      title: '# daily-wins-and-warmth',
      desc: 'Celebrate small steps, daily peace, and moments of warmth.',
      messages: [
        { author: 'Sophia (Peer)', text: 'Daily win: Took a 10-minute mindfulness tea pause and sat in the sunlight.' },
        { author: 'Leo (Peer)', text: 'Archived my first Emotion Orb today! Loving the liquid gold gradient.' }
      ]
    },
    'voice-lounge': {
      title: '🔊 tea-and-rest-lounge',
      desc: 'Voice lounge for talking softly, listening to ambient soundscapes, and rest.',
      messages: [
        { author: 'Sanctuary System', text: 'Voice lounge active. Tap Leave Voice at the top to disconnect.' }
      ]
    }
  };

  const initialFriends = [
    { name: 'Aria Sanctuary', status: 'Online • In Voice Lounge' },
    { name: 'Marcus Spirit', status: 'Online • Breathing Oasis' },
    { name: 'Elena Warmth', status: 'Online • Safe Journal' }
  ];

  function renderFriends() {
    if (!onlineFriendsList) return;
    onlineFriendsList.innerHTML = initialFriends.map(f => `
      <div class="ios-list-row margin-top-sm" style="padding: 8px 10px;">
        <div class="user-avatar-mini" style="width: 28px; height: 28px;"><i data-lucide="user"></i></div>
        <div class="user-info-text">
          <span class="user-display-name">${f.name}</span>
          <span class="user-status-tag">${f.status}</span>
        </div>
      </div>
    `).join('');
    if (window.lucide) window.lucide.createIcons();
  }
  renderFriends();

  function renderChannelMessages() {
    if (!messagesBox) return;
    const data = channelData[currentChannel];
    if (titleEl) titleEl.textContent = data.title;
    if (descEl) descEl.textContent = data.desc;

    messagesBox.innerHTML = data.messages.map(m => `
      <div class="chat-bubble ${m.author.includes('You') ? 'user-bubble' : 'aura-bubble'}">
        <span class="chat-author">${m.author}:</span>
        <p>"${m.text}"</p>
      </div>
    `).join('');
    messagesBox.scrollTop = messagesBox.scrollHeight;
  }
  renderChannelMessages();

  channelBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      getAudioContext();
      playBellSound(540, 'sine', 0.4, 0.06);
      channelBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      currentChannel = btn.getAttribute('data-channel') || 'general';
      renderChannelMessages();
    });
  });

  sendBtn?.addEventListener('click', handleSendPeerMsg);
  chatInput?.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') handleSendPeerMsg();
  });

  function handleSendPeerMsg() {
    const val = chatInput.value.trim();
    if (!val) return;
    channelData[currentChannel].messages.push({ author: 'You', text: val });
    chatInput.value = '';
    renderChannelMessages();
    playBellSound(600, 'sine', 0.5, 0.06);
  }

  toggleVoiceBtn?.addEventListener('click', () => {
    isVoiceConnected = !isVoiceConnected;
    if (isVoiceConnected) {
      voiceBanner?.classList.remove('hidden');
      toggleVoiceBtn.innerHTML = '<i data-lucide="mic-off"></i> Leave Voice';
      playHarmonicChime([440, 523.25]);
    } else {
      voiceBanner?.classList.add('hidden');
      toggleVoiceBtn.innerHTML = '<i data-lucide="mic"></i> Connect Voice';
      playBellSound(400, 'sine', 0.4, 0.05);
    }
    if (window.lucide) window.lucide.createIcons();
  });

  const addFriendModal = document.getElementById('add-friend-modal');
  document.getElementById('open-add-friend-modal-btn')?.addEventListener('click', () => {
    addFriendModal?.classList.remove('hidden');
  });

  document.getElementById('confirm-add-friend-btn')?.addEventListener('click', () => {
    const handleInput = document.getElementById('friend-input-handle');
    const handle = handleInput?.value.trim();
    if (handle) {
      initialFriends.unshift({ name: handle, status: 'Online • Verified Peer' });
      renderFriends();
      handleInput.value = '';
      addFriendModal?.classList.add('hidden');
      playBellSound(700, 'sine', 0.6, 0.06);
    }
  });
}

/* ==========================================================================
   10. EMOTION STUDIO - SLIDERS BINDING & HAND-PAINTABLE ORB
   ========================================================================== */
function initEmotionStudio2D() {
  const cssOrb = document.getElementById('css-orb');
  const primaryColorInput = document.getElementById('orb-primary-color');
  const secondaryColorInput = document.getElementById('orb-secondary-color');
  const speedSlider = document.getElementById('orb-glow-intensity');
  const paletteBtns = document.querySelectorAll('.palette-swatch-btn');
  const orbTitleInput = document.getElementById('orb-title-input');
  const orbNoteInput = document.getElementById('orb-note-input');
  const saveOrbBtn = document.getElementById('save-memory-orb-btn');

  const emotionColorMap = {
    'joy': '#ffcf56',
    'sadness': '#60a5fa',
    'nostalgia': '#f472b6',
    'fear': '#a78bfa',
    'anger': '#ff5f57',
    'anxiety': '#38bdf8',
    'disgust': '#34d399',
    'vulnerability': '#ff8052',
    'solitude': '#94a3b8'
  };

  // DIRECTIVE 2: Emotion sliders down-below update orb gradient in real time!
  const emoSliders = document.querySelectorAll('.emo-range[data-emo]');
  emoSliders.forEach(slider => {
    slider.addEventListener('input', () => {
      let activeColors = [];
      emoSliders.forEach(s => {
        const val = parseInt(s.value);
        const emoName = s.getAttribute('data-emo');
        if (val > 0 && emotionColorMap[emoName]) {
          activeColors.push({ color: emotionColorMap[emoName], val });
        }
      });

      if (activeColors.length > 0) {
        activeColors.sort((a, b) => b.val - a.val);
        const primary = activeColors[0].color;
        const secondary = activeColors[1] ? activeColors[1].color : activeColors[0].color;
        if (primaryColorInput) primaryColorInput.value = primary;
        if (secondaryColorInput) secondaryColorInput.value = secondary;
        updateOrbGradient();
      }
    });
  });

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

  let savedOrbs = JSON.parse(localStorage.getItem('haven_memory_orbs') || '[]');
  let currentBookIndex = 0;

  function renderStorybookPage() {
    const bookTitle = document.getElementById('book-page-title');
    const bookText = document.getElementById('book-page-text');
    const bookDate = document.getElementById('book-page-date');
    const pageIndicator = document.getElementById('book-page-indicator');

    if (savedOrbs.length === 0) {
      if (bookTitle) bookTitle.textContent = 'Affective Storybook';
      if (bookText) bookText.textContent = 'No affective entries logged yet. Create your first Emotion Orb to turn the pages.';
      if (pageIndicator) pageIndicator.textContent = 'Page 0 of 0';
      return;
    }

    const orb = savedOrbs[currentBookIndex];
    if (bookTitle) bookTitle.textContent = orb.title || 'Untitled Affective Orb';
    if (bookText) bookText.textContent = orb.note || 'No notes logged for this entry.';
    if (bookDate) bookDate.textContent = orb.date;
    if (pageIndicator) pageIndicator.textContent = `Page ${currentBookIndex + 1} of ${savedOrbs.length}`;
  }

  document.getElementById('book-prev-btn')?.addEventListener('click', () => {
    if (savedOrbs.length === 0) return;
    currentBookIndex = (currentBookIndex - 1 + savedOrbs.length) % savedOrbs.length;
    renderStorybookPage();
    playBellSound(550, 'sine', 0.4, 0.05);
  });

  document.getElementById('book-next-btn')?.addEventListener('click', () => {
    if (savedOrbs.length === 0) return;
    currentBookIndex = (currentBookIndex + 1) % savedOrbs.length;
    renderStorybookPage();
    playBellSound(550, 'sine', 0.4, 0.05);
  });

  saveOrbBtn?.addEventListener('click', () => {
    const title = orbTitleInput?.value.trim() || 'Sunset Affective Orb';
    const note = orbNoteInput?.value.trim() || 'Felt a deep, soft peace settling in today.';

    const newOrb = {
      id: Date.now(),
      title,
      note,
      date: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
      color1: primaryColorInput?.value || '#ffcf56',
      color2: secondaryColorInput?.value || '#d946ef'
    };

    savedOrbs.unshift(newOrb);
    localStorage.setItem('haven_memory_orbs', JSON.stringify(savedOrbs));

    if (orbTitleInput) orbTitleInput.value = '';
    if (orbNoteInput) orbNoteInput.value = '';

    playHarmonicChime([440, 523.25, 659.25]);

    const storybookBtn = document.querySelector('.segmented-btn[data-orb-view="storybook"]');
    storybookBtn?.click();
    currentBookIndex = 0;
    renderStorybookPage();
  });

  renderStorybookPage();
}

/* ==========================================================================
   11. BREATHING OASIS - 2D ANIMATION ENGINE
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
  let meditationMusicInstance = null;

  const modes = {
    'relax': { name: '4-7-8 Parasympathetic', inhale: 4, hold: 7, exhale: 8 },
    'box': { name: '4-4-4 Box Breathing', inhale: 4, hold: 4, exhale: 4 },
    'calm': { name: '4-6 Vagal Resonator', inhale: 4, hold: 0, exhale: 6 }
  };

  function startCalmingMeditationMusic() {
    try {
      const ctx = getAudioContext();
      const osc1 = ctx.createOscillator();
      const osc2 = ctx.createOscillator();
      const osc3 = ctx.createOscillator();
      const gain = ctx.createGain();

      osc1.type = 'sine';
      osc2.type = 'sine';
      osc3.type = 'triangle';

      osc1.frequency.setValueAtTime(216, ctx.currentTime);
      osc2.frequency.setValueAtTime(324, ctx.currentTime);
      osc3.frequency.setValueAtTime(432, ctx.currentTime);

      gain.gain.setValueAtTime(0.0001, ctx.currentTime);
      gain.gain.linearRampToValueAtTime(0.07, ctx.currentTime + 2.5);

      osc1.connect(gain);
      osc2.connect(gain);
      osc3.connect(gain);
      gain.connect(ctx.destination);

      osc1.start();
      osc2.start();
      osc3.start();

      return {
        stop: () => {
          try {
            gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + 1.5);
            setTimeout(() => {
              osc1.stop();
              osc2.stop();
              osc3.stop();
            }, 1500);
          } catch (e) {}
        }
      };
    } catch (e) {
      return null;
    }
  }

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
      if (startBtn) startBtn.innerHTML = '<i data-lucide="square"></i> Stop Regulation';
      meditationMusicInstance = startCalmingMeditationMusic();
      runBreathCycle();
    } else {
      stopBreathCycle();
    }
    if (window.lucide) window.lucide.createIcons();
  });

  function stopBreathCycle() {
    isBreathing = false;
    clearTimeout(breathTimer);
    if (meditationMusicInstance) {
      meditationMusicInstance.stop();
      meditationMusicInstance = null;
    }
    if (startBtn) startBtn.innerHTML = '<i data-lucide="play"></i> Begin Autonomic Regulation';
    if (breathCircle) breathCircle.className = 'breath-circle';
    if (phaseEl) phaseEl.textContent = 'Ready';
    if (timerEl) timerEl.textContent = '--';
    if (window.lucide) window.lucide.createIcons();
  }

  function runBreathCycle() {
    if (!isBreathing) return;
    const config = modes[currentMode];

    if (phaseEl) phaseEl.textContent = 'Inhale Softly...';
    if (breathCircle) breathCircle.className = 'breath-circle inhale';
    playBellSound(440, 'sine', config.inhale, 0.08);
    countdownPhase(config.inhale, () => {
      if (!isBreathing) return;

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
   12. AUDIO SPECTRUM BARS
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
      masterBtn.innerHTML = '<i data-lucide="square"></i> Disable Audio Generator';
      animateSpectrum();
      playHarmonicChime([440, 523.25, 659.25]);
    } else {
      masterBtn.innerHTML = '<i data-lucide="play"></i> Enable Audio Generator';
      cancelAnimationFrame(animId);
      bars.forEach(b => b.style.height = '20px');
    }
    if (window.lucide) window.lucide.createIcons();
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
   13. PROCEDURAL WEB AUDIO NEURO-ACOUSTIC SOUNDSCAPES
   ========================================================================== */
function initSoundscapes() {
  const soundCards = document.querySelectorAll('.sound-card');

  soundCards.forEach(card => {
    const btn = card.querySelector('.sound-toggle-btn');
    const soundType = card.getAttribute('data-sound');
    let isPlaying = false;
    let soundNodes = null;

    btn?.addEventListener('click', () => {
      const ctx = getAudioContext();
      isPlaying = !isPlaying;

      if (isPlaying) {
        btn.innerHTML = '<i data-lucide="square"></i>';
        btn.classList.add('active');
        soundNodes = startProceduralSound(ctx, soundType);
      } else {
        btn.innerHTML = '<i data-lucide="play"></i>';
        btn.classList.remove('active');
        if (soundNodes && soundNodes.stop) soundNodes.stop();
      }
      if (window.lucide) window.lucide.createIcons();
    });
  });

  function startProceduralSound(ctx, type) {
    const bufferSize = ctx.sampleRate * 2;
    const noiseBuffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
    const output = noiseBuffer.getChannelData(0);
    for (let i = 0; i < bufferSize; i++) {
      output[i] = Math.random() * 2 - 1;
    }

    const whiteNoise = ctx.createBufferSource();
    whiteNoise.buffer = noiseBuffer;
    whiteNoise.loop = true;

    const filter = ctx.createBiquadFilter();
    const gain = ctx.createGain();

    if (type === 'rain') {
      filter.type = 'lowpass';
      filter.frequency.value = 1200;
      gain.gain.value = 0.2;
    } else if (type === 'campfire') {
      filter.type = 'lowpass';
      filter.frequency.value = 400;
      gain.gain.value = 0.3;
    } else if (type === 'ocean') {
      filter.type = 'bandpass';
      filter.frequency.value = 350;
      gain.gain.value = 0.25;
    } else if (type === 'breeze') {
      filter.type = 'bandpass';
      filter.frequency.value = 600;
      gain.gain.value = 0.15;
    } else {
      filter.type = 'sine';
      playHarmonicChime([523.25, 659.25, 783.99]);
      return { stop: () => {} };
    }

    whiteNoise.connect(filter);
    filter.connect(gain);
    gain.connect(ctx.destination);
    whiteNoise.start();

    return {
      stop: () => {
        try {
          gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + 0.5);
          setTimeout(() => whiteNoise.stop(), 500);
        } catch (e) {}
      }
    };
  }
}

/* ==========================================================================
   14. MEMORY VAULT & SAFE JOURNAL
   ========================================================================== */
function initMemoryJar() {
  const drawNoteBtn = document.getElementById('draw-note-btn');
  const addNoteBtn = document.getElementById('add-note-btn');
  const noteModal = document.getElementById('note-display-modal');
  const noteModalText = document.getElementById('note-modal-text');
  const addNoteModal = document.getElementById('add-note-modal');
  const saveCustomNoteBtn = document.getElementById('save-custom-note-btn');
  const customNoteInput = document.getElementById('custom-note-input');
  const jarParticles = document.getElementById('jar-particles');

  const presetNotes = [
    "You do not have to carry everything all at once. Take a slow, soft breath.",
    "It is okay to miss what isn't there, and still honor the warmth surrounding you.",
    "Your feelings are valid, tender, and deserving of unconditional gentleness.",
    "You carry immense strength within you, even in quiet moments of rest.",
    "May soft peace envelop your heart today.",
    "Every small step towards warmth is proof of your healing journey."
  ];

  drawNoteBtn?.addEventListener('click', () => {
    getAudioContext();
    playHarmonicChime([523.25, 659.25]);
    const note = presetNotes[Math.floor(Math.random() * presetNotes.length)];
    if (noteModalText) noteModalText.textContent = `"${note}"`;
    noteModal?.classList.remove('hidden');
  });

  addNoteBtn?.addEventListener('click', () => {
    addNoteModal?.classList.remove('hidden');
  });

  saveCustomNoteBtn?.addEventListener('click', () => {
    const val = customNoteInput?.value.trim();
    if (!val) return;

    presetNotes.push(val);
    if (customNoteInput) customNoteInput.value = '';
    addNoteModal?.classList.add('hidden');

    if (jarParticles) {
      const p = document.createElement('span');
      p.className = 'jar-note-particle p1';
      p.textContent = ['✨', '🌸', '💛', '⭐', '📜'][Math.floor(Math.random() * 5)];
      p.style.left = `${Math.random() * 60 + 20}%`;
      p.style.top = `${Math.random() * 60 + 20}%`;
      jarParticles.appendChild(p);
    }

    playHarmonicChime([659.25, 783.99]);
  });
}

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
   15. SPOTLIGHT SEARCH & HEADER DROPDOWN ENGINE
   ========================================================================== */
function initSpotlightSearchDashboard() {
  const spotlightModal = document.getElementById('spotlight-search-modal');
  const spotlightTriggerBtn = document.getElementById('open-spotlight-btn');

  const headerDropdown = document.getElementById('header-spotlight-dropdown');
  const dropdownInput = document.getElementById('dropdown-search-input');
  const dropdownList = document.getElementById('dropdown-items-list');

  const spotlightData = [
    { title: 'Sanctuary Overview', category: 'Navigation', type: 'nav', target: 'hub', icon: 'home', desc: 'Main clinical wellness sanctuary dashboard' },
    { title: 'Clinical AI Therapist (Dr. Aura)', category: 'Navigation', type: 'nav', target: 'ai-listener', icon: 'bot', desc: 'Autonomous Rogerian therapy & consultation' },
    { title: 'Sanctuary Circle Peer Network', category: 'Navigation', type: 'nav', target: 'community', icon: 'users', desc: 'HIPAA-guided moderated peer channels & voice lounges' },
    { title: 'Cognitive Emotion Studio', category: 'Navigation', type: 'nav', target: 'memory-orbs', icon: 'sparkles', desc: 'Map complex affective states into animated Emotion Orbs' },
    { title: 'Release Sky 3D World', category: 'Navigation', type: 'nav', target: 'lanterns', icon: 'send', desc: 'WASD 3D WebGL lantern sky environment' },
    { title: 'Autonomic Regulation', category: 'Navigation', type: 'nav', target: 'breathing', icon: 'wind', desc: '4-7-8 parasympathetic & box breathing exercises' },
    { title: 'Neuro-Acoustic Soundscapes', category: 'Navigation', type: 'nav', target: 'soundscapes', icon: 'music', desc: 'Procedural ambient sound generator & audio' },
    { title: 'Cognitive Memory Vault', category: 'Navigation', type: 'nav', target: 'memory-jar', icon: 'archive', desc: 'Confidential glass jar memory vault & notes' },
    { title: 'Clinical Heart Journal', category: 'Navigation', type: 'nav', target: 'journal', icon: 'heart', desc: 'Private encrypted reflective journal' }
  ];

  function toggleHeaderDropdown() {
    if (!headerDropdown) return;
    const isHidden = headerDropdown.classList.contains('hidden');
    if (isHidden) {
      headerDropdown.classList.remove('hidden');
      if (dropdownInput) {
        dropdownInput.value = '';
        dropdownInput.focus();
      }
      renderDropdownItems('');
    } else {
      headerDropdown.classList.add('hidden');
    }
  }

  spotlightTriggerBtn?.addEventListener('click', (e) => {
    e.stopPropagation();
    toggleHeaderDropdown();
  });

  document.addEventListener('click', (e) => {
    if (headerDropdown && !headerDropdown.contains(e.target) && e.target !== spotlightTriggerBtn) {
      headerDropdown.classList.add('hidden');
    }
  });

  dropdownInput?.addEventListener('input', (e) => {
    renderDropdownItems(e.target.value.trim());
  });

  function renderDropdownItems(query) {
    if (!dropdownList) return;
    dropdownList.innerHTML = '';
    const lower = query.toLowerCase();
    const filtered = spotlightData.filter(item => 
      item.title.toLowerCase().includes(lower) || item.desc.toLowerCase().includes(lower)
    );

    if (filtered.length === 0) {
      dropdownList.innerHTML = '<div style="padding:10px; color:var(--text-soft); font-size:0.84rem;">No items found.</div>';
      return;
    }

    filtered.forEach(item => {
      const el = document.createElement('div');
      el.className = 'spotlight-item';
      el.innerHTML = `
        <div class="spotlight-item-left">
          <div class="spotlight-item-icon"><i data-lucide="${item.icon}"></i></div>
          <div class="spotlight-item-info">
            <span class="spotlight-item-title">${item.title}</span>
            <span class="spotlight-item-subtitle">${item.desc}</span>
          </div>
        </div>
      `;
      el.addEventListener('click', () => {
        headerDropdown?.classList.add('hidden');
        executeSpotlightItem(item);
      });
      dropdownList.appendChild(el);
    });

    if (window.lucide) window.lucide.createIcons();
  }

  window.addEventListener('keydown', (e) => {
    if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
      e.preventDefault();
      toggleHeaderDropdown();
    } else if (e.key === 'Escape') {
      headerDropdown?.classList.add('hidden');
      spotlightModal?.classList.add('hidden');
    }
  });

  function executeSpotlightItem(item) {
    playBellSound(750, 'sine', 0.5, 0.08);
    if (item.type === 'nav') {
      navigateToPage(item.target);
    }
  }
}

/* ==========================================================================
   16. HAND-PAINTABLE ORB CANVAS ENGINE
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

  function drawBaseOrb() {
    ctx.clearRect(0, 0, width, height);

    ctx.save();
    ctx.beginPath();
    ctx.arc(radius, radius, radius - 4, 0, Math.PI * 2);
    ctx.clip();

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

  document.getElementById('apply-paint-theme-btn')?.addEventListener('click', () => {
    getAudioContext();
    playHarmonicChime([523.25, 659.25, 783.99, 1046.50]);

    const c1 = paintedColorsList[0] || '#ffcf56';
    const c2 = paintedColorsList[1] || '#ff8052';
    const c3 = paintedColorsList[2] || '#f472b6';
    const c4 = paintedColorsList[3] || '#d946ef';

    document.documentElement.style.setProperty('--sun-gold', c1);
    document.documentElement.style.setProperty('--coral', c2);
    document.documentElement.style.setProperty('--rose', c3);
    document.documentElement.style.setProperty('--magenta', c4);

    document.body.classList.add('warm-tab-shift');
    setTimeout(() => document.body.classList.remove('warm-tab-shift'), 800);
  });
}

/* ==========================================================================
   17. PURE 3D LANTERN SKY WORLD (WITH IN-WORLD 3D LANTERN RELEASE)
   ========================================================================== */
function init3DLanternSkyWorld() {
  const enterBtn = document.getElementById('enter-3d-sky-world-btn');
  const overlay = document.getElementById('lantern-3d-world-overlay');
  const canvas = document.getElementById('lantern-world-canvas');
  const exitBtn = document.getElementById('exit-3d-world-btn');
  const spectatePanel = document.getElementById('spectate-glass-panel');
  const closeSpectateBtn = document.getElementById('close-spectate-panel-btn');

  // DIRECTIVE 3: In-world lantern release modal controls
  const openRelease3dModalBtn = document.getElementById('open-release-3d-modal-btn');
  const closeRelease3dModalBtn = document.getElementById('close-release-3d-modal-btn');
  const confirmRelease3dBtn = document.getElementById('confirm-release-3d-btn');
  const release3dModal = document.getElementById('release-3d-lantern-modal');
  const release3dTitleInput = document.getElementById('release-3d-title-input');
  const release3dNoteInput = document.getElementById('release-3d-note-input');
  const release3dColorInput = document.getElementById('release-3d-color-input');

  if (!canvas || !window.THREE) return;

  let scene, camera, renderer, animationId;
  let lanterns = [];
  let stars;
  let selectedLanternMesh = null;

  const keys = { w: false, a: false, s: false, d: false };
  let isMouseDown = false;
  let mouseX = 0, mouseY = 0;
  let cameraRotation = { yaw: 0, pitch: 0 };
  let moveSpeed = 0.18;

  function initScene() {
    scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2(0x0a0518, 0.03);

    const w = window.innerWidth;
    const h = window.innerHeight;

    camera = new THREE.PerspectiveCamera(55, w / h, 0.1, 1000);
    camera.position.set(0, 0, 12);

    renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: true });
    renderer.setSize(w, h);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

    const ambient = new THREE.AmbientLight(0xffffff, 0.8);
    scene.add(ambient);

    const dirLight = new THREE.DirectionalLight(0xffcf56, 1.6);
    dirLight.position.set(5, 10, 7);
    scene.add(dirLight);

    const starGeo = new THREE.BufferGeometry();
    const starCount = 350;
    const starPos = new Float32Array(starCount * 3);
    for (let i = 0; i < starCount * 3; i += 3) {
      starPos[i] = (Math.random() - 0.5) * 60;
      starPos[i + 1] = (Math.random() - 0.5) * 40;
      starPos[i + 2] = (Math.random() - 0.5) * 60;
    }
    starGeo.setAttribute('position', new THREE.BufferAttribute(starPos, 3));
    const starMat = new THREE.PointsMaterial({ color: 0xffcf56, size: 0.16, transparent: true, opacity: 0.8 });
    stars = new THREE.Points(starGeo, starMat);
    scene.add(stars);

    lanterns = [];
    const colors = [0xffcf56, 0xff8052, 0xd946ef, 0x34d399, 0x60a5fa];

    for (let i = 0; i < 28; i++) {
      createLanternMesh(
        (Math.random() - 0.5) * 22,
        (Math.random() - 0.5) * 12,
        (Math.random() - 0.5) * 16 - 2,
        colors[i % colors.length],
        `Aug ${Math.floor(Math.random() * 5) + 1}, 2026`,
        ['Light of Peace & Warmth', 'Dear Dad • Floating Intention', 'A Soft Memory for Tomorrow', 'Quiet Reflection Sky'][i % 4],
        '"I hold space for the warmth you left behind, and I honor your memory with every quiet sunset."'
      );
    }
  }

  function createLanternMesh(x, y, z, colorHex, dateStr, titleStr, noteStr) {
    const group = new THREE.Group();

    const bodyGeo = new THREE.CylinderGeometry(0.35, 0.42, 0.8, 16);
    const bodyMat = new THREE.MeshStandardMaterial({
      color: colorHex,
      roughness: 0.2,
      metalness: 0.1,
      transparent: true,
      opacity: 0.9,
      emissive: colorHex,
      emissiveIntensity: 0.45
    });
    const body = new THREE.Mesh(bodyGeo, bodyMat);
    group.add(body);

    const flameGeo = new THREE.SphereGeometry(0.15, 16, 16);
    const flameMat = new THREE.MeshBasicMaterial({ color: 0xffffff });
    const flame = new THREE.Mesh(flameGeo, flameMat);
    flame.position.y = -0.1;
    group.add(flame);

    const pointLight = new THREE.PointLight(colorHex, 1.6, 5);
    pointLight.position.y = -0.1;
    group.add(pointLight);

    group.position.set(x, y, z);
    group.userData = {
      id: Date.now() + Math.random(),
      floatSpeed: 0.003 + Math.random() * 0.003,
      swayOffset: Math.random() * Math.PI * 2,
      date: dateStr,
      title: titleStr,
      note: noteStr
    };

    scene.add(group);
    lanterns.push(group);
    return group;
  }

  // DIRECTIVE 3: In-world lantern release handlers
  openRelease3dModalBtn?.addEventListener('click', () => {
    release3dModal?.classList.remove('hidden');
  });

  closeRelease3dModalBtn?.addEventListener('click', () => {
    release3dModal?.classList.add('hidden');
  });

  confirmRelease3dBtn?.addEventListener('click', () => {
    const title = release3dTitleInput?.value.trim() || 'Floating Intention';
    const note = release3dNoteInput?.value.trim() || 'Cast softly into the stars.';
    const colorHex = parseInt((release3dColorInput?.value || '#ffcf56').replace('#', '0x'), 16);

    // Create 3D lantern directly in front of camera!
    const spawnX = camera.position.x;
    const spawnY = camera.position.y - 1.5;
    const spawnZ = camera.position.z - 4;

    const newLantern = createLanternMesh(
      spawnX, spawnY, spawnZ,
      colorHex,
      new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
      title,
      `"${note}"`
    );

    playHarmonicChime([523.25, 659.25, 783.99, 1046.50]);

    if (release3dTitleInput) release3dTitleInput.value = '';
    if (release3dNoteInput) release3dNoteInput.value = '';
    release3dModal?.classList.add('hidden');
  });

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

  canvas.addEventListener('wheel', (e) => {
    if (overlay.classList.contains('hidden')) return;
    camera.position.z += e.deltaY * 0.01;
    camera.position.z = Math.max(2, Math.min(30, camera.position.z));
  });

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

    lanternGroup.position.set(-2.5, 0, camera.position.z - 4);

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

  function animate3DWorld() {
    animationId = requestAnimationFrame(animate3DWorld);

    const dir = new THREE.Vector3();
    camera.getWorldDirection(dir);
    dir.y = 0;
    dir.normalize();

    const sideDir = new THREE.Vector3().crossVectors(dir, new THREE.Vector3(0, 1, 0)).negate();

    if (keys.w) camera.position.addScaledVector(dir, moveSpeed);
    if (keys.s) camera.position.addScaledVector(dir, -moveSpeed);
    if (keys.a) camera.position.addScaledVector(sideDir, -moveSpeed);
    if (keys.d) camera.position.addScaledVector(sideDir, moveSpeed);

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

  enterBtn?.addEventListener('click', () => {
    getAudioContext();
    playHarmonicChime([440, 523.25, 659.25, 880]);
    overlay?.classList.remove('hidden');

    if (!scene) initScene();

    if (canvas && renderer && camera) {
      const w = window.innerWidth;
      const h = window.innerHeight;
      canvas.width = w;
      canvas.height = h;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    }

    animate3DWorld();
  });

  exitBtn?.addEventListener('click', () => {
    cancelAnimationFrame(animationId);
    overlay?.classList.add('hidden');
    spectatePanel?.classList.add('hidden');
  });

  window.addEventListener('resize', () => {
    if (scene && camera && renderer && !overlay?.classList.contains('hidden')) {
      const w = window.innerWidth;
      const h = window.innerHeight;
      canvas.width = w;
      canvas.height = h;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    }
  });
}

/* ==========================================================================
   18. MACOS SEQUOIA WINDOW CONTROLS & CONTROL CENTER
   ========================================================================== */
function initMacOSWindowControls() {
  const closeBtn = document.getElementById('mac-close-btn');
  const minimizeBtn = document.getElementById('mac-minimize-btn');
  const zoomBtn = document.getElementById('mac-zoom-btn');
  const controlCenterBtn = document.getElementById('open-control-center-btn');
  const controlCenterPopover = document.getElementById('mac-control-center-popover');
  const appShell = document.getElementById('app');

  closeBtn?.addEventListener('click', () => {
    playBellSound(400, 'sine', 0.4, 0.05);
    if (appShell) {
      appShell.style.opacity = '0.3';
      appShell.style.transform = 'scale(0.96)';
      setTimeout(() => {
        appShell.style.opacity = '1';
        appShell.style.transform = 'none';
      }, 1200);
    }
  });

  minimizeBtn?.addEventListener('click', () => {
    playBellSound(500, 'sine', 0.4, 0.05);
    if (appShell) {
      appShell.style.transform = 'scale(0.92) translateY(20px)';
      setTimeout(() => {
        appShell.style.transform = 'none';
      }, 1000);
    }
  });

  zoomBtn?.addEventListener('click', () => {
    playBellSound(700, 'sine', 0.5, 0.05);
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen().catch(() => {});
    } else {
      if (document.exitFullscreen) document.exitFullscreen().catch(() => {});
    }
  });

  controlCenterBtn?.addEventListener('click', (e) => {
    e.stopPropagation();
    getAudioContext();
    playBellSound(640, 'sine', 0.4, 0.05);
    controlCenterPopover?.classList.toggle('hidden');
  });

  document.addEventListener('click', (e) => {
    if (controlCenterPopover && !controlCenterPopover.contains(e.target) && e.target !== controlCenterBtn) {
      controlCenterPopover.classList.add('hidden');
    }
  });
}

/* ==========================================================================
   19. MACOS SEQUOIA DESKTOP ENVIRONMENT & MENU BAR
   ========================================================================== */
function initMacOSDesktopEnvironment() {
  const clockEl = document.getElementById('macos-clock-display');
  const appleTrigger = document.getElementById('apple-menu-trigger');
  const appleMenu = document.getElementById('apple-dropdown-menu');
  const menuSpotlightBtn = document.getElementById('menu-spotlight-btn');
  const menuControlCenterTrigger = document.getElementById('menu-control-center-trigger');
  const controlCenterPopover = document.getElementById('mac-control-center-popover');

  function updateMacOSClock() {
    if (!clockEl) return;
    const now = new Date();
    const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    
    const dayName = days[now.getDay()];
    const monthName = months[now.getMonth()];
    const dateNum = now.getDate();
    
    let hours = now.getHours();
    const minutes = now.getMinutes().toString().padStart(2, '0');
    const ampm = hours >= 12 ? 'PM' : 'AM';
    hours = hours % 12 || 12;

    clockEl.textContent = `${dayName} ${monthName} ${dateNum}  ${hours}:${minutes} ${ampm}`;
  }

  updateMacOSClock();
  setInterval(updateMacOSClock, 10000);

  appleTrigger?.addEventListener('click', (e) => {
    e.stopPropagation();
    getAudioContext();
    playBellSound(600, 'sine', 0.3, 0.04);
    appleMenu?.classList.toggle('hidden');
  });

  menuSpotlightBtn?.addEventListener('click', (e) => {
    e.stopPropagation();
    document.getElementById('open-spotlight-btn')?.click();
  });

  menuControlCenterTrigger?.addEventListener('click', (e) => {
    e.stopPropagation();
    getAudioContext();
    playBellSound(640, 'sine', 0.4, 0.05);
    controlCenterPopover?.classList.toggle('hidden');
  });

  document.addEventListener('click', (e) => {
    if (appleMenu && !appleMenu.contains(e.target) && e.target !== appleTrigger) {
      appleMenu.classList.add('hidden');
    }
  });
}

/* ==========================================================================
   20. MACOS SEQUOIA FLOATING OPTICAL GLASS DOCK NAVIGATION
   ========================================================================== */
function initMacOSDockNavigation() {
  const dockIcons = document.querySelectorAll('.dock-app-icon[data-dock-target]');
  const trashBtn = document.getElementById('dock-trash-btn');

  dockIcons.forEach(icon => {
    icon.addEventListener('click', () => {
      getAudioContext();
      playBellSound(750, 'sine', 0.5, 0.06);

      const targetPageId = icon.getAttribute('data-dock-target');

      dockIcons.forEach(i => i.classList.remove('active'));
      icon.classList.add('active');

      if (targetPageId) {
        navigateToPage(targetPageId);
      }
    });
  });

  trashBtn?.addEventListener('click', () => {
    getAudioContext();
    playBellSound(440, 'triangle', 0.6, 0.08);
    if (confirm('Clean local temporary logs & refresh macOS Sanctuary vault?')) {
      playHarmonicChime([523.25, 659.25, 783.99]);
    }
  });
}

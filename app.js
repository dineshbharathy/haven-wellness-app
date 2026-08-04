/* ==========================================================================
   HAVEN SANCTUARY — APPLE-GRADE CLINICAL SANCTUARY ENGINE
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
  initDesktopResolutionDetector();
  initAudioEngine();
  initThemeManager();
  initUniversalModalHandlers();
  initDesktopTabNavigation();
  initAmbientCanvas();
  initSanctuaryHub();
  initAutonomousAITherapistAura();
  initSanctuaryCircleCommunity();
  initAppleCallEngine();
  initEmotionStudio2D();
  initSkyLanterns2DCanvas();
  initBreathingOasis2D();
  initAudioSpectrumBars();
  initSoundscapes();
  initMemoryJar();
  initSafeJournal();
  initAuthSurveyFlow();

  // Micro-Subtle Card Tilt Physics
  initSubtle3DCardPhysics();
});

/* ==========================================================================
   1. UNIVERSAL MODAL SYSTEM & GLASS OVERLAY HANDLERS
   ========================================================================== */
function initUniversalModalHandlers() {
  // Close modal on click of .modal-close-btn
  document.querySelectorAll('.modal-close-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const modalId = btn.getAttribute('data-modal');
      if (modalId) {
        document.getElementById(modalId)?.classList.add('hidden');
      } else {
        btn.closest('.modal-overlay')?.classList.add('hidden');
      }
    });
  });

  // Close modal when clicking backdrop outside sheet
  document.querySelectorAll('.modal-overlay').forEach(overlay => {
    overlay.addEventListener('click', (e) => {
      if (e.target === overlay && overlay.id !== 'apple-call-overlay') {
        overlay.classList.add('hidden');
      }
    });
  });
}

/* ==========================================================================
   2. CALM MICRO-SUBTLE CARD TILT PHYSICS ENGINE (APPLE SPEC)
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

      const rotateX = ((y - centerY) / centerY) * -1.8;
      const rotateY = ((x - centerX) / centerX) * 1.8;

      card.style.transform = `perspective(1200px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-2px)`;
    });

    card.addEventListener('mouseleave', () => {
      card.style.transform = `perspective(1200px) rotateX(0deg) rotateY(0deg) translateY(0px)`;
    });
  });
}

/* ==========================================================================
   3. DESKTOP RESOLUTION & RESPONSIVE LAYOUT ENGINE
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
   4. DESKTOP TAB NAVIGATION ENGINE
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
   5. WEB AUDIO SYNTHESIS ENGINE (HAPTIC AUDIO FEEDBACK)
   ========================================================================== */
let audioCtx = null;
let soundNodes = {};
let masterGainNode = null;

function getAudioContext() {
  if (!audioCtx) {
    audioCtx = new (window.AudioContext || window.webkitAudioContext)();
    masterGainNode = audioCtx.createGain();
    masterGainNode.gain.setValueAtTime(0.7, audioCtx.currentTime);
    masterGainNode.connect(audioCtx.destination);
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
    gain.connect(masterGainNode || ctx.destination);

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
   6. THEME MANAGER
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
   7. ATMOSPHERIC BACKGROUND PARTICLES (2D CANVAS)
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
   8. SANCTUARY HUB
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
   9. AI THERAPIST (DR. AURA) - ANIMATED 2D ORB + SPEECH SYNTH
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
    toggleSpeechBtn.style.opacity = speechSynthEnabled ? '1' : '0.5';
    playBellSound(580, 'sine', 0.4, 0.05);
  });

  startListenBtn?.addEventListener('click', () => {
    getAudioContext();
    isListening = !isListening;
    if (isListening) {
      if (statusText) statusText.textContent = 'Dr. Aura is listening in active reflection mode...';
      if (startListenBtn) startListenBtn.textContent = '⏹ Listening... Speak Now';
      if (auraCore) auraCore.style.animation = 'auraPulse 1s ease-in-out infinite alternate';
      playHarmonicChime([523.25, 659.25]);

      // Web Speech API recognition fallback
      if ('webkitSpeechRecognition' in window || 'SpeechRecognition' in window) {
        try {
          const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
          const recognition = new SpeechRecognition();
          recognition.onresult = (event) => {
            const transcript = event.results[0][0].transcript;
            if (textInput) textInput.value = transcript;
            handleSendMessage();
            isListening = false;
            if (startListenBtn) startListenBtn.textContent = '🎙️ Tap to Speak with Dr. Aura';
          };
          recognition.start();
        } catch (e) {}
      }
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

      if (speechSynthEnabled && 'speechSynthesis' in window) {
        try {
          window.speechSynthesis.cancel();
          const utterance = new SpeechSynthesisUtterance(resp);
          utterance.pitch = 1.05;
          utterance.rate = 0.95;
          window.speechSynthesis.speak(utterance);
        } catch (e) {}
      }
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
   10. SANCTUARY CIRCLE COMMUNITY & PEER CHAT
   ========================================================================== */
function initSanctuaryCircleCommunity() {
  const channelBtns = document.querySelectorAll('.channel-btn[data-channel]');
  const messagesBox = document.getElementById('discord-messages-box');
  const chatInput = document.getElementById('discord-chat-input');
  const sendBtn = document.getElementById('send-discord-msg-btn');
  const channelTitle = document.getElementById('current-channel-title');
  const channelDesc = document.getElementById('current-channel-desc');
  const voiceBanner = document.getElementById('voice-lounge-banner');
  const toggleVoiceBtn = document.getElementById('toggle-voice-connect-btn');
  const friendsList = document.getElementById('online-friends-list');
  const addFriendModal = document.getElementById('add-friend-modal');
  const openAddFriendBtn = document.getElementById('open-add-friend-modal-btn');
  const confirmAddFriendBtn = document.getElementById('confirm-add-friend-btn');
  const friendHandleInput = document.getElementById('friend-input-handle');

  const channelData = {
    'general': {
      title: '# general-sanctuary',
      desc: 'A gentle, supportive space for peer reflection and comfort.',
      messages: [
        { name: 'Sophia', tag: 'Peer Mentor', tagColor: '#d946ef', avatar: '🌸', text: 'Good evening everyone. Sending a gentle reminder to pause and take a soft breath.' },
        { name: 'Marcus', tag: 'Safe Voice', tagColor: '#34d399', avatar: '🌿', text: 'Appreciate being here. Had a heavy day missing my family, but reading quotes here helped.' }
      ]
    },
    'family-longing': {
      title: '# family-and-longing',
      desc: 'Dedicated safe space for expressing feelings about parental detachment and missing loved ones.',
      messages: [
        { name: 'Aria', tag: 'Support Peer', tagColor: '#ff8052', avatar: '🕯️', text: 'It\'s okay to hold love for parents while protecting your inner peace.' },
        { name: 'David', tag: 'Safe Voice', tagColor: '#ffcf56', avatar: '📜', text: 'Writing in the Sky Lantern vault really helped me process missing my dad today.' }
      ]
    },
    'daily-wins': {
      title: '# daily-wins-and-warmth',
      desc: 'Celebrate small steps, self-compassion milestones, and comforting moments.',
      messages: [
        { name: 'Elena', tag: 'Peer Mentor', tagColor: '#d946ef', avatar: '✨', text: 'Small win: I drank warm tea, listened to ocean soundscapes, and didn\'t rush myself.' }
      ]
    }
  };

  let activeChannel = 'general';

  function renderChannel(channelKey) {
    activeChannel = channelKey;
    const data = channelData[channelKey];
    if (!data) return;

    if (channelTitle) channelTitle.textContent = data.title;
    if (channelDesc) channelDesc.textContent = data.desc;
    if (chatInput) chatInput.placeholder = `Message ${data.title}... Share safely.`;

    if (!messagesBox) return;
    messagesBox.innerHTML = '';

    data.messages.forEach(msg => {
      const msgItem = document.createElement('div');
      msgItem.className = 'peer-msg-item';
      msgItem.innerHTML = `
        <div class="peer-avatar">${msg.avatar}</div>
        <div class="peer-msg-content">
          <div class="peer-msg-header">
            <span class="peer-name">${msg.name}</span>
            <span class="peer-tag" style="background: ${msg.tagColor}">${msg.tag}</span>
            <span class="peer-time">Today at ${new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
          </div>
          <div class="peer-bubble">${msg.text}</div>
        </div>
      `;
      messagesBox.appendChild(msgItem);
    });
    messagesBox.scrollTop = messagesBox.scrollHeight;
  }

  renderChannel('general');

  channelBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      getAudioContext();
      const channel = btn.getAttribute('data-channel');
      if (channel === 'voice-lounge') {
        toggleVoiceBanner(true);
      } else {
        channelBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        renderChannel(channel);
      }
      playBellSound(540, 'sine', 0.4, 0.06);
    });
  });

  function handleSendPeerMessage() {
    if (!chatInput) return;
    const text = chatInput.value.trim();
    if (!text) return;

    const myName = localStorage.getItem('haven_username') || 'You';
    channelData[activeChannel].messages.push({
      name: myName,
      tag: 'Sanctuary Member',
      tagColor: '#d946ef',
      avatar: '🤍',
      text: text
    });

    renderChannel(activeChannel);
    chatInput.value = '';
    playBellSound(660, 'sine', 0.5, 0.08);
  }

  sendBtn?.addEventListener('click', handleSendPeerMessage);
  chatInput?.addEventListener('keydown', (e) => { if (e.key === 'Enter') handleSendPeerMessage(); });

  let inVoice = false;
  function toggleVoiceBanner(show) {
    inVoice = show;
    if (voiceBanner) voiceBanner.classList.toggle('hidden', !inVoice);
    if (inVoice) {
      playHarmonicChime([440, 523.25, 659.25]);
    }
  }

  toggleVoiceBtn?.addEventListener('click', () => {
    toggleVoiceBanner(false);
  });

  // Friends Sidebar
  const onlinePeers = [
    { name: 'Sophia 🌸', status: 'In Voice Lounge', avatar: '🌸' },
    { name: 'Marcus 🌿', status: 'Listening to Soundscapes', avatar: '🌿' },
    { name: 'Aria 🕯️', status: 'Writing Sky Lanterns', avatar: '🕯️' }
  ];

  function renderFriends() {
    if (!friendsList) return;
    friendsList.innerHTML = '';
    onlinePeers.forEach((p, idx) => {
      const item = document.createElement('div');
      item.className = 'ios-list-row';
      item.style.padding = '8px 4px';
      item.innerHTML = `
        <span class="row-icon">${p.avatar}</span>
        <div class="row-info">
          <span class="row-title">${p.name}</span>
          <span class="row-subtitle">${p.status}</span>
        </div>
        <button class="call-peer-btn ios-icon-btn small-btn" data-peer-idx="${idx}" title="Voice Call">📞</button>
      `;
      friendsList.appendChild(item);
    });

    document.querySelectorAll('.call-peer-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        const idx = btn.getAttribute('data-peer-idx');
        const peer = onlinePeers[idx];
        if (peer) triggerAppleCall(peer.name, peer.avatar);
      });
    });
  }
  renderFriends();

  openAddFriendBtn?.addEventListener('click', () => addFriendModal?.classList.remove('hidden'));
  confirmAddFriendBtn?.addEventListener('click', () => {
    const handle = friendHandleInput?.value.trim();
    if (!handle) return;
    onlinePeers.push({ name: `${handle} ✨`, status: 'Online & Safe', avatar: '✨' });
    renderFriends();
    if (friendHandleInput) friendHandleInput.value = '';
    addFriendModal?.classList.add('hidden');
    playBellSound(700, 'sine', 0.6, 0.08);
  });
}

/* ==========================================================================
   11. APPLE CALL ENGINE
   ========================================================================== */
function initAppleCallEngine() {
  const overlay = document.getElementById('apple-call-overlay');
  const callerNameEl = document.getElementById('apple-caller-name');
  const callerAvatarEl = document.getElementById('apple-caller-avatar');
  const statusEl = document.getElementById('apple-call-status');
  const acceptBtn = document.getElementById('apple-accept-btn');
  const declineBtn = document.getElementById('apple-decline-btn');
  const endBtn = document.getElementById('apple-end-btn');
  const incomingActions = document.getElementById('apple-incoming-actions');
  const activeActions = document.getElementById('apple-active-actions');

  window.triggerAppleCall = function(name = 'Sophia 🌸', avatar = '🌸') {
    getAudioContext();
    if (callerNameEl) callerNameEl.textContent = name;
    if (callerAvatarEl) callerAvatarEl.textContent = avatar;
    if (statusEl) statusEl.textContent = 'Haven Sanctuary Voice Call...';

    incomingActions?.classList.remove('hidden');
    activeActions?.classList.add('hidden');
    overlay?.classList.remove('hidden');

    playHarmonicChime([523.25, 659.25, 783.99]);
  };

  acceptBtn?.addEventListener('click', () => {
    getAudioContext();
    if (statusEl) statusEl.textContent = '00:01 • Connected & Encrypted';
    incomingActions?.classList.add('hidden');
    activeActions?.classList.remove('hidden');
    playBellSound(880, 'sine', 0.5, 0.1);
  });

  declineBtn?.addEventListener('click', closeCall);
  endBtn?.addEventListener('click', closeCall);

  function closeCall() {
    overlay?.classList.add('hidden');
    playBellSound(330, 'sine', 0.4, 0.08);
  }
}

/* ==========================================================================
   12. EMOTION STUDIO - 2D ORB CUSTOMIZATION & STORYBOOK READER
   ========================================================================== */
let archivedOrbs = [
  {
    title: 'Peaceful Sunset Reflection',
    date: 'Aug 4, 2026',
    c1: '#ffcf56',
    c2: '#d946ef',
    note: 'Spent a quiet evening drinking chamomile tea while reflecting on happy memories with my family.',
    emotions: { joy: 60, sadness: 20, nostalgia: 50 },
    photo: ''
  }
];
let currentBookPage = 0;

function initEmotionStudio2D() {
  const cssOrb = document.getElementById('css-orb');
  const primaryColorInput = document.getElementById('orb-primary-color');
  const secondaryColorInput = document.getElementById('orb-secondary-color');
  const speedSlider = document.getElementById('orb-glow-intensity');
  const paletteBtns = document.querySelectorAll('.palette-swatch-btn');
  const segmentedBtns = document.querySelectorAll('[data-orb-view]');
  const subviews = document.querySelectorAll('.orb-subview');

  const titleInput = document.getElementById('orb-title-input');
  const noteInput = document.getElementById('orb-note-input');
  const photoInput = document.getElementById('orb-photo-input');
  const photoPreviewContainer = document.getElementById('photo-preview-container');
  const photoPreviewImg = document.getElementById('photo-preview-img');
  const removePhotoBtn = document.getElementById('remove-photo-btn');
  const saveOrbBtn = document.getElementById('save-memory-orb-btn');

  let currentPhotoData = '';

  segmentedBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const view = btn.getAttribute('data-orb-view');
      segmentedBtns.forEach(b => b.classList.remove('active'));
      subviews.forEach(s => s.classList.remove('active'));
      btn.classList.add('active');
      document.getElementById(`orb-view-${view}`)?.classList.add('active');
      if (view === 'storybook') updateStorybookPage();
      playBellSound(600, 'sine', 0.4, 0.05);
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

  photoInput?.addEventListener('change', (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (evt) => {
        currentPhotoData = evt.target.result;
        if (photoPreviewImg) photoPreviewImg.src = currentPhotoData;
        photoPreviewContainer?.classList.remove('hidden');
      };
      reader.readAsDataURL(file);
    }
  });

  removePhotoBtn?.addEventListener('click', () => {
    currentPhotoData = '';
    if (photoPreviewImg) photoPreviewImg.src = '';
    photoPreviewContainer?.classList.add('hidden');
    if (photoInput) photoInput.value = '';
  });

  saveOrbBtn?.addEventListener('click', () => {
    const title = titleInput?.value.trim() || 'Affective Memory Orb';
    const note = noteInput?.value.trim() || 'Logged in Haven Sanctuary.';
    const c1 = primaryColorInput?.value || '#ffcf56';
    const c2 = secondaryColorInput?.value || '#d946ef';

    archivedOrbs.unshift({
      title,
      date: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
      c1, c2,
      note,
      emotions: { joy: 50, nostalgia: 40 },
      photo: currentPhotoData
    });

    if (titleInput) titleInput.value = '';
    if (noteInput) noteInput.value = '';
    currentPhotoData = '';
    photoPreviewContainer?.classList.add('hidden');

    playHarmonicChime([523.25, 659.25, 783.99]);
    document.querySelector('[data-orb-view="storybook"]')?.click();
  });

  // Storybook Nav Controls
  document.getElementById('book-prev-btn')?.addEventListener('click', () => {
    if (currentBookPage > 0) {
      currentBookPage--;
      updateStorybookPage();
      playBellSound(540, 'sine', 0.4, 0.05);
    }
  });

  document.getElementById('book-next-btn')?.addEventListener('click', () => {
    if (currentBookPage < archivedOrbs.length - 1) {
      currentBookPage++;
      updateStorybookPage();
      playBellSound(540, 'sine', 0.4, 0.05);
    }
  });
}

function updateStorybookPage() {
  const indicator = document.getElementById('book-page-indicator');
  const orbDisplay = document.getElementById('book-page-orb');
  const dateTag = document.getElementById('book-page-date');
  const titleEl = document.getElementById('book-page-title');
  const textEl = document.getElementById('book-page-text');
  const photoContainer = document.getElementById('book-page-photo-container');
  const photoImg = document.getElementById('book-page-photo');

  if (archivedOrbs.length === 0) return;
  const item = archivedOrbs[currentBookPage];
  if (!item) return;

  if (indicator) indicator.textContent = `Page ${currentBookPage + 1} of ${archivedOrbs.length}`;
  if (orbDisplay) orbDisplay.style.background = `radial-gradient(circle at 35% 35%, #ffffff 0%, ${item.c1} 40%, ${item.c2} 100%)`;
  if (dateTag) dateTag.textContent = item.date;
  if (titleEl) titleEl.textContent = item.title;
  if (textEl) textEl.textContent = item.note;

  if (item.photo && photoImg) {
    photoImg.src = item.photo;
    photoContainer?.classList.remove('hidden');
  } else {
    photoContainer?.classList.add('hidden');
  }
}

/* ==========================================================================
   13. SKY LANTERNS - 2D ANIMATED CANVAS & VAULT GALLERY
   ========================================================================== */
let releasedLanterns = [
  { message: 'Dear Dad, I miss our weekend talks. Holding space for you tonight.', color: '#ffcf56', date: 'Aug 4, 2026' },
  { message: 'Wishing for gentle peace and rest for everyone carrying heavy hearts.', color: '#d946ef', date: 'Aug 4, 2026' }
];

function initSkyLanterns2DCanvas() {
  const canvas = document.getElementById('sky-2d-canvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');

  let width = canvas.width = canvas.parentElement?.clientWidth || 800;
  let height = canvas.height = canvas.parentElement?.clientHeight || 360;

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

      ctx.beginPath();
      ctx.roundRect(l.x - l.size / 2, l.y - l.size / 1.5, l.size, l.size * 1.3, 4);
      ctx.fillStyle = l.color;
      ctx.shadowColor = l.color;
      ctx.shadowBlur = 15;
      ctx.fill();
      ctx.shadowBlur = 0;

      ctx.beginPath();
      ctx.arc(l.x, l.y, l.size / 4, 0, Math.PI * 2);
      ctx.fillStyle = '#ffffff';
      ctx.fill();
    });

    requestAnimationFrame(draw);
  }
  draw();

  // Lantern Release & Modal Handlers
  const openModalBtn = document.getElementById('open-lantern-modal-btn');
  const lanternModal = document.getElementById('lantern-modal');
  const releaseConfirmBtn = document.getElementById('release-lantern-confirm-btn');
  const messageInput = document.getElementById('lantern-message');
  const countEl = document.getElementById('released-count');
  const galleryGrid = document.getElementById('lantern-gallery-grid');
  const datePills = document.querySelectorAll('.date-pill[data-date-filter]');

  openModalBtn?.addEventListener('click', () => lanternModal?.classList.remove('hidden'));

  function updateGallery(filter = 'all') {
    if (!galleryGrid) return;
    galleryGrid.innerHTML = '';
    if (countEl) countEl.textContent = `${releasedLanterns.length} lanterns floating`;

    releasedLanterns.forEach((l, idx) => {
      const item = document.createElement('div');
      item.className = 'ios-inset-box';
      item.style.cursor = 'pointer';
      item.innerHTML = `
        <div style="display: flex; justify-content: space-between; align-items: center;">
          <span style="color: ${l.color}; font-weight: 700; font-size: 0.8rem;">🏮 Lantern #${releasedLanterns.length - idx}</span>
          <span style="font-size: 0.7rem; color: var(--text-soft);">${l.date}</span>
        </div>
        <p style="margin-top: 6px; font-size: 0.86rem; color: var(--text);">${l.message.substring(0, 50)}...</p>
      `;
      item.addEventListener('click', () => {
        const viewModal = document.getElementById('view-lantern-modal');
        const viewMsg = document.getElementById('view-lantern-message');
        const viewDate = document.getElementById('view-lantern-date');
        const viewBadge = document.getElementById('view-lantern-color-badge');

        if (viewMsg) viewMsg.textContent = `"${l.message}"`;
        if (viewDate) viewDate.textContent = l.date;
        if (viewBadge) viewBadge.style.color = l.color;
        viewModal?.classList.remove('hidden');
      });
      galleryGrid.appendChild(item);
    });
  }

  updateGallery();

  releaseConfirmBtn?.addEventListener('click', () => {
    const text = messageInput?.value.trim();
    if (!text) return;
    const color = document.querySelector('input[name="lantern-color"]:checked')?.value || '#ffcf56';

    releasedLanterns.unshift({
      message: text,
      color,
      date: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
    });

    updateGallery();
    if (messageInput) messageInput.value = '';
    lanternModal?.classList.add('hidden');
    playHarmonicChime([523.25, 659.25, 783.99]);
  });

  datePills.forEach(pill => {
    pill.addEventListener('click', () => {
      datePills.forEach(p => p.classList.remove('active'));
      pill.classList.add('active');
      const filter = pill.getAttribute('data-date-filter');
      updateGallery(filter);
    });
  });
}

/* ==========================================================================
   14. BREATHING OASIS - 2D ANIMATION ENGINE
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
   15. AUDIO SPECTRUM BARS & REAL-TIME AUDIO GENERATOR
   ========================================================================== */
function initAudioSpectrumBars() {
  const masterBtn = document.getElementById('master-toggle-btn');
  const volumeSlider = document.getElementById('master-volume-slider');
  const bars = document.querySelectorAll('.spectrum-bars .bar');

  let isPlaying = false;
  let animId = null;

  volumeSlider?.addEventListener('input', (e) => {
    if (masterGainNode && audioCtx) {
      masterGainNode.gain.setValueAtTime(parseFloat(e.target.value), audioCtx.currentTime);
    }
  });

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
   16. NEURO-ACOUSTIC SOUNDSCAPES
   ========================================================================== */
function initSoundscapes() {
  const soundCards = document.querySelectorAll('.sound-card');

  soundCards.forEach(card => {
    const btn = card.querySelector('.sound-toggle-btn');
    const volSlider = card.querySelector('.sound-volume');
    const soundType = card.getAttribute('data-sound');
    let active = false;
    let osc = null;

    btn?.addEventListener('click', () => {
      getAudioContext();
      active = !active;
      btn.textContent = active ? '⏹' : '▶';
      btn.classList.toggle('active', active);

      if (active) {
        playBellSound(580, 'triangle', 0.8, 0.08);
      }
    });

    volSlider?.addEventListener('input', () => {
      if (active) playBellSound(440, 'sine', 0.2, 0.04);
    });
  });
}

/* ==========================================================================
   17. COGNITIVE MEMORY JAR
   ========================================================================== */
const comfortNotes = [
  "You carry immense strength within you, even on quiet days.",
  "Your feelings are valid and deserving of soft compassion.",
  "You are worthy of the same tender warmth you so generously give to others.",
  "Growth is not linear. Be gentle with your tender heart today.",
  "May you feel safe, appreciated, and deeply loved."
];

function initMemoryJar() {
  const drawBtn = document.getElementById('draw-note-btn');
  const addBtn = document.getElementById('add-note-btn');
  const displayModal = document.getElementById('note-display-modal');
  const displayText = document.getElementById('note-modal-text');
  const addModal = document.getElementById('add-note-modal');
  const saveCustomBtn = document.getElementById('save-custom-note-btn');
  const customInput = document.getElementById('custom-note-input');
  const jarParticles = document.getElementById('jar-particles');

  drawBtn?.addEventListener('click', () => {
    getAudioContext();
    const note = comfortNotes[Math.floor(Math.random() * comfortNotes.length)];
    if (displayText) displayText.textContent = `"${note}"`;
    displayModal?.classList.remove('hidden');
    playHarmonicChime([523.25, 659.25]);
  });

  addBtn?.addEventListener('click', () => {
    addModal?.classList.remove('hidden');
  });

  saveCustomBtn?.addEventListener('click', () => {
    const text = customInput?.value.trim();
    if (!text) return;

    comfortNotes.push(text);

    if (jarParticles) {
      const p = document.createElement('span');
      p.className = 'jar-note-particle';
      p.textContent = '📜';
      p.style.top = `${Math.random() * 60 + 10}%`;
      p.style.left = `${Math.random() * 60 + 10}%`;
      jarParticles.appendChild(p);
    }

    if (customInput) customInput.value = '';
    addModal?.classList.add('hidden');
    playHarmonicChime([523.25, 659.25, 783.99]);
  });
}

/* ==========================================================================
   18. AFFECTIVE HEART STATE CHECK-IN & SAFE JOURNAL
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

  function renderEntries() {
    if (!entriesList) return;
    const entries = JSON.parse(localStorage.getItem('haven_journal_entries') || '[]');
    entriesList.innerHTML = '';
    entries.forEach(e => {
      const item = document.createElement('div');
      item.className = 'ios-inset-box margin-top';
      item.innerHTML = `<strong>${e.title}</strong> (${e.date})<p>${e.body}</p>`;
      entriesList.appendChild(item);
    });
  }
  renderEntries();

  saveBtn?.addEventListener('click', () => {
    const title = titleInput?.value.trim() || 'Untitled Entry';
    const body = bodyInput?.value.trim();
    if (!body) return;

    const entries = JSON.parse(localStorage.getItem('haven_journal_entries') || '[]');
    entries.unshift({
      title,
      body,
      date: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
    });
    localStorage.setItem('haven_journal_entries', JSON.stringify(entries));

    renderEntries();
    if (titleInput) titleInput.value = '';
    if (bodyInput) bodyInput.value = '';
    playBellSound(750, 'sine', 0.8, 0.08);
  });
}

/* ==========================================================================
   19. AUTH SURVEY FLOW
   ========================================================================== */
function initAuthSurveyFlow() {
  const modal = document.getElementById('auth-survey-modal');
  const submitBtn = document.getElementById('auth-submit-btn');
  const usernameInput = document.getElementById('survey-username');
  const struggleSelect = document.getElementById('survey-struggle-select');
  const headerUserTag = document.querySelector('.header-user-tag');
  const circleMyUsername = document.getElementById('circle-my-username');
  const circleMyStruggle = document.getElementById('circle-my-struggle');

  const savedName = localStorage.getItem('haven_username');
  const savedStruggle = localStorage.getItem('haven_struggle');

  if (savedName) {
    if (headerUserTag) headerUserTag.textContent = `👤 ${savedName}`;
    if (circleMyUsername) circleMyUsername.textContent = savedName;
    if (circleMyStruggle && savedStruggle) circleMyStruggle.textContent = savedStruggle;
  }

  submitBtn?.addEventListener('click', () => {
    const name = usernameInput?.value.trim() || 'Haven Spirit';
    const struggle = struggleSelect?.value || 'Parental Detachment';

    localStorage.setItem('haven_username', name);
    localStorage.setItem('haven_struggle', struggle);

    if (headerUserTag) headerUserTag.textContent = `👤 ${name}`;
    if (circleMyUsername) circleMyUsername.textContent = name;
    if (circleMyStruggle) circleMyStruggle.textContent = struggle;

    modal?.classList.add('hidden');
    playHarmonicChime([523.25, 659.25, 783.99]);
  });
}

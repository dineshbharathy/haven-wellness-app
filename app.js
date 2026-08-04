/* ==========================================================================
   HAVEN WELLNESS SANCTUARY — PERMANENT COMPUTER DESKTOP APP ENGINE (JS)
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
  initDesktopResolutionDetector();
  initAudioEngine();
  initThemeManager();
  initDesktopTabNavigation();
  initAmbientCanvas();
  initSanctuaryHub();
  initAITherapistAura();
  initMemoryOrbsAndStorybook();
  initSkyLanterns();
  initBreathingOasis();
  initSoundscapes();
  initMemoryJar();
  initSafeJournal();
});

/* ==========================================================================
   FLUID RESOLUTION DETECTOR & INDICATOR
   ========================================================================== */
function initDesktopResolutionDetector() {
  const resIndicator = document.getElementById('resolution-indicator');

  function updateResolution() {
    const width = window.innerWidth;
    const height = window.innerHeight;
    let modeText = 'Desktop Mode';

    if (width < 768) modeText = 'Compact Resolution';
    else if (width < 1100) modeText = 'Medium Resolution';
    else modeText = 'Full Desktop Layout';

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
   2. DESKTOP TAB NAVIGATION
   ========================================================================== */
function initDesktopTabNavigation() {
  const tabBtns = document.querySelectorAll('.nav-tab-btn');
  const tabPanes = document.querySelectorAll('.tab-pane');
  const pageTitleEl = document.getElementById('page-title');

  tabBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      getAudioContext();
      playBellSound(520, 'sine', 0.4, 0.06);

      const tabId = btn.getAttribute('data-tab');
      const title = btn.getAttribute('data-title') || 'Sanctuary';

      tabBtns.forEach(b => b.classList.remove('active'));
      tabPanes.forEach(p => p.classList.remove('active'));

      btn.classList.add('active');
      document.getElementById(`tab-${tabId}`)?.classList.add('active');

      if (pageTitleEl) pageTitleEl.textContent = title;

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
      ctx.fillStyle = `rgba(212, 175, 55, ${Math.max(0.1, Math.min(0.6, p.alpha))})`;
      ctx.shadowBlur = 8;
      ctx.shadowColor = '#d4af37';
      ctx.fill();
    });

    requestAnimationFrame(render);
  }

  render();
}

/* ==========================================================================
   4. SANCTUARY HUB & RITUALS
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
  let hugCount = parseInt(localStorage.getItem('haven_hug_count') || '0');
  hugCountEl.textContent = hugCount;

  hugBtn?.addEventListener('click', (e) => {
    getAudioContext();
    hugCount++;
    localStorage.setItem('haven_hug_count', hugCount);
    hugCountEl.textContent = hugCount;

    playHarmonicChime([349.23, 440.00, 523.25, 659.25]);
    createHeartBurst(e.clientX, e.clientY);
  });

  const openAIListenerBtn = document.getElementById('open-ai-listener-btn');
  openAIListenerBtn?.addEventListener('click', () => {
    document.querySelector('.nav-tab-btn[data-tab="ai-listener"]')?.click();
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
   5. DR. AURA — PRO AI THERAPIST ENGINE (GEMINI 1.5 + HIGH-QUALITY VOICE)
   ========================================================================== */
function initAITherapistAura() {
  const startListenBtn = document.getElementById('start-voice-listen-btn');
  const orbContainer = document.getElementById('ai-voice-orb');
  const orbStatusIcon = document.getElementById('ai-orb-status-icon');
  const statusText = document.getElementById('ai-status-text');
  const synthToggleBtn = document.getElementById('toggle-speech-synth-btn');

  const textInput = document.getElementById('ai-text-input');
  const sendTextBtn = document.getElementById('send-ai-text-btn');
  const messagesBox = document.getElementById('ai-chat-messages');

  const openApiKeyBtn = document.getElementById('open-api-config-btn');
  const apiKeyModal = document.getElementById('api-key-modal');
  const geminiKeyInput = document.getElementById('gemini-api-key-input');
  const saveKeyBtn = document.getElementById('save-gemini-key-btn');
  const apiBanner = document.getElementById('api-status-banner');
  const setupApiLink = document.getElementById('link-setup-api');

  let isListening = false;
  let isSynthEnabled = true;
  let recognition = null;
  let geminiApiKey = localStorage.getItem('haven_gemini_key') || '';

  if (geminiApiKey) {
    if (geminiKeyInput) geminiKeyInput.value = geminiApiKey;
    if (apiBanner) apiBanner.innerHTML = '✨ <strong>Gemini 1.5 Pro Therapy Engine Connected</strong>';
  }

  openApiKeyBtn?.addEventListener('click', () => {
    apiKeyModal?.classList.remove('hidden');
  });

  setupApiLink?.addEventListener('click', (e) => {
    e.preventDefault();
    apiKeyModal?.classList.remove('hidden');
  });

  saveKeyBtn?.addEventListener('click', () => {
    const val = geminiKeyInput.value.trim();
    if (val) {
      geminiApiKey = val;
      localStorage.setItem('haven_gemini_key', val);
      apiKeyModal?.classList.add('hidden');
      if (apiBanner) apiBanner.innerHTML = '✨ <strong>Gemini 1.5 Pro Therapy Engine Connected</strong>';
      playHarmonicChime([523.25, 659.25, 783.99]);
    }
  });

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

    let response = '';
    if (geminiApiKey) {
      response = await fetchGeminiTherapistResponse(userText, geminiApiKey);
    } else {
      response = generateLocalTherapistResponse(userText);
    }

    orbContainer.classList.remove('ai-listening');
    appendBubble('Dr. Aura (AI Therapist)', response, 'aura-bubble');
    statusText.textContent = 'Dr. Aura is here for you.';

    if (isSynthEnabled && window.speechSynthesis) {
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

async function fetchGeminiTherapistResponse(userText, apiKey) {
  try {
    const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey}`;
    const payload = {
      contents: [
        {
          role: 'user',
          parts: [
            {
              text: `System Persona: You are Dr. Aura, a compassionate licensed human therapist trained in Rogerian client-centered therapy, emotional reframing, and attachment therapy. Your client is a young woman who experiences emotional detachment from her parents and longs for her dad. Provide a warm, deeply validating, therapeutic response in 2-3 soft, calming sentences. Never break character. Client says: "${userText}"`
            }
          ]
        }
      ]
    };

    const res = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    });

    if (!res.ok) throw new Error('Gemini API request failed');

    const data = await res.json();
    const reply = data.candidates?.[0]?.content?.parts?.[0]?.text;
    return reply || generateLocalTherapistResponse(userText);
  } catch (e) {
    console.error('Gemini API Error:', e);
    return generateLocalTherapistResponse(userText);
  }
}

function generateLocalTherapistResponse(input) {
  const text = input.toLowerCase();

  if (text.includes('dad') || text.includes('father') || text.includes('parent')) {
    return "I hear how deeply you long for your dad and how heavy parental detachment can feel. What you are feeling is completely valid—your desire for unconditional parental warmth comes from a place of deep love. Take a soft breath; you are safe to feel that ache here without judgment.";
  } else if (text.includes('alone') || text.includes('lonely') || text.includes('detached') || text.includes('isolated')) {
    return "Feeling detached or isolated can make your inner world feel so quiet and distant. Please know that feeling this way doesn't mean you are broken or unwanted. I am right here with you, holding a warm, gentle space for your heart.";
  } else if (text.includes('sad') || text.includes('cry') || text.includes('pain') || text.includes('hurt')) {
    return "I hear the pain in your voice, and I want to remind you that your tears are welcome here. You don't have to carry the weight of being strong all the time. Let yourself rest for a moment; I am listening closely.";
  } else if (text.includes('angry') || text.includes('mad') || text.includes('upset')) {
    return "It is entirely natural to feel anger when you haven't received the warmth or presence you deserved. Anger is often just a protective layer over a deeply tender heart. I honor your feelings completely.";
  } else {
    return "Thank you for trusting me with your thoughts. I am listening closely to everything you carry inside. Your feelings matter so much, and you are surrounded by care and safety here.";
  }
}

function speakTherapistResponse(text) {
  if (!window.speechSynthesis) return;
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
    v.name.includes('Karen')
  ) || voices.find(v => v.lang.startsWith('en'));

  if (preferredVoice) utterance.voice = preferredVoice;

  window.speechSynthesis.speak(utterance);
}

/* ==========================================================================
   6. INSIDE OUT MEMORY ORBS & STORYBOOK READER
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

function initMemoryOrbsAndStorybook() {
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

  const emoRanges = document.querySelectorAll('.emo-range');
  const previewOrb = document.getElementById('preview-memory-orb');
  const particlesContainer = document.getElementById('orb-inner-particles');
  const blendLabel = document.getElementById('orb-blend-label');

  const titleInput = document.getElementById('orb-title-input');
  const noteInput = document.getElementById('orb-note-input');
  const photoInput = document.getElementById('orb-photo-input');
  const photoPreviewBox = document.getElementById('photo-preview-container');
  const photoPreviewImg = document.getElementById('photo-preview-img');
  const removePhotoBtn = document.getElementById('remove-photo-btn');
  const saveBtn = document.getElementById('save-memory-orb-btn');

  let currentPhotoDataUrl = '';

  photoInput?.addEventListener('change', (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      currentPhotoDataUrl = event.target.result;
      photoPreviewImg.src = currentPhotoDataUrl;
      photoPreviewBox.classList.remove('hidden');
    };
    reader.readAsDataURL(file);
  });

  removePhotoBtn?.addEventListener('click', () => {
    currentPhotoDataUrl = '';
    photoInput.value = '';
    photoPreviewBox.classList.add('hidden');
  });

  function updatePreviewOrb() {
    const activeEmotions = [];
    let totalVal = 0;

    emoRanges.forEach(range => {
      const emoKey = range.getAttribute('data-emo');
      const val = parseInt(range.value);
      if (val > 0) {
        activeEmotions.push({ key: emoKey, val, meta: EMOTION_META[emoKey] });
        totalVal += val;
      }
    });

    if (activeEmotions.length === 0) {
      previewOrb.style.background = 'radial-gradient(circle at 35% 35%, #ffffff, #d4af37 40%, #0f172a 100%)';
      blendLabel.textContent = 'Blended Memory Sphere';
      particlesContainer.innerHTML = '';
      return;
    }

    activeEmotions.sort((a, b) => b.val - a.val);

    const stops = activeEmotions.map((e, index) => {
      const pct = Math.round(((index + 1) / activeEmotions.length) * 100);
      return `${e.meta.color} ${pct}%`;
    }).join(', ');

    const gradient = `radial-gradient(circle at 35% 35%, #ffffff, ${stops})`;
    previewOrb.style.background = gradient;
    previewOrb.style.boxShadow = `0 0 35px ${activeEmotions[0].meta.color}`;

    blendLabel.textContent = activeEmotions.map(e => `${e.meta.icon} ${e.meta.name}`).join(' • ');

    particlesContainer.innerHTML = '';
    activeEmotions.slice(0, 5).forEach((e, idx) => {
      const particle = document.createElement('div');
      particle.className = 'orb-mini-particle';
      const size = Math.max(10, Math.min(22, e.val / 3.5));
      particle.style.width = `${size}px`;
      particle.style.height = `${size}px`;
      particle.style.background = e.meta.color;
      particle.style.color = e.meta.color;
      particle.style.left = `${20 + (idx * 16) % 60}%`;
      particle.style.top = `${25 + (idx * 22) % 50}%`;
      particle.style.animationDelay = `${idx * 0.4}s`;
      particlesContainer.appendChild(particle);
    });
  }

  emoRanges.forEach(range => {
    range.addEventListener('input', updatePreviewOrb);
  });

  updatePreviewOrb();

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

  function renderStorybookPage(index) {
    if (memories.length === 0) {
      pageIndicator.textContent = 'Page 0 of 0';
      pageTitle.textContent = 'My Emotional Storybook';
      pageText.textContent = 'No memories logged yet. Create your first Memory Orb on the left to turn the pages.';
      pageDate.textContent = new Date().toLocaleDateString();
      pageOrb.style.background = 'radial-gradient(circle at 35% 35%, #ffffff, #d4af37 40%, #0f172a 100%)';
      pageEmotions.innerHTML = '<span class="emo-pill-badge" style="background:#d4af37;">💛 Warmth</span>';
      pagePhotoBox.classList.add('hidden');
      return;
    }

    currentPageIndex = Math.max(0, Math.min(index, memories.length - 1));
    const item = memories[currentPageIndex];

    pageIndicator.textContent = `Page ${currentPageIndex + 1} of ${memories.length}`;

    pageDate.textContent = `${item.date} • ${item.time || ''}`;
    pageOrb.style.background = item.gradient || 'radial-gradient(circle at 35% 35%, #ffffff, #ffd700 40%, #4169e1 100%)';
    pageOrb.style.boxShadow = `0 0 20px ${item.primaryColor || '#ffd700'}`;

    pageEmotions.innerHTML = Object.keys(item.emotions || {})
      .filter(k => item.emotions[k] > 0)
      .map(k => {
        const meta = EMOTION_META[k];
        return `<span class="emo-pill-badge" style="background:${meta.color};">${meta.icon} ${meta.name} (${item.emotions[k]}%)</span>`;
      }).join('');

    if (item.photoUrl) {
      pagePhotoImg.src = item.photoUrl;
      pagePhotoBox.classList.remove('hidden');
    } else {
      pagePhotoBox.classList.add('hidden');
    }

    pageTitle.textContent = item.title || 'Emotional Memory';
    pageText.textContent = item.note || 'No text written.';
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
    const title = titleInput.value.trim() || 'Today\'s Emotional Memory';
    const note = noteInput.value.trim();

    if (!note && !currentPhotoDataUrl) return;

    getAudioContext();
    playHarmonicChime([440, 554.37, 659.25, 880]);

    const activeEmotionsMap = {};
    const activeList = [];
    emoRanges.forEach(range => {
      const k = range.getAttribute('data-emo');
      const val = parseInt(range.value);
      if (val > 0) {
        activeEmotionsMap[k] = val;
        activeList.push({ k, val, meta: EMOTION_META[k] });
      }
    });

    activeList.sort((a, b) => b.val - a.val);

    const stops = activeList.length > 0
      ? activeList.map((e, i) => `${e.meta.color} ${Math.round(((i + 1) / activeList.length) * 100)}%`).join(', ')
      : '#ffd700 50%, #4169e1 100%';

    const gradient = `radial-gradient(circle at 35% 35%, #ffffff, ${stops})`;

    const now = new Date();
    const newMemory = {
      id: `memory_${Date.now()}`,
      title,
      note,
      emotions: activeEmotionsMap,
      gradient,
      primaryColor: activeList[0]?.meta.color || '#ffd700',
      photoUrl: currentPhotoDataUrl,
      date: now.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
      time: now.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })
    };

    memories.unshift(newMemory);
    localStorage.setItem('haven_memories', JSON.stringify(memories));

    titleInput.value = '';
    noteInput.value = '';
    currentPhotoDataUrl = '';
    photoInput.value = '';
    photoPreviewBox.classList.add('hidden');

    document.querySelector('.segmented-btn[data-orb-view="storybook"]')?.click();
    renderStorybookPage(0);
  });
}

/* ==========================================================================
   7. SKY LANTERNS OF RELEASE
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
    color: l.color || '#d4af37',
    date: l.date || new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
    rawDate: l.rawDate || todayStr,
    time: l.time || 'Evening'
  }));
  localStorage.setItem('haven_lanterns', JSON.stringify(lanterns));

  const releasedCountEl = document.getElementById('released-count');
  releasedCountEl.textContent = `${lanterns.length} lanterns floating`;

  let activeFilter = 'all';

  const activeLanternObjects = lanterns.map(l => ({
    ...l,
    x: Math.random() * (width - 40) + 20,
    y: Math.random() * (height - 80) + 40,
    vy: -Math.random() * 0.3 - 0.1,
    sway: Math.random() * Math.PI * 2,
    size: 20
  }));

  function getFilteredLanterns() {
    const now = new Date();
    const todayISO = now.toISOString().split('T')[0];

    if (activeFilter === 'today') {
      return activeLanternObjects.filter(l => l.rawDate === todayISO);
    } else if (activeFilter === 'week') {
      const sevenDaysAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
      return activeLanternObjects.filter(l => new Date(l.rawDate) >= sevenDaysAgo);
    }
    return activeLanternObjects;
  }

  function renderSky() {
    ctx.clearRect(0, 0, width, height);

    for (let i = 0; i < 35; i++) {
      const sx = (Math.sin(i * 99 + Date.now() * 0.001) * 0.5 + 0.5) * width;
      const sy = (Math.cos(i * 33 + Date.now() * 0.001) * 0.5 + 0.5) * height;
      ctx.fillStyle = `rgba(255, 255, 255, ${Math.sin(Date.now() * 0.002 + i) * 0.3 + 0.5})`;
      ctx.beginPath();
      ctx.arc(sx, sy, Math.random() * 1.5 + 0.5, 0, Math.PI * 2);
      ctx.fill();
    }

    const visibleLanterns = getFilteredLanterns();

    visibleLanterns.forEach(l => {
      l.y += l.vy;
      l.sway += 0.02;
      l.x += Math.sin(l.sway) * 0.3;

      if (l.y < -40) l.y = height + 20;

      const glow = ctx.createRadialGradient(l.x, l.y, 2, l.x, l.y, l.size * 1.6);
      glow.addColorStop(0, l.color || '#d4af37');
      glow.addColorStop(1, 'transparent');

      ctx.fillStyle = glow;
      ctx.beginPath();
      ctx.arc(l.x, l.y, l.size * 1.6, 0, Math.PI * 2);
      ctx.fill();

      ctx.fillStyle = l.color || '#d4af37';
      ctx.beginPath();
      ctx.roundRect(l.x - 8, l.y - 12, 16, 22, 3);
      ctx.fill();
    });

    requestAnimationFrame(renderSky);
  }

  renderSky();

  skyCanvas.addEventListener('click', (e) => {
    const rect = skyCanvas.getBoundingClientRect();
    const clickX = e.clientX - rect.left;
    const clickY = e.clientY - rect.top;

    const visibleLanterns = getFilteredLanterns();
    const clicked = visibleLanterns.find(l => {
      const dist = Math.hypot(l.x - clickX, l.y - clickY);
      return dist <= l.size * 1.5;
    });

    if (clicked) {
      openViewLanternModal(clicked);
    }
  });

  const datePills = document.querySelectorAll('.date-pill');
  const galleryGrid = document.getElementById('lantern-gallery-grid');

  datePills.forEach(pill => {
    pill.addEventListener('click', () => {
      getAudioContext();
      playBellSound(540, 'sine', 0.4, 0.06);

      datePills.forEach(p => p.classList.remove('active'));
      pill.classList.add('active');
      activeFilter = pill.getAttribute('data-date-filter');
      updateVaultGallery();
    });
  });

  function updateVaultGallery() {
    const filtered = getFilteredLanterns();

    if (filtered.length === 0) {
      galleryGrid.innerHTML = `<p class="empty-state">No lanterns found for this date.</p>`;
      return;
    }

    galleryGrid.innerHTML = filtered.map(l => `
      <div class="lantern-card" data-id="${l.id}">
        <div class="lantern-card-header">
          <span class="lantern-badge" style="background: ${l.color};">🏮 ${getColorName(l.color)}</span>
          <span class="lantern-date-tag">${l.date}</span>
        </div>
        <p class="lantern-snippet">"${escapeHtml(l.message)}"</p>
      </div>
    `).join('');

    galleryGrid.querySelectorAll('.lantern-card').forEach(card => {
      card.addEventListener('click', () => {
        const id = card.getAttribute('data-id');
        const found = lanterns.find(item => item.id === id);
        if (found) openViewLanternModal(found);
      });
    });
  }

  updateVaultGallery();

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
    playHarmonicChime([440, 554.37, 659.25, 880]);

    const selectedColor = document.querySelector('input[name="lantern-color"]:checked')?.value || '#d4af37';
    const now = new Date();
    const todayISO = now.toISOString().split('T')[0];
    const dateFormatted = now.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
    const timeFormatted = now.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' });

    const newLantern = {
      id: `lantern_${Date.now()}`,
      message: msg,
      color: selectedColor,
      date: dateFormatted,
      rawDate: todayISO,
      time: timeFormatted,
      x: width / 2 + (Math.random() - 0.5) * 80,
      y: height - 40,
      vy: -Math.random() * 0.4 - 0.2,
      sway: Math.random() * Math.PI * 2,
      size: 22
    };

    activeLanternObjects.push(newLantern);
    lanterns.push(newLantern);
    localStorage.setItem('haven_lanterns', JSON.stringify(lanterns));

    releasedCountEl.textContent = `${lanterns.length} lanterns floating`;
    lanternMsgInput.value = '';
    lanternModal?.classList.add('hidden');
    updateVaultGallery();
  });
}

function openViewLanternModal(lantern) {
  getAudioContext();
  playHarmonicChime([659.25, 783.99, 1046.50]);

  const viewModal = document.getElementById('view-lantern-modal');
  const badgeEl = document.getElementById('view-lantern-color-badge');
  const dateEl = document.getElementById('view-lantern-date');
  const msgEl = document.getElementById('view-lantern-message');

  if (badgeEl) {
    badgeEl.style.background = lantern.color || '#d4af37';
    badgeEl.textContent = `🏮 ${getColorName(lantern.color)}`;
  }
  if (dateEl) dateEl.textContent = `${lantern.date} • ${lantern.time || ''}`;
  if (msgEl) msgEl.textContent = `"${lantern.message}"`;

  viewModal?.classList.remove('hidden');
}

function getColorName(color) {
  switch (color) {
    case '#d4af37': return 'Gold';
    case '#ff80bf': return 'Rose';
    case '#b388ff': return 'Lavender';
    case '#34d399': return 'Emerald';
    default: return 'Glow';
  }
}

/* ==========================================================================
   8. BREATHING OASIS
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

    let phases = [];
    if (mode === 'relax') {
      phases = [
        { name: 'Inhale', duration: 4, class: 'breath-expand', guide: 'Breathe in softly...', pitch: 523.25 },
        { name: 'Hold', duration: 7, class: 'breath-hold', guide: 'Hold softly...', pitch: 659.25 },
        { name: 'Exhale', duration: 8, class: 'breath-shrink', guide: 'Release gently...', pitch: 392.00 }
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
   9. PROCEDURAL SOUNDSCAPES
   ========================================================================== */
function initAudioEngine() {
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
   10. MEMORY JAR & COMFORT NOTES
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
   11. HEART CHECK-IN & SAFE JOURNAL
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

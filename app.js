/* ==========================================================================
   HAVEN WELLNESS SANCTUARY — THREE.JS 3D ENGINE ACROSS ALL 9 TABS
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

  // Three.js 3D Engines for ALL 9 Tabs
  initThreeJSHub();
  initThreeJSAIVoice();
  initThreeJSCommunityNodes();
  initThreeJSOrbStudio();
  initThreeJSSkyLanterns();
  initThreeJSBreathing();
  initThreeJSAudioSpectrum();
  initThreeJSMemoryJar();
  initThreeJSHeartPrism();

  initSoundscapes();
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
  } catch (e) {}
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

const sanctuaryBroadcast = window.BroadcastChannel ? new BroadcastChannel('haven_sanctuary_network') : null;

/* ==========================================================================
   THEME MANAGER & NAVIGATION
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

      window.dispatchEvent(new Event('resize'));
    });
  });
}

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

    requestAnimationFrame(render);
  }

  render();
}

/* ==========================================================================
   TAB 1: THREE.JS 3D SANCTUARY HUB (#hub-3d-canvas)
   ========================================================================== */
function initThreeJSHub() {
  const canvas = document.getElementById('hub-3d-canvas');
  if (!canvas || !window.THREE) return;

  const card = canvas.parentElement;
  const width = card.clientWidth || 800;
  const height = card.clientHeight || 280;

  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 1000);
  camera.position.z = 5;

  const renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: true });
  renderer.setSize(width, height);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

  const ambientLight = new THREE.AmbientLight(0xffffff, 0.7);
  scene.add(ambientLight);

  const light1 = new THREE.PointLight(0xffcf56, 2, 10);
  light1.position.set(3, 3, 3);
  scene.add(light1);

  const light2 = new THREE.PointLight(0xd946ef, 1.8, 10);
  light2.position.set(-3, -3, 2);
  scene.add(light2);

  // Floating Sacred Geometry (Torus Knot)
  const geom = new THREE.TorusKnotGeometry(1.2, 0.35, 128, 32);
  const mat = new THREE.MeshStandardMaterial({
    color: 0xff8052,
    roughness: 0.2,
    metalness: 0.1,
    transparent: true,
    opacity: 0.65
  });
  const mesh = new THREE.Mesh(geom, mat);
  scene.add(mesh);

  // Background Particles
  const pGeo = new THREE.BufferGeometry();
  const pCount = 100;
  const pPos = new Float32Array(pCount * 3);
  for (let i = 0; i < pCount * 3; i += 3) {
    pPos[i] = (Math.random() - 0.5) * 8;
    pPos[i + 1] = (Math.random() - 0.5) * 6;
    pPos[i + 2] = (Math.random() - 0.5) * 4;
  }
  pGeo.setAttribute('position', new THREE.BufferAttribute(pPos, 3));
  const pMat = new THREE.PointsMaterial({ color: 0xffcf56, size: 0.06, transparent: true, opacity: 0.7 });
  const particles = new THREE.Points(pGeo, pMat);
  scene.add(particles);

  function animate() {
    requestAnimationFrame(animate);
    mesh.rotation.x += 0.005;
    mesh.rotation.y += 0.007;
    particles.rotation.y -= 0.002;
    renderer.render(scene, camera);
  }
  animate();

  window.addEventListener('resize', () => {
    if (card.clientWidth > 0) {
      camera.aspect = card.clientWidth / card.clientHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(card.clientWidth, card.clientHeight);
    }
  });
}

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
    const quotes = [
      "It's okay to miss what isn't there, and still hold space for all the warmth that surrounds you.",
      "You do not have to earn love or belonging. You are inherently worthy simply by being here.",
      "Your tender heart is not a weakness; it is proof of how deeply you can give and receive affection."
    ];
    quoteEl.textContent = `"${quotes[Math.floor(Math.random() * quotes.length)]}"`;
  });

  const hugBtn = document.getElementById('hug-btn');
  const hugCountEl = document.getElementById('hug-count');
  const hugModal = document.getElementById('hug-embrace-modal');
  const hugModalCount = document.getElementById('hug-modal-count');

  let hugCount = parseInt(localStorage.getItem('haven_hug_count') || '0');
  hugCountEl.textContent = hugCount;

  hugBtn?.addEventListener('click', () => {
    getAudioContext();
    hugCount++;
    localStorage.setItem('haven_hug_count', hugCount);
    hugCountEl.textContent = hugCount;
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
   TAB 2: THREE.JS 3D AI VOICE SPHERE ENGINE (#ai-3d-canvas)
   ========================================================================== */
let ai3DState = { isListening: false, distortion: 0.12, speed: 0.004 };

function initThreeJSAIVoice() {
  const canvas = document.getElementById('ai-3d-canvas');
  const container = document.getElementById('threejs-ai-container');
  if (!canvas || !container || !window.THREE) return;

  const width = container.clientWidth || 320;
  const height = container.clientHeight || 220;

  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 1000);
  camera.position.z = 4.2;

  const renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: true });
  renderer.setSize(width, height);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

  const ambientLight = new THREE.AmbientLight(0xffffff, 0.8);
  scene.add(ambientLight);

  const pointLight1 = new THREE.PointLight(0xd946ef, 2.5, 10);
  pointLight1.position.set(2, 2, 3);
  scene.add(pointLight1);

  const pointLight2 = new THREE.PointLight(0xffcf56, 2, 10);
  pointLight2.position.set(-2, -2, 2);
  scene.add(pointLight2);

  const geometry = new THREE.IcosahedronGeometry(1.3, 48);
  const originalPositions = geometry.attributes.position.clone();

  const material = new THREE.MeshStandardMaterial({
    color: 0xd946ef,
    roughness: 0.2,
    metalness: 0.1,
    transparent: true,
    opacity: 0.9
  });

  const voiceMesh = new THREE.Mesh(geometry, material);
  scene.add(voiceMesh);

  const clock = new THREE.Clock();

  function animate() {
    requestAnimationFrame(animate);
    const elapsedTime = clock.getElapsedTime();

    voiceMesh.rotation.y += ai3DState.speed;
    voiceMesh.rotation.x += ai3DState.speed * 0.5;

    const posAttr = geometry.attributes.position;
    const vertex = new THREE.Vector3();

    for (let i = 0; i < posAttr.count; i++) {
      vertex.fromBufferAttribute(originalPositions, i);
      const wave = Math.sin(vertex.x * 3 + elapsedTime * (ai3DState.isListening ? 6 : 2.5)) *
                   Math.cos(vertex.y * 3 + elapsedTime * (ai3DState.isListening ? 6 : 2.5));
      vertex.multiplyScalar(1 + wave * ai3DState.distortion);
      posAttr.setXYZ(i, vertex.x, vertex.y, vertex.z);
    }
    geometry.computeVertexNormals();
    posAttr.needsUpdate = true;

    renderer.render(scene, camera);
  }
  animate();

  window.addEventListener('resize', () => {
    if (container.clientWidth > 0) {
      camera.aspect = container.clientWidth / container.clientHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(container.clientWidth, container.clientHeight);
    }
  });
}

function initAutonomousAITherapistAura() {
  const startListenBtn = document.getElementById('start-voice-listen-btn');
  const statusText = document.getElementById('ai-status-text');
  const textInput = document.getElementById('ai-text-input');
  const sendTextBtn = document.getElementById('send-ai-text-btn');
  const messagesBox = document.getElementById('ai-chat-messages');

  startListenBtn?.addEventListener('click', () => {
    getAudioContext();
    ai3DState.isListening = !ai3DState.isListening;
    if (ai3DState.isListening) {
      ai3DState.distortion = 0.28;
      ai3DState.speed = 0.015;
      statusText.textContent = 'Dr. Aura is listening to your voice...';
      startListenBtn.textContent = '⏹ Listening... Speak Now';
    } else {
      ai3DState.distortion = 0.12;
      ai3DState.speed = 0.004;
      statusText.textContent = 'Dr. Aura is listening softly...';
      startListenBtn.textContent = '🎙️ Tap to Speak with Dr. Aura';
    }
  });

  sendTextBtn?.addEventListener('click', () => {
    const val = textInput.value.trim();
    if (!val) return;
    appendBubble('You', val, 'user-bubble');
    textInput.value = '';
    
    ai3DState.isListening = true;
    ai3DState.distortion = 0.32;

    setTimeout(() => {
      ai3DState.isListening = false;
      ai3DState.distortion = 0.12;
      const resp = "I hear you deeply. How are you feeling in your heart right now?";
      appendBubble('Dr. Aura (AI Therapist Agent)', resp, 'aura-bubble');
    }, 1200);
  });

  function appendBubble(author, text, bubbleClass) {
    const bubble = document.createElement('div');
    bubble.className = `chat-bubble ${bubbleClass}`;
    bubble.innerHTML = `<span class="chat-author">${author}:</span><p>"${text}"</p>`;
    messagesBox.appendChild(bubble);
    messagesBox.scrollTop = messagesBox.scrollHeight;
  }
}

/* ==========================================================================
   TAB 3: THREE.JS 3D COMMUNITY CONSTELLATION NODES (#community-3d-canvas)
   ========================================================================== */
function initThreeJSCommunityNodes() {
  const canvas = document.getElementById('community-3d-canvas');
  if (!canvas || !window.THREE) return;
  const parent = canvas.parentElement;

  const width = parent.clientWidth || 220;
  const height = parent.clientHeight || 160;

  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 1000);
  camera.position.z = 4;

  const renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: true });
  renderer.setSize(width, height);

  const count = 18;
  const geo = new THREE.BufferGeometry();
  const pos = new Float32Array(count * 3);
  for (let i = 0; i < count * 3; i += 3) {
    pos[i] = (Math.random() - 0.5) * 3;
    pos[i + 1] = (Math.random() - 0.5) * 2.5;
    pos[i + 2] = (Math.random() - 0.5) * 2;
  }
  geo.setAttribute('position', new THREE.BufferAttribute(pos, 3));
  const mat = new THREE.PointsMaterial({ color: 0x34d399, size: 0.1, transparent: true, opacity: 0.9 });
  const points = new THREE.Points(geo, mat);
  scene.add(points);

  function animate() {
    requestAnimationFrame(animate);
    points.rotation.y += 0.006;
    renderer.render(scene, camera);
  }
  animate();
}

function initAuthSurveyFlow() {}
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
function initAppleCallEngine() {}

/* ==========================================================================
   TAB 4: THREE.JS 3D REACTIVE MEMORY ORBS (#orb-3d-canvas)
   ========================================================================== */
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

  const ambientLight = new THREE.AmbientLight(0xffffff, 0.8);
  scene.add(ambientLight);

  const primaryPointLight = new THREE.PointLight(0xffcf56, 2.5, 10);
  primaryPointLight.position.set(2, 2, 3);
  scene.add(primaryPointLight);

  const secondaryPointLight = new THREE.PointLight(0xd946ef, 2.0, 10);
  secondaryPointLight.position.set(-2, -2, 2);
  scene.add(secondaryPointLight);

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

  const clock = new THREE.Clock();

  function animate() {
    requestAnimationFrame(animate);
    const elapsedTime = clock.getElapsedTime();

    orbMesh.rotation.y += 0.005;
    orbMesh.rotation.x += 0.003;

    const posAttr = geometry.attributes.position;
    const vertex = new THREE.Vector3();

    for (let i = 0; i < posAttr.count; i++) {
      vertex.fromBufferAttribute(originalPositions, i);
      const wave = Math.sin(vertex.x * 2.5 + elapsedTime * 2.5) *
                   Math.cos(vertex.y * 2.5 + elapsedTime * 2.5);
      vertex.multiplyScalar(1 + wave * 0.18);
      posAttr.setXYZ(i, vertex.x, vertex.y, vertex.z);
    }
    geometry.computeVertexNormals();
    posAttr.needsUpdate = true;

    renderer.render(scene, camera);
  }
  animate();
}

/* ==========================================================================
   TAB 5: THREE.JS 3D FLOATING SKY LANTERNS (#sky-3d-canvas)
   ========================================================================== */
function initThreeJSSkyLanterns() {
  const canvas = document.getElementById('sky-3d-canvas');
  const viewport = document.getElementById('sky-viewport');
  if (!canvas || !viewport || !window.THREE) return;

  const width = viewport.clientWidth || 800;
  const height = viewport.clientHeight || 380;

  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 1000);
  camera.position.z = 6;

  const renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: true });
  renderer.setSize(width, height);

  const light = new THREE.PointLight(0xffcf56, 2, 10);
  light.position.set(0, 0, 4);
  scene.add(light);

  const lanternGroup = new THREE.Group();
  scene.add(lanternGroup);

  for (let i = 0; i < 24; i++) {
    const lGeom = new THREE.CylinderGeometry(0.15, 0.18, 0.35, 16);
    const lMat = new THREE.MeshStandardMaterial({
      color: ['#ffcf56', '#ff8052', '#d946ef', '#34d399'][Math.floor(Math.random() * 4)],
      roughness: 0.3,
      emissive: 0x331100
    });
    const lMesh = new THREE.Mesh(lGeom, lMat);
    lMesh.position.set((Math.random() - 0.5) * 7, (Math.random() - 0.5) * 4, (Math.random() - 0.5) * 3);
    lanternGroup.add(lMesh);
  }

  function animate() {
    requestAnimationFrame(animate);
    lanternGroup.children.forEach(l => {
      l.position.y += 0.005;
      l.rotation.y += 0.005;
      if (l.position.y > 3) l.position.y = -3;
    });
    renderer.render(scene, camera);
  }
  animate();
}

function initSkyLanterns() {}

/* ==========================================================================
   TAB 6: THREE.JS 3D BREATHING OASIS SPHERE (#breathing-3d-canvas)
   ========================================================================== */
let breath3DScale = { val: 1.0 };

function initThreeJSBreathing() {
  const canvas = document.getElementById('breathing-3d-canvas');
  if (!canvas || !window.THREE) return;
  const parent = canvas.parentElement;

  const width = parent.clientWidth || 380;
  const height = parent.clientHeight || 260;

  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 1000);
  camera.position.z = 4.2;

  const renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: true });
  renderer.setSize(width, height);

  const ambientLight = new THREE.AmbientLight(0xffffff, 0.8);
  scene.add(ambientLight);

  const pointLight = new THREE.PointLight(0x34d399, 2.5, 10);
  pointLight.position.set(2, 2, 3);
  scene.add(pointLight);

  const geom = new THREE.IcosahedronGeometry(1.2, 32);
  const mat = new THREE.MeshStandardMaterial({
    color: 0x34d399,
    roughness: 0.1,
    transparent: true,
    opacity: 0.85
  });
  const breathMesh = new THREE.Mesh(geom, mat);
  scene.add(breathMesh);

  function animate() {
    requestAnimationFrame(animate);
    breathMesh.rotation.y += 0.005;
    breathMesh.scale.set(breath3DScale.val, breath3DScale.val, breath3DScale.val);
    renderer.render(scene, camera);
  }
  animate();
}

function initBreathingOasis() {
  const startBtn = document.getElementById('start-breath-btn');
  let isBreathing = false;

  startBtn?.addEventListener('click', () => {
    getAudioContext();
    isBreathing = !isBreathing;
    if (isBreathing) {
      startBtn.textContent = '⏹ Stop Breathing';
      animateBreathLoop();
    } else {
      startBtn.textContent = '▶ Start Breathing';
      breath3DScale.val = 1.0;
    }
  });

  function animateBreathLoop() {
    if (!isBreathing) return;
    let t = 0;
    const interval = setInterval(() => {
      if (!isBreathing) { clearInterval(interval); return; }
      t += 0.05;
      breath3DScale.val = 1.0 + Math.sin(t) * 0.35;
    }, 50);
  }
}

/* ==========================================================================
   TAB 7: THREE.JS 3D AUDIO SPECTRUM VISUALIZER (#audio-3d-canvas)
   ========================================================================== */
function initThreeJSAudioSpectrum() {
  const canvas = document.getElementById('audio-3d-canvas');
  if (!canvas || !window.THREE) return;
  const parent = canvas.parentElement;

  const width = parent.clientWidth || 600;
  const height = parent.clientHeight || 180;

  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 1000);
  camera.position.z = 4.5;

  const renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: true });
  renderer.setSize(width, height);

  const barGroup = new THREE.Group();
  scene.add(barGroup);

  const barCount = 16;
  const bars = [];
  for (let i = 0; i < barCount; i++) {
    const geom = new THREE.BoxGeometry(0.12, 1, 0.12);
    const mat = new THREE.MeshBasicMaterial({ color: i % 2 === 0 ? 0xd946ef : 0xffcf56 });
    const bar = new THREE.Mesh(geom, mat);
    bar.position.x = (i - barCount / 2) * 0.22;
    barGroup.add(bar);
    bars.push(bar);
  }

  function animate() {
    requestAnimationFrame(animate);
    bars.forEach((b, idx) => {
      const h = 0.5 + Math.sin(Date.now() * 0.005 + idx * 0.5) * 0.8;
      b.scale.y = h;
    });
    renderer.render(scene, camera);
  }
  animate();
}

function initSoundscapes() {}

/* ==========================================================================
   TAB 8: THREE.JS 3D MEMORY JAR CONTAINER (#jar-3d-canvas)
   ========================================================================== */
function initThreeJSMemoryJar() {
  const canvas = document.getElementById('jar-3d-canvas');
  if (!canvas || !window.THREE) return;
  const parent = canvas.parentElement;

  const width = parent.clientWidth || 360;
  const height = parent.clientHeight || 260;

  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 1000);
  camera.position.z = 4.5;

  const renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: true });
  renderer.setSize(width, height);

  const light = new THREE.PointLight(0xff8052, 2.5, 10);
  light.position.set(2, 2, 3);
  scene.add(light);

  // Glass Cylinder Jar Mesh
  const jarGeom = new THREE.CylinderGeometry(1.1, 1.0, 2.0, 32);
  const jarMat = new THREE.MeshStandardMaterial({ color: 0xffffff, roughness: 0.1, transparent: true, opacity: 0.45 });
  const jarMesh = new THREE.Mesh(jarGeom, jarMat);
  scene.add(jarMesh);

  // Floating Notes inside Jar
  const noteGroup = new THREE.Group();
  scene.add(noteGroup);
  for (let i = 0; i < 12; i++) {
    const nGeom = new THREE.BoxGeometry(0.2, 0.2, 0.2);
    const nMat = new THREE.MeshStandardMaterial({ color: 0xff8052 });
    const nMesh = new THREE.Mesh(nGeom, nMat);
    nMesh.position.set((Math.random() - 0.5) * 1.2, (Math.random() - 0.5) * 1.2, (Math.random() - 0.5) * 1.2);
    noteGroup.add(nMesh);
  }

  function animate() {
    requestAnimationFrame(animate);
    jarMesh.rotation.y += 0.005;
    noteGroup.rotation.y += 0.008;
    renderer.render(scene, camera);
  }
  animate();
}

function initMemoryJar() {}

/* ==========================================================================
   TAB 9: THREE.JS 3D EMOTIONAL HEART PRISM (#journal-3d-canvas)
   ========================================================================== */
function initThreeJSHeartPrism() {
  const canvas = document.getElementById('journal-3d-canvas');
  if (!canvas || !window.THREE) return;
  const parent = canvas.parentElement;

  const width = parent.clientWidth || 320;
  const height = parent.clientHeight || 220;

  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 1000);
  camera.position.z = 4.2;

  const renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: true });
  renderer.setSize(width, height);

  const light = new THREE.PointLight(0xd946ef, 2.5, 10);
  light.position.set(2, 2, 3);
  scene.add(light);

  const geom = new THREE.OctahedronGeometry(1.2, 0);
  const mat = new THREE.MeshStandardMaterial({ color: 0xd946ef, roughness: 0.15, transparent: true, opacity: 0.85 });
  const prismMesh = new THREE.Mesh(geom, mat);
  scene.add(prismMesh);

  function animate() {
    requestAnimationFrame(animate);
    prismMesh.rotation.y += 0.008;
    prismMesh.rotation.x += 0.004;
    renderer.render(scene, camera);
  }
  animate();
}

function initSafeJournal() {}

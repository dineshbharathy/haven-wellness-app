/* ==========================================================================
   SPHAERA — 3D MOOD SPHERE SANCTUARY ENGINE (JS)
   ========================================================================== */

import * as THREE from 'three';

document.addEventListener('DOMContentLoaded', () => {
  initIOSStatusBarClock();
  initAudioEngine();
  initThemeManager();
  initIOSTabNavigation();
  initAmbientCanvas();

  // Core Sphaera Engines
  initMainSphereEngine();
  initVoiceRecorderEngine();
  initSpiralViewEngine();
  initCalendarViewEngine();
  initInsightsEngine();
  initSkyLanterns();
  initSoundscapes();
});

/* ==========================================================================
   iOS STATUS BAR REAL-TIME CLOCK
   ========================================================================== */
function initIOSStatusBarClock() {
  const clockEl = document.getElementById('status-time');
  function updateClock() {
    const now = new Date();
    let hours = now.getHours();
    const minutes = String(now.getMinutes()).padStart(2, '0');
    hours = hours % 12 || 12;
    if (clockEl) clockEl.textContent = `${hours}:${minutes}`;
  }
  updateClock();
  setInterval(updateClock, 10000);
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
    console.log('Audio error', e);
  }
}

function playHarmonicChime(freqs = [523.25, 659.25, 783.99, 1046.50]) {
  freqs.forEach((f, index) => {
    setTimeout(() => playBellSound(f, 'sine', 2.0, 0.12), index * 120);
  });
}

/* ==========================================================================
   1. THEME MANAGER & TAB NAV
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

function initIOSTabNavigation() {
  const tabItems = document.querySelectorAll('.tab-item');
  const tabPanes = document.querySelectorAll('.tab-pane');
  const pageTitleEl = document.getElementById('ios-page-title');

  tabItems.forEach(item => {
    item.addEventListener('click', () => {
      getAudioContext();
      playBellSound(520, 'sine', 0.4, 0.06);

      const tabId = item.getAttribute('data-tab');
      const title = item.getAttribute('data-title') || 'Sphaera';

      tabItems.forEach(b => b.classList.remove('active'));
      tabPanes.forEach(p => p.classList.remove('active'));

      item.classList.add('active');
      document.getElementById(`tab-${tabId}`)?.classList.add('active');

      if (pageTitleEl) pageTitleEl.textContent = title;

      if (tabId === 'spiral') {
        window.dispatchEvent(new Event('resize-spiral'));
      }
    });
  });
}

/* ==========================================================================
   2. AMBIENT CANVAS
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
  for (let i = 0; i < 40; i++) {
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
      p.x += p.vx; p.y += p.vy;
      p.alpha += Math.sin(Date.now() * p.pulse) * 0.01;
      if (p.y < 0) p.y = height;
      if (p.x < 0) p.x = width;
      if (p.x > width) p.x = 0;

      ctx.beginPath();
      ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(255, 255, 255, ${Math.max(0.1, Math.min(0.9, p.alpha))})`;
      ctx.fill();
    });
    requestAnimationFrame(render);
  }
  render();
}

/* ==========================================================================
   3. THREE.JS INTERACTIVE 3D MOOD SPHERE ENGINE
   ========================================================================== */
const MOOD_PRESETS = {
  calm: { name: 'Calm', color: '#2a9d8f' },
  joy: { name: 'Joyful', color: '#f4a261' },
  anxious: { name: 'Anxious', color: '#48cae4' },
  low: { name: 'Low', color: '#6c757d' },
  angry: { name: 'Angry', color: '#e63946' },
  nostalgic: { name: 'Nostalgic', color: '#ff758f' },
  solitude: { name: 'Solitude', color: '#7209b7' }
};

let currentMoodColor = '#2a9d8f';
let currentMoodPreset = 'calm';

function initMainSphereEngine() {
  const canvas = document.getElementById('main-sphere-canvas');
  if (!canvas) return;

  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(45, canvas.clientWidth / canvas.clientHeight, 0.1, 100);
  camera.position.z = 4.2;

  const renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: true });
  renderer.setSize(canvas.clientWidth, canvas.clientHeight);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

  // Lights
  const ambientLight = new THREE.AmbientLight(0xffffff, 0.8);
  scene.add(ambientLight);

  const dirLight1 = new THREE.DirectionalLight(0xffffff, 1.2);
  dirLight1.position.set(3, 4, 5);
  scene.add(dirLight1);

  const dirLight2 = new THREE.DirectionalLight(0xffffff, 0.4);
  dirLight2.position.set(-3, -2, -3);
  scene.add(dirLight2);

  // Procedural Noise Bump Texture
  const bumpCanvas = document.createElement('canvas');
  bumpCanvas.width = 256; bumpCanvas.height = 256;
  const bumpCtx = bumpCanvas.getContext('2d');
  for (let x = 0; x < 256; x++) {
    for (let y = 0; y < 256; y++) {
      const val = Math.floor(Math.random() * 128 + 128);
      bumpCtx.fillStyle = `rgb(${val},${val},${val})`;
      bumpCtx.fillRect(x, y, 1, 1);
    }
  }
  const bumpTexture = new THREE.CanvasTexture(bumpCanvas);
  bumpTexture.wrapS = THREE.RepeatWrapping;
  bumpTexture.wrapT = THREE.RepeatWrapping;

  // Geometry & Material
  const geometry = new THREE.SphereGeometry(1.3, 64, 64);
  const material = new THREE.MeshStandardMaterial({
    color: new THREE.Color(currentMoodColor),
    roughness: 0.25,
    metalness: 0.15,
    bumpMap: bumpTexture,
    bumpScale: 0.02
  });

  const sphere = new THREE.Mesh(geometry, material);
  scene.add(sphere);

  // Drag Orbit Rotation
  let isDragging = false;
  let previousMousePosition = { x: 0, y: 0 };

  canvas.addEventListener('pointerdown', (e) => {
    isDragging = true;
    previousMousePosition = { x: e.clientX, y: e.clientY };
  });

  window.addEventListener('pointermove', (e) => {
    if (!isDragging) return;
    const deltaX = e.clientX - previousMousePosition.x;
    const deltaY = e.clientY - previousMousePosition.y;

    sphere.rotation.y += deltaX * 0.008;
    sphere.rotation.x += deltaY * 0.008;

    previousMousePosition = { x: e.clientX, y: e.clientY };
  });

  window.addEventListener('pointerup', () => { isDragging = false; });

  // Animation Loop
  function animate() {
    requestAnimationFrame(animate);
    if (!isDragging) {
      sphere.rotation.y += 0.004;
    }
    renderer.render(scene, camera);
  }
  animate();

  // Resize Handler
  window.addEventListener('resize', () => {
    if (canvas.clientWidth > 0) {
      camera.aspect = canvas.clientWidth / canvas.clientHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(canvas.clientWidth, canvas.clientHeight);
    }
  });

  // Preset Chips Listener
  const moodChips = document.querySelectorAll('.mood-chip');
  moodChips.forEach(chip => {
    chip.addEventListener('click', () => {
      getAudioContext();
      playBellSound(620, 'sine', 0.5, 0.08);

      moodChips.forEach(c => c.classList.remove('active'));
      chip.classList.add('active');

      currentMoodPreset = chip.getAttribute('data-preset');
      currentMoodColor = chip.getAttribute('data-color');

      // Animate material color
      material.color.set(currentMoodColor);

      // Micro-animation squish/bloom
      sphere.scale.set(1.15, 0.88, 1.15);
      setTimeout(() => sphere.scale.set(1, 1, 1), 250);
    });
  });

  // Save Today's Entry
  const saveBtn = document.getElementById('save-today-entry-btn');
  const reflectionInput = document.getElementById('today-reflection-input');

  saveBtn?.addEventListener('click', () => {
    getAudioContext();
    playHarmonicChime([440, 554.37, 659.25, 880]);

    const note = reflectionInput.value.trim() || 'Sphere logged.';
    const now = new Date();
    const todayISO = now.toISOString().split('T')[0];

    let entries = JSON.parse(localStorage.getItem('sphaera_entries') || '[]');

    // Remove existing entry for today if overwriting
    entries = entries.filter(e => e.rawDate !== todayISO);

    const newEntry = {
      id: `entry_${Date.now()}`,
      preset: currentMoodPreset,
      color: currentMoodColor,
      note,
      photoUrl: window.currentPhotoDataUrl || '',
      audioUrl: window.currentAudioDataUrl || '',
      rawDate: todayISO,
      date: now.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
      dayOfWeek: now.toLocaleDateString('en-US', { weekday: 'long' })
    };

    entries.unshift(newEntry);
    localStorage.setItem('sphaera_entries', JSON.stringify(entries));

    reflectionInput.value = '';
    window.currentPhotoDataUrl = '';
    window.currentAudioDataUrl = '';
    document.getElementById('photo-preview-container')?.classList.add('hidden');
    document.getElementById('voice-memo-container')?.classList.add('hidden');

    // Refresh Spiral, Calendar, & Insights
    window.dispatchEvent(new Event('refresh-entries'));
  });
}

/* ==========================================================================
   4. VOICE RECORDER ENGINE (MEDIARECORDER API)
   ========================================================================== */
function initVoiceRecorderEngine() {
  const recordBtn = document.getElementById('voice-record-btn');
  const memoBox = document.getElementById('voice-memo-container');
  const indicator = document.getElementById('voice-recording-indicator');
  const timerEl = document.getElementById('voice-timer');

  const stopBtn = document.getElementById('stop-voice-btn');
  const playBtn = document.getElementById('play-voice-btn');
  const deleteBtn = document.getElementById('delete-voice-btn');

  let mediaRecorder = null;
  let audioChunks = [];
  let recordTimer = null;
  let seconds = 0;

  recordBtn?.addEventListener('click', async () => {
    getAudioContext();
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      mediaRecorder = new MediaRecorder(stream);
      audioChunks = [];

      mediaRecorder.ondataavailable = (e) => audioChunks.push(e.data);
      mediaRecorder.onstop = () => {
        const audioBlob = new Blob(audioChunks, { type: 'audio/webm' });
        const reader = new FileReader();
        reader.onloadend = () => {
          window.currentAudioDataUrl = reader.result;
          playBtn?.classList.remove('hidden');
          deleteBtn?.classList.remove('hidden');
        };
        reader.readAsDataURL(audioBlob);
      };

      mediaRecorder.start();
      seconds = 0;
      timerEl.textContent = '00:00';
      recordTimer = setInterval(() => {
        seconds++;
        const mins = String(Math.floor(seconds / 60)).padStart(2, '0');
        const secs = String(seconds % 60).padStart(2, '0');
        timerEl.textContent = `${mins}:${secs}`;
      }, 1000);

      memoBox?.classList.remove('hidden');
      indicator?.classList.remove('hidden');
      stopBtn?.classList.remove('hidden');
      recordBtn.classList.add('hidden');

    } catch (err) {
      alert('Microphone access is required to record voice notes.');
    }
  });

  stopBtn?.addEventListener('click', () => {
    if (mediaRecorder && mediaRecorder.state !== 'inactive') {
      mediaRecorder.stop();
      mediaRecorder.stream.getTracks().forEach(t => t.stop());
      clearInterval(recordTimer);
      indicator?.classList.add('hidden');
      stopBtn?.classList.add('hidden');
      recordBtn?.classList.remove('hidden');
    }
  });

  playBtn?.addEventListener('click', () => {
    if (window.currentAudioDataUrl) {
      const audio = new Audio(window.currentAudioDataUrl);
      audio.play();
    }
  });

  deleteBtn?.addEventListener('click', () => {
    window.currentAudioDataUrl = '';
    memoBox?.classList.add('hidden');
    playBtn?.classList.add('hidden');
    deleteBtn?.classList.add('hidden');
  });

  // Photo Attachment Handler
  const photoInput = document.getElementById('today-photo-input');
  const photoPreviewBox = document.getElementById('photo-preview-container');
  const photoPreviewImg = document.getElementById('photo-preview-img');
  const removePhotoBtn = document.getElementById('remove-photo-btn');

  photoInput?.addEventListener('change', (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (evt) => {
      window.currentPhotoDataUrl = evt.target.result;
      photoPreviewImg.src = window.currentPhotoDataUrl;
      photoPreviewBox?.classList.remove('hidden');
    };
    reader.readAsDataURL(file);
  });

  removePhotoBtn?.addEventListener('click', () => {
    window.currentPhotoDataUrl = '';
    if (photoInput) photoInput.value = '';
    photoPreviewBox?.classList.add('hidden');
  });
}

/* ==========================================================================
   5. THREE.JS 3D SPIRAL VIEW ENGINE (SIGNATURE VISUAL)
   ========================================================================== */
function initSpiralViewEngine() {
  const canvas = document.getElementById('spiral-canvas');
  if (!canvas) return;

  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(45, canvas.clientWidth / canvas.clientHeight, 0.1, 100);
  camera.position.set(0, 4, 9);
  camera.lookAt(0, 0, 0);

  const renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: true });
  renderer.setSize(canvas.clientWidth, canvas.clientHeight);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

  // Lights
  const ambientLight = new THREE.AmbientLight(0xffffff, 0.9);
  scene.add(ambientLight);
  const pointLight = new THREE.PointLight(0xffffff, 1.2);
  pointLight.position.set(2, 6, 4);
  scene.add(pointLight);

  const spiralGroup = new THREE.Group();
  scene.add(spiralGroup);

  function rebuildSpiral() {
    // Clear previous objects
    while (spiralGroup.children.length > 0) {
      spiralGroup.remove(spiralGroup.children[0]);
    }

    const entries = JSON.parse(localStorage.getItem('sphaera_entries') || '[]');

    if (entries.length === 0) return;

    // Spiral Math: angle = i * 0.4, radius = 0.8 + i * 0.22, y = -i * 0.18
    entries.forEach((entry, i) => {
      const angle = i * 0.45;
      const radius = 0.9 + i * 0.22;
      const x = radius * Math.cos(angle);
      const z = radius * Math.sin(angle);
      const y = -i * 0.18;

      const geometry = new THREE.SphereGeometry(0.35, 32, 32);
      const material = new THREE.MeshStandardMaterial({
        color: new THREE.Color(entry.color || '#2a9d8f'),
        roughness: 0.3,
        metalness: 0.1
      });

      const sphereMesh = new THREE.Mesh(geometry, material);
      sphereMesh.position.set(x, y, z);
      sphereMesh.userData = entry;

      spiralGroup.add(sphereMesh);
    });
  }

  rebuildSpiral();
  window.addEventListener('refresh-entries', rebuildSpiral);

  // Drag Orbit Spiral View
  let isDragging = false;
  let prevPosition = { x: 0, y: 0 };

  canvas.addEventListener('pointerdown', (e) => {
    isDragging = true;
    prevPosition = { x: e.clientX, y: e.clientY };
  });

  window.addEventListener('pointermove', (e) => {
    if (!isDragging) return;
    const deltaX = e.clientX - prevPosition.x;
    const deltaY = e.clientY - prevPosition.y;

    spiralGroup.rotation.y += deltaX * 0.008;
    spiralGroup.position.y -= deltaY * 0.01;

    prevPosition = { x: e.clientX, y: e.clientY };
  });

  window.addEventListener('pointerup', () => { isDragging = false; });

  function animate() {
    requestAnimationFrame(animate);
    if (!isDragging) {
      spiralGroup.rotation.y += 0.002;
    }
    renderer.render(scene, camera);
  }
  animate();

  window.addEventListener('resize-spiral', () => {
    if (canvas.clientWidth > 0) {
      camera.aspect = canvas.clientWidth / canvas.clientHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(canvas.clientWidth, canvas.clientHeight);
    }
  });
}

/* ==========================================================================
   6. CALENDAR VIEW ENGINE
   ========================================================================== */
function initCalendarViewEngine() {
  const grid = document.getElementById('calendar-grid');
  const monthTitle = document.getElementById('cal-month-title');
  const prevBtn = document.getElementById('cal-prev-month');
  const nextBtn = document.getElementById('cal-next-month');

  let activeDate = new Date();

  function renderCalendar() {
    if (!grid) return;
    grid.innerHTML = '';

    const year = activeDate.getFullYear();
    const month = activeDate.getMonth();

    monthTitle.textContent = activeDate.toLocaleDateString('en-US', { month: 'long', year: 'numeric' });

    const firstDay = new Date(year, month, 1).getDay();
    const daysInMonth = new Date(year, month + 1, 0).getDate();

    const entries = JSON.parse(localStorage.getItem('sphaera_entries') || '[]');

    // Empty lead cells
    for (let i = 0; i < firstDay; i++) {
      const emptyCell = document.createElement('div');
      emptyCell.className = 'cal-cell empty';
      grid.appendChild(emptyCell);
    }

    // Days cells
    for (let day = 1; day <= daysInMonth; day++) {
      const cellDateStr = `${year}-${String(month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
      const entry = entries.find(e => e.rawDate === cellDateStr);

      const cell = document.createElement('div');
      cell.className = 'cal-cell';
      cell.innerHTML = `
        <span class="cell-day-num">${day}</span>
        ${entry ? `<div class="cell-swatch" style="background:${entry.color}; color:${entry.color};"></div>` : ''}
      `;

      if (entry) {
        cell.addEventListener('click', () => openEntryDetailModal(entry));
      }

      grid.appendChild(cell);
    }
  }

  renderCalendar();
  window.addEventListener('refresh-entries', renderCalendar);

  prevBtn?.addEventListener('click', () => {
    activeDate.setMonth(activeDate.getMonth() - 1);
    renderCalendar();
  });

  nextBtn?.addEventListener('click', () => {
    activeDate.setMonth(activeDate.getMonth() + 1);
    renderCalendar();
  });
}

function openEntryDetailModal(entry) {
  getAudioContext();
  playHarmonicChime([523.25, 659.25, 783.99]);

  const modal = document.getElementById('entry-detail-modal');
  const dateEl = document.getElementById('detail-entry-date');
  const titleEl = document.getElementById('detail-entry-mood-title');
  const noteEl = document.getElementById('detail-entry-note');

  const photoBox = document.getElementById('detail-photo-box');
  const photoImg = document.getElementById('detail-photo-img');

  const voiceBox = document.getElementById('detail-voice-box');
  const playVoiceBtn = document.getElementById('detail-play-voice-btn');
  const deleteBtn = document.getElementById('delete-entry-btn');

  if (dateEl) dateEl.textContent = `${entry.date} (${entry.dayOfWeek || ''})`;
  if (titleEl) titleEl.textContent = `${MOOD_PRESETS[entry.preset]?.name || 'Mood'} Sphere`;
  if (noteEl) noteEl.textContent = `"${entry.note}"`;

  if (entry.photoUrl) {
    photoImg.src = entry.photoUrl;
    photoBox.classList.remove('hidden');
  } else {
    photoBox.classList.add('hidden');
  }

  if (entry.audioUrl) {
    voiceBox.classList.remove('hidden');
    playVoiceBtn.onclick = () => {
      const audio = new Audio(entry.audioUrl);
      audio.play();
    };
  } else {
    voiceBox.classList.add('hidden');
  }

  if (deleteBtn) {
    deleteBtn.onclick = () => {
      let entries = JSON.parse(localStorage.getItem('sphaera_entries') || '[]');
      entries = entries.filter(e => e.id !== entry.id);
      localStorage.setItem('sphaera_entries', JSON.stringify(entries));
      modal?.classList.add('hidden');
      window.dispatchEvent(new Event('refresh-entries'));
    };
  }

  modal?.classList.remove('hidden');
}

/* ==========================================================================
   7. INSIGHTS & MONTHLY ANALYTICS ENGINE
   ========================================================================== */
function initInsightsEngine() {
  const barsContainer = document.getElementById('insights-mood-bars');
  const streakNum = document.getElementById('streak-count');
  const correlationText = document.getElementById('insight-correlation-text');

  function renderInsights() {
    const entries = JSON.parse(localStorage.getItem('sphaera_entries') || '[]');

    if (!barsContainer) return;

    if (entries.length === 0) {
      streakNum.textContent = '0 Day Streak';
      barsContainer.innerHTML = '<p class="empty-state">Check in daily to build your mood patterns.</p>';
      return;
    }

    // Calculate Streak
    streakNum.textContent = `${entries.length} Check-ins`;

    // Mood Percentages
    const counts = {};
    entries.forEach(e => {
      counts[e.preset] = (counts[e.preset] || 0) + 1;
    });

    barsContainer.innerHTML = Object.keys(counts).map(key => {
      const count = counts[key];
      const pct = Math.round((count / entries.length) * 100);
      const meta = MOOD_PRESETS[key] || { name: key, color: '#ffb347' };

      return `
        <div class="insight-bar-row">
          <div class="bar-meta">
            <span>${meta.name}</span>
            <span>${pct}%</span>
          </div>
          <div class="bar-track">
            <div class="bar-fill" style="width:${pct}%; background:${meta.color};"></div>
          </div>
        </div>
      `;
    }).join('');

    // Correlation Text
    const daysMap = {};
    entries.forEach(e => {
      if (e.preset === 'calm' || e.preset === 'joy') {
        daysMap[e.dayOfWeek] = (daysMap[e.dayOfWeek] || 0) + 1;
      }
    });

    const bestDay = Object.keys(daysMap).sort((a, b) => daysMap[b] - daysMap[a])[0];
    if (bestDay) {
      correlationText.textContent = `Pattern Insight: You feel most peaceful and joyful on ${bestDay}s!`;
    }
  }

  renderInsights();
  window.addEventListener('refresh-entries', renderInsights);
}

/* ==========================================================================
   8. SKY LANTERNS & SOUNDSCAPES
   ========================================================================== */
function initSkyLanterns() {
  const skyCanvas = document.getElementById('sky-canvas');
  if (!skyCanvas) return;
  const ctx = skyCanvas.getContext('2d');

  let width = (skyCanvas.width = skyCanvas.clientWidth);
  let height = (skyCanvas.height = skyCanvas.clientHeight);

  let lanterns = JSON.parse(localStorage.getItem('haven_lanterns') || '[]');
  const releasedCountEl = document.getElementById('released-count');
  if (releasedCountEl) releasedCountEl.textContent = `${lanterns.length} lanterns floating`;

  function renderSky() {
    ctx.clearRect(0, 0, width, height);
    for (let i = 0; i < 30; i++) {
      ctx.fillStyle = `rgba(255, 255, 255, ${Math.random() * 0.5 + 0.3})`;
      ctx.beginPath();
      ctx.arc((Math.sin(i * 44) * 0.5 + 0.5) * width, (Math.cos(i * 12) * 0.5 + 0.5) * height, 1.2, 0, Math.PI * 2);
      ctx.fill();
    }
    requestAnimationFrame(renderSky);
  }
  renderSky();
}

function initSoundscapes() {
  let isAudioEnabled = false;
  const masterToggleBtn = document.getElementById('master-toggle-btn');
  masterToggleBtn?.addEventListener('click', () => {
    getAudioContext();
    isAudioEnabled = !isAudioEnabled;
    masterToggleBtn.textContent = isAudioEnabled ? '⏸ Pause Sanctuary Audio' : '▶ Enable Generator';
  });
}

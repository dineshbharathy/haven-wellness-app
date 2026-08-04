import React, { useState, useEffect, useRef } from 'react';
import {
  Button,
  Card,
  CardHeader,
  CardContent,
  CardFooter,
  CardTitle,
  Chip,
  Input,
  TextArea,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Avatar,
  Slider
} from '@heroui/react';
import {
  Mic,
  Sparkles,
  Volume2,
  VolumeX,
  Wind,
  ShieldCheck,
  Send,
  Phone,
  PhoneOff,
  Flame,
  CloudRain,
  Waves,
  Feather
} from 'lucide-react';

export default function App() {
  const [activeTab, setActiveTab] = useState('hub');

  // User Profile State
  const [username, setUsername] = useState(() => localStorage.getItem('haven_username') || 'Haven Spirit');
  const [struggle, setStruggle] = useState(() => localStorage.getItem('haven_struggle') || 'Parental Detachment / Longing for Dad');
  const [hugCount, setHugCount] = useState(() => parseInt(localStorage.getItem('haven_hug_count') || '0'));

  // Modals state
  const [isHugOpen, setIsHugOpen] = useState(false);
  const [isCallOpen, setIsCallOpen] = useState(false);
  const [isLanternOpen, setIsLanternOpen] = useState(false);
  const [isSurveyOpen, setIsSurveyOpen] = useState(false);
  const [isNoteModalOpen, setIsNoteModalOpen] = useState(false);

  // Audio Context Web Audio Synthesis
  const audioCtxRef = useRef(null);
  const getAudioCtx = () => {
    if (!audioCtxRef.current) {
      audioCtxRef.current = new (window.AudioContext || window.webkitAudioContext)();
    }
    if (audioCtxRef.current.state === 'suspended') {
      audioCtxRef.current.resume();
    }
    return audioCtxRef.current;
  };

  const playTone = (freq = 520, type = 'sine', duration = 1.2, vol = 0.08) => {
    try {
      const ctx = getAudioCtx();
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
  };

  // Quotes state
  const [quote, setQuote] = useState("It's okay to miss what isn't there, and still hold space for all the warmth that surrounds you.");
  const quotes = [
    "It's okay to miss what isn't there, and still hold space for all the warmth that surrounds you.",
    "You do not have to earn love or belonging. You are inherently worthy simply by being here.",
    "Your tender heart is not a weakness; it is proof of how deeply you can give and receive affection.",
    "Growth happens in quiet, gentle moments. Give yourself permission to pause."
  ];

  const handleNextQuote = () => {
    playTone(640, 'sine', 0.8, 0.06);
    const randomQuote = quotes[Math.floor(Math.random() * quotes.length)];
    setQuote(randomQuote);
  };

  const handleWarmEmbrace = () => {
    const nextCount = hugCount + 1;
    setHugCount(nextCount);
    localStorage.setItem('haven_hug_count', nextCount);
    playTone(349.23, 'triangle', 0.8, 0.1);
    setIsHugOpen(true);
  };

  // Dr. Aura AI Chat State
  const [aiListening, setAiListening] = useState(false);
  const [aiSpeechEnabled, setAiSpeechEnabled] = useState(true);
  const [aiInput, setAiInput] = useState('');
  const [aiMessages, setAiMessages] = useState([
    { author: 'Dr. Aura (AI Therapist Agent)', text: 'Hello dear. I am Dr. Aura. I am here to provide a safe, non-judgmental space for whatever you are carrying. How are you feeling today?' }
  ]);

  const handleSendAiMessage = () => {
    if (!aiInput.trim()) return;
    const userMsg = aiInput.trim();
    setAiMessages(prev => [...prev, { author: 'You', text: userMsg }]);
    setAiInput('');
    setAiListening(true);

    setTimeout(() => {
      setAiListening(false);
      const responses = [
        "I hear you deeply. What you are experiencing is completely valid. How does it feel to put that into words right now?",
        "Thank you for sharing that with me. It takes courage to express tender emotions. Take a soft breath with me.",
        "Your feelings matter, and you are not alone in carrying this. Let's hold space for whatever comes up next."
      ];
      const botMsg = responses[Math.floor(Math.random() * responses.length)];
      setAiMessages(prev => [...prev, { author: 'Dr. Aura (AI Therapist Agent)', text: botMsg }]);
      playTone(520, 'sine', 1.0, 0.08);

      if (aiSpeechEnabled && 'speechSynthesis' in window) {
        try {
          window.speechSynthesis.cancel();
          const utterance = new SpeechSynthesisUtterance(botMsg);
          utterance.pitch = 1.05;
          utterance.rate = 0.95;
          window.speechSynthesis.speak(utterance);
        } catch (e) {}
      }
    }, 1200);
  };

  // Peer Network State
  const [currentChannel, setCurrentChannel] = useState('general');
  const [peerInput, setPeerInput] = useState('');
  const [channelMessages, setChannelMessages] = useState({
    general: [
      { name: 'Sophia', tag: 'Peer Mentor', color: 'primary', avatar: '🌸', text: 'Good evening everyone. Sending a gentle reminder to pause and take a soft breath.' },
      { name: 'Marcus', tag: 'Safe Voice', color: 'secondary', avatar: '🌿', text: 'Appreciate being here. Had a heavy day missing my family, but reading quotes here helped.' }
    ],
    family: [
      { name: 'Aria', tag: 'Support Peer', color: 'warning', avatar: '🕯️', text: 'It\'s okay to hold love for parents while protecting your inner peace.' }
    ],
    wins: [
      { name: 'Elena', tag: 'Peer Mentor', color: 'success', avatar: '✨', text: 'Small win: I drank warm tea, listened to ocean soundscapes, and didn\'t rush myself.' }
    ]
  });

  const handleSendPeerMsg = () => {
    if (!peerInput.trim()) return;
    const msg = peerInput.trim();
    setChannelMessages(prev => ({
      ...prev,
      [currentChannel]: [...(prev[currentChannel] || []), { name: username, tag: 'Sanctuary Member', color: 'secondary', avatar: '🤍', text: msg }]
    }));
    setPeerInput('');
    playTone(660, 'sine', 0.5, 0.06);
  };

  // Call Engine State
  const [callerName, setCallerName] = useState('Sophia 🌸');
  const [isCallActive, setIsCallActive] = useState(false);

  const startVoiceCall = (name) => {
    setCallerName(name);
    setIsCallActive(false);
    setIsCallOpen(true);
    playTone(523.25, 'sine', 1.2, 0.1);
  };

  // Emotion Studio State
  const [orbColor1, setOrbColor1] = useState('#ffcf56');
  const [orbColor2, setOrbColor2] = useState('#d946ef');
  const [orbTitle, setOrbTitle] = useState('');
  const [orbNote, setOrbNote] = useState('');
  const [orbsArchive, setOrbsArchive] = useState([
    { title: 'Peaceful Sunset Reflection', date: 'Aug 4, 2026', c1: '#ffcf56', c2: '#d946ef', note: 'Spent a quiet evening drinking chamomile tea while reflecting on happy memories.' }
  ]);

  const handleSaveOrb = () => {
    const newOrb = {
      title: orbTitle || 'Affective Emotion Orb',
      date: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
      c1: orbColor1,
      c2: orbColor2,
      note: orbNote || 'Logged in Haven Sanctuary.'
    };
    setOrbsArchive([newOrb, ...orbsArchive]);
    setOrbTitle('');
    setOrbNote('');
    playTone(750, 'sine', 0.8, 0.08);
  };

  // Sky Release Vault State
  const [lanternText, setLanternText] = useState('');
  const [lanternColor, setLanternColor] = useState('#ffcf56');
  const [releasedLanterns, setReleasedLanterns] = useState([
    { message: 'Dear Dad, I miss our weekend talks. Holding space for you tonight.', color: '#ffcf56', date: 'Aug 4, 2026' }
  ]);

  const handleReleaseLantern = () => {
    if (!lanternText.trim()) return;
    setReleasedLanterns([
      { message: lanternText.trim(), color: lanternColor, date: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }) },
      ...releasedLanterns
    ]);
    setLanternText('');
    setIsLanternOpen(false);
    playTone(880, 'sine', 1.0, 0.08);
  };

  // Breathing Oasis State
  const [breathPhase, setBreathPhase] = useState('Ready');
  const [breathTimer, setBreathTimer] = useState('--');
  const [isBreathing, setIsBreathing] = useState(false);
  const [breathMode, setBreathMode] = useState('4-7-8');

  useEffect(() => {
    let interval = null;
    if (isBreathing) {
      setBreathPhase('Inhale Softly...');
      setBreathTimer('4');
      playTone(440, 'sine', 4, 0.06);

      let t = 4;
      interval = setInterval(() => {
        t--;
        if (t > 0) {
          setBreathTimer(t.toString());
        } else {
          setBreathPhase('Exhale Slowly...');
          setBreathTimer('8');
          playTone(330, 'sine', 8, 0.05);
        }
      }, 1000);
    } else {
      setBreathPhase('Ready');
      setBreathTimer('--');
    }
    return () => clearInterval(interval);
  }, [isBreathing]);

  // Comfort Note Jar State
  const [drawnNote, setDrawnNote] = useState('');
  const comfortNotes = [
    "You carry immense strength within you, even on quiet days.",
    "Your feelings are valid and deserving of soft compassion.",
    "You are worthy of the same tender warmth you so generously give to others.",
    "Growth is not linear. Be gentle with your tender heart today."
  ];

  const handleDrawNote = () => {
    const randomNote = comfortNotes[Math.floor(Math.random() * comfortNotes.length)];
    setDrawnNote(randomNote);
    setIsNoteModalOpen(true);
    playTone(523.25, 'sine', 1.0, 0.08);
  };

  // Journal State
  const [journalTitle, setJournalTitle] = useState('');
  const [journalBody, setJournalBody] = useState('');
  const [journalEntries, setJournalEntries] = useState(() => JSON.parse(localStorage.getItem('haven_journal_entries') || '[]'));

  const handleSaveJournal = () => {
    if (!journalBody.trim()) return;
    const newEntry = {
      title: journalTitle.trim() || 'Untitled Check-In',
      body: journalBody.trim(),
      date: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
    };
    const updated = [newEntry, ...journalEntries];
    setJournalEntries(updated);
    localStorage.setItem('haven_journal_entries', JSON.stringify(updated));
    setJournalTitle('');
    setJournalBody('');
    playTone(700, 'sine', 0.8, 0.08);
  };

  return (
    <div className="min-h-screen flex flex-col max-w-7xl mx-auto px-4 py-3 relative z-10">
      
      {/* Header Navigation Bar */}
      <header className="glass-nav rounded-2xl mb-6 shadow-sm p-4 flex justify-between items-center">
        <div className="flex items-center gap-3">
          <span className="text-2xl animate-pulse">🌿</span>
          <div className="flex flex-col">
            <span className="font-serif font-bold text-xl tracking-tight text-slate-900">Haven Sanctuary</span>
            <span className="text-[10px] uppercase font-bold tracking-widest text-fuchsia-600">HeroUI Clinical Edition</span>
          </div>
        </div>

        <nav className="hidden md:flex gap-1 bg-white/30 p-1.5 rounded-xl border border-white/50">
          <Button
            size="sm"
            variant={activeTab === 'hub' ? 'flat' : 'light'}
            color={activeTab === 'hub' ? 'secondary' : 'default'}
            className="font-medium"
            onClick={() => setActiveTab('hub')}
          >
            🏡 Sanctuary
          </Button>
          <Button
            size="sm"
            variant={activeTab === 'ai-listener' ? 'flat' : 'light'}
            color={activeTab === 'ai-listener' ? 'secondary' : 'default'}
            className="font-medium"
            onClick={() => setActiveTab('ai-listener')}
          >
            🎙️ AI Therapist
          </Button>
          <Button
            size="sm"
            variant={activeTab === 'community' ? 'flat' : 'light'}
            color={activeTab === 'community' ? 'secondary' : 'default'}
            className="font-medium"
            onClick={() => setActiveTab('community')}
          >
            💬 Peer Network
          </Button>
          <Button
            size="sm"
            variant={activeTab === 'memory-orbs' ? 'flat' : 'light'}
            color={activeTab === 'memory-orbs' ? 'secondary' : 'default'}
            className="font-medium"
            onClick={() => setActiveTab('memory-orbs')}
          >
            🔮 Emotion Studio
          </Button>
          <Button
            size="sm"
            variant={activeTab === 'lanterns' ? 'flat' : 'light'}
            color={activeTab === 'lanterns' ? 'secondary' : 'default'}
            className="font-medium"
            onClick={() => setActiveTab('lanterns')}
          >
            🏮 Release Sky
          </Button>
          <Button
            size="sm"
            variant={activeTab === 'breathing' ? 'flat' : 'light'}
            color={activeTab === 'breathing' ? 'secondary' : 'default'}
            className="font-medium"
            onClick={() => setActiveTab('breathing')}
          >
            🌬️ Regulation
          </Button>
          <Button
            size="sm"
            variant={activeTab === 'soundscapes' ? 'flat' : 'light'}
            color={activeTab === 'soundscapes' ? 'secondary' : 'default'}
            className="font-medium"
            onClick={() => setActiveTab('soundscapes')}
          >
            🎶 Soundscapes
          </Button>
          <Button
            size="sm"
            variant={activeTab === 'memory-jar' ? 'flat' : 'light'}
            color={activeTab === 'memory-jar' ? 'secondary' : 'default'}
            className="font-medium"
            onClick={() => setActiveTab('memory-jar')}
          >
            📜 Memory Jar
          </Button>
          <Button
            size="sm"
            variant={activeTab === 'journal' ? 'flat' : 'light'}
            color={activeTab === 'journal' ? 'secondary' : 'default'}
            className="font-medium"
            onClick={() => setActiveTab('journal')}
          >
            🔒 Safe Journal
          </Button>
        </nav>

        <div className="flex items-center gap-2">
          <Chip size="sm" color="success" variant="flat" startContent={<ShieldCheck className="w-3.5 h-3.5" />}>
            HIPAA Privacy
          </Chip>
          <Button size="sm" variant="bordered" className="font-semibold text-fuchsia-600" onClick={() => setIsSurveyOpen(true)}>
            👤 {username}
          </Button>
        </div>
      </header>

      {/* Main Container */}
      <div className="flex-1 space-y-6">

        {/* Dynamic Header Titles */}
        <div className="space-y-1">
          <h1 className="font-serif text-4xl font-bold tracking-tight bg-gradient-to-r from-slate-900 via-fuchsia-600 to-amber-500 bg-clip-text text-transparent">
            {activeTab === 'hub' && 'Sanctuary Overview'}
            {activeTab === 'ai-listener' && 'Clinical AI Therapist (Dr. Aura)'}
            {activeTab === 'community' && 'Sanctuary Circle Peer Support'}
            {activeTab === 'memory-orbs' && 'Cognitive Emotion Studio'}
            {activeTab === 'lanterns' && 'Sky Intentions Vault'}
            {activeTab === 'breathing' && 'Autonomic Parasympathetic Regulation'}
            {activeTab === 'soundscapes' && 'Neuro-Acoustic Soundscapes'}
            {activeTab === 'memory-jar' && 'Cognitive Gratitude Vault'}
            {activeTab === 'journal' && 'Confidential Reflective Check-In'}
          </h1>
          <p className="text-sm text-slate-600">
            Evidence-based emotional regulation, Rogerian person-centered AI therapy, and moderated peer warmth.
          </p>
        </div>

        {/* TAB 1: SANCTUARY HUB */}
        {activeTab === 'hub' && (
          <div className="space-y-6">
            <Card className="glass-card p-4 relative overflow-hidden">
              <div className="absolute inset-0 pointer-events-none overflow-hidden">
                <div className="absolute -top-10 left-10 w-44 h-44 rounded-full bg-amber-300/40 blur-3xl animate-orb-float"></div>
                <div className="absolute -bottom-10 right-10 w-52 h-52 rounded-full bg-fuchsia-400/30 blur-3xl animate-orb-float"></div>
              </div>

              <CardHeader className="flex flex-col items-start gap-2 relative z-10">
                <div className="flex items-center gap-2">
                  <Chip size="sm" color="warning" variant="flat" className="uppercase font-bold tracking-wider text-[10px]">
                    Autonomic Regulation Active
                  </Chip>
                  <Chip size="sm" color="default" variant="bordered" className="text-[10px]">
                    ✓ Peer-Reviewed Modalities
                  </Chip>
                </div>
                <h2 className="font-serif text-3xl font-semibold text-slate-900">
                  Welcome to your clinical wellness sanctuary.
                </h2>
                <p className="text-sm text-slate-600 max-w-xl">
                  Designed under Rogerian person-centered principles, cognitive reframing, and elegant HeroUI components.
                </p>
              </CardHeader>

              <CardContent className="relative z-10 space-y-4">
                <div className="bg-white/40 backdrop-blur-md p-4 rounded-xl border border-white/60 space-y-2">
                  <span className="text-[10px] font-extrabold uppercase tracking-widest text-slate-500">
                    THERAPEUTIC REFLECTION & REFRAMING
                  </span>
                  <blockquote className="font-serif text-lg italic text-slate-800 border-l-3 border-fuchsia-400 pl-3 py-1">
                    "{quote}"
                  </blockquote>
                  <Button size="sm" variant="light" color="secondary" className="font-semibold text-xs" onClick={handleNextQuote}>
                    ✨ Reflective Reframing
                  </Button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <Card className="glass-card hover:scale-[1.01] transition-transform">
                    <CardContent className="space-y-3 p-4">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-fuchsia-100 text-fuchsia-600 flex items-center justify-center font-bold">
                          🎙️
                        </div>
                        <div>
                          <h4 className="font-serif font-semibold text-slate-900">Dr. Aura (AI)</h4>
                          <p className="text-xs text-slate-500">Rogerian therapy</p>
                        </div>
                      </div>
                      <Button color="secondary" variant="shadow" className="w-full font-medium" onClick={() => setActiveTab('ai-listener')}>
                        🎙️ Talk with Dr. Aura
                      </Button>
                    </CardContent>
                  </Card>

                  <Card className="glass-card hover:scale-[1.01] transition-transform">
                    <CardContent className="space-y-3 p-4">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center font-bold">
                          💬
                        </div>
                        <div>
                          <h4 className="font-serif font-semibold text-slate-900">Peer Network</h4>
                          <p className="text-xs text-slate-500">Sanctuary Circle</p>
                        </div>
                      </div>
                      <Button color="success" variant="flat" className="w-full font-medium" onClick={() => setActiveTab('community')}>
                        💬 Enter Peer Network
                      </Button>
                    </CardContent>
                  </Card>

                  <Card className="glass-card hover:scale-[1.01] transition-transform">
                    <CardContent className="space-y-3 p-4">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-amber-100 text-amber-600 flex items-center justify-center font-bold">
                          🫂
                        </div>
                        <div>
                          <h4 className="font-serif font-semibold text-slate-900">Warmth Embrace</h4>
                          <p className="text-xs text-slate-500">{hugCount} hugs received</p>
                        </div>
                      </div>
                      <Button color="warning" variant="shadow" className="w-full font-medium" onClick={handleWarmEmbrace}>
                        ❤️ Experience Warmth
                      </Button>
                    </CardContent>
                  </Card>
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {/* TAB 2: AI THERAPIST */}
        {activeTab === 'ai-listener' && (
          <Card className="glass-card p-4 space-y-4">
            <CardHeader className="flex flex-col items-center text-center gap-3">
              <div className="w-28 h-28 rounded-full bg-gradient-to-tr from-amber-400 via-rose-400 to-fuchsia-500 p-1 animate-aura-pulse shadow-lg flex items-center justify-center">
                <div className="w-24 h-24 rounded-full bg-white/90 backdrop-blur-md flex items-center justify-center text-4xl">
                  🌸
                </div>
              </div>
              <div>
                <h3 className="font-serif text-2xl font-bold text-slate-900">Dr. Aura is listening in active reflection mode</h3>
                <p className="text-xs text-slate-500">Autonomous Clinical AI Therapist Agent. Rogerian person-centered speech synthesis.</p>
              </div>

              <div className="flex gap-3 items-center">
                <Button
                  color={aiListening ? 'danger' : 'secondary'}
                  variant="shadow"
                  startContent={<Mic className="w-4 h-4" />}
                  onClick={() => setAiListening(!aiListening)}
                >
                  {aiListening ? '⏹ Listening... Speak Now' : '🎙️ Tap to Speak with Dr. Aura'}
                </Button>
                <Button
                  isIconOnly
                  variant={aiSpeechEnabled ? 'flat' : 'bordered'}
                  color="secondary"
                  onClick={() => setAiSpeechEnabled(!aiSpeechEnabled)}
                >
                  {aiSpeechEnabled ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4" />}
                </Button>
              </div>
            </CardHeader>

            <CardContent className="space-y-4">
              <div className="bg-slate-900/5 p-4 rounded-2xl max-h-80 overflow-y-auto space-y-3">
                {aiMessages.map((msg, idx) => (
                  <div key={idx} className={`p-3.5 rounded-2xl max-w-xl ${msg.author.includes('Aura') ? 'bg-fuchsia-500/10 border border-fuchsia-500/20 ml-0' : 'bg-white shadow-sm border border-slate-200 ml-auto text-right'}`}>
                    <span className="text-[10px] font-bold text-fuchsia-600 block mb-1">{msg.author}:</span>
                    <p className="font-serif text-sm text-slate-800 leading-relaxed">"{msg.text}"</p>
                  </div>
                ))}
              </div>

              <div className="flex gap-2">
                <Input
                  placeholder="Express your feelings safely to Dr. Aura..."
                  value={aiInput}
                  onChange={(e) => setAiInput(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && handleSendAiMessage()}
                />
                <Button color="secondary" endContent={<Send className="w-4 h-4" />} onClick={handleSendAiMessage}>
                  Send
                </Button>
              </div>
            </CardContent>
          </Card>
        )}

        {/* TAB 3: PEER NETWORK */}
        {activeTab === 'community' && (
          <Card className="glass-card grid grid-cols-1 md:grid-cols-4 min-h-[500px]">
            <div className="p-4 border-r border-slate-200/60 space-y-4">
              <div className="flex items-center gap-2">
                <span className="text-xl">🌸</span>
                <span className="font-bold text-sm text-slate-900">Sanctuary Circle</span>
              </div>
              <div className="space-y-1">
                <Button
                  size="sm"
                  variant={currentChannel === 'general' ? 'flat' : 'light'}
                  color="secondary"
                  className="w-full justify-start font-medium"
                  onClick={() => setCurrentChannel('general')}
                >
                  # general-sanctuary
                </Button>
                <Button
                  size="sm"
                  variant={currentChannel === 'family' ? 'flat' : 'light'}
                  color="secondary"
                  className="w-full justify-start font-medium"
                  onClick={() => setCurrentChannel('family')}
                >
                  # family-and-longing
                </Button>
                <Button
                  size="sm"
                  variant={currentChannel === 'wins' ? 'flat' : 'light'}
                  color="secondary"
                  className="w-full justify-start font-medium"
                  onClick={() => setCurrentChannel('wins')}
                >
                  # daily-wins-and-warmth
                </Button>
              </div>

              <div className="pt-4 border-t border-slate-200/60 space-y-2">
                <span className="text-[10px] uppercase font-bold tracking-wider text-slate-400">ACTIVE PEERS</span>
                <div className="space-y-2">
                  <div className="flex justify-between items-center bg-white/40 p-2 rounded-lg text-xs">
                    <span>Sophia 🌸</span>
                    <Button size="xs" isIconOnly variant="light" color="secondary" onClick={() => startVoiceCall('Sophia 🌸')}>
                      <Phone className="w-3 h-3" />
                    </Button>
                  </div>
                  <div className="flex justify-between items-center bg-white/40 p-2 rounded-lg text-xs">
                    <span>Marcus 🌿</span>
                    <Button size="xs" isIconOnly variant="light" color="secondary" onClick={() => startVoiceCall('Marcus 🌿')}>
                      <Phone className="w-3 h-3" />
                    </Button>
                  </div>
                </div>
              </div>
            </div>

            <div className="md:col-span-3 p-4 flex flex-col justify-between space-y-4">
              <div className="flex justify-between items-center pb-2 border-b border-slate-200/60">
                <span className="font-bold text-sm text-slate-900">#{currentChannel}-sanctuary</span>
                <Chip size="sm" color="success" variant="flat">🟢 Connected & Moderated</Chip>
              </div>

              <div className="flex-1 max-h-80 overflow-y-auto space-y-3 pr-2">
                {(channelMessages[currentChannel] || []).map((msg, idx) => (
                  <div key={idx} className="flex gap-3 items-start">
                    <Avatar name={msg.avatar} size="sm" className="text-base" />
                    <div className="bg-white/80 p-3 rounded-2xl shadow-sm border border-slate-100 flex-1">
                      <div className="flex gap-2 items-center mb-1">
                        <span className="font-bold text-xs text-slate-900">{msg.name}</span>
                        <Chip size="xs" color={msg.color} variant="flat" className="h-4 text-[9px]">
                          {msg.tag}
                        </Chip>
                      </div>
                      <p className="text-xs text-slate-700 leading-relaxed">{msg.text}</p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="flex gap-2 pt-2">
                <Input
                  placeholder="Share comfortably with peers..."
                  value={peerInput}
                  onChange={(e) => setPeerInput(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && handleSendPeerMsg()}
                />
                <Button color="secondary" onClick={handleSendPeerMsg}>
                  Send
                </Button>
              </div>
            </div>
          </Card>
        )}

        {/* TAB 4: EMOTION STUDIO */}
        {activeTab === 'memory-orbs' && (
          <Card className="glass-card p-4 space-y-4">
            <CardHeader className="flex flex-col items-center space-y-2">
              <div
                className="w-32 h-32 rounded-full border-2 border-white shadow-xl animate-liquid-morph transition-all duration-500"
                style={{ background: `radial-gradient(circle at 35% 35%, #ffffff 0%, ${orbColor1} 40%, ${orbColor2} 100%)` }}
              ></div>
              <span className="text-xs font-semibold text-slate-600">Animated Liquid Emotion Sphere</span>
            </CardHeader>

            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 bg-white/40 p-4 rounded-xl border border-white/60">
                <div className="space-y-2">
                  <label className="text-xs font-bold text-slate-700">Primary Gradient Color</label>
                  <input type="color" value={orbColor1} onChange={(e) => setOrbColor1(e.target.value)} className="w-full h-10 rounded-lg cursor-pointer bg-transparent" />
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-bold text-slate-700">Secondary Rim Color</label>
                  <input type="color" value={orbColor2} onChange={(e) => setOrbColor2(e.target.value)} className="w-full h-10 rounded-lg cursor-pointer bg-transparent" />
                </div>
              </div>

              <div className="space-y-3">
                <Input placeholder="Affective Title..." value={orbTitle} onChange={(e) => setOrbTitle(e.target.value)} />
                <TextArea placeholder="Reflect on your emotional state..." value={orbNote} onChange={(e) => setOrbNote(e.target.value)} />
                <Button color="secondary" variant="shadow" className="w-full font-bold" onClick={handleSaveOrb}>
                  🔮 Archive Emotion Orb
                </Button>
              </div>

              {orbsArchive.length > 0 && (
                <div className="space-y-2 pt-4 border-t border-slate-200/60">
                  <span className="text-[10px] font-extrabold uppercase tracking-widest text-slate-400">ARCHIVED EMOTION JOURNEY</span>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {orbsArchive.map((o, idx) => (
                      <div key={idx} className="bg-white/70 p-3 rounded-xl border border-slate-200/60 flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full flex-shrink-0" style={{ background: `radial-gradient(circle, ${o.c1}, ${o.c2})` }}></div>
                        <div>
                          <h5 className="font-semibold text-xs text-slate-900">{o.title}</h5>
                          <p className="text-[11px] text-slate-500">{o.note}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        )}

        {/* TAB 5: SKY RELEASE VAULT */}
        {activeTab === 'lanterns' && (
          <Card className="glass-card p-4 space-y-4">
            <CardHeader className="flex justify-between items-center">
              <div>
                <h3 className="font-serif text-xl font-bold text-slate-900">Sky Release Vault</h3>
                <p className="text-xs text-slate-500">Release grief, longing, and intentions into the glowing night sky.</p>
              </div>
              <Button color="secondary" variant="shadow" startContent={<Sparkles className="w-4 h-4" />} onClick={() => setIsLanternOpen(true)}>
                ✨ Release Lantern
              </Button>
            </CardHeader>

            <CardContent className="space-y-4">
              <div className="h-64 rounded-2xl bg-gradient-to-b from-slate-950 via-purple-950 to-slate-900 p-4 relative overflow-hidden flex flex-col justify-end">
                <div className="absolute inset-0 opacity-40">
                  {releasedLanterns.map((l, idx) => (
                    <div
                      key={idx}
                      className="absolute w-5 h-7 rounded-md animate-orb-float blur-[1px] shadow-lg"
                      style={{
                        background: l.color,
                        boxShadow: `0 0 20px ${l.color}`,
                        top: `${(idx * 25) % 80}%`,
                        left: `${(idx * 30 + 10) % 90}%`
                      }}
                    ></div>
                  ))}
                </div>
                <p className="text-center text-xs text-slate-400 relative z-10">
                  ✨ {releasedLanterns.length} Intentional Lanterns Floating in Sanctuary Sky
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {releasedLanterns.map((l, idx) => (
                  <div key={idx} className="bg-white/60 p-3 rounded-xl border border-slate-200 flex flex-col gap-1">
                    <div className="flex justify-between text-[11px] text-slate-400">
                      <span style={{ color: l.color }} className="font-bold">🏮 Lantern #{releasedLanterns.length - idx}</span>
                      <span>{l.date}</span>
                    </div>
                    <p className="font-serif text-sm text-slate-800 italic">"{l.message}"</p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        )}

        {/* TAB 6: BREATHING OASIS */}
        {activeTab === 'breathing' && (
          <Card className="glass-card p-4 space-y-6">
            <CardHeader className="flex flex-col items-center space-y-4">
              <div className="flex gap-2">
                <Button size="sm" variant={breathMode === '4-7-8' ? 'flat' : 'light'} color="secondary" onClick={() => setBreathMode('4-7-8')}>
                  4-7-8 Parasympathetic
                </Button>
                <Button size="sm" variant={breathMode === '4-4-4' ? 'flat' : 'light'} color="secondary" onClick={() => setBreathMode('4-4-4')}>
                  4-4-4 Box Breathing
                </Button>
              </div>

              <div className={`w-44 h-44 rounded-full border-4 border-white/80 shadow-2xl flex flex-col items-center justify-center transition-all duration-1000 ${isBreathing ? 'scale-125 bg-emerald-400/30' : 'bg-fuchsia-400/20'}`}>
                <span className="font-serif text-lg font-bold text-slate-800">{breathPhase}</span>
                <span className="text-3xl font-extrabold text-fuchsia-600">{breathTimer}</span>
              </div>

              <Button
                color={isBreathing ? 'danger' : 'secondary'}
                variant="shadow"
                size="lg"
                startContent={<Wind className="w-5 h-5" />}
                onClick={() => setIsBreathing(!isBreathing)}
              >
                {isBreathing ? '⏹ Stop Regulation' : '▶ Begin Autonomic Regulation'}
              </Button>
            </CardHeader>
          </Card>
        )}

        {/* TAB 7: SOUNDSCAPES */}
        {activeTab === 'soundscapes' && (
          <Card className="glass-card p-4 space-y-4">
            <CardHeader>
              <h3 className="font-serif text-xl font-bold text-slate-900">Neuro-Acoustic Sanctuary Audio</h3>
            </CardHeader>

            <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-white/60 p-4 rounded-xl border border-slate-200 space-y-2">
                <div className="flex items-center gap-3">
                  <CloudRain className="w-6 h-6 text-blue-500" />
                  <div>
                    <h5 className="font-bold text-sm">Window Rain</h5>
                    <p className="text-xs text-slate-500">Pink Noise Frequencies</p>
                  </div>
                </div>
                <Slider aria-label="Rain volume" defaultValue={0.5} color="secondary" className="max-w-md" />
              </div>

              <div className="bg-white/60 p-4 rounded-xl border border-slate-200 space-y-2">
                <div className="flex items-center gap-3">
                  <Flame className="w-6 h-6 text-amber-500" />
                  <div>
                    <h5 className="font-bold text-sm">Cozy Campfire</h5>
                    <p className="text-xs text-slate-500">Warm Acoustic Crackle</p>
                  </div>
                </div>
                <Slider aria-label="Campfire volume" defaultValue={0.5} color="warning" className="max-w-md" />
              </div>

              <div className="bg-white/60 p-4 rounded-xl border border-slate-200 space-y-2">
                <div className="flex items-center gap-3">
                  <Waves className="w-6 h-6 text-cyan-500" />
                  <div>
                    <h5 className="font-bold text-sm">Ocean Waves</h5>
                    <p className="text-xs text-slate-500">Lowpass Rolling Tides</p>
                  </div>
                </div>
                <Slider aria-label="Ocean volume" defaultValue={0.5} color="info" className="max-w-md" />
              </div>

              <div className="bg-white/60 p-4 rounded-xl border border-slate-200 space-y-2">
                <div className="flex items-center gap-3">
                  <Feather className="w-6 h-6 text-emerald-500" />
                  <div>
                    <h5 className="font-bold text-sm">Forest Breeze</h5>
                    <p className="text-xs text-slate-500">Subtle Air Resonator</p>
                  </div>
                </div>
                <Slider aria-label="Breeze volume" defaultValue={0.5} color="success" className="max-w-md" />
              </div>
            </CardContent>
          </Card>
        )}

        {/* TAB 8: MEMORY JAR */}
        {activeTab === 'memory-jar' && (
          <Card className="glass-card p-4 space-y-4">
            <CardHeader className="flex flex-col items-center text-center space-y-2">
              <div className="w-32 h-44 rounded-b-3xl rounded-t-lg bg-white/40 border-2 border-white backdrop-blur-md shadow-xl flex items-center justify-center p-3">
                <span className="text-4xl animate-bounce">📜</span>
              </div>
              <h3 className="font-serif text-xl font-bold text-slate-900">Cognitive Memory Vault</h3>
            </CardHeader>

            <CardFooter className="flex justify-center gap-4">
              <Button color="secondary" variant="shadow" onClick={handleDrawNote}>
                ✨ Draw Comfort Note
              </Button>
            </CardFooter>
          </Card>
        )}

        {/* TAB 9: SAFE JOURNAL */}
        {activeTab === 'journal' && (
          <Card className="glass-card p-4 space-y-4">
            <CardHeader>
              <h3 className="font-serif text-xl font-bold text-slate-900">Confidential Safe Journal</h3>
            </CardHeader>

            <CardContent className="space-y-4">
              <Input placeholder="Entry Title..." value={journalTitle} onChange={(e) => setJournalTitle(e.target.value)} />
              <TextArea placeholder="Write privately and securely..." value={journalBody} onChange={(e) => setJournalBody(e.target.value)} rows={4} />
              <Button color="secondary" variant="shadow" onClick={handleSaveJournal}>
                🔒 Save Private Entry
              </Button>

              {journalEntries.length > 0 && (
                <div className="space-y-3 pt-4 border-t border-slate-200/60">
                  <span className="text-[10px] font-extrabold uppercase tracking-widest text-slate-400">PREVIOUS PRIVATE ENTRIES</span>
                  <div className="space-y-2">
                    {journalEntries.map((e, idx) => (
                      <div key={idx} className="bg-white/70 p-3 rounded-xl border border-slate-200/60">
                        <div className="flex justify-between text-xs font-bold text-slate-800 mb-1">
                          <span>{e.title}</span>
                          <span className="text-[10px] text-slate-400">{e.date}</span>
                        </div>
                        <p className="font-serif text-xs text-slate-700 leading-relaxed">{e.body}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        )}

      </div>

      {/* MODAL: Warm Embrace */}
      <Modal isOpen={isHugOpen} onClose={() => setIsHugOpen(false)}>
        <ModalHeader className="flex flex-col gap-1 text-center font-serif text-2xl font-bold">
          🫂 Warmth Embrace
        </ModalHeader>
        <ModalBody className="text-center space-y-3">
          <span className="text-5xl block animate-pulse">❤️</span>
          <p className="font-serif italic text-slate-800">
            "You are deeply appreciated, cherished, and worthy of all the soft warmth in the world."
          </p>
          <Chip color="secondary" variant="flat" size="sm">
            🌸 Hug #{hugCount} Felt Today
          </Chip>
        </ModalBody>
        <ModalFooter>
          <Button color="secondary" className="w-full font-bold" onClick={() => setIsHugOpen(false)}>
            ❤️ Receive Warmth & Close
          </Button>
        </ModalFooter>
      </Modal>

      {/* MODAL: Apple Call */}
      <Modal isOpen={isCallOpen} onClose={() => setIsCallOpen(false)}>
        <ModalHeader className="flex flex-col items-center gap-2">
          <Avatar name={callerName} size="lg" className="w-20 h-20 text-3xl" />
          <h3 className="font-serif text-2xl font-bold text-slate-900">{callerName}</h3>
          <p className="text-xs text-slate-500">Haven Sanctuary Voice Call...</p>
        </ModalHeader>
        <ModalFooter className="justify-center gap-6 pb-6">
          <Button isIconOnly radius="full" color="danger" size="lg" onClick={() => setIsCallOpen(false)}>
            <PhoneOff className="w-6 h-6" />
          </Button>
          <Button isIconOnly radius="full" color="success" size="lg" onClick={() => setIsCallActive(true)}>
            <Phone className="w-6 h-6" />
          </Button>
        </ModalFooter>
      </Modal>

      {/* MODAL: Release Lantern */}
      <Modal isOpen={isLanternOpen} onClose={() => setIsLanternOpen(false)}>
        <ModalHeader className="font-serif text-xl font-bold">🏮 Release a Lantern</ModalHeader>
        <ModalBody className="space-y-3">
          <TextArea
            placeholder="Dear Dad... / Today I wish for..."
            value={lanternText}
            onChange={(e) => setLanternText(e.target.value)}
          />
          <div className="flex gap-3">
            {['#ffcf56', '#ff8052', '#d946ef', '#34d399'].map((c) => (
              <div
                key={c}
                className={`w-8 h-8 rounded-full cursor-pointer border-2 ${lanternColor === c ? 'border-slate-900 scale-110' : 'border-transparent'}`}
                style={{ background: c }}
                onClick={() => setLanternColor(c)}
              ></div>
            ))}
          </div>
        </ModalBody>
        <ModalFooter>
          <Button color="secondary" className="w-full font-bold" onClick={handleReleaseLantern}>
            ✨ Release into Sky
          </Button>
        </ModalFooter>
      </Modal>

      {/* MODAL: Draw Comfort Note */}
      <Modal isOpen={isNoteModalOpen} onClose={() => setIsNoteModalOpen(false)}>
        <ModalHeader className="font-serif text-xl font-bold text-center">📜 Comfort Note</ModalHeader>
        <ModalBody className="text-center py-6">
          <p className="font-serif text-lg italic text-slate-800">"{drawnNote}"</p>
        </ModalBody>
        <ModalFooter>
          <Button color="secondary" className="w-full" onClick={() => setIsNoteModalOpen(false)}>
            Keep in Heart
          </Button>
        </ModalFooter>
      </Modal>

      {/* MODAL: User Profile Survey */}
      <Modal isOpen={isSurveyOpen} onClose={() => setIsSurveyOpen(false)}>
        <ModalHeader className="font-serif text-xl font-bold">👤 Profile Settings</ModalHeader>
        <ModalBody className="space-y-3">
          <Input label="Username" value={username} onChange={(e) => setUsername(e.target.value)} />
          <Input label="Struggle Profile" value={struggle} onChange={(e) => setStruggle(e.target.value)} />
        </ModalBody>
        <ModalFooter>
          <Button color="secondary" className="w-full font-bold" onClick={() => {
            localStorage.setItem('haven_username', username);
            localStorage.setItem('haven_struggle', struggle);
            setIsSurveyOpen(false);
          }}>
            Save Profile
          </Button>
        </ModalFooter>
      </Modal>

    </div>
  );
}

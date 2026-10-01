/**
 * Apex Institute of Technology & Higher Studies
 * Master Interactive Front-End Script (Hackathon Edition)
 * Includes: 3D Holographic ID Card Studio, Web Audio Synth, Canvas Confetti, and Apex AI Copilot
 */

document.addEventListener('DOMContentLoaded', () => {
  initMobileMenu();
  initHeaderScroll();
  initThemeToggle();
  initSoundToggle();
  initEventFilters();
  initFeeTableFilters();
  initAttendanceCalculator();
  initIdCardStudio();
  initAiChatbot();
  initProgramFinder();
  initFacultyDirectory();
  initGallery();
  initFeeCalculator();
  initPortalModal();
  initInquiryForm();
});

/* ==========================================================================
   1. Audio Synthesizer (Zero External Dependencies)
   ========================================================================== */
let audioCtx = null;
let soundEnabled = true;

function playUiSound(type = 'click') {
  if (!soundEnabled) return;
  try {
    if (!audioCtx) {
      audioCtx = new (window.AudioContext || window.webkitAudioContext)();
    }
    const osc = audioCtx.createOscillator();
    const gain = audioCtx.createGain();
    osc.connect(gain);
    gain.connect(audioCtx.destination);

    const now = audioCtx.currentTime;

    if (type === 'click') {
      osc.type = 'sine';
      osc.frequency.setValueAtTime(800, now);
      osc.frequency.exponentialRampToValueAtTime(400, now + 0.05);
      gain.gain.setValueAtTime(0.12, now);
      gain.gain.linearRampToValueAtTime(0.01, now + 0.05);
      osc.start(now);
      osc.stop(now + 0.05);
    } else if (type === 'chime') {
      osc.type = 'triangle';
      osc.frequency.setValueAtTime(523.25, now); // C5
      osc.frequency.setValueAtTime(659.25, now + 0.08); // E5
      osc.frequency.setValueAtTime(783.99, now + 0.16); // G5
      gain.gain.setValueAtTime(0.15, now);
      gain.gain.linearRampToValueAtTime(0.01, now + 0.35);
      osc.start(now);
      osc.stop(now + 0.35);
    }
  } catch (e) {
    // Audio context fallback if blocked
  }
}

function initSoundToggle() {
  const soundBtn = document.getElementById('sound-toggle-btn');
  const soundIcon = document.getElementById('sound-icon');
  if (!soundBtn) return;

  soundBtn.addEventListener('click', () => {
    soundEnabled = !soundEnabled;
    if (soundEnabled) {
      soundIcon.className = 'fa-solid fa-volume-high text-amber-500';
      playUiSound('chime');
      showToast('Sound Effects: Enabled 🔊', 'info');
    } else {
      soundIcon.className = 'fa-solid fa-volume-xmark text-slate-400';
      showToast('Sound Effects: Muted 🔇', 'info');
    }
  });
}

/* ==========================================================================
   2. Cyber Vibe / Dark Theme Switcher
   ========================================================================== */
function initThemeToggle() {
  const themeBtn = document.getElementById('theme-toggle-btn');
  const themeIcon = document.getElementById('theme-icon');
  const themeLabel = document.getElementById('theme-label');

  if (!themeBtn) return;

  themeBtn.addEventListener('click', () => {
    playUiSound('click');
    const isVibe = document.documentElement.classList.toggle('vibe-mode');

    if (isVibe) {
      themeIcon.className = 'fa-solid fa-sun text-yellow-400';
      themeLabel.innerText = 'Classic Mode';
      showToast('⚡ Cyber Vibe Mode Activated!', 'success');
    } else {
      themeIcon.className = 'fa-solid fa-moon text-amber-500';
      themeLabel.innerText = 'Cyber Vibe';
      showToast('🏛️ Classic Ivy League Mode Activated', 'info');
    }
  });
}

/* ==========================================================================
   3. Mobile Navigation Menu Toggle
   ========================================================================== */
function initMobileMenu() {
  const menuBtn = document.getElementById('mobile-menu-btn');
  const menuIcon = document.getElementById('menu-icon');
  const mobileMenu = document.getElementById('mobile-menu');
  const navLinks = document.querySelectorAll('.mobile-nav-link');

  if (!menuBtn || !mobileMenu) return;

  menuBtn.addEventListener('click', () => {
    playUiSound('click');
    const isHidden = mobileMenu.classList.contains('hidden');
    if (isHidden) {
      mobileMenu.classList.remove('hidden');
      menuIcon.classList.remove('fa-bars');
      menuIcon.classList.add('fa-xmark');
    } else {
      mobileMenu.classList.add('hidden');
      menuIcon.classList.remove('fa-xmark');
      menuIcon.classList.add('fa-bars');
    }
  });

  navLinks.forEach(link => {
    link.addEventListener('click', () => {
      mobileMenu.classList.add('hidden');
      if (menuIcon) {
        menuIcon.classList.remove('fa-xmark');
        menuIcon.classList.add('fa-bars');
      }
    });
  });
}

/* ==========================================================================
   4. Header Elevation on Scroll
   ========================================================================== */
function initHeaderScroll() {
  const header = document.getElementById('main-header');
  if (!header) return;

  window.addEventListener('scroll', () => {
    if (window.scrollY > 20) {
      header.classList.add('header-scrolled');
    } else {
      header.classList.remove('header-scrolled');
    }
  });
}

/* ==========================================================================
   5. 3D Holographic Student ID Studio & Confetti
   ========================================================================== */
function initIdCardStudio() {
  const cardElement = document.getElementById('id-card-element');
  const nameInput = document.getElementById('badge-name-input');
  const majorSelect = document.getElementById('badge-major-select');
  const bloodBtns = document.querySelectorAll('.blood-btn');

  const cardName = document.getElementById('card-student-name');
  const cardMajor = document.getElementById('card-student-major');
  const cardId = document.getElementById('card-student-id');
  const cardBlood = document.getElementById('card-blood-group');

  const cardFront = document.getElementById('card-front-content');
  const cardBack = document.getElementById('card-back-content');
  const flipBtn = document.getElementById('flip-id-btn');
  const mintBtn = document.getElementById('mint-id-btn');

  if (!cardElement) return;

  // Real-time 3D tilt tracking
  cardElement.addEventListener('mousemove', (e) => {
    const rect = cardElement.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const rotateX = ((y - centerY) / centerY) * -14;
    const rotateY = ((x - centerX) / centerX) * 14;

    cardElement.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02, 1.02, 1.02)`;
  });

  cardElement.addEventListener('mouseleave', () => {
    cardElement.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)';
  });

  // Live input synchronization
  if (nameInput) {
    nameInput.addEventListener('input', () => {
      cardName.innerText = nameInput.value.trim() || 'Your Name';
    });
  }

  if (majorSelect) {
    majorSelect.addEventListener('change', () => {
      cardMajor.innerText = majorSelect.value;
      playUiSound('click');
    });
  }

  bloodBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      playUiSound('click');
      bloodBtns.forEach(b => {
        b.className = 'blood-btn py-1.5 rounded-lg border border-slate-700 bg-slate-900 text-xs font-bold text-slate-400 hover:border-slate-500';
      });
      btn.className = 'blood-btn active py-1.5 rounded-lg border border-amber-400 bg-amber-400/20 text-xs font-bold text-amber-300';
      cardBlood.innerText = btn.getAttribute('data-bg');
    });
  });

  // Flip Card logic
  let isFlipped = false;
  function toggleFlip() {
    playUiSound('click');
    isFlipped = !isFlipped;
    if (isFlipped) {
      cardFront.classList.add('hidden');
      cardBack.classList.remove('hidden');
      cardBack.classList.add('flex');
    } else {
      cardBack.classList.add('hidden');
      cardBack.classList.remove('flex');
      cardFront.classList.remove('hidden');
    }
  }

  if (flipBtn) flipBtn.addEventListener('click', toggleFlip);
  cardElement.addEventListener('click', toggleFlip);

  // Mint ID Card with Confetti Explosion
  if (mintBtn) {
    mintBtn.addEventListener('click', () => {
      const randomRoll = Math.floor(1000 + Math.random() * 9000);
      cardId.innerText = `APX-2026-${randomRoll}`;
      playUiSound('chime');
      triggerConfetti();
      showToast(`🎉 Digital ID Badge minted for ${cardName.innerText}! Ready for campus access.`, 'success');
    });
  }
}

/* Confetti Particle Engine */
function triggerConfetti() {
  const canvas = document.getElementById('confetti-canvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;

  const particles = [];
  const colors = ['#f59e0b', '#06b6d4', '#10b981', '#ec4899', '#8b5cf6', '#ffffff'];

  for (let i = 0; i < 90; i++) {
    particles.push({
      x: canvas.width / 2,
      y: canvas.height / 2 + 100,
      r: Math.random() * 6 + 3,
      color: colors[Math.floor(Math.random() * colors.length)],
      vx: (Math.random() - 0.5) * 18,
      vy: (Math.random() - 0.8) * 16,
      gravity: 0.35,
      alpha: 1,
      rotation: Math.random() * 360,
      vRot: (Math.random() - 0.5) * 12
    });
  }

  let animationFrame;
  function render() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    let alive = false;

    particles.forEach(p => {
      p.x += p.vx;
      p.y += p.vy;
      p.vy += p.gravity;
      p.alpha -= 0.012;
      p.rotation += p.vRot;

      if (p.alpha > 0) {
        alive = true;
        ctx.save();
        ctx.translate(p.x, p.y);
        ctx.rotate((p.rotation * Math.PI) / 180);
        ctx.fillStyle = p.color;
        ctx.globalAlpha = Math.max(p.alpha, 0);
        ctx.fillRect(-p.r / 2, -p.r / 2, p.r, p.r * 1.5);
        ctx.restore();
      }
    });

    if (alive) {
      animationFrame = requestAnimationFrame(render);
    } else {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      cancelAnimationFrame(animationFrame);
    }
  }
  render();
}

/* ==========================================================================
   6. Apex AI Campus Copilot (Chatbot Engine)
   ========================================================================== */
function initAiChatbot() {
  const toggleBtn = document.getElementById('ai-chat-toggle-btn');
  const chatWindow = document.getElementById('ai-chat-window');
  const closeBtn = document.getElementById('close-ai-chat-btn');
  const chatForm = document.getElementById('ai-chat-form');
  const chatInput = document.getElementById('ai-chat-input');
  const messagesContainer = document.getElementById('ai-chat-messages');
  const quickChips = document.querySelectorAll('#ai-quick-prompts .ai-chip');

  if (!toggleBtn || !chatWindow) return;

  function openChat() {
    playUiSound('click');
    chatWindow.classList.remove('hidden');
    toggleBtn.classList.add('hidden');
  }

  function closeChat() {
    playUiSound('click');
    chatWindow.classList.add('hidden');
    toggleBtn.classList.remove('hidden');
  }

  toggleBtn.addEventListener('click', openChat);
  if (closeBtn) closeBtn.addEventListener('click', closeChat);

  // Knowledge base responses
  const knowledgeBase = {
    attendance: `Apex enforces a strict <strong>75% mandatory attendance ratio</strong> to qualify for semester examinations. Students between 65%-74.9% fall in the Condonation Zone requiring medical proof. Below 65% are debarred. <br><a href="#attendance-policy" class="text-amber-400 font-bold underline mt-1 block" onclick="document.getElementById('ai-chat-window').classList.add('hidden'); document.getElementById('ai-chat-toggle-btn').classList.remove('hidden');">👉 Open Attendance Calculator</a>`,
    fees: `For B.Tech CSE & AI, annual tuition is <strong>₹1,80,000</strong> (Total 1st year fee ₹2,05,000 including lab & refundable caution deposit). Automatic merit scholarships up to 50% apply for board marks >80%! <br><a href="#fees-table" class="text-amber-400 font-bold underline mt-1 block" onclick="document.getElementById('ai-chat-window').classList.add('hidden'); document.getElementById('ai-chat-toggle-btn').classList.remove('hidden');">👉 View All Course Fees</a>`,
    placement: `Apex holds an outstanding <strong>96.8% overall placement rate</strong>. B.Tech CSE achieved <strong>99.2%</strong>. Highest package: $165,000 (Microsoft Seattle) & ₹52 LPA (Domestic). Average CTC: ₹14.2 LPA across 450+ recruiters. <br><a href="#placements" class="text-amber-400 font-bold underline mt-1 block" onclick="document.getElementById('ai-chat-window').classList.add('hidden'); document.getElementById('ai-chat-toggle-btn').classList.remove('hidden');">👉 View Recruiter Marquee</a>`,
    hackathon: `The next flagship event is <strong>InnoTech 2026: 36-Hr National AI Hackathon</strong> on October 16-18 with ₹5,00,000 in cash prizes and recruiters from Google & Microsoft! <br><a href="#events-section" class="text-amber-400 font-bold underline mt-1 block" onclick="document.getElementById('ai-chat-window').classList.add('hidden'); document.getElementById('ai-chat-toggle-btn').classList.remove('hidden');">👉 Register Free for Hackathon</a>`,
    faculty: `Our Dean of Computing is <strong>Dr. Arthur Pendelton</strong> (Ph.D. AI, MIT) and HOD Data Science is <strong>Dr. Meera Nambiar</strong> (Ph.D., IIT Bombay). You can email them directly via our Faculty Directory! <br><a href="#faculty" class="text-amber-400 font-bold underline mt-1 block" onclick="document.getElementById('ai-chat-window').classList.add('hidden'); document.getElementById('ai-chat-toggle-btn').classList.remove('hidden');">👉 Open Faculty Directory</a>`,
    default: `I can help you with: <br>• <strong>75% Minimum Attendance Policy</strong><br>• <strong>All Course Fees & Scholarships</strong><br>• <strong>InnoTech AI Hackathon & Fests</strong><br>• <strong>Placement statistics (96.8%)</strong><br>• <strong>Minting your 3D Digital Student ID</strong>!`
  };

  function appendMessage(text, isUser = false) {
    const msg = document.createElement('div');
    if (isUser) {
      msg.className = 'bg-brand-600 text-white p-3 rounded-xl rounded-tr-none ml-auto max-w-[85%] text-xs leading-relaxed shadow-sm';
      msg.innerText = text;
    } else {
      msg.className = 'bg-slate-800 text-slate-200 p-3 rounded-xl rounded-tl-none border border-slate-700 max-w-[90%] text-xs leading-relaxed shadow-sm animate-fadeIn';
      msg.innerHTML = text;
    }
    messagesContainer.appendChild(msg);
    messagesContainer.scrollTop = messagesContainer.scrollHeight;
  }

  function handleQuery(query) {
    const lower = query.toLowerCase();
    appendMessage(query, true);

    // Typing simulation
    const typingIndicator = document.createElement('div');
    typingIndicator.className = 'bg-slate-800 text-slate-400 p-2.5 rounded-xl rounded-tl-none border border-slate-700 w-16 flex gap-1 items-center justify-center';
    typingIndicator.innerHTML = '<span class="w-1.5 h-1.5 rounded-full bg-slate-400 chat-typing-dot"></span><span class="w-1.5 h-1.5 rounded-full bg-slate-400 chat-typing-dot"></span><span class="w-1.5 h-1.5 rounded-full bg-slate-400 chat-typing-dot"></span>';
    messagesContainer.appendChild(typingIndicator);
    messagesContainer.scrollTop = messagesContainer.scrollHeight;

    setTimeout(() => {
      typingIndicator.remove();
      playUiSound('click');

      if (lower.includes('attendance') || lower.includes('75') || lower.includes('ratio')) {
        appendMessage(knowledgeBase.attendance);
      } else if (lower.includes('fee') || lower.includes('tuition') || lower.includes('cost') || lower.includes('b.tech')) {
        appendMessage(knowledgeBase.fees);
      } else if (lower.includes('placement') || lower.includes('package') || lower.includes('ctc') || lower.includes('job')) {
        appendMessage(knowledgeBase.placement);
      } else if (lower.includes('hackathon') || lower.includes('event') || lower.includes('fest')) {
        appendMessage(knowledgeBase.hackathon);
      } else if (lower.includes('faculty') || lower.includes('professor') || lower.includes('dean')) {
        appendMessage(knowledgeBase.faculty);
      } else {
        appendMessage(knowledgeBase.default);
      }
    }, 450);
  }

  if (chatForm) {
    chatForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const text = chatInput.value.trim();
      if (!text) return;
      chatInput.value = '';
      handleQuery(text);
    });
  }

  quickChips.forEach(chip => {
    chip.addEventListener('click', () => {
      handleQuery(chip.innerText.trim());
    });
  });
}

/* ==========================================================================
   7. Upcoming Events Filtering & Registration
   ========================================================================== */
function initEventFilters() {
  const filterBtns = document.querySelectorAll('#event-filters .event-filter-btn');
  const eventCards = document.querySelectorAll('#events-grid .event-card');

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      playUiSound('click');
      filterBtns.forEach(b => {
        b.classList.remove('bg-brand-navy', 'text-white', 'shadow-sm');
        b.classList.add('text-slate-700');
      });
      btn.classList.add('bg-brand-navy', 'text-white', 'shadow-sm');
      btn.classList.remove('text-slate-700');

      const filter = btn.getAttribute('data-filter');

      eventCards.forEach(card => {
        const cat = card.getAttribute('data-category');
        if (filter === 'all' || cat === filter) {
          card.style.display = 'flex';
          card.classList.add('animate-fadeIn');
        } else {
          card.style.display = 'none';
        }
      });
    });
  });
}

window.registerEvent = function(eventName) {
  playUiSound('chime');
  const ref = Math.floor(100000 + Math.random() * 900000);
  showToast(`Registered for "${eventName}"! Confirmation Pass: #EVT-${ref}`, 'success');
};

/* ==========================================================================
   8. Course Fees Structure Table Filtering
   ========================================================================== */
function initFeeTableFilters() {
  const tabBtns = document.querySelectorAll('#fee-table-tabs .fee-tab-btn');
  const rows = document.querySelectorAll('#fee-table-body .fee-row');

  tabBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      playUiSound('click');
      tabBtns.forEach(b => {
        b.classList.remove('bg-brand-navy', 'text-white');
        b.classList.add('text-slate-700');
      });
      btn.classList.add('bg-brand-navy', 'text-white');
      btn.classList.remove('text-slate-700');

      const level = btn.getAttribute('data-level');

      rows.forEach(row => {
        if (level === 'all' || row.classList.contains(level)) {
          row.style.display = '';
          row.classList.add('animate-fadeIn');
        } else {
          row.style.display = 'none';
        }
      });
    });
  });
}

/* ==========================================================================
   9. Minimum Attendance Ratio (75%) Calculator
   ========================================================================== */
function initAttendanceCalculator() {
  const conductedInput = document.getElementById('att-conducted');
  const attendedInput = document.getElementById('att-attended');
  const ratioDisplay = document.getElementById('att-ratio-display');
  const progressBar = document.getElementById('att-progress-bar');
  const statusBadge = document.getElementById('att-status-badge');
  const adviceEl = document.getElementById('att-advice');

  if (!conductedInput || !attendedInput) return;

  function calculateAttendance() {
    let conducted = parseInt(conductedInput.value, 10) || 0;
    let attended = parseInt(attendedInput.value, 10) || 0;

    if (conducted <= 0) conducted = 1;
    if (attended > conducted) {
      attended = conducted;
      attendedInput.value = conducted;
    }

    const ratio = ((attended / conducted) * 100);
    const formattedRatio = ratio.toFixed(1) + '%';
    ratioDisplay.innerText = formattedRatio;

    progressBar.style.width = Math.min(ratio, 100) + '%';

    if (ratio >= 75.0) {
      progressBar.className = 'bg-emerald-400 h-full rounded-full transition-all duration-300';
      statusBadge.className = 'p-2.5 rounded-lg bg-emerald-500/20 border border-emerald-500/30 text-emerald-300 text-xs font-semibold flex items-center gap-2';
      statusBadge.innerHTML = `<i class="fa-solid fa-circle-check text-emerald-400"></i><span>Status: Safe & Eligible for End-Term Exams (Above 75%)</span>`;

      const maxMissable = Math.floor((attended / 0.75) - conducted);
      if (maxMissable > 0) {
        adviceEl.innerHTML = `🎉 Good news! You can miss up to <strong>${maxMissable} more lectures</strong> and still remain at or above the mandatory 75% attendance ratio.`;
      } else {
        adviceEl.innerHTML = `⚠️ You are currently on track at ${formattedRatio}. You cannot miss the next lecture without dipping into the condonation range.`;
      }

    } else if (ratio >= 65.0) {
      progressBar.className = 'bg-amber-400 h-full rounded-full transition-all duration-300';
      statusBadge.className = 'p-2.5 rounded-lg bg-amber-500/20 border border-amber-500/30 text-amber-300 text-xs font-semibold flex items-center gap-2';
      statusBadge.innerHTML = `<i class="fa-solid fa-triangle-exclamation text-amber-400"></i><span>Status: Condonation Zone (65.0% - 74.9%)</span>`;

      const needed = Math.ceil((0.75 * conducted - attended) / 0.25);
      adviceEl.innerHTML = `⚠️ Caution: You require medical/special Dean approval for condonation. You must attend the next <strong>${needed} consecutive lectures</strong> without absence to cross 75.0%.`;

    } else {
      progressBar.className = 'bg-red-500 h-full rounded-full transition-all duration-300';
      statusBadge.className = 'p-2.5 rounded-lg bg-red-500/20 border border-red-500/30 text-red-300 text-xs font-semibold flex items-center gap-2';
      statusBadge.innerHTML = `<i class="fa-solid fa-ban text-red-400"></i><span>Status: Non-Condonable / Debarred (< 65%)</span>`;

      const needed = Math.ceil((0.75 * conducted - attended) / 0.25);
      adviceEl.innerHTML = `🚨 Critical Attendance Shortage: You are currently debarred from end-semester examinations. You must attend at least <strong>${needed} consecutive lectures</strong> to be considered for exam eligibility.`;
    }
  }

  conductedInput.addEventListener('input', calculateAttendance);
  attendedInput.addEventListener('input', calculateAttendance);

  calculateAttendance();
}

/* ==========================================================================
   10. Academic Degree Finder (Level & Discipline Filters)
   ========================================================================== */
function initProgramFinder() {
  const levelBtns = document.querySelectorAll('#degree-level-filters .level-btn');
  const deptBtns = document.querySelectorAll('#department-filters .dept-btn');
  const programCards = document.querySelectorAll('#programs-grid .program-card');
  const heroSearchInput = document.getElementById('hero-program-search');

  let activeLevel = 'all';
  let activeDept = 'all';

  function applyFilters() {
    const searchTerm = (heroSearchInput?.value || '').toLowerCase().trim();

    programCards.forEach(card => {
      const cardLevel = card.getAttribute('data-level');
      const cardDept = card.getAttribute('data-dept');
      const cardText = card.innerText.toLowerCase();

      const matchesLevel = (activeLevel === 'all' || cardLevel === activeLevel);
      const matchesDept = (activeDept === 'all' || cardDept === activeDept);
      const matchesSearch = !searchTerm || cardText.includes(searchTerm);

      if (matchesLevel && matchesDept && matchesSearch) {
        card.style.display = 'flex';
        card.classList.add('animate-fadeIn');
      } else {
        card.style.display = 'none';
      }
    });
  }

  levelBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      playUiSound('click');
      levelBtns.forEach(b => {
        b.classList.remove('bg-brand-navy', 'text-white', 'shadow-sm');
        b.classList.add('text-slate-700');
      });
      btn.classList.add('bg-brand-navy', 'text-white', 'shadow-sm');
      btn.classList.remove('text-slate-700');
      activeLevel = btn.getAttribute('data-level');
      applyFilters();
    });
  });

  deptBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      playUiSound('click');
      deptBtns.forEach(b => {
        b.classList.remove('bg-slate-900', 'text-white');
        b.classList.add('bg-slate-100', 'text-slate-700');
      });
      btn.classList.add('bg-slate-900', 'text-white');
      btn.classList.remove('bg-slate-100', 'text-slate-700');
      activeDept = btn.getAttribute('data-dept');
      applyFilters();
    });
  });

  if (heroSearchInput) {
    heroSearchInput.addEventListener('input', () => {
      if (heroSearchInput.value.length > 2) {
        const progSection = document.getElementById('programs');
        if (progSection) progSection.scrollIntoView({ behavior: 'smooth' });
      }
      applyFilters();
    });
  }
}

window.openProgramDetails = function(programName) {
  playUiSound('click');
  showToast(`Loading syllabus, credits & course outline for: ${programName}`, 'success');
};

/* ==========================================================================
   11. Faculty Directory & Email Contacts
   ========================================================================== */
function initFacultyDirectory() {
  const searchInput = document.getElementById('faculty-search-input');
  const deptSelect = document.getElementById('faculty-dept-select');
  const facultyCards = document.querySelectorAll('#faculty-grid .faculty-card');

  function filterFaculty() {
    const query = (searchInput?.value || '').toLowerCase().trim();
    const dept = deptSelect?.value || 'all';

    facultyCards.forEach(card => {
      const cardDept = card.getAttribute('data-dept');
      const cardText = card.innerText.toLowerCase();

      const matchesDept = (dept === 'all' || cardDept === dept);
      const matchesQuery = !query || cardText.includes(query);

      if (matchesDept && matchesQuery) {
        card.style.display = 'flex';
        card.classList.add('animate-fadeIn');
      } else {
        card.style.display = 'none';
      }
    });
  }

  if (searchInput) searchInput.addEventListener('input', filterFaculty);
  if (deptSelect) deptSelect.addEventListener('change', filterFaculty);
}

window.copyFacultyEmail = function(email) {
  playUiSound('click');
  navigator.clipboard.writeText(email).then(() => {
    showToast(`Copied to clipboard: ${email}`, 'success');
  }).catch(() => {
    const tempInput = document.createElement('input');
    tempInput.value = email;
    document.body.appendChild(tempInput);
    tempInput.select();
    document.execCommand('copy');
    document.body.removeChild(tempInput);
    showToast(`Copied to clipboard: ${email}`, 'success');
  });
};

/* ==========================================================================
   12. Campus Photo Gallery & Lightbox
   ========================================================================== */
function initGallery() {
  const filterBtns = document.querySelectorAll('#gallery-filters .gallery-tab-btn');
  const galleryCards = document.querySelectorAll('#gallery-grid .gallery-card');

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      playUiSound('click');
      filterBtns.forEach(b => {
        b.classList.remove('bg-brand-navy', 'text-white', 'shadow-sm');
        b.classList.add('text-slate-700');
      });
      btn.classList.add('bg-brand-navy', 'text-white', 'shadow-sm');
      btn.classList.remove('text-slate-700');

      const tag = btn.getAttribute('data-tag');

      galleryCards.forEach(card => {
        const cardTag = card.getAttribute('data-tag');
        if (tag === 'all' || cardTag === tag) {
          card.style.display = 'block';
          card.classList.add('animate-fadeIn');
        } else {
          card.style.display = 'none';
        }
      });
    });
  });
}

window.openLightbox = function(imageUrl, caption) {
  playUiSound('click');
  const modal = document.getElementById('image-lightbox-modal');
  const img = document.getElementById('lightbox-img');
  const captionEl = document.getElementById('lightbox-caption');

  if (!modal || !img) return;

  img.src = imageUrl;
  if (captionEl) captionEl.innerText = caption;

  modal.classList.remove('hidden');
  document.body.style.overflow = 'hidden';
};

window.closeLightbox = function() {
  const modal = document.getElementById('image-lightbox-modal');
  if (!modal) return;
  modal.classList.add('hidden');
  document.body.style.overflow = '';
};

document.getElementById('image-lightbox-modal')?.addEventListener('click', (e) => {
  if (e.target.id === 'image-lightbox-modal') {
    window.closeLightbox();
  }
});

/* ==========================================================================
   13. Interactive Fee & Scholarship Estimator
   ========================================================================== */
function initFeeCalculator() {
  const programSelect = document.getElementById('calc-program');
  const housingInputs = document.querySelectorAll('input[name="housing"]');
  const scoreSlider = document.getElementById('calc-score');
  const scoreDisplay = document.getElementById('score-display');

  const summaryTuition = document.getElementById('summary-tuition');
  const summaryHousing = document.getElementById('summary-housing');
  const summaryDiscount = document.getElementById('summary-discount');
  const summaryScholarshipLabel = document.getElementById('summary-scholarship-label');
  const summaryTotal = document.getElementById('summary-total');

  if (!programSelect || !scoreSlider) return;

  function calculate() {
    const selectedOption = programSelect.options[programSelect.selectedIndex];
    const baseTuition = parseInt(selectedOption.getAttribute('data-base') || '180000', 10);

    let housingFee = 0;
    housingInputs.forEach(input => {
      const parentLabel = input.closest('label');
      if (input.checked) {
        housingFee = parseInt(input.value, 10);
        parentLabel?.classList.add('housing-selected');
      } else {
        parentLabel?.classList.remove('housing-selected');
      }
    });

    const score = parseInt(scoreSlider.value, 10);
    scoreDisplay.innerText = `${score}%`;

    let discountPercent = 0;
    if (score >= 95) discountPercent = 50;
    else if (score >= 90) discountPercent = 35;
    else if (score >= 80) discountPercent = 20;
    else if (score >= 75) discountPercent = 10;

    const discountAmount = Math.round((baseTuition * discountPercent) / 100);
    const labAmenitiesFee = 12000;
    const netTotal = (baseTuition - discountAmount) + housingFee + labAmenitiesFee;

    summaryTuition.innerText = `₹${baseTuition.toLocaleString('en-IN')}`;
    summaryHousing.innerText = `₹${housingFee.toLocaleString('en-IN')}`;
    summaryScholarshipLabel.innerText = `Merit Scholarship (${discountPercent}%):`;
    summaryDiscount.innerText = discountPercent > 0 ? `-₹${discountAmount.toLocaleString('en-IN')}` : `₹0`;
    summaryTotal.innerText = `₹${netTotal.toLocaleString('en-IN')}`;
  }

  programSelect.addEventListener('change', calculate);
  housingInputs.forEach(input => input.addEventListener('change', calculate));
  scoreSlider.addEventListener('input', calculate);

  calculate();
}

/* ==========================================================================
   14. ERP / Student Portal Login & Dashboard Modal
   ========================================================================== */
function initPortalModal() {
  const modal = document.getElementById('portal-modal');
  const closeBtn = document.getElementById('close-portal-modal');
  const openBtnTop = document.getElementById('open-portal-btn-top');
  const openBtnNav = document.getElementById('open-portal-btn');
  const openBtnMobile = document.getElementById('open-portal-btn-mobile');

  const loginView = document.getElementById('portal-login-view');
  const dashboardView = document.getElementById('portal-dashboard-view');
  const loginForm = document.getElementById('portal-login-form');
  const demoLoginBtn = document.getElementById('quick-demo-login-btn');
  const logoutBtn = document.getElementById('portal-logout-btn');

  if (!modal) return;

  const openModal = () => {
    playUiSound('click');
    modal.classList.remove('hidden');
    document.body.style.overflow = 'hidden';
  };

  const closeModal = () => {
    modal.classList.add('hidden');
    document.body.style.overflow = '';
  };

  if (openBtnTop) openBtnTop.addEventListener('click', openModal);
  if (openBtnNav) openBtnNav.addEventListener('click', openModal);
  if (openBtnMobile) openBtnMobile.addEventListener('click', openModal);
  if (closeBtn) closeBtn.addEventListener('click', closeModal);

  modal.addEventListener('click', (e) => {
    if (e.target === modal) closeModal();
  });

  const simulateLogin = () => {
    playUiSound('chime');
    loginView.classList.add('hidden');
    dashboardView.classList.remove('hidden');
    showToast('Signed in successfully as Rahul Sharma (B.Tech CSE)', 'success');
  };

  if (loginForm) {
    loginForm.addEventListener('submit', (e) => {
      e.preventDefault();
      simulateLogin();
    });
  }

  if (demoLoginBtn) {
    demoLoginBtn.addEventListener('click', simulateLogin);
  }

  if (logoutBtn) {
    logoutBtn.addEventListener('click', () => {
      dashboardView.classList.add('hidden');
      loginView.classList.remove('hidden');
      showToast('Signed out of student portal', 'info');
    });
  }
}

/* ==========================================================================
   15. Admissions Inquiry Form Handling
   ========================================================================== */
function initInquiryForm() {
  const inquiryForm = document.getElementById('inquiry-form');
  const successAlert = document.getElementById('form-success-alert');

  if (!inquiryForm || !successAlert) return;

  inquiryForm.addEventListener('submit', (e) => {
    e.preventDefault();
    inquiryForm.reset();
    successAlert.classList.remove('hidden');
    successAlert.classList.add('animate-fadeIn');

    playUiSound('chime');
    triggerConfetti();
    showToast('Application inquiry received! Check your email for prospectus.', 'success');

    setTimeout(() => {
      successAlert.classList.add('hidden');
    }, 8000);
  });
}

/* ==========================================================================
   16. Mock PDF Downloader Simulator
   ========================================================================== */
window.downloadMockPDF = function(filename) {
  playUiSound('click');
  showToast(`Initiating download for "${filename}"`, 'info');
};

/* ==========================================================================
   17. Lightweight Toast Notification Utility
   ========================================================================== */
function showToast(message, type = 'info') {
  const container = document.getElementById('toast-container');
  if (!container) return;

  const toast = document.createElement('div');
  const bgColors = {
    info: 'bg-slate-900 text-white border-slate-700',
    success: 'bg-emerald-900 text-white border-emerald-700',
    error: 'bg-red-900 text-white border-red-700'
  };

  const icons = {
    info: 'fa-info-circle text-sky-400',
    success: 'fa-check-circle text-emerald-400',
    error: 'fa-triangle-exclamation text-red-400'
  };

  toast.className = `toast-msg flex items-center gap-3 px-4 py-3 rounded-xl border text-xs font-medium ${bgColors[type] || bgColors.info} shadow-xl max-w-sm transition-all`;
  toast.innerHTML = `
    <i class="fa-solid ${icons[type] || icons.info} text-sm"></i>
    <span class="flex-1">${message}</span>
    <button class="text-slate-400 hover:text-white ml-2 text-sm">&times;</button>
  `;

  toast.querySelector('button')?.addEventListener('click', () => {
    toast.remove();
  });

  container.appendChild(toast);

  setTimeout(() => {
    toast.style.opacity = '0';
    toast.style.transform = 'translateY(10px)';
    setTimeout(() => toast.remove(), 300);
  }, 4000);
}

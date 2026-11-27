/**
 * GLOBAL MBBS ABROAD - About Us Page Interactive Scripts
 * Handles mobile nav, dropdowns, interactive FAQ accordion, country explore modals,
 * counselling enquiry modal, WhatsApp widget, and GSAP ScrollTrigger animations.
 */

document.addEventListener('DOMContentLoaded', () => {
  // 1. Lenis Smooth Scroll Initialization
  let lenis;
  if (typeof Lenis !== 'undefined') {
    lenis = new Lenis({
      duration: 1.15,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
      wheelMultiplier: 0.9,
      touchMultiplier: 1.5,
      infinite: false
    });

    lenis.on('scroll', () => {
      if (typeof ScrollTrigger !== 'undefined') {
        ScrollTrigger.update();
      }
    });

    gsap.ticker.add((time) => {
      lenis.raf(time * 1000);
    });

    gsap.ticker.lagSmoothing(0);
  }

  // 2. Mobile Menu Toggle
  const mobileMenuBtn = document.getElementById('mobileMenuBtn');
  const mobileMenu = document.getElementById('mobileMenu');
  if (mobileMenuBtn && mobileMenu) {
    mobileMenuBtn.addEventListener('click', () => {
      const isExpanded = mobileMenuBtn.getAttribute('aria-expanded') === 'true';
      mobileMenuBtn.setAttribute('aria-expanded', !isExpanded);
      mobileMenu.classList.toggle('hidden');
    });
  }

  // 3. Mobile Dropdown Submenus
  const mobileDropdownBtns = document.querySelectorAll('.mobile-dropdown-btn');
  mobileDropdownBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const submenu = btn.nextElementSibling;
      const icon = btn.querySelector('.mobile-dropdown-icon');
      if (submenu) {
        submenu.classList.toggle('hidden');
        if (icon) {
          icon.classList.toggle('rotate-180');
        }
      }
    });
  });

  // 4. Sticky Header Blur & Back to Top Appearance
  const navbar = document.getElementById('navbar');
  const backToTop = document.getElementById('backToTop');
  window.addEventListener('scroll', () => {
    const scrollPos = window.scrollY;
    if (navbar) {
      if (scrollPos > 30) {
        navbar.classList.add('shadow-md', 'bg-white/95');
        navbar.classList.remove('py-3.5');
        navbar.classList.add('py-2.5');
      } else {
        navbar.classList.remove('shadow-md', 'bg-white/95');
        navbar.classList.remove('py-2.5');
        navbar.classList.add('py-3.5');
      }
    }

    if (backToTop) {
      if (scrollPos > 400) {
        backToTop.classList.remove('opacity-0', 'pointer-events-none', 'translate-y-4');
        backToTop.classList.add('opacity-100', 'pointer-events-auto', 'translate-y-0');
      } else {
        backToTop.classList.add('opacity-0', 'pointer-events-none', 'translate-y-4');
        backToTop.classList.remove('opacity-100', 'pointer-events-auto', 'translate-y-0');
      }
    }
  });

  if (backToTop) {
    backToTop.addEventListener('click', (e) => {
      e.preventDefault();
      if (lenis) {
        lenis.scrollTo(0, { duration: 1.2 });
      } else {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
    });
  }

  // 5. FAQ Accordion Behavior
  const faqItems = document.querySelectorAll('.faq-item');
  faqItems.forEach(item => {
    const questionBtn = item.querySelector('.faq-question');
    questionBtn?.addEventListener('click', () => {
      const isActive = item.classList.contains('active');
      faqItems.forEach(otherItem => {
        if (otherItem !== item) {
          otherItem.classList.remove('active');
          const answer = otherItem.querySelector('.faq-answer');
          if (answer) answer.style.maxHeight = null;
          const icon = otherItem.querySelector('.faq-icon');
          if (icon) icon.classList.remove('rotate-180');
        }
      });

      if (!isActive) {
        item.classList.add('active');
        const answer = item.querySelector('.faq-answer');
        if (answer) answer.style.maxHeight = answer.scrollHeight + 'px';
        const icon = item.querySelector('.faq-icon');
        if (icon) icon.classList.add('rotate-180');
      } else {
        item.classList.remove('active');
        const answer = item.querySelector('.faq-answer');
        if (answer) answer.style.maxHeight = null;
        const icon = item.querySelector('.faq-icon');
        if (icon) icon.classList.remove('rotate-180');
      }
    });
  });

  // Open the first FAQ item by default
  if (faqItems.length > 0) {
    const firstItem = faqItems[0];
    firstItem.classList.add('active');
    const firstAnswer = firstItem.querySelector('.faq-answer');
    if (firstAnswer) firstAnswer.style.maxHeight = firstAnswer.scrollHeight + 'px';
    const firstIcon = firstItem.querySelector('.faq-icon');
    if (firstIcon) firstIcon.classList.add('rotate-180');
  }

  // 6. Generic Modal System
  const genericModal = document.getElementById('genericModal');
  const modalBackdrop = document.getElementById('modalBackdrop');
  const modalTitle = document.getElementById('modalTitle');
  const modalBody = document.getElementById('modalBody');
  const modalCloseBtn = document.getElementById('modalCloseBtn');

  function openModal(title, contentHtml) {
    if (!genericModal) return;
    modalTitle.innerHTML = title;
    modalBody.innerHTML = contentHtml;
    genericModal.classList.remove('hidden');
    document.body.style.overflow = 'hidden';
  }

  function closeModal() {
    if (!genericModal) return;
    genericModal.classList.add('hidden');
    document.body.style.overflow = '';
  }

  modalCloseBtn?.addEventListener('click', closeModal);
  modalBackdrop?.addEventListener('click', closeModal);
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && !genericModal?.classList.contains('hidden')) {
      closeModal();
    }
  });

  // 7. Country Details Database (for destination modal)
  const countryData = {
    russia: {
      name: "Russia",
      pageUrl: "countries/russia.html",
      badge: "World-Renowned Medical Hub",
      duration: "6 Years (including clinical internship)",
      medium: "100% English Medium",
      feeRange: "₹2,95,000 – ₹5,50,000 / Year",
      livingCost: "₹12,500 – ₹21,000 / Month",
      popularUniversities: [
        "Kazan Federal University",
        "First Moscow State Medical University",
        "Bashkir State Medical University",
        "Crimea Federal University"
      ],
      highlights: [
        "Government medical universities with 200+ years of history",
        "Recognized by WHO, NMC (India), and ECFMG (USA)",
        "Advanced simulation labs & comprehensive clinical exposure",
        "Vibrant Indian student community with Indian food/mess available",
        "Direct admission without capitation fees or donation"
      ],
      description: "Russia remains one of the top destinations for Indian medical aspirants, offering European medical standards, subsidized tuition fees, globally accredited degrees, and fully English-medium MBBS courses."
    },
    georgia: {
      name: "Georgia",
      pageUrl: "countries/georgia.html",
      badge: "European Medical Education",
      duration: "6 Years (European ECTS standard)",
      medium: "100% English Medium",
      feeRange: "₹3,80,000 – ₹6,80,000 / Year",
      livingCost: "₹17,000 – ₹30,000 / Month",
      popularUniversities: [
        "Tbilisi State Medical University",
        "Batumi Shota Rustaveli State University",
        "Ilia State University",
        "European University Georgia"
      ],
      highlights: [
        "100% English medium across all academic & clinical years",
        "Highest safety index for international students in Europe",
        "ECTS credit transfer system recognized across EU and worldwide",
        "Modern hospital affiliations and high USMLE pass rates",
        "No IELTS/TOEFL required; straightforward visa processing"
      ],
      description: "Georgia has emerged as a premier European medical education hub with ultra-modern campus facilities, high FMGE/NExT success rates, and safe, picturesque student environments."
    },
    kazakhstan: {
      name: "Kazakhstan",
      pageUrl: "countries/kazakhstan.html",
      badge: "Budget-Friendly & NMC Compliant",
      duration: "5 Years + 1 Year Internship",
      medium: "100% English Medium",
      feeRange: "₹2,70,000 – ₹4,25,000 / Year",
      livingCost: "₹10,000 – ₹17,000 / Month",
      popularUniversities: [
        "Kazakh National Medical University (Asfendiyarov)",
        "Semey State Medical University",
        "West Kazakhstan Marat Ospanov Medical University",
        "Astana Medical University"
      ],
      highlights: [
        "Affordable tuition and minimal living expenses for Indian families",
        "Compliant with latest National Medical Commission (NMC) guidelines",
        "Short flight duration (3.5 hours from New Delhi)",
        "Indian mess, hostel wardens, and dedicated student support on campus",
        "High clinical patient flow in university-affiliated teaching hospitals"
      ],
      description: "Kazakhstan provides top-quality, cost-effective medical education with comprehensive practical training, state-of-the-art anatomy labs, and strong clinical practice."
    },
    uzbekistan: {
      name: "Uzbekistan",
      pageUrl: "countries/uzbekistan.html",
      badge: "Fast-Growing Medical Destination",
      duration: "6 Years (including internship)",
      medium: "100% English Medium",
      feeRange: "₹2,50,000 – ₹3,80,000 / Year",
      livingCost: "₹8,500 – ₹15,000 / Month",
      popularUniversities: [
        "Samarkand State Medical University",
        "Tashkent Medical Academy",
        "Bukhara State Medical Institute",
        "Andijan State Medical Institute"
      ],
      highlights: [
        "Very affordable complete course package suitable for mid-budget families",
        "Close cultural affinity with India and warm hospitality",
        "Convenient flight connectivity from India",
        "Well-equipped digital libraries, simulation centers & cadaver dissection",
        "Indian chefs and guaranteed hostel accommodation for all years"
      ],
      description: "Uzbekistan is one of the most cost-effective and culturally welcoming options for Indian students, offering NMC-compliant English-medium medical programs."
    },
    kyrgyzstan: {
      name: "Kyrgyzstan",
      pageUrl: "countries/kyrgyzstan.html",
      badge: "Highly Economical MBBS",
      duration: "5 Years + 1 Year Internship",
      medium: "100% English Medium",
      feeRange: "₹2,40,000 – ₹3,55,000 / Year",
      livingCost: "₹8,500 – ₹14,000 / Month",
      popularUniversities: [
        "Osh State University Medical Faculty",
        "Kyrgyz State Medical Academy (KSMA)",
        "Jalal-Abad State University",
        "International School of Medicine (ISM)"
      ],
      highlights: [
        "Lowest total package for entire 6-year MBBS journey",
        "Over 15,000+ Indian students successfully studying or graduated",
        "Extensive Indian food catering and hostel infrastructure",
        "Recognized by WHO, FAIMER, and global medical councils",
        "Focus on USMLE and FMGE/NExT oriented coaching"
      ],
      description: "Kyrgyzstan offers one of the most accessible routes to becoming a doctor, with economical tuition fees, established Indian communities, and rigorous clinical schedules."
    },
    philippines: {
      name: "Philippines",
      pageUrl: "countries/philippines.html",
      badge: "US Curriculum & High FMGE Success",
      duration: "5.5 – 6 Years (BS-MD Pathway)",
      medium: "100% English (Official Language)",
      feeRange: "₹3,20,000 – ₹5,50,000 / Year",
      livingCost: "₹15,000 – ₹25,500 / Month",
      popularUniversities: [
        "University of Perpetual Help DALTA",
        "Davao Medical School Foundation",
        "Our Lady of Fatima University",
        "Emilio Aguinaldo College of Medicine"
      ],
      highlights: [
        "American medical curriculum pattern (MD degree equivalent to MBBS)",
        "World's 3rd largest English-speaking country - zero language barrier",
        "Exceptional clinical disease patterns identical to India (tropical climate)",
        "Consistent record of top pass percentages in FMGE/NExT examinations",
        "Ideal stepping stone for USMLE and clinical residency in USA"
      ],
      description: "The Philippines is renowned for its US-patterned medical training, tropical disease spectrum matching India, and seamless English communication in hospital wards."
    },
    egypt: {
      name: "Egypt",
      pageUrl: "countries/egypt.html",
      badge: "Historic Excellence & Clinical Mastery",
      duration: "5 Years + 2 Years Internship",
      medium: "100% English Medium",
      feeRange: "₹3,50,000 – ₹6,00,000 / Year",
      livingCost: "₹12,000 – ₹20,000 / Month",
      popularUniversities: [
        "Cairo University Faculty of Medicine (Kasr Alainy)",
        "Ain Shams University Faculty of Medicine",
        "Alexandria University",
        "Mansoura University"
      ],
      highlights: [
        "Centuries-old medical faculties with world-class clinical heritage",
        "Massive university teaching hospitals with unmatched patient influx",
        "High international reputation and strong residency match records in UK & USA",
        "Fully English-medium curriculum designed for international medical undergraduates",
        "Safe student environment and Indian mess facilities available"
      ],
      description: "Egypt combines centuries of medical teaching prestige with massive multi-specialty teaching hospitals, providing students with peerless real-world clinical experience."
    },
    nepal: {
      name: "Nepal",
      pageUrl: "countries/nepal.html",
      badge: "Nearest Neighbor & Familiar Culture",
      duration: "5.5 Years (including internship)",
      medium: "100% English Medium",
      feeRange: "₹8,50,000 – ₹13,00,000 / Year",
      livingCost: "₹10,000 – ₹16,000 / Month",
      popularUniversities: [
        "BP Koirala Institute of Health Sciences (BPKIHS)",
        "Tribhuvan University (Institute of Medicine)",
        "Kathmandu University School of Medical Sciences",
        "Manipal College of Medical Sciences"
      ],
      highlights: [
        "No passport or visa required for Indian citizens (Government ID proof only)",
        "Curriculum identical to Indian MBBS pattern (NMC aligned)",
        "Familiar cultural, dietary, and linguistic environment",
        "Many faculty members trained at premier Indian institutions like AIIMS and PGI",
        "Extremely high passing percentage in FMGE / NExT screening tests"
      ],
      description: "Nepal is the most culturally seamless option for Indian students, offering identical curriculum structures, disease demographics, and immediate travel ease without visa barriers."
    }
  };

  // 8. Attach Explore Country Modal Event Listeners
  document.querySelectorAll('.btn-explore-country').forEach(button => {
    button.addEventListener('click', (e) => {
      e.preventDefault();
      const countryKey = button.getAttribute('data-country');
      const data = countryData[countryKey];
      if (data) {
        const content = `
          <div class="space-y-6">
            <div class="flex items-center gap-3">
              <span class="inline-block px-3 py-1 rounded-full text-xs font-semibold bg-sky-100 text-sky-800">${data.badge}</span>
              <span class="inline-block px-3 py-1 rounded-full text-xs font-semibold bg-emerald-100 text-emerald-800">NMC & WHO Compliant</span>
            </div>
            <p class="text-slate-600 text-sm md:text-base leading-relaxed">${data.description}</p>
            
            <div class="grid grid-cols-2 md:grid-cols-4 gap-3 bg-slate-50 p-4 rounded-xl border border-slate-200">
              <div>
                <span class="text-xs text-slate-400 block font-medium">Duration</span>
                <span class="text-sm font-bold text-slate-800">${data.duration}</span>
              </div>
              <div>
                <span class="text-xs text-slate-400 block font-medium">Medium</span>
                <span class="text-sm font-bold text-slate-800">${data.medium}</span>
              </div>
              <div>
                <span class="text-xs text-slate-400 block font-medium">Annual Tuition</span>
                <span class="text-sm font-bold text-sky-700">${data.feeRange}</span>
              </div>
              <div>
                <span class="text-xs text-slate-400 block font-medium">Est. Living</span>
                <span class="text-sm font-bold text-slate-800">${data.livingCost}</span>
              </div>
            </div>

            <div>
              <h4 class="font-bold text-slate-800 text-sm mb-2.5">Key Highlights for Indian Students</h4>
              <ul class="space-y-1.5 text-xs text-slate-600">
                ${data.highlights.map(h => `<li class="flex items-start gap-2"><svg class="w-4 h-4 text-emerald-500 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path></svg> <span>${h}</span></li>`).join('')}
              </ul>
            </div>

            <div>
              <h4 class="font-bold text-slate-800 text-sm mb-2.5">Top Medical Universities</h4>
              <div class="flex flex-wrap gap-2">
                ${data.popularUniversities.map(u => `<span class="px-3 py-1.5 bg-slate-100 text-slate-700 rounded-lg text-xs font-medium border border-slate-200">${u}</span>`).join('')}
              </div>
            </div>

            <div class="pt-4 border-t border-slate-200 flex flex-col sm:flex-row gap-3">
              <button onclick="document.getElementById('genericModal').classList.add('hidden'); document.body.style.overflow=''; document.getElementById('consultationSection')?.scrollIntoView({behavior:'smooth'});" class="flex-1 bg-sky-600 hover:bg-sky-700 text-white font-semibold py-3 px-6 rounded-xl transition text-center shadow-lg shadow-sky-600/20">
                Enquire for MBBS in ${data.name}
              </button>
              <a href="https://wa.me/919876543210?text=Hello%20Global%20MBBS%20Abroad,%20I%20am%20interested%20in%20MBBS%20in%20${encodeURIComponent(data.name)}." target="_blank" rel="noopener noreferrer" class="flex items-center justify-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white font-semibold py-3 px-6 rounded-xl transition">
                <svg class="w-5 h-5 fill-current" viewBox="0 0 24 24"><path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981z"/></svg>
                WhatsApp Inquiry
              </a>
            </div>
          </div>
        `;
        openModal(`MBBS in ${data.name} – Quick Overview`, content);
      }
    });
  });

  // 9. Free Counselling Modal Trigger
  const counsellingTriggers = document.querySelectorAll('.trigger-counselling-modal');
  counsellingTriggers.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const content = `
        <div class="space-y-4">
          <p class="text-slate-600 text-sm">Fill in your information and our medical education advisor will contact you within 2 business hours for a 1-on-1 personalized counselling session.</p>
          <form id="modalCounsellingForm" class="space-y-3">
            <div>
              <label class="block text-xs font-semibold text-slate-700 mb-1">Student Full Name *</label>
              <input type="text" id="mName" required placeholder="Enter student's name" class="w-full px-3.5 py-2.5 rounded-lg border border-slate-300 focus:border-sky-500 focus:ring-2 focus:ring-sky-100 text-sm outline-none transition" />
            </div>
            <div class="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label class="block text-xs font-semibold text-slate-700 mb-1">Contact Number (WhatsApp) *</label>
                <input type="tel" id="mPhone" required pattern="[0-9]{10}" placeholder="10-digit mobile number" class="w-full px-3.5 py-2.5 rounded-lg border border-slate-300 focus:border-sky-500 focus:ring-2 focus:ring-sky-100 text-sm outline-none transition" />
              </div>
              <div>
                <label class="block text-xs font-semibold text-slate-700 mb-1">Email Address</label>
                <input type="email" id="mEmail" placeholder="student@example.com" class="w-full px-3.5 py-2.5 rounded-lg border border-slate-300 focus:border-sky-500 focus:ring-2 focus:ring-sky-100 text-sm outline-none transition" />
              </div>
            </div>
            <div class="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label class="block text-xs font-semibold text-slate-700 mb-1">Preferred Country</label>
                <select id="mCountry" class="w-full px-3.5 py-2.5 rounded-lg border border-slate-300 focus:border-sky-500 focus:ring-2 focus:ring-sky-100 text-sm outline-none transition bg-white">
                  <option value="">Select Country</option>
                  <option value="Russia">Russia</option>
                  <option value="Georgia">Georgia</option>
                  <option value="Kazakhstan">Kazakhstan</option>
                  <option value="Uzbekistan">Uzbekistan</option>
                  <option value="Kyrgyzstan">Kyrgyzstan</option>
                  <option value="Philippines">Philippines</option>
                  <option value="Egypt">Egypt</option>
                  <option value="Nepal">Nepal</option>
                </select>
              </div>
              <div>
                <label class="block text-xs font-semibold text-slate-700 mb-1">NEET Status</label>
                <select id="mNeet" class="w-full px-3.5 py-2.5 rounded-lg border border-slate-300 focus:border-sky-500 focus:ring-2 focus:ring-sky-100 text-sm outline-none transition bg-white">
                  <option value="Qualified">Qualified (2024/2025/2026)</option>
                  <option value="Appearing">Appearing in NEET 2026</option>
                  <option value="Planning">Planning for 2027</option>
                </select>
              </div>
            </div>
            <div class="pt-2">
              <button type="submit" class="w-full bg-gradient-to-r from-sky-600 to-blue-700 hover:from-sky-700 hover:to-blue-800 text-white font-bold py-3 rounded-xl shadow-lg shadow-sky-600/25 transition">
                Book My Free Counselling Session
              </button>
            </div>
          </form>
        </div>
      `;
      openModal("Book Free 1-on-1 MBBS Counselling", content);

      const modalForm = document.getElementById('modalCounsellingForm');
      modalForm?.addEventListener('submit', (evt) => {
        evt.preventDefault();
        const name = document.getElementById('mName').value;
        closeModal();
        showToast(`Thank you, ${name}! Your free counselling session has been scheduled. A medical admission advisor will contact you shortly.`);
      });
    });
  });

  // 10. Toast Notification System
  function showToast(message) {
    const existing = document.getElementById('toastNotification');
    if (existing) existing.remove();

    const toast = document.createElement('div');
    toast.id = 'toastNotification';
    toast.className = 'fixed bottom-24 right-6 z-50 max-w-sm bg-navy-900 text-white px-5 py-4 rounded-2xl shadow-2xl border border-sky-500/30 text-sm flex items-start gap-3 transform translate-y-10 opacity-0 transition-all duration-300';
    toast.innerHTML = `
      <div class="w-6 h-6 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center flex-shrink-0 mt-0.5">
        <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path></svg>
      </div>
      <div class="flex-1">${message}</div>
    `;
    document.body.appendChild(toast);

    setTimeout(() => {
      toast.classList.remove('translate-y-10', 'opacity-0');
      toast.classList.add('translate-y-0', 'opacity-100');
    }, 50);

    setTimeout(() => {
      toast.classList.remove('translate-y-0', 'opacity-100');
      toast.classList.add('translate-y-10', 'opacity-0');
      setTimeout(() => toast.remove(), 350);
    }, 4500);
  }

  // 11. WhatsApp Floating Box Toggle
  const whatsappToggleBtn = document.getElementById('whatsappFloatingBtn');
  const whatsappChatBox = document.getElementById('whatsappChatBox');
  const whatsappCloseBox = document.getElementById('whatsappCloseBox');

  if (whatsappToggleBtn && whatsappChatBox) {
    whatsappToggleBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      whatsappChatBox.classList.toggle('hidden');
    });

    whatsappCloseBox?.addEventListener('click', (e) => {
      e.stopPropagation();
      whatsappChatBox.classList.add('hidden');
    });

    document.addEventListener('click', (e) => {
      if (!whatsappChatBox.contains(e.target) && !whatsappToggleBtn.contains(e.target)) {
        whatsappChatBox.classList.add('hidden');
      }
    });
  }

  // 12. Consultation Section Quick Form (if on page)
  const consultForm = document.getElementById('consultationQuickForm');
  if (consultForm) {
    consultForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const name = consultForm.querySelector('input[type="text"]')?.value || 'Student';
      showToast(`Thank you, ${name}! Your consultation request has been received. Our expert will call you shortly.`);
      consultForm.reset();
    });
  }

  // 13. GSAP & ScrollTrigger Animations
  if (typeof gsap !== 'undefined' && typeof ScrollTrigger !== 'undefined') {
    gsap.registerPlugin(ScrollTrigger);

    // Hero Section Entrance Animation
    const heroTl = gsap.timeline({ defaults: { ease: 'power3.out' } });
    heroTl
      .from('.about-hero-badge', { opacity: 0, y: -20, duration: 0.8, delay: 0.2 })
      .from('.about-hero-title', { opacity: 0, y: 30, duration: 0.9 }, '-=0.5')
      .from('.about-hero-desc', { opacity: 0, y: 20, duration: 0.8 }, '-=0.6')
      .from('.about-hero-cta', { opacity: 0, y: 20, duration: 0.7 }, '-=0.5')
      .from('.about-hero-visual', { opacity: 0, scale: 0.95, duration: 1 }, '-=0.7')
      .from('.about-hero-float-card', { opacity: 0, y: 25, duration: 0.8, stagger: 0.15 }, '-=0.5');

    // General Section Heading Fade-ups
    gsap.utils.toArray('.section-header-reveal').forEach((header) => {
      gsap.from(header, {
        opacity: 0,
        y: 40,
        duration: 0.9,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: header,
          start: 'top 85%',
          toggleActions: 'play none none reverse'
        }
      });
    });

    // Feature Cards Stagger (Why Choose Us)
    const whyChooseCards = gsap.utils.toArray('.feature-card-item');
    if (whyChooseCards.length > 0) {
      gsap.from(whyChooseCards, {
        opacity: 0,
        y: 45,
        duration: 0.8,
        stagger: 0.1,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: whyChooseCards[0],
          start: 'top 85%',
          toggleActions: 'play none none reverse'
        }
      });
    }

    // Services Grid Stagger
    const serviceCards = gsap.utils.toArray('.service-card-item');
    if (serviceCards.length > 0) {
      gsap.from(serviceCards, {
        opacity: 0,
        y: 35,
        duration: 0.7,
        stagger: 0.08,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: serviceCards[0],
          start: 'top 85%',
          toggleActions: 'play none none reverse'
        }
      });
    }

    // Destination Cards Stagger
    const destCards = gsap.utils.toArray('.destination-card-item');
    if (destCards.length > 0) {
      gsap.from(destCards, {
        opacity: 0,
        y: 40,
        duration: 0.8,
        stagger: 0.1,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: destCards[0],
          start: 'top 85%',
          toggleActions: 'play none none reverse'
        }
      });
    }

    // Gallery Items Stagger
    const galleryItems = gsap.utils.toArray('.gallery-item');
    if (galleryItems.length > 0) {
      gsap.from(galleryItems, {
        opacity: 0,
        scale: 0.92,
        duration: 0.7,
        stagger: 0.08,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: galleryItems[0],
          start: 'top 85%',
          toggleActions: 'play none none reverse'
        }
      });
    }

    // Mission & Vision Cards
    const mvCards = gsap.utils.toArray('.mv-card-item');
    if (mvCards.length > 0) {
      gsap.from(mvCards, {
        opacity: 0,
        y: 50,
        duration: 0.9,
        stagger: 0.2,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: mvCards[0],
          start: 'top 85%',
          toggleActions: 'play none none reverse'
        }
      });
    }

    // Who We Are Two-Column Reveal
    const whoWeAreVisual = document.querySelector('.who-we-are-visual');
    const whoWeAreContent = document.querySelector('.who-we-are-content');
    if (whoWeAreVisual && whoWeAreContent) {
      gsap.from(whoWeAreVisual, {
        opacity: 0,
        x: -40,
        duration: 1,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: whoWeAreVisual,
          start: 'top 80%',
          toggleActions: 'play none none reverse'
        }
      });
      gsap.from(whoWeAreContent, {
        opacity: 0,
        x: 40,
        duration: 1,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: whoWeAreContent,
          start: 'top 80%',
          toggleActions: 'play none none reverse'
        }
      });
    }
  }
});

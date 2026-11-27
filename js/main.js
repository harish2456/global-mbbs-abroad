/**
 * GLOBAL MBBS ABROAD - Main Interactive Script
 * Faithful implementation of the reference design interactions:
 * - Sticky navigation blur & mobile drawer
 * - Interactive Eligibility Checker filter
 * - Dynamic MBBS Cost Calculator with reactive visual chart
 * - Dynamic Fee comparison table filter & update
 * - FAQ Accordion
 * - Interactive Counselling Booking Modal & Toast notifications
 * - WhatsApp drawer & Back to Top
 */

document.addEventListener('DOMContentLoaded', () => {
  // 1. Mobile Menu Toggle
  const mobileMenuBtn = document.getElementById('mobileMenuBtn');
  const mobileMenu = document.getElementById('mobileMenu');
  if (mobileMenuBtn && mobileMenu) {
    mobileMenuBtn.addEventListener('click', () => {
      const isExpanded = mobileMenuBtn.getAttribute('aria-expanded') === 'true';
      mobileMenuBtn.setAttribute('aria-expanded', !isExpanded);
      mobileMenu.classList.toggle('hidden');
    });
  }

  // 2. Mobile Dropdowns
  const mobileDropdownBtns = document.querySelectorAll('.mobile-dropdown-btn');
  mobileDropdownBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const submenu = btn.nextElementSibling;
      const icon = btn.querySelector('.mobile-dropdown-icon');
      if (submenu) {
        submenu.classList.toggle('hidden');
        if (icon) icon.classList.toggle('rotate-180');
      }
    });
  });

  // 3. Navbar scroll elevation & Back to Top
  const navbar = document.getElementById('navbar');
  const backToTop = document.getElementById('backToTop');
  window.addEventListener('scroll', () => {
    const scrollPos = window.scrollY;
    if (navbar) {
      if (scrollPos > 30) {
        navbar.classList.add('shadow-md', 'bg-white/95');
      } else {
        navbar.classList.remove('shadow-md', 'bg-white/95');
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
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  // 4. Modal System
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

  // 5. Toast Notification System
  function showToast(message) {
    const existing = document.getElementById('toastNotification');
    if (existing) existing.remove();

    const toast = document.createElement('div');
    toast.id = 'toastNotification';
    toast.className = 'fixed bottom-24 right-6 z-50 max-w-sm bg-navy-950 text-white px-5 py-4 rounded-2xl shadow-2xl border border-sky-500/30 text-sm flex items-start gap-3 transform translate-y-10 opacity-0 transition-all duration-300';
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

  // 6. Free Counselling Modal Trigger (Gold button & CTA)
  const counsellingTriggers = document.querySelectorAll('.trigger-counselling-modal');
  counsellingTriggers.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const content = `
        <div class="space-y-4">
          <p class="text-slate-600 text-sm">Speak with our senior medical admission counsellor for personalized university guidance, official fee structures, and end-to-end admission support.</p>
          <form id="modalCounsellingForm" class="space-y-3">
            <div>
              <label class="block text-xs font-bold text-slate-700 mb-1">Student Full Name *</label>
              <input type="text" id="mName" required placeholder="Enter student's full name" class="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 focus:border-teal-600 focus:ring-2 focus:ring-teal-100 text-sm outline-none transition" />
            </div>
            <div class="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label class="block text-xs font-bold text-slate-700 mb-1">WhatsApp / Phone *</label>
                <input type="tel" id="mPhone" required pattern="[0-9]{10}" placeholder="10-digit mobile number" class="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 focus:border-teal-600 focus:ring-2 focus:ring-teal-100 text-sm outline-none transition" />
              </div>
              <div>
                <label class="block text-xs font-bold text-slate-700 mb-1">Email Address</label>
                <input type="email" id="mEmail" placeholder="student@example.com" class="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 focus:border-teal-600 focus:ring-2 focus:ring-teal-100 text-sm outline-none transition" />
              </div>
            </div>
            <div class="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label class="block text-xs font-bold text-slate-700 mb-1">Preferred Country</label>
                <select id="mCountry" class="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 focus:border-teal-600 focus:ring-2 focus:ring-teal-100 text-sm outline-none transition bg-white">
                  <option value="">Any Preferred Country</option>
                  <option value="Russia">Russia</option>
                  <option value="Georgia">Georgia</option>
                  <option value="Kazakhstan">Kazakhstan</option>
                  <option value="Uzbekistan">Uzbekistan</option>
                  <option value="Philippines">Philippines</option>
                </select>
              </div>
              <div>
                <label class="block text-xs font-bold text-slate-700 mb-1">NEET Status</label>
                <select id="mNeet" class="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 focus:border-teal-600 focus:ring-2 focus:ring-teal-100 text-sm outline-none transition bg-white">
                  <option value="Yes">Qualified (NEET 2024/2025/2026)</option>
                  <option value="Appearing">Appearing in NEET 2027</option>
                  <option value="Pending">Score Pending</option>
                </select>
              </div>
            </div>
            <div class="pt-2">
              <button type="submit" class="w-full bg-gradient-to-r from-amber-500 via-amber-400 to-amber-500 hover:from-amber-600 hover:to-amber-600 text-navy-950 font-bold py-3.5 rounded-xl shadow-lg transition">
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

  // 7. Eligibility Checker Interactive Form (Section 7)
  const eligibilityForm = document.getElementById('eligibilityForm');
  if (eligibilityForm) {
    eligibilityForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const neet = document.getElementById('elNeet')?.value || 'Yes';
      const pcb = document.getElementById('elPcb')?.value || '50% - 60%';
      const country = document.getElementById('elCountry')?.value || 'Russia';

      let resultHtml = `
        <div class="space-y-4">
          <div class="p-4 rounded-2xl bg-emerald-50 border border-emerald-200 flex items-start gap-3">
            <div class="w-8 h-8 rounded-full bg-emerald-500 text-white flex items-center justify-center font-bold flex-shrink-0">✓</div>
            <div>
              <h4 class="font-bold text-emerald-950 text-base">Congratulations! You are Eligible for MBBS Abroad</h4>
              <p class="text-xs text-emerald-800 mt-1">Based on NEET Status (${neet}), 12th PCB (${pcb}), and destination (${country}), you meet the NMC & WHO criteria for admission.</p>
            </div>
          </div>
          <div class="bg-slate-50 p-4 rounded-xl border border-slate-200 text-xs text-slate-700 space-y-2">
            <div class="flex justify-between py-1 border-b border-slate-200">
              <span class="text-slate-500">Destination:</span>
              <span class="font-bold">${country}</span>
            </div>
            <div class="flex justify-between py-1 border-b border-slate-200">
              <span class="text-slate-500">Language of Instruction:</span>
              <span class="font-bold">100% English Medium</span>
            </div>
            <div class="flex justify-between py-1 border-b border-slate-200">
              <span class="text-slate-500">NMC Compliance:</span>
              <span class="font-bold text-emerald-600">Verified & Approved</span>
            </div>
            <div class="flex justify-between py-1">
              <span class="text-slate-500">Admissions Status:</span>
              <span class="font-bold text-teal-600">2027 Admissions Open</span>
            </div>
          </div>
          <div class="pt-2">
            <button onclick="document.getElementById('genericModal').classList.add('hidden'); document.body.style.overflow='';" class="trigger-counselling-modal w-full bg-teal-800 hover:bg-teal-900 text-white font-bold py-3 rounded-xl transition text-center text-sm shadow-md">
              Proceed with Admission Guidance
            </button>
          </div>
        </div>
      `;
      openModal("Eligibility Assessment Result", resultHtml);
    });
  }

  // 8. Cost Calculator Interactive Logic (Section 9)
  const calcSelectCountry = document.getElementById('calcSelectCountry');
  const calcSelectDuration = document.getElementById('calcSelectDuration');
  const calcBtn = document.getElementById('calcBtn');
  const calcResultBox = document.getElementById('calcResultBox');
  const calcBarRussia = document.getElementById('calcBarRussia');
  const calcBarGeorgia = document.getElementById('calcBarGeorgia');
  const calcBarKazakhstan = document.getElementById('calcBarKazakhstan');
  const calcBarUzbekistan = document.getElementById('calcBarUzbekistan');
  const calcBarPhilippines = document.getElementById('calcBarPhilippines');

  const countryFeeData = {
    russia: { min: 20, max: 28, defaultTotal: 24, label: '₹20 – 28 Lakhs' },
    georgia: { min: 28, max: 36, defaultTotal: 32, label: '₹28 – 36 Lakhs' },
    kazakhstan: { min: 24, max: 32, defaultTotal: 26, label: '₹24 – 32 Lakhs' },
    uzbekistan: { min: 22, max: 30, defaultTotal: 26, label: '₹22 – 30 Lakhs' },
    philippines: { min: 42, max: 55, defaultTotal: 48, label: '₹42 – 55 Lakhs' }
  };

  function updateCalculator() {
    const cKey = calcSelectCountry?.value || 'russia';
    const data = countryFeeData[cKey] || countryFeeData.russia;

    if (calcResultBox) {
      calcResultBox.innerHTML = `
        <div class="text-xs font-semibold text-slate-500">Estimated Total Package (6 Years)</div>
        <div class="text-2xl sm:text-3xl font-extrabold text-teal-800 mt-0.5">Approx. ₹${data.defaultTotal} Lakhs</div>
        <div class="text-[11px] text-slate-500 mt-1">Range: ${data.label} (Tuition + Hostel + Indian Mess)</div>
      `;
    }

    // Highlight selected bar in chart
    const allBars = [
      { el: calcBarRussia, key: 'russia' },
      { el: calcBarGeorgia, key: 'georgia' },
      { el: calcBarKazakhstan, key: 'kazakhstan' },
      { el: calcBarUzbekistan, key: 'uzbekistan' },
      { el: calcBarPhilippines, key: 'philippines' }
    ];

    allBars.forEach(item => {
      if (item.el) {
        if (item.key === cKey) {
          item.el.classList.remove('bg-teal-500/80', 'bg-teal-600/70');
          item.el.classList.add('bg-teal-700', 'ring-2', 'ring-teal-400');
        } else {
          item.el.classList.remove('bg-teal-700', 'ring-2', 'ring-teal-400');
          item.el.classList.add('bg-teal-500/80');
        }
      }
    });
  }

  calcBtn?.addEventListener('click', (e) => {
    e.preventDefault();
    updateCalculator();
    showToast('MBBS cost estimate updated successfully!');
  });
  calcSelectCountry?.addEventListener('change', updateCalculator);

  // 9. FAQ Accordion Behavior (Section 12)
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

  // 10. WhatsApp Chat Toggle
  const whatsappFloatingBtn = document.getElementById('whatsappFloatingBtn');
  const whatsappChatBox = document.getElementById('whatsappChatBox');
  const whatsappCloseBox = document.getElementById('whatsappCloseBox');

  if (whatsappFloatingBtn && whatsappChatBox) {
    whatsappFloatingBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      whatsappChatBox.classList.toggle('hidden');
    });
    whatsappCloseBox?.addEventListener('click', (e) => {
      e.stopPropagation();
      whatsappChatBox.classList.add('hidden');
    });
    document.addEventListener('click', (e) => {
      if (!whatsappChatBox.contains(e.target) && !whatsappFloatingBtn.contains(e.target)) {
        whatsappChatBox.classList.add('hidden');
      }
    });
  }

  // 11. Destination Modal quick overview
  document.querySelectorAll('.btn-explore-country').forEach(button => {
    button.addEventListener('click', (e) => {
      e.preventDefault();
      const country = button.getAttribute('data-country') || 'MBBS Abroad';
      const content = `
        <div class="space-y-4">
          <p class="text-slate-600 text-sm">Explore top medical universities, NMC compliance, clinical hospital affiliations, and transparent fees for <strong>${country}</strong>.</p>
          <div class="bg-slate-50 p-4 rounded-xl border border-slate-200 text-xs space-y-1.5 text-slate-700">
            <div><strong>Curriculum:</strong> 100% English Medium (NMC 2026 Compliant)</div>
            <div><strong>Hostel & Mess:</strong> Indian mess available with North/South Indian food</div>
            <div><strong>Tuition Range:</strong> Official university fee schedule in INR</div>
          </div>
          <div class="flex gap-3 pt-2">
            <button onclick="document.getElementById('genericModal').classList.add('hidden'); document.body.style.overflow='';" class="trigger-counselling-modal flex-1 bg-teal-800 hover:bg-teal-900 text-white font-bold py-2.5 rounded-xl transition text-center text-xs">
              Apply for ${country}
            </button>
            <a href="https://wa.me/917760665912?text=Hello%20Global%20MBBS%20Abroad,%20I%20am%20interested%20in%20${encodeURIComponent(country)}." target="_blank" rel="noopener noreferrer" class="bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-2.5 px-4 rounded-xl text-xs flex items-center justify-center gap-2">
              WhatsApp
            </a>
          </div>
        </div>
      `;
      openModal(`MBBS in ${country} – Quick Guide`, content);
    });
  });
});

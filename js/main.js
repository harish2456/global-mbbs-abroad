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
  function openCounsellingModal(prefillCountry = '', prefillNeet = '') {
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
                <option value="Russia" ${prefillCountry === 'Russia' ? 'selected' : ''}>Russia</option>
                <option value="Georgia" ${prefillCountry === 'Georgia' ? 'selected' : ''}>Georgia</option>
                <option value="Kazakhstan" ${prefillCountry === 'Kazakhstan' ? 'selected' : ''}>Kazakhstan</option>
                <option value="Uzbekistan" ${prefillCountry === 'Uzbekistan' ? 'selected' : ''}>Uzbekistan</option>
                <option value="Philippines" ${prefillCountry === 'Philippines' ? 'selected' : ''}>Philippines</option>
              </select>
            </div>
            <div>
              <label class="block text-xs font-bold text-slate-700 mb-1">NEET Status</label>
              <select id="mNeet" class="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 focus:border-teal-600 focus:ring-2 focus:ring-teal-100 text-sm outline-none transition bg-white">
                <option value="Yes" ${prefillNeet.includes('Yes') ? 'selected' : ''}>Qualified (NEET 2024/2025/2026)</option>
                <option value="Appearing" ${prefillNeet.includes('Appearing') ? 'selected' : ''}>Appearing in NEET 2027</option>
                <option value="No" ${prefillNeet.includes('No') || prefillNeet.includes('Not') ? 'selected' : ''}>Not Qualified / Not Appeared</option>
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
  }

  document.addEventListener('click', (e) => {
    const trigger = e.target.closest('.trigger-counselling-modal');
    if (trigger) {
      e.preventDefault();
      openCounsellingModal();
    }
  });

  // 7. Eligibility Checker Interactive Form (Section 7)
  const eligibilityForm = document.getElementById('eligibilityForm');
  if (eligibilityForm) {
    eligibilityForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const neet = document.getElementById('elNeet')?.value || 'Yes – NEET Qualified';
      const pcb = document.getElementById('elPcb')?.value || '70% and Above';
      const category = document.getElementById('elCategory')?.value || 'General Category – Minimum 50% PCB';
      const country = document.getElementById('elCountry')?.value || 'Russia';

      const isGeneral = category.includes('General Category');
      const categoryName = category.split('–')[0].trim();
      const pcbIsLowGeneral = (pcb === '40% – 50%') && isGeneral;
      const pcbIsReservedBorderline = (pcb === '40% – 50%') && !isGeneral;

      let status = '';
      let headline = '';
      let reason = '';
      let subReason = '';
      let icon = '✓';
      let badgeClass = 'bg-emerald-100 text-emerald-800 border border-emerald-300';
      let bannerBorder = 'border-emerald-200';
      let bannerBg = 'bg-emerald-50/80';
      let iconBg = 'bg-emerald-600';
      let titleColor = 'text-emerald-950';
      let descColor = 'text-emerald-900';

      // 1. NEET Status & Cutoff Evaluation Logic
      if (neet === 'No – NEET Not Qualified') {
        status = 'Not Eligible';
        headline = 'NEET Qualification Required';
        icon = '✕';
        badgeClass = 'bg-rose-100 text-rose-800 border border-rose-300';
        bannerBorder = 'border-rose-200';
        bannerBg = 'bg-rose-50/80';
        iconBg = 'bg-rose-600';
        titleColor = 'text-rose-950';
        descColor = 'text-rose-900';
        reason = 'Under statutory National Medical Commission (NMC) regulations, qualifying the NEET-UG examination is a mandatory prerequisite for Indian citizens and OCIs seeking admission to medical universities abroad. Without a qualifying NEET score, students are not eligible to register with NMC/State Medical Councils or appear for the Foreign Medical Graduate Examination (FMGE) / National Exit Test (NExT) to practice medicine in India.';
        subReason = 'Candidates who have not qualified NEET cannot receive NMC eligibility certificates or medical practice licensure in India. Students are advised to prepare for and qualify NEET before proceeding with foreign medical admissions.';
      } else if (neet === 'Not Appeared – Have Not Written NEET') {
        status = 'Not Eligible';
        headline = 'NEET Qualification Required Before Practising Medicine in India';
        icon = '✕';
        badgeClass = 'bg-rose-100 text-rose-800 border border-rose-300';
        bannerBorder = 'border-rose-200';
        bannerBg = 'bg-rose-50/80';
        iconBg = 'bg-rose-600';
        titleColor = 'text-rose-950';
        descColor = 'text-rose-900';
        reason = 'Under the NMC Foreign Medical Graduate Licentiate (FMGL) Regulations, clearing NEET-UG prior to taking admission in any foreign medical institution is an essential legal requirement if you intend to practice medicine in India. Without qualifying NEET-UG, an overseas MBBS degree cannot be registered for clinical practice in India.';
        subReason = 'To be eligible for medical practice registration in India, you must register for, appear in, and clear the NEET-UG examination.';
      } else if (neet === 'Appearing 2027 – Will Write NEET in 2027') {
        if (pcbIsLowGeneral) {
          status = 'Not Eligible';
          headline = '12th PCB Cutoff Below General Category Requirement';
          icon = '✕';
          badgeClass = 'bg-rose-100 text-rose-800 border border-rose-300';
          bannerBorder = 'border-rose-200';
          bannerBg = 'bg-rose-50/80';
          iconBg = 'bg-rose-600';
          titleColor = 'text-rose-950';
          descColor = 'text-rose-900';
          reason = 'Even though you are appearing for NEET in 2027, General Category candidates must achieve a minimum aggregate of 50% in Physics, Chemistry, and Biology (PCB) in 10+2 / 12th Grade under statutory NMC criteria. Your selected range (40% – 50%) does not meet this minimum academic threshold.';
          subReason = 'You will need to improve your 12th PCB aggregate to at least 50% through a board improvement examination to meet General Category eligibility.';
        } else {
          status = 'NEET Result Awaited';
          headline = 'NEET 2027 Result Awaited';
          icon = '⏳';
          badgeClass = 'bg-amber-100 text-amber-800 border border-amber-300';
          bannerBorder = 'border-amber-200';
          bannerBg = 'bg-amber-50/80';
          iconBg = 'bg-amber-500';
          titleColor = 'text-amber-950';
          descColor = 'text-amber-900';
          reason = `Your 12th PCB aggregate (${pcb}) satisfies the statutory academic requirement for ${categoryName}. Your eligibility is currently provisional pending your NEET 2027 examination score and qualifying percentile.`;
          subReason = `You can pre-book personalized university counselling, explore accredited colleges in ${country}, and reserve admission seats provisionally. Final admission and NMC compliance will be validated once your NEET 2027 scorecard is issued.`;
        }
      } else if (neet === 'Yes – NEET Qualified') {
        if (pcbIsLowGeneral) {
          status = 'Not Eligible';
          headline = '12th PCB Percentage Below Minimum Cutoff';
          icon = '✕';
          badgeClass = 'bg-rose-100 text-rose-800 border border-rose-300';
          bannerBorder = 'border-rose-200';
          bannerBg = 'bg-rose-50/80';
          iconBg = 'bg-rose-600';
          titleColor = 'text-rose-950';
          descColor = 'text-rose-900';
          reason = 'Under statutory NMC regulations and foreign medical university criteria, General (Unreserved) category students must secure a minimum aggregate of 50% in Physics, Chemistry, and Biology (PCB) in their 10+2 / 12th examination. Your selected range (40% – 50%) does not meet this mandatory threshold.';
          subReason = 'Candidates in the General Category must attain a minimum 50% aggregate in PCB in their 12th board exams to qualify for NMC registration and overseas MBBS admissions.';
        } else if (country === 'Philippines') {
          status = 'Additional Verification Required';
          headline = 'Additional Verification Required – Curriculum & NMAT Requirements';
          icon = '🔍';
          badgeClass = 'bg-indigo-100 text-indigo-800 border border-indigo-300';
          bannerBorder = 'border-indigo-200';
          bannerBg = 'bg-indigo-50/80';
          iconBg = 'bg-indigo-600';
          titleColor = 'text-indigo-950';
          descColor = 'text-indigo-900';
          reason = 'You meet the baseline NEET qualification and academic PCB requirements. However, medical education in the Philippines follows the dual-degree BS-MD pathway (pre-med BS followed by 4-year MD) and requires clearing the National Medical Admission Test (NMAT). Furthermore, compliance with the NMC FMGL 2021 mandate (minimum 54-month continuous medical course + 12-month internship in a single campus) requires university-specific syllabus and duration verification prior to enrollment.';
          subReason = 'Our senior advisors will examine your documentation to verify institutional NMC compliance and NMAT exam requirements for your selected Philippine university.';
        } else if (pcbIsReservedBorderline) {
          status = 'Additional Verification Required';
          headline = `Additional Verification Required – University-Specific Cutoffs in ${country}`;
          icon = '🔍';
          badgeClass = 'bg-indigo-100 text-indigo-800 border border-indigo-300';
          bannerBorder = 'border-indigo-200';
          bannerBg = 'bg-indigo-50/80';
          iconBg = 'bg-indigo-600';
          titleColor = 'text-indigo-950';
          descColor = 'text-indigo-900';
          reason = `You meet the statutory minimum NMC requirement of 40% PCB for ${categoryName} with NEET qualification. However, specific medical universities in ${country} enforce institutional cutoffs (such as minimum 50% overall in PCB or 50% individual score in Biology) or require internal entrance evaluations / interviews.`;
          subReason = `A personalized transcript review is required to match your exact subject-wise marks with eligible, NMC-compliant medical universities in ${country}.`;
        } else {
          status = 'Eligible';
          headline = `Eligible for MBBS in ${country}`;
          icon = '✓';
          badgeClass = 'bg-emerald-100 text-emerald-800 border border-emerald-300';
          bannerBorder = 'border-emerald-200';
          bannerBg = 'bg-emerald-50/80';
          iconBg = 'bg-emerald-600';
          titleColor = 'text-emerald-950';
          descColor = 'text-emerald-900';
          reason = `Congratulations! You fulfill both statutory NMC requirements (NEET-UG qualification and valid 10+2 PCB aggregate for ${categoryName}) and standard university admission standards for recognized medical universities in ${country}.`;
          
          if (country === 'Russia') {
            subReason = 'Russian State Medical Universities offer 6-year NMC-compliant English-medium MD (General Medicine) programs with world-class clinical hospitals and direct bilateral government recognition.';
          } else if (country === 'Georgia') {
            subReason = 'Georgian Medical Universities offer 6-year European-accredited English-medium MD curricula (WFME recognized). An internal English proficiency interview will be scheduled upon application.';
          } else if (country === 'Kazakhstan') {
            subReason = 'National & State Universities in Kazakhstan provide 5-year/6-year NMC-compliant English-medium MBBS courses with modern simulation centres and high clinical exposure.';
          } else if (country === 'Uzbekistan') {
            subReason = 'Government medical institutes in Uzbekistan offer 6-year NMC-compliant English-medium MD programs with affordable fee structures and dedicated Indian mess facilities.';
          }
        }
      }

      const resultHtml = `
        <div class="space-y-4">
          
          <!-- Primary Status Card -->
          <div class="p-4 rounded-2xl ${bannerBg} border ${bannerBorder} flex items-start gap-3.5">
            <div class="w-10 h-10 rounded-full ${iconBg} text-white flex items-center justify-center font-bold text-lg flex-shrink-0 shadow-sm">
              ${icon}
            </div>
            <div class="flex-1 min-w-0">
              <div class="flex flex-wrap items-center justify-between gap-2">
                <h4 class="font-bold text-sm sm:text-base ${titleColor} leading-snug">${headline}</h4>
                <span class="px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider ${badgeClass} shadow-xs">
                  ${status}
                </span>
              </div>
              <p class="text-xs ${descColor} mt-2 leading-relaxed">
                ${reason}
              </p>
              ${subReason ? `<p class="text-[11px] ${descColor} opacity-90 mt-1.5 pt-1.5 border-t border-black/5 leading-relaxed font-medium">${subReason}</p>` : ''}
            </div>
          </div>

          <!-- Student Selected Details Summary -->
          <div class="bg-slate-50 p-4 rounded-xl border border-slate-200 text-xs text-slate-700">
            <div class="flex items-center justify-between border-b border-slate-200 pb-2 mb-2.5">
              <span class="font-bold text-slate-900 text-xs uppercase tracking-wider">Your Evaluation Summary</span>
              <span class="text-[10px] font-semibold text-teal-800 bg-teal-50 px-2 py-0.5 rounded border border-teal-200">NMC Compliant</span>
            </div>
            <div class="grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-2">
              <div class="flex justify-between py-1 border-b border-slate-100 sm:border-b-0">
                <span class="text-slate-500">NEET Status:</span>
                <span class="font-bold text-slate-800 text-right">${neet}</span>
              </div>
              <div class="flex justify-between py-1 border-b border-slate-100 sm:border-b-0">
                <span class="text-slate-500">12th PCB %:</span>
                <span class="font-bold text-slate-800 text-right">${pcb}</span>
              </div>
              <div class="flex justify-between py-1 border-b border-slate-100 sm:border-b-0">
                <span class="text-slate-500">Student Category:</span>
                <span class="font-bold text-slate-800 text-right">${categoryName}</span>
              </div>
              <div class="flex justify-between py-1 border-b border-slate-100 sm:border-b-0">
                <span class="text-slate-500">Preferred Destination:</span>
                <span class="font-bold text-teal-700 text-right">${country}</span>
              </div>
            </div>
          </div>

          <!-- Official NMC Statutory Advisory -->
          <div class="p-3.5 rounded-xl bg-amber-50/90 border border-amber-200 text-[11px] text-amber-950 leading-relaxed space-y-1">
            <div class="font-bold flex items-center gap-1.5 text-amber-900">
              <span>⚖️</span> <span>Official NMC Regulatory Notice</span>
            </div>
            <p>
              Under National Medical Commission (NMC) regulations, qualifying NEET-UG is an indispensable statutory requirement for Indian students seeking foreign medical degrees. <strong>Paying foreign university tuition fees or obtaining direct university admission does NOT remove, waive, or replace the mandatory NEET qualification requirement for medical registration or licensing in India.</strong>
            </p>
          </div>

          <!-- Action Buttons -->
          <div class="pt-2 flex flex-col sm:flex-row gap-2.5">
            <button onclick="document.getElementById('genericModal').classList.add('hidden'); document.body.style.overflow=''; openCounsellingModal('${country}', '${neet}');" class="flex-1 btn-gold-primary py-3 rounded-xl font-bold text-xs flex items-center justify-center gap-2 shadow-md">
              <span>📅 Book Free Expert Counselling</span>
            </button>
            <a href="https://wa.me/917760665912?text=Hello%20Global%20MBBS%20Abroad,%20I%20checked%20my%20eligibility%20for%20${encodeURIComponent(country)}%20(Status:%20${encodeURIComponent(status)}).%20Please%20guide%20me%20further." target="_blank" rel="noopener noreferrer" class="btn-whatsapp-green px-5 py-3 rounded-xl font-bold text-xs flex items-center justify-center gap-2 shadow-md">
              <svg class="w-4 h-4 fill-current" viewBox="0 0 24 24"><path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981z"/></svg>
              <span>Chat on WhatsApp</span>
            </a>
          </div>

        </div>
      `;

      openModal("MBBS Eligibility Assessment Result", resultHtml);
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

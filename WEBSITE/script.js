/* ==========================================================================
   PURPLEXITY — DARK PURPLE INTERACTIVE SCRIPT
   60fps Smooth Split Logo Strand Entrance + Typewriter PURPLEXITY (No Cursor Line, Clean & Decent),
   Sticky Nav, Live SVG Chart Switching, Reviews, FAQ Accordions, and Audit Modal.
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {



  // 1. Sticky Header Condensing
  const header = document.getElementById('siteHeader');
  const handleScroll = () => {
    if (window.scrollY > 40) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  };
  window.addEventListener('scroll', handleScroll, { passive: true });
  handleScroll();

  // 2. Mobile Navigation Toggle
  const mobileToggle = document.getElementById('mobileMenuToggle');
  const navMenu = document.getElementById('navMenu');

  if (mobileToggle && navMenu) {
    mobileToggle.addEventListener('click', () => {
      const isExpanded = mobileToggle.getAttribute('aria-expanded') === 'true';
      mobileToggle.setAttribute('aria-expanded', !isExpanded);
      navMenu.classList.toggle('active');
    });

    navMenu.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        navMenu.classList.remove('active');
        mobileToggle.setAttribute('aria-expanded', 'false');
      });
    });
  }

  // 3. Interactive SVG Performance Graph Switcher
  const btnRoas = document.getElementById('btnRoasGraph');
  const btnCac = document.getElementById('btnCacGraph');
  const chartLinePath = document.getElementById('chartLinePath');
  const chartAreaPath = document.getElementById('chartAreaPath');

  const graphData = {
    roas: {
      line: "M0,170 Q200,160 400,100 T800,20",
      area: "M0,170 Q200,160 400,100 T800,20 L800,200 L0,200 Z",
      color: "#10B981"
    },
    cac: {
      line: "M0,30 Q200,40 400,110 T800,180",
      area: "M0,30 Q200,40 400,110 T800,180 L800,200 L0,200 Z",
      color: "#8B5CF6"
    }
  };

  if (btnRoas && btnCac && chartLinePath && chartAreaPath) {
    btnRoas.addEventListener('click', () => {
      btnRoas.classList.add('active');
      btnCac.classList.remove('active');
      chartLinePath.setAttribute('d', graphData.roas.line);
      chartAreaPath.setAttribute('d', graphData.roas.area);
      chartLinePath.setAttribute('stroke', graphData.roas.color);
    });

    btnCac.addEventListener('click', () => {
      btnCac.classList.add('active');
      btnRoas.classList.remove('active');
      chartLinePath.setAttribute('d', graphData.cac.line);
      chartAreaPath.setAttribute('d', graphData.cac.area);
      chartLinePath.setAttribute('stroke', graphData.cac.color);
    });
  }

  // 4. Purplexity Ecosystem Full-Screen Navigation
  const openScreenBtns = document.querySelectorAll('[data-open-screen]');
  const closeScreenBtns = document.querySelectorAll('[data-close-screen]');
  const ecoScreens = document.querySelectorAll('.eco-screen');

  const openEcoScreen = (screenId) => {
    const targetScreen = document.getElementById(screenId);
    if (!targetScreen) return;

    ecoScreens.forEach(s => s.classList.remove('active'));
    targetScreen.classList.add('active');
    targetScreen.scrollTop = 0;
    document.documentElement.classList.add('eco-screen-open');
    document.body.classList.add('eco-screen-open');
    document.body.style.overflow = 'hidden';

    try {
      history.pushState({ screen: screenId }, '', '#' + screenId.replace('screen-', ''));
    } catch (err) {}
  };

  const closeEcoScreen = (screenId) => {
    if (screenId) {
      const targetScreen = document.getElementById(screenId);
      if (targetScreen) targetScreen.classList.remove('active');
    } else {
      ecoScreens.forEach(s => s.classList.remove('active'));
    }

    const anyActive = document.querySelector('.eco-screen.active');
    if (!anyActive) {
      document.documentElement.classList.remove('eco-screen-open');
      document.body.classList.remove('eco-screen-open');
      document.body.style.overflow = '';
      try {
        if (window.location.hash) {
          history.pushState('', document.title, window.location.pathname + window.location.search);
        }
      } catch (err) {}

      const ecosystemSection = document.getElementById('ecosystem');
      if (ecosystemSection) {
        ecosystemSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }
  };

  openScreenBtns.forEach((btn) => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const screenId = btn.getAttribute('data-open-screen');
      openEcoScreen(screenId);
    });
  });

  closeScreenBtns.forEach((btn) => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const screenId = btn.getAttribute('data-close-screen');
      closeEcoScreen(screenId);
    });
  });

  window.addEventListener('popstate', () => {
    const hash = window.location.hash.replace('#', '');
    if (hash && document.getElementById('screen-' + hash)) {
      openEcoScreen('screen-' + hash);
    } else {
      closeEcoScreen();
    }
  });

  // 5. FAQ Accordion Logic
  const faqButtons = document.querySelectorAll('.faq-button');

  faqButtons.forEach((btn) => {
    btn.addEventListener('click', () => {
      const isExpanded = btn.getAttribute('aria-expanded') === 'true';
      const targetId = btn.getAttribute('aria-controls');
      const panel = document.getElementById(targetId);

      faqButtons.forEach((otherBtn) => {
        if (otherBtn !== btn) {
          otherBtn.setAttribute('aria-expanded', 'false');
          const otherPanelId = otherBtn.getAttribute('aria-controls');
          const otherPanel = document.getElementById(otherPanelId);
          if (otherPanel) otherPanel.setAttribute('aria-hidden', 'true');
        }
      });

      btn.setAttribute('aria-expanded', !isExpanded);
      if (panel) {
        panel.setAttribute('aria-hidden', isExpanded);
      }
    });
  });

  // 6. Audit Modal Logic
  // ============================================================================
  // 6. GROWTH AUDIT & CALENDLY SUBSET BOOKING MODAL
  // ============================================================================
  const modalOverlay = document.getElementById('auditModal');
  const auditModalCard = document.getElementById('auditModalCard');
  const modalCloseBtn = document.getElementById('modalCloseBtn');
  const openModalBtns = document.querySelectorAll('[data-open-modal="true"]');
  const auditForm = document.getElementById('auditForm');

  // Multi-step elements
  const bookingStep1 = document.getElementById('bookingStep1');
  const bookingStep2 = document.getElementById('bookingStep2');
  const bookingConfirmed = document.getElementById('bookingConfirmed');
  const stepPill1 = document.getElementById('stepPill1');
  const stepPill2 = document.getElementById('stepPill2');
  const stepNum1 = document.getElementById('stepNum1');
  const stepNum2 = document.getElementById('stepNum2');
  const stepperLine = document.getElementById('stepperLine');
  const skipToCalendlyBtn = document.getElementById('skipToCalendlyBtn');
  const backToStep1Btn = document.getElementById('backToStep1Btn');
  const btnDoneBooking = document.getElementById('btnDoneBooking');
  const btnFinishAll = document.getElementById('btnFinishAll');
  const calendlyIframe = document.getElementById('calendlyIframe');
  const calendlyDirectLink = document.getElementById('calendlyDirectLink');
  const step2Subtitle = document.getElementById('step2Subtitle');

  let currentLeadId = null;
  let currentLeadData = null;

  const escapeHtml = (str) => {
    if (!str) return '';
    return str.replace(/[&<>"']/g, (m) => ({
      '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;'
    })[m]);
  };

  const goToStep2 = () => {
    if (bookingStep1) bookingStep1.style.display = 'none';
    if (bookingStep2) bookingStep2.style.display = 'block';
    if (bookingConfirmed) bookingConfirmed.style.display = 'none';

    if (auditModalCard) auditModalCard.classList.add('calendly-expanded');

    // Build Calendly URL
    const calBase = 'https://calendly.com/purplexity-in/30min';
    const params = new URLSearchParams({
      embed_domain: window.location.hostname || 'localhost',
      embed_type: 'Inline',
      hide_gdpr_banner: '1',
      background_color: '0b0712',
      text_color: 'ffffff',
      primary_color: '9333ea'
    });

    const fullCalUrl = `${calBase}?${params.toString()}`;

    if (calendlyIframe && (!calendlyIframe.src || calendlyIframe.src === 'about:blank')) {
      calendlyIframe.src = fullCalUrl;
    }
    if (calendlyDirectLink) {
      calendlyDirectLink.href = fullCalUrl;
    }
  };

  const goToConfirmed = () => {
    if (bookingStep1) bookingStep1.style.display = 'none';
    if (bookingStep2) bookingStep2.style.display = 'none';
    if (bookingConfirmed) bookingConfirmed.style.display = 'block';

    if (auditModalCard) auditModalCard.classList.remove('calendly-expanded');
  };

  const openModal = () => {
    if (modalOverlay) {
      modalOverlay.classList.add('active');
      document.body.style.overflow = 'hidden';
      // Reset to booking step 2 (Calendly view)
      goToStep2();
    }
  };

  const closeModal = () => {
    if (modalOverlay) {
      modalOverlay.classList.remove('active');
      const anyScreenActive = document.querySelector('.eco-screen.active');
      if (!anyScreenActive) {
        document.documentElement.classList.remove('eco-screen-open');
        document.body.classList.remove('eco-screen-open');
        document.body.style.overflow = '';
      }
    }
  };

  openModalBtns.forEach((btn) => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      openModal();
    });
  });

  if (modalCloseBtn) modalCloseBtn.addEventListener('click', closeModal);

  if (modalOverlay) {
    modalOverlay.addEventListener('click', (e) => {
      if (e.target === modalOverlay) closeModal();
    });
  }

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      if (modalOverlay && modalOverlay.classList.contains('active')) {
        closeModal();
      } else {
        closeEcoScreen();
      }
    }
  });

  // Helper: Save Lead Payload to Server + LocalStorage + Storage Event Broadcast
  const saveLeadPayload = async (leadPayload) => {
    currentLeadData = leadPayload;

    // 1. Try posting to backend API endpoints (origin, localhost, 127.0.0.1)
    const endpoints = [];
    if (window.location.origin.includes('http')) {
      endpoints.push(`${window.location.origin}/api/leads`);
    }
    endpoints.push('http://localhost:5000/api/leads');
    endpoints.push('http://127.0.0.1:5000/api/leads');

    for (const ep of endpoints) {
      try {
        const res = await fetch(ep, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(leadPayload)
        });
        if (res.ok) {
          const resData = await res.json();
          if (resData.lead && resData.lead.id) {
            currentLeadId = resData.lead.id;
          }
          break;
        }
      } catch (err) {
        // Continue to fallback endpoints
      }
    }

    // 2. Always write to LocalStorage backup so no lead is lost
    try {
      const cached = JSON.parse(localStorage.getItem('purp_leads_cache') || '[]');
      const spendSelect = document.getElementById('monthlySpend');
      const spendLabel = spendSelect?.selectedOptions?.[0]?.text || leadPayload.monthlySpend || 'Not specified';
      const generatedId = currentLeadId || ('lead_' + Math.floor(Date.now() / 1000) + '_' + Math.random().toString(36).substring(2, 6));
      currentLeadId = generatedId;
      const fallbackLead = {
        id: generatedId,
        ...leadPayload,
        monthlySpendLabel: spendLabel,
        status: 'new',
        notes: '',
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      };
      // Avoid duplicate in local cache
      const filtered = cached.filter(l => l.id !== generatedId && l.workEmail !== leadPayload.workEmail);
      filtered.unshift(fallbackLead);
      localStorage.setItem('purp_leads_cache', JSON.stringify(filtered));
      window.dispatchEvent(new Event('storage'));
    } catch (err) {
      console.error('LocalStorage write error:', err);
    }
  };

  // Skip straight to Step 2 (Calendly)
  if (skipToCalendlyBtn) {
    skipToCalendlyBtn.addEventListener('click', async () => {
      const partialData = {
        fullName: (document.getElementById('fullName')?.value || 'Incomplete Lead').trim(),
        workEmail: (document.getElementById('workEmail')?.value || '').trim(),
        phoneNumber: (document.getElementById('phoneNumber')?.value || '').trim(),
        companyUrl: (document.getElementById('companyUrl')?.value || '').trim(),
        monthlySpend: document.getElementById('monthlySpend')?.value || '',
        source: 'Website Growth Audit Modal (Skipped to Calendly)'
      };
      await saveLeadPayload(partialData);
      goToStep2(partialData);
    });
  }

  // Back to Step 1 from Step 2
  if (backToStep1Btn) {
    backToStep1Btn.addEventListener('click', () => {
      goToStep1();
    });
  }

  // Done button in Step 2
  if (btnDoneBooking) {
    btnDoneBooking.addEventListener('click', () => {
      goToConfirmed();
    });
  }

  // Final confirmation finish
  if (btnFinishAll) {
    btnFinishAll.addEventListener('click', () => {
      closeModal();
      setTimeout(() => {
        goToStep2();
      }, 400);
    });
  }

  // Live Auto-Capture: Instantly save lead draft as user types into any form field
  ['fullName', 'workEmail', 'phoneNumber', 'companyUrl', 'monthlySpend'].forEach(id => {
    const el = document.getElementById(id);
    if (el) {
      const captureDraft = () => {
        const name = (document.getElementById('fullName')?.value || '').trim();
        const email = (document.getElementById('workEmail')?.value || '').trim();
        const phone = (document.getElementById('phoneNumber')?.value || '').trim();
        if (name || email || phone) {
          saveLeadPayload({
            fullName: name || 'Incomplete Lead',
            workEmail: email,
            phoneNumber: phone,
            companyUrl: (document.getElementById('companyUrl')?.value || '').trim(),
            monthlySpend: document.getElementById('monthlySpend')?.value || '',
            source: 'Website Growth Audit Modal (Live Draft)'
          });
        }
      };
      el.addEventListener('blur', captureDraft);
      if (el.tagName === 'SELECT') el.addEventListener('change', captureDraft);
    }
  });

  // Form Submission -> Captures Lead First -> Transitions to Calendly Subset
  if (auditForm) {
    auditForm.addEventListener('submit', async (e) => {
      e.preventDefault();

      const name = (document.getElementById('fullName')?.value || '').trim();
      const email = (document.getElementById('workEmail')?.value || '').trim();
      const phone = (document.getElementById('phoneNumber')?.value || '').trim();

      // If all fields are completely blank, prompt validation
      if (!name && !email && !phone) {
        if (!auditForm.checkValidity()) auditForm.reportValidity();
        return;
      }

      const submitBtn = document.getElementById('btnSubmitStep1') || auditForm.querySelector('button[type="submit"]');
      const originalText = submitBtn ? submitBtn.innerHTML : '';
      if (submitBtn) {
        submitBtn.innerHTML = '<span>Saving details &amp; loading calendar...</span>';
        submitBtn.disabled = true;
      }

      const leadPayload = {
        fullName: name || 'Incomplete Lead',
        workEmail: email,
        phoneNumber: phone,
        companyUrl: (document.getElementById('companyUrl')?.value || '').trim(),
        monthlySpend: document.getElementById('monthlySpend')?.value || '',
        source: 'Website Growth Audit Modal'
      };

      await saveLeadPayload(leadPayload);

      if (submitBtn) {
        submitBtn.innerHTML = originalText;
        submitBtn.disabled = false;
      }

      // Smoothly advance to Step 2 with Calendly prefilled!
      goToStep2(leadPayload);
    });
  }

  // Listen for Calendly scheduling event
  window.addEventListener('message', async (e) => {
    if (e.origin && e.origin.includes('calendly.com')) {
      if (e.data && e.data.event === 'calendly.event_scheduled') {
        // Update backend lead status to 'meeting_booked'
        if (currentLeadId) {
          try {
            const apiBase = window.location.origin.includes('http') ? window.location.origin : 'https://purplexity.in';
            await fetch(`${apiBase}/api/leads/${currentLeadId}`, {
              method: 'PUT',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({
                status: 'meeting_booked',
                notes: 'Client booked 30-min growth strategy session via Calendly embed.'
              })
            });
          } catch (err) {
            console.warn('Could not sync Calendly event to server:', err);
          }
        }
        goToConfirmed();
      }
    }
  });


  // 7. Extract Standalone Logo Mark Element & Remove White Background
  function extractLogoMarkElement() {
    const logoImgs = document.querySelectorAll('img[src*="logo"]');
    if (!logoImgs.length) return;

    const img = new Image();
    img.crossOrigin = "Anonymous";
    img.onload = function () {
      // Crop top 74% to isolate the ribbon icon mark symbol from the image text
      const cropWidth = img.naturalWidth;
      const cropHeight = Math.floor(img.naturalHeight * 0.74);

      const canvas = document.createElement('canvas');
      canvas.width = cropWidth;
      canvas.height = cropHeight;
      const ctx = canvas.getContext('2d');

      ctx.drawImage(img, 0, 0, cropWidth, cropHeight, 0, 0, cropWidth, cropHeight);

      try {
        const imgData = ctx.getImageData(0, 0, cropWidth, cropHeight);
        const data = imgData.data;

        for (let i = 0; i < data.length; i += 4) {
          const r = data[i];
          const g = data[i + 1];
          const b = data[i + 2];

          // Detect white & off-white background pixels (R > 215, G > 215, B > 215)
          if (r > 215 && g > 215 && b > 215) {
            data[i + 3] = 0; // Set alpha to 0 (100% transparent)
          }
        }

        ctx.putImageData(imgData, 0, 0);
        const transparentMarkUrl = canvas.toDataURL('image/png');

        logoImgs.forEach(el => {
          el.src = transparentMarkUrl;
        });
      } catch (err) {
        console.warn('Canvas logo mark extraction fallback:', err);
      }
    };
    img.src = 'logo.png';
  }

  extractLogoMarkElement();

});

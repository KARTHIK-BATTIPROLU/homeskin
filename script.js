/**
 * HOMSKIN — PREMIUM SURFACE PROTECTION FILM
 * Master Frontend Controller (script.js)
 * Vanilla JavaScript (Zero external dependencies)
 */

document.addEventListener('DOMContentLoaded', () => {
  'use strict';

  // --------------------------------------------------------------------------
  // 1. DOM REFERENCES
  // --------------------------------------------------------------------------
  const siteHeader = document.getElementById('siteHeader');
  const mobileMenuBtn = document.getElementById('mobileMenuBtn');
  const mobileDrawer = document.getElementById('mobileDrawer');
  const mobileNavLinks = document.querySelectorAll('.mobile-nav-link');
  const desktopNavLinks = document.querySelectorAll('.desktop-nav .nav-link');
  const backToTopBtn = document.getElementById('backToTopBtn');
  const faqAccordion = document.getElementById('faqAccordion');
  const consultationForm = document.getElementById('consultationForm');
  const formFeedback = document.getElementById('formFeedback');
  const baSlider = document.getElementById('baSlider');
  const baRange = document.getElementById('baRange');

  // Business Contact Info
  const HOMSKIN_PHONE = '+919392418581';
  const HOMSKIN_EMAIL = 'homskin11@gmail.com';

  // --------------------------------------------------------------------------
  // 2. STICKY NAVBAR SCROLL BEHAVIOR & BACK TO TOP
  // --------------------------------------------------------------------------
  let ticking = false;

  function handleScroll() {
    const currentScrollY = window.scrollY;

    if (siteHeader) {
      if (currentScrollY > 40) {
        siteHeader.classList.add('scrolled');
      } else {
        siteHeader.classList.remove('scrolled');
      }
    }

    if (backToTopBtn) {
      if (currentScrollY > 450) {
        backToTopBtn.classList.add('visible');
      } else {
        backToTopBtn.classList.remove('visible');
      }
    }

    highlightActiveNavLink();
    ticking = false;
  }

  window.addEventListener('scroll', () => {
    if (!ticking) {
      window.requestAnimationFrame(handleScroll);
      ticking = true;
    }
  }, { passive: true });

  handleScroll();

  // --------------------------------------------------------------------------
  // 3. ROBUST ACTIVE NAVIGATION LINK HIGHLIGHTING
  // --------------------------------------------------------------------------
  const navSectionIds = Array.from(desktopNavLinks)
    .map(link => link.getAttribute('href')?.replace('#', ''))
    .filter(Boolean);
  const navSections = navSectionIds
    .map(id => document.getElementById(id))
    .filter(Boolean);

  function highlightActiveNavLink() {
    // If user scrolled near the bottom of the page, activate the last nav link (#contact)
    const isAtBottom = (window.innerHeight + window.scrollY) >= (document.documentElement.scrollHeight - 70);
    let activeId = navSectionIds[0];

    if (isAtBottom && navSectionIds.length > 0) {
      activeId = navSectionIds[navSectionIds.length - 1];
    } else {
      const scrollThreshold = window.scrollY + 160;
      for (const section of navSections) {
        const top = section.getBoundingClientRect().top + window.scrollY;
        if (scrollThreshold >= top) {
          activeId = section.id;
        }
      }
    }

    desktopNavLinks.forEach(link => {
      link.classList.toggle('active', link.getAttribute('href') === `#${activeId}`);
    });
    mobileNavLinks.forEach(link => {
      link.classList.toggle('active', link.getAttribute('href') === `#${activeId}`);
    });
  }

  // --------------------------------------------------------------------------
  // 4. MOBILE DRAWER NAVIGATION (ACCESSIBLE + FOCUS TRAP)
  // --------------------------------------------------------------------------
  if (mobileMenuBtn && mobileDrawer) {
    const focusableSelector = 'a[href], button:not([disabled]), input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])';

    function toggleMobileMenu(open) {
      const isOpen = open !== undefined ? open : !mobileDrawer.classList.contains('open');
      mobileDrawer.classList.toggle('open', isOpen);
      mobileMenuBtn.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
      mobileDrawer.setAttribute('aria-hidden', isOpen ? 'false' : 'true');

      if (isOpen) {
        document.body.style.overflow = 'hidden';
        const focusableEls = mobileDrawer.querySelectorAll(focusableSelector);
        if (focusableEls.length > 0) {
          setTimeout(() => focusableEls[0].focus(), 40);
        }
      } else {
        document.body.style.overflow = '';
      }
    }

    // Accessible Focus Trap within Mobile Drawer
    mobileDrawer.addEventListener('keydown', (e) => {
      if (e.key !== 'Tab') return;
      const focusableEls = Array.from(mobileDrawer.querySelectorAll(focusableSelector));
      if (focusableEls.length === 0) return;
      const firstEl = focusableEls[0];
      const lastEl = focusableEls[focusableEls.length - 1];

      if (e.shiftKey) {
        if (document.activeElement === firstEl) {
          e.preventDefault();
          lastEl.focus();
        }
      } else {
        if (document.activeElement === lastEl) {
          e.preventDefault();
          firstEl.focus();
        }
      }
    });

    mobileMenuBtn.addEventListener('click', () => {
      toggleMobileMenu();
    });

    mobileNavLinks.forEach(link => {
      link.addEventListener('click', () => {
        toggleMobileMenu(false);
      });
    });

    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && mobileDrawer.classList.contains('open')) {
        toggleMobileMenu(false);
        mobileMenuBtn.focus();
      }
    });
  }

  // --------------------------------------------------------------------------
  // 5. SMOOTH SCROLLING WITH EXACT HEADER OFFSET
  // --------------------------------------------------------------------------
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      const targetId = this.getAttribute('href');
      if (targetId === '#' || !targetId) return;

      const targetEl = document.querySelector(targetId);
      if (targetEl) {
        e.preventDefault();
        const headerOffset = siteHeader ? siteHeader.offsetHeight + 10 : 70;
        const elementPosition = targetEl.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

        window.scrollTo({
          top: offsetPosition,
          behavior: 'smooth'
        });
      }
    });
  });

  // --------------------------------------------------------------------------
  // 6. BACK TO TOP BUTTON
  // --------------------------------------------------------------------------
  if (backToTopBtn) {
    backToTopBtn.addEventListener('click', () => {
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    });
  }

  // --------------------------------------------------------------------------
  // 7. BEFORE / AFTER INTERACTIVE COMPARISON SLIDER (POINTER EVENTS + CLIP-PATH)
  // --------------------------------------------------------------------------
  if (baSlider && baRange) {
    function updateSliderPosition(percent) {
      const clamped = Math.max(0, Math.min(100, percent));
      baSlider.style.setProperty('--ba-pos', `${clamped}%`);
      baRange.value = clamped;
      baRange.setAttribute('aria-valuenow', Math.round(clamped));
    }

    baRange.addEventListener('input', (e) => {
      updateSliderPosition(parseFloat(e.target.value));
    });

    let isPointerDown = false;

    function handlePointerDrag(e) {
      if (!isPointerDown) return;
      const rect = baSlider.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const percent = (x / rect.width) * 100;
      updateSliderPosition(percent);
    }

    baSlider.addEventListener('pointerdown', (e) => {
      isPointerDown = true;
      try { baSlider.setPointerCapture(e.pointerId); } catch (_) {}
      handlePointerDrag(e);
    });

    baSlider.addEventListener('pointermove', handlePointerDrag);

    function stopPointerDrag(e) {
      if (!isPointerDown) return;
      isPointerDown = false;
      try { baSlider.releasePointerCapture(e.pointerId); } catch (_) {}
    }

    baSlider.addEventListener('pointerup', stopPointerDrag);
    baSlider.addEventListener('pointercancel', stopPointerDrag);

    // Initial state: 50% split
    updateSliderPosition(50);
  }

  // --------------------------------------------------------------------------
  // 8. ACCESSIBLE FAQ ACCORDION
  // --------------------------------------------------------------------------
  if (faqAccordion) {
    const faqItems = faqAccordion.querySelectorAll('.faq-item');

    faqItems.forEach(item => {
      const trigger = item.querySelector('.faq-trigger');

      if (trigger) {
        trigger.addEventListener('click', () => {
          const isCurrentlyActive = item.classList.contains('active');
          const isMobile = window.innerWidth <= 640;

          // On mobile, collapse others for tidy viewport
          if (isMobile && !isCurrentlyActive) {
            faqItems.forEach(other => {
              other.classList.remove('active');
              const otherTrigger = other.querySelector('.faq-trigger');
              if (otherTrigger) otherTrigger.setAttribute('aria-expanded', 'false');
            });
          }

          if (isCurrentlyActive) {
            item.classList.remove('active');
            trigger.setAttribute('aria-expanded', 'false');
          } else {
            item.classList.add('active');
            trigger.setAttribute('aria-expanded', 'true');
          }
        });
      }
    });
  }

  // --------------------------------------------------------------------------
  // 9. CONSULTATION FORM & RELIABLE WHATSAPP / EMAIL / CALL FLOW
  // --------------------------------------------------------------------------
  if (consultationForm) {
    const nameInput = document.getElementById('formName');
    const phoneInput = document.getElementById('formPhone');
    const emailInput = document.getElementById('formEmail');
    const areaInput = document.getElementById('formArea');
    const surfaceInput = document.getElementById('formSurface');
    const sizeInput = document.getElementById('formSize');
    const messageInput = document.getElementById('formMessage');
    const contactPrefInput = document.getElementById('formContactPref');
    const submitBtn = document.getElementById('submitFormBtn');

    const nameError = document.getElementById('nameError');
    const phoneError = document.getElementById('phoneError');
    const emailError = document.getElementById('emailError');
    const surfaceError = document.getElementById('surfaceError');

    // Phone validation (10 to 14 digits, allowing +, spaces, dashes, parentheses)
    function validatePhone(phone) {
      const cleaned = phone.replace(/[\s\-\(\)\+]/g, '');
      return cleaned.length >= 10 && cleaned.length <= 14 && /^\d+$/.test(cleaned);
    }

    // Email validation (optional field, but if filled must be valid)
    function validateEmail(email) {
      if (!email || email.trim() === '') return true;
      return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim());
    }

    // Clear field errors as user interacts
    [nameInput, phoneInput, emailInput, surfaceInput].forEach(field => {
      if (!field) return;
      field.addEventListener('input', () => {
        field.classList.remove('input-error');
        if (field === nameInput && nameError) nameError.textContent = '';
        if (field === phoneInput && phoneError) phoneError.textContent = '';
        if (field === emailInput && emailError) emailError.textContent = '';
      });
      field.addEventListener('change', () => {
        field.classList.remove('input-error');
        if (field === surfaceInput && surfaceError) surfaceError.textContent = '';
      });
    });

    consultationForm.addEventListener('submit', (e) => {
      e.preventDefault();

      // Clear previous error messages & highlights
      if (nameError) nameError.textContent = '';
      if (phoneError) phoneError.textContent = '';
      if (emailError) emailError.textContent = '';
      if (surfaceError) surfaceError.textContent = '';

      nameInput.classList.remove('input-error');
      phoneInput.classList.remove('input-error');
      if (emailInput) emailInput.classList.remove('input-error');
      if (surfaceInput) surfaceInput.classList.remove('input-error');

      if (formFeedback) {
        formFeedback.hidden = true;
        formFeedback.innerHTML = '';
      }

      let isValid = true;
      let firstErrorField = null;

      // Validate Name
      const nameVal = nameInput.value.trim();
      if (!nameVal || nameVal.length < 2) {
        if (nameError) nameError.textContent = 'Please enter your full name.';
        nameInput.classList.add('input-error');
        isValid = false;
        if (!firstErrorField) firstErrorField = nameInput;
      }

      // Validate Phone
      const phoneVal = phoneInput.value.trim();
      if (!phoneVal || !validatePhone(phoneVal)) {
        if (phoneError) phoneError.textContent = 'Please enter a valid 10-digit mobile number.';
        phoneInput.classList.add('input-error');
        isValid = false;
        if (!firstErrorField) firstErrorField = phoneInput;
      }

      // Validate Email (if provided)
      const emailVal = emailInput ? emailInput.value.trim() : '';
      if (emailVal && !validateEmail(emailVal)) {
        if (emailError) emailError.textContent = 'Please enter a valid email address.';
        emailInput.classList.add('input-error');
        isValid = false;
        if (!firstErrorField) firstErrorField = emailInput;
      }

      // Validate Surface
      const surfaceVal = surfaceInput ? surfaceInput.value : '';
      if (!surfaceVal) {
        if (surfaceError) surfaceError.textContent = 'Please select a surface type.';
        if (surfaceInput) surfaceInput.classList.add('input-error');
        isValid = false;
        if (!firstErrorField) firstErrorField = surfaceInput;
      }

      if (!isValid) {
        if (firstErrorField) firstErrorField.focus();
        return;
      }

      const areaVal = areaInput ? areaInput.value.trim() || 'Hyderabad' : 'Hyderabad';
      const sizeVal = sizeInput ? sizeInput.value.trim() || 'Standard' : 'Standard';
      const messageVal = messageInput ? messageInput.value.trim() || 'Requesting surface assessment and quote' : 'Requesting surface assessment and quote';
      const contactPref = contactPrefInput ? contactPrefInput.value : 'WhatsApp';

      // Build Polite Pre-filled WhatsApp Message
      const waText = `Hi HOMSKIN, I'm interested in surface protection film. I'd like to know more about protecting my ${surfaceVal}.\n\nName: ${nameVal}\nPhone: ${phoneVal}\nCity/Area: ${areaVal}\nApprox Size: ${sizeVal}\nNotes: ${messageVal}\nPreferred Contact: ${contactPref}`;
      const waUrl = `https://wa.me/919392418581?text=${encodeURIComponent(waText)}`;

      // Build Pre-filled Mailto URL
      const mailSubject = encodeURIComponent(`HOMSKIN Consultation: ${nameVal} - ${surfaceVal}`);
      const mailBody = encodeURIComponent(
        `Full Name: ${nameVal}\nPhone: ${phoneVal}\nEmail: ${emailVal || 'Not provided'}\nCity/Area: ${areaVal}\nSurface Type: ${surfaceVal}\nApprox Size: ${sizeVal}\n\nRequirement / Space Details:\n${messageVal}\n\nPreferred Contact: ${contactPref}`
      );
      const mailtoUrl = `mailto:${HOMSKIN_EMAIL}?subject=${mailSubject}&body=${mailBody}`;

      // Render Instant, Rich Feedback Alert
      if (formFeedback) {
        formFeedback.hidden = false;
        formFeedback.className = 'form-feedback success';
        formFeedback.innerHTML = `
          <div class="feedback-header">
            <svg class="feedback-icon" viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="20 6 9 17 4 12"></polyline></svg>
            <h4>Your Consultation Enquiry is Ready</h4>
          </div>
          <p>We've prepared your enquiry details for <strong>${surfaceVal}</strong> in <strong>${areaVal}</strong>. Connect with our Hyderabad team via your preferred mode:</p>
          <div class="feedback-actions">
            <a href="${waUrl}" target="_blank" rel="noopener noreferrer" class="btn btn-accent btn-sm">
              <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"></path></svg>
              <span>Send via WhatsApp</span>
            </a>
            <a href="${mailtoUrl}" class="btn btn-secondary btn-sm">
              <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path><polyline points="22,6 12,13 2,6"></polyline></svg>
              <span>Send via Email</span>
            </a>
            <a href="tel:${HOMSKIN_PHONE}" class="btn btn-secondary btn-sm">
              <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path></svg>
              <span>Call Directly</span>
            </a>
          </div>
        `;
        formFeedback.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
      }

      // Synchronously execute action based on user preference (Prevents popup blocker)
      if (contactPref === 'WhatsApp') {
        window.open(waUrl, '_blank', 'noopener,noreferrer');
      } else if (contactPref === 'Email') {
        window.location.href = mailtoUrl;
      } else if (contactPref === 'Call') {
        window.location.href = `tel:${HOMSKIN_PHONE}`;
      }
    });
  }

  // --------------------------------------------------------------------------
  // 10. SCROLL REVEAL ANIMATIONS (INTERSECTION OBSERVER)
  // --------------------------------------------------------------------------
  const revealElements = document.querySelectorAll('.reveal-on-scroll');
  revealElements.forEach(el => el.classList.add('revealed'));

  if ('IntersectionObserver' in window && !window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    const revealObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('revealed');
          observer.unobserve(entry.target);
        }
      });
    }, {
      root: null,
      threshold: 0.05,
      rootMargin: '50px 0px 50px 0px'
    });

    revealElements.forEach(el => revealObserver.observe(el));
  }

  // --------------------------------------------------------------------------
  // 11. PROGRESSIVE WEBP PHOTO ENHANCEMENT
  // --------------------------------------------------------------------------
  // Checks if high-resolution WebP photographs exist and are decodeable.
  // If present, seamlessly upgrades the vector preview to the full 4K photograph,
  // including both picture <source> elements and standard <img> tags.
  function enhanceWebpPhotos() {
    // 1. Upgrade picture source elements if WebP is available
    document.querySelectorAll('picture source[data-webp]').forEach(source => {
      const webpPath = source.getAttribute('data-webp');
      if (!webpPath) return;
      const testImg = new Image();
      testImg.onload = () => {
        if (testImg.naturalWidth > 50 && testImg.naturalHeight > 50) {
          source.srcset = webpPath;
        }
      };
      testImg.src = webpPath;
    });

    // 2. Upgrade img elements
    document.querySelectorAll('img[data-webp]').forEach(img => {
      const webpPath = img.getAttribute('data-webp');
      if (!webpPath) return;

      const testImage = new Image();
      testImage.onload = () => {
        // Only swap if it is a real image with valid dimensions
        if (testImage.naturalWidth > 50 && testImage.naturalHeight > 50) {
          img.src = webpPath;
          // If within a picture element with unhandled source tags, update them too
          const parentPic = img.closest('picture');
          if (parentPic) {
            parentPic.querySelectorAll('source:not([data-webp])').forEach(source => {
              source.srcset = webpPath;
            });
          }
        }
      };
      testImage.src = webpPath;
    });
  }

  // Run non-blocking check after initial paint
  if ('requestIdleCallback' in window) {
    window.requestIdleCallback(enhanceWebpPhotos);
  } else {
    setTimeout(enhanceWebpPhotos, 500);
  }

});

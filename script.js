document.addEventListener("DOMContentLoaded", function () {

  /* ----------------------
     Pop-up (já funcionando)
     ---------------------- */
  const dishItems = document.querySelectorAll(".dish-item");
  const popupOverlay = document.getElementById("popupOverlay");
  const popupImage = document.getElementById("popupImage");
  const popupTitle = document.getElementById("popupTitle");
  const popupDescription = document.getElementById("popupDescription");
  const closePopup = document.getElementById("closePopup");

  console.log("Itens encontrados:", dishItems.length);

  dishItems.forEach(item => {
    item.addEventListener("click", () => {
      const imageSrc = item.querySelector("img").src;
      const dishName = item.dataset.dishName;
      const dishDescription = item.dataset.description;

      popupImage.src = imageSrc;
      popupTitle.textContent = dishName;
      popupDescription.textContent = dishDescription;

      // open overlay
      popupOverlay.classList.add("open");
      popupOverlay.style.display = "flex";
      // for accessibility focus
      closePopup.focus();
    });
  });

  closePopup.addEventListener("click", () => {
    popupOverlay.classList.remove("open");
    popupOverlay.style.display = "none";
  });

  popupOverlay.addEventListener("click", (e) => {
    if (e.target === popupOverlay) {
      popupOverlay.classList.remove("open");
      popupOverlay.style.display = "none";
    }
  });

  // feedback buttons basic
  const yesBtn = document.querySelector(".feedback-buttons .yes");
  const noBtn = document.querySelector(".feedback-buttons .no");
  if (yesBtn && noBtn) {
    yesBtn.addEventListener("click", () => {
      // small visual confirmation
      yesBtn.textContent = "Obrigado ✅";
      setTimeout(() => yesBtn.textContent = "Sim", 1500);
    });
    noBtn.addEventListener("click", () => {
      noBtn.textContent = "Entendi ✖️";
      setTimeout(() => noBtn.textContent = "Não", 1500);
    });
  }

  /* ----------------------
     Scroll Reveal (IntersectionObserver)
     ---------------------- */
  const srElements = document.querySelectorAll('.sr, .welcome-text, .nosso-espaco img, .dishes-grid .dish-item, .feedback-item, .footer-card');
  const srOptions = {
    root: null,
    rootMargin: '0px 0px -10% 0px',
    threshold: 0.12
  };

  const srObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('revealed');
        observer.unobserve(entry.target);
      }
    });
  }, srOptions);

  srElements.forEach(el => {
    srObserver.observe(el);
  });

  /* ----------------------
     Micro-interactions: add hover/touch feedback for all buttons
     ---------------------- */
  document.querySelectorAll('button, .btn-cta, .footer-btn').forEach(btn => {
    btn.addEventListener('mouseenter', () => {
      btn.style.transform = 'translateY(-3px)';
    });
    btn.addEventListener('mouseleave', () => {
      btn.style.transform = '';
    });
    // touch fallback
    btn.addEventListener('touchstart', () => {
      btn.style.transform = 'translateY(-2px)';
    }, {passive: true});
    btn.addEventListener('touchend', () => {
      btn.style.transform = '';
    }, {passive: true});
  });

  /* ----------------------
     Mobile Drawer (hamburger)
     ---------------------- */
  const hamburger = document.getElementById('hamburger');
  const drawer = document.getElementById('drawer');
  const drawerClose = document.getElementById('drawerClose');

  if (hamburger && drawer) {
    hamburger.addEventListener('click', () => {
      drawer.classList.add('open');
      // trap focus optionally
    });
    drawerClose.addEventListener('click', () => {
      drawer.classList.remove('open');
    });
    // close by clicking outside
    document.addEventListener('click', (e) => {
      if (drawer.classList.contains('open') && !drawer.contains(e.target) && !hamburger.contains(e.target)) {
        drawer.classList.remove('open');
      }
    });
  }

  /* ----------------------
     Reservar button alert
     ---------------------- */
  const reservarBtn = document.getElementById('reservar-btn');
  if (reservarBtn) {
    reservarBtn.addEventListener('click', () => {
      alert("Caminho de whatsapp");
    });
  }

  /* ----------------------
     Optional: initial small pulse for CTA after 2s
     ---------------------- */
  setTimeout(() => {
    if (reservarBtn) reservarBtn.classList.add('pulse');
    setTimeout(() => { if (reservarBtn) reservarBtn.classList.remove('pulse'); }, 4200);
  }, 2000);

});

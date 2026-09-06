document.addEventListener('DOMContentLoaded', () => {
  // Mobile Nav Toggle
  const navToggle = document.getElementById('navToggle');
  const navLinks = document.getElementById('navLinks');
  if (navToggle && navLinks) {
    navToggle.addEventListener('click', () => {
      navLinks.classList.toggle('active');
    });
  }

  // Navbar Background on Scroll
  const navbar = document.getElementById('navbar');
  window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
      navbar.style.boxShadow = '0 2px 10px rgba(0,0,0,0.5)';
      navbar.style.background = 'var(--overlay-bg)';
    } else {
      navbar.style.boxShadow = 'none';
      navbar.style.background = 'transparent';
    }
  });

  // Theme Switcher
  const themeBtns = document.querySelectorAll('.theme-btn');
  const html = document.documentElement;
  // Load saved theme
  const savedTheme = localStorage.getItem('shlomo_theme');
  if (savedTheme) {
    html.setAttribute('data-theme', savedTheme);
    themeBtns.forEach(b => b.classList.remove('active'));
    const activeBtn = document.querySelector(`.theme-btn[data-theme="${savedTheme}"]`);
    if (activeBtn) activeBtn.classList.add('active');
  }

  themeBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const theme = btn.getAttribute('data-theme');
      html.setAttribute('data-theme', theme);
      localStorage.setItem('shlomo_theme', theme);
      themeBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
    });
  });

  // Typewriter Effect
  const typedName = document.getElementById('typedName');
  const nameText = "Shlomo Schnall";
  if (typedName) {
    let i = 0;
    function typeWriter() {
      if (i < nameText.length) {
        typedName.innerHTML += nameText.charAt(i);
        i++;
        setTimeout(typeWriter, 150);
      }
    }
    setTimeout(typeWriter, 500);
  }

  // Floating Notes
  const floatingNotes = document.getElementById('floatingNotes');
  const notes = ['♪', '♫', '♬', '♭', '♮', '♯'];
  if (floatingNotes) {
    setInterval(() => {
      if (document.visibilityState !== 'visible') return;
      const note = document.createElement('div');
      note.className = 'note';
      note.innerText = notes[Math.floor(Math.random() * notes.length)];
      note.style.left = Math.random() * 100 + 'vw';
      note.style.animationDuration = (Math.random() * 3 + 4) + 's';
      note.style.fontSize = (Math.random() * 2 + 1) + 'rem';
      floatingNotes.appendChild(note);
      setTimeout(() => { note.remove(); }, 7000);
    }, 800);
  }

  // Intersection Observer for Reveal Animations & Stats
  const revealElements = document.querySelectorAll('.reveal, .reveal-left, .reveal-right');
  const statsElements = document.querySelectorAll('.stat-number');

  const callback = function (entries, observer) {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('active');
        // If it's the about section with stats, animate them
        if (entry.target.id === 'about' && !entry.target.classList.contains('stats-animated')) {
          entry.target.classList.add('stats-animated');
          statsElements.forEach(stat => {
            const target = parseInt(stat.getAttribute('data-target'));
            let current = 0;
            const inc = target / 50;
            const updateCount = () => {
              current += inc;
              if (current < target) {
                stat.innerText = Math.ceil(current);
                setTimeout(updateCount, 40);
              } else {
                stat.innerText = target;
              }
            };
            updateCount();
          });
        }
      }
    });
  };
  const observer = new IntersectionObserver(callback, { threshold: 0.15 });
  revealElements.forEach(el => observer.observe(el));
  // Observe about explicitly for stats
  const aboutSection = document.getElementById('about');
  if (aboutSection) observer.observe(aboutSection);

  // Load Videos
  const videosGrid = document.getElementById('videosGrid');
  if (videosGrid) {
    fetch('videos.json')
      .then(res => res.json())
      .then(data => {
        videosGrid.innerHTML = '';
        if (data && data.length > 0) {
          data.forEach(video => {
            // Extract youtube ID
            const urlObj = new URL(video.url);
            let videoId = urlObj.searchParams.get('v');
            if (!videoId) videoId = video.url.split('youtu.be/')[1]; // Fallback for shortened URL
            if (videoId) {
              const card = document.createElement('div');
              card.className = 'video-card reveal';
              card.innerHTML = `
                <div class="video-wrapper">
                  <iframe src="https://www.youtube.com/embed/${videoId}?rel=0" allowfullscreen allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"></iframe>
                </div>
                <div class="video-title">${video.title}</div>
              `;
              videosGrid.appendChild(card);
              observer.observe(card); // observe for reveal animation
            }
          });
        } else {
          videosGrid.innerHTML = '<p class="videos-note">Check back later for new performance videos.</p>';
        }
      })
      .catch(err => {
        console.error("Error loading videos:", err);
        videosGrid.innerHTML = '<p class="videos-note">Unable to load videos at this time.</p>';
      });
  }

  // Carousel
  const track = document.getElementById('testimonialTrack');
  const dotsContainer = document.getElementById('tcDots');
  const prevBtn = document.getElementById('tcPrev');
  const nextBtn = document.getElementById('tcNext');

  if (track && dotsContainer && prevBtn && nextBtn) {
    const slides = Array.from(track.children);
    let currentSlide = 0;

    slides.forEach((_, idx) => {
      const dot = document.createElement('div');
      dot.className = `tc-dot ${idx === 0 ? 'active' : ''}`;
      dot.addEventListener('click', () => moveToSlide(idx));
      dotsContainer.appendChild(dot);
    });

    const updateDots = () => {
      Array.from(dotsContainer.children).forEach((dot, idx) => {
        dot.classList.toggle('active', idx === currentSlide);
      });
    };

    const moveToSlide = (idx) => {
      if (idx < 0) idx = slides.length - 1;
      if (idx >= slides.length) idx = 0;
      currentSlide = idx;
      track.style.transform = `translateX(-${currentSlide * 100}%)`;
      updateDots();
    };

    prevBtn.addEventListener('click', () => moveToSlide(currentSlide - 1));
    nextBtn.addEventListener('click', () => moveToSlide(currentSlide + 1));

    // Auto advance
    setInterval(() => {
      // Only auto advance if in view
      const rect = track.getBoundingClientRect();
      if (rect.top >= 0 && rect.bottom <= (window.innerHeight || document.documentElement.clientHeight)) {
        moveToSlide(currentSlide + 1);
      }
    }, 6000);
  }



  // FAB Panel
  const fabBtn = document.getElementById('fabBtn');
  const infoPanel = document.getElementById('infoPanel');
  const infoClose = document.getElementById('infoClose');
  const infoOverlay = document.getElementById('infoOverlay');

  const toggleInfo = () => {
    infoPanel.classList.toggle('active');
    infoOverlay.classList.toggle('active');
  };

  if (fabBtn && infoPanel && infoClose && infoOverlay) {
    fabBtn.addEventListener('click', toggleInfo);
    infoClose.addEventListener('click', toggleInfo);
    infoOverlay.addEventListener('click', toggleInfo);
  }

  // Lightbox
  const galleryItems = document.querySelectorAll('.gallery-item');
  const lightbox = document.getElementById('lightbox');
  const lightboxImg = document.getElementById('lightboxImg');
  const lightboxClose = document.getElementById('lightboxClose');

  if (galleryItems.length > 0 && lightbox && lightboxImg && lightboxClose) {
    galleryItems.forEach(item => {
      item.addEventListener('click', () => {
        const img = item.querySelector('img');
        if (img) {
          lightboxImg.src = img.src;
          lightboxImg.alt = img.alt;
          lightbox.classList.add('active');
        }
      });
    });

    const closeLightbox = () => {
      lightbox.classList.remove('active');
      setTimeout(() => { lightboxImg.src = ""; }, 300);
    };

    lightboxClose.addEventListener('click', closeLightbox);
    lightbox.addEventListener('click', (e) => {
      if (e.target === lightbox) closeLightbox();
    });
    // Escape key handling
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') {
        if (lightbox.classList.contains('active')) closeLightbox();
        if (infoPanel && infoPanel.classList.contains('active')) toggleInfo();
      }
    });
  }
});

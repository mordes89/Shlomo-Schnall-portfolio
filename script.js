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
      navbar.style.background = 'var(--overlay-bg)';
    }
  });

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

  // Share the public website, including when previewing locally.
  const shareWebsite = document.getElementById('shareWebsite');
  if (shareWebsite) {
    shareWebsite.addEventListener('click', async () => {
      const url = `https://mordes89.github.io/Shlomo-Schnall-portfolio/?lang=${document.documentElement.lang === 'he' ? 'he' : 'en'}`;
      const status = document.getElementById('shareStatus');
      const fallback = document.getElementById('shareUrl');
      status.textContent = '';
      fallback.hidden = true;
      try {
        if (navigator.share) {
          await navigator.share({ title: document.title, url });
          return;
        }
      } catch (error) {
        if (error.name === 'AbortError') return;
      }
      try {
        await navigator.clipboard.writeText(url);
        status.textContent = 'Website link copied — ready to share.';
      } catch {
        fallback.value = url;
        fallback.hidden = false;
        fallback.focus();
        fallback.select();
        status.textContent = 'Copy this link to share the website.';
      }
    });
  }

  // Load Videos
  const videosGrid = document.getElementById('videosGrid');
  if (videosGrid) {
    fetch('videos.json?v=20260913-schumann')
      .then(res => res.json())
      .then(data => {
        videosGrid.innerHTML = '';
        if (data && data.length > 0) {
          const groups = [
            { category: 'single', title: 'Individual Performances', intro: 'Single pieces, Jewish jazz and vocal collaborations.' },
            { category: 'recital', title: 'Full Recitals', intro: 'Longer programs featuring a selection of classical works and more.' }
          ];
          groups.forEach(group => {
            const videos = data.filter(video => video.category === group.category);
            if (!videos.length) return;
            const section = document.createElement('section');
            section.className = 'video-group';
            section.setAttribute('aria-labelledby', `videos-${group.category}`);
            const heading = document.createElement('h3');
            heading.id = `videos-${group.category}`;
            heading.textContent = group.title;
            const intro = document.createElement('p');
            intro.className = 'video-group-intro';
            intro.textContent = group.intro;
            const grid = document.createElement('div');
            grid.className = 'videos-grid';
            videos.forEach(video => {
              const videoId = new URL(video.url).searchParams.get('v');
              if (!/^[\w-]{11}$/.test(videoId || '')) return;
              const card = document.createElement('a');
              card.className = video.format === 'short' ? 'video-card video-short' : 'video-card';
              card.href = video.url;
              card.target = '_blank';
              card.rel = 'noopener noreferrer';
              const wrapper = document.createElement('div');
              wrapper.className = 'video-wrapper';
              const thumbnail = document.createElement('img');
              thumbnail.src = `https://i.ytimg.com/vi/${videoId}/hqdefault.jpg`;
              thumbnail.alt = '';
              thumbnail.loading = 'lazy';
              thumbnail.width = 480;
              thumbnail.height = 360;
              const play = document.createElement('span');
              play.className = 'video-play';
              play.setAttribute('aria-hidden', 'true');
              play.textContent = '▶';
              wrapper.append(thumbnail, play);
              const details = document.createElement('div');
              details.className = 'video-details';
              const title = document.createElement('h4');
              title.className = 'video-title';
              title.textContent = video.title;
              const duration = document.createElement('p');
              duration.className = 'video-duration';
              duration.textContent = `Duration: ${video.duration}`;
              const description = document.createElement('p');
              description.className = 'video-description';
              description.textContent = video.description;
              const link = document.createElement('span');
              link.className = 'video-source';
              link.textContent = 'Watch on YouTube ↗';
              details.append(title, duration, description, link);
              card.append(wrapper, details);
              grid.appendChild(card);
            });
            section.append(heading, intro, grid);
            videosGrid.appendChild(section);
            setupVideoCarousel(section, grid);
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

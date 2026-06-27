// main.js — all the interactive stuff
// keeping it simple: no libraries, no frameworks, just vanilla JS
// each feature is wrapped in an IIFE so they don't leak globals



// ═══════════════════════════════════
// CONSOLE GREETING EASTER EGG
// ═══════════════════════════════════
(function initConsoleGreeting() {
  var style1 = 'font-size: 14px; font-weight: bold; color: #C55A3D; font-family: monospace; padding: 4px 0;';
  var style2 = 'font-size: 12px; color: inherit; font-family: monospace; line-height: 1.6;';
  console.log('%c> CONNECTION ESTABLISHED', style1);
  console.log('%cLike what you see under the hood?\nI\'m currently open to roles in database administration and full-stack development.\nLet\'s talk: jrdnether@gmail.com', style2);
})();

// ═══════════════════════════════════
// DARK / LIGHT MODE TOGGLE
// persisted to localStorage so it survives reload
// ═══════════════════════════════════
(function initThemeToggle() {
  var toggle = document.getElementById('themeToggle');
  var html = document.documentElement;
  if (!toggle) return;

  // svg icons — sun for dark mode (click to go light), moon for light mode (click to go dark)
  var sunSVG = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="5"></circle><line x1="12" y1="1" x2="12" y2="3"></line><line x1="12" y1="21" x2="12" y2="23"></line><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line><line x1="1" y1="12" x2="3" y2="12"></line><line x1="21" y1="12" x2="23" y2="12"></line><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line></svg>';
  var moonSVG = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path></svg>';

  function updateIcon() {
    var isDark = html.getAttribute('data-theme') !== 'light';
    toggle.innerHTML = isDark ? sunSVG : moonSVG;
  }

  // restore saved preference
  var saved = localStorage.getItem('theme');
  if (saved) {
    html.setAttribute('data-theme', saved);
  }
  updateIcon();

  toggle.addEventListener('click', function () {
    var isDark = html.getAttribute('data-theme') !== 'light';
    var newTheme = isDark ? 'light' : 'dark';
    html.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
    updateIcon();
  });

  // keyboard shortcut 't' to toggle
  document.addEventListener('keydown', function(e) {
    if (e.key.toLowerCase() === 't' && e.target.tagName !== 'INPUT' && e.target.tagName !== 'TEXTAREA') {
      toggle.click();
    }
  });
})();

// ═══════════════════════════════════
// STICKY NAVBAR SCROLL EFFECT
// ═══════════════════════════════════
(function initNavScroll() {
  var nav = document.getElementById('navbar');
  if (!nav) return;

  window.addEventListener('scroll', function () {
    nav.classList.toggle('scrolled', window.scrollY > 40);
  });
})();

// ═══════════════════════════════════
// MOBILE NAV TOGGLE
// ═══════════════════════════════════
(function initMobileNav() {
  var navToggle = document.getElementById('navToggle');
  var navLinks = document.getElementById('navLinks');
  if (!navToggle || !navLinks) return;

  navToggle.addEventListener('click', function () {
    navLinks.classList.toggle('open');
  });

  // close menu when a link is clicked
  var links = navLinks.querySelectorAll('a');
  for (var i = 0; i < links.length; i++) {
    links[i].addEventListener('click', function () {
      navLinks.classList.remove('open');
    });
  }
})();

// ═══════════════════════════════════
// ACTIVE SECTION HIGHLIGHTING
// highlights the current nav link based on scroll position
// ═══════════════════════════════════
(function initActiveNav() {
  var sections = document.querySelectorAll('section[id]');
  var navAnchors = document.querySelectorAll('.nav-links a');
  if (!sections.length || !navAnchors.length) return;

  var observer = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting) {
        var id = entry.target.getAttribute('id');
        navAnchors.forEach(function (a) {
          if (a.getAttribute('href') === '#' + id) {
            a.classList.add('active');
          } else {
            a.classList.remove('active');
          }
        });
      }
    });
  }, { threshold: 0.25, rootMargin: '-80px 0px -40% 0px' });

  sections.forEach(function (s) { observer.observe(s); });
})();

// ═══════════════════════════════════
// SCROLL-TRIGGERED REVEAL ANIMATIONS
// using IntersectionObserver, no animation library
// ═══════════════════════════════════
(function initScrollReveal() {
  var elements = document.querySelectorAll('.reveal');
  if (!elements.length) return;

  var observer = new IntersectionObserver(function (entries) {
    var delayCount = 0;
    entries.forEach(function (entry) {
      if (entry.isIntersecting) {
        // Add dynamic stagger based on how many elements enter at once
        entry.target.style.setProperty('--i', delayCount);
        delayCount++;
        
        requestAnimationFrame(function() {
          entry.target.classList.add('visible');
        });
        observer.unobserve(entry.target);
      }
    });
    // Reset delay count after processing current batch
    setTimeout(function() { delayCount = 0; }, 50);
  }, { threshold: 0.08, rootMargin: '0px 0px -30px 0px' });

  elements.forEach(function (el) { observer.observe(el); });
})();

// ═══════════════════════════════════
// KEYBOARD NAVIGATION
// J / K to scroll sections
// ═══════════════════════════════════
(function initKeyboardNav() {
  var sections = document.querySelectorAll('.section, #hero');
  if (!sections.length) return;

  document.addEventListener('keydown', function(e) {
    if (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA') return;
    
    var key = e.key.toLowerCase();
    if (key === 'j' || key === 'k') {
      var headerOffset = 80;
      var currentIndex = -1;
      
      // Find current section based on scroll
      for (var i = 0; i < sections.length; i++) {
        var rect = sections[i].getBoundingClientRect();
        if (rect.top >= -10 && rect.top <= window.innerHeight / 2) {
          currentIndex = i;
          break;
        } else if (rect.top < -10) {
          currentIndex = i; 
        }
      }
      
      var nextIndex = currentIndex;
      if (key === 'j' && currentIndex < sections.length - 1) {
        nextIndex++;
      } else if (key === 'k' && currentIndex > 0) {
        nextIndex--;
      }
      
      if (nextIndex !== currentIndex && nextIndex >= 0 && nextIndex < sections.length) {
        var elementPosition = sections[nextIndex].getBoundingClientRect().top;
        var offsetPosition = elementPosition + window.pageYOffset - headerOffset;
        window.scrollTo({
          top: offsetPosition,
          behavior: 'smooth'
        });
      }
    }
  });
})();

// ═══════════════════════════════════
// PROJECT CARDS — rendered from content.js
// the whole point of data-driven: add a project object → card appears
// ═══════════════════════════════════
(function initProjects() {
  var grid = document.getElementById('projectsGrid');
  var filterContainer = document.getElementById('projectsFilter');
  if (!grid || !filterContainer || !siteContent) return;

  var projects = siteContent.projects;

  // github svg icon — reused across cards
  var githubIcon = '<svg viewBox="0 0 24 24" fill="currentColor" width="15" height="15"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/></svg>';
  var externalIcon = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" width="15" height="15"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path><polyline points="15 3 21 3 21 9"></polyline><line x1="10" y1="14" x2="21" y2="3"></line></svg>';

  // collect unique tags across all projects — weight backend tags first
  var backendTags = ['SQL', 'SAP B1', 'Backend', 'Oracle', 'API', 'ERP', 'Automation'];
  var allTagsSet = {};
  projects.forEach(function (p) {
    p.tags.forEach(function (t) { allTagsSet[t] = true; });
  });

  // order: backend tags first, then the rest
  var ordered = [];
  backendTags.forEach(function (t) {
    if (allTagsSet[t]) { ordered.push(t); delete allTagsSet[t]; }
  });
  Object.keys(allTagsSet).forEach(function (t) { ordered.push(t); });

  var filterTags = ['All'].concat(ordered);

  // render filter buttons
  filterTags.forEach(function (tag, i) {
    var btn = document.createElement('button');
    btn.className = 'filter-btn' + (i === 0 ? ' active' : '');
    btn.textContent = tag;
    btn.setAttribute('data-tag', tag);
    btn.addEventListener('click', function () {
      filterContainer.querySelectorAll('.filter-btn').forEach(function (b) {
        b.classList.remove('active');
      });
      btn.classList.add('active');
      renderCards(tag);
    });
    filterContainer.appendChild(btn);
  });

  function renderCards(filter) {
    grid.innerHTML = '';
    var count = 0;

    if (filter === 'All') {
      var anchor = document.createElement('div');
      anchor.className = 'project-card layout-anchor span-2-col span-2-row';
      anchor.style.animation = 'hero-enter 0.8s cubic-bezier(0.16, 1, 0.3, 1) forwards';
      anchor.style.animationDelay = (count * 50) + 'ms';
      anchor.style.opacity = '0';
      anchor.innerHTML = '<p class="section-label mono" style="margin-bottom: 24px; color: var(--accent-muted);">// portfolio</p>' +
        '<h2 class="section-title" style="margin-bottom: 24px; font-size: clamp(2rem, 4vw, 3.5rem); line-height: 1.1; letter-spacing: -0.03em;">All Creative Works,<br>Selected projects.</h2>' +
        '<p class="project-description" style="max-width: 320px; font-size: 1.1rem; line-height: 1.6;">A collection of my latest work focusing on backend systems, data pipelines, and intelligent integrations.</p>';
      grid.appendChild(anchor);
      count++;
    }

    projects.forEach(function (project) {
      // filter logic
      if (filter !== 'All' && project.tags.indexOf(filter) === -1) return;

      var card = document.createElement('div');
      var layoutClass = '';
      if (project.layout === 'flagship') layoutClass = ' layout-flagship span-2-col span-2-row';
      else if (project.layout === 'terminal') layoutClass = ' layout-terminal span-2-col';
      else if (project.layout === 'ai') layoutClass = ' layout-ai span-2-row';
      else if (project.layout === 'tall') layoutClass = ' layout-tall span-2-row';
      else if (project.layout === 'wide') layoutClass = ' layout-wide span-2-col';
      else layoutClass = ' layout-square';

      card.className = 'project-card' + layoutClass;
      card.style.animation = 'hero-enter 0.8s cubic-bezier(0.16, 1, 0.3, 1) forwards';
      card.style.animationDelay = (count * 50) + 'ms';
      card.style.opacity = '0';
      count++;

      var linksHTML = '';
      if (project.github || project.live) {
        var linkItems = '';
        if (project.github) {
          linkItems += '<a href="' + project.github + '" class="project-link" target="_blank" rel="noopener">' + githubIcon + ' GitHub</a>';
        }
        if (project.live) {
          linkItems += '<a href="' + project.live + '" class="project-link" target="_blank" rel="noopener">' + externalIcon + ' Live</a>';
        }
        linksHTML = '<div class="project-links">' + linkItems + '</div>';
      }

      var customContent = '';
      if (project.layout === 'flagship') {
        customContent = '<div class="custom-card-content flagship-schema mono">' +
          '// SUPABASE SCHEMA\n' +
          'Table users {\n' +
          '  id uuid PK\n' +
          '  email text\n' +
          '  role varchar\n' +
          '}\n' +
          'Table orders {\n' +
          '  id uuid PK\n' +
          '  user_id uuid FK\n' +
          '  status text\n' +
          '}' +
          '</div>';
      } else if (project.layout === 'terminal') {
        customContent = '<div class="custom-card-content terminal-ui mono">' +
          '<div class="terminal-header"><span class="dot"></span><span class="dot"></span><span class="dot"></span></div>' +
          '<div class="terminal-body">' +
          '> Server starting...\n' +
          '> Loading configurations...\n' +
          '> [Kotlin/Ktor] Ready on port 8080\n' +
          '> [React] Client connected\n' +
          '</div>' +
          '</div>';
      } else if (project.layout === 'ai') {
        customContent = '<div class="custom-card-content ai-payload mono">' +
          '{\n' +
          '  "model": "gemini-1.5-pro",\n' +
          '  "messages": [\n' +
          '    {"role": "user", "content": "..."}\n' +
          '  ],\n' +
          '  "temperature": 0.2\n' +
          '}' +
          '</div>';
      }

      card.innerHTML =
        '<div class="project-header">' +
          '<h3 class="project-title">' + project.title + '</h3>' +
          '<span class="project-status mono">' + project.status + '</span>' +
        '</div>' +
        '<p class="project-description">' + project.description + '</p>' +
        customContent +
        '<div class="project-tags">' +
          project.tags.map(function (t) {
            return '<span class="project-tag mono">' + t + '</span>';
          }).join('') +
        '</div>' +
        linksHTML;

      grid.appendChild(card);
    });
  }

  // initial render — show all
  renderCards('All');
})();

// ═══════════════════════════════════
// COPY EMAIL TO CLIPBOARD
// ═══════════════════════════════════
(function initCopyEmail() {
  var btn = document.getElementById('copyEmailBtn');
  if (!btn) return;

  var email = 'jrdnether@gmail.com';
  var checkIcon = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" width="14" height="14" style="margin-right: 4px; vertical-align: text-bottom;"><polyline points="20 6 9 17 4 12"></polyline></svg>';

  btn.addEventListener('click', function () {
    navigator.clipboard.writeText(email).then(function () {
      btn.innerHTML = checkIcon + 'Copied!';
      btn.style.color = 'var(--text-primary)';
      btn.style.borderColor = 'var(--accent-muted)';
      // reset after 2.5 seconds so the button doesn't stay stuck
      setTimeout(function () {
        btn.textContent = 'Copy';
        btn.style.color = '';
        btn.style.borderColor = '';
      }, 2500);
    }).catch(function () {
      // fallback for older browsers
      var textarea = document.createElement('textarea');
      textarea.value = email;
      textarea.style.position = 'fixed';
      textarea.style.opacity = '0';
      document.body.appendChild(textarea);
      textarea.select();
      document.execCommand('copy');
      document.body.removeChild(textarea);
      btn.innerHTML = checkIcon + 'Copied!';
      btn.style.color = 'var(--text-primary)';
      btn.style.borderColor = 'var(--accent-muted)';
      setTimeout(function () { 
        btn.textContent = 'Copy'; 
        btn.style.color = '';
        btn.style.borderColor = '';
      }, 2500);
    });
  });
})();

// ═══════════════════════════════════
// CONTACT FORM AJAX SUBMIT
// ═══════════════════════════════════
(function initContactForm() {
  var form = document.getElementById('contactForm');
  if (!form) return;

  var checkIcon = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" width="16" height="16"><polyline points="20 6 9 17 4 12"></polyline></svg>';

  form.addEventListener('submit', function (e) {
    e.preventDefault();
    
    var btn = form.querySelector('button[type="submit"]');
    var originalHTML = btn.innerHTML;
    btn.textContent = 'Sending...';
    btn.disabled = true;

    var formData = new FormData(form);

    fetch(form.action, {
      method: 'POST',
      body: formData,
      headers: {
        'Accept': 'application/json'
      }
    })
    .then(function(response) {
      if (response.ok) {
        btn.innerHTML = checkIcon + ' Message Sent';
        btn.classList.add('btn-success');
        form.reset();
      } else {
        btn.textContent = 'Error sending message';
      }
      setTimeout(function() {
        btn.innerHTML = originalHTML;
        btn.classList.remove('btn-success');
        btn.disabled = false;
      }, 3500);
    })
    .catch(function(error) {
      btn.textContent = 'Error sending message';
      setTimeout(function() {
        btn.innerHTML = originalHTML;
        btn.disabled = false;
      }, 3500);
    });
  });
})();

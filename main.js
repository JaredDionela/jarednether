// main.js — all the interactive stuff
// keeping it simple: no libraries, no frameworks, just vanilla JS
// each feature is wrapped in an IIFE so they don't leak globals

// ═══════════════════════════════════
// TYPEWRITER EFFECT
// cycles through the roles array from content.js
// ═══════════════════════════════════
(function initTypewriter() {
  var el = document.getElementById('typewriterText');
  if (!el || !siteContent || !siteContent.hero) return;

  var roles = siteContent.hero.roles;
  var roleIndex = 0;
  var charIndex = 0;
  var isDeleting = false;

  function tick() {
    var current = roles[roleIndex];
    var displayed = current.substring(0, charIndex);

    el.textContent = '> ' + displayed;

    var delay = isDeleting ? 35 : 70;

    if (!isDeleting && charIndex >= current.length) {
      // pause at the end of a word before deleting
      delay = 2200;
      isDeleting = true;
    } else if (isDeleting && charIndex <= 0) {
      // move to next role
      isDeleting = false;
      roleIndex = (roleIndex + 1) % roles.length;
      delay = 400;
    }

    charIndex += isDeleting ? -1 : 1;
    setTimeout(tick, delay);
  }

  // small initial delay so the hero animation finishes first
  setTimeout(tick, 800);
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
    entries.forEach(function (entry) {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.08, rootMargin: '0px 0px -30px 0px' });

  elements.forEach(function (el) { observer.observe(el); });
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

    projects.forEach(function (project) {
      // filter logic
      if (filter !== 'All' && project.tags.indexOf(filter) === -1) return;

      var card = document.createElement('div');
      card.className = 'project-card' + (project.featured ? ' featured' : '');

      var linksHTML = '';
      if (project.github || project.live) {
        var linkItems = '';
        if (project.github) {
          linkItems += '<a href="' + project.github + '" class="project-link" target="_blank" rel="noopener">' + githubIcon + ' GitHub</a>';
          // TODO: Replace # placeholder links with real URLs
        }
        if (project.live) {
          linkItems += '<a href="' + project.live + '" class="project-link" target="_blank" rel="noopener">' + externalIcon + ' Live</a>';
          // TODO: Replace # placeholder links with real URLs
        }
        linksHTML = '<div class="project-links">' + linkItems + '</div>';
      }

      card.innerHTML =
        '<div class="project-header">' +
          '<h3 class="project-title">' + project.title + '</h3>' +
          '<span class="project-status mono">' + project.status + '</span>' +
        '</div>' +
        '<p class="project-description">' + project.description + '</p>' +
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

  var email = 'jrdnther@gmail.com';

  btn.addEventListener('click', function () {
    navigator.clipboard.writeText(email).then(function () {
      btn.textContent = 'Copied!';
      // reset after 2 seconds so the button doesn't stay stuck
      setTimeout(function () {
        btn.textContent = 'Copy';
      }, 2000);
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
      btn.textContent = 'Copied!';
      setTimeout(function () { btn.textContent = 'Copy'; }, 2000);
    });
  });
})();

// ═══════════════════════════════════
// CONTACT FORM — basic Formspree handler
// (Formspree setup: replace YOUR_FORM_ID in index.html
//  with the real endpoint from formspree.io)
// ═══════════════════════════════════
(function initContactForm() {
  var form = document.getElementById('contactForm');
  if (!form) return;

  form.addEventListener('submit', function (e) {
    var action = form.getAttribute('action');
    // don't submit if the formspree ID hasn't been replaced yet
    if (action.indexOf('YOUR_FORM_ID') !== -1) {
      e.preventDefault();
      alert('Contact form not configured yet. Please email me directly at jrdnther@gmail.com');
      return;
    }
    // otherwise let Formspree handle the POST normally
  });
})();


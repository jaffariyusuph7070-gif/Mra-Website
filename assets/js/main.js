/**
 * MRA MANAGEMENT ASSOCIATES — CORE INTERFACE SCRIPT (main.js)
 * Pure Vanilla JavaScript (ES6+) — Zero External Dependencies
 */
(function () {
  'use strict';

  document.documentElement.classList.add('js-enabled');

  document.addEventListener('DOMContentLoaded', function () {
    initHeaderAndMobileMenu();
    initNavDropdown();
    initActiveNavHighlight();
    initScrollReveal();
    initImageFallbacks();
  });

  /**
   * Sticky Header & Accessible Mobile Navigation Drawer
   */
  function initHeaderAndMobileMenu() {
    var header = document.querySelector('.site-header');
    var toggleBtn = document.querySelector('[data-menu-toggle]');
    var drawer = document.querySelector('[data-mobile-drawer]');

    if (header) {
      var onScroll = function () {
        if (window.scrollY > 16) {
          header.classList.add('is-scrolled');
        } else {
          header.classList.remove('is-scrolled');
        }
      };
      window.addEventListener('scroll', onScroll, { passive: true });
      onScroll();
    }

    if (!toggleBtn || !drawer) return;

    var closeMenu = function () {
      toggleBtn.setAttribute('aria-expanded', 'false');
      drawer.classList.remove('is-open');
      drawer.setAttribute('aria-hidden', 'true');
      document.body.style.overflow = '';
    };

    var openMenu = function () {
      toggleBtn.setAttribute('aria-expanded', 'true');
      drawer.classList.add('is-open');
      drawer.setAttribute('aria-hidden', 'false');
      document.body.style.overflow = 'hidden';
    };

    toggleBtn.addEventListener('click', function () {
      var expanded = toggleBtn.getAttribute('aria-expanded') === 'true';
      if (expanded) {
        closeMenu();
      } else {
        openMenu();
      }
    });

    drawer.querySelectorAll('a').forEach(function (link) {
      link.addEventListener('click', function () {
        closeMenu();
      });
    });

    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && drawer.classList.contains('is-open')) {
        closeMenu();
        toggleBtn.focus();
      }
    });

    window.addEventListener('resize', function () {
      if (window.innerWidth > 1024 && drawer.classList.contains('is-open')) {
        closeMenu();
      }
    });
  }

  /**
   * Accessible Navigation Dropdown ("Explore More")
   */
  function initNavDropdown() {
    var dropdowns = document.querySelectorAll('[data-nav-dropdown]');
    dropdowns.forEach(function (dropdown) {
      var trigger = dropdown.querySelector('.nav-dropdown__trigger');
      if (!trigger) return;

      trigger.addEventListener('click', function (e) {
        e.stopPropagation();
        var isOpen = dropdown.classList.toggle('is-open');
        trigger.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
      });

      document.addEventListener('click', function (e) {
        if (!dropdown.contains(e.target)) {
          dropdown.classList.remove('is-open');
          trigger.setAttribute('aria-expanded', 'false');
        }
      });

      dropdown.addEventListener('keydown', function (e) {
        if (e.key === 'Escape') {
          dropdown.classList.remove('is-open');
          trigger.setAttribute('aria-expanded', 'false');
          trigger.focus();
        }
      });
    });
  }

  /**
   * Highlight Current Page in Primary & Mobile Nav
   */
  function initActiveNavHighlight() {
    var path = window.location.pathname.split('/').pop() || 'index.html';
    if (path === '') path = 'index.html';

    var allNavLinks = document.querySelectorAll('.primary-nav a, .mobile-nav-list a');
    allNavLinks.forEach(function (link) {
      var href = link.getAttribute('href');
      if (!href) return;
      var cleanHref = href.split('#')[0].split('?')[0];
      if (cleanHref === path || (path === 'index.html' && cleanHref === './')) {
        link.classList.add('is-active');
        link.setAttribute('aria-current', 'page');
      }
    });
  }

  /**
   * Subtle Section Reveal Animation (Respects prefers-reduced-motion)
   */
  function initScrollReveal() {
    var prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    var revealEls = document.querySelectorAll('.reveal');
    if (prefersReduced || !('IntersectionObserver' in window) || !revealEls.length) {
      revealEls.forEach(function (el) {
        el.classList.remove('is-pending');
      });
      return;
    }

    revealEls.forEach(function (el) {
      var rect = el.getBoundingClientRect();
      if (rect.top > window.innerHeight * 0.92) {
        el.classList.add('is-pending');
      }
    });

    var observer = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.remove('is-pending');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.08, rootMargin: '0px 0px -30px 0px' }
    );

    revealEls.forEach(function (el) {
      observer.observe(el);
    });
  }

  /**
   * Zero-Broken-Image Policy
   */
  function initImageFallbacks() {
    var images = document.querySelectorAll('img');
    images.forEach(function (img) {
      img.addEventListener('error', function () {
        if (img.dataset.fallbackApplied) return;
        img.dataset.fallbackApplied = 'true';
        img.style.backgroundColor = '#0b1f3a';
        img.style.minHeight = '220px';
      });
    });
  }
})();

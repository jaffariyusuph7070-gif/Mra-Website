/**
 * MRA MANAGEMENT ASSOCIATES — GALLERY FILTERING & LIGHTBOX (gallery.js)
 * Pure Vanilla JavaScript — Category Filtering, Keyboard & Touch Lightbox
 */
(function () {
  'use strict';

  document.addEventListener('DOMContentLoaded', function () {
    var filterBar = document.querySelector('[data-gallery-filters]');
    var allItems = Array.prototype.slice.call(document.querySelectorAll('[data-gallery-item]'));
    var lightbox = document.getElementById('mra-lightbox');

    if (!allItems.length) return;

    var currentFilter = 'all';
    var visibleItems = allItems.slice();
    var currentIndex = 0;
    var lastFocusedElement = null;

    // 1. Category Filtering
    function updateGalleryFilter(category) {
      currentFilter = category;
      visibleItems = [];

      allItems.forEach(function (item) {
        var itemCats = (item.getAttribute('data-category') || '').toLowerCase().split(',');
        var match = category === 'all' || itemCats.indexOf(category.toLowerCase()) !== -1;
        if (match) {
          item.style.display = '';
          visibleItems.push(item);
        } else {
          item.style.display = 'none';
        }
      });
    }

    if (filterBar) {
      var filterBtns = filterBar.querySelectorAll('[data-gallery-filter]');
      filterBtns.forEach(function (btn) {
        btn.addEventListener('click', function () {
          var cat = btn.getAttribute('data-gallery-filter') || 'all';
          filterBtns.forEach(function (b) {
            var active = b === btn;
            b.classList.toggle('is-active', active);
            b.setAttribute('aria-pressed', active ? 'true' : 'false');
          });
          updateGalleryFilter(cat);
        });
      });
    }

    // 2. Lightbox Viewer
    if (!lightbox) return;

    var lbImg = lightbox.querySelector('[data-lightbox-img]');
    var lbCaption = lightbox.querySelector('[data-lightbox-caption]');
    var lbCategory = lightbox.querySelector('[data-lightbox-category]');
    var lbCounter = lightbox.querySelector('[data-lightbox-counter]');
    var btnClose = lightbox.querySelector('[data-lightbox-close]');
    var btnPrev = lightbox.querySelector('[data-lightbox-prev]');
    var btnNext = lightbox.querySelector('[data-lightbox-next]');

    function renderLightboxSlide(index) {
      if (!visibleItems.length) return;
      if (index < 0) index = visibleItems.length - 1;
      if (index >= visibleItems.length) index = 0;
      currentIndex = index;

      var item = visibleItems[currentIndex];
      var src = item.getAttribute('data-full-src') || item.querySelector('img').getAttribute('src');
      var caption = item.getAttribute('data-caption') || item.querySelector('img').getAttribute('alt') || '';
      var categoryLabel = item.getAttribute('data-category-label') || 'MRA Engagement';

      if (lbImg) {
        lbImg.setAttribute('src', src);
        lbImg.setAttribute('alt', caption);
      }
      if (lbCaption) lbCaption.textContent = caption;
      if (lbCategory) lbCategory.textContent = categoryLabel;
      if (lbCounter) lbCounter.textContent = (currentIndex + 1) + ' / ' + visibleItems.length;
    }

    function openLightbox(item) {
      var idx = visibleItems.indexOf(item);
      if (idx === -1) idx = 0;
      lastFocusedElement = document.activeElement;
      renderLightboxSlide(idx);
      lightbox.classList.add('is-open');
      lightbox.setAttribute('aria-hidden', 'false');
      document.body.style.overflow = 'hidden';
      if (btnClose) btnClose.focus();
    }

    function closeLightbox() {
      lightbox.classList.remove('is-open');
      lightbox.setAttribute('aria-hidden', 'true');
      document.body.style.overflow = '';
      if (lastFocusedElement && typeof lastFocusedElement.focus === 'function') {
        lastFocusedElement.focus();
      }
    }

    allItems.forEach(function (item) {
      item.addEventListener('click', function () {
        openLightbox(item);
      });
      item.addEventListener('keydown', function (e) {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          openLightbox(item);
        }
      });
    });

    if (btnClose) {
      btnClose.addEventListener('click', closeLightbox);
    }
    if (btnPrev) {
      btnPrev.addEventListener('click', function (e) {
        e.stopPropagation();
        renderLightboxSlide(currentIndex - 1);
      });
    }
    if (btnNext) {
      btnNext.addEventListener('click', function (e) {
        e.stopPropagation();
        renderLightboxSlide(currentIndex + 1);
      });
    }

    lightbox.addEventListener('click', function (e) {
      if (e.target === lightbox) {
        closeLightbox();
      }
    });

    document.addEventListener('keydown', function (e) {
      if (!lightbox.classList.contains('is-open')) return;
      if (e.key === 'Escape') {
        closeLightbox();
      } else if (e.key === 'ArrowLeft') {
        renderLightboxSlide(currentIndex - 1);
      } else if (e.key === 'ArrowRight') {
        renderLightboxSlide(currentIndex + 1);
      }
    });

    // Mobile Touch Swipe Support
    var touchStartX = 0;
    var touchEndX = 0;

    lightbox.addEventListener(
      'touchstart',
      function (e) {
        if (e.changedTouches && e.changedTouches[0]) {
          touchStartX = e.changedTouches[0].screenX;
        }
      },
      { passive: true }
    );

    lightbox.addEventListener(
      'touchend',
      function (e) {
        if (e.changedTouches && e.changedTouches[0]) {
          touchEndX = e.changedTouches[0].screenX;
          var delta = touchEndX - touchStartX;
          if (Math.abs(delta) > 45) {
            if (delta < 0) {
              renderLightboxSlide(currentIndex + 1);
            } else {
              renderLightboxSlide(currentIndex - 1);
            }
          }
        }
      },
      { passive: true }
    );
  });
})();

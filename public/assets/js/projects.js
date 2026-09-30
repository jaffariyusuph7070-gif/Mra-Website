/**
 * MRA MANAGEMENT ASSOCIATES — PROJECT PORTFOLIO FILTERING (projects.js)
 * Pure Vanilla JavaScript — Instant Client-Side Filtering & Search
 */
(function () {
  'use strict';

  document.addEventListener('DOMContentLoaded', function () {
    var filterBar = document.querySelector('[data-project-filters]');
    var projectCards = Array.prototype.slice.call(document.querySelectorAll('[data-project-card]'));
    var searchInput = document.querySelector('[data-project-search]');
    var countLabel = document.querySelector('[data-project-count]');
    var emptyState = document.querySelector('[data-project-empty]');
    var resetBtn = document.querySelector('[data-project-reset]');

    if (!projectCards.length) return;

    var activeCategory = 'all';
    var searchQuery = '';

    function applyFilters() {
      var visibleCount = 0;
      var totalCount = projectCards.length;

      projectCards.forEach(function (card) {
        var categories = (card.getAttribute('data-categories') || '').toLowerCase().split(',');
        var textContent = (card.textContent || '').toLowerCase();

        var matchesCategory =
          activeCategory === 'all' ||
          categories.indexOf(activeCategory.toLowerCase()) !== -1;

        var matchesSearch =
          !searchQuery || textContent.indexOf(searchQuery.toLowerCase()) !== -1;

        if (matchesCategory && matchesSearch) {
          card.style.display = '';
          visibleCount++;
        } else {
          card.style.display = 'none';
        }
      });

      if (countLabel) {
        countLabel.textContent = 'Showing ' + visibleCount + ' of ' + totalCount + ' documented assignments';
      }

      if (emptyState) {
        emptyState.style.display = visibleCount === 0 ? 'block' : 'none';
      }
    }

    if (filterBar) {
      var buttons = filterBar.querySelectorAll('[data-filter]');
      buttons.forEach(function (btn) {
        btn.addEventListener('click', function () {
          activeCategory = btn.getAttribute('data-filter') || 'all';
          buttons.forEach(function (b) {
            var isSelected = b === btn;
            b.classList.toggle('is-active', isSelected);
            b.setAttribute('aria-pressed', isSelected ? 'true' : 'false');
          });
          applyFilters();
        });
      });
    }

    if (searchInput) {
      searchInput.addEventListener('input', function (e) {
        searchQuery = (e.target.value || '').trim();
        applyFilters();
      });
    }

    if (resetBtn) {
      resetBtn.addEventListener('click', function () {
        activeCategory = 'all';
        searchQuery = '';
        if (searchInput) searchInput.value = '';
        if (filterBar) {
          var buttons = filterBar.querySelectorAll('[data-filter]');
          buttons.forEach(function (b) {
            var isAll = b.getAttribute('data-filter') === 'all';
            b.classList.toggle('is-active', isAll);
            b.setAttribute('aria-pressed', isAll ? 'true' : 'false');
          });
        }
        applyFilters();
      });
    }

    applyFilters();
  });
})();

/**
 * MRA MANAGEMENT ASSOCIATES — FORM VALIDATION & TAB CONTROLLER (forms.js)
 * Pure Vanilla JavaScript — Shared-Hosting & PHP-Integration Ready
 */
(function () {
  'use strict';

  document.addEventListener('DOMContentLoaded', function () {
    initFormTabs();
    initValidatedForms();
  });

  /**
   * Switch between Consultation, Proposal, and General Enquiry Tabs
   */
  function initFormTabs() {
    var tabButtons = document.querySelectorAll('[data-form-tab]');
    var tabPanels = document.querySelectorAll('[data-form-panel]');

    if (!tabButtons.length || !tabPanels.length) return;

    function activateTab(tabName) {
      tabButtons.forEach(function (btn) {
        var isTarget = btn.getAttribute('data-form-tab') === tabName;
        btn.classList.toggle('is-active', isTarget);
        btn.setAttribute('aria-selected', isTarget ? 'true' : 'false');
      });

      tabPanels.forEach(function (panel) {
        var isTarget = panel.getAttribute('data-form-panel') === tabName;
        panel.classList.toggle('is-active', isTarget);
        panel.hidden = !isTarget;
      });
    }

    tabButtons.forEach(function (btn) {
      btn.addEventListener('click', function () {
        var target = btn.getAttribute('data-form-tab');
        if (target) activateTab(target);
      });
    });

    // External trigger links on the same page
    document.querySelectorAll('[data-open-form-tab]').forEach(function (trigger) {
      trigger.addEventListener('click', function (e) {
        var target = trigger.getAttribute('data-open-form-tab');
        if (target) {
          activateTab(target);
          var formSection = document.getElementById('enquiry-forms');
          if (formSection) {
            e.preventDefault();
            formSection.scrollIntoView({ behavior: 'smooth' });
          }
        }
      });
    });

    // Check URL query or hash on load
    var params = new URLSearchParams(window.location.search);
    var requestedTab = params.get('tab') || params.get('form');
    var hash = window.location.hash.replace('#', '');

    if (requestedTab === 'proposal' || hash === 'proposal-form') {
      activateTab('proposal');
    } else if (requestedTab === 'general' || hash === 'general-form') {
      activateTab('general');
    } else if (requestedTab === 'consultation' || hash === 'consultation-form') {
      activateTab('consultation');
    }
  }

  /**
   * Client-Side Validation & Static/PHP Submission Handler
   */
  function initValidatedForms() {
    var forms = document.querySelectorAll('[data-mra-form]');
    var emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    var phoneRegex = /^[+\d\s\-()]{7,22}$/;

    forms.forEach(function (form) {
      var inputs = form.querySelectorAll('input, select, textarea');

      inputs.forEach(function (input) {
        input.addEventListener('input', function () {
          clearFieldError(input);
        });
        input.addEventListener('change', function () {
          clearFieldError(input);
        });
      });

      form.addEventListener('submit', function (e) {
        e.preventDefault();
        var isValid = true;
        var firstInvalid = null;

        var requiredFields = form.querySelectorAll('[required]');
        requiredFields.forEach(function (field) {
          var value = (field.value || '').trim();
          var type = field.getAttribute('type') || '';
          var errorMsg = '';

          if (!value) {
            errorMsg = 'This field is required.';
          } else if (type === 'email' && !emailRegex.test(value)) {
            errorMsg = 'Please enter a valid email address.';
          } else if (type === 'tel' && !phoneRegex.test(value)) {
            errorMsg = 'Please enter a valid telephone or mobile number.';
          }

          if (errorMsg) {
            isValid = false;
            setFieldError(field, errorMsg);
            if (!firstInvalid) firstInvalid = field;
          } else {
            clearFieldError(field);
          }
        });

        var feedbackBox = form.querySelector('.form-feedback');

        if (!isValid) {
          if (feedbackBox) {
            feedbackBox.className = 'form-feedback is-error';
            feedbackBox.textContent = 'Please review the highlighted fields and complete all required information.';
          }
          if (firstInvalid) firstInvalid.focus();
          return;
        }

        // Build structured summary for static shared hosting + mailto fallback
        var formType = form.getAttribute('data-mra-form') || 'Enquiry';
        var formData = new FormData(form);
        var org = formData.get('organization') || 'Individual / Unspecified';
        var fullName = formData.get('full_name') || '';
        var email = formData.get('email') || '';
        var phone = formData.get('phone') || '';
        var subjectTitle =
          formData.get('assignment_title') ||
          formData.get('area_of_interest') ||
          formData.get('subject') ||
          'Consulting Enquiry';

        var attachmentInput = form.querySelector('input[type="file"]');
        var hasFileSelected = attachmentInput && attachmentInput.files && attachmentInput.files.length > 0;
        var fileNotice = hasFileSelected
          ? ' Note: Since this website is running in static mode without a server-side mail script configured yet, please attach "' +
            attachmentInput.files[0].name +
            '" directly when sending via email to charles@mra.co.tz.'
          : '';

        var mailSubject = encodeURIComponent('[MRA Website ' + formType + '] ' + subjectTitle + ' — ' + org);
        var bodyLines = [];
        formData.forEach(function (val, key) {
          if (key !== 'attachment' && val) {
            bodyLines.push(key.replace(/_/g, ' ').toUpperCase() + ': ' + val);
          }
        });
        var mailBody = encodeURIComponent(bodyLines.join('\n'));

        if (feedbackBox) {
          feedbackBox.className = 'form-feedback is-success';
          feedbackBox.innerHTML =
            '<strong>Thank you, ' +
            escapeHtml(String(fullName)) +
            '. Your ' +
            escapeHtml(formType) +
            ' details have been validated.</strong><br>' +
            'Our Executive Director and consulting desk in Dodoma can receive your brief directly via email or WhatsApp below.' +
            escapeHtml(fileNotice) +
            '<div style="margin-top:0.85rem;display:flex;flex-wrap:wrap;gap:0.75rem;">' +
            '<a class="btn btn--primary" href="mailto:charles@mra.co.tz?cc=oneyac@yahoo.co.uk&subject=' +
            mailSubject +
            '&body=' +
            mailBody +
            '">Send via Email Client (charles@mra.co.tz)</a>' +
            '<a class="btn btn--whatsapp" href="https://wa.me/255753786966?text=' +
            mailBody +
            '" target="_blank" rel="noopener noreferrer">Send via WhatsApp (+255 753 786966)</a>' +
            '</div>';
        }
      });
    });
  }

  function setFieldError(field, message) {
    field.classList.add('is-invalid');
    field.setAttribute('aria-invalid', 'true');
    var group = field.closest('.form-group');
    if (group) {
      group.classList.add('has-error');
      var errEl = group.querySelector('.form-error');
      if (errEl) errEl.textContent = message;
    }
  }

  function clearFieldError(field) {
    field.classList.remove('is-invalid');
    field.removeAttribute('aria-invalid');
    var group = field.closest('.form-group');
    if (group) {
      group.classList.remove('has-error');
      var errEl = group.querySelector('.form-error');
      if (errEl) errEl.textContent = '';
    }
  }

  function escapeHtml(str) {
    return str
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#039;');
  }
})();

// js/form.js — Form validation, submission via fetch() no-cors, success state.
// Phase 3 implementation.

(function () {
  'use strict';

  // ── DOM references ──────────────────────────────────────────────────────────
  var form         = document.getElementById('lead-form');
  var fieldName    = document.getElementById('field-name');
  var fieldPhone   = document.getElementById('field-phone');
  var fieldConsent = document.getElementById('field-consent');

  // ── Constants ───────────────────────────────────────────────────────────────
  var VN_PHONE_RE    = /^(0[35789])\d{8}$/;
  var PLACEHOLDER_URL = 'https://script.google.com/placeholder';

  // ── Error display helpers (D-14) ─────────────────────────────────────────────

  function showError(field, message) {
    removeError(field); // clear any prior error first
    var span = document.createElement('span');
    span.className = 'lead-form__error';
    span.setAttribute('role', 'alert');
    span.textContent = message;
    field.closest('.lead-form__group').appendChild(span);
    field.classList.add('lead-form__input--invalid');
    field.setAttribute('aria-invalid', 'true');
  }

  function removeError(field) {
    var group = field.closest('.lead-form__group');
    var existing = group.querySelector('.lead-form__error');
    if (existing) {
      existing.parentNode.removeChild(existing);
    }
    field.classList.remove('lead-form__input--invalid');
    field.removeAttribute('aria-invalid');
  }

  // ── Field validators (D-14) ──────────────────────────────────────────────────

  function validateName(field) {
    if (field.value.trim().length < 2) {
      showError(field, 'Vui lòng nhập họ tên (ít nhất 2 ký tự)');
      return false;
    }
    removeError(field);
    return true;
  }

  function validatePhone(field) {
    if (!VN_PHONE_RE.test(field.value.trim())) {
      showError(field, 'Số điện thoại không hợp lệ (VD: 0912345678)');
      return false;
    }
    removeError(field);
    return true;
  }

  function validateConsent(field) {
    if (!field.checked) {
      showError(field, 'Vui lòng đồng ý điều khoản để tiếp tục');
      return false;
    }
    removeError(field);
    return true;
  }

  // ── Blur validation with touched tracking (Pitfall 7) ───────────────────────
  // Guard: only validate after user has interacted with the field (dataset.touched).

  fieldName.addEventListener('input', function (e) {
    e.target.dataset.touched = 'true';
  });

  fieldPhone.addEventListener('input', function (e) {
    e.target.dataset.touched = 'true';
  });

  fieldName.addEventListener('blur', function () {
    if (fieldName.dataset.touched === 'true') {
      validateName(fieldName);
    }
  });

  fieldPhone.addEventListener('blur', function () {
    if (fieldPhone.dataset.touched === 'true') {
      validatePhone(fieldPhone);
    }
  });

  fieldConsent.addEventListener('change', function () {
    validateConsent(fieldConsent);
  });

  // ── Full validation on submit (D-15) ─────────────────────────────────────────
  // Call all 3 validators before checking results — no short-circuit, show all errors at once.

  function validateAll() {
    var results = [
      validateName(fieldName),
      validatePhone(fieldPhone),
      validateConsent(fieldConsent),
    ];
    return results.every(Boolean);
  }

  // ── Scroll to first error (D-15) ─────────────────────────────────────────────

  function scrollToFirstError() {
    var firstError = form.querySelector('.lead-form__error');
    if (firstError) {
      firstError.closest('.lead-form__group').scrollIntoView({
        behavior: 'smooth',
        block: 'center',
      });
    }
  }

  // ── Success state (D-17, FORM-08) ───────────────────────────────────────────

  function showSuccessState() {
    form.hidden = true;
    var msg = document.createElement('div');
    msg.className = 'lead-form__success';
    msg.setAttribute('role', 'status');
    msg.innerHTML = '<p class="lead-form__success-heading">Cảm ơn!</p>' +
      '<p class="lead-form__success-text">Chúng tôi sẽ liên hệ trong 24h</p>';
    form.parentElement.appendChild(msg);
  }

  // ── Submit handler (D-16, D-17) ──────────────────────────────────────────────

  form.addEventListener('submit', function (e) {
    e.preventDefault();

    if (!validateAll()) {
      scrollToFirstError();
      return;
    }

    // Log form data for Phase 3 debugging (D-16)
    var data = new FormData(form);
    console.log('Form data:', Object.fromEntries(data));

    // Fire-and-forget fetch — do NOT await (D-17, FORM-09)
    fetch(PLACEHOLDER_URL, {
      method: 'POST',
      mode: 'no-cors',
      body: data,
    }).catch(function () {}); // swallow opaque response errors (Pitfall 4)

    // Show success immediately — optimistic UI (D-17, FORM-08)
    showSuccessState();
  });

}());

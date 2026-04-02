// js/calculator.js — Loan amortization calculator. Live input events.
// Phase 3 implementation.

(function () {
  'use strict';

  // ── DOM references ──────────────────────────────────────────────────────────
  var calcPropertyValue = document.getElementById('calc-property-value');
  var calcLtv           = document.getElementById('calc-ltv');
  var calcTerm          = document.getElementById('calc-term');
  var calcRate          = document.getElementById('calc-rate');
  var calcResult        = document.getElementById('calc-result');
  var calcResultValue   = document.getElementById('calc-result-value');
  var loanAmountField   = document.getElementById('field-loan-amount');

  // ── VND formatter (D-07) ─────────────────────────────────────────────────────
  var vndFormatter = new Intl.NumberFormat('vi-VN', {
    style: 'currency',
    currency: 'VND',
    maximumFractionDigits: 0,
  });

  // ── Hide result on init — avoids showing "—" before any input (Pitfall 8) ───
  calcResult.hidden = true;

  // ── Safe input value extraction ──────────────────────────────────────────────
  // Uses parseFloat (not Number()) because Number('') returns 0 — false positive.
  function getPositiveFloat(input) {
    var val = parseFloat(input.value);
    return isFinite(val) && val > 0 ? val : null;
  }

  // ── Amortization formula (D-06) ──────────────────────────────────────────────
  function calculateMonthly(propertyValue, ltv, termYears, annualRate) {
    var P = propertyValue * (ltv / 100);
    var r = (annualRate / 100) / 12;
    var n = termYears * 12;
    if (r === 0) return P / n; // zero-rate edge case (Pitfall 3)
    return P * (r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1);
  }

  // ── Input event handler ──────────────────────────────────────────────────────
  function handleCalcInput() {
    var propVal = getPositiveFloat(calcPropertyValue);
    var ltv     = getPositiveFloat(calcLtv);
    var term    = getPositiveFloat(calcTerm);
    var rate    = getPositiveFloat(calcRate);

    // All four must be valid positive numbers (D-09)
    var allValid = [propVal, ltv, term, rate].every(function (v) {
      return v !== null;
    });

    if (!allValid) {
      calcResult.hidden = true;
      return;
    }

    var monthly = calculateMonthly(propVal, ltv, term, rate);
    var P = propVal * (ltv / 100);

    // Display VND-formatted monthly payment (D-07)
    calcResultValue.textContent = vndFormatter.format(Math.round(monthly));
    calcResult.hidden = false;

    // Auto-fill loan amount field with raw number — no formatting (D-08)
    if (loanAmountField) {
      loanAmountField.value = Math.round(P);
    }
  }

  // ── Attach listeners to all 4 calc inputs ───────────────────────────────────
  [calcPropertyValue, calcLtv, calcTerm, calcRate].forEach(function (input) {
    input.addEventListener('input', handleCalcInput);
  });

}());

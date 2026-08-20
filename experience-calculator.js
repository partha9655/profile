/* =========================================================
   Dynamic Experience Calculator
   Computes years/months of experience from a fixed join date
   and keeps every marked element on the page in sync,
   updating automatically as time passes (no manual edits).
   ========================================================= */
(function () {
  // 🔧 Set your actual joining date here (month is 0-indexed: 10 = November)
  const JOIN_DATE = new Date(2022, 10, 1); // Nov 1, 2022

  function calculateExperience(start, end = new Date()) {
    let years = end.getFullYear() - start.getFullYear();
    let months = end.getMonth() - start.getMonth();

    // Adjust if we haven't hit the day-of-month anniversary yet
    if (end.getDate() < start.getDate()) {
      months--;
    }
    if (months < 0) {
      years--;
      months += 12;
    }
    return { years, months };
  }

  function updateExperienceDisplays() {
    const { years, months } = calculateExperience(JOIN_DATE);

    // Round up to "X+ years" once you're partway into a new year,
    // matching the "3+ years" style already used on the site.
    const displayYears = years < 1 ? 0 : years;

    document.querySelectorAll('[data-experience]').forEach((el) => {
      const mode = el.dataset.experience;

      switch (mode) {
        case 'years-plus':
          el.textContent = `${displayYears}+ years`;
          break;

        case 'years-plus-str':
          // Same as above, but quoted (for the JSON terminal block)
          el.textContent = `"${displayYears}+ years"`;
          break;

        case 'years-number':
          el.textContent = displayYears;
          break;

        case 'years-months-full':
          // e.g. "3 years, 9 months"
          el.textContent =
            `${years} year${years !== 1 ? 's' : ''}` +
            (months > 0 ? `, ${months} month${months !== 1 ? 's' : ''}` : '');
          break;

        default:
          break;
      }
    });
  }

  // Run once on load
  document.addEventListener('DOMContentLoaded', updateExperienceDisplays);

  // Re-check once a day in case the tab is left open across a month/year boundary
  setInterval(updateExperienceDisplays, 24 * 60 * 60 * 1000);
})();
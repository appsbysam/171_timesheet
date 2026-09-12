/* v3.9.8 — persist "Did not work" and refresh completed-row state immediately. */
(function () {
  const DID_NOT_WORK = "DID_NOT_WORK";
  let hooksInstalled = false;

  function isTimesheetSelect(select) {
    return select instanceof HTMLSelectElement &&
      (select.classList.contains("start") ||
       select.classList.contains("finish") ||
       select.classList.contains("split-start") ||
       select.classList.contains("split-finish"));
  }

  function addOption(select) {
    if (!isTimesheetSelect(select)) return;
    if ([...select.options].some((option) => option.value === DID_NOT_WORK)) return;

    const option = document.createElement("option");
    option.value = DID_NOT_WORK;
    option.textContent = "Did not work";

    const first = select.options[0];
    if (first && first.nextSibling) {
      select.insertBefore(option, first.nextSibling);
    } else {
      select.appendChild(option);
    }
  }

  function refreshRowState(row) {
    if (typeof window.calculateRow === "function") {
      window.calculateRow(row);
    }

    if (typeof window.calculateTotals === "function") {
      window.calculateTotals();
    }
  }

  function installCoreHooks() {
    if (hooksInstalled) return true;

    if (
      typeof window.populateSelect !== "function" ||
      typeof window.updateFinishOptions !== "function" ||
      typeof window.calculateShiftMinutes !== "function"
    ) {
      return false;
    }

    hooksInstalled = true;

    const originalPopulateSelect = window.populateSelect;
    window.populateSelect = function (select, options) {
      originalPopulateSelect(select, options);
      addOption(select);
    };

    const originalUpdateFinishOptions = window.updateFinishOptions;
    window.updateFinishOptions = function (
      startSelect,
      finishSelect,
      day,
      preferredValue = finishSelect.value
    ) {
      originalUpdateFinishOptions(
        startSelect,
        finishSelect,
        day,
        preferredValue
      );

      addOption(finishSelect);

      if (preferredValue === DID_NOT_WORK) {
        finishSelect.value = DID_NOT_WORK;
      }
    };

    const originalCalculateShiftMinutes = window.calculateShiftMinutes;
    window.calculateShiftMinutes = function (startSelect, finishSelect) {
      const startDidNotWork = startSelect.value === DID_NOT_WORK;
      const finishDidNotWork = finishSelect.value === DID_NOT_WORK;

      if (startDidNotWork && finishDidNotWork) {
        startSelect.classList.remove("invalid");
        finishSelect.classList.remove("invalid");
        return { minutes: 0, complete: true, valid: true };
      }

      if (startDidNotWork || finishDidNotWork) {
        return { minutes: 0, complete: false, valid: true };
      }

      return originalCalculateShiftMinutes(startSelect, finishSelect);
    };

    document.querySelectorAll(".shift-row select").forEach(addOption);
    return true;
  }

  if (!installCoreHooks()) {
    const hookTimer = window.setInterval(() => {
      if (installCoreHooks()) {
        window.clearInterval(hookTimer);
      }
    }, 5);

    window.setTimeout(() => {
      window.clearInterval(hookTimer);
      installCoreHooks();
    }, 5000);
  }

  function getPair(select, row) {
    if (select.classList.contains("start")) return row.querySelector(".finish");
    if (select.classList.contains("finish")) return row.querySelector(".start");
    if (select.classList.contains("split-start")) return row.querySelector(".split-finish");
    if (select.classList.contains("split-finish")) return row.querySelector(".split-start");
    return null;
  }

  document.addEventListener("change", (event) => {
    const select = event.target;
    if (!isTimesheetSelect(select)) return;

    const row = select.closest(".shift-row");
    if (!row) return;

    const pair = getPair(select, row);
    if (!pair) return;

    const selectedDidNotWork = select.value === DID_NOT_WORK;
    const pairWasDidNotWork = pair.value === DID_NOT_WORK;

    window.setTimeout(() => {
      addOption(select);
      addOption(pair);

      if (selectedDidNotWork) {
        pair.value = DID_NOT_WORK;
      } else if (pairWasDidNotWork) {
        pair.value = "";
      }

      refreshRowState(row);
    }, 0);
  }, true);

  const observer = new MutationObserver((mutations) => {
    for (const mutation of mutations) {
      mutation.addedNodes.forEach((node) => {
        if (!(node instanceof Element)) return;
        if (isTimesheetSelect(node)) addOption(node);
        node.querySelectorAll?.(".shift-row select").forEach(addOption);
      });
    }
  });

  if (document.body) {
    observer.observe(document.body, { childList: true, subtree: true });
  } else {
    document.addEventListener("DOMContentLoaded", () => {
      observer.observe(document.body, { childList: true, subtree: true });
      document.querySelectorAll(".shift-row select").forEach(addOption);
    }, { once: true });
  }
})();
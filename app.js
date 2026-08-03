const SUPABASE_URL =
  window.APP_CONFIG.supabaseUrl;

const SUPABASE_PUBLISHABLE_KEY =
  window.APP_CONFIG.supabaseKey;

/*
  Leave this set to false for automatic operation.

  false:
  - Local file / localhost uses local browser storage.
  - GitHub Pages / live website uses Supabase.

  true:
  - Always use local browser storage.
*/
const FORCE_LOCAL_MODE = false;

const LOCAL_MODE =
  FORCE_LOCAL_MODE ||
  window.location.protocol === "file:" ||
  window.location.hostname === "localhost" ||
  window.location.hostname === "127.0.0.1";

const db = LOCAL_MODE
  ? null
  : window.supabase.createClient(
      SUPABASE_URL,
      SUPABASE_PUBLISHABLE_KEY
    );

const days = [
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday"
];

const DEFAULT_LOCAL_STAFF = [
  {
    id: "local-mikayla",
    name: "Mikayla",
    active: true,
    display_order: 1
  },
  {
    id: "local-monique",
    name: "Monique",
    active: true,
    display_order: 2
  }
];

const timesheet =
  document.getElementById("timesheet");

const dayTemplate =
  document.getElementById("dayTemplate");

const employeeRowTemplate =
  document.getElementById("employeeRowTemplate");

const employeeTotalTemplate =
  document.getElementById("employeeTotalTemplate");

const employeeTotals =
  document.getElementById("employeeTotals");

const weekStart =
  document.getElementById("weekStart");

const weekEnd =
  document.getElementById("weekEnd");

const goToCurrentWeekBtn =
  document.getElementById("goToCurrentWeekBtn");

const statusEl =
  document.getElementById("status");

const statusIndicator =
  document.getElementById("statusIndicator");

const saveBtn =
  document.getElementById("saveBtn");

const resetBtn =
  document.getElementById("resetBtn");

const manageStaffBtn =
  document.getElementById("manageStaffBtn");

const staffModal =
  document.getElementById("staffModal");

const closeStaffModalBtn =
  document.getElementById("closeStaffModalBtn");

const addStaffForm =
  document.getElementById("addStaffForm");

const newStaffName =
  document.getElementById("newStaffName");

const activeStaffList =
  document.getElementById("activeStaffList");

const inactiveStaffList =
  document.getElementById("inactiveStaffList");

const inactiveStaffCount =
  document.getElementById("inactiveStaffCount");

const staffManagerMessage =
  document.getElementById("staffManagerMessage");

const staffOperationStatus =
  document.getElementById("staffOperationStatus");

const staffOperationStatusText =
  document.getElementById("staffOperationStatusText");

const staffToastRegion =
  document.getElementById("staffToastRegion");

const versionHistoryModal =
  document.getElementById("versionHistoryModal");

const versionHistoryCurrent =
  document.getElementById("versionHistoryCurrent");

const versionHistoryList =
  document.getElementById("versionHistoryList");

const closeVersionHistoryBtn =
  document.getElementById("closeVersionHistoryBtn");

const managerCard =
  document.getElementById("managerCard");

const managerMenuModal =
  document.getElementById("managerMenuModal");

const closeManagerMenuBtn =
  document.getElementById("closeManagerMenuBtn");

const managerMenuStaffBtn =
  document.getElementById("managerMenuStaffBtn");

const managerMenuClearBtn =
  document.getElementById("managerMenuClearBtn");

const managerMenuCopyPreviousBtn =
  document.getElementById("managerMenuCopyPreviousBtn");

const managerMenuGenerateRosterBtn =
  document.getElementById("managerMenuGenerateRosterBtn");

const rosterModal =
  document.getElementById("rosterModal");

const rosterPreview =
  document.getElementById("rosterPreview");

const rosterMessage =
  document.getElementById("rosterMessage");

const copyRosterBtn =
  document.getElementById("copyRosterBtn");

const shareRosterBtn =
  document.getElementById("shareRosterBtn");

const closeRosterBtn =
  document.getElementById("closeRosterBtn");

const closeRosterActionBtn =
  document.getElementById("closeRosterActionBtn");

const managerMenuSignOutBtn =
  document.getElementById("managerMenuSignOutBtn");

const managerLoginModal =
  document.getElementById("managerLoginModal");

const closeManagerLoginBtn =
  document.getElementById("closeManagerLoginBtn");

const managerLoginForm =
  document.getElementById("managerLoginForm");

const managerLoginEmail =
  document.getElementById("managerLoginEmail");

const managerLoginPassword =
  document.getElementById("managerLoginPassword");

const managerLoginSubmitBtn =
  document.getElementById("managerLoginSubmitBtn");

const managerLoginMessage =
  document.getElementById("managerLoginMessage");

const managerSignOutBtn =
  document.getElementById("managerSignOutBtn");

const appUpdateModal =
  document.getElementById("appUpdateModal");

const appUpdateMessage =
  document.getElementById("appUpdateMessage");

const appUpdateUnsavedMessage =
  document.getElementById("appUpdateUnsavedMessage");

const appUpdateNowBtn =
  document.getElementById("appUpdateNowBtn");

let staffMembers = [];
let saveTimer = null;
let isLoading = false;
let managerSignedIn = false;

function showConfirmDialog({title="Warning",message,detail="",confirmText="Confirm",cancelText="Cancel"}) {
  return new Promise((resolve) => {
    const modal=document.createElement("div");
    modal.className="app-confirm-modal";
    modal.innerHTML=`<div class="app-confirm-backdrop"></div><section class="app-confirm-dialog" role="dialog" aria-modal="true" aria-labelledby="appConfirmTitle"><div class="app-confirm-heading"><span class="app-confirm-icon" aria-hidden="true">!</span><h2 id="appConfirmTitle" class="app-confirm-title"></h2></div><p class="app-confirm-message"></p><p class="app-confirm-detail"></p><div class="app-confirm-actions"><button type="button" class="app-confirm-cancel"></button><button type="button" class="app-confirm-accept"></button></div></section>`;
    modal.querySelector(".app-confirm-title").textContent=title;
    modal.querySelector(".app-confirm-message").textContent=message;
    const detailEl=modal.querySelector(".app-confirm-detail"); detailEl.textContent=detail; detailEl.hidden=!detail;
    const cancelBtn=modal.querySelector(".app-confirm-cancel"); cancelBtn.textContent=cancelText;
    const confirmBtn=modal.querySelector(".app-confirm-accept"); confirmBtn.textContent=confirmText;
    const oldOverflow=document.body.style.overflow; document.body.style.overflow="hidden"; document.body.appendChild(modal);
    const close=(result)=>{document.body.style.overflow=oldOverflow;document.removeEventListener("keydown",onKey);modal.remove();resolve(result)};
    const onKey=(e)=>{if(e.key==="Escape")close(false)};
    cancelBtn.addEventListener("click",()=>close(false));
    confirmBtn.addEventListener("click",()=>close(true));
    modal.querySelector(".app-confirm-backdrop").addEventListener("click",()=>close(false));
    document.addEventListener("keydown",onKey); confirmBtn.focus();
  });
}

let pendingAppUpdate = null;

function hasUnsavedTimesheetChanges() {
  return Boolean(
    saveBtn &&
    (
      saveBtn.classList.contains("is-ready") ||
      saveBtn.classList.contains("is-error") ||
      saveTimer
    )
  );
}

function reloadForAppUpdate() {
  if (!pendingAppUpdate) {
    return;
  }

  localStorage.setItem(
    pendingAppUpdate.versionStorageKey,
    pendingAppUpdate.deployedVersion
  );

  const url =
    new URL(window.location.href);

  url.searchParams.set(
    "app-version",
    pendingAppUpdate.deployedVersion
  );

  url.searchParams.set(
    "hard-refresh",
    Date.now()
  );

  window.location.replace(
    url.toString()
  );
}

window.showAppUpdatePrompt = function ({
  deployedVersion,
  versionStorageKey
}) {
  if (
    !appUpdateModal ||
    !deployedVersion
  ) {
    return;
  }

  pendingAppUpdate = {
    deployedVersion,
    versionStorageKey
  };

  const hasUnsaved =
    hasUnsavedTimesheetChanges();

  appUpdateMessage.textContent =
    "A new version of Staff Timesheet is available. Click OK to update now.";

  appUpdateUnsavedMessage.hidden =
    !hasUnsaved;

  if (hasUnsaved) {
    appUpdateUnsavedMessage.textContent =
      "Your unsaved changes will be saved before the update.";
  }

  appUpdateNowBtn.textContent =
    "OK";

  appUpdateModal.hidden = false;
  document.body.classList.add(
    "app-update-modal-open"
  );

  appUpdateNowBtn.focus();
};

let staffOperationBusy = false;
let staffStatusResetTimer = null;
let staffToastTimer = null;
let pendingManagerAction = null;

/* =====================================================
   LOCAL STORAGE KEYS
   ===================================================== */

function timesheetStorageKey(week) {
  return `171-cafe-timesheet-${week}`;
}

function staffStorageKey() {
  return "171-cafe-staff-members";
}

/* =====================================================
   TIMESHEET STORAGE
   ===================================================== */


function sortStaffMembers(staff) {
  return [...staff].sort((a, b) => {
    const orderA = Number(a.display_order ?? 999);
    const orderB = Number(b.display_order ?? 999);

    if (orderA !== orderB) {
      return orderA - orderB;
    }

    return String(a.name).localeCompare(String(b.name));
  });
}

const TimesheetStorage = {
  async save(week, rows) {
    const activeNames = new Set(staffMembers.map((member) => member.name));

    if (LOCAL_MODE) {
      let existingRows = [];
      const saved = localStorage.getItem(timesheetStorageKey(week));

      if (saved) {
        try {
          const parsed = JSON.parse(saved);
          existingRows = Array.isArray(parsed) ? parsed : [];
        } catch {
          existingRows = [];
        }
      }

      const inactiveRows = existingRows.filter(
        (row) => !activeNames.has(row.employee)
      );

      localStorage.setItem(
        timesheetStorageKey(week),
        JSON.stringify([...inactiveRows, ...rows])
      );

      return;
    }

    const { data: existingRows, error: loadError } = await db
      .from("timesheets")
      .select("*")
      .eq("week_start", week);

    if (loadError) {
      throw loadError;
    }

    const inactiveRows = (existingRows || [])
      .filter((row) => !activeNames.has(row.employee))
      .map(({ id, created_at, ...row }) => row);

    const { error: deleteError } = await db
      .from("timesheets")
      .delete()
      .eq("week_start", week);

    if (deleteError) {
      throw deleteError;
    }

    const rowsToInsert = [...inactiveRows, ...rows];

    if (!rowsToInsert.length) {
      return;
    }

    const { error: insertError } = await db
      .from("timesheets")
      .insert(rowsToInsert);

    if (insertError) {
      throw insertError;
    }
  },

  async load(week) {
    if (LOCAL_MODE) {
      const saved =
        localStorage.getItem(
          timesheetStorageKey(week)
        );

      if (!saved) {
        return [];
      }

      try {
        const parsed = JSON.parse(saved);

        return Array.isArray(parsed)
          ? parsed
          : [];
      } catch (error) {
        console.error(
          "Unable to read local timesheet:",
          error
        );

        return [];
      }
    }

    const { data, error } = await db
      .from("timesheets")
      .select("*")
      .eq("week_start", week);

    if (error) {
      throw error;
    }

    return data || [];
  },

  async clear(week) {
    if (LOCAL_MODE) {
      localStorage.removeItem(
        timesheetStorageKey(week)
      );

      return;
    }

    const { error } = await db
      .from("timesheets")
      .delete()
      .eq("week_start", week);

    if (error) {
      throw error;
    }
  }
};

/* =====================================================
   STAFF STORAGE
   ===================================================== */

const StaffStorage = {
  async loadAll() {
    if (LOCAL_MODE) {
      const saved = localStorage.getItem(staffStorageKey());

      if (!saved) {
        localStorage.setItem(
          staffStorageKey(),
          JSON.stringify(DEFAULT_LOCAL_STAFF)
        );

        return sortStaffMembers(DEFAULT_LOCAL_STAFF);
      }

      try {
        const parsed = JSON.parse(saved);

        return sortStaffMembers(
          Array.isArray(parsed) ? parsed : DEFAULT_LOCAL_STAFF
        );
      } catch (error) {
        console.error("Unable to read the local staff list:", error);
        return sortStaffMembers(DEFAULT_LOCAL_STAFF);
      }
    }

    const { data, error } = await db
      .from("staff_members")
      .select("id, name, active, created_at, display_order")
      .order("display_order", { ascending: true })
      .order("created_at", { ascending: true });

    if (error) {
      throw error;
    }

    return sortStaffMembers(data || []);
  },

  async loadActive() {
    const allStaff = await this.loadAll();
    return allStaff.filter((member) => member.active !== false);
  },

  async add(name) {
    const cleanedName = name.trim();
    const allStaff = await this.loadAll();

    if (
      allStaff.some(
        (member) =>
          member.name.trim().toLowerCase() === cleanedName.toLowerCase()
      )
    ) {
      throw new Error("A staff member with that name already exists.");
    }

    const nextOrder =
      allStaff.reduce(
        (highest, member) =>
          Math.max(highest, Number(member.display_order || 0)),
        0
      ) + 1;

    if (LOCAL_MODE) {
      const member = {
        id: `local-${Date.now()}-${Math.random().toString(16).slice(2)}`,
        name: cleanedName,
        active: true,
        display_order: nextOrder,
        created_at: new Date().toISOString()
      };

      allStaff.push(member);
      localStorage.setItem(staffStorageKey(), JSON.stringify(allStaff));
      return member;
    }

    const { data, error } = await db
      .from("staff_members")
      .insert({
        name: cleanedName,
        active: true,
        display_order: nextOrder
      })
      .select("id, name, active, created_at, display_order")
      .single();

    if (error) {
      throw error;
    }

    return data;
  },

  async rename(id, name) {
    const cleanedName = name.trim();
    const allStaff = await this.loadAll();

    if (
      allStaff.some(
        (member) =>
          String(member.id) !== String(id) &&
          member.name.trim().toLowerCase() === cleanedName.toLowerCase()
      )
    ) {
      throw new Error("A staff member with that name already exists.");
    }

    if (LOCAL_MODE) {
      const updated = allStaff.map((member) =>
        String(member.id) === String(id)
          ? { ...member, name: cleanedName }
          : member
      );

      localStorage.setItem(staffStorageKey(), JSON.stringify(updated));
      return;
    }

    const { error } = await db
      .from("staff_members")
      .update({ name: cleanedName })
      .eq("id", id);

    if (error) {
      throw error;
    }
  },

  async setActive(id, active) {
    const allStaff = await this.loadAll();

    if (LOCAL_MODE) {
      const updated = allStaff.map((member) =>
        String(member.id) === String(id)
          ? { ...member, active }
          : member
      );

      localStorage.setItem(staffStorageKey(), JSON.stringify(updated));
      return;
    }

    const { error } = await db
      .from("staff_members")
      .update({ active })
      .eq("id", id);

    if (error) {
      throw error;
    }
  }
};

function formatDateForMessage(dateString) {
  const [year, month, day] =
    dateString.split("-");

  return `${day}/${month}/${year}`;
}

function addDaysToDateString(
  dateString,
  numberOfDays
) {
  const [year, month, day] =
    dateString
      .split("-")
      .map(Number);

  const date =
    new Date(
      Date.UTC(
        year,
        month - 1,
        day
      )
    );

  date.setUTCDate(
    date.getUTCDate() + numberOfDays
  );

  return date
    .toISOString()
    .slice(0, 10);
}

function preparePreviousWeekRows(
  previousRows,
  destinationWeek
) {
  let previousMetadata = {};

  try {
    previousMetadata =
      JSON.parse(
        previousRows[0]?.notes || "{}"
      );
  } catch (error) {
    console.warn(
      "Unable to read previous-week metadata:",
      error
    );
  }

  const copiedMetadata =
    JSON.stringify({
      managerNotes: "",
      managerName: "",
      managerDate: "",
      splitShifts:
        previousMetadata.splitShifts || {}
    });

  return previousRows.map((row) => ({
    week_start: destinationWeek,
    employee: row.employee,
    day: row.day,
    start_time: row.start_time || null,
    finish_time: row.finish_time || null,
    hours: Number(row.hours || 0),
    notes: copiedMetadata
  }));
}

async function copyPreviousWeek() {
  const destinationWeek =
    weekStart.value;

  if (!destinationWeek) {
    return;
  }

  const sourceWeek =
    addDaysToDateString(
      destinationWeek,
      -7
    );

  if (formHasClearableData()) {
    const confirmed =
      await showConfirmDialog({
        title: "Warning",
        message:
          "There are values entered for the current week. This will override those values. Are you sure you want to continue?",
        confirmText: "Continue"
      });

    if (!confirmed) {
      return;
    }
  }

  try {
    closeManagerMenu();

    setSaveButtonState("saving");

    setStatus(
      LOCAL_MODE
        ? "Copying previous local week…"
        : "Copying previous cloud week…",
      false,
      "loading"
    );

    const matchedSourceWeek =
      sourceWeek;

    const previousRows =
      await TimesheetStorage.load(
        matchedSourceWeek
      );

    if (!previousRows.length) {
      const environmentName =
        window.APP_CONFIG.isDevelopment
          ? "DEV database"
          : "production database";

      setSaveButtonState("saved");

      setStatus(
        `No entries found in the ${environmentName} for the previous week starting ${formatDateForMessage(sourceWeek)}`,
        false,
        "saved"
      );

      return;
    }

    const copiedRows =
      preparePreviousWeekRows(
        previousRows,
        destinationWeek
      );

    isLoading = true;

    clearForm();
    applyTimesheetData(copiedRows);

    await TimesheetStorage.save(
      destinationWeek,
      copiedRows
    );

    setSaveButtonState("saved");

    setStatus(
      LOCAL_MODE
        ? `Week starting ${formatDateForMessage(matchedSourceWeek)} copied locally`
        : `Week starting ${formatDateForMessage(matchedSourceWeek)} copied into ${formatDateForMessage(destinationWeek)}`,
      false,
      "saved"
    );

    updateClearButtonState();
  } catch (error) {
    console.error(error);

    setSaveButtonState("error");

    setStatus(
      `Unable to copy previous week: ${error.message}`,
      true,
      "error"
    );
  } finally {
    isLoading = false;
  }
}


/* =====================================================
   GENERATE ROSTER
   ===================================================== */

function formatRosterTime(value) {
  if (!value) {
    return "";
  }

  const [hourText, minuteText] =
    value.split(":");

  const hour24 =
    Number(hourText);

  const suffix =
    hour24 < 12 ? "am" : "pm";

  const hour12 =
    hour24 % 12 === 0
      ? 12
      : hour24 % 12;

  return `${hour12}:${minuteText}${suffix}`;
}

function buildRosterText() {
  const lines = [
    `Roster for week commencing ${formatDateForMessage(weekStart.value)}`,
    ""
  ];

  document
    .querySelectorAll(".day-block")
    .forEach((block) => {
      const dayLines = [];

      block
        .querySelectorAll(".shift-row")
        .forEach((row) => {
          const start =
            row.querySelector(".start").value;

          const finish =
            row.querySelector(".finish").value;

          const splitStart =
            row.querySelector(".split-start").value;

          const splitFinish =
            row.querySelector(".split-finish").value;

          if (!start || !finish) {
            return;
          }

          let shiftText =
            `${row.dataset.employee} ` +
            `${formatRosterTime(start)} - ` +
            `${formatRosterTime(finish)}`;

          if (
            row.classList.contains("has-split-shift") &&
            splitStart &&
            splitFinish
          ) {
            shiftText +=
              ` / ${formatRosterTime(splitStart)} - ` +
              `${formatRosterTime(splitFinish)}`;
          }

          dayLines.push(shiftText);
        });

      lines.push(block.dataset.day);

      if (dayLines.length) {
        lines.push(...dayLines);
      } else {
        lines.push("No shifts");
      }

      lines.push("");
    });

  return lines
    .join("\n")
    .trim();
}

function setRosterMessage(
  message,
  isError = false
) {
  rosterMessage.textContent =
    message;

  rosterMessage.classList.toggle(
    "is-error",
    isError
  );
}

function openRosterModal() {
  closeManagerMenu();

  rosterPreview.value =
    buildRosterText();

  setRosterMessage("");

  shareRosterBtn.hidden =
    typeof navigator.share !== "function";

  rosterModal.hidden = false;
  document.body.classList.add(
    "staff-modal-open"
  );

  rosterPreview.focus();
  rosterPreview.setSelectionRange(0, 0);
}

function closeRosterModal() {
  rosterModal.hidden = true;
  setRosterMessage("");

  if (
    staffModal.hidden &&
    managerLoginModal.hidden &&
    managerMenuModal.hidden &&
    versionHistoryModal.hidden
  ) {
    document.body.classList.remove(
      "staff-modal-open"
    );
  }
}

async function copyRosterText() {
  const text =
    rosterPreview.value;

  try {
    if (
      navigator.clipboard &&
      window.isSecureContext
    ) {
      await navigator.clipboard.writeText(
        text
      );
    } else {
      rosterPreview.focus();
      rosterPreview.select();

      const copied =
        document.execCommand("copy");

      if (!copied) {
        throw new Error(
          "Clipboard access is unavailable."
        );
      }

      rosterPreview.setSelectionRange(0, 0);
    }

    setRosterMessage(
      "Roster copied. It is ready to paste into WhatsApp."
    );
  } catch (error) {
    console.error(error);

    setRosterMessage(
      "Unable to copy automatically. Select the roster text and copy it manually.",
      true
    );
  }
}

async function shareRosterText() {
  if (
    typeof navigator.share !== "function"
  ) {
    setRosterMessage(
      "Sharing is not supported by this browser. Use Copy Text instead.",
      true
    );
    return;
  }

  try {
    await navigator.share({
      title:
        `Roster ${formatDateForMessage(weekStart.value)}`,
      text:
        rosterPreview.value
    });

    setRosterMessage(
      "Roster shared successfully."
    );
  } catch (error) {
    if (error.name === "AbortError") {
      return;
    }

    console.error(error);

    setRosterMessage(
      "Unable to open the share menu. Use Copy Text instead.",
      true
    );
  }
}

/* =====================================================
   MANAGER CONTROLS
   ===================================================== */

function formHasClearableData() {
  const hasShiftData = [...document.querySelectorAll(".shift-row")].some((row) => {
    const start = row.querySelector(".start")?.value;
    const finish = row.querySelector(".finish")?.value;
    const splitStart = row.querySelector(".split-start")?.value;
    const splitFinish = row.querySelector(".split-finish")?.value;

    return Boolean(
      start ||
      finish ||
      splitStart ||
      splitFinish
    );
  });

  const managerNotes =
    document.getElementById("managerNotes")?.value.trim() || "";

  const managerName =
    document.getElementById("managerName")?.value.trim() || "";

  return hasShiftData || Boolean(managerNotes || managerName);
}

function updateClearButtonState() {
  if (!resetBtn) {
    return;
  }

  resetBtn.disabled =
    !managerSignedIn ||
    !formHasClearableData();

  resetBtn.title = !managerSignedIn
    ? "Manager access required"
    : resetBtn.disabled
      ? "There is nothing to clear"
      : "Clear all entries for this week";

  if (managerMenuClearBtn) {
    managerMenuClearBtn.disabled = resetBtn.disabled;
    managerMenuClearBtn.title = resetBtn.title;
  }
}

function applyManagerControlState() {
  if (!manageStaffBtn || !resetBtn || !managerCard) {
    return;
  }

  if (managerSignedIn) {
    manageStaffBtn.hidden = false;
    manageStaffBtn.textContent = "👤 Manager Mode";
    resetBtn.hidden = true;
    managerCard.hidden = false;
  } else {
    manageStaffBtn.hidden = false;
    manageStaffBtn.textContent = "🔐 Manager Mode";
    resetBtn.hidden = true;
    managerCard.hidden = true;
    closeManagerMenu();
  }

  updateClearButtonState();
}

async function refreshManagerControlState() {
  try {
    const session = await getManagerSession();
    managerSignedIn = Boolean(session);
  } catch (error) {
    console.error("Unable to check manager session:", error);
    managerSignedIn = false;
  }

  applyManagerControlState();
}

/* =====================================================
   MODE BADGE
   ===================================================== */

function addModeBadge() {
  document.title =
    window.APP_CONFIG.pageTitle;

  const brandTitle =
    document.querySelector(".brand-title");

  if (brandTitle) {
    brandTitle.textContent =
      window.APP_CONFIG.appHeading;
  }

  const devBuildBanner =
    document.getElementById("devBuildBanner");

  if (devBuildBanner) {
    devBuildBanner.textContent =
      window.APP_CONFIG.buildLabel;

    devBuildBanner.hidden =
      !window.APP_CONFIG.isDevelopment;
  }

  const header =
    document.querySelector(".brand-copy") ||
    document.querySelector(".brand-header");

  if (!header) {
    return;
  }

  const existingBadge =
    document.getElementById(
      "storageModeBadge"
    );

  if (existingBadge) {
    existingBadge.remove();
  }

  const wrapper = document.createElement("div");
  wrapper.className = "header-status";

  const badge =
    document.createElement("div");

  badge.id = "storageModeBadge";

  badge.textContent =
    (
      LOCAL_MODE
        ? "● LOCAL MODE"
        : "● ONLINE MODE"
    ) +
    (window.APP_CONFIG.modeSuffix || "");

  badge.style.display = "inline-block";
  badge.style.marginTop = "6px";
  badge.style.padding = "4px 9px";
  badge.style.borderRadius = "999px";
  badge.style.fontSize = "11px";
  badge.style.fontWeight = "800";
  badge.style.letterSpacing = "0.4px";

  if (LOCAL_MODE) {
    badge.style.background = "#dbeafe";
    badge.style.color = "#1d4ed8";

    badge.title =
      "This version saves only in this browser and does not update Supabase.";
  } else {
    badge.style.background = "#dcfce7";
    badge.style.color = "#166534";

    badge.title =
      "This version saves to the Supabase cloud database.";
  }

  const version = document.createElement("button");
  version.className = "app-version app-version-button";
  version.type = "button";
  version.textContent = `Version ${window.APP_DISPLAY_VERSION || "3.0.8"}`;
  version.title = "View version history";
  version.setAttribute("aria-label", "View version history");

  version.addEventListener("click", openVersionHistory);

  const badgeRow =
    document.createElement("div");

  badgeRow.className =
    "header-badge-row";

  if (
    devBuildBanner &&
    window.APP_CONFIG.isDevelopment
  ) {
    devBuildBanner.hidden = false;
    badgeRow.appendChild(
      devBuildBanner
    );
  }

  badgeRow.appendChild(badge);

  wrapper.appendChild(badgeRow);
  wrapper.appendChild(version);

  header.appendChild(wrapper);
}


function renderVersionHistory() {
  const history =
    Array.isArray(window.RELEASE_HISTORY)
      ? window.RELEASE_HISTORY
      : [];

  versionHistoryCurrent.textContent =
    `Current version: ${window.APP_VERSION}`;

  versionHistoryList.innerHTML = "";

  history.forEach((release, index) => {
    const section =
      document.createElement("section");

    section.className =
      "version-history-release";

    if (index === 0) {
      section.classList.add("is-current");
    }

    const heading =
      document.createElement("div");

    heading.className =
      "version-history-release-heading";

    const title =
      document.createElement("h3");

    title.textContent =
      `Version ${release.version}`;

    const date =
      document.createElement("span");

    date.textContent =
      release.date || "";

    heading.appendChild(title);
    heading.appendChild(date);

    const list =
      document.createElement("ul");

    (release.changes || []).forEach((change) => {
      const item =
        document.createElement("li");

      item.textContent = change;
      list.appendChild(item);
    });

    section.appendChild(heading);
    section.appendChild(list);
    versionHistoryList.appendChild(section);
  });
}

function openVersionHistory() {
  renderVersionHistory();
  versionHistoryModal.hidden = false;
  document.body.classList.add("staff-modal-open");
}

function closeVersionHistory() {
  versionHistoryModal.hidden = true;

  if (
    staffModal.hidden &&
    managerLoginModal.hidden &&
    managerMenuModal.hidden
  ) {
    document.body.classList.remove("staff-modal-open");
  }
}

/* =====================================================
   STATUS AND SAVE BUTTON
   ===================================================== */

function setStatus(
  message,
  isError = false,
  state = null
) {
  if (statusEl) {
    statusEl.textContent = message;

    statusEl.classList.toggle(
      "error",
      isError
    );
  }

  if (!statusIndicator) {
    return;
  }

  statusIndicator.classList.remove(
    "status-saved",
    "status-unsaved",
    "status-saving",
    "status-error",
    "status-loading"
  );

  if (
    isError ||
    state === "error"
  ) {
    statusIndicator.classList.add(
      "status-error"
    );
  } else if (state === "unsaved") {
    statusIndicator.classList.add(
      "status-unsaved"
    );
  } else if (state === "saving") {
    statusIndicator.classList.add(
      "status-saving"
    );
  } else if (state === "loading") {
    statusIndicator.classList.add(
      "status-loading"
    );
  } else {
    statusIndicator.classList.add(
      "status-saved"
    );
  }
}

function setSaveButtonState(state) {
  if (!saveBtn) {
    return;
  }

  saveBtn.classList.remove(
    "is-ready",
    "is-saving",
    "is-saved",
    "is-error"
  );

  if (state === "ready") {
    saveBtn.classList.add("is-ready");
    saveBtn.disabled = false;
    saveBtn.textContent = "Save";
  } else if (state === "saving") {
    saveBtn.classList.add("is-saving");
    saveBtn.disabled = true;
    saveBtn.textContent = "Saving…";
  } else if (state === "error") {
    saveBtn.classList.add("is-error");
    saveBtn.disabled = false;
    saveBtn.textContent = "Retry Save";
  } else {
    saveBtn.classList.add("is-saved");
    saveBtn.disabled = true;
    saveBtn.textContent = "✓ Saved";
  }
}

/* =====================================================
   TIME OPTIONS
   ===================================================== */

function makeTimeOptions(
  startMinutes,
  endMinutes
) {
  const options = [];

  for (
    let currentMinutes = startMinutes;
    currentMinutes <= endMinutes;
    currentMinutes += 30
  ) {
    const hour24 =
      Math.floor(currentMinutes / 60);

    const minuteValue =
      currentMinutes % 60;

    const suffix =
      hour24 < 12 ? "am" : "pm";

    const hour12 =
      hour24 % 12 === 0
        ? 12
        : hour24 % 12;

    options.push({
      value:
        `${String(hour24).padStart(2, "0")}:` +
        `${String(minuteValue).padStart(2, "0")}`,

      label:
        `${hour12}:` +
        `${String(minuteValue).padStart(2, "0")} ` +
        suffix
    });
  }

  return options;
}

function getTimeOptions(day, type) {
  const isSaturday =
    day === "Saturday";

  if (type === "start") {
    return isSaturday
      ? makeTimeOptions(390, 600)
      : makeTimeOptions(300, 660);
  }

  return isSaturday
    ? makeTimeOptions(480, 780)
    : makeTimeOptions(480, 900);
}

function populateSelect(
  select,
  options
) {
  select.innerHTML =
    '<option value="">Select</option>';

  options.forEach((option) => {
    const element =
      document.createElement("option");

    element.value = option.value;
    element.textContent = option.label;

    select.appendChild(element);
  });
}

function updateFinishOptions(
  startSelect,
  finishSelect,
  day,
  preferredValue = finishSelect.value
) {
  const startMinutes =
    minutes(startSelect.value);

  const allFinishOptions =
    getTimeOptions(day, "finish");

  const availableOptions =
    startMinutes === null
      ? allFinishOptions
      : allFinishOptions.filter(
          (option) =>
            minutes(option.value) >=
            startMinutes + 30
        );

  populateSelect(
    finishSelect,
    availableOptions
  );

  const preferredStillAvailable =
    [...finishSelect.options].some(
      (option) =>
        option.value === preferredValue
    );

  finishSelect.value =
    preferredStillAvailable
      ? preferredValue
      : "";
}

function formatLocalDateValue(date) {
  const year =
    date.getFullYear();

  const month =
    String(date.getMonth() + 1)
      .padStart(2, "0");

  const day =
    String(date.getDate())
      .padStart(2, "0");

  return `${year}-${month}-${day}`;
}

function getCurrentWeekStartValue() {
  const today = new Date();
  const monday = new Date(
    today.getFullYear(),
    today.getMonth(),
    today.getDate()
  );

  const currentDay =
    monday.getDay();

  /*
    Monday is always the first operating day.
    Sunday belongs to the upcoming Monday-to-Saturday week.
  */
  const daysToMonday =
    currentDay === 0
      ? 1
      : 1 - currentDay;

  monday.setDate(
    monday.getDate() + daysToMonday
  );

  return formatLocalDateValue(
    monday
  );
}

async function goToCurrentWeek() {
  if (goToCurrentWeekBtn.disabled) {
    return;
  }

  weekStart.value =
    getCurrentWeekStartValue();

  updateWeekEnd();
  updateCurrentWeekHighlight();
  await load();
}

function updateCurrentWeekHighlight() {
  const weekCard =
    document.querySelector(".week-card");

  if (!weekCard || !weekStart.value) {
    return;
  }

  const isCurrentWeek =
    weekStart.value ===
    getCurrentWeekStartValue();

  weekCard.classList.toggle(
    "is-current-week",
    isCurrentWeek
  );

  /*
    Keep the middle grid column reserved so Previous and Next
    never resize when Today is unavailable.
  */
  goToCurrentWeekBtn.hidden = false;

  goToCurrentWeekBtn.disabled =
    isCurrentWeek;

  goToCurrentWeekBtn.classList.toggle(
    "is-current",
    isCurrentWeek
  );

  goToCurrentWeekBtn.classList.toggle(
    "is-placeholder-hidden",
    isCurrentWeek
  );

  goToCurrentWeekBtn.setAttribute(
    "aria-hidden",
    isCurrentWeek ? "true" : "false"
  );

  goToCurrentWeekBtn.title =
    isCurrentWeek
      ? ""
      : "Return to the current week";
}

/* =====================================================
   DYNAMIC TIMESHEET BUILDING
   ===================================================== */

function setSplitShiftVisible(row, visible, { clearValues = false } = {}) {
  const panel = row.querySelector(".split-shift-panel");
  const addButton = row.querySelector(".add-split-shift-btn");
  const removeButton = row.querySelector(".remove-split-shift-btn");
  const totalWrap = row.querySelector(".row-total-wrap");
  const splitStart = row.querySelector(".split-start");
  const splitFinish = row.querySelector(".split-finish");

  panel.hidden = !visible;
  addButton.hidden = visible;
  removeButton.hidden = !visible;
  totalWrap.hidden = !visible;
  row.classList.toggle("has-split-shift", visible);

  if (!visible && clearValues) {
    splitStart.value = "";
    splitFinish.value = "";
  }
}

function createEmployeeRow(
  member,
  day
) {
  const node =
    employeeRowTemplate.content.cloneNode(
      true
    );

  const row =
    node.querySelector(".shift-row");

  const nameElement =
    node.querySelector(".employee-name");

  const start =
    node.querySelector(".start");

  const finish =
    node.querySelector(".finish");

  const splitStart =
    node.querySelector(".split-start");

  const splitFinish =
    node.querySelector(".split-finish");

  const addSplitButton =
    node.querySelector(".add-split-shift-btn");

  const removeSplitButton =
    node.querySelector(".remove-split-shift-btn");

  row.dataset.employee = member.name;
  row.dataset.employeeId = member.id;
  row.dataset.day = day;

  nameElement.textContent = member.name;

  [start, splitStart].forEach((select) => {
    populateSelect(
      select,
      getTimeOptions(day, "start")
    );
  });

  [finish, splitFinish].forEach((select) => {
    populateSelect(
      select,
      getTimeOptions(day, "finish")
    );
  });

  start.setAttribute(
    "aria-label",
    `${day} ${member.name} start`
  );

  finish.setAttribute(
    "aria-label",
    `${day} ${member.name} finish`
  );

  splitStart.setAttribute(
    "aria-label",
    `${day} ${member.name} split shift start`
  );

  splitFinish.setAttribute(
    "aria-label",
    `${day} ${member.name} split shift finish`
  );

  const handleShiftChange = () => {
    calculateRow(row);
    calculateTotals();
    updateClearButtonState();
    scheduleSave();
  };

  start.addEventListener(
    "change",
    () => {
      updateFinishOptions(
        start,
        finish,
        day
      );
      handleShiftChange();
    }
  );

  finish.addEventListener(
    "change",
    handleShiftChange
  );

  splitStart.addEventListener(
    "change",
    () => {
      updateFinishOptions(
        splitStart,
        splitFinish,
        day
      );
      handleShiftChange();
    }
  );

  splitFinish.addEventListener(
    "change",
    handleShiftChange
  );

  addSplitButton.addEventListener("click", () => {
    setSplitShiftVisible(row, true);
    calculateRow(row);
    updateClearButtonState();
    scheduleSave();
    splitStart.focus();
  });

  removeSplitButton.addEventListener("click", () => {
    setSplitShiftVisible(
      row,
      false,
      { clearValues: true }
    );
    calculateRow(row);
    calculateTotals();
    updateClearButtonState();
    scheduleSave();
  });

  setSplitShiftVisible(row, false);

  return node;
}

function buildTimesheet() {
  timesheet.innerHTML = "";

  days.forEach((day) => {
    const node =
      dayTemplate.content.cloneNode(
        true
      );

    const block =
      node.querySelector(".day-block");

    const heading =
      node.querySelector("h2");

    const employeeRows =
      node.querySelector(".employeeRows");

    block.dataset.day = day;
    heading.textContent =
      day.toUpperCase();

    staffMembers.forEach((member) => {
      employeeRows.appendChild(
        createEmployeeRow(
          member,
          day
        )
      );
    });

    timesheet.appendChild(node);
  });
}

function createEmployeeTotalRow(member) {
  const node =
    employeeTotalTemplate.content.cloneNode(
      true
    );

  const row =
    node.querySelector(
      ".employee-total-row"
    );

  const nameElement =
    node.querySelector(
      ".employee-total-name"
    );

  const totalElement =
    node.querySelector(
      ".employee-total-value"
    );

  row.dataset.employee = member.name;
  row.dataset.employeeId = member.id;

  nameElement.textContent =
    member.name;

  totalElement.textContent = "0.00";

  /*
    These styles preserve the same appearance as
    the previous fixed summary rows.
  */
  row.style.display = "flex";
  row.style.justifyContent =
    "space-between";
  row.style.padding = "7px 9px";
  row.style.borderBottom =
    "1px solid #ccc";
  row.style.fontSize = "12px";
  row.style.fontWeight = "900";

  return node;
}

function buildEmployeeTotals() {
  employeeTotals.innerHTML = "";

  staffMembers.forEach((member) => {
    employeeTotals.appendChild(
      createEmployeeTotalRow(member)
    );
  });
}

function rebuildStaffInterface() {
  staffMembers = sortStaffMembers(staffMembers);
  buildTimesheet();
  buildEmployeeTotals();
  calculateTotals();
}

/* =====================================================
   CALCULATIONS
   ===================================================== */

function minutes(value) {
  if (!value) {
    return null;
  }

  const [hours, minuteValue] =
    value.split(":").map(Number);

  return hours * 60 + minuteValue;
}

function formatDecimal(totalMinutes) {
  return (
    totalMinutes / 60
  ).toFixed(2);
}

function calculateShiftMinutes(startSelect, finishSelect) {
  const start = minutes(startSelect.value);
  const finish = minutes(finishSelect.value);

  startSelect.classList.remove("invalid");
  finishSelect.classList.remove("invalid");

  if (start === null && finish === null) {
    return {
      minutes: 0,
      complete: false,
      valid: true
    };
  }

  if (start === null || finish === null) {
    return {
      minutes: 0,
      complete: false,
      valid: true
    };
  }

  const total = finish - start;

  if (total < 30 || total > 630) {
    startSelect.classList.add("invalid");
    finishSelect.classList.add("invalid");

    return {
      minutes: 0,
      complete: true,
      valid: false
    };
  }

  return {
    minutes: total,
    complete: true,
    valid: true
  };
}

function calculateRow(row) {
  const primary =
    calculateShiftMinutes(
      row.querySelector(".start"),
      row.querySelector(".finish")
    );

  const splitVisible =
    row.classList.contains("has-split-shift");

  const split = splitVisible
    ? calculateShiftMinutes(
        row.querySelector(".split-start"),
        row.querySelector(".split-finish")
      )
    : {
        minutes: 0,
        complete: false,
        valid: true
      };

  const total =
    primary.minutes + split.minutes;

  row.dataset.minutes = total;

  row.querySelector(
    ".primary-shift-total"
  ).textContent =
    formatDecimal(primary.minutes);

  row.querySelector(
    ".split-shift-total"
  ).textContent =
    formatDecimal(split.minutes);

  row.querySelector(
    ".row-total"
  ).textContent =
    formatDecimal(total);

  row.classList.toggle(
    "completed",
    primary.complete &&
      primary.valid &&
      (
        !splitVisible ||
        (split.complete && split.valid)
      )
  );
}

function calculateTotals() {
  const totals = {};

  staffMembers.forEach((member) => {
    totals[member.name] = 0;
  });

  document
    .querySelectorAll(".shift-row")
    .forEach((row) => {
      const employee =
        row.dataset.employee;

      if (
        totals[employee] === undefined
      ) {
        totals[employee] = 0;
      }

      totals[employee] += Number(
        row.dataset.minutes || 0
      );
    });

  let weekTotalMinutes = 0;

  staffMembers.forEach((member) => {
    const memberMinutes =
      totals[member.name] || 0;

    weekTotalMinutes +=
      memberMinutes;

    const totalRow = [
      ...document.querySelectorAll(
        ".employee-total-row"
      )
    ].find(
      (row) =>
        row.dataset.employeeId ===
        String(member.id)
    );

    if (!totalRow) {
      return;
    }

    const valueElement =
      totalRow.querySelector(
        ".employee-total-value"
      );

    valueElement.textContent =
      formatDecimal(memberMinutes);
  });

  const weekTotalElement =
    document.getElementById(
      "weekTotal"
    );

  if (weekTotalElement) {
    weekTotalElement.textContent =
      formatDecimal(
        weekTotalMinutes
      );
  }
}

/* =====================================================
   WEEK DATES
   ===================================================== */

function updateWeekEnd() {
  if (!weekStart.value) {
    weekEnd.value = "";
    return;
  }

  /*
    A roster week is always Monday through Saturday.
    Saturday is exactly five days after Monday.
  */
  weekEnd.value =
    addDaysToDateString(
      weekStart.value,
      5
    );
}

/* =====================================================
   MANAGER DETAILS
   ===================================================== */

function collectSplitShiftMetadata() {
  const splitShifts = {};

  document
    .querySelectorAll(".day-block")
    .forEach((block) => {
      block
        .querySelectorAll(".shift-row.has-split-shift")
        .forEach((row) => {
          const key =
            `${block.dataset.day}::${row.dataset.employee}`;

          splitShifts[key] = {
            start:
              row.querySelector(".split-start")
                .value || null,

            finish:
              row.querySelector(".split-finish")
                .value || null
          };
        });
    });

  return splitShifts;
}

function managerMetadata() {
  return JSON.stringify({
    managerNotes:
      document.getElementById(
        "managerNotes"
      ).value,

    managerName:
      document.getElementById(
        "managerName"
      ).value,

    managerDate:
      document.getElementById(
        "managerDate"
      ).value,

    splitShifts:
      collectSplitShiftMetadata()
  });
}

/* =====================================================
   COLLECT CURRENT TIMESHEET
   ===================================================== */

function collectRows() {
  const rows = [];
  const notes = managerMetadata();

  document
    .querySelectorAll(".day-block")
    .forEach((block) => {
      block
        .querySelectorAll(".shift-row")
        .forEach((row) => {
          rows.push({
            week_start:
              weekStart.value,

            employee:
              row.dataset.employee,

            day:
              block.dataset.day,

            start_time:
              row.querySelector(".start")
                .value || null,

            finish_time:
              row.querySelector(".finish")
                .value || null,

            hours:
              Number(
                row.dataset.minutes || 0
              ) / 60,

            notes
          });
        });
    });

  return rows;
}

/* =====================================================
   AUTOSAVE
   ===================================================== */

function scheduleSave() {
  if (
    isLoading ||
    !weekStart.value
  ) {
    return;
  }

  clearTimeout(saveTimer);

  setSaveButtonState("ready");

  setStatus(
    "Unsaved changes",
    false,
    "unsaved"
  );

  saveTimer = setTimeout(
    () => {
      save();
    },
    700
  );
}

async function save() {
  if (!weekStart.value) {
    return;
  }

  clearTimeout(saveTimer);

  const rows = collectRows();

  try {
    setSaveButtonState("saving");

    setStatus(
      LOCAL_MODE
        ? "Saving locally…"
        : "Saving to cloud…",
      false,
      "saving"
    );

    await TimesheetStorage.save(
      weekStart.value,
      rows
    );

    setSaveButtonState("saved");

    setStatus(
      LOCAL_MODE
        ? "Saved locally on this computer"
        : "Saved to cloud",
      false,
      "saved"
    );

    updateClearButtonState();
    closeManagerMenu();
    return true;
  } catch (error) {
    console.error(error);

    setSaveButtonState("error");

    setStatus(
      `Unable to save: ${error.message}`,
      true,
      "error"
    );

    return false;
  }
}

/* =====================================================
   CLEAR CURRENT FORM
   ===================================================== */

function clearForm() {
  document
    .querySelectorAll(
      ".shift-row select"
    )
    .forEach((select) => {
      select.value = "";
    });

  document
    .querySelectorAll(".shift-row")
    .forEach((row) => {
      setSplitShiftVisible(
        row,
        false,
        { clearValues: true }
      );
      calculateRow(row);
    });

  document.getElementById(
    "managerNotes"
  ).value = "";

  document.getElementById(
    "managerName"
  ).value = "";

  calculateTotals();
  updateClearButtonState();
}

/* =====================================================
   APPLY SAVED RECORDS TO THE PAGE
   ===================================================== */

function applyTimesheetData(data) {
  if (!data.length) {
    calculateTotals();
    return;
  }

  let metadata = {};

  try {
    metadata =
      JSON.parse(
        data[0].notes || "{}"
      );
  } catch (error) {
    console.warn(
      "Unable to read manager information:",
      error
    );
  }

  document.getElementById(
    "managerNotes"
  ).value =
    metadata.managerNotes || "";

  document.getElementById(
    "managerName"
  ).value =
    metadata.managerName || "";

  document.getElementById(
    "managerDate"
  ).value =
    metadata.managerDate ||
    document.getElementById(
      "managerDate"
    ).value;

  data.forEach((record) => {
    const block = [
      ...document.querySelectorAll(
        ".day-block"
      )
    ].find(
      (item) =>
        item.dataset.day ===
        record.day
    );

    if (!block) {
      return;
    }

    const row = [
      ...block.querySelectorAll(
        ".shift-row"
      )
    ].find(
      (item) =>
        item.dataset.employee ===
        record.employee
    );

    if (!row) {
      /*
        This can happen when a historical record belongs
        to a staff member who is no longer active.
        The historical database record is left untouched.
      */
      return;
    }

    const primaryStart =
      row.querySelector(".start");

    const primaryFinish =
      row.querySelector(".finish");

    primaryStart.value =
      record.start_time || "";

    updateFinishOptions(
      primaryStart,
      primaryFinish,
      record.day,
      record.finish_time || ""
    );

    const splitKey =
      `${record.day}::${record.employee}`;

    const splitShift =
      metadata.splitShifts?.[splitKey];

    if (splitShift) {
      setSplitShiftVisible(row, true);

      const secondaryStart =
        row.querySelector(".split-start");

      const secondaryFinish =
        row.querySelector(".split-finish");

      secondaryStart.value =
        splitShift.start || "";

      updateFinishOptions(
        secondaryStart,
        secondaryFinish,
        record.day,
        splitShift.finish || ""
      );
    } else {
      setSplitShiftVisible(
        row,
        false,
        { clearValues: true }
      );
    }

    calculateRow(row);
  });

  calculateTotals();
  updateClearButtonState();
}

/* =====================================================
   LOAD STAFF AND WEEK TOGETHER
   ===================================================== */

async function load() {
  if (!weekStart.value) {
    return;
  }

  isLoading = true;

  setSaveButtonState("saving");

  setStatus(
    LOCAL_MODE
      ? "Loading local data…"
      : "Loading staff and timesheet…",
    false,
    "loading"
  );

  try {
    const [
      loadedStaff,
      timesheetData
    ] = await Promise.all([
      StaffStorage.loadActive(),
      TimesheetStorage.load(
        weekStart.value
      )
    ]);

    staffMembers = loadedStaff;

    rebuildStaffInterface();
    clearForm();

    applyTimesheetData(
      timesheetData
    );

    setSaveButtonState("saved");

    if (!staffMembers.length) {
      setStatus(
        "No active staff members found",
        true,
        "error"
      );

      return;
    }

    if (timesheetData.length) {
      setStatus(
        LOCAL_MODE
          ? "Loaded from this computer"
          : "Loaded from cloud",
        false,
        "saved"
      );
    } else {
      setStatus(
        LOCAL_MODE
          ? "New local week — no entries yet"
          : "New week — no entries yet",
        false,
        "saved"
      );
    }
  } catch (error) {
    console.error(error);

    setSaveButtonState("error");

    setStatus(
      `Unable to load: ${error.message}`,
      true,
      "error"
    );
  } finally {
    isLoading = false;
  }
}


/* =====================================================
   STAFF MANAGEMENT
   ===================================================== */

function setStaffManagerMessage(message, isError = false) {
  staffManagerMessage.textContent = message;
  staffManagerMessage.classList.toggle("error", isError);
}

function setStaffOperationStatus(state, message) {
  clearTimeout(staffStatusResetTimer);

  staffOperationStatus.classList.remove(
    "is-ready",
    "is-loading",
    "is-success",
    "is-error"
  );

  staffOperationStatus.classList.add(`is-${state}`);
  staffOperationStatusText.textContent = message;

  const icon = staffOperationStatus.querySelector(".staff-operation-icon");
  icon.textContent = state === "error" ? "!" : state === "loading" ? "" : "✓";
}

function scheduleStaffStatusReady(delay = 1800) {
  clearTimeout(staffStatusResetTimer);
  staffStatusResetTimer = setTimeout(() => {
    if (!staffOperationBusy && !staffModal.hidden) {
      setStaffOperationStatus("ready", "Ready");
    }
  }, delay);
}

function showStaffToast(message, type = "success") {
  clearTimeout(staffToastTimer);
  staffToastRegion.innerHTML = "";

  const toast = document.createElement("div");
  toast.className = `staff-toast is-${type}`;
  toast.textContent = message;
  staffToastRegion.appendChild(toast);

  requestAnimationFrame(() => toast.classList.add("is-visible"));

  staffToastTimer = setTimeout(() => {
    toast.classList.remove("is-visible");
    setTimeout(() => toast.remove(), 220);
  }, 2200);
}

function setStaffManagerBusy(busy, activeButton = null, busyText = "Working…") {
  staffOperationBusy = busy;
  staffModal.classList.toggle("is-busy", busy);

  const controls = staffModal.querySelectorAll(
    "button:not(#closeStaffModalBtn):not(#managerSignOutBtn), input"
  );

  controls.forEach((control) => {
    if (busy) {
      control.dataset.wasDisabled = String(control.disabled);
      control.disabled = true;
    } else {
      control.disabled = control.dataset.wasDisabled === "true";
      delete control.dataset.wasDisabled;
    }
  });

  if (activeButton) {
    if (busy) {
      activeButton.dataset.originalText = activeButton.textContent;
      activeButton.textContent = busyText;
      activeButton.disabled = true;
    } else {
      activeButton.textContent = activeButton.dataset.originalText || activeButton.textContent;
      delete activeButton.dataset.originalText;
    }
  }
}

function highlightStaffRow(id, className) {
  requestAnimationFrame(() => {
    const row = staffModal.querySelector(`[data-staff-id="${CSS.escape(String(id))}"]`);
    if (row) {
      row.classList.add(className);
      setTimeout(() => row.classList.remove(className), 1300);
    }
  });
}

async function runStaffOperation({
  busyMessage,
  successMessage,
  button = null,
  busyText = "Working…",
  action,
  highlightId = null,
  highlightClass = "staff-highlight-added"
}) {
  if (staffOperationBusy) {
    return null;
  }

  setStaffManagerMessage("");
  setStaffOperationStatus("loading", busyMessage);
  setStaffManagerBusy(true, button, busyText);

  try {
    const result = await action();
    await renderStaffManager({ showLoading: false });
    await load();

    setStaffOperationStatus("success", successMessage);
    showStaffToast(`✓ ${successMessage}`, "success");

    const id = highlightId ?? result?.id;
    if (id) {
      highlightStaffRow(id, highlightClass);
    }

    scheduleStaffStatusReady();
    return result;
  } catch (error) {
    console.error(error);
    const message = error.message || "Unable to complete the request.";
    setStaffManagerMessage(message, true);
    setStaffOperationStatus("error", message);
    showStaffToast(`⚠ ${message}`, "error");
    return null;
  } finally {
    setStaffManagerBusy(false, button);
  }
}

function createStaffManagerRow(member, index) {
  const row = document.createElement("div");
  row.className = "staff-manage-row";
  row.dataset.staffId = member.id;

  const order = document.createElement("span");
  order.className = "staff-order-number";
  order.textContent = String(index + 1);

  const name = document.createElement("div");
  name.className = "staff-manage-name";
  name.textContent = member.name;

  const actions = document.createElement("div");
  actions.className = "staff-row-actions";

  if (member.active !== false) {
    const renameButton = document.createElement("button");
    renameButton.type = "button";
    renameButton.className = "rename-staff-btn";
    renameButton.textContent = "Rename";

    renameButton.addEventListener("click", () => {
      const editor = document.createElement("form");
      editor.className = "staff-inline-edit";

      const input = document.createElement("input");
      input.type = "text";
      input.maxLength = 80;
      input.value = member.name;
      input.required = true;

      const saveButton = document.createElement("button");
      saveButton.type = "submit";
      saveButton.textContent = "Save";

      const cancelButton = document.createElement("button");
      cancelButton.type = "button";
      cancelButton.textContent = "Cancel";

      editor.append(input, saveButton, cancelButton);
      name.replaceWith(editor);
      input.focus();
      input.select();

      cancelButton.addEventListener("click", () => {
        editor.replaceWith(name);
      });

      editor.addEventListener("submit", async (event) => {
        event.preventDefault();
        const newName = input.value.trim();

        if (!newName) {
          return;
        }

        await runStaffOperation({
          busyMessage: `Renaming ${member.name}…`,
          successMessage: `${newName} renamed successfully`,
          button: saveButton,
          busyText: "Saving…",
          highlightId: member.id,
          highlightClass: "staff-highlight-renamed",
          action: async () => {
            await save();
            await StaffStorage.rename(member.id, newName);
            return { id: member.id };
          }
        });
      });
    });

    const deactivateButton = document.createElement("button");
    deactivateButton.type = "button";
    deactivateButton.className = "deactivate-staff-btn";
    deactivateButton.textContent = "Deactivate";

    deactivateButton.addEventListener("click", async () => {
      const confirmed = await showConfirmDialog({
        title: "Warning",
        message: `Deactivate ${member.name}?`,
        detail: "Historical timesheet records will be kept.",
        confirmText: "Deactivate"
      });

      if (!confirmed) {
        return;
      }

      await runStaffOperation({
        busyMessage: `Deactivating ${member.name}…`,
        successMessage: `${member.name} deactivated`,
        button: deactivateButton,
        busyText: "Deactivating…",
        action: async () => {
          await save();
          await StaffStorage.setActive(member.id, false);
        }
      });
    });

    actions.append(renameButton, deactivateButton);
  } else {
    const reactivateButton = document.createElement("button");
    reactivateButton.type = "button";
    reactivateButton.className = "reactivate-staff-btn";
    reactivateButton.textContent = "Reactivate";

    reactivateButton.addEventListener("click", async () => {
      await runStaffOperation({
        busyMessage: `Reactivating ${member.name}…`,
        successMessage: `${member.name} reactivated`,
        button: reactivateButton,
        busyText: "Reactivating…",
        highlightId: member.id,
        highlightClass: "staff-highlight-reactivated",
        action: async () => {
          await StaffStorage.setActive(member.id, true);
          return { id: member.id };
        }
      });
    });

    actions.appendChild(reactivateButton);
  }

  row.append(order, name, actions);
  return row;
}

function setManagerLoginMessage(message, isError = false) {
  managerLoginMessage.textContent = message;
  managerLoginMessage.classList.toggle("error", isError);
}

function openManagerLogin() {
  setManagerLoginMessage("");
  managerLoginPassword.value = "";
  managerLoginModal.hidden = false;
  document.body.classList.add("staff-modal-open");
  setTimeout(() => managerLoginEmail.focus(), 0);
}

function closeManagerLogin() {
  managerLoginModal.hidden = true;
  if (staffModal.hidden) {
    document.body.classList.remove("staff-modal-open");
  }
}

async function getManagerSession() {
  if (LOCAL_MODE) {
    return { local: true };
  }

  const { data, error } = await db.auth.getSession();

  if (error) {
    throw error;
  }

  return data.session;
}

async function requireManagerSession(onAuthenticated = null) {
  const session = await getManagerSession();

  if (session) {
    return true;
  }

  pendingManagerAction =
    typeof onAuthenticated === "function"
      ? onAuthenticated
      : null;

  openManagerLogin();
  return false;
}

async function renderStaffManager({ showLoading = true } = {}) {
  activeStaffList.innerHTML = showLoading
    ? '<div class="staff-list-loading">Loading staff…</div>'
    : "";
  inactiveStaffList.innerHTML = showLoading
    ? '<div class="staff-list-loading">Loading staff…</div>'
    : "";

  if (showLoading) {
    setStaffOperationStatus("loading", "Loading staff…");
  }

  const allStaff = await StaffStorage.loadAll();
  const active = allStaff.filter((member) => member.active !== false);
  const inactive = allStaff.filter((member) => member.active === false);

  /*
    Remove the temporary loading placeholders before rendering
    the actual staff rows.
  */
  activeStaffList.innerHTML = "";
  inactiveStaffList.innerHTML = "";

  if (!active.length) {
    activeStaffList.innerHTML =
      '<div class="staff-list-empty">No active staff members.</div>';
  } else {
    active.forEach((member, index) => {
      activeStaffList.appendChild(
        createStaffManagerRow(member, index)
      );
    });
  }

  inactiveStaffCount.textContent = String(inactive.length);

  if (!inactive.length) {
    inactiveStaffList.innerHTML =
      '<div class="staff-list-empty">No inactive staff members.</div>';
  } else {
    inactive.forEach((member, index) => {
      inactiveStaffList.appendChild(
        createStaffManagerRow(member, index)
      );
    });
  }

  setStaffOperationStatus("ready", "Ready");
}

async function refreshStaffAfterChange() {
  await renderStaffManager();
  await load();
}

async function showStaffModal() {
  setStaffManagerMessage("");
  setStaffOperationStatus("loading", "Loading staff…");
  staffModal.hidden = false;
  document.body.classList.add("staff-modal-open");

  try {
    await renderStaffManager();
    newStaffName.focus();
  } catch (error) {
    console.error(error);
    setStaffManagerMessage(error.message, true);
  }
}

function openManagerMenu() {
  if (!managerSignedIn) {
    openManagerLogin();
    return;
  }

  updateClearButtonState();
  managerMenuModal.hidden = false;
  document.body.classList.add("staff-modal-open");
}

function closeManagerMenu() {
  if (!managerMenuModal) {
    return;
  }

  managerMenuModal.hidden = true;

  if (staffModal.hidden && managerLoginModal.hidden) {
    document.body.classList.remove("staff-modal-open");
  }
}

async function openStaffModal() {
  try {
    const allowed = await requireManagerSession();

    if (!allowed) {
      return;
    }

    await showStaffModal();
  } catch (error) {
    console.error(error);
    openManagerLogin();
    setManagerLoginMessage(error.message, true);
  }
}

function closeStaffModal() {
  staffModal.hidden = true;
  document.body.classList.remove("staff-modal-open");
}

manageStaffBtn.addEventListener("click", openManagerMenu);
closeManagerMenuBtn.addEventListener("click", closeManagerMenu);

managerMenuModal
  .querySelectorAll("[data-close-manager-menu]")
  .forEach((element) => {
    element.addEventListener("click", closeManagerMenu);
  });

managerMenuStaffBtn.addEventListener("click", async () => {
  closeManagerMenu();
  await showStaffModal();
});

managerMenuCopyPreviousBtn.addEventListener(
  "click",
  copyPreviousWeek
);

managerMenuGenerateRosterBtn.addEventListener(
  "click",
  openRosterModal
);

copyRosterBtn.addEventListener(
  "click",
  copyRosterText
);

shareRosterBtn.addEventListener(
  "click",
  shareRosterText
);

closeRosterBtn.addEventListener(
  "click",
  closeRosterModal
);

closeRosterActionBtn.addEventListener(
  "click",
  closeRosterModal
);

rosterModal
  .querySelectorAll("[data-close-roster]")
  .forEach((element) => {
    element.addEventListener(
      "click",
      closeRosterModal
    );
  });

managerMenuClearBtn.addEventListener("click", async () => {
  if (managerMenuClearBtn.disabled) {
    return;
  }

  closeManagerMenu();
  await clearSelectedWeek();
});

closeStaffModalBtn.addEventListener("click", closeStaffModal);
closeManagerLoginBtn.addEventListener("click", () => {
  pendingManagerAction = null;
  closeManagerLogin();
});

managerLoginModal
  .querySelectorAll("[data-close-manager-login]")
  .forEach((element) => {
    element.addEventListener("click", () => {
      pendingManagerAction = null;
      closeManagerLogin();
    });
  });

managerLoginForm.addEventListener("submit", async (event) => {
  event.preventDefault();

  const email = managerLoginEmail.value.trim();
  const password = managerLoginPassword.value;

  if (!email || !password) {
    setManagerLoginMessage("Enter your email and password.", true);
    return;
  }

  try {
    managerLoginSubmitBtn.disabled = true;
    managerLoginSubmitBtn.textContent = "Signing In…";
    setManagerLoginMessage("Signing in…");

    const { error } = await db.auth.signInWithPassword({
      email,
      password
    });

    if (error) {
      throw error;
    }

    closeManagerLogin();

    managerSignedIn = true;
    applyManagerControlState();

    const actionToRun = pendingManagerAction;
    pendingManagerAction = null;

    if (actionToRun) {
      await actionToRun();
    } else {
      openManagerMenu();
    }
  } catch (error) {
    console.error(error);
    setManagerLoginMessage(
      error.message || "Unable to sign in.",
      true
    );
  } finally {
    managerLoginSubmitBtn.disabled = false;
    managerLoginSubmitBtn.textContent = "Sign In";
  }
});

async function signOutManager() {
  if (LOCAL_MODE) {
    managerSignedIn = false;
    applyManagerControlState();
    closeStaffModal();
    closeManagerMenu();
    return;
  }

  try {
    if (!staffModal.hidden) {
      setStaffOperationStatus("loading", "Signing out…");
    }

    const { error } = await db.auth.signOut();

    if (error) {
      throw error;
    }

    pendingManagerAction = null;
    managerSignedIn = false;
    applyManagerControlState();
    closeStaffModal();
    closeManagerMenu();
    setStatus("Manager signed out", false, "saved");
  } catch (error) {
    console.error(error);

    if (!staffModal.hidden) {
      setStaffManagerMessage(error.message, true);
    } else {
      setStatus(
        `Unable to sign out: ${error.message}`,
        true,
        "error"
      );
    }
  }
}

managerSignOutBtn.addEventListener("click", signOutManager);
managerMenuSignOutBtn.addEventListener("click", signOutManager);

staffModal
  .querySelectorAll("[data-close-staff-modal]")
  .forEach((element) => {
    element.addEventListener("click", closeStaffModal);
  });

document.addEventListener("keydown", (event) => {
  if (event.key !== "Escape") {
    return;
  }

  if (!managerLoginModal.hidden) {
    pendingManagerAction = null;
    closeManagerLogin();
    return;
  }

  if (!staffModal.hidden) {
    closeStaffModal();
    return;
  }

  if (!managerMenuModal.hidden) {
    closeManagerMenu();
    return;
  }

  if (!versionHistoryModal.hidden) {
    closeVersionHistory();
    return;
  }

  if (!rosterModal.hidden) {
    closeRosterModal();
  }
});

addStaffForm.addEventListener("submit", async (event) => {
  event.preventDefault();
  const name = newStaffName.value.trim();

  if (!name) {
    return;
  }

  const addButton = addStaffForm.querySelector('button[type="submit"]');

  const added = await runStaffOperation({
    busyMessage: `Adding ${name}…`,
    successMessage: `${name} added`,
    button: addButton,
    busyText: "Adding…",
    highlightClass: "staff-highlight-added",
    action: async () => {
      await save();
      return StaffStorage.add(name);
    }
  });

  if (added) {
    newStaffName.value = "";
    newStaffName.focus();
  }
});

/* =====================================================
   EVENTS
   ===================================================== */

weekStart.addEventListener(
  "change",
  async () => {
    updateWeekEnd();
    updateCurrentWeekHighlight();
    await load();
  }
);

[
  "managerNotes",
  "managerName",
  "managerDate"
].forEach((id) => {
  document
    .getElementById(id)
    .addEventListener(
      "input",
      () => {
        updateClearButtonState();
        scheduleSave();
      }
    );
});

saveBtn.addEventListener(
  "click",
  () => {
    save();
  }
);

appUpdateNowBtn.addEventListener(
  "click",
  async () => {
    if (!pendingAppUpdate) {
      return;
    }

    if (hasUnsavedTimesheetChanges()) {
      appUpdateNowBtn.disabled = true;
      appUpdateNowBtn.textContent =
        "Saving…";

      const saved =
        await save();

      if (!saved) {
        appUpdateNowBtn.disabled = false;
        appUpdateNowBtn.textContent =
          "OK";

        appUpdateUnsavedMessage.hidden =
          false;

        appUpdateUnsavedMessage.textContent =
          "The save was unsuccessful. Please try again.";

        return;
      }
    }

    appUpdateNowBtn.disabled = true;
    appUpdateNowBtn.textContent =
      "Updating…";

    reloadForAppUpdate();
  }
);

document
  .getElementById("printBtn")
  .addEventListener(
    "click",
    () => {
      window.print();
    }
  );

async function clearSelectedWeek() {
  const confirmed = await showConfirmDialog({
    title: "Warning",
    message: "Clear all entries for this week?",
    detail: "This will remove the saved entries for the selected week.",
    confirmText: "Clear Week"
  });

  if (!confirmed) {
    return;
  }

  try {
    setStatus(
      LOCAL_MODE
        ? "Clearing local week…"
        : "Clearing cloud week…",
      false,
      "saving"
    );

    await TimesheetStorage.clear(
      weekStart.value
    );

    clearForm();

    setSaveButtonState("saved");

    setStatus(
      LOCAL_MODE
        ? "Local week cleared"
        : "Cloud week cleared",
      false,
      "saved"
    );

    updateClearButtonState();
  } catch (error) {
    console.error(error);

    setSaveButtonState("error");

    setStatus(
      `Unable to clear: ${error.message}`,
      true,
      "error"
    );
  }
}

resetBtn
  .addEventListener(
    "click",
    async () => {
      try {
        const allowed = await requireManagerSession(
          clearSelectedWeek
        );

        if (!allowed) {
          return;
        }

        await clearSelectedWeek();
      } catch (error) {
        console.error(error);
        setStatus(
          `Unable to verify manager access: ${error.message}`,
          true,
          "error"
        );
      }
    }
  );

function changeWeek(daysToAdd) {
  if (!weekStart.value) {
    return;
  }

  weekStart.value =
    addDaysToDateString(
      weekStart.value,
      daysToAdd
    );

  updateWeekEnd();
  updateCurrentWeekHighlight();
  load();
}

document
  .getElementById(
    "previousWeekBtn"
  )
  .addEventListener(
    "click",
    () => {
      changeWeek(-7);
    }
  );

document
  .getElementById(
    "nextWeekBtn"
  )
  .addEventListener(
    "click",
    () => {
      changeWeek(7);
    }
  );

goToCurrentWeekBtn.addEventListener(
  "click",
  goToCurrentWeek
);

/* =====================================================
   START APPLICATION
   ===================================================== */

async function initialiseApp() {
  addModeBadge();

  const today = new Date();

  weekStart.value =
    getCurrentWeekStartValue();

  updateCurrentWeekHighlight();

  document.getElementById(
    "managerDate"
  ).value =
    formatLocalDateValue(
      today
    );

  updateWeekEnd();
  setSaveButtonState("saved");

  await refreshManagerControlState();
  await load();
  updateClearButtonState();
}

if (!LOCAL_MODE) {
  db.auth.onAuthStateChange((_event, session) => {
    managerSignedIn = Boolean(session);
    applyManagerControlState();
  });
}


closeVersionHistoryBtn.addEventListener(
  "click",
  closeVersionHistory
);

versionHistoryModal
  .querySelectorAll("[data-close-version-history]")
  .forEach((element) => {
    element.addEventListener(
      "click",
      closeVersionHistory
    );
  });

initialiseApp();

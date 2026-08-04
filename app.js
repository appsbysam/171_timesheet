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
    role: "staff",
    display_order: 1
  },
  {
    id: "local-monique",
    name: "Monique",
    active: true,
    role: "staff",
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

const newManagerPinFields =
  document.getElementById("newManagerPinFields");

const newStaffPin =
  document.getElementById("newStaffPin");

const newStaffPinConfirm =
  document.getElementById("newStaffPinConfirm");

const activeStaffList =
  document.getElementById("activeStaffList");

const inactiveStaffList =
  document.getElementById("inactiveStaffList");

const inactiveStaffCount =
  document.getElementById("inactiveStaffCount");

const staffManagerMessage =
  document.getElementById("staffManagerMessage");

const resetPinModal =
  document.getElementById("resetPinModal");
const closeResetPinBtn =
  document.getElementById("closeResetPinBtn");
const cancelResetPinBtn =
  document.getElementById("cancelResetPinBtn");
const confirmResetPinBtn =
  document.getElementById("confirmResetPinBtn");
const resetPinTargetText =
  document.getElementById("resetPinTargetText");
const resetPinResult =
  document.getElementById("resetPinResult");
const resetPinValue =
  document.getElementById("resetPinValue");
const resetPinMessage =
  document.getElementById("resetPinMessage");

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

const managerMenuAuditBtn =
  document.getElementById("managerMenuAuditBtn");

const auditLogModal =
  document.getElementById("auditLogModal");

const closeAuditLogBtn =
  document.getElementById("closeAuditLogBtn");

const auditActionFilter =
  document.getElementById("auditActionFilter");

const auditUserFilter =
  document.getElementById("auditUserFilter");

const auditPeriodFilter =
  document.getElementById("auditPeriodFilter");

const auditLogStatus =
  document.getElementById("auditLogStatus");

const auditLogList =
  document.getElementById("auditLogList");

const auditLoadMoreBtn =
  document.getElementById("auditLoadMoreBtn");

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

const managerMenuChangePinBtn =
  document.getElementById("managerMenuChangePinBtn");

const managerOperationStatus =
  document.getElementById("managerOperationStatus");

const changePinModal =
  document.getElementById("changePinModal");

const closeChangePinBtn =
  document.getElementById("closeChangePinBtn");

const changePinForm =
  document.getElementById("changePinForm");

const currentManagerPin =
  document.getElementById("currentManagerPin");

const newManagerPin =
  document.getElementById("newManagerPin");

const confirmManagerPin =
  document.getElementById("confirmManagerPin");

const changePinSubmitBtn =
  document.getElementById("changePinSubmitBtn");

const changePinMessage =
  document.getElementById("changePinMessage");

const managerLoginModal =
  document.getElementById("managerLoginModal");

const closeManagerLoginBtn =
  document.getElementById("closeManagerLoginBtn");

const managerLoginForm =
  document.getElementById("managerLoginForm");

const managerLoginPin =
  document.getElementById("managerLoginPin");

const managerPinUserName =
  document.getElementById("managerPinUserName");

const managerPinStatusBar =
  document.getElementById("managerPinStatusBar");

const managerPinKeypad =
  document.getElementById("managerPinKeypad");

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

const userIdentityModal =
  document.getElementById("userIdentityModal");

const userIdentityForm =
  document.getElementById("userIdentityForm");

const userIdentityName =
  document.getElementById("userIdentityName");

const userIdentityMessage =
  document.getElementById("userIdentityMessage");

const userIdentityContinueBtn =
  document.getElementById("userIdentityContinueBtn");

const inactiveUserPanel =
  document.getElementById("inactiveUserPanel");

const inactiveUserMessage =
  document.getElementById("inactiveUserMessage");

const checkUserAgainBtn =
  document.getElementById("checkUserAgainBtn");

const inactiveManagerContinueBtn =
  document.getElementById("inactiveManagerContinueBtn");

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

const MANAGER_SESSION_STORAGE_KEY =
  "171-timesheet-user-pin-session-token";

let managerSessionToken =
  sessionStorage.getItem(
    MANAGER_SESSION_STORAGE_KEY
  ) || "";

let managerPinSubmitting = false;
let pendingResetPinMember = null;
let pinLoginResolution = null;
let pinLoginPurpose = "app";
let pinMustChangeAfterLogin = false;


/* =====================================================
   USER IDENTITY FOUNDATION — v3.1.0
   ===================================================== */

const USER_ID_STORAGE_KEY =
  "171-timesheet-user-id";

const USER_NAME_STORAGE_KEY =
  "171-timesheet-user-name";

const USER_ROLE_STORAGE_KEY =
  "171-timesheet-user-role";

const DEVICE_ID_STORAGE_KEY =
  "171-timesheet-device-id";

const DEVICE_TYPE_STORAGE_KEY =
  "171-timesheet-device-type";

let resolvedAppUser = null;
let identityResolution = null;
let inactiveRestrictedMode = false;
let autoOpenManagerModeAfterInit = false;

let lastSavedAuditSnapshot = new Map();
let pendingAuditChanges = new Map();
let pendingAuditWeek = "";
let auditFlushTimer = null;

const AUDIT_FLUSH_DELAY_MS =
  60 * 1000;

function createDeviceId() {
  if (
    window.crypto &&
    typeof window.crypto.randomUUID === "function"
  ) {
    return window.crypto
      .randomUUID()
      .replace(/-/g, "")
      .slice(0, 12)
      .toUpperCase();
  }

  return (
    Date.now().toString(16) +
    Math.random().toString(16).slice(2)
  )
    .slice(0, 12)
    .toUpperCase();
}

function detectDeviceType() {
  const userAgent =
    navigator.userAgent || "";

  if (/iPhone/i.test(userAgent)) {
    return "iPhone";
  }

  if (/Android/i.test(userAgent)) {
    return /Mobile/i.test(userAgent)
      ? "Android phone"
      : "Android device";
  }

  if (/iPad/i.test(userAgent)) {
    return "iPad";
  }

  return "Mobile device";
}

function ensureStoredDeviceIdentity() {
  let deviceId =
    localStorage.getItem(
      DEVICE_ID_STORAGE_KEY
    );

  if (
    !deviceId ||
    !/^[A-Z0-9]{8,40}$/.test(deviceId)
  ) {
    deviceId = createDeviceId();

    localStorage.setItem(
      DEVICE_ID_STORAGE_KEY,
      deviceId
    );
  }

  let deviceType =
    localStorage.getItem(
      DEVICE_TYPE_STORAGE_KEY
    );

  if (!deviceType) {
    deviceType = detectDeviceType();

    localStorage.setItem(
      DEVICE_TYPE_STORAGE_KEY,
      deviceType
    );
  }

  return {
    deviceId,
    deviceType
  };
}

function readStoredUserIdentity() {
  const id =
    localStorage.getItem(
      USER_ID_STORAGE_KEY
    );

  const name =
    localStorage.getItem(
      USER_NAME_STORAGE_KEY
    );

  if (!id || !name) {
    return null;
  }

  return {
    id,
    name
  };
}

function updateHeaderUserIdentity() {
  const headerUser =
    document.getElementById(
      "headerUserIdentity"
    );

  if (!headerUser) {
    return;
  }

  const storedName =
    localStorage.getItem(
      USER_NAME_STORAGE_KEY
    );

  headerUser.textContent =
    storedName
      ? `👤 ${storedName}`
      : "";
}

function isManagerRole(member) {
  return (
    String(member?.role || "staff")
      .trim()
      .toLowerCase() === "manager"
  );
}

function storeUserIdentity(member) {
  localStorage.setItem(
    USER_ID_STORAGE_KEY,
    String(member.id)
  );

  localStorage.setItem(
    USER_NAME_STORAGE_KEY,
    String(member.name)
  );

  localStorage.setItem(
    USER_ROLE_STORAGE_KEY,
    isManagerRole(member)
      ? "manager"
      : "staff"
  );

  const device =
    ensureStoredDeviceIdentity();

  resolvedAppUser = {
    id: String(member.id),
    name: String(member.name),
    active: member.active !== false,
    role:
      isManagerRole(member)
        ? "manager"
        : "staff",
    ...device
  };

  updateHeaderUserIdentity();

  return resolvedAppUser;
}

function clearStoredUserIdentity() {
  localStorage.removeItem(
    USER_ID_STORAGE_KEY
  );

  localStorage.removeItem(
    USER_NAME_STORAGE_KEY
  );

  localStorage.removeItem(
    USER_ROLE_STORAGE_KEY
  );

  resolvedAppUser = null;
  updateHeaderUserIdentity();
}

function showIdentityModal() {
  userIdentityModal.hidden = false;

  document.body.classList.add(
    "user-identity-modal-open"
  );
}

function hideIdentityModal() {
  userIdentityModal.hidden = true;

  document.body.classList.remove(
    "user-identity-modal-open"
  );
}

function showIdentityEntry() {
  showIdentityModal();

  userIdentityForm.hidden = false;
  inactiveUserPanel.hidden = true;

  userIdentityMessage.textContent = "";
  userIdentityMessage.classList.remove(
    "is-error",
    "is-success"
  );

  userIdentityContinueBtn.disabled = false;
  userIdentityContinueBtn.textContent =
    "Continue";

  window.setTimeout(() => {
    userIdentityName.focus();
  }, 50);
}

function showInactiveUser(member) {
  showIdentityModal();

  userIdentityForm.hidden = true;
  inactiveUserPanel.hidden = false;

  inactiveUserMessage.textContent =
    `Hi ${member.name}. Your username is not yet active. Please ask your manager to activate it. If you are a manager, you can continue and sign in to Manager Mode.`;
}

async function loadAllIdentityStaff() {
  return StaffStorage.loadAll();
}

function findStoredMember(
  allStaff,
  storedIdentity
) {
  const byId =
    allStaff.find(
      (member) =>
        String(member.id) ===
        String(storedIdentity.id)
    );

  if (byId) {
    return byId;
  }

  const storedName =
    String(storedIdentity.name)
      .trim()
      .toLocaleLowerCase();

  return allStaff.find(
    (member) =>
      String(member.name)
        .trim()
        .toLocaleLowerCase() ===
      storedName
  );
}


function applyInactiveRestrictedMode() {
  document.body.classList.toggle(
    "inactive-user-restricted",
    inactiveRestrictedMode &&
    !managerSignedIn
  );

  if (manageStaffBtn) {
    manageStaffBtn.hidden = false;
    manageStaffBtn.disabled = false;
    manageStaffBtn.textContent =
      managerSignedIn
        ? "👤 Manager Mode"
        : "🔐 Manager Mode";
  }
}

function continueInactiveUserToManagerMode() {
  inactiveRestrictedMode = true;
  hideIdentityModal();

  if (identityResolution) {
    identityResolution(true);
    identityResolution = null;
  }

  window.setTimeout(() => {
    applyInactiveRestrictedMode();
    openManagerLogin();
  }, 100);
}

inactiveManagerContinueBtn.addEventListener(
  "click",
  continueInactiveUserToManagerMode
);

async function resolveStoredIdentity() {
  const storedIdentity =
    readStoredUserIdentity();

  if (!storedIdentity) {
    return false;
  }

  try {
    const allStaff =
      await loadAllIdentityStaff();

    const member =
      findStoredMember(
        allStaff,
        storedIdentity
      );

    if (!member) {
      clearStoredUserIdentity();
      return false;
    }

    storeUserIdentity(member);

    if (
      member.active === false &&
      isManagerRole(member)
    ) {
      inactiveRestrictedMode = true;
      autoOpenManagerModeAfterInit = true;
      hideIdentityModal();
      return true;
    }

    if (member.active === false) {
      showInactiveUser(member);
      return null;
    }

    inactiveRestrictedMode = false;
    autoOpenManagerModeAfterInit = false;
    hideIdentityModal();
    return true;
  } catch (error) {
    console.error(
      "Unable to validate stored user:",
      error
    );

    showIdentityEntry();

    userIdentityMessage.textContent =
      "Unable to check your username. Please check your connection and try again.";

    userIdentityMessage.classList.add(
      "is-error"
    );

    return null;
  }
}

async function submitUserIdentity(name) {
  const cleanedName =
    String(name || "").trim();

  if (!cleanedName) {
    userIdentityMessage.textContent =
      "Please enter your first name.";

    userIdentityMessage.classList.add(
      "is-error"
    );

    return;
  }

  userIdentityContinueBtn.disabled = true;
  userIdentityContinueBtn.textContent =
    "Checking…";

  userIdentityMessage.textContent = "";
  userIdentityMessage.classList.remove(
    "is-error",
    "is-success"
  );

  try {
    const allStaff =
      await loadAllIdentityStaff();

    const normalisedName =
      cleanedName.toLocaleLowerCase();

    const member =
      allStaff.find(
        (person) =>
          String(person.name)
            .trim()
            .toLocaleLowerCase() ===
          normalisedName
      );

    if (!member) {
      userIdentityMessage.textContent =
        "User not found. Please check the spelling and try again. If the problem persists, contact support.";

      userIdentityMessage.classList.add(
        "is-error"
      );

      userIdentityContinueBtn.disabled =
        false;

      userIdentityContinueBtn.textContent =
        "Continue";

      userIdentityName.select();
      return;
    }

    storeUserIdentity(member);

    if (
      member.active === false &&
      isManagerRole(member)
    ) {
      inactiveRestrictedMode = true;
      autoOpenManagerModeAfterInit = true;
      hideIdentityModal();

      if (identityResolution) {
        identityResolution(true);
        identityResolution = null;
      }

      return;
    }

    if (member.active === false) {
      showInactiveUser(member);
      return;
    }

    autoOpenManagerModeAfterInit = false;

    userIdentityMessage.textContent =
      `Welcome, ${member.name}.`;

    userIdentityMessage.classList.add(
      "is-success"
    );

    inactiveRestrictedMode = false;
    hideIdentityModal();

    if (identityResolution) {
      identityResolution(true);
      identityResolution = null;
    }
  } catch (error) {
    console.error(
      "Unable to identify user:",
      error
    );

    userIdentityMessage.textContent =
      "Unable to check your username. Please check your connection and try again.";

    userIdentityMessage.classList.add(
      "is-error"
    );

    userIdentityContinueBtn.disabled =
      false;

    userIdentityContinueBtn.textContent =
      "Continue";
  }
}

async function ensureAppUserIdentity() {
  ensureStoredDeviceIdentity();

  const storedResult =
    await resolveStoredIdentity();

  if (storedResult === true) {
    return true;
  }

  if (storedResult === null) {
    return new Promise((resolve) => {
      identityResolution = resolve;
    });
  }

  showIdentityEntry();

  return new Promise((resolve) => {
    identityResolution = resolve;
  });
}

userIdentityForm.addEventListener(
  "submit",
  async (event) => {
    event.preventDefault();

    await submitUserIdentity(
      userIdentityName.value
    );
  }
);

checkUserAgainBtn.addEventListener(
  "click",
  async () => {
    checkUserAgainBtn.disabled = true;
    checkUserAgainBtn.textContent =
      "Checking…";

    try {
      const storedIdentity =
        readStoredUserIdentity();

      const allStaff =
        await loadAllIdentityStaff();

      const member =
        storedIdentity
          ? findStoredMember(
              allStaff,
              storedIdentity
            )
          : null;

      if (!member) {
        clearStoredUserIdentity();
        showIdentityEntry();

        userIdentityMessage.textContent =
          "User not found. Please enter your name again.";

        userIdentityMessage.classList.add(
          "is-error"
        );

        return;
      }

      storeUserIdentity(member);

      if (
        member.active === false &&
        isManagerRole(member)
      ) {
        inactiveRestrictedMode = true;
        autoOpenManagerModeAfterInit = true;
        hideIdentityModal();

        if (identityResolution) {
          identityResolution(true);
          identityResolution = null;
        }

        return;
      }

      if (member.active === false) {
        inactiveUserMessage.textContent =
          `Hi ${member.name}. Your username is still not active. Please ask your manager to activate it. If you are a manager, you can continue and sign in to Manager Mode.`;

        return;
      }

      inactiveRestrictedMode = false;
      autoOpenManagerModeAfterInit = false;
      hideIdentityModal();

      if (identityResolution) {
        identityResolution(true);
        identityResolution = null;
      }
    } catch (error) {
      console.error(
        "Unable to recheck user:",
        error
      );

      inactiveUserMessage.textContent =
        "Unable to check your username. Please check your connection and try again.";
    } finally {
      checkUserAgainBtn.disabled = false;
      checkUserAgainBtn.textContent =
        "Check Again";
    }
  }
);

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


/* =====================================================
   AUDIT LOG — v3.2.0
   ===================================================== */

const AuditStorage = {
  async insert(entry) {
    if (LOCAL_MODE) {
      const key =
        "171-timesheet-local-audit-log";

      const existing =
        JSON.parse(
          localStorage.getItem(key) ||
          "[]"
        );

      existing.push({
        id:
          typeof crypto?.randomUUID ===
          "function"
            ? crypto.randomUUID()
            : String(Date.now()),

        created_at:
          new Date().toISOString(),

        ...entry
      });

      localStorage.setItem(
        key,
        JSON.stringify(existing)
      );

      return;
    }

    const { error } =
      await db
        .from("audit_log")
        .insert(entry);

    if (error) {
      throw error;
    }
  },

  async list({
    actionType = "",
    changedBy = "",
    period = "week",
    offset = 0,
    limit = 20
  } = {}) {
    if (LOCAL_MODE) {
      const records =
        JSON.parse(
          localStorage.getItem(
            "171-timesheet-local-audit-log"
          ) || "[]"
        );

      const cutoff =
        getAuditPeriodCutoff(period);

      const filtered =
        records
          .filter((entry) => {
            if (
              actionType &&
              entry.action_type !== actionType
            ) {
              return false;
            }

            if (
              changedBy &&
              entry.changed_by_name !== changedBy
            ) {
              return false;
            }

            if (
              cutoff &&
              new Date(entry.created_at) < cutoff
            ) {
              return false;
            }

            return true;
          })
          .sort(
            (a, b) =>
              new Date(b.created_at) -
              new Date(a.created_at)
          );

      return filtered.slice(
        offset,
        offset + limit
      );
    }

    const cutoff =
      getAuditPeriodCutoff(period);

    const { data, error } =
      await db.rpc(
        "manager_list_audit",
        {
          p_token:
            managerSessionToken,
          p_action_type:
            actionType || null,
          p_changed_by:
            changedBy || null,
          p_created_after:
            cutoff
              ? cutoff.toISOString()
              : null,
          p_offset:
            offset,
          p_limit:
            limit
        }
      );

    if (error) {
      throw error;
    }

    return data || [];
  }
};


const AUDIT_PAGE_SIZE = 20;

let auditLogOffset = 0;
let auditLogHasMore = false;
let auditLogLoading = false;

function getAuditPeriodCutoff(period) {
  if (period === "all") {
    return null;
  }

  const now = new Date();

  if (period === "30days") {
    const cutoff = new Date(now);
    cutoff.setDate(
      cutoff.getDate() - 30
    );
    return cutoff;
  }

  const cutoff = new Date(now);
  const day = cutoff.getDay();
  const daysSinceMonday =
    day === 0 ? 6 : day - 1;

  cutoff.setDate(
    cutoff.getDate() -
    daysSinceMonday
  );

  cutoff.setHours(0, 0, 0, 0);

  return cutoff;
}

function formatAuditDateTime(value) {
  if (!value) {
    return "Unknown time";
  }

  const date = new Date(value);

  if (Number.isNaN(date.getTime())) {
    return String(value);
  }

  return new Intl.DateTimeFormat(
    "en-AU",
    {
      day: "2-digit",
      month: "short",
      year: "numeric",
      hour: "numeric",
      minute: "2-digit",
      hour12: true
    }
  ).format(date);
}

function formatAuditWeek(value) {
  if (!value) {
    return "";
  }

  return formatDateForMessage(value);
}

function escapeAuditText(value) {
  return String(value ?? "")
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

function auditActionLabel(actionType) {
  const labels = {
    "Updated timesheet":
      "Updated Timesheet",
    "Cleared week":
      "Cleared Week",
    "Copied previous week":
      "Copied Previous Week"
  };

  return labels[actionType] ||
    actionType ||
    "Audit Event";
}

function buildAuditSummary(entry) {
  if (entry.details) {
    return String(entry.details)
      .split("\n")
      .filter(Boolean);
  }

  if (
    entry.day_name ||
    entry.employee_name ||
    entry.field_name
  ) {
    const oldDisplay =
      entry.old_value
        ? formatAuditTime(entry.old_value)
        : "blank";

    const newDisplay =
      entry.new_value
        ? formatAuditTime(entry.new_value)
        : "blank";

    return [
      [
        entry.day_name,
        entry.employee_name,
        entry.field_name
      ]
        .filter(Boolean)
        .join(" — ") +
      `: ${oldDisplay} → ${newDisplay}`
    ];
  }

  return [
    "No additional change details were recorded."
  ];
}

function createAuditCard(entry) {
  const card =
    document.createElement("article");

  card.className =
    "audit-entry-card";

  const role =
    entry.performed_role === "Manager"
      ? "Manager"
      : "Staff";

  const roleClass =
    role === "Manager"
      ? "is-manager"
      : "is-staff";

  const summaryLines =
    buildAuditSummary(entry);

  const summaryHtml =
    summaryLines
      .map(
        (line) =>
          `<div class="audit-change-line">${escapeAuditText(line)}</div>`
      )
      .join("");

  const weekHtml =
    entry.week_start
      ? `
        <div class="audit-entry-week">
          <span>Week</span>
          <strong>${escapeAuditText(
            formatAuditWeek(
              entry.week_start
            )
          )}</strong>
        </div>
      `
      : "";

  card.innerHTML = `
    <div class="audit-entry-top">
      <div>
        <h3>${escapeAuditText(
          auditActionLabel(
            entry.action_type
          )
        )}</h3>

        <div class="audit-entry-person">
          <span>👤 ${escapeAuditText(
            entry.changed_by_name ||
            "Unknown user"
          )}</span>

          <span class="audit-role-badge ${roleClass}">
            ${escapeAuditText(role)}
          </span>
        </div>
      </div>

      <time datetime="${escapeAuditText(
        entry.created_at || ""
      )}">
        ${escapeAuditText(
          formatAuditDateTime(
            entry.created_at
          )
        )}
      </time>
    </div>

    ${weekHtml}

    <div class="audit-entry-changes">
      ${summaryHtml}
    </div>

    <details class="audit-device-details">
      <summary>Show Device Details</summary>

      <dl>
        <div>
          <dt>Device ID</dt>
          <dd>${escapeAuditText(
            entry.device_id ||
            "Not recorded"
          )}</dd>
        </div>

        <div>
          <dt>Device</dt>
          <dd>${escapeAuditText(
            entry.device_type ||
            "Not recorded"
          )}</dd>
        </div>

        <div>
          <dt>Environment</dt>
          <dd>${escapeAuditText(
            entry.environment ||
            "Not recorded"
          )}</dd>
        </div>

        <div>
          <dt>Record ID</dt>
          <dd>${escapeAuditText(
            entry.id ||
            "Not recorded"
          )}</dd>
        </div>
      </dl>
    </details>
  `;

  const details =
    card.querySelector(
      ".audit-device-details"
    );

  const summary =
    details.querySelector("summary");

  details.addEventListener(
    "toggle",
    () => {
      summary.textContent =
        details.open
          ? "Hide Device Details"
          : "Show Device Details";
    }
  );

  return card;
}

function setAuditLogStatus(
  message,
  state = "ready"
) {
  auditLogStatus.textContent = message;
  auditLogStatus.className =
    `audit-log-status is-${state}`;
}

async function populateAuditUserFilter() {
  const selected =
    auditUserFilter.value;

  try {
    const allStaff =
      await StaffStorage.loadAll();

    const names =
      [...new Set(
        allStaff
          .map(
            (member) =>
              String(member.name || "")
                .trim()
          )
          .filter(Boolean)
      )]
        .sort(
          (a, b) =>
            a.localeCompare(b)
        );

    auditUserFilter.innerHTML =
      '<option value="">All users</option>';

    names.forEach((name) => {
      const option =
        document.createElement(
          "option"
        );

      option.value = name;
      option.textContent = name;

      auditUserFilter.appendChild(
        option
      );
    });

    auditUserFilter.value =
      names.includes(selected)
        ? selected
        : "";
  } catch (error) {
    console.warn(
      "Unable to populate audit users:",
      error
    );
  }
}

async function loadAuditLog({
  reset = false
} = {}) {
  if (auditLogLoading) {
    return;
  }

  auditLogLoading = true;

  if (reset) {
    auditLogOffset = 0;
    auditLogList.innerHTML = "";
    auditLoadMoreBtn.hidden = true;

    setAuditLogStatus(
      "Loading audit records…",
      "loading"
    );
  } else {
    auditLoadMoreBtn.disabled = true;
    auditLoadMoreBtn.textContent =
      "Loading…";
  }

  try {
    const rows =
      await AuditStorage.list({
        actionType:
          auditActionFilter.value,

        changedBy:
          auditUserFilter.value,

        period:
          auditPeriodFilter.value,

        offset:
          auditLogOffset,

        limit:
          AUDIT_PAGE_SIZE + 1
      });

    const visibleRows =
      rows.slice(
        0,
        AUDIT_PAGE_SIZE
      );

    auditLogHasMore =
      rows.length >
      AUDIT_PAGE_SIZE;

    visibleRows.forEach((entry) => {
      auditLogList.appendChild(
        createAuditCard(entry)
      );
    });

    auditLogOffset +=
      visibleRows.length;

    auditLoadMoreBtn.hidden =
      !auditLogHasMore;

    auditLoadMoreBtn.disabled =
      false;

    auditLoadMoreBtn.textContent =
      "Load More";

    if (
      !auditLogList.children.length
    ) {
      auditLogList.innerHTML = `
        <div class="audit-log-empty">
          No audit records match the selected filters.
        </div>
      `;
    }

    setAuditLogStatus(
      `${auditLogOffset} record${
        auditLogOffset === 1 ? "" : "s"
      } shown`,
      "ready"
    );
  } catch (error) {
    console.error(
      "Unable to load audit log:",
      error
    );

    if (
      !auditLogList.children.length
    ) {
      auditLogList.innerHTML = `
        <div class="audit-log-error">
          Unable to load the audit log.
          Please check your connection and try again.
        </div>
      `;
    }

    setAuditLogStatus(
      `Unable to load audit log: ${error.message}`,
      "error"
    );
  } finally {
    auditLogLoading = false;
  }
}

async function openAuditLog() {
  try {
    const allowed =
      await requireManagerSession();

    if (!allowed) {
      return;
    }

    closeManagerMenu();

    auditLogModal.hidden = false;

    document.body.classList.add(
      "audit-log-modal-open"
    );

    await flushPendingAudit();
    await populateAuditUserFilter();
    await loadAuditLog({
      reset: true
    });
  } catch (error) {
    console.error(error);

    openManagerLogin();

    setManagerLoginMessage(
      error.message,
      true
    );
  }
}

function closeAuditLog() {
  auditLogModal.hidden = true;

  document.body.classList.remove(
    "audit-log-modal-open"
  );
}

function resetAndLoadAuditLog() {
  loadAuditLog({
    reset: true
  });
}

function normaliseAuditValue(value) {
  return value == null
    ? ""
    : String(value);
}

function formatAuditTime(value) {
  if (!value) {
    return "blank";
  }

  const [hours, minutes] =
    String(value)
      .split(":")
      .map(Number);

  if (
    Number.isNaN(hours) ||
    Number.isNaN(minutes)
  ) {
    return String(value);
  }

  const suffix =
    hours >= 12 ? "pm" : "am";

  const displayHour =
    hours % 12 || 12;

  return `${displayHour}:${String(
    minutes
  ).padStart(2, "0")} ${suffix}`;
}

function buildAuditSnapshot(rows) {
  const snapshot = new Map();

  let metadata = {};

  try {
    metadata =
      JSON.parse(
        rows[0]?.notes || "{}"
      );
  } catch {
    metadata = {};
  }

  const splitShifts =
    metadata.splitShifts || {};

  rows.forEach((row) => {
    const baseKey =
      `${row.employee}::${row.day}`;

    const split =
      splitShifts[baseKey] || {};

    snapshot.set(
      `${baseKey}::start`,
      {
        employee: row.employee,
        day: row.day,
        field: "Start",
        value:
          normaliseAuditValue(
            row.start_time
          )
      }
    );

    snapshot.set(
      `${baseKey}::finish`,
      {
        employee: row.employee,
        day: row.day,
        field: "Finish",
        value:
          normaliseAuditValue(
            row.finish_time
          )
      }
    );

    snapshot.set(
      `${baseKey}::split_start`,
      {
        employee: row.employee,
        day: row.day,
        field: "Split start",
        value:
          normaliseAuditValue(
            split.start
          )
      }
    );

    snapshot.set(
      `${baseKey}::split_finish`,
      {
        employee: row.employee,
        day: row.day,
        field: "Split finish",
        value:
          normaliseAuditValue(
            split.finish
          )
      }
    );
  });

  return snapshot;
}

function collectAuditDifferences(
  previousSnapshot,
  nextSnapshot
) {
  const differences = [];

  const keys =
    new Set([
      ...previousSnapshot.keys(),
      ...nextSnapshot.keys()
    ]);

  keys.forEach((key) => {
    const previous =
      previousSnapshot.get(key);

    const next =
      nextSnapshot.get(key);

    const oldValue =
      previous?.value || "";

    const newValue =
      next?.value || "";

    if (oldValue === newValue) {
      return;
    }

    const reference =
      next || previous;

    differences.push({
      key,
      employee:
        reference.employee,
      day:
        reference.day,
      field:
        reference.field,
      oldValue,
      newValue
    });
  });

  return differences;
}

function mergePendingAuditChanges(
  week,
  differences
) {
  if (!differences.length) {
    return;
  }

  if (
    pendingAuditWeek &&
    pendingAuditWeek !== week
  ) {
    flushPendingAudit();
  }

  pendingAuditWeek = week;

  differences.forEach((change) => {
    const existing =
      pendingAuditChanges.get(
        change.key
      );

    if (existing) {
      existing.newValue =
        change.newValue;

      if (
        existing.oldValue ===
        existing.newValue
      ) {
        pendingAuditChanges.delete(
          change.key
        );
      }

      return;
    }

    pendingAuditChanges.set(
      change.key,
      { ...change }
    );
  });

  scheduleAuditFlush();
}

function scheduleAuditFlush() {
  clearTimeout(auditFlushTimer);

  auditFlushTimer =
    setTimeout(
      () => {
        flushPendingAudit();
      },
      AUDIT_FLUSH_DELAY_MS
    );
}

function buildAuditDetails(changes) {
  return changes
    .map((change) => {
      const oldDisplay =
        formatAuditTime(
          change.oldValue
        );

      const newDisplay =
        formatAuditTime(
          change.newValue
        );

      return (
        `${change.day} — ` +
        `${change.employee} — ` +
        `${change.field}: ` +
        `${oldDisplay} → ${newDisplay}`
      );
    })
    .join("\n");
}

async function flushPendingAudit() {
  clearTimeout(auditFlushTimer);
  auditFlushTimer = null;

  if (
    !pendingAuditChanges.size ||
    !pendingAuditWeek ||
    !resolvedAppUser
  ) {
    return true;
  }

  const changes =
    [...pendingAuditChanges.values()];

  const entry = {
    changed_by_staff_id:
      resolvedAppUser.id || null,

    changed_by_name:
      resolvedAppUser.name,

    device_id:
      resolvedAppUser.deviceId || null,

    device_type:
      resolvedAppUser.deviceType || null,

    action_type:
      "Updated timesheet",

    performed_role:
      managerSignedIn
        ? "Manager"
        : "Staff",

    week_start:
      pendingAuditWeek,

    employee_name:
      changes.length === 1
        ? changes[0].employee
        : null,

    day_name:
      changes.length === 1
        ? changes[0].day
        : null,

    field_name:
      changes.length === 1
        ? changes[0].field
        : null,

    old_value:
      changes.length === 1
        ? changes[0].oldValue || null
        : null,

    new_value:
      changes.length === 1
        ? changes[0].newValue || null
        : null,

    details:
      buildAuditDetails(changes),

    environment:
      window.APP_CONFIG.environment ||
      (
        window.APP_CONFIG.isDevelopment
          ? "development"
          : "production"
      )
  };

  try {
    await AuditStorage.insert(entry);

    pendingAuditChanges.clear();
    pendingAuditWeek = "";

    return true;
  } catch (error) {
    console.error(
      "Unable to save audit log:",
      error
    );

    scheduleAuditFlush();
    return false;
  }
}

function resetAuditBaseline(rows) {
  lastSavedAuditSnapshot =
    buildAuditSnapshot(rows);
}

async function logImmediateAudit({
  actionType,
  week = null,
  details = null,
  employee = null,
  day = null,
  field = null,
  oldValue = null,
  newValue = null
}) {
  if (!resolvedAppUser) {
    return;
  }

  await flushPendingAudit();

  try {
    await AuditStorage.insert({
      changed_by_staff_id:
        resolvedAppUser.id || null,

      changed_by_name:
        resolvedAppUser.name,

      device_id:
        resolvedAppUser.deviceId || null,

      device_type:
        resolvedAppUser.deviceType || null,

      action_type:
        actionType,

      performed_role:
        managerSignedIn
          ? "Manager"
          : "Staff",

      week_start:
        week,

      employee_name:
        employee,

      day_name:
        day,

      field_name:
        field,

      old_value:
        oldValue,

      new_value:
        newValue,

      details,

      environment:
        window.APP_CONFIG.environment ||
        (
          window.APP_CONFIG.isDevelopment
            ? "development"
            : "production"
        )
    });
  } catch (error) {
    console.error(
      "Unable to save immediate audit entry:",
      error
    );
  }
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
      .select("id, name, active, role, created_at, display_order")
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

  async add(
    name,
    role = "staff",
    pin = "",
    active = true
  ) {
    const cleanedName = name.trim();
    const cleanedRole =
      role === "manager"
        ? "manager"
        : "staff";

    const allStaff = await this.loadAll();

    if (
      allStaff.some(
        (member) =>
          member.name.trim().toLowerCase() ===
          cleanedName.toLowerCase()
      )
    ) {
      throw new Error(
        "A user with that name already exists."
      );
    }

    const nextOrder =
      allStaff.reduce(
        (highest, member) =>
          Math.max(
            highest,
            Number(
              member.display_order || 0
            )
          ),
        0
      ) + 1;

    if (LOCAL_MODE) {
      const member = {
        id:
          `local-${Date.now()}-${Math.random()
            .toString(16)
            .slice(2)}`,
        name: cleanedName,
        active: Boolean(active),
        role: cleanedRole,
        display_order: nextOrder,
        created_at:
          new Date().toISOString()
      };

      allStaff.push(member);

      localStorage.setItem(
        staffStorageKey(),
        JSON.stringify(allStaff)
      );

      return member;
    }

    const { data, error } =
      await db.rpc(
        "manager_add_staff",
        {
          p_token:
            managerSessionToken,
          p_name:
            cleanedName,
          p_role:
            cleanedRole,
          p_pin:
            pin,
          p_active:
            Boolean(active)
        }
      );

    if (error) {
      throw error;
    }

    return Array.isArray(data)
      ? data[0]
      : data;
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

    const { error } =
      await db.rpc(
        "manager_update_staff",
        {
          p_token:
            managerSessionToken,
          p_staff_id:
            id,
          p_name:
            cleanedName,
          p_active:
            null,
          p_role:
            null
        }
      );

    if (error) {
      throw error;
    }
  },

  async resetUserPin(id) {
    if (LOCAL_MODE) {
      return {
        success: true,
        temporary_pin: "0000"
      };
    }

    const { data, error } =
      await db.rpc(
        "manager_reset_user_pin",
        {
          p_token: managerSessionToken,
          p_staff_id: id
        }
      );

    if (error) {
      throw error;
    }

    return data;
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

    const { error } =
      await db.rpc(
        "manager_update_staff",
        {
          p_token:
            managerSessionToken,
          p_staff_id:
            id,
          p_name:
            null,
          p_active:
            active,
          p_role:
            null
        }
      );

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

    resetAuditBaseline(
      collectRows()
    );

    await logImmediateAudit({
      actionType:
        "Copied previous week",

      week:
        destinationWeek,

      details:
        `Copied timesheet entries from week starting ${formatDateForMessage(sourceWeek)} into week starting ${formatDateForMessage(destinationWeek)}.`
    });

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
  applyInactiveRestrictedMode();
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
  version.textContent = `Version ${window.APP_DISPLAY_VERSION || "3.5.2"}`;
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

  const versionRow =
    document.createElement("div");

  versionRow.className =
    "header-user-version-row";

  const headerUser =
    document.createElement("span");

  headerUser.id =
    "headerUserIdentity";

  headerUser.className =
    "header-user-identity";

  versionRow.appendChild(headerUser);
  versionRow.appendChild(version);

  wrapper.appendChild(badgeRow);
  wrapper.appendChild(versionRow);

  header.appendChild(wrapper);

  updateHeaderUserIdentity();
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

  await flushPendingAudit();

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

  const nextAuditSnapshot =
    buildAuditSnapshot(rows);

  const auditDifferences =
    collectAuditDifferences(
      lastSavedAuditSnapshot,
      nextAuditSnapshot
    );

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

    mergePendingAuditChanges(
      weekStart.value,
      auditDifferences
    );

    lastSavedAuditSnapshot =
      nextAuditSnapshot;

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

    resetAuditBaseline(
      collectRows()
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

  const nameText =
    document.createElement("span");

  nameText.textContent = member.name;

  const roleBadge =
    document.createElement("span");

  roleBadge.className =
    `staff-role-badge is-${member.role || "staff"}`;

  roleBadge.textContent =
    member.role === "manager"
      ? "Manager"
      : "Staff";

  name.append(
    nameText,
    roleBadge
  );

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

  const resetPinButton =
    document.createElement("button");

  resetPinButton.type = "button";
  resetPinButton.className =
    "staff-reset-pin-btn";

  resetPinButton.textContent =
    "Reset PIN";

  resetPinButton.addEventListener(
    "click",
    () => openResetPinModal(member)
  );

  actions.appendChild(
    resetPinButton
  );

  row.append(order, name, actions);
  return row;
}

function showManagerOperationStatus(
  message,
  state = "working",
  autoHideMs = 0
) {
  if (!managerOperationStatus) {
    return;
  }

  managerOperationStatus.hidden = false;
  managerOperationStatus.textContent = message;
  managerOperationStatus.className =
    `manager-operation-status is-${state}`;

  if (autoHideMs > 0) {
    window.setTimeout(() => {
      if (
        managerOperationStatus.textContent ===
        message
      ) {
        managerOperationStatus.hidden = true;
      }
    }, autoHideMs);
  }
}

function setManagerPinStatus(
  message,
  state = "ready"
) {
  managerPinStatusBar.className =
    `manager-pin-user is-${state}`;

  managerPinStatusBar.textContent =
    message;
}

function setManagerLoginMessage(
  message,
  isError = false
) {
  managerLoginMessage.textContent =
    message;

  managerLoginMessage.classList.toggle(
    "error",
    isError
  );

  if (!message) {
    const name =
      resolvedAppUser?.name ||
      localStorage.getItem(
        USER_NAME_STORAGE_KEY
      ) ||
      "Manager";

    managerPinStatusBar.className =
      "manager-pin-user is-ready";

    managerPinStatusBar.innerHTML =
      `Signing in as <strong>${name}</strong>`;

    return;
  }

  const normalised =
    String(message).toLowerCase();

  if (
    normalised.includes(
      "checking"
    )
  ) {
    setManagerPinStatus(
      "Checking PIN...",
      "checking"
    );

    return;
  }

  if (
    isError &&
    normalised.includes(
      "locked"
    )
  ) {
    setManagerPinStatus(
      message,
      "locked"
    );

    return;
  }

  if (isError) {
    setManagerPinStatus(
      message === "Incorrect PIN."
        ? "Incorrect PIN. Please try again."
        : message,
      "error"
    );

    return;
  }

  setManagerPinStatus(
    message,
    "success"
  );
}

function updateManagerPinDots() {
  const length =
    managerLoginPin.value.length;

  managerLoginModal
    .querySelectorAll(
      ".manager-pin-dots span"
    )
    .forEach(
      (dot, index) => {
        dot.classList.toggle(
          "is-filled",
          index < length
        );
      }
    );
}

function setManagerPinValue(value) {
  if (managerPinSubmitting) {
    return;
  }

  managerLoginPin.value =
    String(value)
      .replace(/\D/g, "")
      .slice(0, 4);

  updateManagerPinDots();

  if (
    managerLoginPin.value.length === 4 &&
    !managerLoginSubmitBtn.disabled
  ) {
    window.setTimeout(() => {
      if (
        managerLoginPin.value.length === 4 &&
        !managerPinSubmitting
      ) {
        managerLoginForm.requestSubmit();
      }
    }, 80);
  }
}

function openManagerLogin() {
  managerPinSubmitting = false;

  setManagerLoginMessage("");
  setManagerPinValue("");

  const managerName =
    resolvedAppUser?.name ||
    localStorage.getItem(
      USER_NAME_STORAGE_KEY
    ) ||
    "Manager";

  managerPinUserName.textContent =
    managerName;

  managerPinStatusBar.className =
    "manager-pin-user is-ready";

  managerPinStatusBar.innerHTML =
    `Enter PIN for <strong>${managerName}</strong>`;

  managerLoginModal.hidden = false;

  document.body.classList.add(
    "staff-modal-open"
  );

  updateManagerPinDots();
}

function closeManagerLogin() {
  managerLoginModal.hidden = true;

  if (
    staffModal.hidden &&
    changePinModal.hidden
  ) {
    document.body.classList.remove(
      "staff-modal-open"
    );
  }
}

async function getUserPinSession() {
  if (LOCAL_MODE) {
    return managerSessionToken
      ? {
          valid: true,
          staff_id:
            resolvedAppUser?.id,
          name:
            resolvedAppUser?.name,
          role:
            resolvedAppUser?.role || "staff"
        }
      : null;
  }

  if (!managerSessionToken) {
    return null;
  }

  const { data, error } =
    await db.rpc(
      "user_validate_pin_session",
      {
        p_token:
          managerSessionToken
      }
    );

  if (error || !data?.valid) {
    managerSessionToken = "";

    sessionStorage.removeItem(
      MANAGER_SESSION_STORAGE_KEY
    );

    return null;
  }

  return data;
}

async function getManagerSession() {
  const session =
    await getUserPinSession();

  if (
    !session ||
    session.role !== "manager"
  ) {
    return null;
  }

  return session;
}

async function ensureUserPinSession() {
  const existing =
    await getUserPinSession();

  if (existing) {
    return true;
  }

  pinLoginPurpose = "app";
  openManagerLogin();

  return new Promise((resolve) => {
    pinLoginResolution = resolve;
  });
}

async function requireManagerSession(
  onAuthenticated = null
) {
  const session =
    await getManagerSession();

  if (session) {
    managerSignedIn = true;
    return true;
  }

  managerSignedIn = false;
  pinLoginPurpose = "manager";

  pendingManagerAction =
    typeof onAuthenticated ===
    "function"
      ? onAuthenticated
      : null;

  openManagerLogin();
  return false;
}

function setChangePinMessage(
  message,
  isError = false
) {
  changePinMessage.textContent =
    message;

  changePinMessage.classList.toggle(
    "error",
    isError
  );
}

function openChangePinModal() {
  setChangePinMessage("");

  currentManagerPin.value = "";
  newManagerPin.value = "";
  confirmManagerPin.value = "";

  changePinModal.hidden = false;

  document.body.classList.add(
    "staff-modal-open"
  );

  setTimeout(
    () => currentManagerPin.focus(),
    0
  );
}

function closeChangePinModal() {
  changePinModal.hidden = true;

  if (
    staffModal.hidden &&
    managerLoginModal.hidden &&
    managerMenuModal.hidden
  ) {
    document.body.classList.remove(
      "staff-modal-open"
    );
  }
}

function setResetPinMessage(message, isError = false) {
  resetPinMessage.textContent = message;
  resetPinMessage.classList.toggle("error", isError);
}

function openResetPinModal(member) {
  pendingResetPinMember = member;
  resetPinTargetText.textContent =
    `Reset the PIN for ${member.name}?`;
  resetPinResult.hidden = true;
  resetPinValue.textContent = "";
  setResetPinMessage("");
  confirmResetPinBtn.hidden = false;
  confirmResetPinBtn.disabled = false;
  confirmResetPinBtn.textContent = "Reset PIN";
  cancelResetPinBtn.textContent = "Cancel";
  resetPinModal.hidden = false;
  document.body.classList.add("staff-modal-open");
}

function closeResetPinModal() {
  resetPinModal.hidden = true;
  pendingResetPinMember = null;
}

async function confirmResetPin() {
  if (!pendingResetPinMember) return;

  const member = pendingResetPinMember;

  try {
    confirmResetPinBtn.disabled = true;
    confirmResetPinBtn.textContent = "Resetting...";
    setResetPinMessage("Resetting user PIN...");

    const result =
      await StaffStorage.resetUserPin(member.id);

    if (!result?.success) {
      throw new Error(
        result?.message || "Unable to reset PIN."
      );
    }

    resetPinValue.textContent =
      result.temporary_pin;
    resetPinResult.hidden = false;
    setResetPinMessage(
      `${member.name}'s PIN was reset successfully.`
    );
    confirmResetPinBtn.hidden = true;
    cancelResetPinBtn.textContent = "Close";

    await logImmediateAudit({
      actionType: "Reset user PIN",
      details:
        `Reset the PIN for ${member.name}.`,
      employee: member.name
    });
  } catch (error) {
    console.error(error);
    setResetPinMessage(
      error.message || "Unable to reset PIN.",
      true
    );
    confirmResetPinBtn.disabled = false;
    confirmResetPinBtn.textContent = "Reset PIN";
  }
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

  if (
    staffModal.hidden &&
    managerLoginModal.hidden &&
    auditLogModal.hidden
  ) {
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

managerMenuAuditBtn.addEventListener(
  "click",
  openAuditLog
);

closeAuditLogBtn.addEventListener(
  "click",
  closeAuditLog
);

auditLogModal
  .querySelectorAll(
    "[data-close-audit-log]"
  )
  .forEach((element) => {
    element.addEventListener(
      "click",
      closeAuditLog
    );
  });

auditActionFilter.addEventListener(
  "change",
  resetAndLoadAuditLog
);

auditUserFilter.addEventListener(
  "change",
  resetAndLoadAuditLog
);

auditPeriodFilter.addEventListener(
  "change",
  resetAndLoadAuditLog
);

auditLoadMoreBtn.addEventListener(
  "click",
  () => {
    loadAuditLog();
  }
);

managerMenuCopyPreviousBtn.addEventListener(
  "click",
  copyPreviousWeek
);

managerMenuGenerateRosterBtn.addEventListener(
  "click",
  openRosterModal
);

managerMenuChangePinBtn.addEventListener(
  "click",
  () => {
    closeManagerMenu();
    openChangePinModal();
  }
);

closeChangePinBtn.addEventListener(
  "click",
  closeChangePinModal
);

changePinModal
  .querySelectorAll(
    "[data-close-change-pin]"
  )
  .forEach((element) => {
    element.addEventListener(
      "click",
      closeChangePinModal
    );
  });

changePinForm.addEventListener(
  "submit",
  async (event) => {
    event.preventDefault();

    const currentPin =
      currentManagerPin.value;

    const nextPin =
      newManagerPin.value;

    const confirmation =
      confirmManagerPin.value;

    if (
      !/^\d{4}$/.test(currentPin) ||
      !/^\d{4}$/.test(nextPin)
    ) {
      setChangePinMessage(
        "PINs must contain exactly four digits.",
        true
      );

      return;
    }

    if (nextPin !== confirmation) {
      setChangePinMessage(
        "The new PINs do not match.",
        true
      );

      return;
    }

    if (currentPin === nextPin) {
      setChangePinMessage(
        "Choose a different new PIN.",
        true
      );

      return;
    }

    try {
      changePinSubmitBtn.disabled =
        true;

      changePinSubmitBtn.textContent =
        "Saving…";

      if (!LOCAL_MODE) {
        const { data, error } =
          await db.rpc(
            "user_change_pin",
            {
              p_token:
                managerSessionToken,
              p_current_pin:
                currentPin,
              p_new_pin:
                nextPin
            }
          );

        if (error) {
          throw error;
        }

        if (!data?.success) {
          throw new Error(
            data?.message ||
            "Unable to change PIN."
          );
        }
      }

      setChangePinMessage(
        "PIN changed successfully."
      );

      pinMustChangeAfterLogin = false;

      window.setTimeout(() => {
        closeChangePinModal();

        if (
          pinLoginPurpose === "app" &&
          pinLoginResolution
        ) {
          pinLoginResolution(true);
          pinLoginResolution = null;
        } else if (
          pinLoginPurpose === "manager"
        ) {
          openManagerMenu();
        }
      }, 650);
    } catch (error) {
      console.error(error);

      setChangePinMessage(
        error.message ||
        "Unable to change PIN.",
        true
      );
    } finally {
      changePinSubmitBtn.disabled =
        false;

      changePinSubmitBtn.textContent =
        "Save New PIN";
    }
  }
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

closeResetPinBtn.addEventListener(
  "click",
  closeResetPinModal
);
cancelResetPinBtn.addEventListener(
  "click",
  closeResetPinModal
);
confirmResetPinBtn.addEventListener(
  "click",
  confirmResetPin
);
resetPinModal
  .querySelectorAll("[data-close-reset-pin]")
  .forEach((element) => {
    element.addEventListener(
      "click",
      closeResetPinModal
    );
  });
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

managerLoginPin.addEventListener(
  "input",
  () => {
    setManagerPinValue(
      managerLoginPin.value
    );
  }
);

managerPinKeypad.addEventListener(
  "click",
  (event) => {
    if (managerPinSubmitting) {
      return;
    }

    const digitButton =
      event.target.closest(
        "[data-pin-digit]"
      );

    if (digitButton) {
      setManagerPinValue(
        managerLoginPin.value +
        digitButton.dataset.pinDigit
      );
      return;
    }

    if (event.target.closest("[data-pin-clear]")) {
      setManagerPinValue("");
      return;
    }

    if (event.target.closest("[data-pin-backspace]")) {
      setManagerPinValue(
        managerLoginPin.value.slice(0, -1)
      );
    }
  }
);

managerLoginForm.addEventListener(
  "submit",
  async (event) => {
    event.preventDefault();

    const pin = managerLoginPin.value;

    if (!/^\d{4}$/.test(pin)) {
      setManagerLoginMessage(
        "Enter a four-digit PIN.",
        true
      );
      return;
    }

    try {
      let loginResult = null;

      managerPinSubmitting = true;

      managerLoginSubmitBtn.disabled = true;
      managerLoginSubmitBtn.textContent = "Checking…";

      managerPinKeypad.classList.add(
        "is-disabled"
      );
      setManagerLoginMessage("Checking PIN…");

      if (LOCAL_MODE) {
        if (pin !== "0000") {
          throw new Error("Incorrect PIN.");
        }

        managerSessionToken = "local-manager-session";

        loginResult = {
          success: true,
          token: managerSessionToken,
          must_change: false
        };
      } else {
        const { data, error } = await db.rpc(
          "user_login_with_pin",
          {
            p_staff_id: resolvedAppUser.id,
            p_pin: pin,
            p_device_id:
              resolvedAppUser.deviceId || null
          }
        );

        if (error) {
          throw error;
        }

        loginResult = data;

        if (!loginResult?.success) {
          throw new Error(
            loginResult?.message ||
            "Unable to continue."
          );
        }

        managerSessionToken =
          loginResult.token;
      }

      sessionStorage.setItem(
        MANAGER_SESSION_STORAGE_KEY,
        managerSessionToken
      );

      pinMustChangeAfterLogin =
        Boolean(
          loginResult?.must_change
        );

      setManagerPinStatus(
        `Welcome ${resolvedAppUser.name}`,
        "success"
      );

      await new Promise(
        (resolve) =>
          window.setTimeout(
            resolve,
            450
          )
      );

      closeManagerLogin();

      managerSignedIn =
        resolvedAppUser.role === "manager";

      autoOpenManagerModeAfterInit = false;

      applyManagerControlState();
      applyInactiveRestrictedMode();

      if (pinMustChangeAfterLogin) {
        openChangePinModal();
        return;
      }

      if (
        pinLoginPurpose === "app" &&
        pinLoginResolution
      ) {
        pinLoginResolution(true);
        pinLoginResolution = null;
        return;
      }

      const actionToRun = pendingManagerAction;
      pendingManagerAction = null;

      if (actionToRun) {
        await actionToRun();
      } else if (
        pinLoginPurpose === "manager"
      ) {
        openManagerMenu();
      }
    } catch (error) {
      console.error(error);

      setManagerLoginMessage(
        error.message ||
        "Unable to unlock Manager Mode.",
        true
      );

      managerLoginPin.value = "";
      updateManagerPinDots();
    } finally {
      managerPinSubmitting = false;

      managerLoginSubmitBtn.disabled = false;
      managerLoginSubmitBtn.textContent =
        "Continue";

      managerPinKeypad.classList.remove(
        "is-disabled"
      );
    }
  }
);

async function signOutManager() {
  showManagerOperationStatus(
    "Signing out...",
    "working"
  );

  if (managerSignOutBtn) {
    managerSignOutBtn.disabled = true;
  }

  if (managerMenuSignOutBtn) {
    managerMenuSignOutBtn.disabled = true;
  }

  try {
    if (!LOCAL_MODE && managerSessionToken) {
      await db.rpc(
        "user_pin_sign_out",
        {
          p_token: managerSessionToken
        }
      );
    }
  } catch (error) {
    console.warn(
      "Unable to revoke manager session:",
      error
    );
  }

  managerSessionToken = "";

  sessionStorage.removeItem(
    MANAGER_SESSION_STORAGE_KEY
  );

  managerSignedIn = false;

  applyManagerControlState();
  applyInactiveRestrictedMode();

  showManagerOperationStatus(
    "Signed out",
    "success",
    1200
  );

  closeStaffModal();
  closeManagerMenu();
  closeChangePinModal();

  if (managerSignOutBtn) {
    managerSignOutBtn.disabled = false;
  }

  if (managerMenuSignOutBtn) {
    managerMenuSignOutBtn.disabled = false;
  }
}

managerSignOutBtn.addEventListener(
  "click",
  signOutManager
);

managerMenuSignOutBtn.addEventListener(
  "click",
  signOutManager
);

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

addStaffForm
  .querySelectorAll(
    'input[name="newStaffRole"]'
  )
  .forEach((radio) => {
    radio.addEventListener(
      "change",
      () => {
        const role =
          addStaffForm.querySelector(
            'input[name="newStaffRole"]:checked'
          )?.value || "staff";

        newManagerPinFields.hidden =
          false;

        newStaffPin.required = true;
        newStaffPinConfirm.required = true;
      }
    );
  });

addStaffForm.addEventListener(
  "submit",
  async (event) => {
    event.preventDefault();

    const name =
      newStaffName.value.trim();

    const role =
      addStaffForm.querySelector(
        'input[name="newStaffRole"]:checked'
      )?.value || "staff";

    const active =
      addStaffForm.querySelector(
        'input[name="newStaffActive"]:checked'
      )?.value !== "false";

    const pin =
      newStaffPin.value;

    const pinConfirm =
      newStaffPinConfirm.value;

    if (!name) {
      return;
    }

    if (!/^\d{4}$/.test(pin)) {
      setStaffManagerMessage(
        "User PIN must contain exactly four digits.",
        true
      );

      return;
    }

    if (pin !== pinConfirm) {
      setStaffManagerMessage(
        "The user PINs do not match.",
        true
      );

      return;
    }

    const addButton =
      addStaffForm.querySelector(
        'button[type="submit"]'
      );

    showManagerOperationStatus(
      `Adding ${name}...`,
      "working"
    );

    const result =
      await runStaffOperation({
        busyMessage:
          `Adding ${name}…`,
        successMessage:
          `${name} added as ${role} (${active ? "active" : "inactive"})`,
        button:
          addButton,
        busyText:
          "Adding…",
        action:
          async () =>
            StaffStorage.add(
              name,
              role,
              pin,
              active
            )
      });

    if (result) {
      showManagerOperationStatus(
        `${name} added successfully`,
        "success",
        2200
      );

      addStaffForm.reset();

      newStaffName.focus();
    } else {
      showManagerOperationStatus(
        `Unable to add ${name}`,
        "error",
        3000
      );
    }
  }
);


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

    resetAuditBaseline(
      collectRows()
    );

    await logImmediateAudit({
      actionType: "Cleared week",
      week: weekStart.value,
      details:
        "All saved timesheet entries for the selected week were cleared."
    });

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

async function changeWeek(daysToAdd) {
  if (!weekStart.value) {
    return;
  }

  await flushPendingAudit();

  weekStart.value =
    addDaysToDateString(
      weekStart.value,
      daysToAdd
    );

  updateWeekEnd();
  updateCurrentWeekHighlight();
  await load();
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


document.addEventListener(
  "visibilitychange",
  () => {
    if (
      document.visibilityState ===
      "hidden"
    ) {
      flushPendingAudit();
    }
  }
);

window.addEventListener(
  "pagehide",
  () => {
    flushPendingAudit();
  }
);

/* =====================================================
   START APPLICATION
   ===================================================== */

async function initialiseApp() {
  addModeBadge();

  const identityReady =
    await ensureAppUserIdentity();

  if (!identityReady) {
    return;
  }

  const pinReady =
    await ensureUserPinSession();

  if (!pinReady) {
    return;
  }

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
  applyInactiveRestrictedMode();

  if (autoOpenManagerModeAfterInit) {
    window.setTimeout(() => {
      if (managerSignedIn) {
        openManagerMenu();
      } else {
        openManagerLogin();
      }
    }, 150);
  }
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

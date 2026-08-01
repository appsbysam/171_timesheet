const SUPABASE_URL =
  "https://cebgyyairqctbgrocxgl.supabase.co";

const SUPABASE_PUBLISHABLE_KEY =
  "sb_publishable_VFT7GrL1rJtmV0hv0CPrlg_qjZXq4PT";

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

const statusEl =
  document.getElementById("status");

const statusIndicator =
  document.getElementById("statusIndicator");

const saveBtn =
  document.getElementById("saveBtn");

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

let staffMembers = [];
let saveTimer = null;
let isLoading = false;

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

/* =====================================================
   MODE BADGE
   ===================================================== */

function addModeBadge() {
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

  const badge =
    document.createElement("div");

  badge.id = "storageModeBadge";

  badge.textContent = LOCAL_MODE
    ? "● LOCAL MODE"
    : "● ONLINE MODE";

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

  header.appendChild(badge);
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

/* =====================================================
   DYNAMIC TIMESHEET BUILDING
   ===================================================== */

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

  row.dataset.employee = member.name;
  row.dataset.employeeId = member.id;

  nameElement.textContent = member.name;

  populateSelect(
    start,
    getTimeOptions(day, "start")
  );

  populateSelect(
    finish,
    getTimeOptions(day, "finish")
  );

  start.setAttribute(
    "aria-label",
    `${day} ${member.name} start`
  );

  finish.setAttribute(
    "aria-label",
    `${day} ${member.name} finish`
  );

  row
    .querySelectorAll("select")
    .forEach((select) => {
      select.addEventListener(
        "change",
        () => {
          calculateRow(row);
          calculateTotals();
          scheduleSave();
        }
      );
    });

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

function calculateRow(row) {
  const startSelect =
    row.querySelector(".start");

  const finishSelect =
    row.querySelector(".finish");

  const start =
    minutes(startSelect.value);

  const finish =
    minutes(finishSelect.value);

  let total = 0;

  startSelect.classList.remove(
    "invalid"
  );

  finishSelect.classList.remove(
    "invalid"
  );

  if (
    start !== null &&
    finish !== null
  ) {
    total = finish - start;

    if (
      total < 0 ||
      total > 630
    ) {
      startSelect.classList.add(
        "invalid"
      );

      finishSelect.classList.add(
        "invalid"
      );

      total = 0;
    }
  }

  row.dataset.minutes = total;

  row.querySelector(
    ".row-total"
  ).textContent =
    formatDecimal(total);

  row.classList.toggle(
    "completed",
    start !== null &&
      finish !== null &&
      finish >= start
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

  const date =
    new Date(
      `${weekStart.value}T12:00:00`
    );

  date.setDate(
    date.getDate() + 5
  );

  weekEnd.value =
    date.toISOString().slice(0, 10);
}

/* =====================================================
   MANAGER DETAILS
   ===================================================== */

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
      ).value
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
  } catch (error) {
    console.error(error);

    setSaveButtonState("error");

    setStatus(
      `Unable to save: ${error.message}`,
      true,
      "error"
    );
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
    .forEach(calculateRow);

  document.getElementById(
    "managerNotes"
  ).value = "";

  document.getElementById(
    "managerName"
  ).value = "";

  calculateTotals();
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

    row.querySelector(
      ".start"
    ).value =
      record.start_time || "";

    row.querySelector(
      ".finish"
    ).value =
      record.finish_time || "";

    calculateRow(row);
  });

  calculateTotals();
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

        try {
          await save();
          await StaffStorage.rename(member.id, newName);
          setStaffManagerMessage("Staff name updated.");
          await refreshStaffAfterChange();
        } catch (error) {
          console.error(error);
          setStaffManagerMessage(error.message, true);
        }
      });
    });

    const deactivateButton = document.createElement("button");
    deactivateButton.type = "button";
    deactivateButton.className = "deactivate-staff-btn";
    deactivateButton.textContent = "Deactivate";

    deactivateButton.addEventListener("click", async () => {
      const confirmed = confirm(
        `Deactivate ${member.name}?\n\nHistorical timesheet records will be kept.`
      );

      if (!confirmed) {
        return;
      }

      try {
        await save();
        await StaffStorage.setActive(member.id, false);
        setStaffManagerMessage(`${member.name} deactivated.`);
        await refreshStaffAfterChange();
      } catch (error) {
        console.error(error);
        setStaffManagerMessage(error.message, true);
      }
    });

    actions.append(renameButton, deactivateButton);
  } else {
    const reactivateButton = document.createElement("button");
    reactivateButton.type = "button";
    reactivateButton.className = "reactivate-staff-btn";
    reactivateButton.textContent = "Reactivate";

    reactivateButton.addEventListener("click", async () => {
      try {
        await StaffStorage.setActive(member.id, true);
        setStaffManagerMessage(`${member.name} reactivated.`);
        await refreshStaffAfterChange();
      } catch (error) {
        console.error(error);
        setStaffManagerMessage(error.message, true);
      }
    });

    actions.appendChild(reactivateButton);
  }

  row.append(order, name, actions);
  return row;
}

async function renderStaffManager() {
  activeStaffList.innerHTML = "";
  inactiveStaffList.innerHTML = "";

  const allStaff = await StaffStorage.loadAll();
  const active = allStaff.filter((member) => member.active !== false);
  const inactive = allStaff.filter((member) => member.active === false);

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
}

async function refreshStaffAfterChange() {
  await renderStaffManager();
  await load();
}

async function openStaffModal() {
  setStaffManagerMessage("");
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

function closeStaffModal() {
  staffModal.hidden = true;
  document.body.classList.remove("staff-modal-open");
}

manageStaffBtn.addEventListener("click", openStaffModal);
closeStaffModalBtn.addEventListener("click", closeStaffModal);

staffModal
  .querySelectorAll("[data-close-staff-modal]")
  .forEach((element) => {
    element.addEventListener("click", closeStaffModal);
  });

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape" && !staffModal.hidden) {
    closeStaffModal();
  }
});

addStaffForm.addEventListener("submit", async (event) => {
  event.preventDefault();
  const name = newStaffName.value.trim();

  if (!name) {
    return;
  }

  try {
    await save();
    await StaffStorage.add(name);
    newStaffName.value = "";
    setStaffManagerMessage(`${name} added.`);
    await refreshStaffAfterChange();
    newStaffName.focus();
  } catch (error) {
    console.error(error);
    setStaffManagerMessage(error.message, true);
  }
});

/* =====================================================
   EVENTS
   ===================================================== */

weekStart.addEventListener(
  "change",
  async () => {
    updateWeekEnd();
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
      scheduleSave
    );
});

saveBtn.addEventListener(
  "click",
  () => {
    save();
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

document
  .getElementById("resetBtn")
  .addEventListener(
    "click",
    async () => {
      if (
        !confirm(
          "Clear all entries for this week?"
        )
      ) {
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
  );

function changeWeek(daysToAdd) {
  if (!weekStart.value) {
    return;
  }

  const date =
    new Date(
      `${weekStart.value}T12:00:00`
    );

  date.setDate(
    date.getDate() + daysToAdd
  );

  weekStart.value =
    date.toISOString().slice(0, 10);

  updateWeekEnd();
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

/* =====================================================
   START APPLICATION
   ===================================================== */

async function initialiseApp() {
  addModeBadge();

  const today = new Date();

  const monday =
    new Date(today);

  const currentDay =
    monday.getDay();

  monday.setDate(
    monday.getDate() +
      (
        currentDay === 0
          ? -6
          : 1 - currentDay
      )
  );

  weekStart.value =
    monday
      .toISOString()
      .slice(0, 10);

  document.getElementById(
    "managerDate"
  ).value =
    today
      .toISOString()
      .slice(0, 10);

  updateWeekEnd();
  setSaveButtonState("saved");

  await load();
}

initialiseApp();
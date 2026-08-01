const SUPABASE_URL = "https://cebgyyairqctbgrocxgl.supabase.co";
const SUPABASE_PUBLISHABLE_KEY =
  "sb_publishable_VFT7GrL1rJtmV0hv0CPrlg_qjZXq4PT";

/*
  Leave this set to false for automatic operation.

  false:
  - Local file / localhost = local browser storage
  - GitHub Pages / live website = Supabase cloud database

  true:
  - Always use local browser storage, even on the live website
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

const timesheet = document.getElementById("timesheet");
const template = document.getElementById("dayTemplate");
const weekStart = document.getElementById("weekStart");
const weekEnd = document.getElementById("weekEnd");
const statusEl = document.getElementById("status");
const statusIndicator = document.getElementById("statusIndicator");
const saveBtn = document.getElementById("saveBtn");

let saveTimer = null;
let isLoading = false;

/*
  Creates a separate local-storage record for each week.
*/
function localStorageKey(week) {
  return `171-cafe-timesheet-${week}`;
}

/*
  Storage layer.

  The rest of the application calls these functions without needing
  to know whether the data is being stored locally or in Supabase.
*/
const Storage = {
  async save(week, rows) {
    if (LOCAL_MODE) {
      localStorage.setItem(
        localStorageKey(week),
        JSON.stringify(rows)
      );

      return;
    }

    const { error: deleteError } = await db
      .from("timesheets")
      .delete()
      .eq("week_start", week);

    if (deleteError) {
      throw deleteError;
    }

    const { error: insertError } = await db
      .from("timesheets")
      .insert(rows);

    if (insertError) {
      throw insertError;
    }
  },

  async load(week) {
    if (LOCAL_MODE) {
      const saved = localStorage.getItem(localStorageKey(week));

      if (!saved) {
        return [];
      }

      try {
        const parsed = JSON.parse(saved);
        return Array.isArray(parsed) ? parsed : [];
      } catch (error) {
        console.error("Unable to read local timesheet:", error);
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
      localStorage.removeItem(localStorageKey(week));
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

function addModeBadge() {
  const header =
    document.querySelector(".brand-copy") ||
    document.querySelector(".brand-header");

  if (!header) {
    return;
  }

  const badge = document.createElement("div");

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

function setStatus(message, isError = false, state = null) {
  if (statusEl) {
    statusEl.textContent = message;
    statusEl.classList.toggle("error", isError);
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

  if (isError || state === "error") {
    statusIndicator.classList.add("status-error");
  } else if (state === "unsaved") {
    statusIndicator.classList.add("status-unsaved");
  } else if (state === "saving") {
    statusIndicator.classList.add("status-saving");
  } else if (state === "loading") {
    statusIndicator.classList.add("status-loading");
  } else {
    statusIndicator.classList.add("status-saved");
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

function makeTimeOptions(startMinutes, endMinutes) {
  const options = [];

  for (
    let minutes = startMinutes;
    minutes <= endMinutes;
    minutes += 30
  ) {
    const hour24 = Math.floor(minutes / 60);
    const mins = minutes % 60;
    const suffix = hour24 < 12 ? "am" : "pm";
    const hour12 = hour24 % 12 === 0 ? 12 : hour24 % 12;

    options.push({
      value: `${String(hour24).padStart(2, "0")}:${String(
        mins
      ).padStart(2, "0")}`,
      label: `${hour12}:${String(mins).padStart(2, "0")} ${suffix}`
    });
  }

  return options;
}

function getTimeOptions(day, type) {
  const isSaturday = day === "Saturday";

  if (type === "start") {
    return isSaturday
      ? makeTimeOptions(390, 600)
      : makeTimeOptions(300, 660);
  }

  return isSaturday
    ? makeTimeOptions(480, 780)
    : makeTimeOptions(480, 900);
}

function populateSelect(select, options) {
  select.innerHTML = '<option value="">Select</option>';

  options.forEach((option) => {
    const element = document.createElement("option");

    element.value = option.value;
    element.textContent = option.label;

    select.appendChild(element);
  });
}

function build() {
  days.forEach((day) => {
    const node = template.content.cloneNode(true);
    const block = node.querySelector(".day-block");

    block.dataset.day = day;
    node.querySelector("h2").textContent = day.toUpperCase();

    node.querySelectorAll(".shift-row").forEach((row) => {
      const employee = row.dataset.employee;
      const start = row.querySelector(".start");
      const finish = row.querySelector(".finish");

      populateSelect(start, getTimeOptions(day, "start"));
      populateSelect(finish, getTimeOptions(day, "finish"));

      start.setAttribute(
        "aria-label",
        `${day} ${employee} start`
      );

      finish.setAttribute(
        "aria-label",
        `${day} ${employee} finish`
      );

      row.querySelectorAll("select").forEach((select) => {
        select.addEventListener("change", () => {
          calculateRow(row);
          calculateTotals();
          scheduleSave();
        });
      });
    });

    timesheet.appendChild(node);
  });
}

function minutes(value) {
  if (!value) {
    return null;
  }

  const [hours, mins] = value.split(":").map(Number);

  return hours * 60 + mins;
}

function formatDecimal(totalMinutes) {
  return (totalMinutes / 60).toFixed(2);
}

function calculateRow(row) {
  const startSelect = row.querySelector(".start");
  const finishSelect = row.querySelector(".finish");

  const start = minutes(startSelect.value);
  const finish = minutes(finishSelect.value);

  let total = 0;

  startSelect.classList.remove("invalid");
  finishSelect.classList.remove("invalid");

  if (start !== null && finish !== null) {
    total = finish - start;

    if (total < 0 || total > 630) {
      startSelect.classList.add("invalid");
      finishSelect.classList.add("invalid");
      total = 0;
    }
  }

  row.dataset.minutes = total;

  row.querySelector(".row-total").textContent =
    formatDecimal(total);

  row.classList.toggle(
    "completed",
    start !== null &&
      finish !== null &&
      finish >= start
  );
}

function calculateTotals() {
  const totals = {
    Mikayla: 0,
    Monique: 0
  };

  document
    .querySelectorAll(".shift-row")
    .forEach((row) => {
      totals[row.dataset.employee] += Number(
        row.dataset.minutes || 0
      );
    });

  document.getElementById("michaelaTotal").textContent =
    formatDecimal(totals.Mikayla);

  document.getElementById("moniqueTotal").textContent =
    formatDecimal(totals.Monique);

  document.getElementById("weekTotal").textContent =
    formatDecimal(totals.Mikayla + totals.Monique);
}

function updateWeekEnd() {
  if (!weekStart.value) {
    weekEnd.value = "";
    return;
  }

  const date = new Date(`${weekStart.value}T12:00:00`);

  date.setDate(date.getDate() + 5);

  weekEnd.value = date.toISOString().slice(0, 10);
}

function managerMetadata() {
  return JSON.stringify({
    managerNotes:
      document.getElementById("managerNotes").value,

    managerName:
      document.getElementById("managerName").value,

    managerDate:
      document.getElementById("managerDate").value
  });
}

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
            week_start: weekStart.value,
            employee: row.dataset.employee,
            day: block.dataset.day,

            start_time:
              row.querySelector(".start").value || null,

            finish_time:
              row.querySelector(".finish").value || null,

            hours:
              Number(row.dataset.minutes || 0) / 60,

            notes
          });
        });
    });

  return rows;
}

function scheduleSave() {
  if (isLoading || !weekStart.value) {
    return;
  }

  clearTimeout(saveTimer);

  setSaveButtonState("ready");
  setStatus("Unsaved changes", false, "unsaved");

  saveTimer = setTimeout(() => {
    save(false);
  }, 700);
}

async function save(show = true) {
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

    await Storage.save(weekStart.value, rows);

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

function clearForm() {
  document
    .querySelectorAll(".shift-row select")
    .forEach((select) => {
      select.value = "";
    });

  document
    .querySelectorAll(".shift-row")
    .forEach(calculateRow);

  document.getElementById("managerNotes").value = "";
  document.getElementById("managerName").value = "";

  calculateTotals();
}

async function load() {
  if (!weekStart.value) {
    return;
  }

  isLoading = true;

  clearForm();
  setSaveButtonState("saving");

  setStatus(
    LOCAL_MODE
      ? "Loading local week…"
      : "Loading week from cloud…",
    false,
    "loading"
  );

  try {
    const data = await Storage.load(weekStart.value);

    if (data.length) {
      let metadata = {};

      try {
        metadata = JSON.parse(data[0].notes || "{}");
      } catch (error) {
        console.warn(
          "Unable to read manager information:",
          error
        );
      }

      document.getElementById("managerNotes").value =
        metadata.managerNotes || "";

      document.getElementById("managerName").value =
        metadata.managerName || "";

      document.getElementById("managerDate").value =
        metadata.managerDate ||
        document.getElementById("managerDate").value;

      data.forEach((record) => {
        const block = [
          ...document.querySelectorAll(".day-block")
        ].find(
          (item) =>
            item.dataset.day === record.day
        );

        if (!block) {
          return;
        }

        const row = [
          ...block.querySelectorAll(".shift-row")
        ].find(
          (item) =>
            item.dataset.employee === record.employee
        );

        if (!row) {
          return;
        }

        row.querySelector(".start").value =
          record.start_time || "";

        row.querySelector(".finish").value =
          record.finish_time || "";

        calculateRow(row);
      });
    }

    calculateTotals();
    setSaveButtonState("saved");

    if (data.length) {
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

weekStart.addEventListener("change", async () => {
  updateWeekEnd();
  await load();
});

[
  "managerNotes",
  "managerName",
  "managerDate"
].forEach((id) => {
  document
    .getElementById(id)
    .addEventListener("input", scheduleSave);
});

saveBtn.addEventListener("click", () => {
  save(true);
});

document
  .getElementById("printBtn")
  .addEventListener("click", () => {
    window.print();
  });

document
  .getElementById("resetBtn")
  .addEventListener("click", async () => {
    if (
      !confirm("Clear all entries for this week?")
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

      await Storage.clear(weekStart.value);

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
  });

function changeWeek(daysToAdd) {
  if (!weekStart.value) {
    return;
  }

  const date = new Date(
    `${weekStart.value}T12:00:00`
  );

  date.setDate(date.getDate() + daysToAdd);

  weekStart.value = date
    .toISOString()
    .slice(0, 10);

  updateWeekEnd();
  load();
}

document
  .getElementById("previousWeekBtn")
  .addEventListener("click", () => {
    changeWeek(-7);
  });

document
  .getElementById("nextWeekBtn")
  .addEventListener("click", () => {
    changeWeek(7);
  });

build();
addModeBadge();

const today = new Date();
const monday = new Date(today);
const day = monday.getDay();

monday.setDate(
  monday.getDate() +
    (day === 0 ? -6 : 1 - day)
);

weekStart.value = monday
  .toISOString()
  .slice(0, 10);

document.getElementById("managerDate").value =
  today.toISOString().slice(0, 10);

updateWeekEnd();
calculateTotals();
setSaveButtonState("saved");
load();
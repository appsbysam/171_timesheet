/*
  One7One Timesheet environment configuration.

  Automatic behaviour:
  - URLs containing /DEV-171-Timesheet/ use the DEV database.
  - All other deployed URLs use the production database.

  Optional manual browser-console commands:
  switchTimesheetEnvironment("development")
  switchTimesheetEnvironment("production")
  switchTimesheetEnvironment("auto")
*/

(function () {
  const environments = {
    production: {
      environment: "production",
      isDevelopment: false,
      supabaseUrl: "https://cebgyyairqctbgrocxgl.supabase.co",
      supabaseKey: "sb_publishable_VFT7GrL1rJtmV0hv0CPrlg_qjZXq4PT",
      pageTitle: "Café Staff Timesheet",
      appHeading: "Staff Timesheet",
      buildLabel: "",
      modeSuffix: "",
      manifestFile: "manifest-production.json",
      versionSuffix: ""
    },

    development: {
      environment: "development",
      isDevelopment: true,
      supabaseUrl: "https://anfiyirlukdonwvsichi.supabase.co",
      supabaseKey: "sb_publishable_J-TVz3uwbbL0So9djdJhMg_tZOQxq4d",
      pageTitle: "DEV — Café Staff Timesheet",
      appHeading: "Staff Timesheet",
      buildLabel: "⚠ DEV BUILD",
      modeSuffix: " • DEV",
      manifestFile: "manifest-dev.json",
      versionSuffix: "-dev"
    }
  };

  function detectEnvironment() {
    const savedOverride =
      localStorage.getItem("171-timesheet-environment");

    if (
      savedOverride === "development" ||
      savedOverride === "production"
    ) {
      return savedOverride;
    }

    const locationText =
      `${window.location.hostname}${window.location.pathname}`
        .toLowerCase();

    return locationText.includes("dev-171-timesheet")
      ? "development"
      : "production";
  }

  const selectedEnvironment = detectEnvironment();

  window.TIMESHEET_ENV = selectedEnvironment;
  window.APP_CONFIG = Object.freeze(
    environments[selectedEnvironment]
  );

  window.switchTimesheetEnvironment = function (environment) {
    if (environment === "auto") {
      localStorage.removeItem("171-timesheet-environment");
      window.location.reload();
      return;
    }

    if (!environments[environment]) {
      throw new Error(
        'Use "development", "production", or "auto".'
      );
    }

    localStorage.setItem(
      "171-timesheet-environment",
      environment
    );

    window.location.reload();
  };
})();

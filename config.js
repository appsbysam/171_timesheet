/* One7One Timesheet environment configuration. */
(function () {
  const environments = {
    production: {environment:"production",isDevelopment:false,supabaseUrl:"https://cebgyyairqctbgrocxgl.supabase.co",supabaseKey:"sb_publishable_VFT7GrL1rJtmV0hv0CPrlg_qjZXq4PT",pageTitle:"Café Staff Timesheet",appHeading:"Staff Timesheet",buildLabel:"",modeSuffix:"",manifestFile:"manifest-production.json",versionSuffix:""},
    development: {environment:"development",isDevelopment:true,supabaseUrl:"https://anfiyirlukdonwvsichi.supabase.co",supabaseKey:"sb_publishable_J-TVz3uwbbL0So9djdJhMg_tZOQxq4d",pageTitle:"DEV — Café Staff Timesheet",appHeading:"Staff Timesheet",buildLabel:"⚠ DEV BUILD",modeSuffix:" • DEV",manifestFile:"manifest-dev.json",versionSuffix:"-dev"}
  };
  function detectEnvironment(){const saved=localStorage.getItem("171-timesheet-environment");if(saved==="development"||saved==="production")return saved;const text=`${location.hostname}${location.pathname}`.toLowerCase();return text.includes("dev-171-timesheet")?"development":"production"}
  const selected=detectEnvironment();window.TIMESHEET_ENV=selected;window.APP_CONFIG=Object.freeze(environments[selected]);
  window.switchTimesheetEnvironment=function(environment){if(environment==="auto"){localStorage.removeItem("171-timesheet-environment");location.reload();return}if(!environments[environment])throw new Error('Use "development", "production", or "auto".');localStorage.setItem("171-timesheet-environment",environment);location.reload()};
  window.addEventListener("DOMContentLoaded",()=>{const s=document.createElement("script");s.src=`promotion-admin.js?v=${Date.now()}`;document.body.appendChild(s)});
})();

window.RELEASE_HISTORY = [
  {
    version: "3.5.7",
    date: "5 August 2026",
    changes: [
      "Added Change PIN to My Profile for every user.",
      "Added side-by-side Close and Sign Out buttons to My Profile.",
      "Moved user sign-out into My Profile as the central account location.",
      "Removed duplicate Sign Out buttons from Manager Menu and Manage Staff.",
      "Signing out now returns the user to the PIN login screen.",
      "No database changes are required."
    ]
  },
  {
    version: "3.5.6",
    date: "5 August 2026",
    changes: [
      "Stopped Google Password Manager from opening automatically in Manage Staff.",
      "Removed automatic focus from the new-user first-name field.",
      "Marked the first-name field as a normal given-name field.",
      "Marked new PIN fields as new credentials rather than saved passwords.",
      "Added form-level autocomplete safeguards.",
      "No database changes are required."
    ]
  },
  {
    version: "3.5.5",
    date: "5 August 2026",
    changes: [
      "New users are now marked as requiring a PIN change on first login.",
      "Users with a reset PIN must choose a new PIN before continuing.",
      "The mandatory PIN-change modal cannot be closed or dismissed.",
      "The close button and outside-tap dismissal are disabled until the PIN is changed.",
      "Included the required Supabase manager_add_staff function update."
    ]
  },
  {
    version: "3.5.4",
    date: "5 August 2026",
    changes: [
      "Manager Mode is now completely hidden for Staff users.",
      "The Manager Mode button appears only when the identified user's role is Manager.",
      "Added a CSS safeguard to prevent stale interface states from revealing the button.",
      "Manager authentication and permissions remain unchanged.",
      "No database changes are required."
    ]
  },
  {
    version: "3.5.3",
    date: "4 August 2026",
    changes: [
      "Added a My Profile modal accessible from the username and profile icon.",
      "Displays username, user ID, role, status, device type and device ID.",
      "Added Copy controls for the full User ID and Device ID.",
      "Long IDs are shortened visually while preserving the full value for copying.",
      "Added mobile-friendly profile styling.",
      "No database changes are required."
    ]
  },
  {
    version: "3.5.2",
    date: "4 August 2026",
    changes: [
      "Fixed the User PIN login error: data is not defined.",
      "The Supabase PIN response is now stored in the correct scope.",
      "Temporary-PIN change detection now works after successful login.",
      "Local-mode PIN login uses the same result structure.",
      "No database changes are required."
    ]
  },
  {
    version: "3.5.1",
    date: "4 August 2026",
    changes: [
      "Extended PIN access to every active user.",
      "Managers can reset PINs for staff or managers, active or inactive.",
      "Reset users receive a random temporary PIN.",
      "Users must choose a new PIN after signing in with a temporary PIN.",
      "New staff and managers both require an individual four-digit PIN.",
      "Manager-only permissions remain restricted to Manager role accounts.",
      "Included a complete Supabase migration for the new all-user PIN system."
    ]
  },
  {
    version: "3.5.0",
    date: "4 August 2026",
    changes: [
      "Added Reset PIN controls for manager accounts in Staff Management.",
      "Generates a random four-digit temporary PIN.",
      "Clears failed attempts and active PIN lockouts.",
      "Revokes the manager's existing active sessions.",
      "Displays the temporary PIN once for the resetting manager.",
      "Records the reset action in the audit log.",
      "Included the required Supabase database function."
    ]
  },
  {
    version: "3.4.7",
    date: "4 August 2026",
    changes: [
      "Fixed repeated Manager PIN attempts after an incorrect PIN.",
      "The failed four-digit PIN is now cleared correctly before the keypad is re-enabled.",
      "Each new attempt now waits for four fresh digits before auto-submitting.",
      "No database changes are required."
    ]
  },
  {
    version: "3.4.6",
    date: "4 August 2026",
    changes: [
      "Manager PIN login now submits automatically after the fourth digit.",
      "The keypad is temporarily disabled while the PIN is being checked.",
      "Extra keypad taps are ignored during validation.",
      "Incorrect PIN attempts clear the PIN and allow a fresh attempt.",
      "The Unlock Manager Mode button remains available as a fallback.",
      "No database changes are required."
    ]
  },
  {
    version: "3.4.5",
    date: "4 August 2026",
    changes: [
      "Moved all Manager PIN feedback into the existing signing-in status bar.",
      "Incorrect PIN messages now appear prominently in red.",
      "Checking PIN uses a blue status state.",
      "Lockout messages use an orange warning state.",
      "Successful login briefly shows Welcome before opening Manager Mode.",
      "Removed the visible lower error message area.",
      "No database changes are required."
    ]
  },
  {
    version: "3.4.4",
    date: "4 August 2026",
    changes: [
      "Added Active or Inactive selection when creating a new user.",
      "New users default to Active.",
      "Added visible feedback while a user is being added.",
      "Added success and error feedback after user creation.",
      "Added a Signing out status and disabled sign-out buttons during the operation.",
      "Included the required Supabase function update."
    ]
  },
  {
    version: "3.4.3",
    date: "4 August 2026",
    changes: [
      "Improved Manager PIN keypad readability.",
      "Changed keypad buttons to a medium green background with white text.",
      "Changed filled PIN indicators to match the green app theme.",
      "Stopped the phone's native numeric keyboard from opening while using the custom PIN keypad.",
      "No database changes are required."
    ]
  },
  {
    version: "3.4.2",
    date: "4 August 2026",
    changes: [
      "Fixed desktop Manager PIN entry adding two digits for every keypad press.",
      "Removed a duplicated PIN keypad event listener.",
      "Kept mobile PIN behaviour unchanged.",
      "No database changes are required."
    ]
  },
  {
    version: "3.4.1",
    date: "4 August 2026",
    changes: [
      "Reworked manager session storage to avoid the unavailable digest function.",
      "Manager sessions now use secure random session tokens stored directly in the protected session table.",
      "Qualified pgcrypto functions through the Supabase extensions schema.",
      "Retained individual Manager PINs, lockouts, PIN changes and expiring sessions.",
      "Included a complete replacement database migration for Version 3.4.1."
    ]
  },
  {
    version: "3.4.0",
    date: "4 August 2026",
    changes: [
      "Replaced manager email/password entry with an individual four-digit PIN.",
      "Added a phone-friendly numeric PIN keypad.",
      "Added secure server-side PIN verification, lockouts and expiring manager sessions.",
      "Added Staff/Manager role selection when creating a user.",
      "Managers require an individual PIN when created.",
      "Added Change Manager PIN inside Manager Mode.",
      "Updated staff management and audit viewing to use protected manager database functions."
    ]
  },
  {
    version: "3.3.0",
    date: "4 August 2026",
    changes: [
      "Added a manager-only Audit Log Viewer.",
      "Displays newest audit records first in readable mobile-friendly cards.",
      "Added action, user and date-range filters.",
      "Added Staff and Manager role badges.",
      "Device ID, device type, environment and record ID are hidden under expandable details.",
      "Added paginated Load More support, loading states, empty states and error handling."
    ]
  },
  {
    version: "3.2.2",
    date: "4 August 2026",
    changes: [
      "Added staff and manager roles to staff records.",
      "Inactive managers now bypass the inactive-user prompt.",
      "Inactive managers are taken directly to Manager Mode authentication.",
      "An existing valid manager session opens Manager Mode immediately.",
      "Inactive non-managers continue to see the activation screen."
    ]
  },
  {
    version: "3.2.1",
    date: "4 August 2026",
    changes: [
      "Added the role used when performing each audited action.",
      "Audit entries now record Staff or Manager in performed_role.",
      "Manager corrections can now be distinguished from ordinary staff updates.",
      "Grouped-event detail fields remain NULL when multiple staff, days or fields are included."
    ]
  },
  {
    version: "3.2.0",
    date: "4 August 2026",
    changes: [
      "Added audit logging for timesheet changes.",
      "Kept the existing automatic saving behaviour.",
      "Groups auto-saved changes into one readable audit event after 60 seconds of inactivity.",
      "Flushes pending audit changes when switching weeks or leaving the app.",
      "Records user name, staff ID, device ID and device type in the background.",
      "Added immediate audit records for Clear Week and Copy Previous Week."
    ]
  },
  {
    version: "3.1.2",
    date: "4 August 2026",
    changes: [
      "Added the identified staff name beside the version number in the header.",
      "The displayed name uses the official staff spelling stored by the identity system.",
      "The header updates immediately after identification or identity reset.",
      "Kept the display compact on both desktop and mobile."
    ]
  },
  {
    version: "3.1.1",
    date: "4 August 2026",
    changes: [
      "Added a recovery path for inactive users who are managers.",
      "Inactive staff details remain stored for the future audit log.",
      "Inactive users can continue into a restricted app and sign in to Manager Mode.",
      "Normal timesheet controls remain unavailable until manager authentication succeeds.",
      "Signing out returns an inactive user to restricted mode."
    ]
  },
  {
    version: "3.1.0",
    date: "4 August 2026",
    changes: [
      "Added one-time staff identification on each phone.",
      "Names are checked case-insensitively against all staff records.",
      "Active users continue directly into the app.",
      "Inactive users are remembered and shown a Check Again activation screen.",
      "Added a silently generated device ID and automatically detected device type.",
      "Stored staff ID and official database name for the future audit log."
    ]
  },
  {
    version: "3.0.9",
    date: "4 August 2026",
    changes: [
      "Renamed the split-shift removal button to -Remove Split.",
      "Matched the Remove Split button dimensions to the + Split Shift button.",
      "Applied the matching dimensions on both desktop and mobile."
    ]
  },
  {
    version: "3.0.8",
    date: "4 August 2026",
    changes: [
      "Removed the Later option from the update prompt.",
      "Changed the update dialog to a single OK action.",
      "The app now checks for updates only once when it starts.",
      "Added fresh cache tokens to the main local app files on every load.",
      "Clicking OK reloads with a unique hard-refresh URL.",
      "Unsaved changes are saved before the update continues."
    ]
  },
  {
    version: "3.0.7",
    date: "4 August 2026",
    changes: [
      "Replaced the brief forced update notice with a prompted Update Available dialog.",
      "Added Update Now and Later choices.",
      "Added Save & Update protection when unsaved changes exist.",
      "Added automatic update checks every 10 minutes while the app remains open.",
      "Continued using docs/CHANGELOG.md as the single master changelog."
    ]
  },
  {
    version: "3.0.6",
    date: "4 August 2026",
    changes: [
      "Fixed the version popup by loading version.js without browser cache.",
      "The actual deployed version is compared with the last version stored in the browser.",
      "A changed version shows the loading notice and refreshes once.",
      "First visits remain silent and DEV and production are tracked separately."
    ]
  },
  {
    version: "3.0.5",
    date: "3 August 2026",
    changes: [
      "Fixed Previous and Next changing width when Today is hidden.",
      "Reserved the middle navigation slot on the current week.",
      "Kept navigation button dimensions fixed on both desktop and mobile.",
      "Today remains visually hidden on the current week."
    ]
  },
  {
    version: "3.0.4",
    date: "3 August 2026",
    changes: [
      "Replaced the cache-dependent version checker with persistent last-used-version tracking.",
      "The app now reliably detects future version changes on each browser.",
      "First visits store the current version silently.",
      "DEV and production keep separate stored version records.",
      "A reload guard prevents repeated update loops."
    ]
  },
  {
    version: "3.0.3",
    date: "3 August 2026",
    changes: [
      "Hidden the Today button completely while viewing the current week.",
      "Kept Previous and Next at their established size.",
      "Today appears only when viewing a past or future week.",
      "The navigation switches cleanly between two and three equal columns."
    ]
  },
  {
    version: "3.0.2",
    date: "3 August 2026",
    changes: [
      "Urgently fixed the current week incorrectly starting on Sunday in positive UTC time zones.",
      "Enforced Monday as the only valid week-start day and Saturday as the week-ending day.",
      "Removed timezone-sensitive ISO conversion from current-week, navigation and week-ending calculations.",
      "Fixed the manager date so it cannot shift back one day."
    ]
  },
  {
    version: "3.0.1",
    date: "3 August 2026",
    changes: [
      "Added an automatic deployed-version check when the app loads.",
      "Shows a small loading notice when a newer version is detected.",
      "Automatically refreshes the app once to load the new deployment.",
      "The version check bypasses browser cache and works in both DEV and production."
    ]
  },
  {
    version: "3.0.0",
    date: "3 August 2026",
    changes: [
      "Prepared the application as the Version 3.0.0 launch build.",
      "Made version display environment-aware through config.js.",
      "Production displays Version 3.0.0 while DEV displays Version 3.0.0-dev.",
      "Made Today vibrant green away from the current week.",
      "Made Today a very light green while already viewing the current week.",
      "Kept the smaller desktop date-field font without changing mobile sizing."
    ]
  },
  {
    version: "2.7.0-dev",
    date: "3 August 2026",
    changes: [
      "Added a manager-only Generate Roster action.",
      "Added an editable roster preview for the currently selected week.",
      "Added Copy Text for pasting directly into WhatsApp.",
      "Added native Share support on compatible phones and computers.",
      "Added clear formatting for split shifts and days with no rostered staff."
    ]
  },
  {
    version: "2.6.0-dev",
    date: "3 August 2026",
    changes: [
      "Rebuilt Previous, Today and Next as modern compact navigation buttons.",
      "Added clean SVG arrow and calendar icons.",
      "Made Today permanently visible so the layout never changes or overlaps.",
      "Today is disabled and highlighted green while viewing the current week.",
      "All three buttons now remain on one row on desktop and mobile."
    ]
  },
  {version:"2.5.5-dev",date:"3 August 2026",changes:["Reduced navigation button widths so Previous, Next and Current Week always fit on one desktop row."]},

  {
    version: "2.5.4-dev",
    date: "3 August 2026",
    changes: [
      "Changed the desktop week controls to a compact single-row layout.",
      "Placed Week Starting, Week Ending, Previous Week and Next Week side by side.",
      "Kept the existing stacked mobile layout for smaller screens."
    ]
  },
  {
    version: "2.5.3-dev",
    date: "3 August 2026",
    changes: [
      "Fixed Copy Previous Week calculating 27 July as 26 July in positive UTC time zones.",
      "Changed week-date arithmetic to use UTC-safe date handling.",
      "Copy Previous Week now searches exactly seven days before the currently selected Week Starting date."
    ]
  },
  {
    version: "2.5.2-dev",
    date: "3 August 2026",
    changes: [
      "Confirmed Copy Previous Week uses the currently selected week as its destination and searches seven days earlier.",
      "Added clearer source-week and destination-week messages.",
      "Added an explicit DEV or production database message when no source records exist.",
      "Retained compatibility with older Sunday-based week records."
    ]
  },
  {
    version: "2.5.1-dev",
    date: "3 August 2026",
    changes: [
      "Fixed the current week failing to load automatically when the app first opens.",
      "Restored automatic Week Ending and manager date initialization.",
      "Added compatibility when copying older weeks that were stored using a Sunday week-start date."
    ]
  },
  {
    version: "2.5.0-dev",
    date: "3 August 2026",
    changes: [
      "Added a manager-only Copy Previous Week action.",
      "Previous-week shifts and split shifts can now be copied into the selected week.",
      "An overwrite warning appears only when the destination week already contains values.",
      "Manager notes, manager name and manager date are not copied.",
      "The copied week is saved automatically."
    ]
  },
  {
    version: "2.4.2-dev",
    date: "3 August 2026",
    changes: [
      "Removed the Current Week badge while viewing the current week.",
      "Added a Go to Current Week button that appears only when another week is selected.",
      "The new button returns directly to the current week and reloads its data."
    ]
  },
  {
    version: "2.4.1-dev",
    date: "3 August 2026",
    changes: [
      "Moved the DEV BUILD badge beside the ONLINE MODE badge.",
      "Added a green highlight and Current Week badge for the active current week.",
      "Made Finish dropdowns automatically begin 30 minutes after the selected Start time.",
      "Applied the same dynamic time filtering to split shifts.",
      "Prevented shifts shorter than 30 minutes."
    ]
  },
  {
    version: "2.4.0-dev",
    date: "3 August 2026",
    changes: [
      "Added a clickable version number.",
      "Added an in-app What’s New and version-history window.",
      "Added a scrollable release history designed for mobile screens."
    ]
  },
  {
    version: "2.3.1-dev",
    date: "3 August 2026",
    changes: [
      "Added automatic DEV and production environment detection.",
      "Separated Supabase and app identity settings into config.js.",
      "Added safe one-command environment switching."
    ]
  },
  {
    version: "2.3.0-dev",
    date: "3 August 2026",
    changes: [
      "Added prominent DEV BUILD identification.",
      "Added separate development app naming and labels."
    ]
  },
  {
    version: "2.2.4",
    date: "2 August 2026",
    changes: [
      "Hidden the combined Total row unless a split shift is active."
    ]
  },
  {
    version: "2.2.2",
    date: "2 August 2026",
    changes: [
      "Introduced the compact split-shift layout.",
      "Aligned Start, Finish and Total fields beneath their headings.",
      "Restored completed-row green highlighting."
    ]
  },
  {
    version: "2.2.0",
    date: "2 August 2026",
    changes: [
      "Added support for one optional split shift per employee per day.",
      "Added automatic split-shift calculations, saving, loading and printing."
    ]
  },
  {
    version: "2.1.2",
    date: "2 August 2026",
    changes: [
      "Corrected the Sunday-to-Saturday week-start behaviour."
    ]
  },
  {
    version: "2.1.0",
    date: "2 August 2026",
    changes: [
      "Added Manager Mode.",
      "Restricted staff management, clear-week controls and manager notes to managers."
    ]
  }
];

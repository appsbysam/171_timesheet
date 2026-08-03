window.RELEASE_HISTORY = [
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

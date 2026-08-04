# 171 Café Staff Timesheet

## Version 3.2.2
Released: 4 August 2026

### Added
- Added `role` support to staff records with the values **staff** and **manager**.
- Inactive users whose role is **manager** now bypass the inactive-user screen.
- Inactive managers are taken directly to Manager Mode sign-in.
- If a valid manager session already exists, Manager Mode opens immediately.
- Inactive non-manager users continue to see the normal activation message.
- Newly added staff members default to the **staff** role.

### Database
Run the supplied `database-update-v3.2.2.sql` once in the DEV Supabase SQL Editor before testing.

---

## Version 3.2.1
Released: 4 August 2026

### Added
- Added `performed_role` to each audit record.
- Records **Manager** when the action occurs during an authenticated Manager Mode session.
- Records **Staff** for ordinary timesheet activity.
- Makes manager corrections distinguishable from changes made by regular staff.

### Clarified
- `employee_name`, `day_name`, `field_name`, `old_value`, and `new_value` remain blank for grouped audit events containing multiple changes.
- The complete grouped summary continues to be stored in `details`.

### Database
Run the supplied `database-update-v3.2.1.sql` once in the DEV Supabase SQL Editor before testing this version.

---

## Version 3.2.0
Released: 4 August 2026

### Added
- Added audit logging for timesheet updates.
- Preserved automatic saving for safety.
- Groups multiple auto-saved edits into one audit event after 60 seconds without further changes.
- Records the identified staff member, staff ID, device ID and device type with each audit event.
- Stores a readable before-and-after change summary in the audit log.
- Flushes pending audit changes before changing weeks and when the app is moved into the background.
- Added immediate audit entries for **Clear Week** and **Copy Previous Week**.

### Notes
- This release writes audit records to the existing `audit_log` table.
- The Manager Mode audit viewer will be added separately after audit recording is tested.

---

## Version 3.1.2
Released: 4 August 2026

### Added
- Displays the identified staff member beside the version number in the app header.
- Uses the official staff name stored by the identity system.
- Updates the header immediately after successful identification.
- Keeps the user display compact on desktop and mobile.

---

## Version 3.1.1
Released: 4 August 2026

### Fixed
- Removed the inactive-user dead end that prevented access to Manager Mode.
- Inactive users are still identified and stored locally for future audit records.
- Added **Continue to Manager Mode** for inactive users.
- The app opens in a restricted state where normal timesheet controls are unavailable.
- A manager can sign in and receive full Manager Mode access.
- Signing out returns an inactive user to restricted mode.
- Retained **Check Again** so activation can be detected without re-entering the name.

---

## Version 3.1.0
Released: 4 August 2026

### Added
- Added a one-time first-name prompt on each phone.
- Checks the entered name case-insensitively against all staff records, including active and inactive staff.
- Stores the official staff ID and database spelling locally after a successful match.
- Active users continue into the timesheet.
- Inactive users are remembered and shown a **Check Again** screen until a manager activates them.
- Generates and stores an anonymous device ID silently.
- Detects and stores a simple device type such as **Android phone** or **iPhone**.
- Repeats the identification process if the stored staff identity is missing or invalid.

### Foundation
- Establishes the user and device identity required for the upcoming audit log.
- This release does not yet create or write to an audit table.

---

## Version 3.0.9
Released: 4 August 2026

### Changed
- Renamed **Remove Split Shift** to **-Remove Split**.
- Matched the **-Remove Split** button dimensions to the **+ Split Shift** button.
- Applied the same matched sizing on desktop and mobile.

---

## Version 3.0.8
Released: 4 August 2026

### Changed
- Removed the **Later** option from the update prompt.
- The update dialog now has one **OK** button.
- The app checks for updates once at startup rather than every 10 minutes.
- If unsaved timesheet changes exist, they are saved before updating.
- Main local app files now receive a unique cache token on every load.
- Clicking **OK** reloads using a unique hard-refresh URL to retrieve the latest deployed files.

---

## Version 3.0.7
Released: 4 August 2026

### Added
- Added a clear **Update Available** dialog instead of an easily missed automatic reload notice.
- Added **Update Now** and **Later** options.
- Added **Save & Update** when unsaved timesheet changes exist.
- Added an automatic update check every 10 minutes while the app remains open.
- Choosing **Later** suppresses the prompt for the remainder of that browser session and allows it to appear again next time the app opens.

### Changed
- The app no longer forces an immediate update after briefly displaying a message.
- `docs/CHANGELOG.md` remains the single master changelog.

---

> Master changelog for the project. This file replaces the individual
> version changelog files as the primary release history.

## Version 3.0.6
Released: 4 August 2026

### Fixed
- Reworked the version update detection.
- Loads version.js with a cache-busting query.
- Compares the deployed version with the last version stored in the browser.
- Shows “A new version is available. Loading now…” before refreshing once.
- Adopted docs/CHANGELOG.md as the single changelog. No new CHANGELOG-v*.txt files are created.

## Version 3.x

### 3.0.5

-   Fixed Previous and Next navigation buttons so they remain a fixed
    width.
-   Today button is hidden while viewing the current week.
-   Navigation layout remains consistent on desktop and mobile.

### 3.0.4

-   Replaced the version checker with persistent version tracking.
-   First visit stores the current version silently.
-   Future deployments display a "new version available" message and
    reload once.

### 3.0.3

-   Today button appears only when viewing a past or future week.
-   Dynamic DEV/Production version handling via `config.js`.

### 3.0.2

-   Fixed week calculations so every roster week always starts on
    **Monday** and ends on **Saturday**.
-   Removed timezone-related Sunday bug.

### 3.0.1

-   Added automatic version update notification.

### 3.0.0 --- Launch Release

-   Official production release.
-   Dynamic DEV/Production environment configuration.
-   Copy Previous Week.
-   Generate Roster.
-   Modern navigation controls.
-   Manager Mode enhancements.

------------------------------------------------------------------------

## Version 2.x Highlights

### 2.7.0

-   Added Generate Roster feature with Copy and Share options.

### 2.6.x

-   Improved Today button styling.
-   Desktop/mobile layout refinements.

### 2.5.x

-   Added Copy Previous Week.
-   Added Current Week navigation.
-   Improved Manager Mode.
-   Added split-shift improvements.

### 2.4.x

-   Environment separation between DEV and Production.
-   Configuration improvements.

### 2.3.x

-   Visual DEV build indicators.
-   Navigation enhancements.

### 2.2.x

-   Staff management improvements.
-   Previous/Next week navigation.
-   Status indicators.

### 2.1.x

-   Initial online versions with cloud saving and Manager Mode.

------------------------------------------------------------------------

## Documentation Notes

-   Current production version: **3.2.2**
-   DEV builds automatically display the `-dev` suffix.
-   Version numbering is controlled through `version.js` and
    `config.js`.
-   Older individual `CHANGELOG-v*.txt` files are retained only as an
    archive.

# 171 Café Staff Timesheet

> Master changelog for the project. This file replaces the individual
> version changelog files as the primary release history.

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

-   Current production version: **3.0.5**
-   DEV builds automatically display the `-dev` suffix.
-   Version numbering is controlled through `version.js` and
    `config.js`.
-   Older individual `CHANGELOG-v*.txt` files are retained only as an
    archive.

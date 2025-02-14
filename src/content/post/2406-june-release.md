---
title: CachyOS June 2024 Release
excerpt: Handheld, T2 MacBook, BTRFS
category: release
tags:
  - release
---

**Hello CachyOS Enthusiasts**,

This is our 7th release this year, and we have once again made significant changes for this release.

In the default CachyOS Edition, we have now added support for the T2 MacBook. The configuration needed for required packages is done via the hardware detection.
The Wi-Fi and Bluetooth will not work out of the box because it's a licensed and closed-source firmware from Apple, which we cannot distribute.
[Here you can find how to get a working Wi-Fi and Bluetooth after the installation.](https://wiki.cachyos.org/installation/installation_t2macbook/)

The ISO now contains a script called "cachy-chroot," which will guide the user through the chroot process and mounting the partition correctly.
The script also properly detects subvolumes for BTRFS, and the user will be guided and shown which subvolumes exist. Additionally,
the ISO now uses the mkinitcpio microcode hook and copytoram support. This means that the ISO gets copied into the user's RAM if there is enough available space.
This should generally speed up the overall experience when booted into the ISO. The ISO now requires the [latest Ventoy release](https://github.com/ventoy/Ventoy/releases/tag/v1.0.98).

For NVIDIA Cards, we have now enabled the services to ensure correct working sleep as default and also the required NVReg settings as default.
This mainly fixes graphical corruption when using sleep on Wayland. Additionally, we have already pushed the 555 Driver, which supports explicit sync.
This massively improves the experience on Wayland for users with supported NVIDIA Cards. The compositors have also been patched with explicit sync support.

We have also made some small changes to the defaults. BTRFS is now the default selected file system instead of XFS.
The XFS file system and all others can still be selected by the users and configured. The firewalld firewall has been replaced with ufw,
as it generally provides an easier experience for most users to set up their firewall and open ports.

The CachyOS Handheld Edition is now considered stable, and we have made numerous adjustments.
The CachyOS Hardware Detection now includes detection for these devices and configures the system depending on the device.
The Handheld Edition is currently tested on the Steam Deck, Legion Go, and Rog Ally. Generally, it should also support Ayaneo devices,
but we have not yet tested this directly. We have contacted the company to get more information about these devices.
Below you can find more Changelogs for the Handheld Edition.

Last but not least, we have launched a complete rework of our wiki with a new structure.
This now provides more information for users. Some pages are not fully complete yet, but these will follow within this month.
Feel free to check out the new Wiki: https://wiki.cachyos.org/installation/installation_prepare/

**Changelog for This Release:**

**Features:**

- chwd: Introduce handheld hardware detection
- chwd: Introduce T2 MacBook support
- chwd: Add network driver detection
- Installation: Added MacBook T2 support
- ISO: Add cachy-chroot. This is a script that helps the user to chroot into the system.
- ISO: Switch to Microcode Hooks; this requires using the latest Ventoy release (1.0.98)
- ISO: Enable copytoram; this no longer needs to be disabled because we don't provide the offline installation anymore
- filesystem: BTRFS is now the default selected file system
- netinstall: Use ufw instead of firewalld
- Slides: Updated for latest changes
- Package Updates: linux-cachyos 6.9.3, mesa 24.1.1, xwayland 24.1, NVIDIA 555.52.04, Plasma 6.0.5

**Bug Fixes:**

- Calamares: umount: Enable emergency again
- Qtile: Multimedia Controls are now working correctly
- NVIDIA: Enable required services and options for working sleep on Wayland
- netinstall: Remove b43-fwcutter from installation
- netinstall: Replace hyprland-git with hyprland
- netinstall: Drop linux-cachyos-lts from selection to avoid issues with missing modules
- Calamares: Shellprocess: Move mirror ranking before installing keyring

**Changelog from Experimental Handheld Release:**

- Default to KDE Vapor Theme (SteamOS Theme)
- Default file system: BTRFS
- Default kernel: linux-cachyos-deckify
- SDDM now uses Wayland
- Environment Flag for HHD to reduce latency
- Added Kernel Arguments to improve Game Mode Switching behavior
- The username can now be edited
- Hardware Detection configures and installs required packages depending on the device used
- Mallit Keyboard now uses Dark Mode
- Valve's Powerbuttond for proper sleeping
- Shortcuts can now be added to Steam
- Updated scx-scheds to latest git commit, providing the latest enhancements for the LAVD Scheduler
- Added automount to cachyos-handheld
- CachyOS can now perform Steam Deck BIOS updates on the Steam Deck

**Download:**

Grab your copy of the latest ISO from our mirrors on SourceForge:

- https://iso.cachyos.org/240609/cachyos-kde-linux-240609.iso
- https://sourceforge.net/projects/cachyos-arch/files

Handheld Edition:

- https://iso.cachyos.org/240609-handheld/cachyos-handheld-linux-240609.iso

**Support Us:**

Your contributions help us maintain our servers. Consider supporting CachyOS through:

- PayPal: https://paypal.me/pttrr
- Patreon: https://www.patreon.com/CachyOS

Thank you for your continued support!

**The CachyOS Team**

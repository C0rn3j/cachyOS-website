---
title: CachyOS April 2024 Release
excerpt: XZ CVE Fix, Back to X11, Plymouth, Refind new Layout
category: release
tags:
  - release
---

Greetings, CachyOS enthusiasts!

This is our fourth release in 2024 and mainly address to provide a xz libary, which does not contain the current known CVE with it.
We are mitigating also a commit in "libarchive" of malicious xz actor by ensuring path names are only outputted via safe_fprintf to avoid escape sequences in paths hitting the terminal.

We have added a bunch of new features, so it's a quite good time to do a release.
Due to issues with calamares and wayland, when changing the layout in calamares we needed to switch back to x11 for the ISO.

We provide now a new refind portioning layout, which makes it easier to dual boot with windows and other linux distributions.
Plymouth got added and is used by default for all bootloaders, to provide a themed boot animation.
The boot animation will show a spinning circle, CachyOS Logo and your UEFI Motherboard Vendor.


Here you can find the more changes from this release:

**Features:**
- plymouth: Use plymouth and provide a themed boot animation
- ISO: Switch back to X11 due to issues when setting the keyboard layout in calamares
- Refind: New partitioning layout
- netinstall: KDE: Install xwaylandvideobridge as default
- netinstall: Use lightdm instead of ly at various Desktop Environments, due to a bug in ly
- systemd-boot: Use @saved for systemd-boot to boot all time in the previous booted kernel
- cachyos-keyring: Refactor cachyos-keyring package and provide a cachyos-trusted
- ISO: Use ZSTD 19 Compression for mkinitcpio image for ISO
- Package Updates: xz 5.6.1-3, linux-cachyos 6.8.2, pacman 6.1.0-5, mesa 24.0.4, Plasma 6.0.3, nvidia 550.67, cachyos-settings 39-2

**Bug-Fixes:**
- Autologin: Fix the autologin option when used together with sddm
- xz: Provide a patched xz package
- libarchive: Mitigate commit from malicious xz actor
- cachyos-settings: udev-rule don't set watermark_scale_factor to 125, since it increases the RAM usage massively
- calamares: pacman-keyring use more simply method to integrate the keyring into the installation

**Download:**

Grab your copy of the latest ISO from our mirrors on SourceForge:

* https://cdn.cachyos.org/ISO/kde/240401/cachyos-kde-linux-240401.iso
* https://mirror.cachyos.org/ISO/
* https://sourceforge.net/projects/cachyos-arch/files

**Support Us:**

Your contributions help us maintain our servers. Consider supporting CachyOS through:

* PayPal: https://paypal.me/pttrr
* Patreon: https://www.patreon.com/CachyOS

Thank you for your continued support!

**The CachyOS Team**

---
title: CachyOS March 2024 Release
excerpt: Plasma 6, Wayland, new Mirrors, more refind filesystems, microcode hook
category: release
tags:
  - release
---

Greetings, CachyOS enthusiasts!

This is our third release in 2024 and brings quite big changes.
We are dropping our GNOME ISO due to a lack of maintenance and double testing for every release. Also, this should avoid confusion among users about the netinstallation,
and supported desktop environments, since we are providing most desktop environments directly in the netinstall.

This ISO is based on Plasma 6 and will also have Wayland enabled by default. This should not have a big impact on NVIDIA users since X11 can still be used after the installation.
Plasma 6 seems wayland wise in really good shape, and as soon wayland-protocols and NVIDIA provide the explicit sync protocol, this should also be the case for most NVIDIA users.

On top of that, we are now providing new CDNs as default, one hosted by a community user and one is hosted by us via Cloudflare R2. This should massively improve the netinstallation time across the world.

Calamares got rebased on 3.3.5 and is now built as a default with QT6 instead of QT5, to follow with Plasma 6.
Arch recently made some changes to mkinitcpio and enabled early microcode loading as a default. These changes are also now reflected in our installation for all bootloaders.

Refind has some more filesystems enabled - f2fs and zfs are now available if the refind bootloader is selected.

**Features:**
- ISO: Plasma 6 is now shipped in the ISO and uses Wayland as default, GNOME ISO got dropped to avoid confusion about netinstall
- Calamares: Rebased for QT6
- refind: Add f2fs and zfs as option including luks2 encryption
- mirrors: We now provide 2 global CDNs. One hosted by Cloudflare R2 and one hosted by Digital Ocean
- mirrorlist: Fetch the online installer directly from cdn to provide a faster delivery
- initcpiocfg: Use the new microcode hook for early loading the ucode
- bootloader: Dont load the microcode with the bootloader anymore
- Package Updates: linux-cachyos 6.7.9, mesa 24.0.2, zfs-utils 2.2.3

**Bug-Fixes:**
- pacstrap: Do not install config packages to provide the user a more clean selection of the installation
- shellprocess_pacman: Also copy the ranked cachyos-v4-mirrorlists to the target


**Download:**

Grab your copy of the latest ISO from our mirrors on SourceForge:

* [https://mirror.cachyos.org/ISO/](https://mirror.cachyos.org/ISO/)
* [https://sourceforge.net/projects/cachyos-arch/files/](https://sourceforge.net/projects/cachyos-arch/files/)

**Support Us:**

Your contributions help us maintain our servers. Consider supporting CachyOS through:

* PayPal: [https://paypal.me/pttrr](https://paypal.me/pttrr)
* Patreon: [https://www.patreon.com/CachyOS](https://www.patreon.com/CachyOS)

Thank you for your continued support!

**The CachyOS Team**

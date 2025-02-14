---
title: CachyOS July 2024 Release
excerpt: Zen4 Repository, chwd ROCm, sched-ext, amd improvements
category: release
tags:
  - release
---

**Hello CachyOS Enthusiasts**,

This is our 8th release this year, and we are very proud to announce a new optimized repository.
Starting with this release, we are providing a **Zen4** optimized repository. This repository will be automatically used at new installation for Zen4 and Zen5 CPUs, to provide the best performance.

The znver4 target provides a bunch of **extra avx512** extensions and also other instructions. Here you can find a list of the additional used instructions by the compiler compared to the x86-64-v4 target:
`abm, adx, aes, avx512bf16, avx512bitalg, avx512ifma, avx512vbmi, avx512vbmi2, avx512vnni, avx512vpopctndq, clflushopt, clwb, clzero, fsgsbase, gfni, mwaitx, pclmul, pku. prfchw, rpdid, rdrnd, rdseed, sha, sse4a, vaes, vockmulqdq, wbnoinvd, savec, xsaveopt, xsaves`

The CachyOS Hardware Detection tool (chwd) now, can detect the "GC" for AMD cards. This makes it possible to support for us to enable support for official ROCm supported cards in our AI SDK installation variant automatically and configure these to work out of the box for common AI applications and usage. We are still working together with AI Enthusiasts for improving the preinstalled packages and shipped configuration in our AI SDK installation variant. Additionally, chwd will now configure libva driver as default for the supported Nvidia hardware and also export the variable to the profile correctly.

Our default (linux-cachyos) and sched-ext (linux-cachyos-sched-ext) kernels now have a debug package in the repository, which can be used for debugging kernel issues or for development purposes.

Our kernels now support **"AMD CPB Boost"** feature, which now allows enabling or disabling the boost on a per core basis. power-profiles-daemon (ppd) does this now automatically, when the "powersave" profile is used. It also sets now the lowest linear frequency to a higher frequency, so that there will be less frequency drops, when the CPU is idle. This is active in the "balanced" and "performance" mode. Holding the lowest linear frequency higher improves the latency as well as the 1% lows in gaming. We have made a bunch of tests related to power consumption, and there is barely an uplift visible. This has been tested on several CPUs and APUs with the energy per core perf function.

The Kernel Manager now has a GUI to **manage sched-ext** scheduler. User can now simply enable/disable the scx service, switch between different sched-ext schedulers, and also be able to set command line flags for them.

Userspace kernel samepage merging daemon was removed, since it had a quite high CPU usage on lower end CPUs. We have replaced uksmd by inheriting the "MemoryKSM" function from systemd. This can be now simply enabled with the "ksmctl --enable" command.

Cutefish has been removed from the desktop selection, since it has been unmaintained for over ~1.5 years, and we cannot continue to provide support for it, but the users can still install it from the repositories.
kwin has been patched for tearing support.

There are **three** new additions to CachyOS mirrors, two are located in China and is hosted by TUNA University with 20 Gbits connectivity, the second hosted by a teammember in Austria with 2.5Gbits, and the third hosted by eScience Center, Nanjing University in China.. Thanks to all the mirror hosts to further increase the availability to all users all over the world.

Calamares is now based on the latest 3.3.8 release, and we have added a bunch of fixes to the installation. The mirror ranking for the base installation will now use only Tier 1 Mirrors from Arch Linux, the latest archlinux-keyring is installed before starting the installation to avoid issues with the archlinux-keyring. Unused CachyOS repositories are now removed from the config, and the kernel parameter `copytoram` was changed from 'yes' to 'auto' to avoid issues on machines with less RAM.

Additionally, the 6.10 kernel seems to be looking in a great shape and should soon make it to our repositories. Similarly, the new Nvidia driver is in a good shape, and we have enabled the GSP firmware again.

We have also started working on our own installer framework and a GUI installer. Stay tuned!

**Changelog for this Release:**

**Features:**

- Repository: Introduce Zen 4 optimized repository, this will be used for Zen4 and Zen5 CPU's
- ISO: Add automatic architecture check for Zen4/Zen5 repository
- chwd: Added GC support for AMD GPU's, this helps for detecting official ROCm supported GPUs
- chwd: Use libva-nvidia-driver on supported cards
- ksmctl: Introduce tool to enable/disable KSM: ksmctl --enable
- kernel: For the "linux-cachyos" kernel is now a "linux-cachyos-dbg" package available, this contains an unstripped vmlinux for debugging purposes
- kernel: amd cpb boost is now available and the power-profiles-daemon is patched, if the "powersave" profile is set, it will disable the boost on amd cpus
- kernel: Added power saving patch for AMD SoCs for video playback
- kernel-manager: Added support for managing sched-ext schedulers and getting information via GUI
- steam/proton: There is now a "game-performance" script, which can be added to steam's launch options
- power-profiles: On AMD Pstate supported CPUs the lowest Linear frequency is now set higher, this can improve latency and 1% lows
- kwin: Added back-port for tearing, this has been tested. On NVIDIA it only works on native wayland applications
- netinstall: Cutefish has been dropped as installable Desktop Environment
- Mirrors: Added Austria and China Mirror, the China Mirror is hosted by the TUNA University. This should help a lot of users from china
- Package Updates: linux-cachyos 6.9.9, mesa 24.1.3, NVIDIA 555.58.02, Plasma 6.1.2, LLVM 18.1.8

**Bug Fixes:**

- ISO: Set copytoram to auto instead of yes
- ISO: Fixed Sleep on Live ISO for Laptops
- Launch Installer: Install the latest archlinux-keyring, before the installation starts to avoid issues, when fetching the archlinux-keyring in the chroot
- Mirrors Ranking: Rank only Tier 1 Mirror's at installation time
- pacman.conf: Remove not used pacman repository
- cachy-chroot: Do not show .snapshot subvolumes
- Calamares: Do not use "Preservefiles" module, since user a reporting issues with it.

**Changelog for Handheld Edition:**

- Added configuration file to apply different scaling, '/home/$USER/.config/deckscale
- Make GameMode switching more robust
- Updated Wifi/Bluetooth Firmware for Steam Deck
- Implemented Auto Mount for GameMode
- Added gamescope-session quirks for Wine CPU Topology, HDR, and Backlight
- Fixed Refresh Rate Selection
- Updated jupiter-hw-support, steamdeck-dsp, jupiter-fan-control, gamescope-session-git

**Manual changes for existing users:**

CachyOS is a rolling system, so updating the system via 'sudo pacman -Syu' is most of the time enough.
Since we have introduced a new repository, new user with a Zen 4 CPU might want to migrate, here you can find an instruction to do this:
https://discuss.cachyos.org/t/zen-4-5-optimized-repository-testing/713?u=ptr1337

**Download:**

Grab your copy of the latest ISO from our mirrors on SourceForge:

- CDN: https://iso.cachyos.org/desktop/240714/cachyos-desktop-linux-240714.iso
- Germany: https://mirror.cachyos.org/ISO/desktop/240714/cachyos-desktop-linux-240714.iso
- USA: https://us.cachyos.org/ISO/desktop/240714/cachyos-desktop-linux-240714.iso
- China: https://mirrors.tuna.tsinghua.edu.cn/cachyos/ISO/desktop/240714/cachyos-desktop-linux-240714.iso
- Sourceforge: https://sourceforge.net/projects/cachyos-arch/files

Handheld Edition:

- https://iso.cachyos.org/handheld/240714/cachyos-handheld-linux-240714.iso

**Support Us:**

Your contributions help us maintain our servers. Consider supporting CachyOS through:

- PayPal: https://paypal.me/pttrr
- Patreon: https://www.patreon.com/CachyOS

Thank you for your continued support!

**The CachyOS Team**

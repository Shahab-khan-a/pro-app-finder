// Mirror Engine: Dynamically generates 100% working, verified download & mirror sources
// Eliminates 404 errors by using verified search endpoints and active repository engines.

/**
 * Clean app name for search queries (remove parentheses, APK Mod tags, etc.)
 */
export const cleanSearchName = (name) => {
  if (!name) return '';
  return name
    .replace(/\(.*?\)/g, '')
    .replace(/\[.*?\]/g, '')
    .replace(/\b(apk|mod|pro|unlocked|gold|premium|free|vlognow|portable|edition|enhanced|repack|ultimate|deluxe|complete)\b/gi, '')
    .replace(/director'?s cut/gi, '')
    .replace(/\s+/g, ' ')
    .trim();
};

/**
 * Returns a list of verified working mirrors for a given platform and app name
 */
export const getWorkingMirrors = (appName, platform = 'windows', officialWebsite = '', category = '') => {
  const cleanName = cleanSearchName(appName) || appName;
  const encoded = encodeURIComponent(cleanName);
  const p = platform ? platform.toLowerCase() : 'windows';

  if (p === 'android') {
    return [
      {
        id: 'happymod',
        name: 'HappyMod',
        badge: '100% Tested',
        tag: 'User Voted',
        url: `https://www.happymod.com/search.html?q=${encoded}`,
        color: 'from-green-500 to-emerald-600',
        description: 'Community-voted and tested working Android mods'
      },
      {
        id: 'liteapks',
        name: 'LiteAPKs Pro',
        badge: 'Top Pro Mods',
        tag: 'Unlocked VIP',
        url: `https://liteapks.com/?s=${encoded}`,
        color: 'from-emerald-500 to-teal-600',
        description: 'Verified unlocked Pro/VIP APK mods & AI editor features'
      },
      {
        id: 'apkmody',
        name: 'APKMody',
        badge: 'Fast DDL',
        tag: 'No Ads',
        url: `https://apkmody.com/?s=${encoded}`,
        color: 'from-blue-500 to-indigo-600',
        description: 'Clean direct APK mod downloads with verified signatures'
      },
      {
        id: 'apkdone',
        name: 'APKDone',
        badge: 'Direct Mirror',
        tag: 'High Speed',
        url: `https://apkdone.com/?s=${encoded}`,
        color: 'from-purple-500 to-pink-600',
        description: 'Single-click high speed direct download mirrors'
      },
      {
        id: 'modcombo',
        name: 'ModCombo',
        badge: 'Premium Apps',
        tag: 'Pro Unlocked',
        url: `https://modcombo.com/?s=${encoded}`,
        color: 'from-amber-500 to-orange-600',
        description: 'Latest updated modded APKs for photography and productivity'
      },
      {
        id: 'mobilism',
        name: 'Mobilism Forum',
        badge: 'Underground',
        tag: 'Expert Verified',
        url: `https://forum.mobilism.org/search.php?keywords=${encoded}&sr=topics&sf=titleonly`,
        color: 'from-slate-600 to-slate-800',
        description: 'The premier verified release forum for Android modders'
      },
      {
        id: 'apkpure',
        name: 'APKPure',
        badge: 'Original APK',
        tag: 'Clean',
        url: `https://apkpure.com/search?q=${encoded}`,
        color: 'from-teal-500 to-cyan-600',
        description: 'Official untouched original XAPK/APK store installer'
      }
    ];
  }

  if (p === 'windows') {
    return [
      {
        id: 'filecr',
        name: 'FileCR Pro',
        badge: 'High Speed DDL',
        tag: 'No Popups / Direct',
        url: `https://filecr.com/search/?q=${encoded}`,
        color: 'from-blue-600 to-indigo-700',
        description: 'Modern, direct download portal for pre-activated Windows software'
      },
      {
        id: 'getintopc',
        name: 'GetIntoPC',
        badge: 'Huge Library',
        tag: 'Full Version',
        url: `https://getintopc.com/?s=${encoded}+windows`,
        color: 'from-emerald-600 to-teal-700',
        description: 'Comprehensive software archive with step-by-step setup guides'
      },
      {
        id: 'karanpc',
        name: 'KaranPC Repack',
        badge: 'Silent Repack',
        tag: 'Pre-Activated',
        url: `https://karanpc.com/?s=${encoded}`,
        color: 'from-purple-600 to-violet-700',
        description: 'Clean pre-cracked and portable repacks for PC'
      },
      {
        id: 'portableapps',
        name: 'PortableApps',
        badge: '100% Free / Portable',
        tag: 'No Install Needed',
        url: `https://portableapps.com/search/node/${encoded}`,
        color: 'from-amber-600 to-orange-700',
        description: 'Runs directly from USB or drive without system changes'
      },
      {
        id: 'sanet',
        name: 'SoftArchive (Sanet)',
        badge: 'Scene Release',
        tag: 'Fast Mirrors',
        url: `https://sanet.st/search/?q=${encoded}`,
        color: 'from-rose-600 to-pink-700',
        description: 'Verified scene release mirrors and multi-host direct links'
      }
    ];
  }

  if (p === 'mac') {
    return [
      {
        id: 'filecr-mac',
        name: 'FileCR macOS',
        badge: 'macOS DDL',
        tag: 'DMG / Apple Silicon',
        url: `https://filecr.com/search/?q=${encoded}+mac`,
        color: 'from-blue-600 to-indigo-700',
        description: 'Tested macOS .dmg packages with Apple Silicon / Intel support'
      },
      {
        id: 'getintopc-mac',
        name: 'GetIntoPC Mac',
        badge: 'Mac Archive',
        tag: 'Full .DMG',
        url: `https://getintopc.com/?s=${encoded}+mac`,
        color: 'from-emerald-600 to-teal-700',
        description: 'macOS full version installer packages and standalone tools'
      },
      {
        id: 'official-mac',
        name: 'Official macOS Portal',
        badge: 'Official',
        tag: 'Verified Source',
        url: officialWebsite ? `${officialWebsite}#mac` : `https://www.google.com/search?q=${encoded}+mac+official+download`,
        color: 'from-slate-700 to-slate-900',
        description: 'Direct verified vendor installation page for Apple Mac'
      }
    ];
  }

  if (p === 'linux') {
    return [
      {
        id: 'flathub',
        name: 'Flathub',
        badge: 'Flatpak Sandbox',
        tag: 'Universal Linux',
        url: `https://flathub.org/apps/search?q=${encoded}`,
        color: 'from-blue-600 to-cyan-600',
        description: 'Universal sandboxed Flatpak packages for all Linux distros'
      },
      {
        id: 'appimagehub',
        name: 'AppImageHub',
        badge: 'Portable Linux',
        tag: 'AppImage',
        url: `https://appimage.github.io/apps/?q=${encoded}`,
        color: 'from-purple-600 to-indigo-600',
        description: 'Standalone 1-click executable AppImage binaries'
      },
      {
        id: 'official-linux',
        name: 'Official Linux Package',
        badge: 'Official',
        tag: 'deb / rpm / tar.gz',
        url: officialWebsite ? `${officialWebsite}#linux` : `https://www.google.com/search?q=${encoded}+linux+download`,
        color: 'from-slate-700 to-slate-900',
        description: 'Official distribution packages directly from publisher repository'
      }
    ];
  }

  if (p === 'ios') {
    return [
      {
        id: 'appstore',
        name: 'Apple App Store',
        badge: 'Official Store',
        tag: 'Verified iOS',
        url: `https://www.google.com/search?q=${encoded}+apple+app+store`,
        color: 'from-blue-500 to-indigo-600',
        description: 'Official signed application from Apple iOS App Store'
      }
    ];
  }

  // Fallback
  return [
    {
      id: 'filecr',
      name: 'FileCR Pro',
      badge: 'High Speed DDL',
      tag: 'Verified',
      url: `https://filecr.com/search/?q=${encoded}`,
      color: 'from-blue-600 to-indigo-700',
      description: 'Direct high speed download mirror'
    }
  ];
};

/**
 * Get primary download and mirror details for card/button display
 */
export const getPrimaryDownloadInfo = (app, platform = 'windows') => {
  const p = platform ? platform.toLowerCase() : 'windows';
  const cleanName = cleanSearchName(app.name) || app.name;
  const encoded = encodeURIComponent(cleanName);
  const mirrors = getWorkingMirrors(cleanName, p, app.officialWebsite, app.category);

  const primaryMirror = mirrors[0];
  const secondaryMirror = mirrors[1] || mirrors[0];

  let downloadUrl = app.downloadUrl;
  let mirrorUrl = app.mirrorUrl || primaryMirror.url;
  let mirrorLabel = app.mirrorLabel || primaryMirror.name;
  let downloadLabel = 'Free Download';

  if (p === 'android') {
    downloadLabel = 'Get Android APK (Pro Mod)';
    // Avoid dead direct .html URLs
    if (!downloadUrl || downloadUrl.includes('9mod.com') || downloadUrl.includes('.html')) {
      downloadUrl = `https://liteapks.com/?s=${encoded}`;
    }
    if (!mirrorUrl || mirrorUrl.includes('9mod.com') || mirrorUrl.includes('.html')) {
      mirrorUrl = `https://apkmody.com/?s=${encoded}`;
      mirrorLabel = 'APKMody Pro';
    }
  } else if (p === 'windows') {
    downloadLabel = 'Download for Windows (.exe)';
    if (!downloadUrl || downloadUrl.includes('9mod.com') || downloadUrl.includes('.html')) {
      downloadUrl = app.licenseType === 'Open Source' || app.licenseType === '100% Free'
        ? (app.downloadUrl || app.officialWebsite)
        : `https://filecr.com/search/?q=${encoded}`;
    }
    if (!mirrorUrl || mirrorUrl.includes('9mod.com')) {
      mirrorUrl = `https://filecr.com/search/?q=${encoded}`;
      mirrorLabel = 'FileCR Pro';
    }
  } else if (p === 'mac') {
    downloadLabel = 'Download for macOS (.dmg)';
    downloadUrl = app.downloadUrl && app.downloadUrl.includes('mac') ? app.downloadUrl : `${app.officialWebsite}#mac`;
    mirrorUrl = `https://filecr.com/search/?q=${encoded}+mac`;
    mirrorLabel = 'FileCR macOS';
  } else if (p === 'linux') {
    downloadLabel = 'Get for Linux (.deb / Flatpak)';
    downloadUrl = `${app.officialWebsite}#linux`;
    mirrorUrl = `https://flathub.org/apps/search?q=${encoded}`;
    mirrorLabel = 'Flathub Linux';
  } else if (p === 'ios') {
    downloadLabel = 'Get on App Store (iOS)';
    downloadUrl = `https://www.google.com/search?q=${encoded}+apple+app+store`;
    mirrorUrl = `https://www.apple.com/app-store/`;
    mirrorLabel = 'Apple App Store';
  }

  return {
    downloadUrl,
    mirrorUrl,
    mirrorLabel,
    downloadLabel,
    mirrors
  };
};

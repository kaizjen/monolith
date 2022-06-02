// This file is for all types of windows

import type { TabWindow, TabOptions, Tab } from "./types";
import { app, BrowserView, BrowserWindow, nativeTheme } from "electron";
import * as tabManager from "./tabs";
import * as _url from "url";
import * as pathModule from "path";
import { config, control } from './userdata'
import { showAppMenu } from "./menu";
import { CHROME_PARTITION } from "./sessions";

const WM_INITMENU = 0x0116; // windows' initmenu, explained later in the code
const headHeight = 36; // px, height of the "head" of chrome

const colors = {
  bg: {
    dark: '#21252b',
    light: '#aab0b6'
  },
  fg: {
    dark: '#ffffff',
    light: '#000000'
  }
}

const platform = {
  mac: process.platform == 'darwin',
  windows: process.platform == 'win32',
  linux_BSD: process.platform != 'darwin' && process.platform != 'win32'
}

let windows: TabWindow[] = [];


export async function newWindow(tabOptionsArray: TabOptions[]): Promise<TabWindow> {
  let w = new BrowserWindow({
    frame: !platform.linux_BSD,
    titleBarOverlay: {
      color: nativeTheme.shouldUseDarkColors ? colors.bg.dark : colors.bg.light,
      symbolColor: nativeTheme.shouldUseDarkColors ? colors.fg.dark : colors.fg.light,
      height: headHeight
    },
    titleBarStyle: platform.windows ? 'hidden' : 'hiddenInset',
    show: false,
    width: 1000,
    height: 700,
    backgroundColor: '#ffffffff',
    icon: pathModule.join(__dirname, `../../monolith.${platform.windows ? 'ico' : 'png'}`),

    minHeight: 400,
    minWidth: 600,
  }) as TabWindow;
  
  w.winID = windows.push(w) - 1;
  w.tabs = []; // BrowserViews will be here
  w.recentlyClosed = [];

  w.chromeHeight = 74; // initial value for chromeHeight if the chrome takes a long time to load

  if (platform.windows) w.hookWindowMessage(WM_INITMENU, (wParam, lParam) => {
    // On Windows the 'system-context-menu' event never fires, so this is the only working solution
    // to display custom context menu
    // thanks, qjl1569 :D (https://github.com/electron/electron/issues/24893#issuecomment-1109262719)
    w.setEnabled(false);
    w.setEnabled(true);
    // voodoo magic to prevent default menu from showing
    
    showAppMenu();
  })
  
  w.on('resize', () => {
    let { width, height } = w.getContentBounds()

    // The BrowserView resizes incorrectly when window is resized or maximized/restored (on Windows).
    // That's because w.getBounds() has weird additional 16px of width
    setCurrentTabBounds(w)
    w.chrome.setBounds({ x: 0, y: 0, width, height })
  })
  // Weird visual glith: when maximized the first time, currentTab has some white space at the bottom (??)
  // I have no idea what is going on here, and I have no idea how to fix this

  function reactToThemeChange() {
    if (nativeTheme.shouldUseDarkColors) {
      w.setTitleBarOverlay({
        color: colors.bg.dark,
        symbolColor: colors.fg.dark
      })
    } else {
      w.setTitleBarOverlay({
        color: colors.bg.light,
        symbolColor: colors.fg.light
      })
    }
  }
  nativeTheme.on('updated', reactToThemeChange);

  w.on('closed', () => {
    tabManager.updateSavedTabsImmediately();

    // i don't think browserviews (especially unattached ones) are destroyed when BrowserWindow closes
    w.tabs.forEach((item) => {
      (item.webContents as any).destroy();
    });
    (w.chrome.webContents as any).destroy();

    let index = windows.indexOf(w);
    if (index == -1) throw(new Error("This should NOT happen! Window is not in windows[] array!"))

    windows.splice(index, 1) // remove from windows array
    nativeTheme.off('updated', reactToThemeChange)
  })

  // immediately crash the original renderer of the window, so it doesnt take any memory.
  w.webContents.forcefullyCrashRenderer();

  // The chrome of Monolith is a BrowserView called `chromeBV`
  let chromeBV = new BrowserView({
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false,
      partition: CHROME_PARTITION
    }
  });
  chromeBV.setBounds({ x: 0, y: 0, width: w.getContentBounds().width, height: w.getContentBounds().height })
  chromeBV.setBackgroundColor('#00000000') // make it transparent
  w.addBrowserView(chromeBV)

  w.chrome = chromeBV;

  await chromeBV.webContents.loadFile('src/browser/out/index.html')
  if (!app.isPackaged || control.options.open_devtools_for_window?.value) {
    chromeBV.webContents.openDevTools({ mode: 'detach' })
  }
  
  let prevChrZoomFactor: number;
  config.listenCall((c) => {
    chromeBV.webContents.send('userData/config', c)

    if (prevChrZoomFactor == c.ui.chromeZoomFactor) return;

    chromeBV.webContents.zoomFactor = c.ui.chromeZoomFactor;
    if (platform.windows) {
      w.setTitleBarOverlay({
        height: Math.round(headHeight * c.ui.chromeZoomFactor)
      })
    }
    
    chromeBV.webContents.send('adjustHeight') // webContents will send a 'chrome:setHeight' message in return.
    prevChrZoomFactor = c.ui.chromeZoomFactor;
  })

  tabOptionsArray.forEach(tabOptions => {
    tabManager.createTab(w, tabOptions)
  })
  w.show();

  w.on('focus', () => chromeBV.webContents.send('focus'))
  w.on('blur', () => chromeBV.webContents.send('blur'))

  return w;
}

export function getTabWindowByID(id: number) {
  return windows[id]
}

export function getIDOfTabWindow(win: TabWindow) {
  return windows.indexOf(win)
}

export function getAllTabWindows(): TabWindow[] {
  return Object.assign([], windows)
}

export function isTabWindow(win: BrowserWindow | TabWindow) {
  return windows.includes(win as any)
}

export function setCurrentTabBounds(win: TabWindow, tab?: Tab) {
  // The BrowserView resizes incorrectly when window is resized or maximized/restored (on Windows).
  // That's because w.getBounds() has weird additional 16px of width
  const { width, height } = win.getContentBounds()
  let rect: Electron.Rectangle;
  if (win.isFullScreen()) {
    rect = { x: 0, y: 0, width, height }

  } else {
    rect = { x: 0, y: win.chromeHeight, width, height: height - win.chromeHeight }
  }
  if (tab) {
    tab.setBounds(rect)
    
  } else {
    win.currentTab?.setBounds(rect)
  }
}
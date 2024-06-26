// Manages all menu stuff

import { app, clipboard, dialog, Menu, MenuItem, session } from "electron";
import { Bookmark, Tab, TabOptions, TabWindow } from "./types";
import { isTabWindow, newWindow, setCurrentTabBounds } from './windows'
import { bookmarks, config, control, downloads } from './userdata'
import * as pathModule from "path";
import * as fs from "fs"
import { closeTab, createTab, moveTab, openClosedTab, setMutedTab } from './tabs'
import $ from './vars'
import fetch from "electron-fetch";
import type { Response } from "electron-fetch"
import { DEFAULT_PARTITION, PRIVATE_PARTITION } from "./sessions";
import { t } from "./i18n";

function obtainWebContents(win: Electron.BrowserWindow | TabWindow) {
  return isTabWindow(win) ? win.currentTab.webContents : win.webContents
}

function zoom(direction: 'in' | 'out') {
  return function (_, win) {
    let wc = obtainWebContents(win)
    wc.emit('zoom-changed', {}, direction)
  }
}

async function exists(path: string) {
  try {
    await fs.promises.access(path);
    return true;

  } catch (e) {
    return false;
  }
}

const SEPARATOR: Electron.MenuItemConstructorOptions = {
  type: 'separator'
}

const tabs_windows: Electron.MenuItemConstructorOptions[] = [
  {
    label: t('menu.common.newTab'),
    click(_m, win) {
      if (!isTabWindow(win)) return;

      createTab(win, {
        url: $.newTabUrl
      })
    },
    accelerator: 'CmdOrCtrl+T',
    id: 'new-tab'
  },
  {
    label: t('menu.common.newPrivateTab'),
    click(_m, win) {
      if (!isTabWindow(win)) return;

      createTab(win, {
        url: 'mth://private',
        private: true
      })
    },
    accelerator: 'CmdOrCtrl+Shift+T',
    id: 'new-tab-p'
  },
  SEPARATOR,
  {
    label: t('menu.tabs.close'),
    click(_m, win) {
      if (!isTabWindow(win)) return;

      closeTab(win, { tab: win.currentTab })
    },
    accelerator: 'CmdOrCtrl+W',
    id: 'close-tab'
  },
  {
    label: t('menu.tabs.openClosed'),
    click(_m, win) {
      if (!isTabWindow(win)) return;

      openClosedTab(win)
    },
    accelerator: 'CmdOrCtrl+Shift+W',
    id: 'open-closed'
  },
  SEPARATOR,
  {
    label: t('menu.common.newWindow'),
    click() {
      let url;
      let onStart = config.get().behaviour.onStart
      if (onStart.type == 'page') {
        url = onStart.url
      } else {
        url = $.newTabUrl
      }
      newWindow([{ url }]);
    },
    accelerator: 'CmdOrCtrl+N',
    id: 'new-win'
  },
  {
    label: t('menu.openFile'),
    accelerator: 'CmdOrCtrl+O',
    async click(_m, win) {
      if (!isTabWindow(win)) return;

      let result = await dialog.showOpenDialog(win, {
        title: t('menu.openFile'),
        properties: ['openFile']
      })
      result.filePaths.forEach(pth => {
        pth = pth.replaceAll('\\', '/');
        pth = 'file://' + pth;

        createTab(win, {
          url: pth,
          private: win.currentTab.private
        })
      })
    }
  },
  {
    label: t('menu.window.close'),
    click(_m, win) {
      win.close()
    },
    id: 'close-win'
  }
]
const tools: Electron.MenuItemConstructorOptions[] = [
  {
    label: t('common.downloads'),
    click(_, win) {
      if (!isTabWindow(win)) return;

      if (win.currentTab.webContents.getURL().startsWith('mth://downloads')) return;
      createTab(win, {
        url: 'mth://downloads'
      })
    },
    id: 'dls'
  },
  {
    label: t('common.extensions'),
    click(_, win) {
      if (!isTabWindow(win)) return;

      if (win.currentTab.webContents.getURL().startsWith('mth://extensions')) return;
      createTab(win, {
        url: 'mth://extensions'
      })
    },
    id: 'exts'
  },
  {
    label: t('common.bookmarks'),
    click(_, win) {
      if (!isTabWindow(win)) return;

      if (win.currentTab.webContents.getURL().startsWith('mth://bookmarks')) return;
      createTab(win, {
        url: 'mth://bookmarks'
      })
    },
    id: 'bookms'
  },
  {
    label: t('common.settings'),
    click(_, win) {
      if (!isTabWindow(win)) return;

      if (win.currentTab.webContents.getURL().startsWith('mth://settings')) return;
      createTab(win, {
        url: 'mth://settings'
      })
    },
    id: 'settings'
  }
]
const about: Electron.MenuItemConstructorOptions = {
  label: t('menu.about'),
  click(_, w) {
    if (!isTabWindow(w)) return;

    const win = w as TabWindow;
    createTab(win, {
      url: 'mth://about'
    })
  }
}
const view: Electron.MenuItemConstructorOptions[] = [
  {
    label: t('menu.fullscreen'),
    accelerator: 'F11',
    click(_m, win) {
      if (!isTabWindow(win)) return;

      if (!win.isFullScreen()) {
        win.setFullScreen(true);
        const { width, height } = win.getContentBounds()
        win.currentTab.setBounds({ x: 0, y: 0, width, height })

      } else {
        win.setFullScreen(false);
        setCurrentTabBounds(win)
      }
    }
  },
  {
    label: t('menu.zoom.in'),
    accelerator: 'CmdOrCtrl+numadd',
    registerAccelerator: false, // alredy registered
    click: zoom('in')
  },
  {
    label: t('menu.zoom.out'),
    accelerator: 'CmdOrCtrl+-',
    registerAccelerator: false, // alredy registered
    click: zoom('out')
  },
  {
    label: t('menu.zoom.0'),
    accelerator: 'CmdOrCtrl+num0',
    click(_m, win) {
      if (!isTabWindow(win)) return;

      win.currentTab.webContents.zoomFactor = config.get().ui.defaultZoomFactor;
      win.chrome.webContents.send('zoomUpdate', win.currentTab.webContents.zoomFactor)
    }
  }
]
const findInPage: Electron.MenuItemConstructorOptions = {
  label: t('menu.findInPage'),
  accelerator: 'CmdOrCtrl+F',
  click(_, win) {
    if (!isTabWindow(win)) return;

    win.chrome.webContents.send('toggleFindInPage')
    win.chrome.webContents.focus();
  }
}
export const appMenu = Menu.buildFromTemplate([
  {
    label: t('name'),
    submenu: [
      about,
      tools.find(i => i.id == 'settings'),
      ...(process.platform == 'darwin' ? [
        SEPARATOR,
        {
          role: 'hide' as const
        },
        {
          role: 'hideOthers' as const
        },
        {
          role: 'unhide' as const
        },
        SEPARATOR,
        {
          role: 'services' as const
        },
        SEPARATOR
      ] : []),
      {
        label: t('menu.common.quit'),
        click() {
          app.quit()
        }
      },

      // HIDDEN ITEMS
      // These items are only used for app-wide keyboard shortcuts.

      {
        label: 'devtools-hidden',
        accelerator: 'F12',
        click(_, win) {
          let wc = obtainWebContents(win)
          wc.toggleDevTools()
        },
        visible: false
      },
      {
        label: 'zoomin-num-hidden',
        accelerator: 'CmdOrCtrl+numadd',
        click: zoom('in'),
        visible: false
      },
      {
        label: 'zoomin-std-eq-hidden',
        // when you press the plus not on the numpad, but on the other keyboard, you actually press the equal sign!
        accelerator: 'CmdOrCtrl+=',
        click: zoom('in'),
        visible: false
      },
      {
        label: 'zoomin-std-plus-hidden',
        accelerator: 'CmdOrCtrl++',
        click: zoom('in'),
        visible: false
      },
      {
        label: 'zoomout-num-hidden',
        accelerator: 'CmdOrCtrl+numsub',
        click: zoom('out'),
        visible: false
      },
      {
        label: 'zoomout-std-hidden',
        accelerator: 'CmdOrCtrl+-',
        click: zoom('out'),
        visible: false
      },
      {
        label: "f5-reload-hidden",
        visible: false,
        accelerator: "F5",
        click(_, win) {
          let wc = obtainWebContents(win)
          wc.reload()
        }
      },
      {
        label: 'esc-exit-fullscreen-hidden',
        visible: false,
        accelerator: 'Escape',
        click(_, win) {
          if (!isTabWindow(win)) return;
          
          win.setFullScreen(false);
          setCurrentTabBounds(win);
        }
      }
    ]
  },
  {
    label: t('menu.appMenu.file'),
    submenu: [
      ...tabs_windows
    ]
  },
  {
    label: t('menu.appMenu.edit'),
    submenu: [
      { role: 'undo', accelerator: 'CmdOrCtrl+Z' },
      { role: 'redo', accelerator: 'CmdOrCtrl+Y' },
      SEPARATOR,
      { role: 'cut', accelerator: 'CmdOrCtrl+X' },
      { role: 'copy', accelerator: 'CmdOrCtrl+C' },
      { role: 'paste', accelerator: 'CmdOrCtrl+V' },
      { role: 'pasteAndMatchStyle', accelerator: 'CmdOrCtrl+Shift+V' },
      { role: 'delete', accelerator: 'Delete' },
      { role: 'selectAll', accelerator: 'CmdOrCtrl+A' },
      SEPARATOR,
      findInPage,
      ...(app.isEmojiPanelSupported() ? [
        SEPARATOR,
        {
          label: t('menu.emojiPanel'),
          accelerator: 'Meta+.',
          registerAccelerator: false,
          click() {
            app.showEmojiPanel();
          }
        }
      ] : [])
    ]
  },
  {
    label: t('menu.appMenu.view'),
    submenu: view
  },
  {
    label: t('menu.tools'),
    submenu: [
      {
        label: t('common.history'),
        click(_, win) {
          if (!isTabWindow(win)) return;

          if (win.currentTab.webContents.getURL().startsWith('mth://history')) return;
          createTab(win, {
            url: 'mth://history'
          })
        }
      },
      ...tools,
      SEPARATOR,
      {
        label: t('menu.devTools'),
        accelerator: 'Ctrl+Shift+I',
        click(_, win) {
          let wc = obtainWebContents(win)
          wc.toggleDevTools()
        }
      },

    ]
  },
  {
    label: t('menu.appMenu.tab'),
    submenu: [
      {
        label: t('navigation.reload'),
        accelerator: "Ctrl+R",
        click(_, win) {
          let wc = obtainWebContents(win)
          wc.reload()
        }
      },
      {
        label: t('menu.tabs.hardReload'),
        accelerator: "Ctrl+Shift+R",
        click(_, win) {
          let wc = obtainWebContents(win)
          wc.reloadIgnoringCache()
        }
      },
      tabs_windows.find(i => i.id == 'close-tab')
    ]
  },
  {
    label: t('menu.appMenu.window'),
    submenu: [
      { role: 'minimize' },
      {
        label: t('menu.window.maximize') + '/' + t('menu.window.unmaximize'),
        click(_m, win) {
          if (win.isMaximized()) win.unmaximize()
          else win.maximize()
        }
      },
      tabs_windows.find(i => i.id == 'close-win'),
    ]
  }
])

Menu.setApplicationMenu(appMenu)


export function showAppMenu() {
  Menu.getApplicationMenu().popup();
}

export async function displayOptions(win: TabWindow, { x, y }) {
  let multiplier /* markiplier */ = config.get().ui.chromeZoomFactor

  let menu = Menu.buildFromTemplate([
    ...tabs_windows,
    SEPARATOR,
    findInPage,
    SEPARATOR,
    ...view,
    {
      label: t('menu.zoom.info', { zoom: win.currentTab.webContents.zoomFactor * 100 }),
      enabled: false
    },
    SEPARATOR,
    {
      label: t('common.history'),
      submenu: [
        {
          label: t('common.history'),
          click(_, win) {
            if (!isTabWindow(win)) return;

            if (win.currentTab.webContents.getURL().startsWith('mth://history')) return;
            createTab(win, {
              url: 'mth://history'
            })
          }
        },
        SEPARATOR,
        {
          label: t('menu.recentlyClosedTabs'),
          enabled: false
        },
        ...win.recentlyClosed.map((tab, i) => ({
          label: tab.lastTitle,
          sublabel: tab.lastURL,
          click() {
            openClosedTab(win, i)
          }
        }))
      ]
    },
    ...tools,
    SEPARATOR,
    {
      label: t('menu.common.quit'),
      click() {
        app.quit()
      }
    }
  ]);

  x = Math.round(x * multiplier);
  y = Math.round(y * multiplier);
  // if i dont multiply these by chromeZoomFactor, the menu will be way off
  // i think it's caused by the Menu.popup(), because, unlike BrowserView.setBounds() it doesn't automatically adjust for the zoom factor
  // (which makes sense, since it's not the zoom factor of the window, but the zoom factor of a BrowserView on top of it)

  menu.popup({ x, y, window: win });
  menu.on('menu-will-close', () => {
    // sending the input event so the chrome will update its styles and the button won't stay 'hovered'
    // basically if we don't update the thing, chrome's webContents will think the mouse is still hovering over the menu button
    win.chrome.webContents.sendInputEvent({
      type: 'mouseMove',
      x: 0, y: 0
    })
  })
}

export async function showContextMenu(win: TabWindow | false, tab: Tab, opts: Electron.ContextMenuParams) {
  //console.log(opts);

  function createContextTab(opts: TabOptions) {
    if (!win) return;
    return createTab(win, Object.assign({
      private: tab.private,
      position: win.tabs.indexOf(tab) + 1 || win.tabs.length
    }, opts))
  }

  let menu = new Menu();

  function addItem(obj: Electron.MenuItemConstructorOptions) {
    menu.append(new MenuItem(obj))
  }
  /**
   * Wrapper around the t(), adds "menu.contextMenu"
   */
  function $t(str: string, obj?: {}) {
    return t(`menu.contextMenu.${str}`, obj)
  }

  if (opts.altText) {
    addItem({ label: opts.altText, enabled: false })
    addItem(SEPARATOR)
  }

  if (opts.selectionText) {
    let searchConfig = config.get().search;
    let selectedSE = searchConfig.available[searchConfig.selectedIndex]

    if ($.isValidURL(opts.selectionText)) {
      if (!opts.selectionText.startsWith('http:')) {
        opts.selectionText = `http://${opts.selectionText}`
      }

      addItem({
        label: $t('openLink', { link: opts.selectionText }), sublabel: opts.selectionText,
        click() {
          createContextTab({ url: opts.selectionText })
        }
      })
    }
    addItem({ label: $t('search', { engine: selectedSE.name }), click() {
      createContextTab({ url: selectedSE.searchURL.replaceAll('%s', encodeURIComponent(opts.selectionText)) })
    } })
    addItem({ role: 'copy', accelerator: 'CmdOrCtrl+C' })
    if (opts.editFlags.canCut) {
      addItem({ role: 'cut', accelerator: 'CmdOrCtrl+X' })
    }
    if (opts.editFlags.canDelete) {
      addItem({ role: 'delete', accelerator: 'Delete' })
    }
    addItem(SEPARATOR)
  }
  if (opts.editFlags.canPaste) {
    addItem({ role: 'paste', accelerator: 'CmdOrCtrl+V' })
    addItem({ role: 'pasteAndMatchStyle', accelerator: 'CmdOrCtrl+Shift+V' })
    addItem(SEPARATOR)
  }

  if (opts.linkURL) {
    addItem({ label: $t('open.newTab'), click() { createContextTab({ url: opts.linkURL }) } })
    addItem({ label: $t('open.newPrivateTab'), click() { createContextTab({ url: opts.linkURL, private: true }) } })
    addItem({ label: $t('open.newWindow'), click() { newWindow([{ url: opts.linkURL, private: tab.private }]) } })
    addItem({ label: $t('open.thisTab'), click() { tab.webContents.loadURL(opts.linkURL) } })
    addItem(SEPARATOR)
    addItem({ label: $t('copyLink'), click() { clipboard.writeText(opts.linkURL) } })

    addItem(SEPARATOR)
  }

  if (opts.mediaType == 'image') {
    addItem({ label: $t('image.viewInNewTab'), click() { createContextTab({ url: opts.srcURL }) } })
    addItem({ label: $t('image.saveAs'), async click() {
      let response: Response;
      try {
        response = await fetch(opts.srcURL, {
          session: session.fromPartition(tab.private ? PRIVATE_PARTITION : DEFAULT_PARTITION),
          useSessionCookies: true
        });
        // Unfortunately, the image will be fetched again, and if the server retrns another image, then oops.
        // There's probably a way to do this with clipboard, but it's too messy even for me.
        
      } catch (e) {
        console.error(`Fetching image failed:`, e);
        dialog.showErrorBox($t('image.saving.error-title'), `Error: ${e}.`)
        return;
      }

      let contentType = response.headers.get('content-type') ?? '';
      let extension = contentType.slice(6) || pathModule.extname(opts.srcURL).slice(1);

      if (extension == '' || (contentType && !contentType.startsWith('image'))) {
        // maybe don't throw here?
        console.error(`Content-Type is not an image, or the image has no extension`);
        dialog.showErrorBox($t('image.saving.error-title'), $t('image.saving.error-notAnImage'))
        return;
      }

      let result = await dialog.showSaveDialog(win || null, {
        title: $t('image.saving.dialog'),
        properties: ['showHiddenFiles', 'createDirectory'],
        defaultPath: pathModule.join(config.get().behaviour.downloadPath || app.getPath('downloads'), `image.${extension}`)
      });

      if (result.canceled) return;

      if (!response.ok) {
        console.error(`Fetching image failed: ${response.statusText} (${response.status})`);
        dialog.showErrorBox($t('image.saving.error-title'), `Failed: ${response.status} - ${response.statusText}`)
        return;
      }

      let buf = await response.buffer();

      if (await exists(result.filePath)) {
        console.error(`Saving image failed: File with that name already exists`);
        dialog.showErrorBox($t('image.saving.error-title'), $t('image.saving.error-alreadyExists'))
        return;
        
      } else {
        await fs.promises.writeFile(result.filePath, buf);
        let dlData = await downloads.get();
        dlData.unshift({
          url: opts.srcURL,
          urlChain: [ opts.srcURL ],
          savePath: result.filePath,
          status: 'completed',
          offset: buf.byteLength,
          length: buf.byteLength
        })
        await downloads.set(dlData)
      }

    } })
    addItem({ label: $t('image.copy'), click() { tab.webContents.copyImageAt(opts.x, opts.y) } })
    addItem(SEPARATOR)
    addItem({ label: $t('image.copyURL'), click() { clipboard.writeText(opts.srcURL) } })

    addItem(SEPARATOR)
  }

  if (opts.frame != tab.webContents.mainFrame) {
    addItem({ label: $t('frame.reload'), click() { opts.frame.reload() } })
    addItem({ label: $t('frame.viewSourceCode'), click() {
      createContextTab({ url: `view-source:${opts.frame.url}` })
    } })
    addItem(SEPARATOR)
  }

  addItem({ label: t('navigation.back'), enabled: tab.webContents.canGoBack(), click() { tab.webContents.goBack() } })
  addItem({ label: t('navigation.forward'), enabled: tab.webContents.canGoForward(), click() { tab.webContents.goForward() } })
  addItem({ label: t('navigation.reload'), click() { tab.webContents.reload() } })
  addItem(SEPARATOR)
  addItem({ label: $t('savePageAs'), async click() {
    let result = await dialog.showSaveDialog(win || null, {
      title: $t('savePage_dialog', { page: tab.webContents.getURL() }),
      properties: [ 'showHiddenFiles', 'createDirectory' ],
      defaultPath: pathModule.join(config.get().behaviour.downloadPath || '/', opts.suggestedFilename || 'page'),
      filters: [ { extensions: ['html', 'htm'], name: 'HTML documents' } ]
    });

    if (result.canceled) return;

    let pageType = control.options.save_complete_page.value ? "HTMLComplete" as const : "HTMLOnly" as const
    tab.webContents.savePage(result.filePath, pageType)

  }, accelerator: 'Ctrl+S' })
  addItem({ label: $t('print'), click() {
    // TODO: print page
    dialog.showErrorBox("Not implemented", "Not implemented")
  }, accelerator: 'Ctrl+P' })
  addItem(SEPARATOR)
  addItem({ label: $t('viewSourceCode'), click() { createContextTab({ url: `view-source:${tab.webContents.getURL()}` }) } })
  addItem({ label: $t('openDevTools'), click() { tab.webContents.openDevTools() }, accelerator: 'Ctrl+Shift+I' })

  menu.popup()
}

export function menuOfTab(win: TabWindow, tab: Tab) {

  function createContextTab(opts: TabOptions) {
    return createTab(win, Object.assign({
      private: tab.private,
      position: win.tabs.indexOf(tab) + 1 || win.tabs.length
    }, opts))
  }

  let menu = new Menu();
  function addItem(options: Electron.MenuItemConstructorOptions) {
    menu.append(new MenuItem(options))
  }

  function $t(str: string, obj?: {}) {
    return t(`menu.tabMenu.${str}`, obj)
  }

  addItem({ label: $t('create-newTab'), accelerator: 'CmdOrCtrl+T', click() {
    createContextTab({
      private: false,
      url: $.newTabUrl
    })
  } })
  addItem({ label: $t('create-newPrivateTab'), accelerator: 'CmdOrCtrl+Shift+T', click() {
    createContextTab({ url: $.newTabUrl, private: true })
  } })
  addItem(SEPARATOR)
  addItem({ label: t('navigation.reload'), click() { tab.webContents.reload() } })
  addItem({
    label: $t('reloadAll'), click() {
      win.tabs.forEach(t => {
        t.webContents.reload()
      })
    }
  })
  addItem({ label: $t('copyURL'), click() { tab.webContents.getURL() } })
  addItem(SEPARATOR)
  addItem({ label: $t('duplicate'), click() {
    createContextTab({
      url: tab.webContents.getURL()
    })
  } })
  if (tab.webContents.audioMuted) {
    addItem({ label: $t('sound-unmute'), click() { setMutedTab(win, tab, false) } })

  } else {
    addItem({ label: $t('sound-mute'), click() { setMutedTab(win, tab, true) } })
  }
  addItem(SEPARATOR)
  addItem({
    label: $t('close-this'), accelerator: 'Ctrl+W', async click() {
      try {
        await closeTab(win, { tab }, true)

      } catch (e) {
        console.error('Menu item "Close tab" - error:', e)
      }
    }
  })
  addItem({
    label: $t('close-others'), click() {
      win.tabs.forEach(async otherTab => {
        if (otherTab == tab) return;

        try {
          await closeTab(win, { tab: otherTab }, true)

        } catch (e) {
          console.error('Menu item "Close other tabs" - error:', e)
        }
      })
    }
  })
  addItem({
    label: $t('close-right'), click() {
      let index = win.tabs.indexOf(tab);
      if (index == -1) console.error('Menu item "Close tabs to the right" - no tab found in window');

      win.tabs.forEach(async(tab, i) => {
        if (i <= index) return;

        try {
          await closeTab(win, { tab, id: i }, true)

        } catch (e) {
          console.error('Menu item "Close tabs to the right" - error:', e)
        }
      })
    }
  })

  menu.popup()
}

export function menuOfBookmark(win: TabWindow, bookmark: Bookmark, index: number) {
  let menu = new Menu();
  function addItem(options: Electron.MenuItemConstructorOptions) {
    menu.append(new MenuItem(options));
  }

  function t_menu(str: string, obj?: {}) {
    return t(`menu.contextMenu.${str}`, obj)
  }
  function t_bar(str: string, obj?: {}) {
    return t(`ui.bookmarkBar.${str}`, obj)
  }

  addItem({
    label: t_menu('copyLink'),
    sublabel: bookmark.url,
    click() {
      clipboard.writeText(bookmark.url)
    }
  })
  addItem(SEPARATOR)
  addItem({
    label: t_menu('open.newTab'),
    click() {
      createTab(win, { url: bookmark.url })
    }
  })
  addItem({
    label: t_menu('open.newPrivateTab'),
    click() {
      createTab(win, { url: bookmark.url, private: true })
    }
  })
  addItem({
    label: t_menu('open.newWindow'),
    click() {
      newWindow([{ url: bookmark.url }])
    }
  })
  addItem({
    label: t_menu('open.thisTab'),
    click() {
      win.currentTab.webContents.loadURL(bookmark.url)
    }
  })

  addItem(SEPARATOR)

  addItem({
    label: t_bar('edit'),
    click() {
      createTab(win, { url: `mth://bookmarks/#@bookmarkBar/edit:${index}` })
    }
  })
  addItem({
    label: t_bar('delete'),
    async click() {
      const bms = await bookmarks.get();
      bms["@bookmarkBar"].splice(index, 1);
      bookmarks.set(bms)
    }
  })

  addItem(SEPARATOR)

  addItem({
    label: t('common.bookmarks'),
    click() {
      createTab(win, { url: `mth://bookmarks/` })
    }
  })

  menu.popup();
}
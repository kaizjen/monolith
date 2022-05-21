// Manages all menu stuff

import { app, clipboard, dialog, Menu, MenuItem, session } from "electron";
import { Tab, TabOptions, TabWindow } from "./types";
import { isTabWindow, newWindow } from './windows'
import { config, control, downloads } from './userdata'
import * as pathModule from "path";
import * as fs from "fs"
import { closeTab, createTab, moveTab, openClosedTab } from './tabs'
import $ from './vars'
import fetch from "electron-fetch";
import type { Response } from "electron-fetch"
import { DEFAULT_PARTITION } from "./sessions";
import { t } from "./i18n";

function obtainWebContents(win: Electron.BrowserWindow | TabWindow) {
  return isTabWindow(win) ? (win as TabWindow).currentTab.webContents : win.webContents
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

let tabs_windows: Electron.MenuItemConstructorOptions[] = [
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
    accelerator: 'CmdOrCtrl+N'
  },
  SEPARATOR,
  {
    label: t('menu.common.newTab'),
    click(_m, win: TabWindow) {
      if (!isTabWindow(win)) return;

      createTab(win, {
        url: $.newTabUrl
      })
    },
    accelerator: 'CmdOrCtrl+T'
  },
  {
    label: t('menu.common.newPrivateTab'),
    click(_m, win: TabWindow) {
      if (!isTabWindow(win)) return;

      createTab(win, {
        url: 'mth://private',
        private: true
      })
    },
    accelerator: 'CmdOrCtrl+Shift+T'
  },
  SEPARATOR,
  {
    label: t('menu.tabs.close'),
    click(_m, win: TabWindow) {
      if (!isTabWindow(win)) return;

      closeTab(win, { tab: win.currentTab })
    },
    accelerator: 'CmdOrCtrl+W'
  },
  {
    label: t('menu.tabs.openClosed'),
    click(_m, win: TabWindow) {
      if (!isTabWindow(win)) return;

      openClosedTab(win)
    },
    accelerator: 'CmdOrCtrl+Shift+W'
  }
]
let tools: Electron.MenuItemConstructorOptions[] = [
  {
    label: t('common.downloads'),
    click(_, win: TabWindow) {
      if (!isTabWindow(win)) return;

      if (win.currentTab.webContents.getURL().startsWith('mth://downloads')) return;
      createTab(win, {
        url: 'mth://downloads'
      })
    }
  },
  {
    label: t('common.extensions'),
    click(_, win: TabWindow) {
      if (!isTabWindow(win)) return;

      if (win.currentTab.webContents.getURL().startsWith('mth://extensions')) return;
      createTab(win, {
        url: 'mth://extensions'
      })
    }
  },
  {
    label: t('common.bookmarks'),
    click(_, win: TabWindow) {
      if (!isTabWindow(win)) return;

      if (win.currentTab.webContents.getURL().startsWith('mth://bookmarks')) return;
      createTab(win, {
        url: 'mth://bookmarks'
      })
    }
  },
  {
    label: t('common.settings'),
    click(_, win: TabWindow) {
      if (!isTabWindow(win)) return;

      if (win.currentTab.webContents.getURL().startsWith('mth://settings')) return;
      createTab(win, {
        url: 'mth://settings'
      })
    }
  }
]

Menu.setApplicationMenu(Menu.buildFromTemplate([
  {
    label: t('name'),
    submenu: [
      ...tabs_windows,
      SEPARATOR,
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
        click(_, win: TabWindow) {
          let wc = obtainWebContents(win)
          wc.toggleDevTools()
        },
        visible: false
      },
      {
        label: 'zoomin-num-hidden',
        accelerator: 'CmdOrCtrl+numadd',
        click(_, win: TabWindow) {
          let wc = obtainWebContents(win)
          wc.emit('zoom-changed', {}, 'in')
        },
        visible: false
      },
      {
        label: 'zoomin-std-eq-hidden',
        // when you press the plus not on the numpad, but on the other keyboard, you actually press the equal sign!
        accelerator: 'CmdOrCtrl+=',
        click(_, win: TabWindow) {
          let wc = obtainWebContents(win)
          wc.emit('zoom-changed', {}, 'in')
        },
        visible: false
      },
      {
        label: 'zoomin-std-plus-hidden',
        accelerator: 'CmdOrCtrl++',
        click(_, win: TabWindow) {
          let wc = obtainWebContents(win)
          wc.emit('zoom-changed', {}, 'in')
        },
        visible: false
      },
      {
        label: 'zoomout-num-hidden',
        accelerator: 'CmdOrCtrl+numsub',
        click(_, win: TabWindow) {
          let wc = obtainWebContents(win)
          wc.emit('zoom-changed', {}, 'out')
        },
        visible: false
      },
      {
        label: 'zoomout-std-hidden',
        accelerator: 'CmdOrCtrl+-',
        click(_, win: TabWindow) {
          let wc = obtainWebContents(win)
          wc.emit('zoom-changed', {}, 'out')
        },
        visible: false
      },
      {
        label: "f5-reload-hidden",
        visible: false,
        accelerator: "F5",
        click(_, win: TabWindow) {
          let wc = obtainWebContents(win)
          wc.reload()
        }
      },
    ]
  },
  {
    label: t('menu.tools'),
    submenu: [
      {
        label: t('common.history'),
        click(_, win: TabWindow) {
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
        click(_, win: TabWindow) {
          let wc = obtainWebContents(win)
          wc.toggleDevTools()
        }
      },
      
    ]
  },
  {
    label: t('menu.currentTab'),
    submenu: [
      {
        label: t('navigation.reload'),
        accelerator: "Ctrl+R",
        click(_, win: TabWindow) {
          let wc = obtainWebContents(win)
          wc.reload()
        }
      },
      {
        label: t('menu.tabs.hardReload'),
        accelerator: "Ctrl+Shift+R",
        click(_, win: TabWindow) {
          let wc = obtainWebContents(win)
          wc.reloadIgnoringCache()
        }
      }
    ]
  }
]))


export async function displayOptions(win: TabWindow, { x, y }) {
  let multiplier /* markiplier */ = config.get().ui.chromeZoomFactor

  let menu = Menu.buildFromTemplate([
    ...tabs_windows,
    SEPARATOR,
    {
      label: t('common.history'),
      submenu: [
        {
          label: t('common.history'),
          click(_, win: TabWindow) {
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
    addItem({ type: 'separator' })
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
    addItem({ label: $t('copy'), accelerator: 'Ctrl+C', click() { tab.webContents.copy() } })
    addItem({ label: $t('cut'), accelerator: 'Ctrl+X', click() { tab.webContents.cut() } })
    addItem({ label: $t('paste'), accelerator: 'Ctrl+V', click() { tab.webContents.paste() } })
    addItem({ label: $t('pasteWithStyle'), accelerator: 'Ctrl+Shift+V', click() {
      tab.webContents.pasteAndMatchStyle()
    } })
    addItem({ type: 'separator' })
  }

  if (opts.linkURL) {
    addItem({ label: $t('open.newTab'), click() { createContextTab({ url: opts.linkURL }) } })
    addItem({ label: $t('open.newPrivateTab'), click() { createContextTab({ url: opts.linkURL, private: true }) } })
    addItem({ label: $t('open.newWindow'), click() { newWindow([{ url: opts.linkURL, private: tab.private }]) } })
    addItem({ label: $t('open.thisTab'), click() { tab.webContents.loadURL(opts.linkURL) } })
    addItem({ type: 'separator' })
    addItem({ label: $t('copyLink'), click() { clipboard.writeText(opts.linkURL) } })

    addItem({ type: 'separator' })
  }

  if (opts.mediaType == 'image') {
    addItem({ label: $t('image.viewInNewTab'), click() { createContextTab({ url: opts.srcURL }) } })
    addItem({ label: $t('image.saveAs'), async click() {
      let response: Response;
      try {
        response = await fetch(opts.srcURL, {
          session: session.fromPartition(DEFAULT_PARTITION),
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
    addItem({ type: 'separator' })
    addItem({ label: $t('image.copyURL'), click() { clipboard.writeText(opts.srcURL) } })

    addItem({ type: 'separator' })
  }

  if (opts.frame != tab.webContents.mainFrame) {
    addItem({ label: $t('frame.reload'), click() { opts.frame.reload() } })
    addItem({ label: $t('frame.viewSourceCode'), click() {
      createContextTab({ url: `view-source:${opts.frame.url}` })
    } })
    addItem({ type: 'separator' })
  }

  addItem({ label: t('navigation.back'), enabled: tab.webContents.canGoBack(), click() { tab.webContents.goBack() } })
  addItem({ label: t('navigation.forward'), enabled: tab.webContents.canGoForward(), click() { tab.webContents.goForward() } })
  addItem({ label: t('navigation.reload'), click() { tab.webContents.reload() } })
  addItem({ type: 'separator' })
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
  addItem({ type: 'separator' })
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
  addItem({ type: 'separator' })
  addItem({ label: t('navigation.reload'), click() { tab.webContents.reload() } })
  addItem({
    label: $t('reloadAll'), click() {
      win.tabs.forEach(t => {
        t.webContents.reload()
      })
    }
  })
  addItem({ label: $t('copyURL'), click() { tab.webContents.getURL() } })
  addItem({ type: 'separator' })
  addItem({ label: $t('duplicate'), click() {
    createContextTab({
      url: tab.webContents.getURL()
    })
  } })
  if (tab.webContents.audioMuted) {
    addItem({ label: $t('sound-unmute'), click() { tab.webContents.audioMuted = false } })

  } else {
    addItem({ label: $t('sound-mute'), click() { tab.webContents.audioMuted = true } })
  }
  addItem({ type: 'separator' })
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
  addItem({ type: 'separator' })
  addItem({
    label: 'Move right', click() {
      let index = win.tabs.indexOf(tab);

      moveTab(win, tab, index + 1)
    }
  })
  addItem({
    label: 'Move left', click() {
      let index = win.tabs.indexOf(tab);

      moveTab(win, tab, index == 1 ? index : index - 1)
    }
  })

  menu.popup()
}
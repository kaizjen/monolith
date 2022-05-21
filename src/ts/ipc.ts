// Manages the recieving IPC

import { ipcMain, BrowserWindow, clipboard, nativeTheme, safeStorage, dialog, shell, session } from "electron";
import type { WebContents, IpcMainEvent } from "electron";
import fetch from "electron-fetch";
import * as userData from "./userdata";
import type { TabWindow, TabOptions } from "./types"
import $ from "./vars";
import * as tabManager from './tabs'
import * as _url from "url";
import { displayOptions, menuOfTab } from "./menu";
import { getTabWindowByID, isTabWindow } from "./windows";
import type TypeFuse from "fuse.js";
import { DEFAULT_PARTITION, NO_CACHE_PARTITION } from "./sessions";
const Fuse = require('fuse.js') as typeof TypeFuse;
// must use require here because fuse.js, when require()d, doesnt have a .default property.

const URLParse = $.URLParse

let _historyLengthFeat = userData.control.options.max_history_for_hints
const maxHistoryHintLength = _historyLengthFeat?.type == 'num' ? _historyLengthFeat.value : 3000;

export function createDialog(wc: WebContents, type: string, arg: any) {
  return new Promise(resolve => {
    let win = BrowserWindow.fromWebContents(wc) as TabWindow;
    if (!win || !isTabWindow(win)) { resolve(null); return; }

    let { uniqueID: id } = win.tabs.find(tab => tab.webContents == wc);
    if (id == -1) { resolve(null); return; }

    function handleResponse(_e, channel: string, tabUID: number, response: string | null | boolean) {
      if (channel != 'dialog-response' || tabUID != id) return;

      resolve(response);
      win.chrome.webContents.off('ipc-message', handleResponse)
      win.chrome.webContents.send('dialog-close', id);
    }

    win.chrome.webContents.send('dialog-open', id, type, arg);
    win.chrome.webContents.on('ipc-message', handleResponse)
  })
}

export function init() {
  ipcMain.on('@window', (e, action) => {
    let win = BrowserWindow.fromWebContents(e.sender) as TabWindow;
    if (!win) return

    switch (action) {
      case 'min':
        win.minimize()
        win.once('restore', () => {
          // explanation at menu-mgr.ts, at the bottom of the only function there
          win.chrome.webContents.sendInputEvent({
            type: 'mouseMove',
            x: 0, y: 0
          })
        })
        break;
      case 'max':
        win.isMaximized() ? win.unmaximize() : win.maximize()
        break;
      case 'close':
        win.close();
        break;

      default:
        throw new Error("ipcManager.on[@window]: unknown action:" + action);
    }
  });
  ipcMain.on('@tab', (e, action, ...params) => {
    let win = BrowserWindow.fromWebContents(e.sender) as TabWindow;
    if (!win) return;

    let wc = win.currentTab.webContents;

    switch (action) {
      case 'back':
        wc.goBack();
        break;
      case 'fwd':
        wc.goForward()
        break;
      case 'refresh':
        wc.reload();
        break;
      case 'setZoom':
        wc.zoomFactor = params[0];
        win.chrome.webContents.send('zoomUpdate', wc.zoomFactor)
        break;
      case 'hardRefresh':
        wc.reloadIgnoringCache();

        break;
      case 'createDownload':
        wc.downloadURL(params[0])

        break;
      case 'go': {
        console.log('go', params);
        
        let q = params[0];

        if ($.isValidURL(q)) {
          win.currentTab.lastNavigationReason = 'input-url'
          if (URLParse(q).protocol) {
            wc.loadURL(q)
            
          } else {
            wc.loadURL('http://'+q)
          }

        } else {
          let searchConfig = userData.config.get().search;
          let SE = searchConfig.available[searchConfig.selectedIndex]

          win.currentTab.lastNavigationReason = `searched:${q}`
          wc.loadURL(SE.searchURL.replaceAll('%s', encodeURIComponent(q)))
        }

        break;
      }
      case 'search': {
        let q = params[0];
        let searchConfig = userData.config.get().search;
        let SE = searchConfig.available[searchConfig.selectedIndex]

        win.currentTab.lastNavigationReason = `searched:${q}` // the 'via' property in history
        wc.loadURL(SE.searchURL.replaceAll('%s', encodeURIComponent(q)))

        break;
      }
      case 'navigate-hint':
        win.currentTab.lastNavigationReason = 'input-url'
        // NO break!
      case 'navigate':
        wc.loadURL(params[0])
        break;

      case 'stop':
        wc.stop();
        break;

      case 'inputEvent': {
        // We're redirecting the mouse events so that even when chrome's BV is on top,
        // it doesn't seem as it's blocking anything
        const buttonMap = {
          0: 'left' as const,
          1: 'middle' as const,
          2: 'right' as const
        }
        const timesZoom = n => n * win.chrome.webContents.zoomFactor

        let [type, options] = params as [
          "mouseDown" | "mouseUp" | "mouseMove" | "mouseWheel",
          any
        ]

        wc.sendInputEvent(
          type == 'mouseWheel' ? {
            type,
            x: timesZoom(options.x),
            y: timesZoom(options.y) - win.chromeHeight,
            accelerationRatioX: options.accelX,
            accelerationRatioY: options.accelY,
            deltaX: options.deltaX,
            deltaY: options.deltaY,
          } :
          {
            type,
            button: buttonMap[(options as any).button],
            x: timesZoom(options.x),
            y: timesZoom(options.y) - win.chromeHeight,
            clickCount: 1
          }
        )
        break;
      }

      default:
        throw new Error("ipcManager.on[@tab]: unknown action:" + action);
    }
  })


  ipcMain.on('chrome:setHeight', (e, value: number) => {
    let win = BrowserWindow.fromWebContents(e.sender) as TabWindow;
    if (!win) return;

    win.chromeHeight = Math.round(value * win.chrome.webContents.zoomFactor);
    console.log('height being set to', win.chromeHeight);
    
    win.setSheetOffset(win.chromeHeight);

    win.currentTab?.setBounds({ x: 0, y: win.chromeHeight, width: win.getContentBounds().width, height: win.getContentBounds().height - win.chromeHeight })
  })
  ipcMain.on('chrome:setTop', (e, isTop: boolean) => {
    let win = BrowserWindow.fromWebContents(e.sender) as TabWindow;
    if (!win) return;

    console.log('settop', isTop);
    if (isTop) {
      win.setTopBrowserView(win.chrome)

    } else {
      win.setTopBrowserView(win.currentTab)
    }
  })
  ipcMain.on('chrome:browserMenu', (e, pos) => {
    let win = BrowserWindow.fromWebContents(e.sender) as TabWindow;
    if (!win) return;

    displayOptions(win, pos);
  })
  ipcMain.on('chrome:menu-of-tab', (e, tabID: number) => {
    let win = BrowserWindow.fromWebContents(e.sender) as TabWindow;
    if (!win) return;

    let tab = win.tabs[tabID];
    if (!tab) throw(new Error("ipcManager: no tab found in window"))

    menuOfTab(win, tab)
  })


  ipcMain.on('tab:isForeground', (e) => {
    let win = BrowserWindow.fromWebContents(e.sender) as TabWindow;
    if (!win) {e.returnValue = false; return;}
    let tab = win.tabs.find(t => t.webContents == e.sender);
    if (!tab) {e.returnValue = false; return;}

    console.log('isForeground?');
    e.returnValue = win.currentTab == tab;
  })


  ipcMain.on('parseURL', (e, url: string) => {
    e.returnValue = URLParse(String(url))
  })

  ipcMain.on('newTab', (e, options: TabOptions = { url: $.newTabUrl }) => {
    let win = BrowserWindow.fromWebContents(e.sender) as TabWindow;
    if (!win) return;

    tabManager.createTab(win, options);
  })
  ipcMain.on('selectTab', (e, id: number) => {
    let win = BrowserWindow.fromWebContents(e.sender) as TabWindow;
    if (!win) return;

    tabManager.selectTab(win, { id });
  })
  ipcMain.on('closeTab', async(e, id: number, keepAlive?: boolean) => {
    let win = BrowserWindow.fromWebContents(e.sender) as TabWindow;
    if (!win) return;

    let tab = win.tabs[id];
    if (!tab) return;

    tabManager.closeTab(win, { id, tab }, keepAlive);
  })

  ipcMain.on('getHints', async (e, query: string) => {
    // MAYBE: move getHints to another place?
    console.log('querying hints for %o', query);
    
    let win = BrowserWindow.fromWebContents(e.sender) as TabWindow;
    if (!win) return;

    let hints: ({
      internal: 'url'
      title?: string
      url: string
    } | {
      internal: 'search'
      text: string
      type: string
    })[] = [];
    if ($.isValidURL(query)) {
      hints.push({
        url: URLParse(query).protocol ? query : 'http://' + query,
        internal: 'url'
      })
    }
    try {
      let history = await userData.history.get();

      if (history.length > maxHistoryHintLength) {
        history.length = maxHistoryHintLength;
      }

      let instance = new Fuse(history, {
        sortFn: (a, b) => a.score - b.score,
        ignoreLocation: true,
        keys: ['url', 'title']
      })

      let matches = instance.search(query);

      let merged = matches
        .map(({ item }) => ({
          title: item.title,
          url: item.url,
          internal: 'url' as 'url'
        }))
        .filter($.uniqBy((val1, val2) => val1.title == val2.title && val2.url == val2.url))
      ;
      
      if (merged.length > 5) {
        merged.length = 5
      }
      
      hints.push(...merged)

    } catch (e) {
      console.log('There was an error while trying to get history-based hints:', e);
    }
    block: try {
      let { privacy } = userData.config.get();
      if (!privacy.useSuggestions) break block;

      let _searchTemp = userData.config.get().search;
      let searchEngine = _searchTemp.available[_searchTemp.selectedIndex]
      if (win.currentTab.private || query.startsWith('mth:')) break block;

      let suggestAlgorithm: (res) => (Promise<string[]> | string[]) = $.searchHintAlgorithms[
        searchEngine.suggestAlgorithm == 'google-like' ? 'googleLike' :
          searchEngine.suggestAlgorithm == 'startpage-like' ? 'startpageLike' :
            searchEngine.suggestAlgorithm == 'extension' ? 'extension' :
              searchEngine.suggestAlgorithm == 'find' ? 'finder' :
                // if extension adds its own search engine with its own hinting alrorithm, use it instead.
                searchEngine.suggestAlgorithm
      ]

      const response = await fetch(
        searchEngine.suggestURL.replaceAll('%s', encodeURIComponent(query)),
        {
          session: session.fromPartition(privacy.hideSessionForSuggestions ? NO_CACHE_PARTITION : DEFAULT_PARTITION)
        }
      )

      let suggestions = (await suggestAlgorithm(response)).map(text => ({
        text, internal: 'search' as 'search', type: `${searchEngine.name} search`
      }))

      hints.push(...suggestions);

      if (hints.length > 12) {
        hints.length = 12
      }

    } catch (e) {
      console.log('There was an error while trying to get hints:', e);
    }
    win.chrome.webContents.send('gotHints', hints)
    //console.log('gotHints:: ', hints);
  })

  ipcMain.handle('userData/downloads', async(_e, action, index) => {
    switch (action) {
      case 'get': {
        return await userData.downloads.get()
      }
      case 'del': {
        let dl = await userData.downloads.get();
        dl.splice(index, 1);
        await userData.downloads.set(dl)
        return true;
      }
      case 'start': {
        let dl = await userData.downloads.get();
        let { urlChain } = dl[index];
        getTabWindowByID(0).currentTab.webContents.downloadURL(urlChain.at(-1))
        return true;
      }
    }
  })

  function onTab(msg: string, fn: (e: Electron.IpcMainInvokeEvent, ...args: any[]) => any) {
    ipcMain.handle(`tab:${msg}`, async(...args) => {
      try {
        return await fn(...args)
      } catch (error) {
        return { isError: true, error: error.stack }
      }
    })
  }
  function onTabSync(msg: string, fn: (e: Electron.IpcMainEvent, ...args: any[]) => any) {
    ipcMain.on(`tab:${msg}`, (...args) => {
      try {
        return fn(...args)
      } catch (error) {
        return { isError: true, error: error.stack }
      }
    })
  }

  onTabSync('prompt', async (e, msg: string, defaultValue: string) => {
    e.returnValue = await createDialog(
      e.sender,
      'prompt',
      { msg, defaultValue }
    );
  })
  onTabSync('alert', async (e, msg: string) => {
    console.log('al:', await createDialog(
      e.sender,
      'alert',
      { msg }
    ))
    e.returnValue = undefined;
  })
  onTabSync('confirm', async (e, msg: string) => {
    e.returnValue = await createDialog(
      e.sender,
      'confirm',
      { msg }
    );
  })


  function onInternal(msg: string, fn: (e: Electron.IpcMainInvokeEvent, ...args: any[]) => any) {
    ipcMain.handle(`internal:${msg}`, async(...args) => {
      try {
        return await fn(...args)
      } catch (error) {
        return { isError: true, error: error.stack }
      }
    })
  }
  function onInternalSync(msg: string, fn: (e: Electron.IpcMainEvent, ...args: any[]) => any) {
    ipcMain.on(`internal:${msg}`, (...args) => {
      try {
        return fn(...args)
      } catch (error) {
        return { isError: true, error: error.stack ?? error }
      }
    })
  }
  
  onInternalSync('clipboard', (e, action, arg) => {
    try {
      e.returnValue = clipboard[action](arg)

    } catch (_err) {
      e.returnValue = { error: `Error: ${_err}` }
    }
  })
  onInternal('userData', async(_e, action, obj, obj2) => {
    switch (action) {
      case 'config': {
        return userData.config.get()
      }
      case 'config:set': {
        return userData.config.set(obj)
      }
      case 'lastlaunch': {
        return userData.lastlaunch.get()
      }
      case 'lastlaunch:set': {
        return userData.lastlaunch.set(obj)
      }
      case 'history': {
        // obj is { entries: number, offset: number }
        let history = await userData.history.get();
        if (obj.offset) {
          history = history.slice(obj.offset)
        }
        history.length = obj.entries;
        return history;
      }
      case 'history:set': {
        let history = obj;
        return await userData.history.set(history)
      }
      case 'history:setAt': {
        // obj is { index: number }
        let history = await userData.history.get();
        history[obj.index] = obj2;
        return await userData.history.set(history)
      }
      case 'history:find': {
        // TODO: use Fuse for this
        let history = await userData.history.get();
        let i: number[];
        function occurrences(string: string, subString: string, allowOverlapping?: boolean) {
          // source: https://stackoverflow.com/a/7924240
          string += "";
          subString += "";
          if (subString.length <= 0) return (string.length + 1);

          var n = 0,
            pos = 0,
            step = allowOverlapping ? 1 : subString.length;

          while (true) {
            pos = string.indexOf(subString, pos);
            if (pos >= 0) {
              ++n;
              pos += step;
            } else break;
          }
          return n;
        }

        if (obj.type == 'text') {
          obj.text = obj.text.trim().toLowerCase();
          i = history.map((hi, i) => {
            let likability = 0;
            let title = decodeURI(hi.title).trim().toLowerCase()
            let url = decodeURI(hi.url).trim().toLowerCase()
            likability += (title.includes(obj.text) ? 1 : 0);
            likability += (url.includes(obj.text) || url.includes(obj.text.replaceAll(' ', '-')) || url.includes(obj.text.replaceAll(' ', '_')) ? 1 : 0);
            likability += (title.startsWith(obj.text) || title.endsWith(obj.text) ? 1 : 0);
            likability += (url.startsWith(obj.text) || url.endsWith(obj.text) ? 1 : 0);
            likability += occurrences(title, obj.text);

            return {i, likability};

          }).filter(l => l.likability > 3).sort((a, b) => b.likability - a.likability).map(x => x.i)
          
        } else {
          let findDate = obj.date;
          let c = obj.compare;
          i = history.filter(({ timestamp }) => {
            if (c == 'lt') {
              return timestamp < findDate;

            } else if(c == 'gt') {
              return timestamp > findDate;

            } else {
              let date1 = new Date(timestamp);
              let date2 = new Date(findDate);

              return date1.getDate() == date2.getDate() && 
                     date1.getMonth() == date2.getMonth() &&
                     date1.getFullYear() == date2.getFullYear();
            }

          }).map(el => history.indexOf(el))
        }
        return i;
      }
    
      default:
        throw new Error('userData: unknown command')
    }
  })
  onInternalSync('getTheme', (e) => {
    e.returnValue = nativeTheme.shouldUseDarkColors ? 'dark' : 'light'
  })
  onInternal('safeStorage', (_e, action, str, enc) => {
    switch (action) {
      case 'check': {
        return safeStorage.isEncryptionAvailable()
      }
      case 'en': {
        return safeStorage.encryptString(str).toString(enc || 'base64')
      }
      case 'de': {
        return safeStorage.decryptString(Buffer.from(str as string, enc || 'base64'))
      }
    
      default:
        throw new Error(`[safeStorage] Unknown action: ${action}`)
    }
  })
  onInternal('dialog', async(e, action: string, options) => {
    const win = BrowserWindow.fromWebContents(e.sender)
    if (!win) return;

    switch (action) {
      case 'dir': {
        return await dialog.showOpenDialog(win, {
          properties: [ 'openDirectory', 'createDirectory', ...(options.properties || []) ],
          title: options.title,
          message: options.message,
          buttonLabel: options.buttonLabel,
          filters: options.filters
        })
      }
    
      default:
        throw new Error(`[dialog] unknown action: ${action}`)
    }
  })

  onInternal('shell', (_e, action: string, arg: string) => {
    return shell[action](arg)
  })

  onInternal('session', async(e, action: string, arg) => {
    const session: Electron.Session = e.sender.session;

    switch (action) {
      case 'clear': {
        const available = [
          'appcache', 'cookies', 'filesystem', 'indexdb',
          'localstorage', 'shadercache', 'websql', 'serviceworkers', 'cachestorage'
        ]
        let storages = [];

        for (const type in arg) {
          const value = arg[type];
          if (value && available.includes(type)) {
            storages.push(type)
          }
        }

        console.log('Clearing items:', storages);
        
        return await session.clearStorageData({
          storages
        })
      }
      case 'isPrivate': {
        return !session.isPersistent()
      }
    
      default:
        throw new Error(`[session]: Unknown action: ${action}`);
    }
  })
}

export function webContentsOnce(wc: WebContents, id: string, fn: Function) {
  function Recieve(e: IpcMainEvent, ...args: any[]) {
    if (e.sender == wc) {
      fn(e, ...args)
      ipcMain.off(id, Recieve)
    }
  }

  ipcMain.on(id, Recieve)
}

export function webContentsOn(wc: WebContents, id: string, fn: Function) {
  ipcMain.on(id, function (e: IpcMainEvent, ...args: any[]) {
    if (e.sender == wc) {
      fn(e, ...args)
    }
  })
}

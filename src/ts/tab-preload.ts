// Preload for tabs

const { contextBridge: { exposeInMainWorld: expose }, ipcRenderer, webFrame } = require('electron');

webFrame.setIsolatedWorldInfo(1, {
  name: "Monolith's shared extension context"
})

console.log('preload running', webFrame, webFrame == webFrame.top);

class MonolithError extends Error {
  constructor(msg: string) {
    super(msg);
    this.name = 'MonolithError'
  }
}

async function sendInternal(id: string, ...args: any[]) {
  let val = await ipcRenderer.invoke(`internal:${id}`, ...args);
  if (typeof val == 'object' && val.isError == true) {
    throw new MonolithError(val.error);
  }
  return val;
}
function sendInternalSync(id: string, ...args: any[]) {
  return ipcRenderer.sendSync(`internal:${id}`, ...args)
}

if (location.protocol == 'mth:') {
  expose('monolith', {
    clipboard: {
      readText: () => sendInternalSync('clipboard', 'readText'),
      writeText: (str: string) => sendInternalSync('clipboard', 'writeText', str),
    },
    userdata: {
      config: {
        get: () => sendInternal('userData', 'config'),
        set: (config: any) => sendInternal('userData', 'config:set', config),
      },
      history: {
        get: ({ entries = 20, offset }) => sendInternal('userData', 'history', { entries, offset }),
        setAt: ({ index }, obj: any) => sendInternal('userData', 'history:setAt', { index }, obj),
        set: (obj: any) => sendInternal('userData', 'history:set', obj),
        find: (finder: { type: 'text', text: string } | { type: 'date', date: number, compare: 'lt' | 'gt' | 'eq' }) => sendInternal('userData', 'history:find', finder),
      },
      downloads: {
        get: () => sendInternal('userData', 'downloads'),
        delete: (index: number) => sendInternal('userData', 'downloads:del', index),
        start: (index: number) => sendInternal('userData', 'downloads:start', index),
      }
    },
    interface: {
      getTheme: () => sendInternalSync('getTheme')
    },
    safeStorage: {
      isAvailable: () => sendInternal('safeStorage', 'check'),
      encrypt: (str, enc?) => sendInternal('safeStorage', 'en', str, enc),
      decrypt: (enStr, enc?) => sendInternal('safeStorage', 'de', enStr, enc),
    },
    dialog: {
      selectDirectory: (options) => sendInternal('dialog', 'dir', options)
    },
    shell: {
      showItemInFolder: (item) => sendInternal('shell', 'showItemInFolder', item),
      openPath: (path) => sendInternal('shell', 'openPath', path),
      beep: () => sendInternal('shell', 'beep'),
      readShortcutLink: (linkPath) => sendInternal('shell', 'readShortcutLink', linkPath)
    },
    session: {
      clearData: (clearObj) => sendInternal('session', 'clear', clearObj),
      isPrivate: () => sendInternal('session', 'isPrivate')
    }
  })
}

if (location.protocol == 'chrome-error:') {
  expose('PostMainMessage', (msg) => {
    ipcRenderer.send('chrome-error:' + msg)
  })
}

function isForeground() {
  return ipcRenderer.sendSync('tab:isForeground')
}

function requestMain(id: string, ...args: any[]) {
  return ipcRenderer.invoke(`tab:${id}`, ...args)
}
function requestMainSync(id: string, ...args: any[]) {
  return ipcRenderer.sendSync(`tab:${id}`, ...args)
}


expose('[MONOLITH]', {
  extendNavigator: {
    requestPresence() {
      // this is just a test API, // TODO: remove it
      return ipcRenderer.sendSync('tab:requestPresence')
    },
    fuckYou() {
      ipcRenderer.sendSync('nope')
    }
  },
  extendWindow: {
    prompt(t, defaultValue) {
      return ipcRenderer.sendSync('tab:prompt', t, defaultValue)
    },
    alert(message) {
      return ipcRenderer.sendSync('tab:alert', message)
    },
    confirm(message) {
      return ipcRenderer.sendSync('tab:confirm', message)
    }
  }
})

webFrame.executeJavaScript(`(function() {
  let { extendNavigator, extendWindow } = window['[MONOLITH]'];
  
  for (let prop in extendNavigator) {
    window.navigator[prop] = extendNavigator[prop]
  }
  
  for (let prop in extendWindow) {
    window[prop] = extendWindow[prop]
  }
  
  delete window['[MONOLITH]']; // doesn't work anyway
}());`)
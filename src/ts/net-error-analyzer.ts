// Handles net errors. It's just so large i needed to put it in another file

import { ipcMain, WebContents, WebFrameMain, webFrameMain } from "electron";
import * as fs from 'fs'
import { control } from "./userdata";

const URLParse = (url: string) => new URL(url)

export function handleNetError(
  webc: WebContents, _e, errCode: number, errorDescription: string,
  url: string, isMainFrame: boolean, framePID: number, frameRID: number
) {
  if (errCode == -3 || errCode == -1) { return null; } // The load was cancelled by user or an async API isn't done yet

  console.log('net error:', errCode, errorDescription);
  let frame: WebFrameMain;
  try {
    frame = webFrameMain.fromId(framePID, frameRID);
    
  } catch (e) {
    // sometimes throws an error, ignore
  }

  let errInfo = {
    info: '',
    detail: '',
    code: errorDescription,
    moreJS: null
  };
  let { host, pathname } = URLParse(url);

  if (-99 <= errCode && errCode <= -1) {
    errInfo.info = "An unknown local error has occured"
    errInfo.detail = "Something went wrong on this device, for example the browser ran out of memory or a firewall blocked the request"

  } else if (-199 <= errCode && errCode <= -100) {
    errInfo.info = "An unknown connection error has occured"
    errInfo.detail = "Something went wrong while connecting to the server, for example the connection was refused or you have connected to another network"

  } else if (-299 <= errCode && errCode <= -200) {
    errInfo.info = "A certificate error has occured"
    errInfo.detail = "We can't trust the certificate of the host <b>" + host + "</b>."

  } else if (-399 <= errCode && errCode <= -300) {
    errInfo.info = "An unknown HTTP error has occured"
    errInfo.detail = "This could mean that the URL (" + url + ") is invalid or the server sent an incorrect response. Check the spelling of the URL and try again."

  } else if (-499 <= errCode && errCode <= -400) {
    errInfo.info = "The cache seems to be corrupted"
    errInfo.detail = "This could mean that your OS has rejected a cache operation or the cache was corrupted.<br>" +
      "<a id='reload-nocache' class='btn'>Reload ignoring cache.</a>"
    if (isMainFrame) {
      errInfo.moreJS = `document.getElementById('reload-nocache').onclick = () => { PostMainMessage('reloadIgnoringCache') }`
      function onMessagePosted(e) {
        if (e.senderFrame == frame) {
          webc.reloadIgnoringCache();
          ipcMain.off('chrome-error:reloadIgnoringCache', onMessagePosted)
        }
      }
      ipcMain.on('chrome-error:reloadIgnoringCache', onMessagePosted)
    }

  } else {
    errInfo.info = "An unknown error has occured"
    errInfo.detail = "That's all we know. Well, we also know this error code:"

  }

  // now we get more specific
  switch (errCode) {
    case -105:
      errInfo.info = "We can't get access to this site."
      errInfo.detail = "Here's what you can do:<br>" +
        "<ul><li>Check if there are any typos in the host name <b>" + host + "</b>.</li>" +
        "<li>Run network diagnostics</li>" +
        "<li>Change DNS over HTTPS settings</li></ul>"
      break;
    case -6:
      errInfo.info = "We can't get access to this file."
      errInfo.detail = "Perhaps, file at '<b>" + (pathname ?? url) + "</b>' was moved or deleted"
      break;
    case -8:
      errInfo.info = "This file is too big"
      errInfo.detail = "That thing is massive! Do you think I can handle opening it?" // very funny btw
      break;
    case -10:
      errInfo.info = "Access denied"
      errInfo.detail = "Permission to access a file or a shared resource was denied."
      break;
    case -19:
      errInfo.info = "This file is infected with a virus"
      errInfo.detail = "The file at '<b>" + pathname + "</b>' is infected. It is recommended that you delete it."
      break;
    case -20:
      errInfo.info = "This request was blocked."
      errInfo.detail = "Perhaps, an extension prevented the request." + control.options.disallow_http?.value ?
        "<br>You have a control option disallow_http enabled. It's likely that the request was blocked because of this option." : ""
      break;
    case -21:
      errInfo.info = "The network changed."
      errInfo.detail = "Perhaps, you connected to another Wi-Fi or Ethernet network."
      break;
    case -27:
      errInfo.info = "This page refused to be displayed like that."
      errInfo.detail = "The server sent a response that prevents this page from being displayed, for example, in a frame on another page."
      break;
    case -30:
      errInfo.info = "The request was blocked by Content Security Policy."
      errInfo.detail = "<a target='_blank' href='https://en.wikipedia.org/wiki/Content_Security_Policy' class='btn'>Learn more about CSP. (Wikipedia)</a>"
      break;
    case -100:
      errInfo.info = "Connection closed."
      break;
    case -101:
      errInfo.info = "The connection was reset."
      errInfo.detail = "Something prevented Monolith from connecting to the host. Maybe your firewall blocked the request, or your internet provider might've blocked the connection,"+
        " or the server unexpectedly stopped."
      break;
    case -102:
      errInfo.info = "Connection refused."
      break;
    case -104:
      errInfo.info = "Connection failed."
      break;
    case -106:
      errInfo.info = "The internet connection has been lost."
      errInfo.detail = "That's all we know."
      break;
    case -107:
      errInfo.info = "An SSL error occured."
      errInfo.detail = "That means we couldn't establish a secure connection with the website."
      break;
    case -108:
      errInfo.info = "The IP address is invalid."
      errInfo.detail = "Check if your provider is competent enough or clear your DNS cache."
      break;
    case -109:
      errInfo.info = "We couldn't reach that IP address."
      errInfo.detail = "That's all we know."
      break;
    case -113:
      errInfo.info = "This site cannot establish a secure connection."
      errInfo.detail = "Perhaps, there was a mismatch of the SSL version used by the client and the server. Also, check if this site supports HTTPS connection at all."
      break;
    case -300:
      errInfo.info = "The URL is invalid"
      errInfo.detail = "The page at '<b>" + url + "'</b> doesn't exist or was moved to another address."
      break;
  }

  frame.executeJavaScript('document.documentElement.innerHTML = `' + fs.readFileSync('src/browser/mth/net-err-template.html', 'utf-8').replaceAll('`', '\\`') + '`');
  frame.executeJavaScript(`document.getElementById('info').innerHTML = "${errInfo.info.replaceAll('"', '\\"')}"`);
  frame.executeJavaScript(`document.getElementById('detail').innerHTML = "${errInfo.detail.replaceAll('"', '\\"')}"`);
  frame.executeJavaScript(`document.getElementById('code').innerHTML = "${errInfo.code.replaceAll('"', '\\"')}"`);
  errInfo.moreJS ? frame.executeJavaScript(errInfo.moreJS) : null;
}

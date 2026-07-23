'use strict';

async function downloadSingle(url, filename) {
  try {
    await chrome.downloads.download({ url, filename, saveAs: false });
    return { ok: true };
  } catch (err) {
    return { ok: false, error: err.message };
  }
}

const HISTORY_KEY = 'im_color_history';

async function saveColor(color) {
  try {
    const data = await chrome.storage.local.get(HISTORY_KEY);
    let history = data[HISTORY_KEY] || [];
    const dup = history.findIndex(c => c.hex === color.hex);
    if (dup !== -1) history.splice(dup, 1);
    history.unshift(color);
    if (history.length > 50) history.length = 50;
    await chrome.storage.local.set({ [HISTORY_KEY]: history });
    return { ok: true, history };
  } catch (err) {
    return { ok: false, error: err.message };
  }
}

async function loadColors() {
  try {
    const data = await chrome.storage.local.get(HISTORY_KEY);
    return { ok: true, history: data[HISTORY_KEY] || [] };
  } catch (err) {
    return { ok: false, error: err.message };
  }
}

async function clearColors() {
  try {
    await chrome.storage.local.set({ [HISTORY_KEY]: [] });
    return { ok: true };
  } catch (err) {
    return { ok: false, error: err.message };
  }
}

async function removeColor(index) {
  try {
    const data = await chrome.storage.local.get(HISTORY_KEY);
    let history = data[HISTORY_KEY] || [];
    if (index >= 0 && index < history.length) {
      history.splice(index, 1);
      await chrome.storage.local.set({ [HISTORY_KEY]: history });
    }
    return { ok: true, history };
  } catch (err) {
    return { ok: false, error: err.message };
  }
}

chrome.runtime.onMessage.addListener((msg, sender, sendResponse) => {
  switch (msg.type) {
    case 'downloadImage':
      downloadSingle(msg.url, msg.filename).then(sendResponse);
      return true;
    case 'saveColor':
      saveColor(msg.color).then(sendResponse);
      return true;
    case 'loadColors':
      loadColors().then(sendResponse);
      return true;
    case 'clearColors':
      clearColors().then(sendResponse);
      return true;
    case 'removeColor':
      removeColor(msg.index).then(sendResponse);
      return true;
  }
});

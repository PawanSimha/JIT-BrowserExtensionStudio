'use strict';

// ---- ZipWriter ----
class ZipWriter {
  constructor() {
    this.files = [];
    this._table = this._makeCRC32Table();
  }
  _makeCRC32Table() {
    const t = new Uint32Array(256);
    for (let i = 0; i < 256; i++) {
      let c = i;
      for (let j = 0; j < 8; j++) c = (c & 1) ? (0xEDB88320 ^ (c >>> 1)) : (c >>> 1);
      t[i] = c;
    }
    return t;
  }
  _crc32(data) {
    const t = this._table;
    let c = 0xFFFFFFFF;
    for (let i = 0; i < data.length; i++) c = t[(c ^ data[i]) & 0xFF] ^ (c >>> 8);
    return (c ^ 0xFFFFFFFF) >>> 0;
  }
  get fileCount() { return this.files.length; }
  add(name, data) {
    if (data instanceof ArrayBuffer) data = new Uint8Array(data);
    const enc = new TextEncoder().encode(name);
    this.files.push({ name: enc, data, crc: this._crc32(data) });
  }
  _fileHeader(name, crc, size) {
    const b = new Uint8Array(30 + name.length);
    const d = new DataView(b.buffer);
    d.setUint32(0, 0x04034b50, true);
    d.setUint16(4, 20, true);
    d.setUint16(6, 0x0800, true);
    d.setUint16(8, 0, true);
    d.setUint16(10, 0, true);
    d.setUint16(12, 0, true);
    d.setUint32(14, crc, true);
    d.setUint32(18, size, true);
    d.setUint32(22, size, true);
    d.setUint16(26, name.length, true);
    d.setUint16(28, 0, true);
    b.set(name, 30);
    return b;
  }
  _cdEntry(name, crc, size, off) {
    const b = new Uint8Array(46 + name.length);
    const d = new DataView(b.buffer);
    d.setUint32(0, 0x02014b50, true);
    d.setUint16(4, 20, true);
    d.setUint16(6, 20, true);
    d.setUint16(8, 0x0800, true);
    d.setUint16(10, 0, true);
    d.setUint16(12, 0, true);
    d.setUint16(14, 0, true);
    d.setUint32(16, crc, true);
    d.setUint32(20, size, true);
    d.setUint32(24, size, true);
    d.setUint16(28, name.length, true);
    d.setUint16(30, 0, true);
    d.setUint16(32, 0, true);
    d.setUint16(34, 0, true);
    d.setUint16(36, 0, true);
    d.setUint32(38, 0, true);
    d.setUint32(42, off, true);
    b.set(name, 46);
    return b;
  }
  generate() {
    const parts = [];
    let off = 0;
    const offsets = [];
    for (const f of this.files) {
      offsets.push(off);
      parts.push(this._fileHeader(f.name, f.crc, f.data.length));
      parts.push(f.data);
      off += 30 + f.name.length + f.data.length;
    }
    const cdStart = off;
    const cd = [];
    for (let i = 0; i < this.files.length; i++) {
      const f = this.files[i];
      const entryOff = offsets[i];
      cd.push(this._cdEntry(f.name, f.crc, f.data.length, entryOff));
      off += 46 + f.name.length;
    }
    const cdSize = off - cdStart;
    const eocd = new Uint8Array(22);
    const d = new DataView(eocd.buffer);
    d.setUint32(0, 0x06054b50, true);
    d.setUint16(4, 0, true);
    d.setUint16(6, 0, true);
    d.setUint16(8, this.files.length, true);
    d.setUint16(10, this.files.length, true);
    d.setUint32(12, cdSize, true);
    d.setUint32(16, cdStart, true);
    d.setUint16(20, 0, true);
    return new Blob([...parts, ...cd, eocd], { type: 'application/zip' });
  }
}

function sanitizeFilename(name) {
  return name.replace(/[<>:"/\\|?*\x00-\x1f]/g, '_').substring(0, 200);
}

function zipFilenameFromUrl(url, ext, index) {
  if (url.startsWith('data:')) {
    const prefix = ['mp4','webm','mov','flv'].includes(ext) ? 'video' : ['mp3','m4a','wav','ogg','aac','weba'].includes(ext) ? 'audio' : 'image';
    return `${prefix}_${index}.${ext === 'jpeg' ? 'jpg' : ext}`;
  }
  try {
    const u = new URL(url);
    const parts = u.pathname.split('/');
    let name = parts[parts.length - 1] || `media_${index}`;
    if (!name.includes('.')) name += `.${ext}`;
    return sanitizeFilename(name);
  } catch {
    return `media_${index}.${ext}`;
  }
}

async function downloadBatch(items, imageType) {
  const zip = new ZipWriter();
  let errors = 0;
  const MAX_SIZE = 50 * 1024 * 1024;
  for (let i = 0; i < items.length; i++) {
    const item = items[i];
    try {
      const resp = await fetch(item.src);
      if (!resp.ok) { errors++; continue; }
      const buf = await resp.arrayBuffer();
      if (buf.byteLength > MAX_SIZE) { errors++; continue; }
      const fn = zipFilenameFromUrl(item.src, item.type || 'img', i + 1);
      zip.add(fn, new Uint8Array(buf));
    } catch {
      errors++;
    }
  }
  if (zip.fileCount === 0) {
    throw new Error(`Could not fetch any files (${errors} failed)`);
  }
  const blob = zip.generate();
  const url = URL.createObjectURL(blob);
  const ext = imageType && imageType !== 'all' ? `_${imageType}` : '';
  const zipName = `Imageination${ext}.zip`;
  await chrome.downloads.download({ url, filename: zipName, saveAs: false });
  setTimeout(() => URL.revokeObjectURL(url), 60000);
}

// ---- Media globals ----
let allItems = {};
let activeType = 'all';
const typeOrder = [
  'all','favicon','video','audio',
  'png','jpeg','jpg','webp','svg','gif','avif','ico',
  'mp4','webm','mov','flv',
  'mp3','m4a','wav','ogg','aac','weba'
];
const typeLabels = {
  all:'All Media',favicon:'Favicon',video:'Video',audio:'Audio',
  png:'PNG',jpeg:'JPEG',jpg:'JPG',webp:'WebP',svg:'SVG',gif:'GIF',avif:'AVIF',ico:'ICO',
  mp4:'MP4',webm:'WebM',mov:'MOV',flv:'FLV',
  mp3:'MP3',m4a:'M4A',wav:'WAV',ogg:'OGG',aac:'AAC',weba:'WebA'
};
const typeColors = {
  all:'#FFD700',favicon:'#ff5722',video:'#e91e63',audio:'#8bc34a',
  png:'#4caf50',jpeg:'#3B82F6',jpg:'#3B82F6',webp:'#ff9800',svg:'#e91e63',gif:'#ff9800',avif:'#00bcd4',ico:'#9c27b0',
  mp4:'#ff5722',webm:'#4caf50',mov:'#9c27b0',flv:'#f44336',
  mp3:'#3B82F6',m4a:'#00bcd4',wav:'#ff9800',ogg:'#607d8b',aac:'#e91e63',weba:'#795548'
};

const VID_EXTS = ['mp4','webm','mov','flv'];
const AUD_EXTS = ['mp3','m4a','wav','ogg','aac','weba'];

const $ = s => document.querySelector(s);
const $$ = s => document.querySelectorAll(s);



// ---- Tabs ----
function switchTab(tab) {
  $$('.tab-btn').forEach(b => b.classList.toggle('active', b.dataset.tab === tab));
  $$('.tab-panel').forEach(p => p.classList.toggle('active', p.id === 'tab' + tab.charAt(0).toUpperCase() + tab.slice(1)));
  if (tab === 'colors') renderHistory();
}

// ---- Color Picker ----
function hexToRgb(hex) {
  const r = parseInt(hex.slice(1,3), 16);
  const g = parseInt(hex.slice(3,5), 16);
  const b = parseInt(hex.slice(5,7), 16);
  return `rgb(${r}, ${g}, ${b})`;
}

function displayColor(hex, rgb) {
  const result = $('#colorResult');
  result.hidden = false;
  $('#colorSwatch').style.background = hex;
  $('#hexVal').textContent = hex.toUpperCase();
  $('#rgbVal').textContent = rgb;
  $$('.cp-result .cp-copy').forEach(b => {
    b.dataset.val = b.closest('.cp-row').querySelector('.cp-label').textContent === 'HEX' ? hex.toUpperCase() : rgb;
    b.textContent = 'Copy';
    b.classList.remove('done');
  });
}

function showPickerError(msg) {
  const result = $('#colorResult');
  result.hidden = false;
  $('#colorSwatch').style.background = 'var(--bg)';
  $('#hexVal').textContent = msg;
  $('#rgbVal').textContent = '\u2014';
  $$('.cp-result .cp-copy').forEach(b => { b.dataset.val = ''; b.textContent = 'Copy'; b.classList.remove('done'); });
}

async function pickColor() {
  const btn = $('#pickBtn');
  if (btn.disabled) return;
  btn.disabled = true;
  btn.innerHTML = '<span class="cp-ico" style="font-size:14px">&#9711;</span> Picking...';

  try {
    if (!window.EyeDropper) throw new Error('Not supported');
    const ed = new EyeDropper();
    const result = await ed.open();
    const hex = result.sRGBHex.toLowerCase();
    const rgb = hexToRgb(hex);
    displayColor(hex, rgb);
    await saveToHistory(hex, rgb);
  } catch (err) {
    if (err.name === 'AbortError') return;
    if (err.message === 'Not supported') {
      showPickerError('EyeDropper not available in this browser');
      return;
    }
    showPickerError('Could not pick color');
  } finally {
    btn.disabled = false;
    btn.innerHTML = '<span class="cp-ico">&#9670;</span> Pick Color';
  }
}

// ---- Color History ----
let colorHistory = [];

async function loadHistory() {
  try {
    const resp = await chrome.runtime.sendMessage({ type: 'loadColors' });
    if (resp && resp.ok) colorHistory = resp.history;
  } catch {
    colorHistory = [];
  }
}

async function saveToHistory(hex, rgb) {
  const color = { hex, rgb, ts: Date.now() };
  try {
    const resp = await chrome.runtime.sendMessage({ type: 'saveColor', color });
    if (resp && resp.ok) colorHistory = resp.history;
  } catch {}
  renderHistory();
}

async function removeFromHistory(index) {
  const el = document.querySelector(`.cp-item[data-idx="${index}"]`);
  if (el) el.classList.add('cp-item-removing');
  await new Promise(r => setTimeout(r, 250));
  try {
    const resp = await chrome.runtime.sendMessage({ type: 'removeColor', index });
    if (resp && resp.ok) colorHistory = resp.history || [];
  } catch {}
  renderHistory();
}

async function clearHistory() {
  try {
    await chrome.runtime.sendMessage({ type: 'clearColors' });
  } catch {}
  colorHistory = [];
  renderHistory();
}

function renderHistory() {
  const list = $('#historyList');
  if (!list) return;
  if (!colorHistory.length) {
    list.innerHTML = '<div class="cp-empty">No colors picked yet.</div>';
    return;
  }
  list.innerHTML = colorHistory.map((c, i) => `
    <div class="cp-item" data-idx="${i}" style="animation-delay:${i * 0.03}s">
      <span class="cp-item-swatch" style="background:${c.hex}"></span>
      <span class="cp-item-val">${c.hex.toUpperCase()}</span>
      <span class="cp-item-rgb">${c.rgb}</span>
      <span class="cp-item-actions">
        <button class="cp-item-copy" data-val="${c.hex.toUpperCase()}">HEX</button>
        <button class="cp-item-copy" data-val="${c.rgb}">RGB</button>
        <button class="cp-item-del" data-idx="${i}">&times;</button>
      </span>
    </div>
  `).join('');

  list.querySelectorAll('.cp-item-copy').forEach(b => {
    b.addEventListener('click', async () => {
      try {
        await navigator.clipboard.writeText(b.dataset.val);
        const orig = b.textContent;
        b.textContent = 'Copied!';
        b.classList.add('done');
        setTimeout(() => { b.textContent = orig; b.classList.remove('done'); }, 1200);
      } catch {}
    });
  });
  list.querySelectorAll('.cp-item-del').forEach(b => {
    b.addEventListener('click', () => removeFromHistory(parseInt(b.dataset.idx)));
  });
}

// ---- Copy (color picker result) ----
function setupCopyButtons() {
  $$('.cp-result .cp-copy').forEach(b => {
    b.addEventListener('click', async () => {
      if (!b.dataset.val) return;
      try {
        await navigator.clipboard.writeText(b.dataset.val);
        b.textContent = 'Copied!';
        b.classList.add('done');
        setTimeout(() => { b.textContent = 'Copy'; b.classList.remove('done'); }, 1200);
      } catch {}
    });
  });
}

// ---- Media (existing) ----
async function getTab() {
  const [tab] = await chrome.tabs.query({active:true,currentWindow:true});
  return tab||null;
}

function nameFrom(url, idx, type) {
  try {
    const parts = new URL(url).pathname.split('/');
    const last = parts[parts.length-1];
    if (last && last.includes('.')) return last.substring(0,80);
  } catch {}
  const prefix = VID_EXTS.includes(type) ? 'video' : AUD_EXTS.includes(type) ? 'audio' : 'image';
  return `${prefix}_${idx}.${type === 'jpeg' ? 'jpg' : type}`;
}

function esc(s) {
  const d = document.createElement('div');
  d.textContent = s;
  return d.innerHTML;
}

function getTypes() {
  const out = [];
  typeOrder.forEach(t => { if (allItems[t]?.length) out.push(t); });
  Object.keys(allItems).forEach(t => {
    if (t !== 'all' && !typeOrder.includes(t) && allItems[t]?.length) out.push(t);
  });
  return out;
}

function renderSidebar() {
  const nav = $('#sidebarItems');
  nav.innerHTML = '';
  getTypes().forEach(type => {
    const a = type === activeType;
    const el = document.createElement('button');
    el.className = 'side-it' + (a ? ' a' : '');
    el.innerHTML = `<span class="side-dot" style="background:${typeColors[type]||'#FFD700'}"></span><span class="side-lb">${esc(typeLabels[type]||type.toUpperCase())}</span><span class="side-cn">${allItems[type].length}</span>`;
    el.addEventListener('click', () => { activeType = type; renderSidebar(); renderGrid(); });
    nav.appendChild(el);
  });
}

function renderGrid() {
  const items = allItems[activeType] || [];
  const label = typeLabels[activeType] || activeType.toUpperCase();
  $('#panelTitle').textContent = label;
  const grid = $('#imgGrid');
  grid.innerHTML = '';

  if (!items.length) {
    grid.innerHTML = '<div class="grid-msg"><div class="grid-msg-empty-ico">&#128247;</div><div>No ' + label.toLowerCase() + ' found.</div><div class="grid-msg-hint">Try scanning a different page with images, videos, or audio.</div></div>';
    return;
  }

  const dlBtn = $('#dlAllBtn');
  dlBtn.hidden = false;
  dlBtn.textContent = 'Download All (' + items.length + ')';
  dlBtn.dataset.restore = 'Download All (' + items.length + ')';
  dlBtn.onclick = () => doBatchDownload(items, activeType, dlBtn, 'Done ' + items.length);

  items.forEach((item, i) => {
    const isVideo = item.fromType === 'video';
    const isAudio = item.fromType === 'audio';
    const card = document.createElement('div');
    card.className = 'card';
    const prev = document.createElement('div');
    prev.className = 'prev' + (isVideo ? ' vid' : '') + (isAudio ? ' aud' : '');

    if (isVideo && item.poster) {
      const imgEl = document.createElement('img');
      imgEl.alt = item.alt||'';
      imgEl.src = item.poster;
      imgEl.addEventListener('error', function() { this.style.display='none'; });
      imgEl.loading = 'eager';
      prev.appendChild(imgEl);
      const ov = document.createElement('span');
      ov.className = 'ov';
      ov.textContent = '\u25B6';
      prev.appendChild(ov);
    } else if (isVideo) {
      prev.textContent = '\u25B6';
    } else if (isAudio) {
      prev.textContent = '\u266B';
    } else {
      const imgEl = document.createElement('img');
      imgEl.alt = item.alt||'';
      imgEl.loading = 'eager';
      imgEl.src = item.src;
      imgEl.addEventListener('error', function() {
        this.style.display='none';
        if (!prev.querySelector('.ph')) {
          prev.style.background = 'var(--surface2)';
          const ph = document.createElement('span');
          ph.className = 'ph';
          ph.textContent = '\u2297';
          prev.appendChild(ph);
        }
      });
      prev.appendChild(imgEl);
    }

    const info = document.createElement('div');
    info.className = 'info';
    const nm = document.createElement('div');
    nm.className = 'nm';
    nm.textContent = nameFrom(item.src, i+1, item.type);
    nm.title = item.src;

    const mt = document.createElement('div');
    mt.className = 'mt';
    const bc = typeColors[item.type]||'#FFD700';
    const badge = document.createElement('span');
    badge.className = 'mt-badge';
    badge.style.cssText = 'background:' + bc + '18;color:' + bc;
    badge.textContent = typeLabels[item.type]||item.type.toUpperCase();
    mt.appendChild(badge);
    if (!isAudio && item.width) {
      const dim = document.createElement('span');
      dim.className = 'mt-dim';
      dim.textContent = item.width + '\u00D7' + (item.height||'?');
      mt.appendChild(dim);
    }

    const dl = document.createElement('button');
    dl.className = 'dl';
    dl.textContent = 'Download';
    dl.dataset.url = item.src;
    dl.dataset.filename = nameFrom(item.src, i+1, item.type);
    info.appendChild(nm);
    info.appendChild(mt);
    card.appendChild(prev);
    card.appendChild(info);
    card.appendChild(dl);
    grid.appendChild(card);
  });

  $$('.dl').forEach(btn => {
    btn.addEventListener('click', async () => {
      btn.disabled = true;
      btn.textContent = '...';
      await chrome.runtime.sendMessage({type:'downloadImage', url:btn.dataset.url, filename:btn.dataset.filename});
      btn.textContent = 'Done';
      setTimeout(() => { btn.textContent='Download'; btn.disabled=false; }, 1500);
    });
  });
}

async function doBatchDownload(items, imageType, btn, doneText) {
  if (!items.length) return;
  btn.disabled = true;
  btn.textContent = `Downloading ${items.length}...`;
  try {
    await downloadBatch(items, imageType);
    btn.textContent = doneText;
  } catch (e) {
    btn.textContent = 'Failed';
  }
  setTimeout(() => { btn.textContent = btn.dataset.restore || 'Download All'; btn.disabled = false; }, 2000);
}

function renderAll() {
  const total = allItems.all?.length||0;
  $('#countBadge').textContent = total;
  activeType = 'all';
  renderSidebar();
  renderGrid();
}

function showGridMsg(html) {
  const grid = $('#imgGrid');
  grid.innerHTML = `<div class="grid-msg">${html}</div>`;
}

function showGridErr(html) {
  const grid = $('#imgGrid');
  grid.innerHTML = `<div class="grid-msg err">${html}</div>`;
}

async function fetchImages(tabId) {
  for (let i = 0; i < 5; i++) {
    try {
      await chrome.tabs.sendMessage(tabId, {type:'ping'});
    } catch {
      showGridMsg(`<span class="sp"></span> Scanning... (${i+1})`);
      await new Promise(r => setTimeout(r, 300));
      continue;
    }
    return await chrome.tabs.sendMessage(tabId, {type:'getImages'});
  }
  return null;
}

async function load(tab) {
  showGridMsg('<span class="sp"></span> Scanning...');
  $('#countBadge').textContent = '...';

  const res = await fetchImages(tab.id);

  if (!res) {
    showGridErr('Could not reach the page. <button class="gb" id="retryBtn">Retry</button>');
    document.getElementById('retryBtn')?.addEventListener('click', () => load(tab));
    return;
  }

  const keys = Object.keys(res);
  if (!keys.length || !res.all?.length) {
    showGridMsg('<div class="grid-msg-empty-ico">&#128247;</div><div>No media found.</div><div class="grid-msg-hint">Try scanning a different page with images, videos, or audio.</div>');
    $('#countBadge').textContent = '0';
    return;
  }

  allItems = res;
  renderAll();
}

// ---- Init ----
document.addEventListener('DOMContentLoaded', async () => {
  $$('.tab-btn').forEach(btn => {
    btn.addEventListener('click', () => switchTab(btn.dataset.tab));
  });

  $('#pickBtn')?.addEventListener('click', pickColor);
  $('#clearHistory')?.addEventListener('click', clearHistory);
  setupCopyButtons();

  await loadHistory();
  renderHistory();

  const tab = await getTab();
  if (!tab) {
    showGridErr('No active tab.');
    return;
  }
  await load(tab);
});

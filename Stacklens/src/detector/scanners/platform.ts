export function scanPlatformApis(): string[] {
  const apis: string[] = [];

  if (typeof WebAssembly !== 'undefined' && typeof WebAssembly.compile === 'function') {
    apis.push('WebAssembly');
  }

  if (typeof RTCPeerConnection !== 'undefined' || typeof (window as unknown as Record<string, unknown>)['webkitRTCPeerConnection'] !== 'undefined') {
    apis.push('WebRTC');
  }

  if ('serviceWorker' in navigator) {
    apis.push('ServiceWorker');
  }

  if ('indexedDB' in window) {
    apis.push('IndexedDB');
  }

  if ('geolocation' in navigator) {
    apis.push('Geolocation');
  }

  if ('Notification' in window) {
    apis.push('Notification');
  }

  if ('PushManager' in window) {
    apis.push('PushManager');
  }

  if ('CredentialsContainer' in window || 'credentials' in navigator) {
    apis.push('Credentials');
  }

  if ('BatteryManager' in window || 'getBattery' in navigator) {
    apis.push('Battery');
  }

  if ('USB' in window) {
    apis.push('WebUSB');
  }

  if ('Bluetooth' in window) {
    apis.push('WebBluetooth');
  }

  if ('Serial' in window) {
    apis.push('WebSerial');
  }

  if ('clipboard' in navigator || 'Clipboard' in window) {
    apis.push('Clipboard');
  }

  if ('Blob' in window && 'serviceWorker' in navigator) {
    if ('sync' in (navigator as unknown as Record<string, unknown>)) {
      apis.push('SyncManager');
    }
  }

  if ('storage' in navigator && 'estimate' in navigator.storage) {
    apis.push('StorageManager');
  }

  return apis;
}

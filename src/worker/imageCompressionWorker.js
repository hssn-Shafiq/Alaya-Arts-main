// src/workers/imageCompressionWorker.js
import imageCompression from 'browser-image-compression';

self.onmessage = async function (e) {
  const { file } = e.data;
  try {
    const compressedFile = await imageCompression(file, {
      maxSizeMB: 1,
      maxWidthOrHeight: 1920,
      useWebWorker: true,
    });
    self.postMessage({ success: true, file: compressedFile });
  } catch (error) {
    self.postMessage({ success: false, error });
  }
};

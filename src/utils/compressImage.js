export const compressImage = (file, quality, format) => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = (e) => {
      const img = new Image();
      img.src = e.target.result;
      img.onload = () => {
        const canvas = document.createElement('canvas');
        canvas.width = img.width;
        canvas.height = img.height;
        const ctx = canvas.getContext('2d');
        ctx.drawImage(img, 0, 0);

        // Special handling for PNG compression
        if (format === 'png') {
          // PNG at 100% quality - return original to avoid reencoding bloat
          if (quality === 100 && file.type === 'image/png') {
            resolve({
              blob: file,
              url: URL.createObjectURL(file),
              size: file.size,
              width: img.width,
              height: img.height
            });
            return;
          }
          
          // For quality < 100, reduce color depth to compress PNG
          if (quality < 100) {
            const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
            const data = imageData.data;
            
            // Calculate color reduction factor
            const factor = Math.max(1, Math.floor(256 / (quality / 100 * 32 + 8)));
            
            for (let i = 0; i < data.length; i += 4) {
              data[i] = Math.round(data[i] / factor) * factor;
              data[i + 1] = Math.round(data[i + 1] / factor) * factor;
              data[i + 2] = Math.round(data[i + 2] / factor) * factor;
            }
            
            ctx.putImageData(imageData, 0, 0);
          }
        }

        // Convert to blob
        canvas.toBlob(
          (blob) => {
            if (blob && format === 'png' && blob.size > file.size && quality > 90) {
              resolve({
                blob: file,
                url: URL.createObjectURL(file),
                size: file.size,
                width: img.width,
                height: img.height
              });
            } else {
              resolve({
                blob,
                url: URL.createObjectURL(blob),
                size: blob.size,
                width: img.width,
                height: img.height
              });
            }
          },
          `image/${format}`,
          format === 'png' ? 1.0 : quality / 100
        );
      };
      img.onerror = reject;
    };
    reader.onerror = reject;
  });
};

export const formatBytes = (bytes) => {
  if (bytes === 0) return '0 Bytes';
  const k = 1024;
  const sizes = ['Bytes', 'KB', 'MB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return Math.round(bytes / Math.pow(k, i) * 100) / 100 + ' ' + sizes[i];
};
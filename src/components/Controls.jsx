const Controls = ({ quality, setQuality, format, setFormat, originalFile }) => {
  return (
    <div className="controls">
      <div className="control-group">
        <label className="control-label">Compression Quality</label>
        {format === 'png' && (
          <div className="png-warning">
            💡 <strong>PNG Compression:</strong> Lower quality reduces colors for smaller size.
            <br />
            For photos, <strong>JPG (80%)</strong> or <strong>WebP (80%)</strong> typically work better.
          </div>
        )}
        <div className="slider-container">
          <input
            type="range"
            min="10"
            max="100"
            value={quality}
            onChange={(e) => setQuality(Number(e.target.value))}
            className="slider"
          />
          <div className="slider-value">{quality}%</div>
        </div>
      </div>

      <div className="control-group">
        <label className="control-label">Output Format</label>
        <div className="format-hint">
          💡 <strong>Tip:</strong>{' '}
          {originalFile?.type === 'image/png'
            ? 'PNG photos compress better as JPG or WebP'
            : 'WebP gives smallest file size with good quality'}
        </div>
        <div className="format-buttons">
          <button
            className={`format-button ${format === 'png' ? 'active' : ''}`}
            onClick={() => setFormat('png')}
          >
            PNG
            <div style={{ fontSize: '9px', marginTop: '4px', opacity: 0.7 }}>
              Lossless
            </div>
          </button>
          <button
            className={`format-button ${format === 'jpeg' ? 'active' : ''}`}
            onClick={() => setFormat('jpeg')}
          >
            JPG
            <div style={{ fontSize: '9px', marginTop: '4px', opacity: 0.7 }}>
              Best for photos
            </div>
          </button>
          <button
            className={`format-button ${format === 'webp' ? 'active' : ''}`}
            onClick={() => setFormat('webp')}
          >
            WebP
            <div style={{ fontSize: '9px', marginTop: '4px', opacity: 0.7 }}>
              Smallest size
            </div>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Controls;
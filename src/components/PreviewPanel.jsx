import { formatBytes } from '../utils/compressImage';

const PreviewPanel = ({ originalPreview, originalFile, compressedData, isProcessing }) => {
  return (
    <div className="preview-panel">
      <div className="preview-box">
        <div className="preview-label">ORIGINAL</div>
        <div className="preview-image-container">
          <img src={originalPreview} alt="Original" className="preview-image" />
        </div>
        <div className="preview-info">
          <div className="info-row">
            <span className="info-label">SIZE:</span>
            <span className="info-value">{formatBytes(originalFile.size)}</span>
          </div>
          <div className="info-row">
            <span className="info-label">FORMAT:</span>
            <span className="info-value">
              {originalFile.type.split('/')[1].toUpperCase()}
            </span>
          </div>
        </div>
      </div>

      <div className="preview-box">
        <div className="preview-label after">COMPRESSED</div>
        <div className="preview-image-container">
          {isProcessing ? (
            <div className="loading">Processing...</div>
          ) : compressedData ? (
            <img src={compressedData.url} alt="Compressed" className="preview-image" />
          ) : null}
        </div>
        {compressedData && (
          <div className="preview-info">
            <div className="info-row">
              <span className="info-label">SIZE:</span>
              <span className="info-value">{formatBytes(compressedData.size)}</span>
            </div>
            <div className="info-row">
              <span className="info-label">DIMENSIONS:</span>
              <span className="info-value">
                {compressedData.width} × {compressedData.height}
              </span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default PreviewPanel;
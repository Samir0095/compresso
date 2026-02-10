import { formatBytes } from '../utils/compressImage';

const ResultPanel = ({ savingsPercent, originalFile, compressedData, handleDownload, handleReset }) => {
  return (
    <div className="result-panel">
      <div className="savings-label">SPACE SAVED</div>
      <div
        className="savings-display"
        style={savingsPercent < 0 ? { color: 'var(--accent)' } : {}}
      >
        {savingsPercent >= 0 ? `${savingsPercent}% 🎉` : 'LARGER FILE ⚠️'}
      </div>
      <div className="savings-label">
        {savingsPercent >= 0
          ? `${formatBytes(originalFile.size - compressedData.size)} SAVED`
          : `${formatBytes(compressedData.size - originalFile.size)} LARGER - Try JPG or WebP`}
      </div>
      <button className="download-button" onClick={handleDownload}>
        ⬇ DOWNLOAD IMAGE
      </button>
      <br />
      <button className="reset-button" onClick={handleReset}>
        ← Upload New Image
      </button>
    </div>
  );
};

export default ResultPanel;
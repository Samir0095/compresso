const UploadBox = ({ isDragging, setIsDragging, handleFileSelect, fileInputRef }) => {
  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files[0];
    handleFileSelect(file);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  return (
    <div
      className={`upload-box ${isDragging ? 'dragover' : ''}`}
      onClick={() => fileInputRef.current?.click()}
      onDrop={handleDrop}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
    >
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        onChange={(e) => handleFileSelect(e.target.files[0])}
        style={{ display: 'none' }}
      />
      <span className="upload-icon">⬆</span>
      <div className="upload-text">DROP IMAGE OR CLICK TO SELECT</div>
      <div className="upload-hint">Drag & drop your image here</div>
      <div className="upload-formats">Supports: PNG • JPG • WebP • GIF</div>
    </div>
  );
};

export default UploadBox;
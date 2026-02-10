import { useState, useRef, useEffect } from 'react';
import { compressImage } from './utils/compressImage';
import Header from './components/Header';
import UploadBox from './components/UploadBox';
import PreviewPanel from './components/PreviewPanel';
import Controls from './components/Controls';
import ResultPanel from './components/ResultPanel';
import Footer from './components/Footer';
import './App.css';

const App = () => {
  const [originalFile, setOriginalFile] = useState(null);
  const [originalPreview, setOriginalPreview] = useState(null);
  const [compressedData, setCompressedData] = useState(null);
  const [quality, setQuality] = useState(80);
  const [format, setFormat] = useState('jpeg');
  const [isDragging, setIsDragging] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);

  const fileInputRef = useRef(null);

  // Auto-compress when quality, format, or file changes
  useEffect(() => {
    if (!originalFile) return;

    const compress = async () => {
      setIsProcessing(true);
      try {
        const result = await compressImage(originalFile, quality, format);
        setCompressedData(result);
      } catch (error) {
        console.error('Compression error:', error);
      } finally {
        setIsProcessing(false);
      }
    };

    compress();
  }, [originalFile, quality, format]);

  const handleFileSelect = (file) => {
    if (!file || !file.type.startsWith('image/')) {
      alert('Please select an image file');
      return;
    }

    setOriginalFile(file);

    // Smart format suggestion
    const fileFormat = file.type.split('/')[1];
    if (fileFormat === 'png') {
      setFormat('jpeg');
      setQuality(85);
    } else if (fileFormat === 'jpeg' || fileFormat === 'jpg') {
      setFormat('webp');
      setQuality(80);
    } else {
      setFormat('webp');
      setQuality(80);
    }

    const reader = new FileReader();
    reader.onload = (e) => {
      setOriginalPreview(e.target.result);
    };
    reader.readAsDataURL(file);
  };

  const handleDownload = () => {
    if (!compressedData) return;
    const link = document.createElement('a');
    link.href = compressedData.url;
    link.download = `compressed_${Date.now()}.${format}`;
    link.click();
  };

  const handleReset = () => {
    setOriginalFile(null);
    setOriginalPreview(null);
    setCompressedData(null);
    setQuality(80);
    setFormat('jpeg');
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const savingsPercent =
    originalFile && compressedData
      ? Math.round((1 - compressedData.size / originalFile.size) * 100)
      : 0;

  return (
    <>
      <Header />

      <div className="container">
        {/* Top Ad Zone */}
        <div className="ad-zone">[Advertisement - 728x90 Leaderboard]</div>

        {!originalFile ? (
          <UploadBox
            isDragging={isDragging}
            setIsDragging={setIsDragging}
            handleFileSelect={handleFileSelect}
            fileInputRef={fileInputRef}
          />
        ) : (
          <>
            <PreviewPanel
              originalPreview={originalPreview}
              originalFile={originalFile}
              compressedData={compressedData}
              isProcessing={isProcessing}
            />

            <Controls
              quality={quality}
              setQuality={setQuality}
              format={format}
              setFormat={setFormat}
              originalFile={originalFile}
            />

            {compressedData && (
              <ResultPanel
                savingsPercent={savingsPercent}
                originalFile={originalFile}
                compressedData={compressedData}
                handleDownload={handleDownload}
                handleReset={handleReset}
              />
            )}

            {/* Middle Ad Zone */}
            <div className="ad-zone">[Advertisement - 336x280 Rectangle]</div>
          </>
        )}

        {/* Bottom Ad Zone */}
        <div className="ad-zone">[Advertisement - 728x90 Leaderboard]</div>
      </div>

      <section className="seo-section">
  <div className="seo-container">
    <h1>Free Online Image Compressor</h1>

    <p className="seo-intro">
      Reduce image size instantly without uploading to any server. 
      Compresso helps you compress images under 100KB for passport forms, 
      university admissions, job applications, and online submissions.
    </p>

    <div className="seo-grid">
      <div className="seo-card">
        <h2>Compress Image Under 100KB</h2>
        <p>
          Easily reduce image file size for government forms, exam portals,
          and ID submissions. Adjust quality and download instantly.
        </p>
      </div>

      <div className="seo-card">
        <h2>Secure & Private</h2>
        <p>
          All compression happens directly in your browser. 
          Your images are never uploaded to any server.
        </p>
      </div>

      <div className="seo-card">
        <h2>Supports Multiple Formats</h2>
        <p>
          Convert and compress PNG, JPG, JPEG, and WebP images
          with real-time preview and instant download.
        </p>
      </div>
    </div>
  </div>
</section>


      <Footer />
    </>
  );
};

export default App;
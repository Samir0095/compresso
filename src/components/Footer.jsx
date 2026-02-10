const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-content">
        <div className="footer-text">
          <strong>
            Compresso - Free Online Image Compressor & Format Converter
          </strong>
          <br />
          Compress PNG, JPG, WebP images up to 90% smaller without losing
          quality. All processing happens in your browser - no uploads
          required. Fast, secure, and completely free.
        </div>

        <div
          style={{
            marginTop: "20px",
            fontSize: "13px",
            opacity: "0.6",
          }}
        >
          © 2026 Compresso • Created by Samir Yeasir Ali | All rights reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;

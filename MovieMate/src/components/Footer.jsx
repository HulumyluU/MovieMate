import React from 'react';
import '../css/Footer.css';

function Footer() {
  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-grid">
          <div className="footer-section">
            <h3>Where to Watch</h3>
            <ul>
              <li><a target='_blank' href="https://www.netflix.com/ca/">Netflix</a></li>
              <li><a target='_blank' href="https://www.disneyplus.com/">Disney+</a></li>
              <li><a target='_blank' href="https://www.hulu.com/welcome?orig_referrer=https%3A%2F%2Fwww.google.com%2F">Hulu</a></li>
              <li><a href="https://www.primevideo.com/offers/nonprimehomepage/ref=dv_web_force_root">Amazon Prime Video</a></li>
              <li><a href="https://www.max.com/geo-availability">HBO Max</a></li>
            </ul>
          </div>
          <div className="footer-section">
            <h3>More Platforms</h3>
            <ul>
              <li><a target='_blank' href="https://www.crave.ca/en">Crave</a></li>
              <li><a target='_blank' href="https://tv.apple.com/">Apple TV+</a></li>
              <li><a target='_blank' href="https://www.paramountplus.com/ca/">Paramount+</a></li>
              <li><a target='_blank' href="https://www.peacocktv.com/unavailable">Peacock</a></li>
              <li><a target='_blank' href="https://tubitv.com/">Tubi</a></li>
            </ul>
          </div>
          <div className="footer-section">
            <h3>About</h3>
            <p>&copy; 2023 Maksym Sovyk. All rights reserved.</p>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
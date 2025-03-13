import React from "react";
import Style from "../cssFiles/footer.module.css";

const Footer = () => {
  return (
    <footer className={Style.footer}>
      <div className={Style.container}>
        <div className={Style.row}>
          <div className={Style.column}>
            <h5>Quick Links</h5>
            <ul>
              <li><a href="#">Home</a></li>
              <li><a href="#">Features</a></li>
              <li><a href="#">Pricing</a></li>
              <li><a href="#">FAQs</a></li>
              <li><a href="#">About</a></li>
            </ul>
          </div>

          <div className={Style.column}>
            <h5>Resources</h5>
            <ul>
              <li><a href="#">Blog</a></li>
              <li><a href="#">Case Studies</a></li>
              <li><a href="#">Community</a></li>
              <li><a href="#">Support</a></li>
              <li><a href="#">Partners</a></li>
            </ul>
          </div>

          <div className={Style.column}>
            <h5>Legal</h5>
            <ul>
              <li><a href="#">Privacy Policy</a></li>
              <li><a href="#">Terms of Service</a></li>
              <li><a href="#">Security</a></li>
              <li><a href="#">GDPR Compliance</a></li>
            </ul>
          </div>

          <div className={Style.column}>
            <h5>Subscribe</h5>
            <p>Get updates about new features and special offers.</p>
            <div className={Style.subscribe}>
              <input type="email" placeholder="Your email" />
              <button>Subscribe</button>
            </div>
          </div>
        </div>

        <div className={Style.bottomSection}>
          <p>© 2024 Your Company. All rights reserved.</p>
          <div className={Style.socialIcons}>
            <a href="#"><i className="fab fa-twitter"></i></a>
            <a href="#"><i className="fab fa-instagram"></i></a>
            <a href="#"><i className="fab fa-facebook"></i></a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

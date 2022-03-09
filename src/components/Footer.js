import { Link } from "react-router-dom";

function Footer() {
  return (
    <footer className="footer">
      <header className="footer__header">
        <div className="container">
          <div className="footer__group">
            <div className="footer-logo">
              <object type="image/svg+xml" data="/img/logo.svg"></object>
              <span>CryptoNFT</span>
            </div>

            <div className="footer-subscribe">
              <h3 className="footer-subscribe__title">Get the lastes Updates</h3>
              <form className="footer-subscribe__inner">
                <input type="email" placeholder="Your email" required />
                <button type="submit" className="btn btn--gradient"><span>Email Me!</span></button>
              </form>
            </div>
          </div>

          <nav className="footer-nav">
            <h3>CryptoNFT</h3>
            <ul>
              <li><Link to="/">Explore</Link></li>
              <li><Link to="/">How it Works</Link></li>
              <li><Link to="/">Contact Us</Link></li>
            </ul>
          </nav>

          <nav className="footer-nav">
            <h3>Support</h3>
            <ul>
              <li><Link to="/">Help center</Link></li>
              <li><Link to="/">Term of service</Link></li>
              <li><Link to="/">Legal</Link></li>
              <li><Link to="/">Privacy policy</Link></li>
            </ul>
          </nav>
        </div>
      </header>

      <footer className="footer__footer">
        <div className="container">
          <div className="footer-copy">
            CrpytoNFT, Inc. All Rights Reserved
          </div>

          <ul className="footer-social">
            <li><Link to="/"><svg><use href="/img/sprite.svg#instagram"></use></svg></Link></li>
            <li><Link to="/"><svg><use href="/img/sprite.svg#twitter"></use></svg></Link></li>
            <li><Link to="/"><svg><use href="/img/sprite.svg#telegram"></use></svg></Link></li>
            <li><Link to="/"><svg><use href="/img/sprite.svg#discord"></use></svg></Link></li>
          </ul>
        </div>
      </footer>
    </footer>
  );
}
export default Footer;

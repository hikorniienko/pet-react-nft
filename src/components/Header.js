import { Link } from "react-router-dom";
import HeaderSearch from 'components/HeaderSearch';
import HeaderNav from 'components/HeaderNav';

function Header() {
  return (
    <header className="header">
      <div className="header__inner">
        <Link className="logo"  to="/">
          <object type="image/svg+xml" data="/img/logo.svg"></object>
          <span>CryptoNFT</span>
        </Link>

        <HeaderSearch />
        <HeaderNav />
      </div>
    </header>
  );
}
export default Header;

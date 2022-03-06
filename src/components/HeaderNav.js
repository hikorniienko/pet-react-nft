import { Link } from "react-router-dom";

function HeaderNav() {
  return (
    <nav className="nav">
      <header className="nav__header">
        <svg><use href="img/sprite.svg#menu"></use></svg>
        <svg><use href="img/sprite.svg#close"></use></svg>
      </header>
      <ul className="nav__menu">
        <li><Link to="/" className="active">Explore</Link></li>
        <li><Link to="/" >My items</Link></li>
        <li><Link to="/" >Following</Link></li>
      </ul>
      <footer className="nav__footer">
        <div className="nav__footer__inner">
          <button className="btn btn--gradient"><span>Create</span></button>
          <Link  to="/" className="btn btn--transparent"><span>Connect</span></Link>
        </div>
      </footer>
    </nav>
  );
}
export default HeaderNav;

import { Link } from "react-router-dom";

const Header = () => {
  return (
    <header className="header">
      <Link className="header__logo" to={"/"} aria-label="to home page">
        <img className="header__logo-img" src="/logo.png" alt="logo" />
        <h2 className="header__logo-title">Alice's Personal Blog</h2>
      </Link>
      <nav className="header__nav">
        <ul className="header__nav-socials">
          <li className="header__nav-item">
            <a
              href="https://github.com/CuteFoxx"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="link to github profil;e"
            >
              <img src="/github-mark.png" alt="github logo" />
            </a>
          </li>
          <li className="header__nav-item">
            <a
              href="https://www.linkedin.com/in/alicepolishchuk1/"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="link to linkedin profile"
            >
              <img src="/LI-In-Bug.png" alt="LinkedIn logo" />
            </a>
          </li>
          <li className="header__nav-item">
            <Link to={"/login"}>
              <img src="/login.png" alt="LinkedIn logo" />
            </Link>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;

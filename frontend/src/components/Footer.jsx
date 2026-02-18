import './Footer.css';

export default function Footer() {
  return (
    <footer className="main-footer">
      <div className="footer-content">
        <p>Made by <strong>Blackangel48</strong></p>
        <a 
          href="https://github.com/Blackangel48/quizz-app" 
          target="_blank" 
          rel="noopener noreferrer"
        >
          See GitHub Project
        </a>
        <p className="copyright">© {new Date().getFullYear()} All rights reserved</p>
      </div>
    </footer>
  );
}
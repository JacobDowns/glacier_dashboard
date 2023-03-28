import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import './css/common.css';
import './css/custom.css';
import logo from './images/logo.png';
import casc from './images/casc.png';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <>
    <header id="navbar" class="header-nav" role="banner">
      <div class="tmp-container">
        <div class="header-search">
          <a class="logo-header" href="https://www.usgs.gov/" title="Home">
            <img src={logo} alt="Home" class="img" border="0" />
          </a>
          <a class="logo-header" href="https://www.usgs.gov/" title="Home">
            <img src={casc} alt="Home" class="img" style={{padding  : '0px', float: 'right'}} />
          </a>
        </div>
      </div>
    </header>
    <React.StrictMode>
      <App />
    </React.StrictMode>

    <footer class="footer">
      <div class="tmp-container">
        <div class="footer-doi">
          <ul class="menu nav">
            <li class="first leaf menu-links menu-level-1"><a href="https://www.doi.gov/privacy">DOI Privacy Policy</a></li>
            <li class="leaf menu-links menu-level-1"><a href="https://www.usgs.gov/policies-and-notices">Legal</a></li>
            <li class="leaf menu-links menu-level-1"><a href="https://www.usgs.gov/accessibility-and-us-geological-survey">Accessibility</a></li>
            <li class="leaf menu-links menu-level-1"><a href="https://www.usgs.gov/sitemap">Site Map</a></li>
            <li class="last leaf menu-links menu-level-1"><a href="https://answers.usgs.gov/">Contact USGS</a></li>
          </ul>
        </div>

        <hr/>

          <div class="footer-doi">
            <ul class="menu nav">
              <li class="first leaf menu-links menu-level-1"><a href="https://www.doi.gov/">U.S. Department of the Interior</a></li>
              <li class="leaf menu-links menu-level-1"><a href="https://www.doioig.gov/">DOI Inspector General</a></li>
              <li class="leaf menu-links menu-level-1"><a href="https://www.whitehouse.gov/">White House</a></li>
              <li class="leaf menu-links menu-level-1"><a href="https://www.whitehouse.gov/omb/management/egov/">E-gov</a></li>
              <li class="leaf menu-links menu-level-1"><a href="https://www.doi.gov/pmb/eeo/no-fear-act">No Fear Act</a></li>
              <li class="last leaf menu-links menu-level-1"><a href="https://www.usgs.gov/about/organization/science-support/foia">FOIA</a></li>
            </ul>
          </div>
      </div>
    </footer>
  </>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

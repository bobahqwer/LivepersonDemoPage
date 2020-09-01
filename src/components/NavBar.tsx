import React from 'react';
import { NavLink } from 'react-router-dom';
import { RoutesConfig } from '../config/routes.config';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const ReactSeoLogoSvg = require('../assets/img/ReactSeoLogo.svg') as string;

const NavBar: React.FC = () => (
  <nav
    role='navigation'
    className='navbar'
    aria-label='main navigation'
  >
    <div className='navbar-wrapper'>
      <div className='brand-wrapper'>
        <img
          width='170'
          src={ReactSeoLogoSvg}
          alt='react-seo-template'
        />
      </div>
      <div className='navbar-routes'>
        <NavLink
          className='navbar-item'
          to={RoutesConfig.Home.path}
          exact={RoutesConfig.Home.exact}
          activeClassName={RoutesConfig.Home.activeClassName}
        >
          <span>{RoutesConfig.Home.displayName}</span>
        </NavLink>
        <NavLink
          className='navbar-item'
          to={RoutesConfig.About.path}
          exact={RoutesConfig.About.exact}
          activeClassName={RoutesConfig.About.activeClassName}
        >
          <span>{RoutesConfig.About.displayName}</span>
        </NavLink>
        <div className='seperator' />
        <a
          target='_blank'
          aria-label='GitHub'
          className='navbar-item'
          rel='noopener noreferrer'
          href='https://github.com/based-ghost'
        >
          <span>GitHub</span>
          <FontAwesomeIcon icon='external-link-alt' />
        </a>
      </div>
    </div>
  </nav>
);

export default NavBar;

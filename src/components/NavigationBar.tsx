import React from 'react';

export const NavigationBar = () => {
  return (
    <nav className="navigation">
      <div className="nav-logo">
        <img src="/logo.svg" alt="Logo" />
      </div>
      <ul className="nav-items">
        <li>Главная</li>
        <li>Поиск</li>
        <li>Моя медиатека</li>
        <li>Плейлисты</li>
      </ul>
    </nav>
  );
}; 
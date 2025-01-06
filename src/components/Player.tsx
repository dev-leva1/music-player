import React from 'react';

export const Player = () => {
  return (
    <div className="player">
      <div className="track-info">
        <img src="/album-cover.jpg" alt="Album Cover" className="cover" />
        <div className="track-details">
          <h4>Название трека</h4>
          <p>Исполнитель</p>
        </div>
      </div>
      
      <div className="player-controls">
        <button>Предыдущий</button>
        <button className="play-button">Играть</button>
        <button>Следующий</button>
      </div>
      
      <div className="volume-control">
        <input type="range" min="0" max="100" />
      </div>
    </div>
  );
}; 
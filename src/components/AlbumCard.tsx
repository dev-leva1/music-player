import React from 'react';

interface AlbumCardProps {
  title?: string;
  artist?: string;
  coverUrl?: string;
}

export const AlbumCard: React.FC<AlbumCardProps> = ({
  title = "Название альбома",
  artist = "Исполнитель",
  coverUrl = "/default-album.jpg"
}) => {
  return (
    <div className="album-card">
      <div className="album-cover">
        <img src={coverUrl} alt={title} />
        <button className="play-overlay">▶</button>
      </div>
      <h3>{title}</h3>
      <p>{artist}</p>
    </div>
  );
}; 
import React from 'react';

interface Track {
  id: number;
  title: string;
  artist: string;
  duration: string;
  coverUrl: string;
}

const mockTracks: Track[] = [
  {
    id: 1,
    title: "Трек 1",
    artist: "Исполнитель 1",
    duration: "3:45",
    coverUrl: "/default-album.jpg"
  },
  {
    id: 2,
    title: "Трек 2",
    artist: "Исполнитель 2",
    duration: "4:20",
    coverUrl: "/default-album.jpg"
  },
  {
    id: 3,
    title: "Трек 3",
    artist: "Исполнитель 3",
    duration: "3:15",
    coverUrl: "/default-album.jpg"
  }
];

export const TrackList: React.FC = () => {
  return (
    <div className="track-list">
      {mockTracks.map((track) => (
        <div key={track.id} className="track-item">
          <div className="track-info">
            <img src={track.coverUrl} alt={track.title} className="track-cover" />
            <div className="track-details">
              <h4>{track.title}</h4>
              <p>{track.artist}</p>
            </div>
          </div>
          <span className="track-duration">{track.duration}</span>
        </div>
      ))}
    </div>
  );
}; 
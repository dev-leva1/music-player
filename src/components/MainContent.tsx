import React from 'react';
import { AlbumCard } from './AlbumCard';
import { TrackList } from './TrackList';

export const MainContent = () => {
  return (
    <main className="main-content">
      <section className="featured">
        <h2>Рекомендации</h2>
        <div className="albums-grid">
          <AlbumCard />
          <AlbumCard />
          <AlbumCard />
          <AlbumCard />
        </div>
      </section>
      
      <section className="recently-played">
        <h2>Недавно прослушано</h2>
        <TrackList />
      </section>
    </main>
  );
}; 
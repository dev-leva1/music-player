import React from 'react';
import { IoMdClose, IoMdHeart, IoMdHeartEmpty } from 'react-icons/io';
import { BsPlayFill, BsPauseFill } from 'react-icons/bs';
import '../styles/components/TrackModal.css';

interface TrackModalProps {
  isOpen: boolean;
  onClose: () => void;
  track: {
    title: string;
    artist: string;
    coverUrl: string;
    duration: string;
    album: string;
    year: string;
    genre: string;
  };
  isPlaying: boolean;
  isFavorite: boolean;
  onPlayToggle: () => void;
  onFavoriteToggle: () => void;
}

export const TrackModal: React.FC<TrackModalProps> = ({
  isOpen,
  onClose,
  track,
  isPlaying,
  isFavorite,
  onPlayToggle,
  onFavoriteToggle
}) => {
  if (!isOpen) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="track-modal glass-effect" onClick={e => e.stopPropagation()}>
        <button className="close-button" onClick={onClose}>
          <IoMdClose />
        </button>
        
        <div className="modal-content">
          <div className="track-cover">
            <img src={track.coverUrl} alt={track.title} />
            <button className="modal-play-button" onClick={onPlayToggle}>
              {isPlaying ? <BsPauseFill /> : <BsPlayFill />}
            </button>
          </div>
          
          <div className="track-info-detailed">
            <div className="track-header">
              <div>
                <h2>{track.title}</h2>
                <p className="artist">{track.artist}</p>
              </div>
              <button 
                className={`favorite-btn large ${isFavorite ? 'active' : ''}`}
                onClick={onFavoriteToggle}
              >
                {isFavorite ? <IoMdHeart /> : <IoMdHeartEmpty />}
              </button>
            </div>
            
            <div className="track-details-grid">
              <div className="detail-item">
                <span className="label">Альбом</span>
                <span className="value">{track.album}</span>
              </div>
              <div className="detail-item">
                <span className="label">Год</span>
                <span className="value">{track.year}</span>
              </div>
              <div className="detail-item">
                <span className="label">Жанр</span>
                <span className="value">{track.genre}</span>
              </div>
              <div className="detail-item">
                <span className="label">Длительность</span>
                <span className="value">{track.duration}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}; 
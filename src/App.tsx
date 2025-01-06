import React, { useState, useEffect } from 'react';
import './styles/App.css';
import { BiSearch, BiLibrary, BiMusic, BiUser, BiHistory, BiX } from 'react-icons/bi';
import { BsPlayFill, BsPauseFill, BsSkipStart, BsSkipEnd, BsVolumeUp } from 'react-icons/bs';
import { IoMdHeart, IoMdHeartEmpty } from 'react-icons/io';
import { TrackModal } from './components/TrackModal';
import track from './tracks/track.png';
import favorite from './tracks/favorite.png';
import year2024 from './tracks/2024.png';
import track3 from './tracks/track3.png';
import track4 from './tracks/track4.png';
import track5 from './tracks/track5.png';
import track6 from './tracks/track6.png';
import track7 from './tracks/track7.png';
import track8 from './tracks/track8.png';
import track9 from './tracks/track9.png';

interface Track {
  title: string;
  artist: string;
  coverUrl: string;
  duration: string;
  album: string;
  year: string;
  genre: string;
}

// Добавим тип для вкладок
type TabType = 'search' | 'wave' | 'collection';

// Добавим интерфейс для истории поиска
interface SearchHistory {
  query: string;
  timestamp: number;
}

const App: React.FC = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isFavorite, setIsFavorite] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedTrack, setSelectedTrack] = useState<Track | null>(null);
  const [activeTab, setActiveTab] = useState<TabType>('wave');
  const [searchQuery, setSearchQuery] = useState('');
  const [searchHistory, setSearchHistory] = useState<SearchHistory[]>([]);
  const [filteredTracks, setFilteredTracks] = useState<Track[]>([]);

  const mockTrack = {
    title: "SOUL (Sped Up)",
    artist: "74blade",
    coverUrl: "/100x100.png",
    duration: "3:45",
    album: "SOUL",
    year: "2024",
    genre: "Electronic"
  };

  const tracks: Track[] = [
    {
      title: "Название релиза 1",
      artist: "Исполнитель 1",
      coverUrl: track5,
      duration: "3:45",
      album: "Альбом 1",
      year: "2024",
      genre: "Electronic"
    },
    {
      title: "Название релиза 2",
      artist: "Исполнитель 2",
      coverUrl: track6,
      duration: "3:45",
      album: "Альбом 2",
      year: "2024",
      genre: "Electronic"
    },
    {
      title: "Название релиза 3",
      artist: "Исполнитель 3",
      coverUrl: track7,
      duration: "3:45",
      album: "Альбом 3",
      year: "2024",
      genre: "Electronic"
    },
    {
      title: "Название релиза 4",
      artist: "Исполнитель 4",
      coverUrl: track8,
      duration: "3:45",
      album: "Альбом 4",
      year: "2024",
      genre: "Electronic"
    },
    {
      title: "Название релиза 5",
      artist: "Исполнитель 5",
      coverUrl: track9,
      duration: "3:45",
      album: "Альбом 5",
      year: "2024",
      genre: "Electronic"
    },
    {
      title: "Название релиза 6",
      artist: "Исполнитель 6",
      coverUrl: track5,
      duration: "3:45",
      album: "Альбом 6",
      year: "2024",
      genre: "Electronic"
    },
    {
      title: "Название релиза 7",
      artist: "Исполнитель 7",
      coverUrl: track6,
      duration: "3:45",
      album: "Альбом 7",
      year: "2024",
      genre: "Electronic"
    },
    {
      title: "Название релиза 8",
      artist: "Исполнитель 8",
      coverUrl: track7,
      duration: "3:45",
      album: "Альбом 8",
      year: "2024",
      genre: "Electronic"
    },
    {
      title: "Название релиза 9",
      artist: "Исполнитель 9",
      coverUrl: track8,
      duration: "3:45",
      album: "Альбом 9",
      year: "2024",
      genre: "Electronic"
    },
    {
      title: "Название релиза 10",
      artist: "Исполнитель 10",
      coverUrl: track9,
      duration: "3:45",
      album: "Альбом 10",
      year: "2024",
      genre: "Electronic"
    }
  ];

  // Загружаем историю поиска при монтировании
  useEffect(() => {
    const savedHistory = localStorage.getItem('searchHistory');
    if (savedHistory) {
      setSearchHistory(JSON.parse(savedHistory));
    }
  }, []);

  // Сохраняем историю поиска
  const saveSearch = (query: string) => {
    if (!query.trim()) return;

    const newHistory = [
      { query: query.trim(), timestamp: Date.now() },
      ...searchHistory.filter(item => item.query !== query.trim())
    ].slice(0, 5); // Храним только последние 5 запросов

    setSearchHistory(newHistory);
    localStorage.setItem('searchHistory', JSON.stringify(newHistory));
  };

  // Функция поиска
  const handleSearch = (query: string) => {
    setSearchQuery(query);
    
    if (query.trim()) {
      const filtered = tracks.filter(track => 
        track.title.toLowerCase().includes(query.toLowerCase()) ||
        track.artist.toLowerCase().includes(query.toLowerCase())
      );
      setFilteredTracks(filtered);
      saveSearch(query);
    } else {
      setFilteredTracks([]);
    }
  };

  // Очистка истории поиска
  const clearSearchHistory = () => {
    setSearchHistory([]);
    localStorage.removeItem('searchHistory');
  };

  // Удаление отдельного элемента из истории
  const removeFromHistory = (query: string) => {
    const newHistory = searchHistory.filter(item => item.query !== query);
    setSearchHistory(newHistory);
    localStorage.setItem('searchHistory', JSON.stringify(newHistory));
  };

  const handleTrackClick = (track: Track) => {
    setSelectedTrack(track);
    setIsModalOpen(true);
  };

  // Функция для рендера контента вкладки
  const renderTabContent = () => {
    switch (activeTab) {
      case 'search':
        return (
          <div className="search-content">
            <div className="search-header">
              <h2>Поиск</h2>
              <div className="search-input-wrapper">
                <BiSearch className="search-icon" />
                <input 
                  type="text" 
                  value={searchQuery}
                  onChange={(e) => handleSearch(e.target.value)}
                  placeholder="Трек, исполнитель или подкаст" 
                  className="search-input"
                />
              </div>
            </div>

            {!searchQuery && searchHistory.length > 0 && (
              <div className="search-history">
                <div className="history-header">
                  <h3>История поиска</h3>
                  <button onClick={clearSearchHistory} className="clear-history-btn">
                    Очистить историю
                  </button>
                </div>
                <div className="history-items">
                  {searchHistory.map((item, index) => (
                    <div key={index} className="history-item">
                      <BiHistory className="history-icon" />
                      <span 
                        onClick={() => handleSearch(item.query)}
                        className="history-query"
                      >
                        {item.query}
                      </span>
                      <button 
                        onClick={() => removeFromHistory(item.query)}
                        className="remove-history-btn"
                      >
                        <BiX />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {searchQuery && (
              <div className="search-results">
                <h3>Результаты поиска</h3>
                <div className="results-grid">
                  {filteredTracks.length > 0 ? (
                    filteredTracks.map((track, i) => (
                      <div 
                        key={i} 
                        className="result-item"
                        onClick={() => handleTrackClick(track)}
                      >
                        <img src={track.coverUrl} alt={track.title} className="result-cover" />
                        <div className="result-info">
                          <h4>{track.title}</h4>
                          <p>{track.artist}</p>
                        </div>
                      </div>
                    ))
                  ) : (
                    <p className="no-results">Ничего не найдено</p>
                  )}
                </div>
              </div>
            )}
          </div>
        );
      case 'wave':
        return (
          <>
            <div className="content-grid">
              <div className="content-item">
                <img src={year2024} alt="Итоги года" className="content-cover" />
                <div className="content-info">
                  <h2>Итоги года</h2>
                  <p>Так звучал 2024-й</p>
                </div>
              </div>
              <div className="content-item">
                <img src={track3} alt="Для вас" className="content-cover" />
                <div className="content-info">
                  <h2>Для вас</h2>
                  <p>Папин Олимпос, Mada</p>
                </div>
              </div>
              <div className="content-item">
                <img src={track4} alt="Тренды" className="content-cover" />
                <div className="content-info">
                  <h2>Тренды</h2>
                  <p>Burko, Папин Олимпос</p>
                </div>
              </div>
            </div>

            <section className="releases-section">
              <h2>Новые релизы</h2>
              <div className="releases-grid">
                {tracks.map((track, i) => (
                  <div 
                    key={i} 
                    className="release-item"
                    onClick={() => handleTrackClick(track)}
                  >
                    <img src={track.coverUrl} alt={track.title} className="release-cover" />
                    <div className="release-info">
                      <h3>{track.title}</h3>
                      <p>{track.artist}</p>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          </>
        );
      case 'collection':
        return (
          <div className="collection-content">
            <h2>Моя коллекция</h2>
            <div className="collection-grid">
              <div className="collection-item">
                <img src={favorite} alt="Мне нравится" className="collection-cover" />
                <div className="collection-info">
                  <h3>Мне нравится</h3>
                  <p>208 треков</p>
                </div>
              </div>
              {/* Можно добавить другие плейлисты */}
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="app-container">
      <nav className="navigation">
        <div className="nav-logo">
          <img src="/logo192.png" alt="Logo" className="logo" />
          <span className="logo-text">YA.MUSIC</span>
        </div>
        
        <div className="nav-section">
          <ul className="nav-items">
            <li 
              className={`nav-item ${activeTab === 'search' ? 'active' : ''}`}
              onClick={() => setActiveTab('search')}
            >
              <BiSearch className="nav-icon" />
              <span>Поиск</span>
            </li>
            <li 
              className={`nav-item ${activeTab === 'wave' ? 'active' : ''}`}
              onClick={() => setActiveTab('wave')}
            >
              <BiMusic className="nav-icon" />
              <span>Моя волна</span>
            </li>
            <li 
              className={`nav-item ${activeTab === 'collection' ? 'active' : ''}`}
              onClick={() => setActiveTab('collection')}
            >
              <BiLibrary className="nav-icon" />
              <span>Коллекция</span>
            </li>
          </ul>
        </div>

        <div className="nav-section playlists-section">
          <div className="playlists">
            <div className="playlist-item">
              <img src={favorite} alt="Liked" className="playlist-cover" />
              <div className="playlist-info">
                <h3>Мне нравится</h3>
                <p>208 треков</p>
              </div>
            </div>
            <div className="playlist-item">
              <img src={track} alt="History" className="playlist-cover" />
              <div className="playlist-info">
                <h3>История</h3>
                <p>mightymason, ANGUISH, Getthebest</p>
              </div>
            </div>
          </div>
        </div>

        <div className="user-profile">
          <div className="user-avatar">
            <BiUser className="avatar-icon" />
          </div>
          <div className="user-info">
            <h3>Пользователь</h3>
            <p>Аккаунт</p>
          </div>
        </div>
      </nav>
      
      <main className="main-content">
        {renderTabContent()}
      </main>
      
      <div className="player">
        <div className="track-info">
          <img src={track} alt="Current Track" className="cover" />
          <div className="track-details">
            <h4>SOUL (Sped Up)</h4>
            <p>74blade</p>
          </div>
          <button 
            className={`favorite-btn ${isFavorite ? 'active' : ''}`}
            onClick={() => setIsFavorite(!isFavorite)}
          >
            {isFavorite ? <IoMdHeart /> : <IoMdHeartEmpty />}
          </button>
        </div>

        <div className="player-controls">
          <div className="control-buttons">
            <button className="control-btn"><BsSkipStart /></button>
            <button 
              className="play-button"
              onClick={() => setIsPlaying(!isPlaying)}
            >
              {isPlaying ? 
                <BsPauseFill className="pause-icon" /> : 
                <BsPlayFill className="play-icon" />
              }
            </button>
            <button className="control-btn"><BsSkipEnd /></button>
          </div>
          <div className="progress-bar">
            <div className="progress"></div>
          </div>
        </div>

        <div className="player-right">
          <div className="volume-control">
            <BsVolumeUp />
            <input 
              type="range" 
              min="0" 
              max="100" 
              defaultValue="50"
              className="slider"
            />
          </div>
        </div>
      </div>

      <TrackModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        track={selectedTrack || mockTrack}
        isPlaying={isPlaying}
        isFavorite={isFavorite}
        onPlayToggle={() => setIsPlaying(!isPlaying)}
        onFavoriteToggle={() => setIsFavorite(!isFavorite)}
      />
    </div>
  );
};

export default App; 
import { useState, useEffect } from 'react';
import './App.css';
import SearchBar from './components/SearchBar';
import PlatformSelector from './components/PlatformSelector';
import LanguageSelector from './components/LanguageSelector';
import Filters from './components/Filters';
import VideoResults from './components/VideoResults';

function App() {
  const [platform, setPlatform] = useState('tiktok');
  const [language, setLanguage] = useState('kr');

  const [filters, setFilters] = useState({
    views: '100k+',
    period: 'all',
    duration: 'all',
    popularity: ['all']
  });

  const [isSearching, setIsSearching] = useState(false);
  const [searchKeyword, setSearchKeyword] = useState('');
  const [translatedKeyword, setTranslatedKeyword] = useState('');
  const [videos, setVideos] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const translateKeyword = async () => {
      if (!searchKeyword) return;

      if (language === 'kr') {
        setTranslatedKeyword(searchKeyword);
        return;
      }

      try {
        const targetLang = language === 'cn' ? 'zh-CN' : 'en';
        const params = new URLSearchParams({ q: searchKeyword, target: targetLang });
        // Use Render backend URL instead of localhost
        const response = await fetch(`https://tiktok-killa-backend.onrender.com/api/translate?${params.toString()}`);
        if (response.ok) {
          const data = await response.json();
          setTranslatedKeyword(data.translated);
        } else {
          setTranslatedKeyword(searchKeyword);
        }
      } catch (err) {
        console.error("Translation error:", err);
        setTranslatedKeyword(searchKeyword);
      }
    };

    translateKeyword();
  }, [searchKeyword, language]);

  useEffect(() => {
    const fetchVideos = async () => {
      if (!isSearching || !translatedKeyword) return;

      setIsLoading(true);
      try {
        const params = new URLSearchParams({
          q: translatedKeyword,
          platform: platform,
          views_filter: filters.views,
          period_filter: filters.period
        });
        // Use Render backend URL instead of localhost
        const response = await fetch(`https://tiktok-killa-backend.onrender.com/api/search?${params.toString()}`);
        if (response.ok) {
          const data = await response.json();
          setVideos(data);
        } else {
          console.error("Failed to fetch videos.");
          setVideos([]);
        }
      } catch (err) {
        console.error("Error fetching videos:", err);
        setVideos([]);
      } finally {
        setIsLoading(false);
      }
    };

    fetchVideos();
  }, [translatedKeyword, platform, filters.views, filters.period, isSearching]);

  const handleSearch = (keyword) => {
    if (keyword) {
      setSearchKeyword(keyword);
      setIsSearching(true);
    }
  };

  return (
    <div className="app-container">
      <header className="header">
        <h1 className="logo">틱톡킬라</h1>
      </header>

      <div className="main-content">
        {/* 좌측: 대시보드 필터 영역 */}
        <aside className="sidebar">
          <SearchBar
            onSearch={handleSearch}
            translatedKeyword={translatedKeyword}
            language={language}
          />

          <PlatformSelector
            active={platform}
            onChange={setPlatform}
          />

          <LanguageSelector
            active={language}
            onChange={setLanguage}
          />

          <Filters
            filters={filters}
            setFilters={setFilters}
          />
        </aside>

        {/* 우측: 동영상 결과 영역 */}
        <main className="results-area">
          {isSearching ? (
            isLoading ? (
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100%', color: 'var(--color-text-secondary)', fontSize: '18px' }}>
                틱톡에서 실시간 비디오를 불러오는 중입니다...
              </div>
            ) : (
              <VideoResults keyword={searchKeyword} filters={{ platform, language, ...filters }} videos={videos} />
            )
          ) : (
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100%', color: 'var(--color-text-secondary)' }}>
              검색어를 입력하시면 결과가 여기에 표시됩니다.
            </div>
          )}
        </main>
      </div>
    </div>
  );
}

export default App;

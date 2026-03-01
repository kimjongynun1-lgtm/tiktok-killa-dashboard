import React from 'react';
import './components.css';

export default function VideoResults({ keyword, filters, videos }) {
    if (!videos || videos.length === 0) {
        return (
            <div className="video-results-container">
                <div className="results-header">
                    <h2 className="results-title">
                        <span className="highlight">'{keyword}'</span> 에 대한 검색 결과가 없습니다.
                    </h2>
                </div>
            </div>
        );
    }

    return (
        <div className="video-results-container">
            <div className="results-header">
                <h2 className="results-title">
                    <span className="highlight">'{keyword}'</span> 에 대한 검색 결과
                </h2>
                <div className="results-meta">
                    <span>플랫폼: {filters.platform.toUpperCase()}</span>
                    <span>언어: {filters.language.toUpperCase()}</span>
                    <span>조회수 필터: {
                        filters.views === 'all' ? '전체' :
                            filters.views === '100k+' ? '10만 이상' : filters.views
                    }</span>
                </div>
            </div>

            <div className="video-grid" style={{ gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))' }}>
                {videos.map(video => (
                    <div key={video.id} className="video-card" style={{ height: '580px', backgroundColor: 'var(--color-bg-card)', borderRadius: '12px', overflow: 'hidden', position: 'relative' }}>
                        <div className="video-thumbnail-container" style={{ height: '100%', padding: 0, position: 'relative' }}>
                            <a
                                href={filters.platform === 'douyin' ? 'https://www.douyin.com/jingxuan' : `https://www.tiktok.com/${video.author}/video/${video.id}`}
                                target="_blank"
                                rel="noopener noreferrer"
                                style={{ display: 'block', width: '100%', height: '100%', position: 'absolute', top: 0, left: 0, zIndex: 5 }}
                            >
                                {/* Invisible clickable overlay */}
                            </a>
                            {video.video_url ? (
                                <video
                                    src={video.video_url}
                                    style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                                    autoPlay
                                    loop
                                    muted
                                />
                            ) : (
                                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100%', color: 'gray' }}>
                                    동영상을 불러올 수 없습니다.
                                </div>
                            )}

                            <div className="video-badges" style={{ position: 'absolute', top: '10px', right: '10px', display: 'flex', gap: '8px', zIndex: 10 }}>
                                <div className="video-views-badge" style={{ position: 'relative', top: 0, right: 0 }}>
                                    <span className="view-icon">▶</span> {video.views}
                                </div>
                                {video.age_days && (
                                    <div className="video-views-badge" style={{ position: 'relative', top: 0, right: 0, backgroundColor: 'rgba(235, 64, 52, 0.8)' }}>
                                        {video.age_days}일 전
                                    </div>
                                )}
                            </div>
                        </div>
                        <div className="video-info" style={{ position: 'absolute', bottom: 0, left: 0, right: 0, background: 'linear-gradient(transparent, rgba(0,0,0,0.8))', padding: '16px', color: 'white' }}>
                            <a
                                href={filters.platform === 'douyin' ? 'https://www.douyin.com/jingxuan' : `https://www.tiktok.com/${video.author}/video/${video.id}`}
                                target="_blank"
                                rel="noopener noreferrer"
                                style={{ color: 'white', textDecoration: 'none', display: 'block' }}
                            >
                                <h3 className="video-title" style={{ fontSize: '14px', marginBottom: '4px', cursor: 'pointer' }}>
                                    {video.title}
                                </h3>
                                <p className="video-author" style={{ fontSize: '12px', opacity: 0.8, cursor: 'pointer' }}>
                                    {video.author}
                                </p>
                            </a>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

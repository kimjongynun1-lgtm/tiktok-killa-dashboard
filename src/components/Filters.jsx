import React from 'react';
import './components.css';

export default function Filters({ filters, setFilters }) {
    const viewsOptions = [
        { id: 'all', label: '전체' },
        { id: '100k+', label: '10만 이상' },
        { id: '300k-500k', label: '30만~50만' },
        { id: '500k-1m', label: '50만~100만' },
        { id: '1m+', label: '100만+' }
    ];

    const periodOptions = [
        { id: 'all', label: '전체' },
        { id: '1d', label: '24시간 이내' },
        { id: '1w', label: '6일 이내' },
        { id: '1m', label: '한달 이내' },
        { id: '3m', label: '3개월' }
    ];

    const durationOptions = [
        { id: 'all', label: '전체' },
        { id: 'under20', label: '20초 미만' },
        { id: 'over20', label: '20초 이상' }
    ];

    const popularityOptions = [
        { id: 'all', label: '전체' },
        { id: 'lv1', label: '1단계 - 낮음 (<2%)' },
        { id: 'lv2', label: '2단계 - 중간 (2~4%)' },
        { id: 'lv3', label: '3단계 - 좋음 (4~6%)' },
        { id: 'lv4', label: '4단계 - 매우좋음 (6~10%)' },
        { id: 'lv5', label: '5단계 - 최고 (≥10%)' }
    ];

    const handleChange = (key, value) => {
        setFilters(prev => ({ ...prev, [key]: value }));
    };

    const togglePopularity = (id) => {
        if (id === 'all') {
            handleChange('popularity', ['all']);
            return;
        }
        const current = filters.popularity.filter(x => x !== 'all');
        if (current.includes(id)) {
            handleChange('popularity', current.filter(x => x !== id));
            if (current.length === 1) {
                handleChange('popularity', ['all']); // If none selected, default to all
            }
        } else {
            handleChange('popularity', [...current, id]);
        }
    };

    return (
        <div className="filter-section">
            <div className="filter-box">
                <div className="section-title">조회수</div>
                <div className="tag-grid top-row">
                    {viewsOptions.slice(0, 3).map(opt => (
                        <div
                            key={opt.id}
                            className={`filter-tag ${filters.views === opt.id ? 'active' : ''}`}
                            onClick={() => handleChange('views', opt.id)}
                        >
                            {opt.label}
                        </div>
                    ))}
                </div>
                <div className="tag-grid bottom-row">
                    {viewsOptions.slice(3).map(opt => (
                        <div
                            key={opt.id}
                            className={`filter-tag ${filters.views === opt.id ? 'active' : ''}`}
                            onClick={() => handleChange('views', opt.id)}
                        >
                            {opt.label}
                        </div>
                    ))}
                </div>
            </div>

            <div className="filter-box">
                <div className="section-title">기간</div>
                <div className="list-options">
                    {periodOptions.map(opt => (
                        <div
                            key={opt.id}
                            className={`list-item ${filters.period === opt.id ? 'active' : ''}`}
                            onClick={() => handleChange('period', opt.id)}
                        >
                            <div className="radio-circle"></div>
                            <span>{opt.label}</span>
                        </div>
                    ))}
                </div>
            </div>

            <div className="filter-box">
                <div className="section-title">길이</div>
                <div className="list-options">
                    {durationOptions.map(opt => (
                        <div
                            key={opt.id}
                            className={`list-item ${filters.duration === opt.id ? 'active' : ''}`}
                            onClick={() => handleChange('duration', opt.id)}
                        >
                            <div className="radio-circle"></div>
                            <span>{opt.label}</span>
                        </div>
                    ))}
                </div>
            </div>

            <div className="filter-box">
                <div className="section-title">인기도</div>
                <div className="item-desc">(좋아요 + 댓글 + 공유) ÷ 조회수 기반 인기도 단계</div>
                <div className="list-options">
                    {popularityOptions.map(opt => {
                        const isActive = filters.popularity.includes(opt.id);
                        return (
                            <div
                                key={opt.id}
                                className={`list-item ${isActive ? 'active' : ''}`}
                                onClick={() => togglePopularity(opt.id)}
                            >
                                <div className="check-square"></div>
                                <span>{opt.label}</span>
                            </div>
                        );
                    })}
                </div>
            </div>

        </div>
    );
}

import React from 'react';
import './components.css';

export default function PlatformSelector({ active, onChange }) {
    const platforms = [
        { id: 'tiktok', title: 'TikTok', icon: '🎵', isBrand: false },
        { id: 'douyin', title: 'Douyin', icon: '☵', isBrand: false },
        { id: 'xiaohongshu', title: 'Xiaohongshu', icon: '❤️', subtitle: '(준비중)' }
    ];

    return (
        <div>
            <div className="section-label">플랫폼 선택</div>
            <div className="selector-grid">
                {platforms.map(p => (
                    <div
                        key={p.id}
                        className={`select-card ${active === p.id ? 'active' : ''}`}
                        onClick={() => onChange(p.id)}
                    >
                        <div className="card-icon">{p.icon}</div>
                        <div className="card-title">{p.title}</div>
                        {p.subtitle && <div className="card-subtitle">{p.subtitle}</div>}
                    </div>
                ))}
            </div>
        </div>
    );
}

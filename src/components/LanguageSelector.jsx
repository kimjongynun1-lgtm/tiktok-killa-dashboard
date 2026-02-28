import React from 'react';
import './components.css';

export default function LanguageSelector({ active, onChange }) {
    const langs = [
        { id: 'kr', code: 'KR', name: '한국어' },
        { id: 'cn', code: 'CN', name: '中文' },
        { id: 'us', code: 'US', name: 'English' }
    ];

    return (
        <div>
            <div className="section-label">검색 언어</div>
            <div className="selector-grid">
                {langs.map(l => (
                    <div
                        key={l.id}
                        className={`select-card ${active === l.id ? 'active' : ''}`}
                        onClick={() => onChange(l.id)}
                    >
                        <div className="card-title" style={{ fontSize: '13px', color: 'var(--color-text-primary)' }}>{l.code}</div>
                        <div className="card-title" style={{ marginTop: '2px' }}>{l.name}</div>
                    </div>
                ))}
            </div>
        </div>
    );
}

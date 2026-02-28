import React, { useState } from 'react';
import './components.css';

export default function SearchBar({ onSearch }) {
    const [keyword, setKeyword] = useState('');

    const handleSearch = () => {
        if (onSearch && keyword.trim() !== '') {
            onSearch(keyword.trim());
        }
    };

    const handleKeyDown = (e) => {
        if (e.key === 'Enter') {
            handleSearch();
        }
    };

    return (
        <div className="search-container">
            <div className="section-label">검색어</div>
            <div className="search-input-row">
                <input
                    type="text"
                    className="search-input"
                    placeholder="검색할 키워드를 입력하세요"
                    value={keyword}
                    onChange={(e) => setKeyword(e.target.value)}
                    onKeyDown={handleKeyDown}
                />
                <button className="search-button" onClick={handleSearch}>검색</button>
            </div>

            <div className="translation-box">
                <div className="trans-top">
                    <span style={{ fontSize: '14px' }}>📄</span>
                    <span>원문 (ENGLISH)</span>
                </div>
                <div className="trans-middle">
                    {keyword ? keyword : '-'}
                </div>
                <div className="trans-bottom">
                    <span>💬</span> 검색 버튼을 클릭하면 번역 후 검색됩니다
                </div>
            </div>
        </div>
    );
}

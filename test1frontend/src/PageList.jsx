import React, { useState } from 'react';
import './PageList.css';

const PageList = () => {
  const [selectedPages, setSelectedPages] = useState([]);
  const [allPagesChecked, setAllPagesChecked] = useState(false);
  const [hoveredItem, setHoveredItem] = useState(null);
  const [pressedItem, setPressedItem] = useState(null);
  const [donePressed, setDonePressed] = useState(false);
  const pages = ['Page 1', 'Page 2', 'Page 3', 'Page 4', 'Page 5', 'Page 6'];

  const togglePage = (page) => {
    setSelectedPages(prev => 
      prev.includes(page) 
        ? prev.filter(p => p !== page)
        : [...prev, page]
    );
  };

  const toggleAll = () => {
    setAllPagesChecked(prev => !prev);
  };

  const CheckboxIcon = ({ isChecked, isHovered, isPressed }) => {
    if (isChecked) {
      return (
        <svg width="17" height="12" viewBox="0 0 17 12" fill="none">
          <path 
            d="M1 5.5 L5.8 10 L14.6 1.2"
            stroke="white" 
            strokeWidth="1.5" 
            strokeLinecap="round" 
            strokeLinejoin="round"
          />
        </svg>
      );
    }
     else if (isPressed) {
      return (
        <svg width="15" height="11" viewBox="0 0 15 11" fill="none">
          <path 
            d="M1 5.5 L5.8 10 L14.6 1.2" 
            stroke="#878787" 
            strokeWidth="1.5" 
            strokeLinecap="round" 
            strokeLinejoin="round"
          />
        </svg>
      );
    }
     else if (isHovered) {
      return (
        <svg width="15" height="11" viewBox="0 0 15 11" fill="none">
          <path 
            d="M1 5.5 L5.8 10 L14.6 1.2" 
            stroke="#E3E3E3" 
            strokeWidth="1.5" 
            strokeLinecap="round" 
            strokeLinejoin="round"
          />
        </svg>
      );
    }
    
    return null;
  };

  return (
    <div className="page-list-wrapper">
      <div className="page-list-container">
        {/* Header with Select All Checkbox */}
        <div 
          className="page-list-header" 
          onClick={toggleAll}
          onMouseEnter={() => setHoveredItem('all')}
          onMouseLeave={() => setHoveredItem(null)}
          onMouseDown={() => setPressedItem('all')}
          onMouseUp={() => setPressedItem(null)}
        >
          <span className="header-text">All pages</span>
          <div 
            className={`checkbox 
              ${allPagesChecked ? 'checked' : ''} 
              ${hoveredItem === 'all' ? 'hovered' : ''} 
              ${pressedItem === 'all' ? 'pressed' : ''}`}
          >
            <CheckboxIcon 
              isChecked={allPagesChecked} 
              isHovered={hoveredItem === 'all' && !allPagesChecked} 
              isPressed={pressedItem === 'all' && !allPagesChecked}
            />
          </div>
        </div>

        <div className="divider"></div>

        {/* Page List */}
        <div className="page-items">
          {pages.map((page, index) => {
            const isChecked = selectedPages.includes(page);
            const isHovered = hoveredItem === page;
            const isPressed = pressedItem === page;
            
            return (
              <div
                key={index}
                className="page-item"
                onClick={() => togglePage(page)}
                onMouseEnter={() => setHoveredItem(page)}
                onMouseLeave={() => setHoveredItem(null)}
                onMouseDown={() => setPressedItem(page)}
                onMouseUp={() => setPressedItem(null)}
              >
                <span className="page-name">{page}</span>
                
                <div 
                  className={`checkbox 
                    ${isChecked ? 'checked' : ''} 
                    ${isHovered ? 'hovered' : ''} 
                    ${isPressed ? 'pressed' : ''}`}
                >
                  <CheckboxIcon 
                    isChecked={isChecked} 
                    isHovered={isHovered && !isChecked} 
                    isPressed={isPressed && !isChecked}
                  />
                </div>
              </div>
            );
          })}
        </div>

          <div className={`divider ${donePressed ? 'darker' : ''}`}></div>


        {/* Done Button */}
        <button 
          className="done-button"
          onMouseDown={() => setDonePressed(true)}
          onMouseUp={() => setDonePressed(false)}
          onMouseLeave={() => setDonePressed(false)}
        >
          Done
        </button>
      </div>
    </div>
  );
};

export default PageList;
import React, { useState, useEffect, useRef } from 'react';
import './ProjectCover.css';

function AnimatedStars() {
  const starsRef = useRef(null);
  
  useEffect(() => {
    const starsContainer = starsRef.current;
    if (!starsContainer) return;
    
    const createStar = () => {
      const star = document.createElement('div');
      star.className = 'cover-star';
      
      // Random position and properties
      star.style.left = Math.random() * 100 + '%';
      star.style.top = Math.random() * 100 + '%';
      star.style.animationDelay = Math.random() * 3 + 's';
      star.style.animationDuration = (2 + Math.random() * 4) + 's';
      
      // Random star size
      const size = Math.random() * 3 + 1;
      star.style.width = size + 'px';
      star.style.height = size + 'px';
      
      starsContainer.appendChild(star);
    };
    
    // Create stars
    for (let i = 0; i < 100; i++) {
      createStar();
    }
    
    return () => {
      if (starsContainer) {
        starsContainer.innerHTML = '';
      }
    };
  }, []);
  
  return <div ref={starsRef} className="animated-stars"></div>;
}

function FloatingUFO({ delay = 0, direction = 1 }) {
  return (
    <div 
      className="floating-ufo" 
      style={{
        '--delay': delay + 's',
        '--direction': direction
      }}
    >
      🛸
    </div>
  );
}

function AnimatedPlanet({ type = 'mars', size = 'medium', position }) {
  return (
    <div 
      className={`animated-planet ${type} ${size}`}
      style={{
        left: position.x + '%',
        top: position.y + '%'
      }}
    >
      <div className="planet-glow"></div>
      <div className="planet-surface"></div>
      {type === 'saturn' && <div className="planet-rings"></div>}
    </div>
  );
}

function TypewriterText({ text, speed = 100, delay = 0 }) {
  const [displayText, setDisplayText] = useState('');
  const [currentIndex, setCurrentIndex] = useState(0);
  
  useEffect(() => {
    const startTimer = setTimeout(() => {
      if (currentIndex < text.length) {
        const timer = setTimeout(() => {
          setDisplayText(prev => prev + text[currentIndex]);
          setCurrentIndex(prev => prev + 1);
        }, speed);
        
        return () => clearTimeout(timer);
      }
    }, delay);
    
    return () => clearTimeout(startTimer);
  }, [currentIndex, text, speed, delay]);
  
  return (
    <span className="typewriter-text">
      {displayText}
      <span className="typewriter-cursor">|</span>
    </span>
  );
}

function MartianCharacter({ position, animationDelay = 0 }) {
  return (
    <div 
      className="martian-character"
      style={{
        left: position.x + '%',
        top: position.y + '%',
        animationDelay: animationDelay + 's'
      }}
    >
      <div className="martian-head">👽</div>
      <div className="martian-ray"></div>
    </div>
  );
}

function ProjectCover({ onEnter }) {
  const [showSubtitle, setShowSubtitle] = useState(false);
  const [showButton, setShowButton] = useState(false);
  const [isExiting, setIsExiting] = useState(false);
  
  useEffect(() => {
    // Show subtitle after title animation
    const subtitleTimer = setTimeout(() => setShowSubtitle(true), 2000);
    // Show button after subtitle
    const buttonTimer = setTimeout(() => setShowButton(true), 4500);
    
    return () => {
      clearTimeout(subtitleTimer);
      clearTimeout(buttonTimer);
    };
  }, []);
  
  const handleEnter = () => {
    setIsExiting(true);
    setTimeout(() => {
      onEnter();
    }, 1000);
  };
  
  return (
    <div className={`project-cover ${isExiting ? 'exiting' : ''}`}>
      <AnimatedStars />
      
      {/* Background Planets */}
      <AnimatedPlanet type="mars" size="large" position={{ x: 75, y: 20 }} />
      <AnimatedPlanet type="earth" size="medium" position={{ x: 10, y: 60 }} />
      <AnimatedPlanet type="saturn" size="small" position={{ x: 85, y: 75 }} />
      
      {/* Floating UFOs */}
      <FloatingUFO delay={0} direction={1} />
      <FloatingUFO delay={2} direction={-1} />
      <FloatingUFO delay={4} direction={1} />
      
      {/* Martian Characters */}
      <MartianCharacter position={{ x: 15, y: 25 }} animationDelay={3} />
      <MartianCharacter position={{ x: 80, y: 40 }} animationDelay={5} />
      
      {/* Main Content */}
      <div className="cover-content">
        <div className="cover-title-wrapper">
          <h1 className="cover-title glitch" data-text="MARS NEEDS WIFI!">
            MARS NEEDS WIFI!
          </h1>
          <div className="title-underline"></div>
        </div>
        
        {showSubtitle && (
          <div className="cover-subtitle">
            <TypewriterText 
              text="THE ULTIMATE INTERGALACTIC INVASION SIMULATOR"
              speed={80}
              delay={0}
            />
          </div>
        )}
        
        {showButton && (
          <button 
            className="cover-enter-btn"
            onClick={handleEnter}
            onMouseEnter={() => {
              // Add some fun sound effect or animation
            }}
          >
            <span className="btn-text">ENTER THE MOTHERSHIP</span>
            <span className="btn-icon">🚀</span>
            <div className="btn-glow"></div>
          </button>
        )}
        
        <div className="cover-credits">
          <p>An Interactive Mars Invasion Experience</p>
          <p>Built with React • Powered by Alien Technology</p>
        </div>
      </div>
      
      {/* Animated Elements */}
      <div className="space-debris">
        <div className="debris debris-1">🌌</div>
        <div className="debris debris-2">☄️</div>
        <div className="debris debris-3">🛰️</div>
        <div className="debris debris-4">🌠</div>
      </div>
      
      {/* Warning Messages */}
      <div className="warning-messages">
        <div className="warning-msg warning-1">⚠️ ALIEN ACTIVITY DETECTED</div>
        <div className="warning-msg warning-2">🔴 RED ALERT: INVASION IMMINENT</div>
        <div className="warning-msg warning-3">📡 INCOMING TRANSMISSION...</div>
      </div>
    </div>
  );
}

export default ProjectCover;
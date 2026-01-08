import React, { useState, useEffect, useRef } from 'react';
import './App.css'
import reactLogo from './assets/react.svg';
import ProjectCover from './components/ProjectCover';

function ParticleSystem() {
  const particlesRef = useRef(null);
  
  useEffect(() => {
    const particleContainer = particlesRef.current;
    if (!particleContainer) return;
    
    const createParticle = () => {
      const particle = document.createElement('div');
      particle.className = 'particle';
      
      // Random starting position
      particle.style.left = Math.random() * 100 + 'vw';
      particle.style.animationDelay = Math.random() * 20 + 's';
      particle.style.animationDuration = (15 + Math.random() * 10) + 's';
      
      particleContainer.appendChild(particle);
      
      // Remove particle after animation
      setTimeout(() => {
        if (particle.parentNode) {
          particle.parentNode.removeChild(particle);
        }
      }, 25000);
    };
    
    // Create initial particles
    for (let i = 0; i < 30; i++) {
      setTimeout(() => createParticle(), i * 100);
    }
    
    // Continuously create particles
    const interval = setInterval(createParticle, 800);
    
    return () => {
      clearInterval(interval);
    };
  }, []);
  
  return <div ref={particlesRef} className="particle-system"></div>;
}

function FloatingShapes() {
  const shapesRef = useRef(null);
  
  useEffect(() => {
    const shapesContainer = shapesRef.current;
    if (!shapesContainer) return;
    
    const shapes = ['triangle', 'circle', 'square'];
    
    const createShape = () => {
      const shape = document.createElement('div');
      const shapeType = shapes[Math.floor(Math.random() * shapes.length)];
      shape.className = `shape ${shapeType}`;
      
      // Random starting position
      shape.style.left = Math.random() * 100 + 'vw';
      shape.style.animationDelay = Math.random() * 15 + 's';
      shape.style.animationDuration = (12 + Math.random() * 8) + 's';
      
      shapesContainer.appendChild(shape);
      
      // Remove shape after animation
      setTimeout(() => {
        if (shape.parentNode) {
          shape.parentNode.removeChild(shape);
        }
      }, 20000);
    };
    
    // Create initial shapes
    for (let i = 0; i < 15; i++) {
      setTimeout(() => createShape(), i * 200);
    }
    
    // Continuously create shapes
    const interval = setInterval(createShape, 1200);
    
    return () => {
      clearInterval(interval);
    };
  }, []);
  
  return <div ref={shapesRef} className="floating-shapes"></div>;
}

function TrickyCube() {
  const cubeRef = useRef(null);
  const [rotation, setRotation] = useState({ x: 20, y: 45 });
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const animationRef = useRef(null);
  
  useEffect(() => {
    const handleMouseMove = (e) => {
      const x = (e.clientY / window.innerHeight - 0.5) * 40;
      const y = (e.clientX / window.innerWidth - 0.5) * 40;
      setMousePos({ x, y });
    };
    
    window.addEventListener('mousemove', handleMouseMove);
    
    // Auto-rotate animation
    let angle = 0;
    const animate = () => {
      angle += 0.5;
      setRotation(prev => ({
        x: prev.x + (mousePos.x - prev.x) * 0.05 + Math.sin(angle * 0.02) * 2,
        y: prev.y + (mousePos.y - prev.y) * 0.05 + Math.cos(angle * 0.02) * 2
      }));
      animationRef.current = requestAnimationFrame(animate);
    };
    
    animationRef.current = requestAnimationFrame(animate);
    
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [mousePos.x, mousePos.y]);
  
  return (
    <div className="tricky-cube-container">
      <div 
        ref={cubeRef}
        className="cube-3d"
        style={{
          transform: `rotateX(${rotation.x}deg) rotateY(${rotation.y}deg)`
        }}
      >
        <div className="cube-face front">👽</div>
        <div className="cube-face back">🛸</div>
        <div className="cube-face right">🚀</div>
        <div className="cube-face left">⚡</div>
        <div className="cube-face top">🌌</div>
        <div className="cube-face bottom">🔴</div>
      </div>
      <div className="cube-shadow"></div>
    </div>
  );
}

/**
 * @typedef {Object} Translation
 * @property {string} heroTitle
 * @property {string} heroSubtitle
 * @property {string} join
 * @property {string} surrender
 * @property {string} featuresTitle
 * @property {string} brain
 * @property {string} brainDesc
 * @property {string} rays
 * @property {string} raysDesc
 * @property {string} mind
 * @property {string} mindDesc
 * @property {string} testZone
 * @property {string} dropdownShow
 * @property {string} dropdownHide
 * @property {string} martian
 * @property {string} venusian
 * @property {string} earthling
 * @property {string} textShow
 * @property {string} textHide
 * @property {string} line1
 * @property {string} line2
 * @property {string} line3
 * @property {string} click
 * @property {string} times
 * @property {string} martianRed
 * @property {string} martianGreen
 * @property {string} footer
 * @property {string} lang
 * @property {string} htmlElements
 * @property {string} backToHome
 * @property {string} htmlElementsTitle
 */

/** @type {{ EN: Translation, RU: Translation, ES: Translation }} */
const translations = {
  EN: {
    heroTitle: 'MARS ATTACKS!',
    heroSubtitle: 'THE INVASION HAS BEGUN • RESISTANCE IS FUTILE • WELCOME YOUR NEW OVERLORDS',
    join: 'JOIN THE INVASION',
    surrender: 'SURRENDER NOW',
    featuresTitle: 'ALIEN TECHNOLOGY',
    brain: 'BRAIN EXTRACTION',
    brainDesc: 'Advanced Martian technology for efficient human brain harvesting and analysis.',
    rays: 'DEATH RAYS',
    raysDesc: 'State-of-the-art disintegration weapons that reduce humans to colorful skeletons.',
    mind: 'MIND CONTROL',
    mindDesc: 'Hypnotic Martian powers to bend human will and establish our galactic empire.',
    testZone: 'INTERACTIVE TEST ZONE',
    dropdownShow: 'Show Drop-down',
    dropdownHide: 'Hide Drop-down',
    martian: 'Martian',
    venusian: 'Venusian',
    earthling: 'Earthling',
    textShow: 'Show Text Lines',
    textHide: 'Hide Text Lines',
    line1: '• The Martians are coming!',
    line2: '• Hide your cows!',
    line3: '• Prepare the death rays!',
    click: 'Clicked',
    times: 'times',
    martianRed: 'Martian Red',
    martianGreen: 'Martian Green',
    footer: 'ACK ACK ACK! • MARS EMPIRE © 2024 • ALL HUMANS RESERVED FOR EXPERIMENTATION',
    lang: 'RU 🇷🇺',
    htmlElements: 'HTML Elements Demo',
    backToHome: 'Back to Home',
    htmlElementsTitle: 'HTML Elements Showcase',
    interactiveComponents: 'Interactive Components',
    interactiveComponentsTitle: 'Interactive React Components Showcase',
    timer: 'Timer',
    startTimer: 'Start Timer',
    stopTimer: 'Stop Timer',
    resetTimer: 'Reset Timer',
    progressDemo: 'Progress Demo',
    increaseProgress: 'Increase Progress',
    decreaseProgress: 'Decrease Progress',
    modalDemo: 'Modal Demo',
    openModal: 'Open Modal',
    closeModal: 'Close Modal',
    modalTitle: 'Martian Alert!',
    modalContent: 'This is a modal dialog with important alien information.',
    tabsDemo: 'Tabs Demo',
    tab1: 'Invasion Plans',
    tab2: 'Alien Tech',
    tab3: 'Earth Status',
    accordionDemo: 'Accordion Demo',
    toastDemo: 'Toast Notifications',
    showToast: 'Show Toast',
    imageGallery: 'Image Gallery',
    colorPicker: 'Color Picker',
    formValidation: 'Form Validation',
    submit: 'Submit',
    loading: 'Loading...',
    searchFilter: 'Search & Filter',
    searchPlaceholder: 'Search items...',
    all: 'All',
    active: 'Active',
    inactive: 'Inactive'
  },
  RU: {
    heroTitle: 'НАПАДЕНИЕ МАРСА!',
    heroSubtitle: 'НАЧАЛОСЬ ВТОРЖЕНИЕ • СОПРОТИВЛЕНИЕ БЕСПОЛЕЗНО • ПРИВЕТСТВУЙТЕ НОВЫХ ПОВЕЛИТЕЛЕЙ',
    join: 'ПРИСОЕДИНИТЬСЯ К ВТОРЖЕНИЮ',
    surrender: 'СДАТЬСЯ СЕЙЧАС',
    featuresTitle: 'ИННОВАЦИИ ИНОПЛАНЕТЯН',
    brain: 'ИЗВЛЕЧЕНИЕ МОЗГА',
    brainDesc: 'Передовые марсианские технологии для эффективного сбора и анализа человеческих мозгов.',
    rays: 'ЛУЧИ СМЕРТИ',
    raysDesc: 'Современное оружие дезинтеграции, превращающее людей в цветные скелеты.',
    mind: 'КОНТРОЛЬ РАЗУМА',
    mindDesc: 'Гипнотические силы марсиан для подчинения человеческой воли и создания галактической империи.',
    testZone: 'ИНТЕРАКТИВНАЯ ЗОНА ТЕСТА',
    dropdownShow: 'Показать выпадающий список',
    dropdownHide: 'Скрыть выпадающий список',
    martian: 'Марсианин',
    venusian: 'Венерианец',
    earthling: 'Землянин',
    textShow: 'Показать строки текста',
    textHide: 'Скрыть строки текста',
    line1: '• Марсиане идут!',
    line2: '• Прячьте коров!',
    line3: '• Готовьте лучи смерти!',
    click: 'Кликов',
    times: '',
    martianRed: 'Марсианский Красный',
    martianGreen: 'Марсианский Зелёный',
    footer: 'АК АК АК! • ИМПЕРИЯ МАРСА © 2024 • ВСЕ ЛЮДИ ЗАРЕЗЕРВИРОВАНЫ ДЛЯ ЭКСПЕРИМЕНТОВ',
    lang: 'ES 🇪🇸',
    htmlElements: 'HTML Элементы Демо',
    backToHome: 'Назад на Главную',
    htmlElementsTitle: 'Витрина HTML Элементов',
    interactiveComponents: 'Интерактивные Компоненты',
    interactiveComponentsTitle: 'Витрина Интерактивных React Компонентов',
    timer: 'Таймер',
    startTimer: 'Запустить Таймер',
    stopTimer: 'Остановить Таймер',
    resetTimer: 'Сбросить Таймер',
    progressDemo: 'Демо Прогресса',
    increaseProgress: 'Увеличить Прогресс',
    decreaseProgress: 'Уменьшить Прогресс',
    modalDemo: 'Демо Модального Окна',
    openModal: 'Открыть Модальное Окно',
    closeModal: 'Закрыть',
    modalTitle: 'Марсианское Предупреждение!',
    modalContent: 'Это модальное диалоговое окно с важной инопланетной информацией.',
    tabsDemo: 'Демо Вкладок',
    tab1: 'Планы Вторжения',
    tab2: 'Инопланетные Технологии',
    tab3: 'Статус Земли',
    accordionDemo: 'Демо Аккордеона',
    toastDemo: 'Уведомления Toast',
    showToast: 'Показать Уведомление',
    imageGallery: 'Галерея Изображений',
    colorPicker: 'Выбор Цвета',
    formValidation: 'Валидация Формы',
    submit: 'Отправить',
    loading: 'Загрузка...',
    searchFilter: 'Поиск и Фильтр',
    searchPlaceholder: 'Поиск элементов...',
    all: 'Все',
    active: 'Активные',
    inactive: 'Неактивные'
  },
  ES: {
    heroTitle: '¡ATAQUE DE MARTE!',
    heroSubtitle: 'LA INVASIÓN HA COMENZADO • LA RESISTENCIA ES INÚTIL • BIENVENIDOS A SUS NUEVOS AMOS',
    join: 'ÚNETE A LA INVASIÓN',
    surrender: 'RÍNDETE AHORA',
    featuresTitle: 'TECNOLOGÍA ALIENÍGENA',
    brain: 'EXTRACCIÓN CEREBRAL',
    brainDesc: 'Tecnología marciana avanzada para la extracción y análisis eficiente de cerebros humanos.',
    rays: 'RAYOS DE LA MUERTE',
    raysDesc: 'Armas de desintegración de última generación que reducen a los humanos a esqueletos coloridos.',
    mind: 'CONTROL MENTAL',
    mindDesc: 'Poderes hipnóticos marcianos para doblegar la voluntad humana y establecer nuestro imperio galáctico.',
    testZone: 'ZONA DE PRUEBAS INTERACTIVA',
    dropdownShow: 'Mostrar Desplegable',
    dropdownHide: 'Ocultar Desplegable',
    martian: 'Marciano',
    venusian: 'Venusino',
    earthling: 'Terrícola',
    textShow: 'Mostrar Líneas de Texto',
    textHide: 'Ocultar Líneas de Texto',
    line1: '• ¡Los marcianos están llegando!',
    line2: '• ¡Escondan sus vacas!',
    line3: '• ¡Preparen los rayos de la muerte!',
    click: 'Clics',
    times: 'veces',
    martianRed: 'Rojo Marciano',
    martianGreen: 'Verde Marciano',
    footer: '¡ACK ACK ACK! • IMPERIO DE MARTE © 2024 • TODOS LOS HUMANOS RESERVADOS PARA EXPERIMENTACIÓN',
    lang: 'EN 🇺🇸',
    htmlElements: 'Demo de Elementos HTML',
    backToHome: 'Volver al Inicio',
    htmlElementsTitle: 'Galería de Elementos HTML',
    interactiveComponents: 'Componentes Interactivos',
    interactiveComponentsTitle: 'Galería de Componentes React Interactivos',
    timer: 'Temporizador',
    startTimer: 'Iniciar Temporizador',
    stopTimer: 'Detener Temporizador',
    resetTimer: 'Reiniciar Temporizador',
    progressDemo: 'Demo de Progreso',
    increaseProgress: 'Aumentar Progreso',
    decreaseProgress: 'Disminuir Progreso',
    modalDemo: 'Demo de Modal',
    openModal: 'Abrir Modal',
    closeModal: 'Cerrar Modal',
    modalTitle: '¡Alerta Marciana!',
    modalContent: 'Este es un diálogo modal con información alienígena importante.',
    tabsDemo: 'Demo de Pestañas',
    tab1: 'Planes de Invasión',
    tab2: 'Tecnología Alienígena',
    tab3: 'Estado de la Tierra',
    accordionDemo: 'Demo de Acordeón',
    toastDemo: 'Notificaciones Toast',
    showToast: 'Mostrar Notificación',
    imageGallery: 'Galería de Imágenes',
    colorPicker: 'Selector de Color',
    formValidation: 'Validación de Formulario',
    submit: 'Enviar',
    loading: 'Cargando...',
    searchFilter: 'Búsqueda y Filtro',
    searchPlaceholder: 'Buscar elementos...',
    all: 'Todos',
    active: 'Activos',
    inactive: 'Inactivos'
  }
};

function App() {
  /** @type {[boolean, Function]} */
  const [showCover, setShowCover] = useState(true);
  /** @type {['EN' | 'RU' | 'ES', Function]} */
  const [lang, setLang] = useState('EN');
  /** @type {['home' | 'html-elements' | 'interactive-components', Function]} */
  const [currentPage, setCurrentPage] = useState('home');
  /** @type {[boolean, Function]} */
  const [popupVisible, setPopupVisible] = useState(false);
  /** @type {[string, Function]} */
  const [popupContent, setPopupContent] = useState('');
  /** @type {Translation} */
  const t = translations[lang];
  const showPopup = (content) => {
    setPopupContent(content);
    setPopupVisible(true);
  };

  const hidePopup = () => {
    setPopupVisible(false);
    setPopupContent('');
  };

  const handleEnterApp = () => {
    setShowCover(false);
  };

  // Show project cover first
  if (showCover) {
    return <ProjectCover onEnter={handleEnterApp} />;
  }

  return (
    <>
      <ParticleSystem />
      <FloatingShapes />
      <TrickyCube />
      <div className="morph-bg"></div>
      
      {/* Funny Popup Modal */}
      {popupVisible && (
        <div className="popup-overlay" style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: 'rgba(0,0,0,0.9)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 9999,
          animation: 'fadeIn 0.3s ease-out'
        }}>
          <div className="popup-content" style={{
            backgroundColor: '#1a1a1a',
            padding: '3rem',
            borderRadius: '15px',
            border: '3px solid #ff0000',
            maxWidth: '600px',
            width: '90%',
            textAlign: 'center',
            boxShadow: '0 0 50px rgba(255, 0, 0, 0.5)',
            position: 'relative',
            animation: 'popupBounce 0.5s ease-out'
          }}>
            <div style={{
              fontSize: '4rem',
              marginBottom: '1rem'
            }}>
              🛸
            </div>
            <div style={{
              color: '#ff0000',
              fontSize: '1.5rem',
              fontWeight: 'bold',
              marginBottom: '1.5rem',
              textTransform: 'uppercase',
              letterSpacing: '2px'
            }}>
              Martian High Command
            </div>
            <div style={{
              color: 'white',
              fontSize: '1.2rem',
              lineHeight: '1.6',
              marginBottom: '2rem'
            }}>
              {popupContent}
            </div>
            <button 
              onClick={hidePopup}
              style={{
                backgroundColor: '#ff0000',
                color: 'white',
                border: 'none',
                padding: '1rem 2rem',
                fontSize: '1.1rem',
                borderRadius: '25px',
                cursor: 'pointer',
                fontWeight: 'bold',
                textTransform: 'uppercase',
                letterSpacing: '1px',
                transition: 'all 0.3s ease'
              }}
              onMouseOver={(e) => e.target.style.backgroundColor = '#ff3333'}
              onMouseOut={(e) => e.target.style.backgroundColor = '#ff0000'}
            >
              ACK ACK! UNDERSTOOD! 👽
            </button>
          </div>
        </div>
      )}
      
      {/* Navigation Bar */}
      <nav className="main-nav" role="navigation" aria-label="Main Navigation">
        <div className="nav-logo">
          <img src={reactLogo} alt="Logo" style={{ height: '2.5rem', verticalAlign: 'middle' }} />
        </div>
        <ul className="nav-links">
          {currentPage === 'home' ? (
            <>
              <li><a href="#hero">Hero</a></li>
              <li><a href="#features">Features</a></li>
              <li><a href="#test-zone">Test Zone</a></li>
              <li><button onClick={() => setCurrentPage('html-elements')} className="nav-btn">{t.htmlElements}</button></li>
              <li><button onClick={() => setCurrentPage('interactive-components')} className="nav-btn">{t.interactiveComponents}</button></li>
              <li><a href="#footer">Footer</a></li>
            </>
          ) : (
            <>
              <li><button onClick={() => setCurrentPage('home')} className="nav-btn">{t.backToHome}</button></li>
            </>
          )}
        </ul>
      </nav>
      <a href="#main-content" className="skip-link">Skip to main content</a>
      <div className="mars-landing" id="main-content" role="main">
        {currentPage === 'home' ? (
          <HomePage t={t} setCurrentPage={setCurrentPage} showPopup={showPopup} setLang={setLang} />
        ) : currentPage === 'html-elements' ? (
          <HTMLElementsPage t={t} setLang={setLang} />
        ) : (
          <InteractiveComponentsPage t={t} setLang={setLang} />
        )}
      </div>
    </>
  )
}

function HomePage({ t, setCurrentPage, showPopup, setLang }) {
  const funnyMessages = {
    join: [
      "🚀 EXCELLENT CHOICE, EARTHLING! Your application to join our glorious invasion has been submitted. Side effects may include: temporary disintegration, chronic case of being green, and an irresistible urge to say 'ACK ACK ACK!' Report to the nearest UFO for your complimentary brain scan!",
      "🛸 WELCOME TO TEAM MARS! Your starter kit includes: one death ray (batteries not included), a mind control helmet (one size fits most heads), and a 'How to Terrorize Humans' manual. Please note: Earth destruction is scheduled for next Tuesday. Bring snacks!",
      "👽 CONGRATULATIONS! You've been promoted from 'potential lab rat' to 'honorary Martian minion!' Your first mission: convince three friends to join our cause. Failure will result in being turned into a decorative lawn ornament on Mars!",
      "🌌 FANTASTIC! Your betrayal of your own species has been noted and appreciated. You'll receive your official 'Traitor to Humanity' badge in 3-5 business days. Warning: may cause awkward conversations at family dinners.",
      "🔴 SPLENDID DECISION! As a new recruit, you get exclusive access to our Mars vacation packages (one-way tickets only) and complimentary alien abduction insurance. Terms and conditions apply in 47 different galaxies!"
    ],
    surrender: [
      "🏳️ WISE CHOICE, PUNY HUMAN! Your surrender has been graciously accepted. Please form an orderly queue for brain extraction. Refreshments will NOT be provided. Thank you for choosing Mars Conquest Services - we're #1 in galactic domination!",
      "😌 FINALLY, SOMEONE WITH SENSE! Your white flag has been received and processed. You've been assigned to Earth Colony Sector 7, where you'll spend your days polishing UFOs and serving as a test subject for our new ray guns. Enjoy your retirement from freedom!",
      "🕊️ EXCELLENT CAPITULATION! As a token of our appreciation, you've won a lifetime supply of Martian food cubes (flavor: disappointment) and a cozy cell with a view of our beautiful red planet. Side effects may include existential dread and homesickness.",
      "🛸 SURRENDER ACCEPTED! Don't worry, we'll take good care of Earth... by completely redecorating it with giant Martian monuments and converting all your pizza into nutritious space gruel. You're welcome for the improvement!",
      "👽 VERY PRACTICAL OF YOU! Your submission form has been filed under 'Smart Humans Who Knew When to Quit.' You'll be spared... for now. Please report to the nearest mothership for your complimentary 'I Gave Up Without a Fight' t-shirt!"
    ],
    adventure: [
      "⚡ ADVENTURE ACTIVATED! Congratulations, you've just volunteered for our 'Extreme Earth Defense vs Martian Invasion' reality show! First challenge: survive the next 5 minutes without being vaporized. Good luck, you'll need it! 🎯",
      "🌟 BUCKLE UP, SPACE CADET! Your adventure begins with a complimentary alien abduction, followed by a scenic tour of our mothership's detention facilities. Rated 5 stars by zero humans who lived to tell about it!",
      "⚡ ADVENTURE QUEST INITIATED! You've unlocked the 'Hopeless Human Hero' achievement! Your mission: save Earth with nothing but determination, questionable decision-making, and a 0.001% chance of success. Press F to pay respects... to yourself!",
      "🎮 GAME ON! Welcome to 'Martian Invasion: Impossible Mode!' You are Player 1 in humanity's last stand. Plot twist: we already know the ending, and spoiler alert - it involves a lot of green aliens celebrating. But hey, good effort!",
      "🚀 ADVENTURE LOADING... ERROR 404: HOPE NOT FOUND! Just kidding! Your heroic journey starts now. Will you save Earth or become another cautionary tale told around Martian campfires? Only one way to find out! (Hint: it's probably the campfire thing.)"
    ]
  };

  const getRandomMessage = (type) => {
    const messages = funnyMessages[type];
    return messages[Math.floor(Math.random() * messages.length)];
  };
  return (
    <>
      {/* Hero Section */}
      <section id="hero" className="hero">
        {/* Animated stars background */}
        <svg className="hero-bg-anim" width="100%" height="100%" viewBox="0 0 1440 600" preserveAspectRatio="none">
          <circle cx="200" cy="100" r="2.5" fill="#fff" opacity="0.7">
            <animate attributeName="cy" values="100;120;100" dur="3s" repeatCount="indefinite"/>
          </circle>
          <circle cx="400" cy="200" r="1.5" fill="#ffff00" opacity="0.6">
            <animate attributeName="cy" values="200;220;200" dur="4s" repeatCount="indefinite"/>
          </circle>
          <circle cx="800" cy="80" r="2" fill="#ff0000" opacity="0.5">
            <animate attributeName="cy" values="80;100;80" dur="2.5s" repeatCount="indefinite"/>
          </circle>
          <circle cx="1200" cy="300" r="2.2" fill="#00ff00" opacity="0.7">
            <animate attributeName="cy" values="300;320;300" dur="3.5s" repeatCount="indefinite"/>
          </circle>
          <circle cx="1000" cy="500" r="1.8" fill="#fff" opacity="0.5">
            <animate attributeName="cy" values="500;520;500" dur="4.2s" repeatCount="indefinite"/>
          </circle>
        </svg>
        <div className="alien-overlay"></div>
        <div className="hero-content">
          <div className="ufo" onClick={() => setLang(l => l === 'EN' ? 'RU' : l === 'RU' ? 'ES' : 'EN')}>🛸</div>
          <h1 className="hero-title" data-text={t.heroTitle}>{t.heroTitle}</h1>
          <div className="hero-tagline">Defend Earth or Join the Martian Empire. The choice is yours!</div>
          <p className="hero-subtitle">
            {t.heroSubtitle}
          </p>
          <div className="hero-buttons">
            <button 
              className="btn btn-primary" 
              aria-label="Join the invasion"
              onClick={() => showPopup(getRandomMessage('join'))}
            >
              <span className="btn-icon" role="img" aria-label="join">🚀</span>{t.join}
            </button>
            <button 
              className="btn btn-secondary" 
              aria-label="Surrender now"
              onClick={() => showPopup(getRandomMessage('surrender'))}
            >
              <span className="btn-icon" role="img" aria-label="surrender">🕊️</span>{t.surrender}
            </button>
            <button 
              className="hero-cta"
              onClick={() => showPopup(getRandomMessage('adventure'))}
            >
              <span className="btn-icon" role="img" aria-label="adventure">⚡</span>Start Your Adventure
            </button>
          </div>
        </div>
        <div className="mars-bg"></div>
      </section>
      {/* Features Section */}
      <section id="features" className="features">
        <div className="container">
          <h2 className="section-title">{t.featuresTitle}</h2>
          <div className="features-grid">
            <div className="feature-card">
              <div className="feature-icon">👽</div>
              <h3>{t.brain}</h3>
              <p>{t.brainDesc}</p>
              <button className="learn-more" aria-label="Learn more about brain extraction">Learn More</button>
            </div>
            <div className="feature-card">
              <div className="feature-icon">🛸</div>
              <h3>{t.rays}</h3>
              <p>{t.raysDesc}</p>
              <button className="learn-more" aria-label="Learn more about death rays">Learn More</button>
            </div>
            <div className="feature-card">
              <div className="feature-icon">🔴</div>
              <h3>{t.mind}</h3>
              <p>{t.mindDesc}</p>
              <button className="learn-more" aria-label="Learn more about mind control">Learn More</button>
            </div>
          </div>
        </div>
      </section>
      {/* Interactive Test Section */}
      <section id="test-zone" className="features">
        <div className="container">
          <h2 className="section-title">{t.testZone}</h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', alignItems: 'center', marginTop: '2rem' }}>
            {/* Dropdown simulation */}
            <DropdownSimulator t={t} />
            {/* Text lines toggle */}
            <TextLinesToggle t={t} />
            {/* Click counter */}
            <ClickCounter t={t} />
            {/* Color toggle button */}
            <ColorToggleButton t={t} />
          </div>
        </div>
      </section>
      {/* Navigation to HTML Elements Page */}
      <section className="html-elements-nav">
        <div className="container">
          <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center' }}>
            <button 
              className="btn btn-primary" 
              onClick={() => setCurrentPage('html-elements')}
              aria-label="Navigate to HTML Elements showcase"
            >
              <span className="btn-icon" role="img" aria-label="elements">🧱</span>
              {t.htmlElements}
            </button>
            <button 
              className="btn btn-secondary" 
              onClick={() => setCurrentPage('interactive-components')}
              aria-label="Navigate to Interactive Components showcase"
            >
              <span className="btn-icon" role="img" aria-label="components">⚡</span>
              {t.interactiveComponents}
            </button>
          </div>
        </div>
      </section>
      {/* Footer */}
      <footer id="footer" className="footer">
        <div className="container">
          <p>{t.footer}</p>
          <button className="lang-switch-btn" aria-label="Switch language" onClick={() => setLang(l => l === 'EN' ? 'RU' : l === 'RU' ? 'ES' : 'EN')}>
            <span className="btn-icon" role="img" aria-label="language">🌐</span>
            {t.lang}
          </button>
        </div>
      </footer>
    </>
  );
}

function HTMLElementsPage({ t, setLang }) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
    category: 'general',
    newsletter: false,
    rating: '5'
  });

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  return (
    <div className="html-elements-page">
      <div className="container">
        <header className="page-header">
          <h1>{t.htmlElementsTitle}</h1>
          <p>A comprehensive showcase of common HTML elements with Martian styling</p>
        </header>

        {/* Typography Section */}
        <section className="elements-section">
          <h2>Typography & Text Elements</h2>
          <div className="typography-showcase">
            <h1>Heading 1 - Mars Invasion Protocol</h1>
            <h2>Heading 2 - Alien Technology Division</h2>
            <h3>Heading 3 - Brain Extraction Unit</h3>
            <h4>Heading 4 - Death Ray Department</h4>
            <h5>Heading 5 - Mind Control Section</h5>
            <h6>Heading 6 - UFO Maintenance Crew</h6>
            
            <p>This is a <strong>paragraph</strong> with <em>emphasized text</em>, <mark>highlighted content</mark>, and <small>small text</small>.</p>
            <p>Here's some <code>inline code</code> and a <kbd>keyboard shortcut</kbd>.</p>
            
            <blockquote>
              "Resistance is futile. Your technology will be assimilated into our Martian empire."
              <cite>- Supreme Martian Commander</cite>
            </blockquote>

            <pre><code>{`// Martian invasion code
function invadeEarth() {
  console.log("ACK ACK ACK!");
  return "Mission accomplished";
}`}</code></pre>
          </div>
        </section>

        {/* Lists Section */}
        <section className="elements-section">
          <h2>Lists</h2>
          <div className="lists-showcase">
            <div className="list-group">
              <h3>Unordered List - Invasion Supplies</h3>
              <ul>
                <li>Death Ray Batteries</li>
                <li>Brain Storage Containers</li>
                <li>UFO Fuel Cells</li>
                <li>Mind Control Helmets</li>
                <li>Martian Translation Devices</li>
              </ul>
            </div>

            <div className="list-group">
              <h3>Ordered List - Invasion Steps</h3>
              <ol>
                <li>Scout Earth defenses</li>
                <li>Deploy UFO fleet</li>
                <li>Activate death rays</li>
                <li>Begin brain harvesting</li>
                <li>Establish Martian rule</li>
              </ol>
            </div>

            <div className="list-group">
              <h3>Description List - Alien Species</h3>
              <dl>
                <dt>Martians</dt>
                <dd>Green-skinned beings with advanced technology and big brains</dd>
                <dt>Venusians</dt>
                <dd>Mysterious cloud-dwellers with acidic personalities</dd>
                <dt>Earthlings</dt>
                <dd>Primitive bipeds suitable for experimentation</dd>
              </dl>
            </div>
          </div>
        </section>

        {/* Form Elements Section */}
        <section className="elements-section">
          <h2>Form Elements</h2>
          <form className="demo-form" onSubmit={(e) => e.preventDefault()}>
            <fieldset>
              <legend>Alien Registration Form</legend>
              
              <div className="form-group">
                <label htmlFor="name">Name:</label>
                <input 
                  type="text" 
                  id="name" 
                  name="name" 
                  value={formData.name}
                  onChange={handleInputChange}
                  placeholder="Enter your Earth name"
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="email">Email:</label>
                <input 
                  type="email" 
                  id="email" 
                  name="email" 
                  value={formData.email}
                  onChange={handleInputChange}
                  placeholder="your@email.com"
                />
              </div>

              <div className="form-group">
                <label htmlFor="category">Category:</label>
                <select 
                  id="category" 
                  name="category" 
                  value={formData.category}
                  onChange={handleInputChange}
                >
                  <option value="general">General Inquiry</option>
                  <option value="surrender">Willing to Surrender</option>
                  <option value="resistance">Joining Resistance</option>
                  <option value="alien">Already an Alien</option>
                </select>
              </div>

              <div className="form-group">
                <label htmlFor="rating">Invasion Rating:</label>
                <input 
                  type="range" 
                  id="rating" 
                  name="rating" 
                  min="1" 
                  max="10" 
                  value={formData.rating}
                  onChange={handleInputChange}
                />
                <span>Value: {formData.rating}</span>
              </div>

              <div className="form-group">
                <label htmlFor="message">Message:</label>
                <textarea 
                  id="message" 
                  name="message" 
                  rows="4" 
                  value={formData.message}
                  onChange={handleInputChange}
                  placeholder="Tell us about your planet..."
                ></textarea>
              </div>

              <div className="form-group checkbox-group">
                <input 
                  type="checkbox" 
                  id="newsletter" 
                  name="newsletter" 
                  checked={formData.newsletter}
                  onChange={handleInputChange}
                />
                <label htmlFor="newsletter">Subscribe to Martian Newsletter</label>
              </div>

              <div className="form-group radio-group">
                <p>Preferred Contact Method:</p>
                <div>
                  <input type="radio" id="telepathy" name="contact" value="telepathy" />
                  <label htmlFor="telepathy">Telepathy</label>
                </div>
                <div>
                  <input type="radio" id="probe" name="contact" value="probe" />
                  <label htmlFor="probe">Alien Probe</label>
                </div>
                <div>
                  <input type="radio" id="email-contact" name="contact" value="email" />
                  <label htmlFor="email-contact">Primitive Email</label>
                </div>
              </div>

              <button type="submit" className="btn btn-primary">Submit to Martian Command</button>
            </fieldset>
          </form>
        </section>

        {/* Table Section */}
        <section className="elements-section">
          <h2>Table</h2>
          <div className="table-container">
            <table className="demo-table">
              <caption>Martian Fleet Status Report</caption>
              <thead>
                <tr>
                  <th>Ship ID</th>
                  <th>Type</th>
                  <th>Status</th>
                  <th>Crew</th>
                  <th>Mission</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>UFO-001</td>
                  <td>Mothership</td>
                  <td className="status-active">Active</td>
                  <td>150</td>
                  <td>Command Center</td>
                </tr>
                <tr>
                  <td>UFO-042</td>
                  <td>Scout</td>
                  <td className="status-active">Active</td>
                  <td>5</td>
                  <td>Earth Reconnaissance</td>
                </tr>
                <tr>
                  <td>UFO-123</td>
                  <td>Harvester</td>
                  <td className="status-maintenance">Maintenance</td>
                  <td>25</td>
                  <td>Brain Collection</td>
                </tr>
                <tr>
                  <td>UFO-777</td>
                  <td>Destroyer</td>
                  <td className="status-active">Active</td>
                  <td>75</td>
                  <td>Death Ray Operations</td>
                </tr>
              </tbody>
              <tfoot>
                <tr>
                  <th colSpan="3">Total Fleet</th>
                  <th>255</th>
                  <th>4 Active Missions</th>
                </tr>
              </tfoot>
            </table>
          </div>
        </section>

        {/* Media Elements Section */}
        <section className="elements-section">
          <h2>Media & Interactive Elements</h2>
          <div className="media-showcase">
            <div className="media-group">
              <h3>Image with Caption</h3>
              <figure>
                <img 
                  src={reactLogo} 
                  alt="React Logo representing alien technology" 
                  className="demo-image"
                />
                <figcaption>Advanced Martian React Technology</figcaption>
              </figure>
            </div>

            <div className="media-group">
              <h3>Progress Bar</h3>
              <label htmlFor="invasion-progress">Invasion Progress:</label>
              <progress id="invasion-progress" value="75" max="100">75%</progress>
              <span>75% Complete</span>
            </div>

            <div className="media-group">
              <h3>Meter</h3>
              <label htmlFor="earth-defense">Earth Defense Level:</label>
              <meter id="earth-defense" value="0.3" min="0" max="1">30%</meter>
              <span>Low</span>
            </div>
          </div>
        </section>

        {/* Semantic Elements Section */}
        <section className="elements-section">
          <h2>Semantic Elements</h2>
          <article className="demo-article">
            <header>
              <h3>Breaking News: Martian Fleet Approaches Earth</h3>
              <time dateTime="2024-03-15">March 15, 2024</time>
            </header>
            <p>In a shocking turn of events, our deep space monitoring stations have detected a massive Martian fleet approaching Earth...</p>
            <aside>
              <h4>Related Links</h4>
              <ul>
                <li><a href="#defense">Earth Defense Protocol</a></li>
                <li><a href="#evacuation">Evacuation Plans</a></li>
                <li><a href="#surrender">Surrender Instructions</a></li>
              </ul>
            </aside>
          </article>

          <details className="demo-details">
            <summary>Classified Martian Intel (Click to expand)</summary>
            <p>According to our sources, the Martians possess advanced technology including:</p>
            <ul>
              <li>Quantum death rays</li>
              <li>Mind control devices</li>
              <li>Interdimensional travel capabilities</li>
              <li>Brain preservation technology</li>
            </ul>
          </details>
        </section>

        {/* Interactive Elements */}
        <section className="elements-section">
          <h2>Interactive Elements</h2>
          <div className="interactive-showcase">
            <button type="button" className="btn btn-primary">Primary Button</button>
            <button type="button" className="btn btn-secondary">Secondary Button</button>
            <button type="button" disabled className="btn btn-primary">Disabled Button</button>
            
            <div className="link-examples">
              <a href="#top">Internal Link</a>
              <a href="https://example.com" target="_blank" rel="noopener noreferrer">External Link</a>
              <a href="mailto:aliens@mars.galaxy">Email Link</a>
              <a href="tel:+1-800-MARTIAN">Phone Link</a>
            </div>
          </div>
        </section>
        
        {/* Footer with Language Switcher */}
        <footer className="footer">
          <div className="container">
            <p>ACK ACK ACK! • MARS EMPIRE © 2024 • ALL HUMANS RESERVED FOR EXPERIMENTATION</p>
            <button className="lang-switch-btn" aria-label="Switch language" onClick={() => setLang(l => l === 'EN' ? 'RU' : l === 'RU' ? 'ES' : 'EN')}>
              <span className="btn-icon" role="img" aria-label="language">🌐</span>
              {t.lang}
            </button>
          </div>
        </footer>
      </div>
    </div>
  );
}

function InteractiveComponentsPage({ t, setLang }) {
  const [timerSeconds, setTimerSeconds] = useState(0);
  const [timerRunning, setTimerRunning] = useState(false);
  const [progress, setProgress] = useState(50);
  const [modalOpen, setModalOpen] = useState(false);
  const [activeTab, setActiveTab] = useState(0);
  const [accordionOpen, setAccordionOpen] = useState({});
  const [toasts, setToasts] = useState([]);
  const [selectedColor, setSelectedColor] = useState('#ff0000');
  const [formData, setFormData] = useState({ name: '', email: '' });
  const [formErrors, setFormErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [filter, setFilter] = useState('all');
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  // Timer effect
  React.useEffect(() => {
    let interval = null;
    if (timerRunning) {
      interval = setInterval(() => {
        setTimerSeconds(seconds => seconds + 1);
      }, 1000);
    } else if (!timerRunning && timerSeconds !== 0) {
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [timerRunning, timerSeconds]);

  // Sample data for filtering
  const items = [
    { id: 1, name: 'Martian Ray Gun', status: 'active' },
    { id: 2, name: 'UFO Engine', status: 'inactive' },
    { id: 3, name: 'Brain Scanner', status: 'active' },
    { id: 4, name: 'Teleporter', status: 'inactive' },
    { id: 5, name: 'Force Field Generator', status: 'active' },
  ];

  // Sample images for gallery
  const galleryImages = [
    'https://via.placeholder.com/300x200/ff0000/ffffff?text=Mars+Image+1',
    'https://via.placeholder.com/300x200/00ff00/ffffff?text=Mars+Image+2',
    'https://via.placeholder.com/300x200/0000ff/ffffff?text=Mars+Image+3',
    'https://via.placeholder.com/300x200/ffff00/000000?text=Mars+Image+4',
  ];

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const toggleAccordion = (index) => {
    setAccordionOpen(prev => ({
      ...prev,
      [index]: !prev[index]
    }));
  };

  const showToast = (message) => {
    const id = Date.now();
    const toast = { id, message };
    setToasts(prev => [...prev, toast]);
    setTimeout(() => {
      setToasts(prev => prev.filter(t => t.id !== id));
    }, 3000);
  };

  const validateForm = () => {
    const errors = {};
    if (!formData.name.trim()) errors.name = 'Name is required';
    if (!formData.email.trim()) errors.email = 'Email is required';
    else if (!/\S+@\S+\.\S+/.test(formData.email)) errors.email = 'Email is invalid';
    return errors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const errors = validateForm();
    setFormErrors(errors);
    
    if (Object.keys(errors).length === 0) {
      setLoading(true);
      await new Promise(resolve => setTimeout(resolve, 2000)); // Simulate API call
      setLoading(false);
      showToast('Form submitted successfully!');
      setFormData({ name: '', email: '' });
    }
  };

  const filteredItems = items.filter(item => {
    const matchesSearch = item.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = filter === 'all' || item.status === filter;
    return matchesSearch && matchesFilter;
  });

  const tabs = [
    { title: t.tab1, content: 'Phase 1: Reconnaissance complete. Earth defenses are minimal.' },
    { title: t.tab2, content: 'Our quantum disintegrators are 99.7% effective against human technology.' },
    { title: t.tab3, content: 'Population: 8 billion humans. Estimated harvest time: 72 Earth hours.' }
  ];

  return (
    <div className="interactive-components-page">
      <div className="container">
        <header className="page-header">
          <h1>{t.interactiveComponentsTitle}</h1>
          <p>A comprehensive showcase of interactive React components with Martian styling</p>
        </header>

        {/* Toast Container */}
        <div className="toast-container" style={{ position: 'fixed', top: '20px', right: '20px', zIndex: 1000 }}>
          {toasts.map(toast => (
            <div key={toast.id} className="toast" style={{ 
              background: '#ff0000', 
              color: 'white', 
              padding: '1rem', 
              marginBottom: '0.5rem', 
              borderRadius: '4px',
              animation: 'slideIn 0.3s ease-out'
            }}>
              {toast.message}
            </div>
          ))}
        </div>

        {/* Timer Section */}
        <section className="elements-section">
          <h2>{t.timer}</h2>
          <div className="timer-demo" style={{ textAlign: 'center', padding: '2rem' }}>
            <div className="timer-display" style={{ fontSize: '3rem', color: '#ff0000', marginBottom: '1rem' }}>
              {formatTime(timerSeconds)}
            </div>
            <div className="timer-controls" style={{ display: 'flex', gap: '1rem', justifyContent: 'center' }}>
              <button 
                className="btn btn-primary" 
                onClick={() => setTimerRunning(!timerRunning)}
              >
                {timerRunning ? t.stopTimer : t.startTimer}
              </button>
              <button 
                className="btn btn-secondary" 
                onClick={() => { setTimerSeconds(0); setTimerRunning(false); }}
              >
                {t.resetTimer}
              </button>
            </div>
          </div>
        </section>

        {/* Progress Bar Section */}
        <section className="elements-section">
          <h2>{t.progressDemo}</h2>
          <div className="progress-demo" style={{ padding: '2rem' }}>
            <div className="progress-bar" style={{ 
              width: '100%', 
              height: '30px', 
              backgroundColor: '#333', 
              borderRadius: '15px', 
              overflow: 'hidden',
              marginBottom: '1rem'
            }}>
              <div 
                className="progress-fill" 
                style={{ 
                  height: '100%', 
                  width: `${progress}%`, 
                  backgroundColor: '#ff0000', 
                  transition: 'width 0.3s ease',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: 'white',
                  fontWeight: 'bold'
                }}
              >
                {progress}%
              </div>
            </div>
            <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center' }}>
              <button 
                className="btn btn-primary" 
                onClick={() => setProgress(Math.min(100, progress + 10))}
                disabled={progress >= 100}
              >
                {t.increaseProgress}
              </button>
              <button 
                className="btn btn-secondary" 
                onClick={() => setProgress(Math.max(0, progress - 10))}
                disabled={progress <= 0}
              >
                {t.decreaseProgress}
              </button>
            </div>
          </div>
        </section>

        {/* Modal Section */}
        <section className="elements-section">
          <h2>{t.modalDemo}</h2>
          <div className="modal-demo" style={{ padding: '2rem', textAlign: 'center' }}>
            <button className="btn btn-primary" onClick={() => setModalOpen(true)}>
              {t.openModal}
            </button>
            
            {modalOpen && (
              <div className="modal-overlay" style={{
                position: 'fixed',
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                backgroundColor: 'rgba(0,0,0,0.8)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                zIndex: 1000
              }}>
                <div className="modal-content" style={{
                  backgroundColor: '#1a1a1a',
                  padding: '2rem',
                  borderRadius: '8px',
                  border: '2px solid #ff0000',
                  maxWidth: '500px',
                  width: '90%'
                }}>
                  <h3 style={{ color: '#ff0000', marginBottom: '1rem' }}>{t.modalTitle}</h3>
                  <p style={{ color: 'white', marginBottom: '2rem' }}>{t.modalContent}</p>
                  <button className="btn btn-secondary" onClick={() => setModalOpen(false)}>
                    {t.closeModal}
                  </button>
                </div>
              </div>
            )}
          </div>
        </section>

        {/* Tabs Section */}
        <section className="elements-section">
          <h2>{t.tabsDemo}</h2>
          <div className="tabs-demo">
            <div className="tab-headers" style={{ display: 'flex', borderBottom: '2px solid #333' }}>
              {tabs.map((tab, index) => (
                <button
                  key={index}
                  className={`tab-header ${activeTab === index ? 'active' : ''}`}
                  style={{
                    padding: '1rem 2rem',
                    border: 'none',
                    backgroundColor: activeTab === index ? '#ff0000' : '#333',
                    color: 'white',
                    cursor: 'pointer',
                    borderRadius: '8px 8px 0 0'
                  }}
                  onClick={() => setActiveTab(index)}
                >
                  {tab.title}
                </button>
              ))}
            </div>
            <div className="tab-content" style={{ 
              padding: '2rem', 
              backgroundColor: '#1a1a1a', 
              border: '2px solid #333',
              borderTop: 'none'
            }}>
              <p style={{ color: 'white' }}>{tabs[activeTab].content}</p>
            </div>
          </div>
        </section>

        {/* Accordion Section */}
        <section className="elements-section">
          <h2>{t.accordionDemo}</h2>
          <div className="accordion-demo">
            {['Invasion Strategy', 'Alien Technology', 'Earth Defenses'].map((title, index) => (
              <div key={index} className="accordion-item" style={{ 
                border: '1px solid #333', 
                marginBottom: '0.5rem' 
              }}>
                <button
                  className="accordion-header"
                  style={{
                    width: '100%',
                    padding: '1rem',
                    backgroundColor: '#333',
                    color: 'white',
                    border: 'none',
                    textAlign: 'left',
                    cursor: 'pointer',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center'
                  }}
                  onClick={() => toggleAccordion(index)}
                >
                  {title}
                  <span>{accordionOpen[index] ? '−' : '+'}</span>
                </button>
                {accordionOpen[index] && (
                  <div className="accordion-content" style={{ 
                    padding: '1rem', 
                    backgroundColor: '#1a1a1a', 
                    color: 'white' 
                  }}>
                    <p>Detailed information about {title.toLowerCase()} will be displayed here.</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </section>

        {/* Image Gallery Section */}
        <section className="elements-section">
          <h2>{t.imageGallery}</h2>
          <div className="gallery-demo" style={{ textAlign: 'center' }}>
            <div className="main-image" style={{ marginBottom: '1rem' }}>
              <img 
                src={galleryImages[currentImageIndex]} 
                alt={`Gallery image ${currentImageIndex + 1}`}
                style={{ maxWidth: '100%', height: '300px', objectFit: 'cover', borderRadius: '8px' }}
              />
            </div>
            <div className="thumbnail-nav" style={{ 
              display: 'flex', 
              gap: '0.5rem', 
              justifyContent: 'center',
              marginBottom: '1rem'
            }}>
              {galleryImages.map((img, index) => (
                <img
                  key={index}
                  src={img}
                  alt={`Thumbnail ${index + 1}`}
                  style={{ 
                    width: '60px', 
                    height: '40px', 
                    objectFit: 'cover', 
                    cursor: 'pointer',
                    border: currentImageIndex === index ? '2px solid #ff0000' : '2px solid transparent',
                    borderRadius: '4px'
                  }}
                  onClick={() => setCurrentImageIndex(index)}
                />
              ))}
            </div>
            <div className="gallery-controls" style={{ display: 'flex', gap: '1rem', justifyContent: 'center' }}>
              <button 
                className="btn btn-secondary" 
                onClick={() => setCurrentImageIndex(Math.max(0, currentImageIndex - 1))}
                disabled={currentImageIndex === 0}
              >
                ← Previous
              </button>
              <button 
                className="btn btn-secondary" 
                onClick={() => setCurrentImageIndex(Math.min(galleryImages.length - 1, currentImageIndex + 1))}
                disabled={currentImageIndex === galleryImages.length - 1}
              >
                Next →
              </button>
            </div>
          </div>
        </section>

        {/* Color Picker Section */}
        <section className="elements-section">
          <h2>{t.colorPicker}</h2>
          <div className="color-picker-demo" style={{ padding: '2rem', textAlign: 'center' }}>
            <input
              type="color"
              value={selectedColor}
              onChange={(e) => setSelectedColor(e.target.value)}
              style={{ width: '100px', height: '50px', border: 'none', cursor: 'pointer' }}
            />
            <div style={{ 
              marginTop: '1rem', 
              padding: '2rem', 
              backgroundColor: selectedColor, 
              borderRadius: '8px',
              color: 'white',
              textShadow: '1px 1px 2px rgba(0,0,0,0.8)'
            }}>
              Selected Color: {selectedColor}
            </div>
          </div>
        </section>

        {/* Form Validation Section */}
        <section className="elements-section">
          <h2>{t.formValidation}</h2>
          <form onSubmit={handleSubmit} className="validation-form" style={{ maxWidth: '400px', margin: '0 auto' }}>
            <div className="form-group" style={{ marginBottom: '1rem' }}>
              <label style={{ display: 'block', marginBottom: '0.5rem', color: 'white' }}>Name:</label>
              <input
                type="text"
                value={formData.name}
                onChange={(e) => setFormData({...formData, name: e.target.value})}
                style={{
                  width: '100%',
                  padding: '0.5rem',
                  border: formErrors.name ? '2px solid #ff0000' : '2px solid #333',
                  borderRadius: '4px',
                  backgroundColor: '#1a1a1a',
                  color: 'white'
                }}
              />
              {formErrors.name && <span style={{ color: '#ff0000', fontSize: '0.8rem' }}>{formErrors.name}</span>}
            </div>
            
            <div className="form-group" style={{ marginBottom: '1rem' }}>
              <label style={{ display: 'block', marginBottom: '0.5rem', color: 'white' }}>Email:</label>
              <input
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({...formData, email: e.target.value})}
                style={{
                  width: '100%',
                  padding: '0.5rem',
                  border: formErrors.email ? '2px solid #ff0000' : '2px solid #333',
                  borderRadius: '4px',
                  backgroundColor: '#1a1a1a',
                  color: 'white'
                }}
              />
              {formErrors.email && <span style={{ color: '#ff0000', fontSize: '0.8rem' }}>{formErrors.email}</span>}
            </div>
            
            <button 
              type="submit" 
              className="btn btn-primary" 
              disabled={loading}
              style={{ width: '100%' }}
            >
              {loading ? t.loading : t.submit}
            </button>
          </form>
        </section>

        {/* Search and Filter Section */}
        <section className="elements-section">
          <h2>{t.searchFilter}</h2>
          <div className="search-filter-demo" style={{ padding: '2rem' }}>
            <div className="controls" style={{ 
              display: 'flex', 
              gap: '1rem', 
              marginBottom: '2rem', 
              justifyContent: 'center',
              flexWrap: 'wrap'
            }}>
              <input
                type="text"
                placeholder={t.searchPlaceholder}
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                style={{
                  padding: '0.5rem',
                  borderRadius: '4px',
                  border: '2px solid #333',
                  backgroundColor: '#1a1a1a',
                  color: 'white',
                  minWidth: '200px'
                }}
              />
              <select
                value={filter}
                onChange={(e) => setFilter(e.target.value)}
                style={{
                  padding: '0.5rem',
                  borderRadius: '4px',
                  border: '2px solid #333',
                  backgroundColor: '#1a1a1a',
                  color: 'white'
                }}
              >
                <option value="all">{t.all}</option>
                <option value="active">{t.active}</option>
                <option value="inactive">{t.inactive}</option>
              </select>
            </div>
            
            <div className="items-list">
              {filteredItems.map(item => (
                <div
                  key={item.id}
                  className="item"
                  style={{
                    padding: '1rem',
                    marginBottom: '0.5rem',
                    backgroundColor: '#1a1a1a',
                    border: '1px solid #333',
                    borderRadius: '4px',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center'
                  }}
                >
                  <span style={{ color: 'white' }}>{item.name}</span>
                  <span style={{ 
                    padding: '0.25rem 0.5rem', 
                    borderRadius: '4px',
                    backgroundColor: item.status === 'active' ? '#00ff00' : '#ff6600',
                    color: 'black',
                    fontSize: '0.8rem'
                  }}>
                    {item.status}
                  </span>
                </div>
              ))}
              {filteredItems.length === 0 && (
                <p style={{ textAlign: 'center', color: '#666', fontStyle: 'italic' }}>
                  No items found matching your criteria
                </p>
              )}
            </div>
          </div>
        </section>

        {/* Toast Demo Section */}
        <section className="elements-section">
          <h2>{t.toastDemo}</h2>
          <div className="toast-demo" style={{ padding: '2rem', textAlign: 'center' }}>
            <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
              <button 
                className="btn btn-primary" 
                onClick={() => showToast('Success! Mission accomplished!')}
              >
                Success Toast
              </button>
              <button 
                className="btn btn-secondary" 
                onClick={() => showToast('Warning! Earthlings detected!')}
              >
                Warning Toast
              </button>
              <button 
                className="btn" 
                style={{ backgroundColor: '#ff6600', color: 'white' }}
                onClick={() => showToast('Error! Death ray malfunction!')}
              >
                Error Toast
              </button>
            </div>
          </div>
        </section>
        
        {/* Footer with Language Switcher */}
        <footer className="footer">
          <div className="container">
            <p>ACK ACK ACK! • MARS EMPIRE © 2024 • ALL HUMANS RESERVED FOR EXPERIMENTATION</p>
            <button className="lang-switch-btn" aria-label="Switch language" onClick={() => setLang(l => l === 'EN' ? 'RU' : l === 'RU' ? 'ES' : 'EN')}>
              <span className="btn-icon" role="img" aria-label="language">🌐</span>
              {t.lang}
            </button>
          </div>
        </footer>
      </div>
    </div>
  );
}

export default App

// DropdownSimulator: shows/hides a dropdown list
/** @param {{ t: Translation }} props */
function DropdownSimulator({ t }) {
  const [show, setShow] = useState(false);
  return (
    <div>
      <button 
        className="btn btn-primary" 
        aria-label={show ? t.dropdownHide : t.dropdownShow} 
        onClick={() => setShow(s => !s)}
        style={{ 
          background: '#fff !important',
          color: '#000 !important'
        }}
      >
        <span className="btn-icon" role="img" aria-label="dropdown">{show ? '▲' : '▼'}</span>
        {show ? t.dropdownHide : t.dropdownShow}
      </button>
      {show && (
        <select style={{ 
          marginLeft: '1rem', 
          padding: '0.5rem', 
          fontSize: '1rem',
          background: '#fff !important',
          color: '#000 !important'
        }}>
          <option>{t.martian}</option>
          <option>{t.venusian}</option>
          <option>{t.earthling}</option>
        </select>
      )}
    </div>
  );
}

// TextLinesToggle: shows/hides several text lines
/** @param {{ t: Translation }} props */
function TextLinesToggle({ t }) {
  const [show, setShow] = useState(false);
  return (
    <div>
      <button 
        className="btn btn-secondary" 
        aria-label={show ? t.textHide : t.textShow} 
        onClick={() => setShow(s => !s)}
        style={{ 
          background: '#fff !important',
          color: '#000 !important'
        }}
      >
        <span className="btn-icon" role="img" aria-label="toggle-text">{show ? '🙈' : '📝'}</span>
        {show ? t.textHide : t.textShow}
      </button>
      {show && (
        <div style={{ marginTop: '0.5rem', color: '#ffff00', textAlign: 'left' }}>
          <div>{t.line1}</div>
          <div>{t.line2}</div>
          <div>{t.line3}</div>
        </div>
      )}
    </div>
  );
}

// ClickCounter: button that counts clicks
/** @param {{ t: Translation }} props */
function ClickCounter({ t }) {
  const [count, setCount] = useState(0);
  return (
    <button 
      className="btn btn-primary" 
      aria-label="Click counter" 
      onClick={() => setCount(c => c + 1)}
      style={{ 
        background: '#fff !important',
        color: '#000 !important'
      }}
    >
      <span className="btn-icon" role="img" aria-label="click">🖱️</span>
      {t.click} {count} {t.times}
    </button>
  );
}

// ColorToggleButton: toggles color on click
/** @param {{ t: Translation }} props */
function ColorToggleButton({ t }) {
  const [on, setOn] = useState(false);
  return (
    <button
      className={on ? 'btn btn-secondary' : 'btn btn-primary'}
      aria-label="Toggle Martian color"
      onClick={() => setOn(o => !o)}
      style={{ 
        background: '#fff !important',
        color: '#000 !important'
      }}
    >
      <span className="btn-icon" role="img" aria-label="color">🎨</span>
      {on ? t.martianGreen : t.martianRed}
    </button>
  );
}

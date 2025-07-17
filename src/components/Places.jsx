import { useState } from 'react';

export default function Places({ title, places, fallbackText, onSelectPlace }) {
  const [hoveredPlace, setHoveredPlace] = useState(null);

  return (
    <section className="places-category">
      <div className="places-header">
        <h2>{title}</h2>
        <div className="places-count">
          <span className="count-badge">{places.length}</span>
          <span className="count-text">places</span>
        </div>
      </div>
      
      {places.length === 0 && (
        <div className="fallback-container">
          <div className="fallback-icon">🌍</div>
          <p className="fallback-text">{fallbackText}</p>
        </div>
      )}
      
      {places.length > 0 && (
        <div className="places-grid">
          {places.map((place) => (
            <div 
              key={place.id} 
              className={`place-card ${hoveredPlace === place.id ? 'hovered' : ''}`}
              onMouseEnter={() => setHoveredPlace(place.id)}
              onMouseLeave={() => setHoveredPlace(null)}
            >
              <div className="place-image-container">
                <img 
                  src={place.image.src} 
                  alt={place.image.alt} 
                  className="place-image"
                />
                <div className="place-overlay">
                  <button 
                    className="place-button"
                    onClick={() => onSelectPlace(place.id)}
                  >
                    {title.includes('Available') ? 'Add to List' : 'Remove'}
                  </button>
                </div>
              </div>
              <div className="place-content">
                <h3 className="place-title">{place.title}</h3>
                <div className="place-location">
                  <span className="location-icon">📍</span>
                  <span className="coordinates">
                    {place.lat.toFixed(2)}°, {place.lon.toFixed(2)}°
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </section>
  );
}

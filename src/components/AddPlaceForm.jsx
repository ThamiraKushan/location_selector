import { useState } from 'react';

export default function AddPlaceForm({ onAddPlace }) {
  const [isOpen, setIsOpen] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    lat: '',
    lon: '',
    imageUrl: ''
  });

  function handleSubmit(e) {
    e.preventDefault();
    
    const newPlace = {
      id: `custom-${Date.now()}`,
      title: formData.title,
      image: {
        src: formData.imageUrl || 'https://via.placeholder.com/400x300/1f1c2c/8feeff?text=Custom+Place',
        alt: formData.description || `Custom place: ${formData.title}`
      },
      lat: parseFloat(formData.lat) || 0,
      lon: parseFloat(formData.lon) || 0
    };

    onAddPlace(newPlace);
    setFormData({
      title: '',
      description: '',
      lat: '',
      lon: '',
      imageUrl: ''
    });
    setIsOpen(false);
  }

  function handleInputChange(e) {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  }

  if (!isOpen) {
    return (
      <div className="add-place-container">
        <button 
          className="add-place-button"
          onClick={() => setIsOpen(true)}
        >
          <span className="add-icon">+</span>
          <span>Add Custom Place</span>
        </button>
      </div>
    );
  }

  return (
    <div className="add-place-form-container">
      <form className="add-place-form" onSubmit={handleSubmit}>
        <div className="form-header">
          <h3>Add Custom Place</h3>
          <button 
            type="button" 
            className="close-button"
            onClick={() => setIsOpen(false)}
          >
            ×
          </button>
        </div>
        
        <div className="form-group">
          <label htmlFor="title">Place Name *</label>
          <input
            type="text"
            id="title"
            name="title"
            value={formData.title}
            onChange={handleInputChange}
            required
            placeholder="Enter place name"
          />
        </div>

        <div className="form-group">
          <label htmlFor="description">Description</label>
          <textarea
            id="description"
            name="description"
            value={formData.description}
            onChange={handleInputChange}
            placeholder="Describe this place..."
            rows="3"
          />
        </div>

        <div className="form-row">
          <div className="form-group">
            <label htmlFor="lat">Latitude</label>
            <input
              type="number"
              id="lat"
              name="lat"
              value={formData.lat}
              onChange={handleInputChange}
              placeholder="0.0000"
              step="any"
            />
          </div>

          <div className="form-group">
            <label htmlFor="lon">Longitude</label>
            <input
              type="number"
              id="lon"
              name="lon"
              value={formData.lon}
              onChange={handleInputChange}
              placeholder="0.0000"
              step="any"
            />
          </div>
        </div>

        <div className="form-group">
          <label htmlFor="imageUrl">Image URL (optional)</label>
          <input
            type="url"
            id="imageUrl"
            name="imageUrl"
            value={formData.imageUrl}
            onChange={handleInputChange}
            placeholder="https://example.com/image.jpg"
          />
        </div>

        <div className="form-actions">
          <button 
            type="button" 
            className="cancel-button"
            onClick={() => setIsOpen(false)}
          >
            Cancel
          </button>
          <button type="submit" className="submit-button">
            Add Place
          </button>
        </div>
      </form>
    </div>
  );
} 
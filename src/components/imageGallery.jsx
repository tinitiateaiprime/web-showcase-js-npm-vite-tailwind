import React from 'react';
import { loadImages } from '../utils/loadImages';

const ImageGallery = () => {
  const images = loadImages();

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <h1 className="text-3xl font-bold text-center mb-8">Image Gallery (100+ Cards)</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {images.map((src, index) => (
          <div key={index} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300">
            <img src={src} alt={`Image ${index}`} className="w-full h-48 object-cover" loading="lazy" />
            <div className="p-4">
              <h2 className="text-lg font-semibold mb-1">Card #{index + 1}</h2>
              <p className="text-gray-600 text-sm">This is image {index + 1}.</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ImageGallery;

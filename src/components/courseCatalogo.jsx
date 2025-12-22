import React from 'react';

const courseList = new Array(100).fill(0).map((_, index) => ({
  id: index + 1,
  title: `Course ${index + 1}`,
}));

const images = ['image1.png', 'image2.png', 'image3.png', 'image4.png'];

const CourseCatalog = () => {
  return (
    <div className="container mt-4">
      <div className="row">
        {courseList.map((course, index) => {
          const imageIndex = index % images.length;
          const imagePath = `/assets/${images[imageIndex]}`;

          return (
            <div className="col-md-3 mb-4" key={course.id}>
              <div className="card h-100">
                <img
                  src={imagePath}
                  className="card-img-top"
                  alt={`Course ${course.id}`}
                />
                <div className="card-body">
                  <h5 className="card-title">{course.title}</h5>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default CourseCatalog;

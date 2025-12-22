
import image1 from '../assets/images/image1.jpg';
import image2 from '../assets/images/image2.jpg';
import image3 from '../assets/images/image3.jpg';
import image4 from '../assets/images/image4.jpg';

// List of all images to assign to products
const images = [image1, image2, image3, image4];

const searchData = {
  products: Array.from({ length: 100 }, (_, i) => ({
    id: i + 1,
    name: `Product ${i + 1}`,
    description: `This is product ${i + 1}, a high-quality item.`,
    price: `$${(Math.random() * 100).toFixed(2)}`,
    image: images[i % images.length], // Dynamically pick an image from the images array
  })),
};

export default searchData;

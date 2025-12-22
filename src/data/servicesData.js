const servicesData = {
    services: Array.from({ length: 50 }, (_, i) => ({
      id: i + 1,
      service_name: `Service ${i + 1}`,
      category: `Category ${Math.ceil((i + 1) / 10)}`, // Groups of 10
      price: `$${(Math.random() * 200).toFixed(2)}`,
      image_path: `https://picsum.photos/seed/service${i + 1}/150/100`, // Random images
      description: `This is an excellent service for task ${i + 1}, providing high-quality results.`,
    })),
  };
  
  export default servicesData;
  

export const loadImages = () => {
    const modules = import.meta.glob('../assets/images/*.{jpg,jpeg,png,gif}', {
      eager: true,
      import: 'default',
    });
  
    return Object.values(modules);
  };
  
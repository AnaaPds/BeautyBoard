const localStorageService = {
    getProducts: () => {
      const savedProducts = localStorage.getItem("products");
      return savedProducts ? JSON.parse(savedProducts) : [];
    },
  
    saveProducts: (products) => {
      localStorage.setItem("products", JSON.stringify(products));
    },
  };
  
  export default localStorageService;
  
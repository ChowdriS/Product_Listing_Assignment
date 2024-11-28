const BASE_URL = 'https://dummyjson.com';

export const fetchCategories = async () => {
  try {
    const response = await fetch(`${BASE_URL}/products/categories`);
    const data = await response.json();
    
    console.log('Fetched Categories:', data);
  
    return data.map(item => 
      typeof item === 'object' 
        ? (item.name || item.slug || JSON.stringify(item)) 
        : item
    );
  } catch (error) {
    console.error('Failed to fetch categories:', error);
    return [];
  }
};

export const fetchProducts = async (params = {}) => {
  const { 
    category = '', 
    search = '', 
    limit = 10, 
    skip = 0 
  } = params;

  console.log('Fetch Products Params:', { category, search, limit, skip });

  let url = `${BASE_URL}/products`;

  if (category) {
    url = `${BASE_URL}/products/category/${category}`;
  }

  const queryParams = new URLSearchParams({
    limit,
    skip,
    ...(search ? { q: search } : {})
  });

  url += `?${queryParams}`;

  try {
    const response = await fetch(url);
    const data = await response.json();
    
    console.log('Fetched Products:', data);
    
    return data;
  } catch (error) {
    console.error('Failed to fetch products:', error);
    return { products: [], total: 0 };
  }
};
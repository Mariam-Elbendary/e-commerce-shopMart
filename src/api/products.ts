import { Category, productType, Subcategory } from "@/interfaces/productType";

export async function getAllProducts(
  keyword?: string,
  category?: string,
  price?: string
): Promise<productType[] | null> {
  try {
    let url = "https://ecommerce.routemisr.com/api/v1/products?";

    if (keyword) {
      url += `keyword=${encodeURIComponent(keyword)}&`;
    }

    if (category) {
      url += `category=${category}&`;
    }

    if (price) {
      url += `price=${price}`;
    }

    const response = await fetch(url);

    if (!response.ok) throw new Error("api error");

    const payload = await response.json();

    return payload.data;
  } catch {
    throw new Error("api error");
  }
}

export async function getProductDetails(id:string) :Promise<productType | null> {
    try {
        const response = await fetch(`https://ecommerce.routemisr.com/api/v1/products/${id}`);
          if(!response.ok) throw new Error("api error")
        const payload = await response.json();
        return payload.data;

    } catch {
        throw new Error("api error")
    
    }

}
    


export async function getProductsBySubCategory(
  subCategoryId: string
): Promise<productType[] | null> {
  try {
    const response = await fetch(
      "https://ecommerce.routemisr.com/api/v1/products"
    );

    if (!response.ok) throw new Error("api error");

    const payload = await response.json();

    const products = payload.data.filter((product: productType) =>
      product.subcategory?.some(
        (subCategory) => subCategory._id === subCategoryId
      )
    );
    return products;
  } catch {
    throw new Error("api error");
  }
}




export async function getCategories() :Promise<Category[] | null> {
    try {
        const response = await fetch(`https://ecommerce.routemisr.com/api/v1/categories`);
          if(!response.ok) throw new Error("api error")
        const payload = await response.json();
        return payload.data;

    } catch {
        throw new Error("api error")
        
    }
    
}


export async function getSpecificCategory(id: string) :Promise<Category | null> {
    try {
        const response = await fetch(`https://ecommerce.routemisr.com/api/v1/categories/${id}`);
          if(!response.ok) throw new Error("api error")
        const payload = await response.json();
        return payload.data;

    } catch {
        throw new Error("api error")
        
    }
    
}




export async function getAllSubCategoriesOnCategory(
  id: string
): Promise<Subcategory[] | null> {
  try {
    const response = await fetch(
      "https://ecommerce.routemisr.com/api/v1/subcategories"
    );

    if (!response.ok) throw new Error("api error");

    const payload = await response.json();

    const subCategories = payload.data.filter(
      (subCategory: Subcategory) => subCategory.category === id
    );

    return subCategories;
  } catch {
    throw new Error("api error");
  }
}



export async function getSpecificSubCategory(id:string) :Promise<Subcategory | null> {
    try {
        const response = await fetch(`https://ecommerce.routemisr.com/api/v1/subcategories/${id}`);
          if(!response.ok) throw new Error("api error")
        const payload = await response.json();
        return payload.data;

    } catch {
        throw new Error("api error")
       
    }
    
}

export async function getProductsForShop(
  keyword?: string,
  category?: string,
  price?: string,
  page?: string
) {
  try {
    let url = "https://ecommerce.routemisr.com/api/v1/products?";

    if (category) url += `category=${category}&`;
    if (price) url += `price=${price}&`;

    const response = await fetch(url);

    if (!response.ok) {
      throw new Error("api error");
    }
    const payload = await response.json();

    if (!keyword) {
      return payload;
    }
    const searchKeyword = keyword.toLowerCase();
    const filteredProducts = payload.data.filter((product: productType) => {
      return (
        product.title?.toLowerCase().includes(searchKeyword) ||
        product.brand?.name?.toLowerCase().includes(searchKeyword) ||
        product.category?.name?.toLowerCase().includes(searchKeyword)
      );
    });

    return {
      ...payload,
      results: filteredProducts.length,
      data: filteredProducts,
    };
  } catch {
    throw new Error("api error");
  }
}
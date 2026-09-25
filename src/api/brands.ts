import { Brand, productType } from "@/interfaces/productType";

export async function getAllBrands() :Promise<Brand[] | null> {
    try {
        const response = await fetch(`https://ecommerce.routemisr.com/api/v1/brands`);
          if(!response.ok) throw new Error("api error")
        const payload = await response.json();
        return payload.data;

    } catch {
        throw new Error("api error")
       
    }
    
}

export async function getSpecificBrand(id: string) :Promise<Brand | null> {
    try {
        const response = await fetch(`https://ecommerce.routemisr.com/api/v1/brands/${id}`);
          if(!response.ok) throw new Error("api error")
        const payload = await response.json();
        return payload.data;

    } catch {
        throw new Error("api error")
       
    }
    
}

export async function getProductsByBrand(
  brandId: string
): Promise<productType[] | null> {
  try {
    const response = await fetch(
      `https://ecommerce.routemisr.com/api/v1/products`
    );

    if (!response.ok) throw new Error("api error");

    const payload = await response.json();

    const products = payload.data.filter((product: productType) => {
      return product.brand?._id === brandId;
    });

    return products;
  } catch {
    throw new Error("api error");
  }
}
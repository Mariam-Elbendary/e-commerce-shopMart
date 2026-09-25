import img1 from '../../../assets/ss2.jpeg'
import img2 from '../../../assets/ss3.jpeg'
import img3 from '../../../assets/ss1.jpg'
import dynamic from "next/dynamic";
import { RiseLoader } from "react-spinners";
import Slider from '../_components/swiper/Slider';
import FeaturedProducts from '../_components/featuredProducts/FeaturedProducts';
import { getCategories, getProductsForShop } from '@/api/products';
import ShopFilter from '../_components/shopFilter/ShopFilter';
import PriceFilter from '../_components/PriceFilter/PriceFilter';
import Pagination from '../_components/pagination/Pagination';
  const ShopCategory = dynamic(() => import('../_components/shopCategory/ShopCategory'), {
    loading:()=> <div className="bg-gray-100 flex items-center justify-center"> <RiseLoader/> </div>
  } );

export default async function Shop({ searchParams }: { searchParams: Promise<{ keyword?: string; category? :string;  price? :string , page?: string }>}) {
const { keyword, category, price, page } = await searchParams;

const categories = await getCategories();

const response = await getProductsForShop(
  keyword,
  category,
  price,
  page
);

return (
    <>
    <Slider spaceBetween={0} slidesPerView={1} pageList={[img1.src , img2.src , img3.src]} />
   
      <ShopCategory />
      <ShopFilter categories={categories} />
      <PriceFilter />
{response.data && response.data.length > 0 ?
 ( <FeaturedProducts data={response.data} /> )
  : ( <div className="my-12 text-center">
     <h2 className="text-2xl font-semibold text-gray-800"> No products found </h2>
      <p className="mt-2 text-gray-500"> Try changing your filters or selecting another category
         </p>
          </div> )}
        <Pagination numberOfPages={response.metadata.numberOfPages} />
      </>
  )
}

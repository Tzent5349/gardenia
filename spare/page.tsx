import React from 'react';
import { getProductDetails } from '@/actions/get-products';
import { getColorDetails } from '@/actions/get-colors';
import Image from 'next/image';

type ProductDetailProps = {
  params: {
    productId: string;
  };
};

const Page = ({ params: { productId } }: ProductDetailProps) => {
  const fetchProductDetails = async (productId: string) => {
    try {
      const productDetails = await getProductDetails(productId);
      return productDetails;
    } catch (error) {
      console.error('Error fetching product details:', error);
      return null;
    }
  };

  const fetchColorDetails = async (colorId: string) => {
    try {
      const colorDetails = await getColorDetails(colorId);
      return colorDetails;
    } catch (error) {
      console.error('Error fetching color details:', error);
      return null;
    }
  };

  const renderProduct = async () => {
    const product = await fetchProductDetails(productId);
    if (!product) {
      return <div>Loading...</div>;
    }

    return (
      <div>
        <div>{product.name}</div>
        {product.ImgColorPrice.map(async (colors: any) => {
          const colorDetail = await fetchColorDetails(colors.color);
          if (!colorDetail) {
            return null;
          }
          return (
            <div key={colors.color}>
              <div style={{ backgroundColor: colorDetail.value }} className='w-6 h-6 p-3 border-4' />
              <div>{colorDetail.name}</div>
              <div>{colors.price}</div>
              <div>{colors.sizes}</div>
{/*               {console.log(colors.img.url)} */}
{/*               <Image src={colors.img.url}  alt='' width={100} height={100}/> */}
            {colors.img.map((img:any)=>{
              return(
                <img src={img.url} />
              )
            })}
            </div>
          );
        })}
      </div>
    );
  };

  return <div>{renderProduct()}</div>;
};

export default Page;

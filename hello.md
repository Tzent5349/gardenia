"use client";
import React, { useState } from "react";
import { Button } from "../ui/button";
import { Product } from "@/types/page";

type ProductDetailProps = {
  getDale: any;
  colorDetail: any;
};

const ProductDetails = ({ getDale, colorDetail }: ProductDetailProps) => {
  const [imageArr, setImageArr] = useState<[]>([]);
  const [setPap, setSetPap] = useState("")
  const [index, setIndex] = useState(0);
  const [imgIndex, setImgIndex] = useState(0);

  console.log(imageArr);

  return (
    <div className="productInfoWrapper  flex" key={getDale._id}>
      <div className="leftSideImageContainer">
{/*         {  imageArr.map((img) =>
          
        (
          <img src={img.url} alt="" key={img._id} />
        ))} */}
                <div className="flex flex-col gap-6">
          <div className="image-container">
            <img width={400} src={(imageArr.length &&imageArr[index].url)}  />
{/*         <img src={(imageArr.length && imageArr[0].url)} alt="" /> */}
          </div>
          <div className="small-images-container flex gap-4">
            {imageArr?.map((item, i) => (
              <img 
                key={i}
                src={(item.url)}
                width={100}
                className={i === index ? 'small-image selected-image' : 'small-image'}
                onMouseEnter={() => setIndex(i)}
                onClick={() => setIndex(i)}
              />
            ))}
          </div>
        </div>
      </div>
      <div className="rightSideInfoContainer bg-slate-300 z-20">
        <div className="colorButtonContainer">
          <Button
            size={"icon"}
            style={{ backgroundColor: colorDetail.value }}
            className="w-6 h-6 rounded-full "
            /* onClick={()=>{setImageArr(prod.img)}} */
            onClick={() => setImageArr(getDale.img)}
          ></Button>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;

<!-- 
        {/*         {product.ImgColorPrice.map(async (colors: any) => {
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
            {colors.img.map((img:any)=>{
              return(
                <img src={img.url} />
              )
            })}
            </div>
          );
        })} */}
 -->

<!-- 
{product.ImgColorPrice.map(async (prod: any) => {
          const colorDetail = await fetchColorDetails(prod.color);
          if (!colorDetail) {
            return null;
          }
          return (
            <div className="flex">
              <ProductDetails getDale={prod} product={product} colorDetail={colorDetail} />


{/*               <div style={{backgroundColor:colorDetail.value}} className="w-6 h-6 rounded-full" /> */}
            </div>
          );
        })}
 -->


 <!-- 
 "use client"
import React, { useState } from "react";
import { Button } from "../ui/button";
import { Product } from "@/types/page";
import { getColorDetails } from "@/actions/get-colors";

type ProductDetailProps = {

  product:Product
};

const ProductDetails = ({ product }: ProductDetailProps) => {

  const fetchColorDetails = async (colorId: string) => {
    try {
      const colorDetails = await getColorDetails(colorId);
      return colorDetails;
    } catch (error) {
      console.error("Error fetching color details:", error);
      return null;
    }
  };

  const [imageArr, setImageArr] = useState<[]>([]);
  const [setPap, setSetPap] = useState("")
  const [index, setIndex] = useState(0);
  const [imgIndex, setImgIndex] = useState(0);


  return (
    <div>
      {product.ImgColorPrice.map(async (item: any) => {
          const colorDetail = await fetchColorDetails(item.color);
          if (!colorDetail) {
            return null;
          }
          return (
            <div className="flex">
              <div className="imageContainer">
                {item.map((col)=>(
                  <Button
                  key={item._id}
                  onClick={()=>setIndex(item._id)}
                  >
                    <div style={{backgroundColor:col.value}} />
                  </Button>
                ))}
              </div>

              <div style={{backgroundColor:colorDetail.value}} className="w-6 h-6 rounded-full" />
            </div>
          );
        })}
    </div>
  );
};

export default ProductDetails;

  -->
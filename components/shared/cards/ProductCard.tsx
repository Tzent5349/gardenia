/* import { IEvent } from '@/lib/database/models/event.model' */
import { Product } from "@/types/page";
/* import { formatDateTime } from '@/lib/utils' */
/* import { auth } from '@clerk/nextjs' */
import Image from "next/image";
import Link from "next/link";
import React from "react";
/* import { DeleteConfirmation } from './DeleteConfirmation' */

type ProductCardProps = {
  product: Product;
};

const ProductCard = ({ product }: ProductCardProps) => {

  return (
    <Link href={`/product/${product._id}/`} className=" my-4 items-stretch flex flex-col w-72 rounded-xl overflow-hidden hover:scale-105 hover:shadow-sm hover:shadow-violet-900" key={product._id}>
    <div className=" ">
      <div className="imageContainer flex item-center justify-center w-72 h-96 rounded-xl overflow-hidden">
        <img src={product.img} alt={product.name} width={300} height={100} className="aspect-[3/100] object-fill" />
      </div>
      <div className="detailsContainer flex flex-col p-4">
        <h1 className="text- font-medium text-xl">{product.name}</h1>
        <h1>€ {product.price}</h1>
{/* bg-[#2C3A4F] */}
      </div>
    </div>
    </Link>
  );
};

export default ProductCard;

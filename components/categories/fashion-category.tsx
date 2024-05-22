

import {getCategories} from "@/actions/get-categories";

import { MoveRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";
import { Category } from "@/types/page";

const FashionCategory = async () => {

  const category = await getCategories();

  function generateProductUrl(category:Category) {
    const categoryNameSlug = category.name.toLowerCase().replace(/[^a-z0-9]+/g, '-')
    return `/shop/category/${categoryNameSlug}`
  }
  return (
    <div className=" flex flex-col md:flex-row flex-warp mt-10 gap-8 w-full px-4 md:px-14 text-white ">
      {category.length &&
        category.map(
          (cato) =>
            cato.status === "Show" && (
              <div className="flex bg-[#2C3A4F] w-full py-6 " key={cato._id}>
                <div className="left flex pl-6  flex-col items-start">
                  <p className="text-4xl font-normal">{cato.name}</p>
                  <Link href={generateProductUrl(cato)}>
                  <Button
                  className="bg-transparent text-base font-normal text-primary border border-[#e6e6e6] rounded-none mt-auto flex items-center gap-4">
                    Shop Now
                    <MoveRight />
                  </Button>
                  </Link>

                </div>
                <div className="right ml-auto flex ">
                    <Image src={cato.img} alt={`cato.name + img`} width={98} height={98}  className="object-cover"/>
                </div>
              </div>
            )
        )}
    </div>
  );
};
export default FashionCategory;

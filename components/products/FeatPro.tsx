"use client"
import {useGetProductTypeQuery, useGetTopRatedProductsQuery } from '@/lib/redux/features/productApi';

const FeatPro = () =>{
    const { data: products, isError, isLoading } =
    useGetProductTypeQuery({ type: 'adsf',query: `featured=true` });
    return(
        <div className="">
            {products.data.map((item:any)=>{
                const {_id, img, name, price, discount, reviews } = item || {};
                return (
                    <div className="">
                        {item.name}
                    </div>
                )
            })}
        </div>
    )
}
export default FeatPro;
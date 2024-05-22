import React, { useEffect } from 'react'
import ProductCard from '../shared/cards/ProductCard'

type similarProductProps = {
  similarProduct? :any
}

const SimilarProduct = ({similarProduct}:similarProductProps) => {

  return (
    <div className='flex h-full items-center justify-center px-4 md:px-14 w-screen'>
      <div className=" flex w-2/3 gap-14 flex-1 h-fit flex-wrap justify-center">
      {similarProduct?.map((product:any)=>(
        <ProductCard product={product} key={product._id} />

      ))}
      </div>
    </div>
  )
}

export default SimilarProduct
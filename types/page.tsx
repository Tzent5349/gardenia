export interface Brand {
    _id: string;
    logo: string;
    name: string;
    description: string;
    createdAt: Date;
}

export interface Category {
    _id:string;
    name:string;
    img:string;
    parent:string;
    children: string[];
    productType:string;
    description:string;
    createdAt:Date;
    status: string;
/*     products:[] */
    
}

export interface Color {
    _id: string;
    name: string;
    value: string;
    createdAt: Date;

}

export interface Gender {
    __id: string;
    name: string;
}

export interface Product{

    _id: string;
    sku: string;
    img: string;
    name: string;
    price:number;
    unit: number;
    gender:Gender,
    ImgColorPrice: {
        color: Color;
        img: {
            url:string
        }[];
/*         sizes:{
            availableSize: string;
        }[]; */
/*         sizes:string[] */
        sizes:[]
        price:number;
        stock:number;
    }[],
    parent: string;
    children: string;
/*     discount: number; */
    quantity: number;
    brand:Brand;
    category:Category;
    status:string;
    reviews:[]
    productType:string;
    description:string;
    featured:boolean;
/*     offerDate:{startDate:Date, endDate:Date} */
    createdAt:Date
}

export interface Size {
    _id:string;
    gender:string
    value:{
        _id:string;
        footLength:string;
        EU:string;
        UK:string;
        US:string;
    }[]
    createdAt:Date;
}

// ====== URL QUERY PARAMS
export type UrlQueryParams = {
    params: string
    key: string
    value: string | null
  }
  
  export type RemoveUrlQueryParams = {
    params: string
    keysToRemove: string[]
  }
  
  export type SearchParamProps = {
    params: { _id: string }
    searchParams: { [key: string]: string | string[] | undefined }
  }
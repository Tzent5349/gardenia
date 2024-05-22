import { Skeleton } from "@/components/ui/skeleton";
import React from "react";

const Loading = () => {
  return (
    <div className="productInfoWrapper flex flex-col w-full justify-center items-center h-screen px-4 md:px-0">
      <div className="productInfo flex w-full flex-col md:flex-row py-8 gap-8 h-full">
        <div className="LeftImageContainer flex flex-col w-full h-full md:items-end">
          <div className="BigImageContainer flex flex-col gap-4">
            <Skeleton className="h-96 w-[320px]" />

            <div className="smallImagesContainer align-top flex gap-4">
              <Skeleton className="h-20 w-[60px] rounded-md" />
              <Skeleton className="h-20 w-[60px] rounded-md" />
              <Skeleton className="h-20 w-[60px] rounded-md" />
              <Skeleton className="h-20 w-[60px] rounded-md" />
            </div>
          </div>
        </div>
        <div className="RightProductNameAndDeailContainer flex w-full h-full flex-col gap-4 ">
          <Skeleton className="h-8 w-[200px] rounded-md" />
          <Skeleton className="h-6 w-[180px] rounded-md" />

          <Skeleton className="h-6 w-[80px] rounded-md" />

          <Skeleton className="h-16 w-[280px] rounded-md" />
          <div className="flex gap-4">
            <Skeleton className="h-7 w-7 rounded-full" />
            <Skeleton className="h-7 w-7 rounded-full" />
            <Skeleton className="h-7 w-7 rounded-full" />
            <Skeleton className="h-7 w-7 rounded-full" />
          </div>

          <Skeleton className="h-6 w-[280px] rounded-md" />

          <div className="flex gap-2 flex-col">
            <div className="flex gap-8">
              <Skeleton className="h-3 w-[40px]" />
              <Skeleton className="h-3 w-[40px]" />
              <Skeleton className="h-3 w-[40px]" />
              <Skeleton className="h-3 w-[40px]" />
            </div>
            <div className=" flex gap-4">
              <Skeleton className="h-10 w-10 rounded-md" />
              <Skeleton className="h-10 w-10 rounded-md" />
              <Skeleton className="h-10 w-10 rounded-md" />
              <Skeleton className="h-10 w-10 rounded-md" />
              <Skeleton className="h-10 w-10 rounded-md" />
              <Skeleton className="h-10 w-10 rounded-md" />

            </div>
          </div>

            <div className="flex gap-4 w-full">

        <Skeleton className="h-10 w-[280px] rounded-md" />
        <Skeleton className="h-10 w-[40px] rounded-md" />

            </div>

        </div>
      </div>
    </div>
  );
};

export default Loading;

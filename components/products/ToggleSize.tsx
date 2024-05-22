"use client";
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";

type SizeToggleProps = {
  value?: string;
  availableSizes:
    | { _id: string; footLength: string; EU: string; UK: string; US: string }[]
    | undefined;
  onChangeHandler?: (value: string) => void;
};

const ToggleSize = ({
  availableSizes,
  onChangeHandler,
  value,
}: SizeToggleProps) => {
  const [showValueFor, setShowValueFor] = useState("EU");

/*   console.log("hi" + availableSizes) */
  return (
    <div className="flex flex-col w-full">
      <div className="flex  gap-4 ">
        <Button
          variant="link"
          type="button"
          className={
            showValueFor === "footLength" ? "underline text-red-400" : ""
          }
          onClick={() => setShowValueFor(`footLength`)}
        >
          Foot Length
        </Button>
        <Button
          variant="link"
          type="button"
          className={showValueFor === "EU" ? "underline text-red-400" : ""}
          onClick={() => setShowValueFor(`EU`)}
        >
          EU
        </Button>
        <Button
          variant="link"
          type="button"
          className={showValueFor === "US" ? "underline text-red-400" : ""}
          onClick={() => setShowValueFor(`US`)}
        >
          US
        </Button>
        <Button
          variant="link"
          type="button"
          className={showValueFor === "UK" ? "underline text-red-400" : ""}
          onClick={() => setShowValueFor(`UK`)}
        >
          UK
        </Button>
      </div>
      <div className=" flex w-[90%] ">
        <ToggleGroup
          variant="outline"
          type="single"
          onValueChange={onChangeHandler}
          defaultValue={value}
          className="flex flex-wrap items-start"
        >
          {availableSizes?.map((size: any, idx: number) => (
            <ToggleGroupItem value={size._id} key={idx}>
              <div className="flex w-6 items-center  justify-center">
                {showValueFor === "EU" && <h1 className="">{size.EU}</h1>}
                {showValueFor === "US" && <h1 className="">{size.US}</h1>}
                {showValueFor === "UK" && <h1 className="">{size.UK}</h1>}
                {showValueFor === "footLength" && <h1>{size.footLength}</h1>}
              </div>
            </ToggleGroupItem>
          ))}
        </ToggleGroup>
      </div>
    </div>
  );
};

export default ToggleSize;

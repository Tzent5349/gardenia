"use client";

import * as React from "react";

import Portugal from "@/public/assets/language/portugal.png";
import Germany from "@/public/assets/language/germany.png";
import Spain from "@/public/assets/language/spain.png";
import English from "@/public/assets/language/united-kingdom.png";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import Image from "next/image";

export function LanguageToggle() {
  const [language, setLanguage] = React.useState("Portugese");

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button size="icon" variant={"link"} className="">
          <Image
            src={Germany}
            alt="gemany"
            className={
              language === "Deutsch"
                ? "absolute h-[1.2rem] w-[1.2rem] "
                : "hidden"
            }
          />
          <Image
            src={Portugal}
            alt="portugese"
            className={
              language === "Portugese"
                ? "absolute h-[1.2rem] w-[1.2rem] "
                : "hidden"
            }
          />
          <Image
            src={Spain}
            alt="spanish"
            className={
              language === "Spanish"
                ? "absolute h-[1.2rem] w-[1.2rem] "
                : "hidden"
            }
          />
          <Image
            src={English}
            alt="English"
            className={
              language === "English"
                ? "absolute h-[1.2rem] w-[1.2rem]  "
                : "hidden"
            }
          />

          <span className="sr-only">Toggle Language</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem onClick={() => setLanguage("Portugese")}>
          <span className="flex items-center gap-2">
            <Image src={Portugal} alt="portugese" />
            Portugal
          </span>
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => setLanguage("English")}>
          <span className="flex items-center gap-2">
            <Image src={English} alt="English" width={20} />
            English
          </span>
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => setLanguage("Deutsch")}>
          <span className="flex items-center gap-2">
            <Image src={Germany} alt="gemany"  width={20}/>
            Deutsch
          </span>
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => setLanguage("Spanish")}>
          <span className="flex items-center gap-2">
            <Image src={Spain} alt="spanish" width={20} />
            Spanish
          </span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

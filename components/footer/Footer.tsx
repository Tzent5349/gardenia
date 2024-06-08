import React from "react";
import BigLogo from "@/public/assets/logo/big.svg";
import Image from "next/image";
import { cn } from "@/lib/utils";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Copyright,
  Facebook,
  Instagram,
  Mail,
  MoveRight,
  Twitter,
} from "lucide-react";
import Link from "next/link";
import { Separator } from "../ui/separator";

const Footer = () => {
  return (
    <div className="footerContainer pt-14 border-t mt-10  md:px-14">
      <div className="footer flex flex-col justify-center items-center md:items-center md:flex-row gap-10 md:gap-4 w-full">
        <div className="leftBigLogoContainer flex flex-col w-full md:w-1/3 gap-4">
          <Image
            src={BigLogo}
            alt="Logo"
            width={200}
            height={100}
            className={cn("dark:invert")}
          />
          <h1 className="text-xl font-medium">
            "GARDENIA - Portuguese brand and Lisbon fashion icon since 1988"
          </h1>
        </div>
        <div className="middleLinksContainer w-full md:w-1/3 flex flex-col">
          <h1 className="font-medium text-2xl underline  underline-offset-2 mb-4">
            Links
          </h1>
          <div className="links flex flex-col justify-center gap-3">
            <Link href={"/"} className="text-xl font-medium hover:underline">
              {" "}
              Home{" "}
            </Link>
            <Link href={"/"} className="text-xl font-medium hover:underline">
              Categories
            </Link>
            <Link href={"/"} className="text-xl font-medium hover:underline">
              Brands
            </Link>
            <Link href={"/"} className="text-xl font-medium hover:underline">
              Accessories
            </Link>
            <Link href={"/"} className="text-xl font-medium hover:underline">
              Contact Us
            </Link>
          </div>
        </div>
        <div className="rightNewsLetterContainter w-full md:w-1/3 flex flex-col gap-4   ml-auto">
          <div className="socialMedia">
            <h1 className="font-bold  text-xl">Get in touch</h1>
            <div className="socialIcons w-fit flex gap-4 items-center mt-2 ">
              <Link href={"/"}>
                <Instagram />
              </Link>
              <Link href={"/"}>
                <Facebook />
              </Link>{" "}
              <Link href={"/"}>
                <Twitter />
              </Link>
            </div>
          </div>
          <h1 className="text-xl  tracking-widest flex mt-4 ">Newsletter</h1>
          <form action="/" method="post  " className="flex gap-4 flex-col -mt-2">
            <div className=" flex items-center border-b border-b-primary w-fit gap-4 pb-2 ">
              <Mail className="text-xl" />
              <input
                type="email"
                name="/"
                id="/"
                placeholder="ENTER YOUR EMAIL ADDRESS"
                className="outline-none bg-transparent text-coloc5 placeholder:text-coloc2 w-60"
              />
              <button type="submit">
                <MoveRight className="text-xl" />
              </button>
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox id="terms" />
              <label
                htmlFor="terms"
                className="text-sm font-normal leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              >
                Accept terms and conditions
              </label>
            </div>
          </form>
        </div>
      </div>
      <Separator className=" my-4" />
      <div className="div flex w-full items-center justify-center mb-4 gap-2">
        ||
        <Copyright className="w-4" />
        <p>2024 LaGasy | All right reserved ||</p>
      </div>
    </div>
  );
};

export default Footer;

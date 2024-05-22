import { ThemeToggle } from "@/components/theme-toggle";
import { PhoneCall, Truck } from "lucide-react";
import { LanguageToggle } from "@/components/language-toggle";
import { Separator } from "@/components/ui/separator";

export function TopNavbar() {
  return (
    <div className="flex w-full items-center py-1">
      <div className=" flex items-center pl-9 space-x-4">
        <div className="phone flex items-center gap-2">
          <PhoneCall className="w-5 h-4" />
          <p>(+351) 911 932 752</p>
        </div>
        <Separator orientation="vertical" />
        <div className="deliver flex items-center gap-2">
          <Truck className="w-5 h-6" />
          <p>Free Shipping</p>
        </div>
      </div>
      <div className=" flex items-center ml-auto"></div>
      <div className="flex items-center  ml-auto">
        <LanguageToggle />
        <ThemeToggle />
      </div>
    </div>
  );
}

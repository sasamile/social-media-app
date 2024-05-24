import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { MainProps } from "@/schemas";
import SidebarMovile from "./sidebarMovile";
import { Menu } from "lucide-react";

const MainSeccion = ({ children, title }: MainProps) => {
  return (
    <div className="border-x borderColor">
      <div className="sticky top-0 z-10 px-4 bg-white/80 backdrop-blur-md dark:bg-transparent">
        <div className="flex  justify-between items-center py-3">
          <h2 className="text-xl font-bold text-gray-800 dark:text-gray-100 ">
            {title}
          </h2>
          <div className="flex md:hidden ">
            <Sheet>
              <SheetTrigger>
                <Menu />
              </SheetTrigger>
              <SheetContent>
                <SidebarMovile />
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
      <div>
        <div>{children}</div>
      </div>
    </div>
  );
};

export default MainSeccion;

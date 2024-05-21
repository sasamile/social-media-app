import { MainProps } from "@/schemas";

const MainSeccion = ({ children, title, }: MainProps) => {
  return (
    <div className="border-x borderColor">
      <div className="sticky top-0 z-10 px-4 bg-white/80 backdrop-blur-md dark:bg-transparent">
        <h2 className="text-xl font-bold text-gray-800 dark:text-gray-100 pt-3">
          {title}
        </h2>
      </div>
      <div>
        <div>{children}</div>
      </div>
    </div>
  );
};

export default MainSeccion;


import { MainProps } from "@/schemas";


const MainSeccion = ({ children, title, loading }: MainProps) => {
  return (
    <div className="border-x borderColor">
      <div className="sticky top-0 px-4 bg-white/80 backdrop-blur-md dark:bg-dim-900/80">
        <h2 className="text-xl font-bold text-gray-800 dark:text-gray-100 pt-3">
          {title}
        </h2>
      </div>
      <div>
        <div>
          {loading ? (
            <div className="flex items-center justify-center p-4 border-b border borderColor">
              <svg
                className="w-8 h-8 mr-3 -ml-1 text-blue-400 animate-spin"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle
                  className="opacity-10"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  stroke-width="4"
                ></circle>
                <path
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                ></path>
              </svg>
            </div>
          ) : (
            children
          )}
        </div>
      </div>
    </div>
  );
};

export default MainSeccion;

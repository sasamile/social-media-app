function Items({ children }: { children?: React.ReactNode }) {
  return (
    <div className="p-3 hover:bg-gray-100 dark:hover:bg-dim-300 transition duration-300 ease-in-out border border-b border-gray-200 dark:border-gray-700 ">
      {children}
    </div>
  );
}

export default Items;

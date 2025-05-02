
const Header = () => {

  return (
    <main className="header sticky top-0 left-0 right-0 z-20 flex justify-between items-center text-[#434343] px-6 py-4 bg-white border-b border-gray-200">
      <div className="flex flex-low justify-center items-center" >
        <img src="/logo.png" className="w-12" alt="logo" />
        <h1 className="header-title font-Mon text-2xl font-bold">PennyWise</h1>
      </div>
    </main>
  );
};

export default Header;

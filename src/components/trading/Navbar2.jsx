import { Search, User, X } from "lucide-react";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { setShowModal, setSearchTerm } from "../../redux/slice/chartHomeApiSlice";

export function Navbar2() {
  const dispatch = useDispatch();
  const showModal = useSelector((state) => state.chartHomeApiData.showModal);

  return (
    <nav className="fixed top-0 left-0 right-0 flex items-center justify-between px-4 py-2 bg-white border-b z-10 h-14">
      {/* Left Section */}
      {!showModal && <div className="flex items-center gap-4 font-bold text-2xl">
        <p>Diamond-Rock</p>
      </div>}

      {/* Center Section */}
      <div className="flex items-center w-fit-content mx-auto gap-5">
        <div className="relative" onClick={() => { if (!showModal){dispatch(setShowModal(true))} }}
          style={{ width: showModal? "55vw" : "13.5vw" }}
        >
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2" size={20} strokeWidth={1.5}/>
          <input
            type="search"
            className="pl-10 h-9 rounded-full
            focus:outline-none bg-[#f1f1f1] placeholder-[#333]"
            placeholder="Search"
            onChange={(e) => dispatch(setSearchTerm(e.target.value))}
            style={{ width: showModal? "55vw" : "13.5vw" }}
          />
          {showModal && 
          <button
            onClick={() => dispatch(setShowModal(false))}
            className="p-1 rounded-full hover:bg-[#c5c3c3] absolute right-3 top-1/2 transform -translate-y-1/2"
          >
            <X size={20} strokeWidth={1.5}/>
          </button>}
        </div>
        {!showModal && <Link to="/marketHome" className="px-4 py-2 rounded-full hover:bg-[#f1f1f1]">
          Markets
        </Link>}
        {!showModal && <Link to="/stock/diamond-report" className="px-4 py-2 rounded-full hover:bg-[#f1f1f1]">
          Analytics
        </Link>}
        {!showModal && <Link to="/chartHome" className="px-4 py-2 rounded-full hover:bg-[#f1f1f1]">
          Supercharts
        </Link>}
        {!showModal && <Link to="/stock/prices" className="px-4 py-2 rounded-full hover:bg-[#f1f1f1]">
          Pricing
        </Link>}
      </div>

      {/* Right Section */}
      {!showModal && <div className="flex items-center gap-2 md:gap-4">
         <User className="h-7 w-7 rounded-lg text-gray-600 cursor-pointer" />
         <button className="py-2 px-4 bg-gradient-to-bl from-violet-500 to-fuchsia-500 text-white rounded-md">Get Started</button>
      </div>}
    </nav>
  );
}
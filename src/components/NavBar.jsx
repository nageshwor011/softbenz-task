import { Link } from "react-router-dom";
import ThemeToggle from "./ThemeToggle";
import { IoMdArrowBack } from "react-icons/io";
export default function NavBar({ isHomePage }) {
  const displayTitle = () => {
    if (isHomePage) {
      return (
        <h2 className="text-xl font-semibold text-white dark:text-white">
          Products
        </h2>
      );
    }
    return (
      <h2 className="text-md text-white">
        <Link to={"/"}>
          <div className="flex justify-center items-center">
            <IoMdArrowBack className="me-1" />
            Back to list
          </div>
        </Link>
      </h2>
    );
  };
  return (
    <nav className="bg-orange-500 rounded-lg p-2 px-3 mb-4">
      <div className="flex justify-between">
        {displayTitle()}
        <span>
          <ThemeToggle />
        </span>
      </div>
    </nav>
  );
}

import { FaGithub, FaLinkedin } from "react-icons/fa";
import { GiHamburgerMenu } from "react-icons/gi";
import { Link } from "react-router-dom";

const Header = (props: {
  sidebarOpen: string | boolean | undefined;
  setSidebarOpen: (arg0: boolean) => void;
}) => {
  return (
    <header className="sticky top-0 z-30 flex w-full backdrop-blur-sm">
      <div className="flex flex-grow items-center justify-between px-4 py-4 shadow-2 md:px-6 2xl:px-11">
        <div className="flex items-center justify-between w-full lg:hidden">
          <button
            onClick={() => {
              props.setSidebarOpen(!props.sidebarOpen);
            }}
            className="z-50 block rounded-sm border border-stroke bg-white p-1.5 shadow-sm"
          >
            <GiHamburgerMenu className="text-black" />
          </button>

          <span className="text-white text-xl">Assignment</span>

          <div className="flex justify-center items-center gap-2">
            <Link
              to="https://github.com/bisht-xp/frontend-dashboard"
              target="_blank"
            >
              <FaGithub size={25} className="text-white" />
            </Link>
            <Link to="https://www.linkedin.com/in/bishtkamal/" target="_blank">
              <FaLinkedin size={25} className="text-white" />
            </Link>
          </div>
        </div>

        <div className="w-full hidden lg:block">
          <div className="flex items-center justify-between w-full">
            <div className="flex-grow flex justify-between items-center">
              <span className="text-white text-3xl">Assignment</span>
              <div className="flex justify-center items-center gap-4">
                <Link
                  to="https://github.com/bisht-xp/frontend-dashboard"
                  target="_blank"
                >
                  <FaGithub size={30} className="text-white" />
                </Link>
                <Link
                  to="https://www.linkedin.com/in/bishtkamal/"
                  target="_blank"
                >
                  <FaLinkedin size={30} className="text-white" />
                </Link>
              </div>
            </div>

            <div className="w-10"></div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;

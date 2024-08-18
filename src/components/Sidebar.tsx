import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { IoIosContact } from "react-icons/io";
import { FaMap } from "react-icons/fa";
import { GiCancel } from "react-icons/gi";
import ClickOutside from "./ClickOutside";
import { IoBarChartSharp } from "react-icons/io5";

interface SidebarProps {
  sidebarOpen: boolean;
  setSidebarOpen: (arg: boolean) => void;
}

interface MenuItem {
  icon: React.ReactNode;
  label: string;
  route: string;
  children?: MenuItem[];
}

const menuGroups = [
  {
    name: "Sidebar",
    menuItems: [
      {
        icon: <IoIosContact size={25} />,
        label: "Contacts  ",
        route: "/",
      },
      {
        icon: <FaMap size={25} />,
        label: "Maps",
        route: "/maps",
      },
      {
        icon: <IoBarChartSharp size={25} />,
        label: "Chats",
        route: "/charts",
      },
    ],
  },
];

const SidebarItem: React.FC<{
  item: MenuItem;
  activePath: string;
  setActivePath: (path: string) => void;
}> = ({ item, activePath, setActivePath }) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleClick = () => {
    if (item.children) {
      setIsOpen(!isOpen);
    } else {
      setActivePath(item.route);
    }
  };

  const isActive = (itemRoute: string) => {
    return (
      itemRoute === activePath ||
      (item.children &&
        item.children.some((child) => child.route === activePath))
    );
  };

  return (
    <li>
      <Link
        to={item.route}
        onClick={handleClick}
        className={`${
          isActive(item.route) ? "bg-gray-900" : ""
        } relative flex items-center gap-3 rounded-lg px-4 py-2 font-medium text-white duration-300 ease-in-out hover:bg-gray-900`}
      >
        {item.icon}
        {item.label}
      </Link>
    </li>
  );
};

const Sidebar: React.FC<SidebarProps> = ({ sidebarOpen, setSidebarOpen }) => {
  const location = useLocation();
  const [activePath, setActivePath] = useState(location.pathname);

  return (
    <ClickOutside onClick={() => setSidebarOpen(false)}>
      <aside
        className={`fixed left-0 top-0 lg:top-[62px] z-40 lg:z-10 flex h-screen w-72 flex-col overflow-y-hidden bg-[#02090E] duration-300 ease-linear lg:translate-x-0 ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex items-center justify-between gap-2 px-6 py-6 lg:py-7 lg:hidden">
          <p className="text-white text-3xl ">Assignment</p>
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="block lg:hidden"
          >
            <GiCancel size={25} className="text-white" />
          </button>
        </div>

        <div className="no-scrollbar flex flex-col overflow-y-auto duration-300 ease-linear">
          <nav className="mt-5 px-4 py-4 lg:mt-9 lg:px-6">
            {menuGroups.map((group, groupIndex) => (
              <div key={groupIndex}>
                <h3 className="mb-4 ml-4 text-3xl font-semibold text-[#E0DEDA]">
                  {group.name}
                </h3>

                <ul className="mb-6 flex flex-col gap-5">
                  {group.menuItems.map((menuItem, menuIndex) => (
                    <SidebarItem
                      key={menuIndex}
                      item={menuItem}
                      activePath={activePath}
                      setActivePath={setActivePath}
                    />
                  ))}
                </ul>
              </div>
            ))}
          </nav>
        </div>
      </aside>
    </ClickOutside>
  );
};

export default Sidebar;

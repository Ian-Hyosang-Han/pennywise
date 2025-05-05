import React from "react";
import { TfiMenuAlt, TfiClose } from "react-icons/tfi";

export interface HeaderProps {
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
}

const Header: React.FC<HeaderProps> = ({ isOpen, onOpen, onClose }) => (
  <header className="sticky top-0 left-0 right-0 z-20 flex justify-between items-center px-6 py-4 bg-white border-b border-gray-200">
    <div className="flex items-center gap-3">
      <img src="/pennywise-logo.png" className="w-12" alt="logo" />
      <h1 className="font-Mon text-2xl font-bold">PennyWise</h1>
    </div>

    <button
      onClick={isOpen ? onClose : onOpen}
      className="md:hidden text-2xl p-2 cursor-pointer"
      aria-label={isOpen ? "Close menu" : "Open menu"}
    >
      {isOpen ? <TfiClose /> : <TfiMenuAlt />}
    </button>
  </header>
);

export default Header;
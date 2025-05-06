import React from "react";
import { useNavigate } from "react-router-dom";

interface SuccessModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const SuccessModal: React.FC<SuccessModalProps> = ({ isOpen, onClose }) => {
  const navigate = useNavigate();

  if (!isOpen) return null;

  const handleConfirm = () => {
    onClose();
    navigate("/login");
  };

  return (
    <div className="fixed inset-0 bg-black/30 flex justify-center items-center z-50">
      <div className="bg-[#fffff0] p-6 rounded-lg shadow-lg w-80 text-center">
        <p className="mb-4 font-bold text-lg">
          Congratulations! Your account has been created.
        </p>
        <button
          onClick={handleConfirm}
          className="mt-2 px-4 py-2 bg-[#6BC1B4] text-white rounded hover:bg-[#5CAEA2] transition"
        >
          Go to Login
        </button>
      </div>
    </div>
  );
};

export default SuccessModal;
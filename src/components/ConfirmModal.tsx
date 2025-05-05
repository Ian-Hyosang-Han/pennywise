interface ConfirmModalProps {
  isOpen: boolean;
  onConfirm: () => void;
  onCancel: () => void;
  message?: string;
}

const ConfirmModal = ({ isOpen, onConfirm, onCancel, message }: ConfirmModalProps) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/30 flex justify-center items-center z-50">
      <div className="bg-[#fffff0] p-8 rounded-lg shadow-lg text-center">
        <p className="text-xl font-bold mb-6 text-[#434343]">{message || "Are you sure?"}</p>
        <div className="flex justify-center gap-6">
          <button
            onClick={onConfirm}
            className="font-btn px-4 py-2 cursor-pointer bg-red-500 text-white rounded hover:bg-red-600"
          >
            Yes
          </button>
          <button
            onClick={onCancel}
            className="font-btn px-4 py-2 cursor-pointer bg-gray-300 text-gray-800 rounded hover:bg-gray-400"
          >
            No
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmModal;
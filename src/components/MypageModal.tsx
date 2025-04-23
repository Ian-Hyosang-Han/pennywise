import { useSelector } from "react-redux";
import { RootState } from "../app/store";

interface Props {
  onClose: () => void;
}

const MypageModal = ({ onClose }: Props) => {
  const username = useSelector(
    (state: RootState) => state.user.userInfo?.username
  );
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white p-6 rounded-md w-[400px] relative">
        <h2 className="font-Mon text-2xl font-bold mb-3">MyPage</h2>
        <hr className="border-t-2 border-[#434343] mb-3" />
        <p>Username: <strong>{username}</strong></p>
        <p>This is your personal dashboard</p>
        <button onClick={onClose} className="text-gray-500 hover:text-black">
          Close
        </button>
      </div>
    </div>
  );
};

export default MypageModal;

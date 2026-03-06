import { Languages } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { translateText } from "../redux/actions";
const Button = () => {
  const { isLoading, textToTranslate } = useSelector(
    (store) => store.translateReducer,
  );
  const dispatch = useDispatch();
  return (
    <div className="flex justify-center mt-6 ">
      <button
        disabled={isLoading || !textToTranslate.trim()}
        onClick={() => dispatch(translateText())}
        className="relative px-6 py-3 rounded-xl font-semibold text-lg bg-linear-to-r from-red-800  via-red-600 to-red-400 -transparent hover:from-red-700 hover: to-red-400 shadow-lg hover:shadow-xl transform hover:scale-105 active:scale-95 disabled:from-zinc-700"
      >
        <div className="flex items-center gap-3 ">
          <Languages className="size-5" />
          <span>Çevir</span>
        </div>
      </button>
    </div>
  );
};

export default Button;

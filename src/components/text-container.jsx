import { ArrowRight, Volume2 } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { setText } from "../redux/slices/translate-slice";

const TextContainer = () => {
  const dispatch = useDispatch();
  const { textToTranslate, translatedText, isLoading } = useSelector(
    (store) => store.translateReducer,
  );
  return (
    <div className="flex gap-4 mt-6 lg:gap-8 flex-col lg:flex-row">
      {/* çevirilecek metin */}
      <div className="flex-1 ">
        <div className="flex items-center justify-between mb-2 ">
          <label className="text-sm text-zinc-300">Çevrilecek Metin</label>
          <div className="flex items-center gap-3">
            <button className="btn">
              <Volume2 className="size-4" />
              Seslendir
            </button>
            <button className="btn">Temizle</button>
          </div>
        </div>
        <div>
          <textarea
            placeholder="Çevirmek istediğiniz metni buraya yazınız..."
            value={textToTranslate}
            onChange={(e) => dispatch(setText(e.target.value))}
          ></textarea>
        </div>
      </div>
      {/* ok */}
      <div className="flex items-center justify-center lg:flex-col">
        <div className="size-8 lg:size-12 bg-blue-600 rounded-full grid place-items-center ">
          <ArrowRight className="size-4 lg:size-6 max-lg:rotate-90 " />
        </div>
      </div>
      {/* Çeviri Sonucu */}
      <div className="flex-1 ">
        <div className="flex items-center justify-between mb-2 ">
          <label className="text-sm text-zinc-300">Çeviri Sonucu</label>
          <div className="flex items-center gap-3">
            <button className="btn">
              <Volume2 className="size-4" />
              Seslendir
            </button>
            <button className="btn">Kopyala</button>
          </div>
        </div>
        <div className="relative ">
          <textarea
            className="text-gray-300"
            disabled
            value={translatedText}
          ></textarea>

          {!isLoading && !translatedText && !textToTranslate.trim() && (
            <div className=" absolute inset-0 grid place-items-center">
              <p className="text-zinc-500 text-sm">Çeviri Bekleniyor...</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default TextContainer;

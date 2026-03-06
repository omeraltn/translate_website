import { useDispatch, useSelector } from "react-redux";
import { clearHistory } from "../redux/slices/translate-slice";
import { ArrowRight } from "lucide-react";

const History = () => {
  const dispatch = useDispatch();
  const { history } = useSelector((store) => store.translateReducer);

  return (
    <div className="mt-8 bg-zinc-800/30 rounded-xl p-4 border border-zinc-700/30">
      <div className="flex items-center justify-between mb-4 ">
        <h3 className="text-lg font-semibold text-zinc-200"> Son Çevriler</h3>
        {history.length > 0 && (
          <button
            onClick={() => dispatch(clearHistory())}
            className="text-xs text-zin-300"
          >
            Temizle
          </button>
        )}
      </div>
      <div className="space-y-3 max-h-60 overflow-y-auto">
        {history.length === 0 ? (
          <div className="my-4 text-center">
            <span className="text-sm text-zinc-500">
              Henüz çeviri yapılmadı
            </span>
          </div>
        ) : (
          history.map((item, key) => (
            <div
              className="bg-zinc-700/50 rounded-lg p-3 border border-zinc-600/30 "
              key={key}
            >
              <div className="flex justify-between items-center mb-2 ">
                <div className="flex items-center gap-2 text-xs text-zinc-400 ">
                  <span>{item.sourceLang}</span>
                  <ArrowRight className="size-3" />
                  <span>{item.targetLang}</span>
                </div>
                <span className="text-xs text-zinc-500 ">
                  {new Date(item.timestamp).toLocaleDateString()}
                </span>
              </div>
              <div className="space-y-2">
                <p className="text-sm text-zinc-300 line-clamp-2">
                  {item.textToTranslate}
                </p>
                <p className="text-sm text-zinc-300 line-clamp-2">
                  {item.translatedText}
                </p>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default History;

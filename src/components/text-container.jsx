import { ArrowRight, Volume2 } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { setText } from "../redux/slices/translate-slice";
import Loader from "./loader";

const TextContainer = () => {
  const dispatch = useDispatch();
  const { textToTranslate, sourceLang, targetLang, translatedText, isLoading } =
    useSelector((store) => store.translateReducer);

  // çevrilecek metni temizler

  const handleClear = () => {
    dispatch(setText(""));
  };
  //çeviri sonucunu kopyala

  const handleCopy = () => {
    window.navigator.clipboard.writeText(translatedText);
  };

  // kaynak metni seslendir
  const handleSpeakSource = () => {
    //devam eden bir seslendirme varsa durdur
    window.speechSynthesis.cancel();

    // SpeechSynthesisUtterance: seslendirecek metni ve ayarlarını tutan bir nesne oluşturur
    const utterance = new SpeechSynthesisUtterance(textToTranslate);

    //utterance.lang: hangi dilde / aksanda konuşsun
    if (sourceLang.value) {
      utterance.lang = sourceLang.value;
    }

    //oluşturulan utterance nesnesini seslendirmeye başla
    //tarayıcının ses sentezleme moturunu kullanarak metni sesli olarak okur

    window.speechSynthesis.speak(utterance);
  };
  // hedef metni seslendir
  const handleSpeakTarget = () => {
    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(translatedText);

    if (targetLang.value) {
      utterance.lang = sourceLang.value;
    }

    window.speechSynthesis.speak(utterance);
  };

  return (
    <div className="flex gap-4 mt-6 lg:gap-8 flex-col lg:flex-row ">
      {/* çevirilecek metin */}
      <div className="flex-1">
        <div className="flex items-center justify-between mb-2 ">
          <label className="text-sm text-zinc-300">Çevrilecek Metin</label>
          <div className="flex items-center gap-3">
            <button onClick={handleSpeakSource} className="btn">
              <Volume2 className="size-4" />
              Seslendir
            </button>
            <button className="btn" onClick={handleClear}>
              Temizle
            </button>
          </div>
        </div>
        <div>
          <textarea
            maxLength={10000}
            placeholder="Çevirmek istediğiniz metni buraya yazınız..."
            value={textToTranslate}
            onChange={(e) => dispatch(setText(e.target.value))}
          ></textarea>
        </div>
      </div>
      {/* ok */}
      <div className="flex items-center justify-center lg:flex-col">
        <div className="size-8 lg:size-12 bg-linear-to-b from-red-600 to-red-400 rounded-full grid place-items-center ">
          <ArrowRight className="size-4 lg:size-6 max-lg:rotate-90 " />
        </div>
      </div>
      {/* Çeviri Sonucu */}
      <div className="flex-1 ">
        <div className="flex items-center justify-between mb-2 ">
          <label className="text-sm text-zinc-300">Çeviri Sonucu</label>
          <div className="flex items-center gap-3">
            <button onClick={handleSpeakTarget} className="btn">
              <Volume2 className="size-4" />
              Seslendir
            </button>
            <button className="btn" onClick={handleCopy}>
              Kopyala
            </button>
          </div>
        </div>
        <div className="relative ">
          <textarea
            className="text-gray-300"
            disabled
            value={translatedText}
          ></textarea>

          {/* loader */}
          {isLoading ? (
            <Loader />
          ) : (
            !isLoading &&
            !translatedText &&
            !textToTranslate.trim() && (
              <div className=" absolute inset-0 grid place-items-center">
                <p className="text-zinc-500 text-sm">Çeviri Bekleniyor...</p>
              </div>
            )
          )}
        </div>
      </div>
    </div>
  );
};

export default TextContainer;

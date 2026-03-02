import { ArrowLeftRight } from "lucide-react";
import { useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import ReactSelect from "react-select";
import { selectStyles } from "./utils/constants";
import { setSourceLang, setTargetLang } from "../redux/slices/translate-slice";

const LanguageSelector = () => {
  const { isLoading, error, languages } = useSelector(
    (store) => store.languageReducer,
  );
  const { sourceLang, targetLang } = useSelector(
    (store) => store.translateReducer,
  );
  const dispatch = useDispatch();

  //storadaki languages dizisindeki keyleri react selectin istediği şekilde güncelle
  //language > value , name > label
  const formatted = useMemo(
    () =>
      languages.map((item) => ({
        value: item.language,
        label: item.name,
      })),
    [languages],
  );

  //dili algıla seçeneği
  const detect = { label: "Dili algıla", value: undefined };

  return (
    <div className="space-y-4 ">
      <div className="flex items-center gap-3 flex-col lg:flex-row ">
        {/* kaynak dil */}
        <div className="flex-1 w-full ">
          <label className="text-sm text-zinc-300 block mb-2">Kaynak Dil</label>
          <ReactSelect
            isDisabled={isLoading}
            isLoading={isLoading}
            options={[detect, ...formatted]}
            className="text-black"
            styles={selectStyles}
            onChange={(lang) => {
              dispatch(setSourceLang(lang));
            }}
            value={sourceLang}
          />
        </div>
        {/* değiştirme butonu */}
        <div className="flex justify-center items-center ">
          <button className="size-10 lg:size-12 bg-zinc-700 rounded-full flex justify-center items-center">
            <ArrowLeftRight className="size-5 " />
          </button>
        </div>
        {/* Hedef dil */}
        <div className="flex-1 w-full ">
          <label className="text-sm text-zinc-300 block mb-2">Hedef Dil</label>
          <ReactSelect
            isDisabled={isLoading}
            isLoading={isLoading}
            options={formatted}
            className="text-black"
            styles={selectStyles}
            value={targetLang}
            onChange={(lang) => {
              dispatch(setTargetLang(lang));
            }}
          />
        </div>
      </div>
      <div className="text-center ">
        <p className="text-xs bg-linear-to-r from-red-900 via-red-500 to-red-100 bg-clip-text  text-transparent ">
          {languages.length} dil destekleniyor.
        </p>
      </div>
    </div>
  );
};

export default LanguageSelector;

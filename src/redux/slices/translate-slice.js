import { createSlice } from "@reduxjs/toolkit";
import { translateText } from "../actions";

const initialState = {
  sourceLang: { label: "Dili algıla", value: undefined }, //kaynak dil
  targetLang: { label: "English", value: "en" }, //hedef dil
  textToTranslate: "", //çevrilecel metin
  translatedText: "", //çeviri sonucu
  isLoading: false, //çeviri yükleniyor mu
  error: null, //çeviri sonucunda hata oluştu mu?
  history: [], //çeviri geçmişini tutar
};

const translateSlice = createSlice({
  name: "translate",
  initialState,
  reducers: {
    setSourceLang: (state, action) => {
      state.sourceLang = action.payload;
    },
    setTargetLang: (state, action) => {
      state.targetLang = action.payload;
    },
    setText: (state, { payload }) => {
      state.textToTranslate = payload;
    },
    swap: (state) => {
      // değişme anında stateler birbirini ezmesin diye geçici değişken oluştur
      const tempSource = state.sourceLang;
      const tempTarget = state.targetLang;
      const tempText = state.textToTranslate;
      const tempTranslated = state.translatedText;

      //statelerin yerini değiştir
      state.sourceLang = tempTarget;
      state.targetLang = tempSource;
      state.textToTranslate = tempTranslated;
      state.translatedText = tempText;
    },
    clearHistory: (state) => {
      state.history = [];
    },
  },
  extraReducers: (builder) => {
    builder.addCase(translateText.pending, (state) => {
      state.translatedText = "";
      state.isLoading = true;
    });
    builder.addCase(translateText.rejected, (state, { error }) => {
      state.isLoading = false;
      state.error = error.message;
    });
    builder.addCase(translateText.fulfilled, (state, { payload }) => {
      state.isLoading = false;
      state.error = null;
      state.translatedText = payload;

      //çeviri sonucu geldiyse geçmişe kaydet
      if (state.textToTranslate && payload) {
        state.history.unshift({
          id: Date.now(),
          textToTranslate: state.textToTranslate,
          translatedText: payload,
          sourceLang: state.sourceLang.label,
          targetLang: state.targetLang.label,
          timestamp: new Date().getTime(),
        });
      }
    });
  },
});

export const { setSourceLang, setTargetLang, setText, swap, clearHistory } =
  translateSlice.actions;

export default translateSlice.reducer;

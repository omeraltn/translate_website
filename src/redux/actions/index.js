import { createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../components/utils/api";

//dil verisini apidan alan thunk aksiyonu
//çağrıldığında apinın cevabına göre otomatik olarak reducera haber verir

export const getLanguages = createAsyncThunk(
  "language/getLanguages",
  async () => {
    //apidan dil verilerini al
    const res = await api.get("/languages");

    //aksiyonun payload ını return et
    return res.data.languages;
  },
);

//çeviri işlemi için api ya istek at

export const translateText = createAsyncThunk(
  "translate/translateText",
  async (_, { getState }) => {
    //stora tutulan verilere eriş
    const state = getState().translateReducer;

    //apiya çeviri için istek at
    const res = await api.post("", {
      q: state.textToTranslate,
      source: state.sourceLang.value,
      target: state.targetLang.value,
    });
    return res.data.data.translations.translatedText[0];

    //aksiyonn payloadını return et
    return "payload";
  },
);

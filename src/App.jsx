import React, { useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getLanguages, translateText } from "./redux/actions";
import Select from "react-select";
import { setAnswer } from "./redux/slices/translateSlice";

const App = () => {
  const langState = useSelector((store) => store.language);
  const translateState = useSelector((store) => store.translate);

  const [sourceLang, setSourceLang] = useState({
    value: "tr",
    label: "Turkish",
  });
  const [targetLang, setTargetLang] = useState({
    value: "en",
    label: "English",
  });

  const [text, setText] = useState();

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getLanguages());
  }, []);

  // apidan gelen diziyi bizden istenilen formata çevirmek
  // nesnelerin code ve name değerilerini label ve value'ya çevirdik
  const formatted = useMemo(
    () =>
      langState.languages?.map((i) => ({
        value: i.code,
        label: i.name,
      })),
    [langState.languages]
  );

  const handleTranslate = () => {
    dispatch(translateText({ sourceLang, targetLang, text }));
  };

  const handleSwap = () => {
    // select alanlarındaki veirleri yer değiş
    setSourceLang(targetLang);
    setTargetLang(sourceLang);

    // store'daki veriyi state'e aktar
    setText(translateState.answer);

    // state'deki veriyi store'a  aktar
    dispatch(setAnswer(text));
  };

  return (
    <div className="bg-red-500 min-h-screen text-white grid place-items-center">
      <div className="w-[80vw] max-w-[1100px] flex flex-col justify-center">
        <h1 className="text-center text-5xl font-semibold mb-7 text-white-500">
          Çeviri +{" "}
        </h1>

        <div className="flex gap-2 text-black">
          <Select
            onChange={(lang) => setSourceLang(lang)}
            value={sourceLang}
            isDisabled={langState.isLoading}
            isLoading={langState.isLoading}
            options={formatted}
            className="flex-1"
          />

          <button
            onClick={handleSwap}
            className="rounded py-2 px-6 bg-blue-500 text-white transition hover:ring-2 hover:bg-blue-700"
          >
            Değiş
          </button>

          <Select
            onChange={(lang) => setTargetLang(lang)}
            value={targetLang}
            isDisabled={langState.isLoading}
            isLoading={langState.isLoading}
            options={formatted}
            className="flex-1"
          />
        </div>

        <div className="flex mt-5 gap-3 md:gap-[105px] max-md:flex-col  ">
          <textarea
            value={text}
            onChange={(e) => setText(e.target.value)}
            className="w-full min-h-[300px] max-h-[500px] p-[10px] text-[20px] rounded text-black"
          />

          <div className="w-full relative">
            <textarea
              disabled
              className="w-full min-h-[300px] max-h-[500px] p-[10px] text-[20px] rounded  text-black bg-white "
              value={translateState.answer}
            />

            {translateState.isLoading && (
              <div className="loader">
                <div className="justify-content-center jimu-primary-loading"></div>
              </div>
            )}
          </div>
        </div>

        <button
          onClick={handleTranslate}
          className="rounded-md py-3 px-5 text-[17px] font-semibold cursor-pointer bg-blue-500	 mt-3 hover:ring-2 hover:bg-blue-700 transition"
        >
          Çevir
        </button>
      </div>
    </div>
  );
};

export default App;

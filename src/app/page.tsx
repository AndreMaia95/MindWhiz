"use client";
import { useEffect, useState } from "react";

export default function Home() {
  const countries = [
    "portugal",
    "brazil",
    "spain",
    "france",
    "germany",
    "italy",
    "england",
    "ireland",
    "norway",
    "sweden",
    "finland",
    "denmark",
    "iceland",
    "greece",
    "turkey",
    "russia",
    "poland",
    "slovakia",
    "austria",
    "switzerland",
    "netherlands",
    "belgium",
    "luxembourg",
    "liechtenstein",
    "andorra",
    "monaco",
    "san marino",
    "vatican",
    "malta",
    "albania",
    "macedonia",
    "montenegro",
    "serbia",
    "croatia",
    "slovenia",
    "hungary",
    "romania",
    "bulgaria",
    "moldova",
    "ukraine",
    "belarus",
    "lithuania",
    "latvia",
    "estonia",
    "armenia",
    "georgia",
    "azerbaijan",
    "kazakhstan",
    "turkmenistan",
    "uzbekistan",
    "tajikistan",
    "kyrgyzstan",
    "afghanistan",
    "pakistan",
    "india",
    "nepal",
    "bhutan",
    "bangladesh",
  ];

  const [randomCountry, setRandomCountry] = useState<string>("");
  const [revealedLetters, setRevealedLetters] = useState<boolean[]>([]);
  const [inputValue, setInputValue] = useState<string>("");

  //Escolher um país aleatório que esteja no array
  useEffect(() => {
    const randomIndex = Math.floor(Math.random() * countries.length);
    setRandomCountry(countries[randomIndex]);
  }, []);

  //atualiza os quadrados revelados sempre que o país aleatório muda
  useEffect(() => {
    setRevealedLetters(new Array(randomCountry.length).fill(false));
  }, [randomCountry]);

  const handleButtonClick = () => {
    const inputValueLowerCase = inputValue.toLowerCase();

    // Verifica se a entrada do usuário contém alguma letra da palavra aleatória
    const containsMatchingLetters = inputValueLowerCase
      .split("")
      .some((letter) => randomCountry.includes(letter));

    if (containsMatchingLetters) {
      // Se a entrada contiver letras coincidentes, revele essas letras nos quadrados
      const newRevealedLetters: boolean[] = revealedLetters.map((_, index) =>
        inputValueLowerCase.includes(randomCountry[index])
          ? true
          : revealedLetters[index]
      );
      setRevealedLetters(newRevealedLetters);
    }
    if (inputValue === randomCountry) {
      setRevealedLetters(new Array(randomCountry.length).fill(true));
      setTimeout(() => {
        openModal();
      }, 300);
    }

    // Limpa o campo de entrada
    setInputValue("");
  };

  //Quando botão enter é clicado efetua o click no botao OK
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleButtonClick();
    }
  };

  const openModal = () => {
    alert("Parabéns, você acertou!");
    window.location.reload();
  };

  return (
    <main className="h-screen w-full bg-slate-500 flex items-center justify-center">
      <div className="flex flex-col h-screen">
        <div className="h-[85%] flex flex-col items-center justify-center">
          <div className="absolute top-10">
            <h1 className="text-center font-semibold text-4xl">MindWhiz</h1>
            <p className="text-center font-normal">Try to find the country!</p>
          </div>
          <div className="flex gap-1">
            {randomCountry.split("").map((letter, index) => (
              <div
                key={index}
                className=" w-8 h-8 bg-white rounded-md flex items-center justify-center text-xl font-bold sm:w-10 sm:h-10 sm:text-2xl lg:w-16 lg:h-16 lg:text-5xl"
              >
                {revealedLetters[index] ? letter.toUpperCase() : null}
              </div>
            ))}
          </div>
        </div>
        <div className="flex flex-1 items-center justify-center">
          <input
            value={inputValue}
            onKeyDown={handleKeyDown}
            onChange={(event) => setInputValue(event.target.value)}
            className="w-[300px] rounded-tl-md rounded-bl-md px-5 py-4 font-[20px]"
          ></input>
          <button
            onClick={handleButtonClick}
            className="px-5 py-4 bg-white border-l border-zinc-500 rounded-tr-md rounded-br-md hover:bg-slate-300"
          >
            OK
          </button>
        </div>
      </div>
    </main>
  );
}

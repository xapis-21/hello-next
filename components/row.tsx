import { keys } from "@/constants";
import { SetStateAction, useCallback, useEffect, useState } from "react";
import { act } from "react-dom/test-utils";

type RowProps = {
  rIndex: number;
  word: string;
  activeRow: number;
  setActiveRow: any;
  activeCol: number;
  setActiveCol: any;
  setGameState: any;
};

const Row = ({
  rIndex,
  word,
  activeRow,
  setActiveRow,
  activeCol,
  setActiveCol,
  setGameState,
}: RowProps) => {
  const [guessWord, setGuessWord] = useState<
    { color: string; value: string }[]
  >(new Array(word.length).fill({ color: "bg-red-100", value: "⭐️" }));

  const clearCell = useCallback(() => {
    if (activeCol > 0 && rIndex === activeRow) {
      setGuessWord((prev) => {
        const cells = [...prev];
        cells[activeCol - 1] = {
          ...cells[activeCol - 1],
          value: "⭐️",
        };
        return cells;
      });

      setActiveCol((prev: number) => prev - 1);
    }
  }, [activeCol, rIndex, activeRow]);

  const fillCell = useCallback(
    (key: string) => {
      if (activeRow === rIndex && activeCol < word.length) {
        setGuessWord((prev: { color: string; value: string }[]) => {
          const cells = [...prev];
          cells[activeCol] = {
            ...cells[activeCol],
            value: key.toUpperCase(),
          };
          return cells;
        });

        setActiveCol((prev: any) => prev + 1);
      }
    },
    [activeRow, activeCol, word.length, rIndex]
  );

  const updateGameState = useCallback(() => {
    if (activeCol === word.length && rIndex === activeRow) {
      console.log("hello");
      const trial = guessWord.map(({ value }) => value).join("");

      if (trial === word.toUpperCase()) {
        setGameState("win");
      }

      if (activeRow === 5 && trial !== word.toUpperCase()) {
        setGameState("lost");
        return;
      }

      setGuessWord((prev: any) => {
        const cells = [...prev].map((item, i) => {
          if (word.includes(item.value.toLowerCase())) {
            if (word[i].toUpperCase() === item.value) {
              return {
                ...item,
                color: "bg-green-400",
              };
            }
            return {
              ...item,
              color: "bg-yellow-400",
            };
          }

          return {
            ...item,
            color: "bg-slate-300",
          };
        });

        return cells;
      });

      setActiveRow((prev: number) => prev + 1);
      setActiveCol(0);
    }
  }, [activeCol, rIndex, word, activeRow, guessWord, setActiveRow]);
  // [activeCol, word, index, activeRow, setActiveRow, guessWord]
  const handleEvent = useCallback(
    (event: any) => {
      if (!keys.includes(event.code)) return;

      switch (event.code) {
        case "Enter":
          updateGameState();
          break;
        case "Backspace":
          clearCell();
          break;

        default:
          fillCell(event.key);
          break;
      }
    },
    [fillCell, updateGameState]
  );

  useEffect(() => {
    window.addEventListener("keydown", handleEvent);
    return () => window.removeEventListener("keydown", handleEvent);
  }, [handleEvent]);

  return (
    <div className="flex gap-1">
      {guessWord.map(({ color, value }, cIndex) => (
        <span
          key={cIndex}
          className={`h-16 w-16 grid place-items-center rounded-md text-xl ${color} ${
            cIndex === activeCol &&
            rIndex === activeRow &&
            "border-2 border-red-400"
          }`}
        >
          {value}
        </span>
      ))}
    </div>
  );
};

export default Row;

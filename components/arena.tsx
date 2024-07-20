"use client";

import Row from "@/components/row";
import { useEffect, useState } from "react";
import WinScreen from "./win-screen";
import { Message, generateHint } from "@/app/actions";

export const Arena = () => {
  const NUMBER_OF_TRIES = 6;
  const [loading, setLoading] = useState(true);
  const [activeRow, setActiveRow] = useState<number>(0);
  const [activeCol, setActiveCol] = useState<number>(0);
  const [answer, setAnswer] = useState<{ hint: string; answer: string } | null>(
    null
  );
  const [conversation, setConversation] = useState<Message[]>([]);

  const getHint = async (prompt: string) => {
    const { messages } = await generateHint([
      ...conversation,
      { role: "user", content: prompt },
    ]);

    setConversation(messages);

    const fString = messages[messages.length - 1].content;
    setAnswer(JSON.parse(fString));
    console.log(fString)

    setLoading(false);
  };

  useEffect(() => {
    getHint(
      "Generate a new random word and a hint for a Wordle game following the guidelines provided."
    );
  }, []);

  const [gameState, setGameState] = useState<string | null>(null);

  const handleReset = () => {
    setLoading(true);
    setAnswer(null);
    getHint("Generate a new new/next word and hint for my wordle game");
    setGameState(null);
    setActiveCol(0);
    setActiveRow(0);
  };

    const handleTry = () => {
      // setLoading(true);
      setAnswer((prev)=>prev);
      setGameState(null);
      setActiveCol(0);
      setActiveRow(0);
    };

  if (loading && answer == null)
    return <div className="animate-pulse">Loading....</div>;

  console.log(typeof answer);

  return (
    <div className="flex flex-col items-center gap-8">
      <div className="text-sm text-red-800 bg-red-200 p-4 rounded-2xl border border-red-300">
        {answer && <span>🧠 {answer?.hint}</span>}
      </div>

      <>
        {" "}
        {gameState === null ? (
          <div className="flex flex-col gap-1">
            {new Array(NUMBER_OF_TRIES).fill("").map((_, i) => (
              <Row
                key={i}
                rIndex={i}
                word={answer?.answer ?? ""}
                activeRow={activeRow}
                setActiveRow={setActiveRow}
                activeCol={activeCol}
                setActiveCol={setActiveCol}
                setGameState={setGameState}
              />
            ))}
          </div>
        ) : (
          <WinScreen gameState={gameState} handleReset={handleReset} handleTry={handleTry} />
        )}
        {/* </>
        )} */}
      </>
    </div>
  );
};

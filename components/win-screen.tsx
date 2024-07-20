const WinScreen = ({
  gameState,
  handleReset,
  handleTry

}: {
  gameState: string;
  handleReset: () => void;
  handleTry: ()=>void;
}) => {
  return (
    <div>
      {gameState === "win" && (
        <div className="flex flex-col gap-4">
          <span>You have won 😜</span>
          <button
            className="px-8 py-4 bg-red-500 text-red-50 rounded-2xl font-semibold text-sm"
            onClick={handleReset}
          >
            Next word
          </button>
        </div>
      )}
      {gameState === "lost" && (
        <div>
          <span>Boo, you lost 👎 </span>
          <button
            className="px-8 py-4 bg-red-500 text-red-50 rounded-2xl font-semibold text-sm"
            onClick={handleTry}
          >
            Try again
          </button>
        </div>
      )}
    </div>
  );
};

export default WinScreen;

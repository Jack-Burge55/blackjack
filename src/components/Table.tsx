/* eslint-disable @typescript-eslint/no-unsafe-function-type */
import Card from "./Card";

const Table = ({
  gameState,
  samHand,
  dealerHand,
  getHandValue,
  playHandClick,
  gameResult,
}: {
  gameState: string;
  samHand: string[];
  dealerHand: string[];
  getHandValue: Function;
  playHandClick: Function;
  gameResult: string;
}) => {
  return (
    <div className="flex-3 bg-green-600 h-dvh text-center" id="game">
      <button
        disabled={gameState === "dealerDeal" || gameState === "samDeal"}
        onClick={() => playHandClick()}
        className="bg-green-800 hover:bg-green-900 text-white font-bold py-2 px-4 rounded disabled:bg-gray-400 m-5"
      >
        Play a Hand
      </button>
      <h3 className="text-2xl">Dealer Cards</h3>
      <div
        id="dealerCards"
        className="border-6 border-yellow-400 rounded-2xl min-h-33 flex flex-row justify-center"
      >
        {dealerHand.map((card: string) => {
          return <Card value={card} key={card}></Card>;
        })}
      </div>
      <p>Dealer Hand Value: {getHandValue(dealerHand)}</p>
      <h3 className="text-2xl">Sam Cards</h3>
      <div
        id="samCards"
        className="border-6 border-yellow-400 rounded-2xl min-h-33 flex flex-row justify-center"
      >
        {samHand.map((card: string) => {
          return <Card value={card} key={card}></Card>;
        })}
      </div>
      <p>Sam Hand Value: {getHandValue(samHand)}</p>
      <p className="m-6 text-3xl">{gameResult}</p>
    </div>
  );
};

export default Table;

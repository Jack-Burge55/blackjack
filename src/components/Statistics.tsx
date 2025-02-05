const Statistics = ({samWinCount, dealerWinCount, tieCount, samBlackjackCount, dealerBlackjackCount}: {
  samWinCount: number;
  dealerWinCount: number;
  tieCount: number;
  samBlackjackCount: number;
  dealerBlackjackCount: number;
}) => {
return (
  <div className="flex-2 bg-amber-100 h-auto" id="mode">
          <h2 className="text-5xl m-8">Statistics</h2>
          <p className="m-8 text-2xl">Sam Wins</p>
          <p className="m-8 text-2xl">{samWinCount}</p>
          <p className="m-8 text-2xl">Dealer Wins</p>
          <p className="m-8 text-2xl">{dealerWinCount}</p>
          <p className="m-8 text-2xl">Blackjack Ties</p>
          <p className="m-8 text-2xl">{tieCount}</p>
          <p className="m-8 text-2xl">Sam Blackjack Count</p>
          <p className="m-8 text-2xl">{samBlackjackCount}</p>
          <p className="m-8 text-2xl">Dealer Blackjack Count</p>
          <p className="m-8 text-2xl">{dealerBlackjackCount}</p>
        </div>
)
}

export default Statistics
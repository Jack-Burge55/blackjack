import { useEffect, useState, useCallback } from "react";
import "./App.css";

import fullDeck from "./helpers/fulldeck";
import Instructions from "./components/Instructions";
import Statistics from "./components/Statistics";
import Table from "./components/Table";

function App() {
  const [samWinCount, setSamWinCount] = useState(0);
  const [dealerWinCount, setDealerWinCount] = useState(0);
  const [tieCount, setTieCount] = useState(0);
  const [samBlackjackCount, setSamBlackjackCount] = useState(0);
  const [dealerBlackjackCount, setDealerBlackjackCount] = useState(0);
  const [deck, setDeck] = useState(fullDeck());
  const [samHand, setSamHand] = useState<string[]>([]);
  const [dealerHand, setDealerHand] = useState<string[]>([]);
  const [gameState, setGameState] = useState<
    "preHand" | "samDeal" | "dealerDeal" | "handOver"
  >("preHand");
  const [gameResult, setGameResult] = useState("");

  const getHandValue = (hand: string[]) => {
    let total = 0;
    let hasAce = false;
    hand.forEach((card) => {
      const value = card.split("-")[0];
      if (["J", "Q", "K"].includes(value)) total += 10;
      else if (value === "A") {
        total++;
        hasAce = true;
      } else {
        total += parseInt(value);
      }
    });
    if (hasAce && total + 10 <= 21) return total + 10;
    return total;
  };

  const popDeck = useCallback(
    (cardsToTake: number) => {
      const cards = [];
      for (let i = 0; i < cardsToTake; i++) {
        cards.push(deck[i]);
      }
      setDeck(deck.slice(cardsToTake));
      return cards;
    },
    [deck]
  );

  const playHandClick = () => {
    const [a, b, c, d] = popDeck(4);
    setDealerHand([a, b]);
    setSamHand([c, d]);
    setGameResult("");
    const samValue = getHandValue([c, d]);
    const dealerValue = getHandValue([a, b]);
    const samBlackjack = samValue === 21;
    const dealerBlackjack = dealerValue === 21;
    // first resolve blackjack potentials
    if (samBlackjack && dealerBlackjack) {
      setTieCount((tieCount) => tieCount + 1);
      setGameState("handOver");
      setGameResult("Both Sam and the dealer got a blackjack! It's a tie!");
      setSamBlackjackCount((samBlackjackCount) => samBlackjackCount + 1);
      setDealerBlackjackCount(
        (dealerBlackjackCount) => dealerBlackjackCount + 1
      );
    } else if (samBlackjack) {
      setSamBlackjackCount((samBlackjackCount) => samBlackjackCount + 1);
      setSamWinCount((samWinCount) => samWinCount + 1);
      setGameResult("Sam won after being dealt a blackjack!");
      setGameState("handOver");
    } else if (dealerBlackjack) {
      setDealerBlackjackCount(
        (dealerBlackjackCount) => dealerBlackjackCount + 1
      );
      setDealerWinCount((dealerWinCount) => dealerWinCount + 1);
      setGameResult("The dealer won after being dealt a blackjack!");
      setGameState("handOver");
    } else {
      // then check Sam hand to deal or not
      if (samValue >= 17) {
        if (dealerValue > samValue) {
          setGameState("handOver");
          setGameResult(
            `The dealer beat Sam with a hand worth ${dealerValue}!`
          );
          setDealerWinCount((dealerWinCount) => dealerWinCount + 1);
        } else {
          setGameState("dealerDeal");
        }
      } else {
        setGameState("samDeal");
      }
    }
  };

  // shuffle full deck after each hand
  useEffect(() => {
    if (gameState === "handOver") {
      setDeck(fullDeck());
    }
  }, [gameState]);

  // if gameState is samDeal and handValue is less than 17, deal cards to Sam until 17+ or bust
  useEffect(() => {
    let timeoutId: number;
    if (gameState === "samDeal") {
      timeoutId = setTimeout(() => {
        const newHand = samHand.concat(popDeck(1));
        const newValue = getHandValue(newHand);
        setSamHand(newHand);
        if (newValue > 21) {
          setGameResult(`Sam bust with a hand of ${newValue}!`);
          setGameState("handOver");
          setDealerWinCount((dealerWinCount) => dealerWinCount + 1);
        }
        if (newValue >= 17 && newValue <= 21) {
          setGameState("dealerDeal");
        }
      }, 2500);
      return () => clearTimeout(timeoutId);
    }
  }, [gameState, deck, samHand, popDeck]);

  // when gameState is dealerDeal keep dealing until beaten Sam or bust
  useEffect(() => {
    let timeoutId: number;
    if (gameState === "dealerDeal") {
      // in the case Sam stops drawing and Dealer has higher
      if (getHandValue(dealerHand) > getHandValue(samHand)) {
        setGameResult(
          `The dealer beat Sam with a hand worth ${getHandValue(dealerHand)}!`
        );
        setGameState("handOver");
        setDealerWinCount((dealerWinCount) => dealerWinCount + 1);
      }
      timeoutId = setTimeout(() => {
        if (getHandValue(dealerHand) <= getHandValue(samHand)) {
          const newHand = dealerHand.concat(popDeck(1));
          const newValue = getHandValue(newHand);
          setDealerHand(newHand);
          if (newValue > 21) {
            setGameResult(
              `The dealer bust with a hand of ${newValue}! Sam wins!`
            );
            setGameState("handOver");
            setSamWinCount((samWinCount) => samWinCount + 1);
          } else if (newValue > getHandValue(samHand)) {
            setGameResult(`The dealer beat Sam with a hand worth ${newValue}!`);
            setGameState("handOver");
            setDealerWinCount((dealerWinCount) => dealerWinCount + 1);
          }
        }
      }, 2500);
      return () => clearTimeout(timeoutId);
    }
  }, [gameState, deck, samHand, popDeck, dealerHand]);

  return (
    <>
      <div className="flex h-auto flex-col md:flex-row">
        <Instructions />
        <Table
          gameState={gameState}
          samHand={samHand}
          dealerHand={dealerHand}
          getHandValue={getHandValue}
          playHandClick={playHandClick}
          gameResult={gameResult}
        />
        <Statistics
          samWinCount={samWinCount}
          dealerWinCount={dealerWinCount}
          tieCount={tieCount}
          samBlackjackCount={samBlackjackCount}
          dealerBlackjackCount={dealerBlackjackCount}
        />
      </div>
    </>
  );
}

export default App;

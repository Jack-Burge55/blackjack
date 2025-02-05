const fullDeck = () => {
  const deck = [];
  for (const suit of ["S", "H", "D", "C"]) {
    deck.push(`A-${suit}`);
    deck.push(`J-${suit}`);
    deck.push(`Q-${suit}`);
    deck.push(`K-${suit}`);
    for (let i = 2; i <= 10; i++) deck.push(`${i}-${suit}`);
  }
  for (let i = deck.length - 1; i >= 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [deck[i], deck[j]] = [deck[j], deck[i]];
  }
  return deck;
};

export default fullDeck;

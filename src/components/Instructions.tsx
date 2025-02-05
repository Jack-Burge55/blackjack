const Instructions = () => {
  return (
    <div className="flex-2 bg-amber-100 h-auto" id="instructions">
          <h2 className="text-5xl m-8">Instructions</h2>
          <p className="m-8">
            Click the play button on the table to deal cards to you and the
            dealer. If either player has blackjack, this immediately wins the
            game for that player (or a tie)
          </p>
          <p className="m-8">
            Else, Sam (you) starts drawing cards. The card values are the
            number, or 10 if a Jack (J), Queen (Q) or King (K). Aces (A) are
            special and count for either 1 or 11 to best suit your score. Keep
            drawing to get as close to 21 as possible. If you get a score over
            21, you are bust and lose. If you get 17 or higher, you stop drawing
            cards.
          </p>
          <p className="m-8">
            If not bust, the dealer then draws cards to their hand in the same
            way, stopping only when they have bust or have a value higher than
            yours.
          </p>
          <p className="m-8">
            Click the play again button afterwards to play again!
          </p>
          <h2 className="text-3xl m-8">Oxbury Variant</h2>
          <p className="m-8">This version is different to standard to classical Blackjack in a couple of ways. As the player is autonomous, the player stops when reaching a value of 17 or higher. The dealer typically stops upon reaching 17+, but in this version keeps drawing until they have a higher value than Sam, or bust. So, if Sam gets a non-immediate blackjack, the dealer will keep drawing until they are bust, for example.</p>
        </div>
  )
}

export default Instructions
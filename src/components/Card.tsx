const Card = ({value}: {value: string}) => {
  const [cardVal, suit] = value.split("-")
  const suitObj = {
    "H": "♥️",
    "S": "♠️",
    "C": "♣️",
    "D": "♦️"
  }
  const cardSuit = suitObj[suit as keyof typeof suitObj]
  return (
    <div className="bg-white w-20 h-30 rounded-[5%] mr-2 ml-2 flex flex-col justify-around">
      <p className="relative right-7 text-2xl">{cardVal}</p>
      <p className="text-4xl">{cardSuit}</p>
      <p className="relative left-6 text-2xl">{cardVal}</p>
    </div>
  )
}

export default Card
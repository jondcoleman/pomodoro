const calculateRemainingPercent = function(timeRemaining, totalTime) {
  return Math.floor(totalTime / timeRemaining * 100)
}

export default calculateRemainingPercent

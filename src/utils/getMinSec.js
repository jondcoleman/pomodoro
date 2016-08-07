function secWithLeadingZero(sec){
  if (sec < 10) return `0${sec}`
  else return sec.toString()
}

function getMinSec(seconds) {
  // get minutes
  const min = Math.floor(seconds / 60)

  // get seconds
  const sec = seconds % 60

  // return string minutes:seconds 06
  return `${min.toString()}:${secWithLeadingZero(sec)}`
}

export default getMinSec

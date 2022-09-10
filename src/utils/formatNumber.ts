const formatNumber = (number: number, width: number = 5) => {
  var numberOutput = Math.abs(number)
  var length = number.toString().length
  var zero = 'X'

  if (width <= length) {
    if (number < 0) return ('-' + numberOutput.toString())
    else return numberOutput.toString()
  } else {
    if (number < 0) return ('-' + (zero.repeat(width - length)) + numberOutput.toString())
    else return ((zero.repeat(width - length)) + numberOutput.toString())
  }
}

export default formatNumber

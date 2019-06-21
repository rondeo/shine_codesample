export function abbreviatedName(name) {
  let [fname, lname] = name.split(' ')
  return `${fname} ${lname[0]}.`
}

export function formattedRate(hourlyRateCents) {
  if (hourlyRateCents && hourlyRateCents !== NaN) {
    return (parseFloat(hourlyRateCents) / 100).toFixed(2)
  }
  else {
    return "??.??"
  }
}

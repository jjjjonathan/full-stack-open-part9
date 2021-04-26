const calculateBmi = (a: number, b: number) => {
  const bmi = ((b / a / a) * 10000)
  if (bmi < 18.5) {
    return 'Underweight'
  } else if (bmi < 25) {
    return 'Normal weight'
  } else if (bmi < 30) {
    return 'Overweight'
  } else {
    return 'Obese'
  }
}

console.log(calculateBmi(180, 74))
// height in cm, weight in kg
const calculateBmi = (a: number, b: number) => {
  const bmi = (b / a / a) * 10000;
  if (bmi < 18.5) {
    return 'Underweight';
  } else if (bmi < 25) {
    return 'Normal weight';
  } else if (bmi < 30) {
    return 'Overweight';
  } else {
    return 'Obese';
  }
};

const height = Number(process.argv[2]);
const weight = Number(process.argv[3]);

console.log(calculateBmi(height, weight));
// height in cm, weight in kg

export default calculateBmi;

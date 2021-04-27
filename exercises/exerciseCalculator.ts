interface ExerciseInfo {
  periodLength: number;
  trainingDays: number;
  success: boolean;
  rating: number;
  ratingDescription: string;
  target: number;
  average: number;
}

const calculateExercises = (
  targetHours: number,
  dailyExercise: Array<number>
): ExerciseInfo => {
  const average = dailyExercise.reduce((a, b) => a + b) / dailyExercise.length;
  const ratingDescriptions = [
    'not even close, do better next time!',
    'ehh, close enough',
    'goal met or exceeded! now your mother will love you',
  ];

  const percentOfTarget = average / targetHours;
  let rating;
  if (percentOfTarget < 0.75) {
    rating = 1;
  } else if (percentOfTarget < 1) {
    rating = 2;
  } else {
    rating = 3;
  }

  return {
    periodLength: dailyExercise.length,
    trainingDays: dailyExercise.filter((d) => d > 0).length,
    success: average >= targetHours,
    rating,
    ratingDescription: ratingDescriptions[rating - 1],
    target: targetHours,
    average,
  };
};

const targetHours: number = Number(process.argv[2]);
const dailyExercise: Array<number> = process.argv
  .slice(3)
  .map((n) => Number(n));

console.log(calculateExercises(targetHours, dailyExercise));

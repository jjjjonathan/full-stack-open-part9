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
  dailyExercise: Array<number>,
  targetHours: number
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

console.log(calculateExercises([3, 0, 2, 4.5, 0, 3, 1], 2));

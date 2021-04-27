import express from 'express';
import { calculateBmi } from './bmiCalculator';
import { calculateExercises } from './exerciseCalculator';

const app = express();
app.use(express.json());

app.get('/hello', (_req, res) => {
  res.send('Hello Full Stack!');
});

app.get('/bmi', (req, res) => {
  const height = Number(req.query.height);
  const weight = Number(req.query.weight);

  if (!height || !weight || isNaN(height) || isNaN(weight)) {
    res.json({
      error: 'Missing or faulty parameters',
    });
  }

  res.json({
    weight,
    height,
    bmi: calculateBmi(height, weight),
  });
});

app.post('/exercises', (request, response) => {
  interface ExerciseRequest {
    daily_exercises: Array<number>;
    target: number;
  }
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  const body: ExerciseRequest = request.body;

  if (!body.daily_exercises || !body.target) {
    response.json({
      error: 'parameters missing',
    });
  }

  if (
    typeof body.target !== 'number' ||
    isNaN(body.target) ||
    !Array.isArray(body.daily_exercises) ||
    body.daily_exercises.forEach((d) => typeof d !== 'number' || isNaN(d))
  ) {
    response.json({
      error: 'malformatted parameters',
    });
  }

  response.json(calculateExercises(body.target, body.daily_exercises));
});

const PORT = 3003;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

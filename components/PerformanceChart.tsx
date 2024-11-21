"use client";
import {
  Area,
  AreaChart,
  Tooltip,
  XAxis,
  YAxis,
  CartesianGrid,
  ResponsiveContainer
} from "recharts";
import { TrendingDown, TrendingUp } from "lucide-react";

export type ExerciceData = {
  date: string;
  weight: number | null;
  duration: number | null;
  sets: number;
  reps: number;
};

export type Ex = {
  workoutName: string;
  data: ExerciceData[];
};

function PerformanceChart({
                            exercices
                          }: {
  exercices: {
    workoutName: string;
    data: ExerciceData[];
  }[];
}) {
  //sort the data by date
  const exercises: {
    workoutName: string;
    data: ExerciceData[];
  }[] = exercices.map((exercise) => {
    return {
      workoutName: exercise.workoutName,
      data: exercise.data.sort((a, b) => {
        return new Date(a.date).getTime() - new Date(b.date).getTime();
      })
    };
  });

  function getPr(exercise: Ex) {
    return exercise.data.reduce((acc, curr) => {
      //if the weight is null or 0, we take the duration
      if (curr.weight === null || curr.weight === 0) {
        if (curr.duration && curr.duration > acc) {
          return curr.duration;
        }
        return acc;
      }
      if (curr.weight > acc) {
        return curr.weight;
      }
      return acc;
    }, 0);
  }

  //create a function to display if the performance is down or up and return the percentage
  function getPerformanceFromTheLastTwoWorkouts(exercise: Ex) {
    const dataLength = exercise.data.length;
    if (dataLength < 2) {
      return 0; // Not enough data to compare
    }

    const lastData = exercise.data[dataLength - 1];
    const secondLastData = exercise.data[dataLength - 2];

    if (lastData.weight !== null && secondLastData.weight !== null && lastData.weight !== 0) {
      return Math.round(
        ((lastData.weight - secondLastData.weight) / secondLastData.weight) *
        100
      );
    }

    if (lastData.duration !== null && secondLastData.duration !== null) {
      return Math.round(
        ((lastData.duration - secondLastData.duration) /
          secondLastData.duration) *
        100
      );
    }

    return 0; // No valid data to compare
  }

  //get the performance from the whole month (take the first and the last data of the current month)
  // function getPerformanceFromTheMonth(exercise: Ex) {
  //   const pr = getPr(exercise);
  //   const firstData = exercise.data[0];
  //   const lastData = exercise.data[exercise.data.length - 1];
  //   if (lastData.weight === null || lastData.weight === 0) {
  //     if (
  //       lastData.duration !== null &&
  //       firstData.duration !== null &&
  //       lastData.duration &&
  //       pr
  //     ) {
  //       return Math.round(
  //         ((lastData.duration - firstData.duration) / pr) * 100
  //       );
  //     }
  //     return 0;
  //   }
  //   if (pr && firstData.weight !== null) {
  //     return Math.round(((lastData.weight - firstData.weight) / pr) * 100);
  //   }
  //   return 0;
  // }

  return (
    <div className="grid grid-cols-1 space-y-12 py-12">
    {exercices.length === 0 && <p>Pas assez de données…</p>}
      {exercises.map((exercise) => (
        <div key={exercise.workoutName} className={"w-full"}>
          <div className="w-full">
            <h2 className="text-2xl font-bold pb-5">{exercise.workoutName}</h2>
            <ResponsiveContainer width="100%" height={300}>
              <AreaChart
                data={exercise.data}
                margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
              >
                <CartesianGrid strokeDasharray="3 3" vertical={false} />
                <XAxis
                  dataKey="date"
                  tickLine={false}
                  axisLine={false}
                  fontSize={10}
                  tickFormatter={(date) =>
                    new Date(date).toLocaleDateString(
                      "fr-FR", // Set locale to French
                      {
                        month: "2-digit",
                        day: "2-digit"
                      }
                    )
                  }
                />
                <YAxis fontSize={10} tickLine={false} axisLine={false} />
                {/* If weight = null or 0 then display area duration else display weight */}
                {exercise.data[0].weight === null ||
                exercise.data[0].weight === 0 ? (
                  <Area
                    type="monotone"
                    dataKey="duration"
                    stroke="#8884d8"
                    fill="url(#colorUv)"
                  />
                ) : (
                  <Area
                    type="monotone"
                    dataKey="weight"
                    stroke="#8884d8"
                    fill="url(#colorUv)"
                  />
                )}
                <Tooltip
                  content={({ payload }) => {
                    if (
                      !payload ||
                      payload.length === 0 ||
                      !payload[0].payload.date
                    ) {
                      return null;
                    }
                    return (
                      <div className="rounded bg-white p-3 text-sm shadow-md">
                        <p className="mb-2">
                          Le{" "}
                          {new Date(payload[0].payload.date).toLocaleDateString(
                            "fr-FR",
                            {
                              month: "short",
                              day: "2-digit"
                            }
                          )}
                        </p>
                        <p className="font-bold">
                          {exercise.data[0].weight === null ||
                          exercise.data[0].weight === 0
                            ? `Durée: ${payload[0].payload.duration} min`
                            : `Poids: ${payload[0].payload.weight} kg`}
                        </p>
                        <div className="flex gap-2">
                          <p className="">Séries: {payload[0].payload.sets}</p>
                          <p className="">Reps: {payload[0].payload.reps}</p>
                        </div>
                      </div>
                    );
                  }}
                />
                <defs>
                  <linearGradient id="colorUv" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#bfdbfe" stopOpacity={0.7} />
                    <stop offset="75%" stopColor="#3b82f6" stopOpacity={0.05} />
                  </linearGradient>
                </defs>
              </AreaChart>
            </ResponsiveContainer>
            <div className="flex items-start justify-center gap-5">
              <div>
                <h3 className="text-sm">PR: </h3>
                <p>
                  <span className="font-bold text-blue-500">
                    {getPr(exercise)}
                    {exercise.data[0].weight === null ||
                    exercise.data[0].weight === 0
                      ? "min"
                      : "kg"}
                  </span>
                </p>
              </div>
              <div>
                <h3 className="text-sm">Pogression (dernière séance): </h3>
                <p
                  className={`flex items-center gap-1 font-bold ${
                    getPerformanceFromTheLastTwoWorkouts(exercise) > 0
                      ? "text-green-500"
                      : getPerformanceFromTheLastTwoWorkouts(exercise) === 0
                        ? "text-gray-500"
                        : "text-red-500"
                  }`}
                >
                  {getPerformanceFromTheLastTwoWorkouts(exercise) > 0 ? (
                    <TrendingUp size={20} />
                  ) : getPerformanceFromTheLastTwoWorkouts(exercise) === 0 ? (
                    ""
                  ) : (
                    <TrendingDown size={20} />
                  )}
                  {getPerformanceFromTheLastTwoWorkouts(exercise)}%

                </p>
              </div>
            </div>
          </div>

        </div>
      ))}
    </div>
  );
}

export default PerformanceChart;

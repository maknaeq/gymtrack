import React from "react";
import { getUsers } from "@/actions/users";

async function Workout() {
  const users = await getUsers();
  return (
    <div>
      Workout
      <ul>
        {users.map((user) => (
          <li key={user.id}>
            {user.name} - {user.email}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Workout;

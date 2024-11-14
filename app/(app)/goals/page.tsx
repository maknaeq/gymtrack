import CreateGoal from "./components/CreateGoal";
import GoalList from "./components/GoalList";
import { auth } from "@/auth";
import { getUserByEmail } from "@/actions/users";

async function Goals() {
  const session = await auth();
  const user = await getUserByEmail(session?.user?.email as string);

  return (
    <>

      <div className="flex items-center justify-between">
        <h3 className={"text-xl"}>Retrouvez la liste de vos objectifs, {user?.name}!</h3>
        <CreateGoal user={user} />
      </div>
      <GoalList user={user} />
    </>
  );
}

export default Goals;

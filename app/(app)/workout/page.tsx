import { getUserByEmail } from "@/actions/users";
import { auth } from "@/auth";
import CalendarLayout from "@/components/CalendarLayout";

async function Workout() {
  const session = await auth();
  const user = await getUserByEmail(session?.user?.email as string);

  return (
    <div>
      <CalendarLayout user={user} />
    </div>
  );
}

export default Workout;

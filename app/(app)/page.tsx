import Button from "@/components/ui/Button";
import Link from "next/link";
import { auth } from "@/auth";

export default async function Home() {
  const session = await auth();
  const username =
    session?.user?.name &&
    session.user.name.charAt(0).toUpperCase() + session.user.name.slice(1);
  return (
    <div className="my-20 flex justify-center">
      <div className="mt-10 max-w-[900px] md:mt-10">
        {session?.user ? (
          <>
            <h1 className="text-5xl md:text-7xl">
              Bienvenue,{" "}
              <span className="font-semibold text-blue-500">{username}</span>
            </h1>
            <p>
              Choisissez une rubrique dans la barre de navigation pour avoir
              accès à vos données
            </p>
          </>
        ) : (
          <>
            <h1 className="text-center text-5xl md:text-6xl">
              <span className="text-blue-500">Doublez votre progression</span>{" "}
              et brisez la stagnation grâce à un{" "}
              <span className="text-blue-500">suivi sur mesure.</span>
            </h1>
            <p className="mt-3 text-center text-sm text-zinc-500/50">
              Des outils pour suivre, organiser et améliorer chaque séance
              d’entraînement.
            </p>
            <div className="flex w-full items-center justify-center py-10">
              <Link href={"/signup"}>
                <Button className="w-full md:w-fit">
                  Suivre mes entraînements
                </Button>
              </Link>
            </div>
          </>
        )}
      </div>

      {/* TODO: Mettre des images qui volent autour */}

      {/* <div className="h-[520px] w-[400px] overflow-hidden rounded-3xl">
        <Image src={LandingImage} alt="Landing page" />
      </div> */}
    </div>
  );
}

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
      <div className="mt-20 max-w-[680px]">
        {session ? (
          <h1 className="text-7xl">
            Bienvenue,{" "}
            <span className="font-semibold text-blue-500">{username}</span>
          </h1>
        ) : (
          <>
            <h1 className="text-7xl">
              Transformez vos{" "}
              <span className="font-semibold text-blue-500">efforts</span> en
              résultats{" "}
              <span className="font-semibold text-blue-500">mesurables</span>.
            </h1>
            <div className="mt-3 space-x-2">
              <Link href={"/signup"}>
                <Button>S&apos;inscrire</Button>
              </Link>
              <Link href={"/login"}>
                <Button variant="outline">Se connecter</Button>
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

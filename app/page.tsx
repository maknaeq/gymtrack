import Button from "@/components/ui/Button";
import LandingImage from "@/public/images/Landing-page.jpg";
import Image from "next/image";

export default function Home() {
  return (
    <div className="my-20 flex justify-center">
      <div className="mt-20 max-w-[680px]">
        <h1 className="text-7xl">
          Transformez vos{" "}
          <span className="font-semibold text-blue-500">efforts</span> en
          résultats{" "}
          <span className="font-semibold text-blue-500">mesurables</span>.
        </h1>
        <div className="mt-3 space-x-2">
          <Button>S&apos;inscrire</Button>
          <Button variant="outline">Se connecter</Button>
        </div>
      </div>
      {/* TODO: Mettre des images qui volent autour */}

      {/* <div className="h-[520px] w-[400px] overflow-hidden rounded-3xl">
        <Image src={LandingImage} alt="Landing page" />
      </div> */}
    </div>
  );
}

import Button from "@/components/ui/Button";

export default function Home() {
  return (
    <div>
      <h1 className="mt-20 max-w-[680px] text-7xl md:mx-auto">
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
  );
}

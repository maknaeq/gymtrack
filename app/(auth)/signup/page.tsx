"use client";
import { login, register } from "@/actions/users";
import Button from "@/components/ui/Button";
import {
  ArrowLeftIcon,
  EyeClosedIcon,
  EyeOpenIcon,
} from "@radix-ui/react-icons";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

function SignIn() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    setIsLoading(true);
    setError(null);
    try {
      await register(formData);
      await login(formData);
      router.push("/sessions");
    } catch (e) {
      setError("Email ou mot de passe incorrect");
      console.error(e);
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <div className="flex h-screen items-center justify-center bg-slate-50/30">
      <form
        className="form-control mx-auto min-w-96 max-w-sm rounded-xl bg-white p-8 shadow-sm"
        onSubmit={handleSubmit}
      >
        <Link
          href={"/"}
          className="mb-5 flex items-center gap-1 text-sm underline-offset-2 hover:underline"
        >
          <ArrowLeftIcon /> Revenir à la page d&apos;accueil
        </Link>
        <h1 className="text-3xl">S&apos;inscrire</h1>
        <div className="label flex flex-col items-start">
          <label htmlFor="name" className="text-label">
            Nom d&apos;utilisateur
          </label>
          <input
            type="text"
            id="name"
            name="name"
            className="input input-bordered w-full"
          />
        </div>
        <div className="label flex flex-col items-start">
          <label htmlFor="email" className="text-label">
            Email
          </label>
          <input
            type="email"
            id="email"
            name="email"
            className="input input-bordered w-full"
          />
        </div>
        <label htmlFor="password" className="">
          <div className="label">
            <span className="label-text">Mot de passe</span>
          </div>
          <div className="input input-bordered flex w-full items-center">
            <input
              type={isPasswordVisible ? "text" : "password"}
              id="password"
              name="password"
              className="grow"
            />
            {isPasswordVisible ? (
              <EyeOpenIcon
                onClick={() => setIsPasswordVisible((val) => !val)}
                className="cursor-pointer"
              />
            ) : (
              <EyeClosedIcon
                onClick={() => setIsPasswordVisible((val) => !val)}
                className="cursor-pointer"
              />
            )}
          </div>
        </label>
        {error && <p className="text-sm text-red-500">{error}</p>}

        <div className="mt-3 flex flex-col space-y-2">
          <Button type="submit" disabled={isLoading}>
            {isLoading ? "Inscription..." : "S'inscrire"}
          </Button>
          <p className="text-sm">
            Vous avez déjà un compte?{" "}
            <Link
              href={"/login"}
              className="text-blue-500 underline-offset-2 hover:underline"
            >
              {" "}
              Connectez-vous
            </Link>
          </p>
        </div>
      </form>
    </div>
  );
}

export default SignIn;

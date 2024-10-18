"use server";
import { signIn } from "@/auth";
import { db } from "@/lib/db";
import { hash } from "bcryptjs";

export async function register(formData: FormData) {
  const name = formData.get("name") as string;
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;

  const hashedPassword = await hash(password, 10);

  if (!name || !email || !password) {
    throw new Error("Champs manquants");
  }

  const existingUser = await db.user.findUnique({ where: { email } });
  if (existingUser) throw new Error("Utilisateur déjà enregistré");

  await db.user.create({
    data: {
      name,
      email,
      password: hashedPassword,
    },
  });
}

export async function login(formData: FormData) {
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;

  try {
    const res = await signIn("credentials", {
      email,
      password,
      redirect: false,
    });
    return res;
  } catch (error) {
    return error;
  }
}

export async function getUsers() {
  return await db.user.findMany();
}

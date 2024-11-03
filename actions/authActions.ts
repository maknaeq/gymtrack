"use server";

import { signOut } from "@/auth";

export async function signOutThenRedirect() {
  return await signOut({ redirectTo: "/" });
}

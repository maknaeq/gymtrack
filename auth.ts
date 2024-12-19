import NextAuth, { CredentialsSignin } from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { PrismaAdapter } from "@auth/prisma-adapter";
import { db } from "@/lib/db";
import { compare } from "bcryptjs";

export const { handlers, auth, signIn, signOut } = NextAuth({
  trustHost: true,
  adapter: PrismaAdapter(db),
  session: {
    strategy: "jwt",
  },
  providers: [
    Credentials({
      name: "Credentials",

      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Mot de passe", type: "password" },
      },

      authorize: async (credentials) => {
        const email = credentials.email as string | undefined;
        const password = credentials.password as string | undefined;

        if (!email || !password)
          throw new CredentialsSignin("Renseignez tous les champs");

        const user = await db.user.findUnique({ where: { email } });
        if (!user) return null;

        if (!user.password) return null;

        const passwordsMatch = await compare(password, user.password);
        if (!passwordsMatch) return null;
        if (passwordsMatch) return user;

        return null;
      },
    }),
  ],
  pages: {
    signIn: "/login",
  },
});

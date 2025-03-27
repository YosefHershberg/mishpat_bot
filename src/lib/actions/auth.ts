"use server";

import { signIn, signOut } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export const getUsers = async () => {
    return prisma.user.findMany();
}

export const login = async () => {
    await signIn("google", { redirectTo: "/" });
};

export const logout = async () => {
    await signOut({ redirectTo: "/" });
};

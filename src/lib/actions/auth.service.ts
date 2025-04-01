"use server";

import { signIn, signOut } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export const getUsers = async () => {
    return await prisma.user.findMany();
}

export const login = async () => {
    return await signIn("google", { redirectTo: "/" });
};

export const logout = async () => {
    return await signOut({ redirectTo: "/" });
};

import { User } from "@prisma/client";
import client from "./client";

export const userQuery = {
  loginUser: (
    uid: string,
    displayName: string,
    photoURL: string,
    email: string
  ): User =>
    client.user.upsert({
      where: {
        uid,
      },
      update: {
        lastLogin: new Date(),
      },
      create: {
        uid,
        displayName,
        photoURL,
        email,
      },
    }),
  getCurrentUser: (id: number): User =>
    client.user.findUnique({
      where: { id },
    }),
};

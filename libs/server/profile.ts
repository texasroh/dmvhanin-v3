import { Business } from "@prisma/client";
import client from "./client";

export const profileQuery = {
  getBusinesses: (uid: string): Business[] =>
    client.business.findMany({
      where: {
        user: {
          uid,
        },
      },
    }),
};

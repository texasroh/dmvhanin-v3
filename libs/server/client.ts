import { Business, PrismaClient } from "@prisma/client";
import {
  DynamicClientExtensionThis,
  TypeMapCbDef,
  TypeMapDef,
} from "@prisma/client/runtime/library";

declare global {
  var client:
    | DynamicClientExtensionThis<TypeMapDef, TypeMapCbDef, any>
    | PrismaClient
    | undefined;
}

const client =
  global.client ||
  new PrismaClient<any, any, any>().$extends({
    name: "aveRating",
    result: {
      business: {
        avgRating: {
          needs: {
            totalRating: true,
            totalReview: true,
          },
          compute: (business: Business) =>
            business.totalReview === 0
              ? 0
              : business.totalRating / business.totalReview,
        },
      },
    },
  }); //{ log: ["query"|"info"|"warn"|"error"] });

if (process.env.NODE_ENV === "development") {
  global.client = client;
}

export default client;

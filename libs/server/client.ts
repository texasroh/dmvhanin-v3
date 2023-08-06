import { PrismaClient } from "@prisma/client";
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

const client = global.client || new PrismaClient<any, any, any>();

if (process.env.NODE_ENV === "development") {
  global.client = client;
}

export default client;

import client from "./client";

export const categoryQuery = {
  getCategory: () => client.businessCategory.findMany(),
  getSubcategory: () =>
    client.businessSubcategory.findMany({
      select: {
        id: true,
        name: true,
        businessCategory: {
          select: { key: true },
        },
      },
    }),
};

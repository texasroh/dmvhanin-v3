import client from "./client";

export const fleamarketQuery = {
  getContentList: (category?: string, page: number = 1) =>
    client.fleaMarketProduct.findMany({
      select: {
        id: true,
        title: true,
        category: {
          select: {
            name: true,
          },
        },
        images: {
          select: {
            url: true,
          },
          orderBy: {
            sort: "asc",
          },
          take: 1,
        },
      },
      where: {
        ...(category && {
          category: {
            name: category,
          },
        }),
      },
    }),
  getCategoryList: () => client.fleaMarketCategory.findMany(),
  getMyProducts: (uid: string) =>
    client.fleaMarketProduct.findMany({
      where: {
        seller: { uid },
      },
    }),
};

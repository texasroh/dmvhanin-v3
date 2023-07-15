import { BUSINESS_PER_PAGE } from "@/constants/numbers";
import { BusinessReview, User } from "@prisma/client";
import client from "./client";

export interface ExtendedBusinessReview extends BusinessReview {
  user: User;
}

export const businessQuery = {
  getBusiness: (uuid: string) =>
    client.business.findUnique({
      include: {
        businessImages: true,
        businessSubcategory: true,
      },
      where: {
        uuid,
      },
    }),
  getBusinesses: (category: string, page: number) =>
    client.business.findMany({
      select: {
        titleKor: true,
        titleEng: true,
        uuid: true,
        logoImageId: true,
        description: true,
        city: true,
        state: true,
        totalRating: true,
        totalReview: true,
        avgRating: true,
        businessSubcategory: {
          select: {
            name: true,
          },
        },
      },
      orderBy: [
        {
          avgRating: "desc",
        },
        {
          totalReview: "desc",
        },
        {
          updatedAt: "desc",
        },
        {
          id: "asc",
        },
      ],
      where: {
        businessSubcategory: {
          businessCategory: {
            key: category + "",
          },
        },
      },
      take: BUSINESS_PER_PAGE,
      skip: (page - 1) * BUSINESS_PER_PAGE,
    }),
  getTotalBusinessCount: (category: string) =>
    client.business.count({
      where: {
        businessSubcategory: {
          businessCategory: {
            key: category + "",
          },
        },
      },
    }),
  getReviews: (uuid: string) =>
    client.businessReview.findMany({
      select: {
        createdAt: true,
        updatedAt: true,
        rawContent: true,
        rating: true,
        user: {
          select: {
            displayName: true,
            photoURL: true,
            uid: true,
          },
        },
      },
      where: {
        business: {
          uuid,
        },
      },
      orderBy: {
        id: "desc",
      },
    }),
  postBusinessReview: (
    uid: string,
    uuid: string,
    rawContent: string,
    rating: number
  ) =>
    client.businessReview.create({
      data: {
        user: {
          connect: {
            uid,
          },
        },
        rawContent,
        rating,
        business: {
          connect: {
            uuid,
          },
        },
      },
    }),
};

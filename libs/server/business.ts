import { BUSINESS_PER_PAGE } from "@/constants/numbers";
import {
  Business,
  BusinessCategory,
  BusinessImage,
  BusinessReview,
  BusinessSubcategory,
  Prisma,
  User,
} from "@prisma/client";
import { v4 as uuidv4 } from "uuid";
import { charNumOnly } from "../common/utils";
import client from "./client";

export interface ExtendedBusinessReview extends BusinessReview {
  user: User;
}

interface BusinessSubcategoryWithCategory extends BusinessSubcategory {
  businessCategory: BusinessCategory;
}
export interface GetDetailBusiness extends Business {
  businessImage: BusinessImage[];
  businessSubcategory: BusinessSubcategoryWithCategory;
}

export const businessQuery = {
  getBusiness: (uuid: string) =>
    client.business.findUnique({
      include: {
        businessImages: true,
        businessSubcategory: {
          include: {
            businessCategory: true,
          },
        },
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
        avgRating: true,
        totalRating: true,
        totalReview: true,
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
  postBusiness: async (
    uid: string,
    titleKor: string,
    titleEng: string,
    businessSubcategory: number,
    description: string | null,
    address: string | null,
    city: string | null,
    state: string | null,
    zipcode: string | null,
    phone: string | null,
    email: string | null,
    website: string | null
  ) => {
    let uuid;
    let business;
    do {
      uuid = charNumOnly(uuidv4());
      business = await client.business.findUnique({
        select: {
          id: true,
        },
        where: {
          uuid,
        },
      });
    } while (business);
    return client.business.create({
      data: {
        uuid,
        titleKor,
        titleEng,
        businessSubcategory: { connect: { id: businessSubcategory } },
        description,
        address: address || null,
        city: city || null,
        state: state || null,
        zipcode: zipcode || null,
        phone: phone || null,
        email: email || null,
        website: website || null,
        user: { connect: { uid } },
      },
    });
  },
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
        id: true,
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
    client.$transaction(async (tx: Prisma.TransactionClient) => {
      await tx.businessReview.create({
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
      });

      const businessReviews = await tx.businessReview.findMany({
        where: {
          business: {
            uuid,
          },
        },
      });

      const totalReview = businessReviews.length;
      const totalRating = businessReviews.reduce(
        (acc, review) => acc + review.rating,
        0
      );
      const avgRating = totalRating / totalReview || 0;

      await tx.business.update({
        where: { uuid },
        data: {
          totalReview,
          totalRating,
          avgRating,
        },
      });
    }),
};

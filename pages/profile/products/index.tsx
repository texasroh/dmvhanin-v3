import Button from "@/components/button";
import {
  MAIN_PAGE,
  MY_PRODUCT_PAGE,
  MY_PRODUCT_UPLOAD_PAGE,
} from "@/constants/urls";
import { fleamarketQuery } from "@/libs/server/fleamarket";
import { withSsrSession } from "@/libs/server/withSession";
import { FleaMarketProduct } from "@prisma/client";
import { GetServerSidePropsContext } from "next";
import Link from "next/link";
import { sprintf } from "sprintf-js";

interface MyProductsProps {
  products: FleaMarketProduct[];
}

const MyProducts = ({ products }: MyProductsProps) => {
  return (
    <div>
      <div className="flex items-center justify-between">
        <h1 className="text-lg font-medium">내 물건</h1>

        <div>
          <Link href={MY_PRODUCT_UPLOAD_PAGE}>
            <Button.White className="px-4">+ New</Button.White>
          </Link>
        </div>
      </div>
      <div className="mt-2 space-y-2">
        {products.map((product, idx) => (
          <Link key={idx} href={sprintf(MY_PRODUCT_PAGE, product.uuid)}>
            <div className="rounded border border-gray-300 px-4 py-2">
              {product.title}
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default MyProducts;

export const getServerSideProps = withSsrSession(
  async ({
    req: {
      session: { user },
    },
  }: GetServerSidePropsContext) => {
    const uid = user?.uid;
    if (!uid) {
      return {
        redirect: {
          destination: MAIN_PAGE,
        },
      };
    }

    const products = await fleamarketQuery.getMyProducts(uid);

    return {
      props: {
        products: JSON.parse(JSON.stringify(products)),
      },
    };
  }
);

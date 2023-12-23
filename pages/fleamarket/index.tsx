import { fleamarketQuery } from "@/libs/server/fleamarket";
import { GetServerSidePropsContext } from "next";

interface FleaMarketProps {
  products: [];
}

const FleaMarket = ({ products }: FleaMarketProps) => {
  return <div>FleaMarket</div>;
};

export default FleaMarket;

export const getServerSideProps = async ({
  query: { category },
}: GetServerSidePropsContext) => {
  const products = await fleamarketQuery.getContentList(category + "");
  return { props: { products } };
};

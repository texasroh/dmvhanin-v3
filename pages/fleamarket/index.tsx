import { NextPageContext } from "next";

const FleaMarket = () => {
  return <div>FleaMarket</div>;
};

export default FleaMarket;

export const getServerSideProps = (context: NextPageContext) => {
  return { props: {} };
};

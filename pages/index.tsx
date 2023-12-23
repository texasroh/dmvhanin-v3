import { BUSINESS_MAIN_PAGE } from "@/constants/urls";
import { GetServerSidePropsContext } from "next";

const Home = () => {
  return <h1 className="h-screen bg-blue-200">Hello world</h1>;
};

export const getServerSideProps = (context: GetServerSidePropsContext) => {
  return {
    redirect: {
      destination: BUSINESS_MAIN_PAGE,
    },
  };
};

export default Home;

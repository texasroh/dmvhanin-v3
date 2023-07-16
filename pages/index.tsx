import { NextPageContext } from "next";

const Home = () => {
  return <h1 className="h-screen bg-blue-200">Hello world</h1>;
};

export const getServerSideProps = (context: NextPageContext) => {
  return {
    redirect: {
      destination: "/businesses",
    },
  };
};

export default Home;

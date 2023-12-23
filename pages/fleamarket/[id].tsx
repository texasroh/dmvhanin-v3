import { GetServerSidePropsContext } from "next";

const test = () => {
  return <div>Hello</div>;
};

export default test;

export const getServerSideProps = (context: GetServerSidePropsContext) => {
  console.log(context);
  context.params;
  return {
    props: {},
  };
};

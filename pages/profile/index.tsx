import Avatar from "@/components/avatar";
import Button from "@/components/button";
import Input from "@/components/input";
import { ROOT_URL } from "@/constants/urls";
import { userQuery } from "@/libs/server/user";
import { withSsrSession } from "@/libs/server/withSession";
import { User } from "@prisma/client";
import { NextPageContext } from "next";
import { useForm } from "react-hook-form";

interface ProfileFormVariable {
  displayName: string;
}

interface ProfileProps {
  user: User;
}

const Profile = ({ user }: ProfileProps) => {
  const { register, handleSubmit, reset, setValue } =
    useForm<ProfileFormVariable>({
      defaultValues: { displayName: user.displayName },
    });

  const onSubmit = (data: ProfileFormVariable) => {
    console.log(data);
  };

  return (
    <div className="space-y-8">
      <div className="space-y-4 py-8">
        <div>프로필</div>
        <Avatar
          photoURL={user?.photoURL || ""}
          alt={user?.displayName || ""}
          size="large"
        />
        <div>{user?.displayName}</div>
        <form className="flex space-x-2" onSubmit={handleSubmit(onSubmit)}>
          <div className="w-full md:w-1/2">
            <Input label="Display Name" {...register("displayName")} />
          </div>
          <div>
            <Button.White className="border-0 px-4">Save</Button.White>
          </div>
        </form>
        <div>{user?.email}</div>
      </div>
      {/* <div className="py-8">Delete Account</div> */}
    </div>
  );
};

export default Profile;

export const getServerSideProps = withSsrSession(
  async ({ req }: NextPageContext) => {
    const userId = req?.session.user?.id;
    if (!userId)
      return {
        redirect: {
          destination: ROOT_URL,
        },
      };
    const user = await userQuery.getCurrentUser(userId);
    console.log(user);
    return {
      props: { user: JSON.parse(JSON.stringify(user)) },
    };
  }
);

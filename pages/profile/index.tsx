import Avatar from "@/components/avatar";
import Button from "@/components/button";
import Input from "@/components/input";
import LoadingSpinner from "@/components/loadingSpinner";
import { ROOT_URL } from "@/constants/urls";
import { profileAPI } from "@/libs/client/api/profile";
import { userQuery } from "@/libs/server/user";
import { withSsrSession } from "@/libs/server/withSession";
import { User } from "@prisma/client";
import { useMutation } from "@tanstack/react-query";
import { NextPageContext } from "next";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";

interface ProfileFormVariable {
  displayName: string;
}

interface ProfileProps {
  user: User;
}

const Profile = ({ user }: ProfileProps) => {
  const defaultValues = { displayName: user.displayName };
  const {
    register,
    handleSubmit,
    formState: { isDirty },
    reset,
  } = useForm<ProfileFormVariable>({
    defaultValues,
  });

  const { mutate, isLoading: isMutating } = useMutation(
    profileAPI.patchProfile,
    {
      onSuccess: () => {
        toast.success("Profile Updated!");
      },
      onError: () => {},
    }
  );

  const onSubmit = (data: ProfileFormVariable) => {
    mutate(data, {
      onSuccess: () => reset(data),
    });
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
            <Input
              label="Display Name"
              {...register("displayName")}
              value={defaultValues.displayName}
            />
          </div>
          <div>
            <Button.White
              className="border-0 px-4"
              disabled={isMutating || !isDirty}
            >
              {isMutating ? <LoadingSpinner /> : "Save"}
            </Button.White>
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
    return {
      props: { user: JSON.parse(JSON.stringify(user)) },
    };
  }
);

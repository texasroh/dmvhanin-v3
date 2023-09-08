import Avatar from "@/components/avatar";
import { useUser } from "@/hooks/useUser";

const Profile = () => {
  const { user } = useUser();
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
        <div>{user?.email}</div>
      </div>
      {/* <div className="py-8">Delete Account</div> */}
    </div>
  );
};

export default Profile;

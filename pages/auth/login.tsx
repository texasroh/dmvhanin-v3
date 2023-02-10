import { actionCodeSettings, auth } from "@/\bfirebase/auth";
import Button from "@/components/button";
import Input from "@/components/input";
import { sendSignInLinkToEmail } from "firebase/auth";
import { useForm } from "react-hook-form";
import { FaGooglePlusG } from "react-icons/fa";
import { RiKakaoTalkFill } from "react-icons/ri";

interface ILoginForm {
  email: string;
}
const Login = () => {
  const formObj = useForm<ILoginForm>();

  const onSubmit = ({ email }: ILoginForm) => {
    console.log(email);
    sendSignInLinkToEmail(auth, email, actionCodeSettings)
      .then(() => localStorage.setItem("emailForSignIn", email))
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
      });
  };

  return (
    <div className="mx-auto max-w-[400px]">
      <h1 className="text-center text-xl font-medium">로그인하기</h1>
      <p className="my-12 text-center text-sm">
        로그인 하시고 다양한 서비스를 이용하세요
      </p>
      <form onSubmit={formObj.handleSubmit(onSubmit)}>
        <div className="space-y-4">
          <Input formObj={formObj} name="email" label="Email" type="email" />
          <div className="overflow-hidden rounded-full">
            <Button title="Continue with email" />
          </div>
        </div>
      </form>

      <div className="relative my-12 flex justify-center border-t border-gray-400">
        <span className="relative -top-3 bg-white px-3 text-sm font-medium text-gray-400">
          or
        </span>
      </div>
      <div className="-mt-8 flex justify-center space-x-6">
        <div className="rounded-full bg-red-500 p-2">
          <FaGooglePlusG color="white" size={30} />
        </div>
        <div className="rounded-full bg-yellow-400 p-2">
          <RiKakaoTalkFill size={30} />
        </div>
      </div>
    </div>
  );
};

export default Login;

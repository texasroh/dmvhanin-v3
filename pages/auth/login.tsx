import Button from "@/components/button";
import Input from "@/components/input";
import { useUser } from "@/hooks/useUser";
import { sendSignInEmail, signInWithGoogle } from "@/libs/client/auth";
import { useSearchParams } from "next/navigation";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { FaGooglePlusG } from "react-icons/fa";

interface ILoginForm {
  email: string;
}
const Login = () => {
  const [loading, setLoading] = useState(false);
  const { setUser } = useUser();
  const {
    register,
    formState: { isSubmitting, isValid },
    handleSubmit,
  } = useForm<ILoginForm>();
  const { user } = useUser();
  const router = useRouter();
  const searchParam = useSearchParams();

  useEffect(() => {
    if (user) {
      router.replace(searchParam.get("from") ?? "/");
    }
  }, [user, router]);

  const onSubmit = ({ email }: ILoginForm) => {
    if (isSubmitting) return;

    sendSignInEmail(email);
  };

  const googleLogin = () => {
    setLoading(true);
    signInWithGoogle()
      .then((response) => setUser(response.userInfo))
      .finally(() => setLoading(false));
  };

  return loading ? (
    <div>Logging in..</div>
  ) : (
    <div className="mx-auto max-w-[400px]">
      <h1 className="text-center text-xl font-medium">로그인하기</h1>
      <p className="my-12 text-center text-sm">
        로그인 하시고 다양한 서비스를 이용하세요
      </p>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="space-y-4">
          <Input label="Email" {...register("email")} type="email" id="email" />
          <div className="overflow-hidden rounded-full">
            <Button>Continue with email</Button>
          </div>
        </div>
      </form>

      <div className="relative my-12 flex justify-center border-t border-gray-400">
        <span className="relative -top-3 bg-white px-3 text-sm font-medium text-gray-400">
          or
        </span>
      </div>
      <div className="-mt-8 flex justify-center space-x-6">
        <div
          className="cursor-pointer rounded-full bg-red-500 p-2"
          onClick={googleLogin}
        >
          <FaGooglePlusG color="white" size={30} />
        </div>
        {/* <div className="rounded-full bg-yellow-400 p-2">
          <RiKakaoTalkFill size={30} />
        </div> */}
      </div>
    </div>
  );
};

export default Login;

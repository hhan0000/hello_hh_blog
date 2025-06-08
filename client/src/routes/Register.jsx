import { SignUp } from "@clerk/clerk-react";

const Register = () => {
  return (
    <div className="flex items-center justify-center  h-[calc(100vh-80px)] ">
      <SignUp signInUrl="/login"></SignUp>
    </div>
  );
};

export default Register;

import ForgotpasswordExample from "@/components/library/auth-form/examples/forget-password";
import ResetpasswordExample from "@/components/library/auth-form/examples/reset-password";
import SigninExample from "@/components/library/auth-form/examples/signin";
import SignUpExample from "@/components/library/auth-form/examples/signup";

function page() {
  return (
    <div className="mx-auto flex gap-2">
      <SigninExample />
      <SignUpExample />
      <ResetpasswordExample />
      <ForgotpasswordExample />
    </div>
  );
}

export default page;

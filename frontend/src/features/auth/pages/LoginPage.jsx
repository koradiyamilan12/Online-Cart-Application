import LoginForm from "@/features/auth/components/LoginForm";
import AuthLayout from "@/features/auth/components/AuthLayout";

function LoginPage() {
  return (
    <AuthLayout
      description="Sign in to continue to your account and manage your online shopping experience."
      title="Welcome back"
    >
      <LoginForm />
    </AuthLayout>
  );
}

export default LoginPage;

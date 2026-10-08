import RegisterForm from "@/features/auth/components/RegisterForm";
import AuthLayout from "@/features/auth/components/AuthLayout";

function RegisterPage() {
  return (
    <AuthLayout
      description="Create your account to access your cart, profile, and your upcoming purchases."
      title="Create your account"
    >
      <RegisterForm />
    </AuthLayout>
  );
}

export default RegisterPage;

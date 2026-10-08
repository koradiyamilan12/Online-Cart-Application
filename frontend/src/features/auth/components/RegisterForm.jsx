import { ErrorMessage, Field, Form, Formik } from "formik";
import { FiArrowRight, FiLock, FiMail, FiUser } from "react-icons/fi";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ROUTES } from "@/constants/routes";
import { registerSchema } from "@/features/auth/schemas/auth.schema";
import { registerUser } from "@/store/slices/authSlice";

const initialValues = {
  name: "",
  email: "",
  password: "",
  confirmPassword: "",
};

function RegisterForm() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = async (values, { setSubmitting, setStatus }) => {
    const result = await dispatch(registerUser(values));

    if (registerUser.fulfilled.match(result)) {
      navigate(ROUTES.DASHBOARD, { replace: true });
      return;
    }

    setStatus(result.payload || "Unable to create your account. Please try again.");
    setSubmitting(false);
  };

  return (
    <Formik initialValues={initialValues} onSubmit={handleSubmit} validationSchema={registerSchema}>
      {({ isSubmitting, status, touched, errors }) => (
        <Form className="space-y-5">
          {status ? (
            <div className="rounded-md border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-700">{status}</div>
          ) : null}

          <div className="space-y-2">
            <label className="text-sm font-medium text-slate-700" htmlFor="name">
              Full name
            </label>
            <div className="relative">
              <FiUser aria-hidden="true" className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-slate-400" />
              <Field
                as={Input}
                className={touched.name && errors.name ? "border-red-300 pl-10" : "pl-10"}
                id="name"
                name="name"
                placeholder="Priya Shah"
                type="text"
              />
            </div>
            <ErrorMessage className="text-sm text-red-600" component="p" name="name" />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-slate-700" htmlFor="email">
              Email address
            </label>
            <div className="relative">
              <FiMail aria-hidden="true" className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-slate-400" />
              <Field
                as={Input}
                className={touched.email && errors.email ? "border-red-300 pl-10" : "pl-10"}
                id="email"
                name="email"
                placeholder="you@example.com"
                type="email"
              />
            </div>
            <ErrorMessage className="text-sm text-red-600" component="p" name="email" />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-slate-700" htmlFor="password">
              Password
            </label>
            <div className="relative">
              <FiLock aria-hidden="true" className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-slate-400" />
              <Field
                as={Input}
                className={touched.password && errors.password ? "border-red-300 pl-10" : "pl-10"}
                id="password"
                name="password"
                placeholder="Create a strong password"
                type="password"
              />
            </div>
            <ErrorMessage className="text-sm text-red-600" component="p" name="password" />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-slate-700" htmlFor="confirmPassword">
              Confirm password
            </label>
            <div className="relative">
              <FiLock aria-hidden="true" className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-slate-400" />
              <Field
                as={Input}
                className={touched.confirmPassword && errors.confirmPassword ? "border-red-300 pl-10" : "pl-10"}
                id="confirmPassword"
                name="confirmPassword"
                placeholder="Re-enter your password"
                type="password"
              />
            </div>
            <ErrorMessage className="text-sm text-red-600" component="p" name="confirmPassword" />
          </div>

          <Button className="w-full" disabled={isSubmitting} type="submit">
            {isSubmitting ? "Creating account..." : "Create account"}
            {!isSubmitting ? <FiArrowRight aria-hidden="true" className="size-4" /> : null}
          </Button>

          <p className="text-center text-sm text-slate-600">
            Already have an account?{" "}
            <Link className="font-medium text-indigo-600 hover:text-indigo-500" to={ROUTES.LOGIN}>
              Sign in
            </Link>
          </p>
        </Form>
      )}
    </Formik>
  );
}

export default RegisterForm;

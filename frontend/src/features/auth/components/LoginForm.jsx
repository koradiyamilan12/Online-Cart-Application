import { ErrorMessage, Field, Form, Formik } from "formik";
import { FiAlertCircle, FiArrowRight, FiLock, FiMail } from "react-icons/fi";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import toast from "react-hot-toast";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ROUTES } from "@/constants/routes";
import { loginSchema } from "@/features/auth/schemas/auth.schema";
import { loginUser } from "@/store/slices/authSlice";
import FocusFirstError from "./FocusFirstError";

const initialValues = { email: "", password: "" };

function LoginForm() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const handleSubmit = async (values, { setSubmitting, setStatus }) => {
    const result = await dispatch(loginUser(values));

    if (loginUser.fulfilled.match(result)) {
      toast.success("Welcome back!");
      const redirectTo = location.state?.from?.pathname || ROUTES.DASHBOARD;
      navigate(redirectTo, { replace: true });
      return;
    }

    const message = "Unable to sign in. Please check your credentials.";
    setStatus(message);
    toast.error(message);
    setSubmitting(false);
  };

  return (
    <Formik
      initialValues={initialValues}
      onSubmit={handleSubmit}
      validationSchema={loginSchema}
    >
      {({ isSubmitting, status, touched, errors }) => (
        <Form className="space-y-5" noValidate>
          <FocusFirstError />
          {status ? (
            <div
              className="flex items-start gap-2.5 rounded-xl border border-red-200 bg-red-50 p-3.5 text-sm leading-6 text-red-800"
              role="alert"
            >
              <FiAlertCircle
                aria-hidden="true"
                className="mt-1 size-4 shrink-0"
              />
              <p>{status}</p>
            </div>
          ) : null}

          <div className="space-y-2">
            <label
              className="text-sm font-medium text-slate-700"
              htmlFor="email"
            >
              Email address
            </label>
            <div className="relative">
              <FiMail
                aria-hidden="true"
                className="pointer-events-none absolute left-3.5 top-1/2 size-4 -translate-y-1/2 text-slate-400"
              />
              <Field
                aria-describedby={
                  touched.email && errors.email ? "email-error" : undefined
                }
                aria-invalid={Boolean(touched.email && errors.email)}
                as={Input}
                autoComplete="email"
                className={
                  touched.email && errors.email
                    ? "border-red-300 pl-10 focus:border-red-500 focus:ring-red-500/10"
                    : "pl-10"
                }
                id="email"
                name="email"
                required
                placeholder="you@example.com"
                type="email"
              />
            </div>
            <ErrorMessage
              className="text-sm text-red-700"
              component="p"
              id="email-error"
              name="email"
              role="alert"
            />
          </div>

          <div className="space-y-2">
            <label
              className="text-sm font-medium text-slate-700"
              htmlFor="password"
            >
              Password
            </label>
            <div className="relative">
              <FiLock
                aria-hidden="true"
                className="pointer-events-none absolute left-3.5 top-1/2 size-4 -translate-y-1/2 text-slate-400"
              />
              <Field
                aria-describedby={
                  touched.password && errors.password
                    ? "password-error"
                    : undefined
                }
                aria-invalid={Boolean(touched.password && errors.password)}
                as={Input}
                autoComplete="current-password"
                className={
                  touched.password && errors.password
                    ? "border-red-300 pl-10 focus:border-red-500 focus:ring-red-500/10"
                    : "pl-10"
                }
                id="password"
                name="password"
                required
                placeholder="Enter your password"
                type="password"
              />
            </div>
            <ErrorMessage
              className="text-sm text-red-700"
              component="p"
              id="password-error"
              name="password"
              role="alert"
            />
          </div>

          <Button
            className="w-full"
            loading={isSubmitting}
            loadingText="Signing in…"
            type="submit"
            size="lg"
          >
            Sign in
            <FiArrowRight aria-hidden="true" className="size-4" />
          </Button>

          <p className="text-center text-sm text-slate-600">
            New here?{" "}
            <Link
              className="font-semibold text-brand-700 underline-offset-4 hover:underline"
              to={ROUTES.REGISTER}
            >
              Create an account
            </Link>
          </p>
        </Form>
      )}
    </Formik>
  );
}

export default LoginForm;

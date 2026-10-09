import { ErrorMessage, Field, Form, Formik } from "formik";
import { useState } from "react";
import {
  FiAlertCircle,
  FiArrowRight,
  FiEye,
  FiEyeOff,
  FiLock,
  FiMail,
  FiUser,
} from "react-icons/fi";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import toast from "react-hot-toast";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ROUTES } from "@/constants/routes";
import { registerSchema } from "@/features/auth/schemas/auth.schema";
import { registerUser } from "@/store/slices/authSlice";
import FocusFirstError from "./FocusFirstError";

const initialValues = {
  name: "",
  email: "",
  password: "",
  confirmPassword: "",
};

function RegisterForm() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [confirmPasswordVisible, setConfirmPasswordVisible] = useState(false);

  const handleSubmit = async (values, { setSubmitting, setStatus }) => {
    const result = await dispatch(registerUser(values));

    if (registerUser.fulfilled.match(result)) {
      toast.success("Account created successfully!");
      navigate(ROUTES.DASHBOARD, { replace: true });
      return;
    }

    const message = "Unable to create your account. Please try again.";
    setStatus(message);
    toast.error(message);
    setSubmitting(false);
  };

  return (
    <Formik
      initialValues={initialValues}
      onSubmit={handleSubmit}
      validationSchema={registerSchema}
    >
      {({ isSubmitting, status, touched, errors }) => (
        <Form className="space-y-4" noValidate>
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
              htmlFor="name"
            >
              Full name
            </label>
            <div className="relative">
              <FiUser
                aria-hidden="true"
                className="pointer-events-none absolute left-3.5 top-1/2 size-4 -translate-y-1/2 text-slate-400"
              />
              <Field
                aria-describedby={
                  touched.name && errors.name ? "name-error" : undefined
                }
                aria-invalid={Boolean(touched.name && errors.name)}
                as={Input}
                autoComplete="name"
                className={
                  touched.name && errors.name
                    ? "border-red-300 pl-10 focus:border-red-500 focus:ring-red-500/10"
                    : "pl-10"
                }
                id="name"
                name="name"
                required
                placeholder="Enter your full name"
                type="text"
              />
            </div>
            <ErrorMessage
              className="text-sm text-red-700"
              component="p"
              id="name-error"
              name="name"
              role="alert"
            />
          </div>

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
                autoComplete="new-password"
                className={
                  touched.password && errors.password
                    ? "border-red-300 pl-10 pr-10 focus:border-red-500 focus:ring-red-500/10"
                    : "pl-10 pr-10"
                }
                id="password"
                name="password"
                required
                placeholder="Create a strong password"
                type={passwordVisible ? "text" : "password"}
              />
              <button
                aria-label={passwordVisible ? "Hide password" : "Show password"}
                aria-pressed={passwordVisible}
                className="absolute right-3.5 top-1/2 -translate-y-1/2 rounded-md p-1 text-slate-500 hover:text-slate-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500"
                onClick={() => setPasswordVisible((visible) => !visible)}
                type="button"
              >
                {passwordVisible ? (
                  <FiEyeOff aria-hidden="true" className="size-4" />
                ) : (
                  <FiEye aria-hidden="true" className="size-4" />
                )}
              </button>
            </div>
            <ErrorMessage
              className="text-sm text-red-700"
              component="p"
              id="password-error"
              name="password"
              role="alert"
            />
          </div>

          <div className="space-y-2">
            <label
              className="text-sm font-medium text-slate-700"
              htmlFor="confirmPassword"
            >
              Confirm password
            </label>
            <div className="relative">
              <FiLock
                aria-hidden="true"
                className="pointer-events-none absolute left-3.5 top-1/2 size-4 -translate-y-1/2 text-slate-400"
              />
              <Field
                aria-describedby={
                  touched.confirmPassword && errors.confirmPassword
                    ? "confirm-password-error"
                    : undefined
                }
                aria-invalid={Boolean(
                  touched.confirmPassword && errors.confirmPassword,
                )}
                as={Input}
                autoComplete="new-password"
                className={
                  touched.confirmPassword && errors.confirmPassword
                    ? "border-red-300 pl-10 pr-10 focus:border-red-500 focus:ring-red-500/10"
                    : "pl-10 pr-10"
                }
                id="confirmPassword"
                name="confirmPassword"
                required
                placeholder="Re-enter your password"
                type={confirmPasswordVisible ? "text" : "password"}
              />
              <button
                aria-label={
                  confirmPasswordVisible
                    ? "Hide confirm password"
                    : "Show confirm password"
                }
                aria-pressed={confirmPasswordVisible}
                className="absolute right-3.5 top-1/2 -translate-y-1/2 rounded-md p-1 text-slate-500 hover:text-slate-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500"
                onClick={() => setConfirmPasswordVisible((visible) => !visible)}
                type="button"
              >
                {confirmPasswordVisible ? (
                  <FiEyeOff aria-hidden="true" className="size-4" />
                ) : (
                  <FiEye aria-hidden="true" className="size-4" />
                )}
              </button>
            </div>
            <ErrorMessage
              className="text-sm text-red-700"
              component="p"
              id="confirm-password-error"
              name="confirmPassword"
              role="alert"
            />
          </div>

          <Button
            className="w-full"
            loading={isSubmitting}
            loadingText="Creating account…"
            type="submit"
            size="lg"
          >
            Create account
            <FiArrowRight aria-hidden="true" className="size-4" />
          </Button>

          <p className="pt-1 text-center text-sm text-slate-600">
            Already have an account?{" "}
            <Link
              className="font-semibold text-brand-700 underline-offset-4 hover:underline"
              to={ROUTES.LOGIN}
            >
              Sign in
            </Link>
          </p>
        </Form>
      )}
    </Formik>
  );
}

export default RegisterForm;

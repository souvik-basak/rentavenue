"use client";

import React, { useEffect } from "react";
import { Amplify } from "aws-amplify";
import {
  Authenticator,
  Heading,
  Radio,
  RadioGroupField,
  useAuthenticator,
  View,
} from "@aws-amplify/ui-react";
import "@aws-amplify/ui-react/styles.css";
import { useRouter, usePathname } from "next/navigation";
import { Nunito } from "next/font/google";

Amplify.configure({
  Auth: {
    Cognito: {
      userPoolId: process.env.NEXT_PUBLIC_AWS_COGNITO_USER_POOL_ID!,
      userPoolClientId:
        process.env.NEXT_PUBLIC_AWS_COGNITO_USER_POOL_CLIENT_ID!,
      loginWith: {},
    },
  },
});

const nunito = Nunito({
  display: "swap",
  weight: ["400", "700"],
  subsets: ["latin"],
  variable: "--font-nunito",
});

const formFields = {
  signIn: {
    username: {
      placeholder: "Enter your email",
      label: "Email",
      isRequired: true,
    },
    password: {
      placeholder: "Enter your password",
      label: "Password",
      isRequired: true,
    },
  },
  signUp: {
    username: {
      order: 1,
      placeholder: "Choose a username",
      label: "Username",
      isRequired: true,
    },
    email: {
      order: 2,
      placeholder: "Enter your email address",
      label: "Email",
      isRequired: true,
    },
    password: {
      order: 3,
      placeholder: "Create a password",
      label: "Password",
      isRequired: true,
    },
    confirm_password: {
      order: 4,
      placeholder: "Confirm your password",
      label: "Confirm Password",
      isRequired: true,
    },
  },
};

const components = {
  SignIn: {
    Header() {
      return (
        <View className="mt-4 mb-7">
          <Heading level={3} className="!text-5xl !text-center">
            <div className="flex flex-col text-center font-medium">
              <span>Sign in to Continue</span>
              <span className="!text-[#3f3bb3] !text-6xl">rentavenue</span>
            </div>
          </Heading>
        </View>
      );
    },
    Footer() {
      const { toSignUp } = useAuthenticator();
      return (
        <View className="mt-4 mb-7">
          <p className="text-center text-lg font-medium">
            Don&apos;t have an account?{" "}
            <button
              className="text-blue-600 hover:text-blue-800 hover:underline cursor-pointer"
              onClick={toSignUp}
            >
              Sign up
            </button>
          </p>
        </View>
      );
    },
  },
  SignUp: {
    Header() {
      return (
        <View className="mt-4 mb-7">
          <Heading level={3} className="!text-5xl !text-center">
            <div className="flex flex-col text-center font-medium">
              <span>Create your free account on</span>
              <span className={`!text-[#3f3bb3] !text-6xl ${!nunito.variable}`}>
                rentavenue
              </span>
            </div>
          </Heading>
        </View>
      );
    },
    FormFields() {
      const { validationErrors } = useAuthenticator();
      return (
        <>
          <Authenticator.SignUp.FormFields />
          <RadioGroupField
            legend="Role"
            name="custom:role"
            errorMessage={validationErrors?.["custom:role"]}
            isRequired={true}
            hasError={!!validationErrors?.["custom:role"]}
          >
            <Radio value="tenant">Tenant</Radio>
            <Radio value="manager">Manager</Radio>
          </RadioGroupField>
        </>
      );
    },
    Footer() {
      const { toSignIn } = useAuthenticator();
      return (
        <View className="mt-4 mb-7">
          <p className="text-center text-lg font-medium">
            Already have an account ?{" "}
            <button
              className="text-blue-600 hover:text-blue-800 hover:underline cursor-pointer"
              onClick={toSignIn}
            >
              Log in here
            </button>
          </p>
        </View>
      );
    },
  },
};

const Auth = ({ children }: { children: React.ReactNode }) => {
  const { user } = useAuthenticator((context) => [context.user]);
  const router = useRouter();
  const pathname = usePathname();

  const isAuthPage = pathname.match(/^\/(signin|signup)$/);
  const isDashboardPage =
    pathname.startsWith("/manager") || pathname.startsWith("/tenants");

  useEffect(() => {
    if (user && isAuthPage) {
      router.push("/");
    }
  }, [user, isAuthPage, router]);

  // allow access to auth pages if user is not logged in

  if (!isAuthPage && !isDashboardPage) {
    return <>{children}</>;
  }

  return (
    <div className="h-full">
      <Authenticator
        initialState={pathname.includes("signup") ? "signUp" : "signIn"}
        components={components}
        formFields={formFields}
      >
        {() => <>{children}</>}
      </Authenticator>
    </div>
  );
};

export default Auth;

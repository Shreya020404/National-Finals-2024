"use client";
import PageWrapper from "@/components/wrapper/page-wrapper";
import { initAuthClient } from "../../../../utils/icpAuthClient"; // Adjust the path as needed
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function SignUpPage() {
  const router = useRouter();

  const handleSignup = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const authClient = await initAuthClient();

    try {
      await authClient.login({
        identityProvider: "https://identity.ic0.app", // ICP Internet Identity provider
        onSuccess: () => {
          console.log("User signed up successfully");
          router.push("/dashboard"); // Redirect to the dashboard after login/signup
        },
        onError: (error) => {
          console.error("Login failed:", error);
        },
      });
    } catch (error) {
      console.error("Error during signup:", error);
    }
  };
  return (
    <PageWrapper>
      <div className="flex h-screen items-center justify-center p-4 bg-gray-100 dark:bg-gray-900 transition-colors duration-300">
        <div className="w-full max-w-md p-8 bg-white dark:bg-gray-800 shadow-md rounded-lg border border-gray-300 dark:border-gray-700">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100 text-center">
            Sign Up to ChainAuth
          </h2>
          <form className="mt-8 space-y-6" onSubmit={handleSignup}>
            <div>
              <input
                type="email"
                required
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-700 rounded-md dark:bg-gray-700 dark:text-white transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-blue-600 dark:focus:ring-blue-500"
                placeholder="Email address"
              />
            </div>
            <div>
              <button
                type="submit"
                className="w-full px-4 py-2 text-white bg-blue-600 hover:bg-blue-700 rounded-md transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
              >
                Sign Up with Internet Identity
              </button>
            </div>
          </form>
          <div className="mt-4 text-center">
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Already have an account?{" "}
              <Link href="/sign-in" className="text-blue-600 hover:underline">
                Log In
              </Link>
            </p>
          </div>
        </div>
      </div>
    </PageWrapper>
  );
}

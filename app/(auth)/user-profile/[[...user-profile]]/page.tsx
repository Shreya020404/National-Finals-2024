"use client";
import PageWrapper from "@/components/wrapper/page-wrapper";
import { useRouter } from "next/navigation";
import { UserProfile } from "@/components/user-profile"; // Ensure correct import path
import { getIdentity } from "../../../../utils/icpAuthClient"; // Adjust the path as needed
import { useEffect, useState } from "react";

const UserProfilePage = () => {
  const router = useRouter();
  const [userName, setUserName] = useState<string | null>(null);

  useEffect(() => {
    const fetchIdentity = async () => {
      const identity = await getIdentity();
      if (identity) {
        setUserName(identity);
      } else {
        router.back();
      }
    };

    fetchIdentity();
  }, [router]);

  return (
    <PageWrapper>
      <div className="h-full flex items-center justify-center p-9">
        {userName && (
          <UserProfile
            userName={userName}
            path="/user-profile"
            routing="path"
          />
        )}
      </div>
    </PageWrapper>
  );
};

export default UserProfilePage;

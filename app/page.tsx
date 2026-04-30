"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function Page() {
  const router = useRouter();

  useEffect(() => {
    const user = localStorage.getItem("user");

    if (user) {
      router.replace("/home"); // better than push
    } else {
      router.replace("/login");
    }
  }, []);

  return <p>Checking authentication...</p>;
}
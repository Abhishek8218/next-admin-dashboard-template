'use client'
import { Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function Home() {
  const router = useRouter();

  useEffect(() => {
    // Redirect to the desired route
    router.replace('/app/');
  }, [router]);

  return <Loader2 className="animate-spin absolute top-1/2 left-1/2"/>; // Optionally render a loader if you want
};


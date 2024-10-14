"use client";

import { FcGoogle } from "react-icons/fc";
import { Button } from "@/components/ui/button";

import { useEffect } from "react";
import { AlertDialogDemo } from "../components/layout/ui-demo/alert-fail-login";
import { UserAuth } from "../contexts/authContext/authContext";
import { useRouter } from "next/navigation";

export default function Login() {
  const { googleSignIn, user } = UserAuth();
  const navigate = useRouter();

  useEffect(() => {
    if (user) {
      navigate.push("/");
    }
  }, [user]);

  return (
    <main className="py-3 flex fixed top-0 bottom-0 left-0 right-0 ">
      <AlertDialogDemo />
      <Button
        onClick={() => googleSignIn()}
        size="lg"
        variant="outline"
        className="m-auto"
      >
        Entrar com <FcGoogle className="ml-2" />
      </Button>
    </main>
  );
}

"use client";

import { UserAuth } from "@/app/contexts/authContext/authContext";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  // AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
// import { Button } from "@/components/ui/button";

import Link from "next/link";

export function AlertDialogDemo() {
  const { isDialogOpen, setIsDialogOpen } = UserAuth();
  return (
    <AlertDialog open={isDialogOpen}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>
            Voce nao tem acesso para prosseguir!
          </AlertDialogTitle>
          <AlertDialogDescription>
            Olá, notamos que sua conta nao esta permitida ao CMS do site, que
            tal dar olhada nas promocoes?
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <Link onClick={() => setIsDialogOpen(false)} href={"/"}>
            <AlertDialogCancel>Ver promocoes</AlertDialogCancel>
          </Link>
          <AlertDialogAction onClick={() => setIsDialogOpen(false)}>
            Continue
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}

"use client";

/**
 * v0 by Vercel.
 * @see https://v0.dev/t/VlReejpgFY1
 * Documentation: https://v0.dev/docs#integrating-generated-code-into-your-nextjs-app
 */
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  // DropdownMenuSeparator,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
// import { Link } from "react-router-dom";

// import { LogOut, Settings, User } from "lucide-react";
import { LogOut } from "lucide-react";
import { UserAuth } from "@/app/contexts/authContext/authContext";

export default function UserMenu() {
  const { user, logOut } = UserAuth();

  // const handleLogOut = () => {
  //    log
  // }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild className="ml-5">
        <Button variant="ghost" size="icon" className="rounded-full">
          <Avatar className="h-8 w-8">
            <AvatarImage
              src={user?.photoURL === null ? "" : user?.photoURL}
              alt="user profile"
            />
            <AvatarFallback>{user?.displayName?.charAt(0)}</AvatarFallback>
          </Avatar>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-[240px] z-50">
        <div className="flex items-center gap-4 border- p-4">
          <Avatar className="h-12 w-12">
            <AvatarImage
              src={user?.photoURL === null ? "" : user?.photoURL}
              alt="user profile"
            />
            <AvatarFallback>{user?.displayName?.charAt(0)}</AvatarFallback>
          </Avatar>
          <div className="grid gap-1">
            <div className="text-lg font-medium truncate">
              {user?.displayName}
            </div>
            <div className="text-sm text-muted-foreground truncate">
              {user?.email}
            </div>
          </div>
        </div>
        {/* <DropdownMenuSeparator />
        <DropdownMenuItem>
          <Link to="#" className="flex items-center gap-2">
            <User className="h-4 w-4" />
            <span>Profile</span>
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem>
          <Link to="#" className="flex items-center gap-2">
            <Settings className="h-4 w-4" />
            <span>Settings</span>
          </Link>
        </DropdownMenuItem>
        <DropdownMenuSeparator /> */}
        <hr />
        <DropdownMenuItem
          onClick={() => {
            logOut();
          }}
        >
          <LogOut className="h-4 w-4 mr-2" />
          <span>Logout</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

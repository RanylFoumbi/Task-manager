"use client";

import { BellDotIcon, LogOut, SlidersHorizontalIcon } from "lucide-react";
import { Avatar } from "@/components/ui";
import {
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenu,
} from "@/components/ui/Dropdown-menu";

const menuItems: { label: string; href: string; icon?: React.ReactNode }[] = [
  { label: "Profile", href: "#" },
  { label: "Settings", href: "#" },
  { label: "Billing", href: "#" },
];

export type AppHeaderProps = {
  onToggleSidebar: () => void;
};

export default function AppHeader({ onToggleSidebar }: AppHeaderProps) {
  const logout = async () => {};

  return (
    <header className="bg-white border-b border-slate-200 h-12">
      <div className="flex items-center justify-between h-full px-6">
        <div className="flex items-center flex-1">
          <button
            onClick={onToggleSidebar}
            className="transition-all duration-200 hover:scale-110 "
          >
            <SlidersHorizontalIcon className="h-5 w-5" size="sm" />
          </button>
        </div>

        <div className="flex items-center gap-4">
          <button className="transition-all duration-200 hover:scale-110 active:scale-95 p-1">
            <BellDotIcon className="h-5 w-5" size="sm" />
          </button>

          <DropdownMenu>
            <DropdownMenuTrigger className="focus:outline-none">
              <Avatar
                // src="https://images.unsplash.com/photo-1502823403499-6ccfcf4fb453?&w=256&h=256&q=70&crop=focalpoint&fp-x=0.5&fp-y=0.3&fp-z=1&fit=crop"
                fallback="A"
                color="indigo"
                size="sm"
              />
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-40">
              {menuItems.map((item) => (
                <DropdownMenuItem
                  key={item.label}
                  className="flex justify-between"
                >
                  {item.label} {item.icon}
                </DropdownMenuItem>
              ))}
              <DropdownMenuSeparator />
              <DropdownMenuItem
                onClick={logout}
                className="flex justify-between"
              >
                Logout <LogOut className="ml-2 h-4 w-4" />
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  );
}

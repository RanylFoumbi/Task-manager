"use client";

import { BellDotIcon, SlidersHorizontalIcon } from "lucide-react";
import { Avatar } from "@/components/ui";

export type AppHeaderProps = {
  onToggleSidebar: () => void;
};

export default function AppHeader({ onToggleSidebar }: AppHeaderProps) {
  return (
    <header className="bg-white border-b border-slate-200 h-12">
      <div className="flex items-center justify-between h-full px-6">
        <div className="flex items-center flex-1">
          <SlidersHorizontalIcon
            onClick={onToggleSidebar}
            className="h-5 w-5"
            size="sm"
          />
        </div>

        <div className="flex items-center space-x-2 gap-3">
          <BellDotIcon className="h-5 w-5" size="sm" />

          <Avatar
            // src="https://images.unsplash.com/photo-1502823403499-6ccfcf4fb453?&w=256&h=256&q=70&crop=focalpoint&fp-x=0.5&fp-y=0.3&fp-z=1&fit=crop"
            fallback="A"
            color="indigo"
            size="sm"
          />
        </div>
      </div>
    </header>
  );
}

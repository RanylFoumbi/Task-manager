"use client";

import {
  Home,
  Folder,
  Users,
  BarChart3,
  LayoutDashboard,
  Plus,
  BadgeInfo,
} from "lucide-react";
import { Button } from "@/components/ui";
import { appName, getFirstLetterCapitalized } from "@/lib/utils";

export type AppSidebarProps = {
  isOpen: boolean;
};

export default function AppSidebar({ isOpen }: AppSidebarProps) {
  const mainNavItems = [
    { icon: Home, label: "Overview", href: "#" },
    { icon: Folder, label: "Projets", href: "#", active: true },
    { icon: Users, label: "Équipe", href: "#" },
    { icon: BarChart3, label: "Statistiques", href: "#" },
    { icon: LayoutDashboard, label: "Tableau de bord", href: "#" },
  ];

  const favorites = [
    { icon: BadgeInfo, label: "Badge de certificat", href: "#" },
  ];

  return (
    <aside
      className={`bg-white border-r border-slate-200 transition-all duration-300 flex flex-col ${
        isOpen ? "w-55" : "w-15"
      } h-screen`}
    >
      <div
        className={
          isOpen
            ? "flex items-center gap-3 p-4 border-b border-slate-200 h-12"
            : "flex flex-col items-center p-4 border-b border-slate-200 h-12"
        }
      >
        <div className="flex h-5 w-5 items-center justify-center rounded-lg bg-primary text-primary-foreground">
          <span className="text-xs font-bold">
            {getFirstLetterCapitalized(appName)}
          </span>
        </div>
        {isOpen && (
          <span className="text-sm font-semibold text-slate-900">
            {appName}
          </span>
        )}
      </div>

      {isOpen && (
        <div className="p-4 border-b border-slate-200">
          <Button
            variant="outline"
            size="md"
            className="w-full justify-start text-md text-slate-700 border-slate-200 rounded-md"
          >
            <Plus className="h-4 w-4 mr-2" />
            Nouveau Projet
          </Button>
        </div>
      )}

      <nav className="flex-1 p-3 space-y-1 overflow-y-auto">
        {mainNavItems.map((item) => (
          <a
            key={item.label}
            href={item.href}
            className={`flex items-center gap-3 px-3 py-2.5 rounded-lg transition-colors ${
              item.active
                ? "bg-slate-100 text-slate-900 font-medium"
                : "text-slate-600 hover:text-slate-900 hover:bg-slate-50"
            } ${!isOpen && "justify-center"}`}
            title={!isOpen ? item.label : ""}
          >
            <item.icon className="h-5 w-5 shrink-0" />
            {isOpen && <span className="text-sm">{item.label}</span>}
          </a>
        ))}
      </nav>

      {isOpen && (
        <div className="border-t border-slate-200 p-4">
          <p className="text-xs font-semibold text-slate-500 uppercase mb-3">
            Favoris
          </p>
          <div className="space-y-2">
            {favorites.map((favorite) => (
              <a
                key={favorite.label}
                href={favorite.href}
                className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-slate-600 hover:text-slate-900 hover:bg-slate-50 transition-colors"
              >
                <div className="h-5 w-5 rounded-md border border-slate-200 flex items-center justify-center">
                  <favorite.icon className="h-4 w-4" />
                </div>
                <span className="text-sm">{favorite.label}</span>
              </a>
            ))}
          </div>
        </div>
      )}
    </aside>
  );
}

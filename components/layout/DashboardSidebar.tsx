"use client";

import {
  ArrowLeft,
  CreditCard,
  Home,
  LayoutDashboard,
  ListPlus,
  MessageSquare,
  User,
} from "lucide-react";
import { usePathname } from "next/dist/client/components/navigation";
import { Link } from "sanity/router";

const navItems = [
  {
    href: "/dashboard",
    label: "Overview",
    icon: LayoutDashboard,
    description: "Dashboard summary",
  },
  {
    href: "/dashboard/listings",
    label: "My Listings",
    icon: Home,
    description: "Manage your properties",
  },
  {
    href: "/dashboard/listings/new",
    label: "Add Listing",
    icon: ListPlus,
    description: "Create a new property listing",
  },
  {
    href: "/dashboard/leads",
    label: "Lead Inbox",
    icon: MessageSquare,
    description: "Buyer inquiries",
  },
  {
    href: "/dashboard/profile",
    label: "Agent Profile",
    icon: User,
    description: "Your public profile",
  },
  {
    href: "/dashboard/billing",
    label: "Billing",
    icon: CreditCard,
    description: "Manage subscription",
  },
];

export function DashboardSidebar() {
  const pathname = usePathname();

  return (
    <aside className="w-72 border-r border-border/50 bg-sidebar min-h-screen sticky top-0">
      <div className="p-6">
        {/* back link */}
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors mb-8 group"
        >
          <ArrowLeft
            className="h-4 w-4 transition-transform group-hover:-translate-x-1"
            aria-hidden="true"
          />
          <span className="text-sm font-medium">Back to Nestwell</span>
        </Link>

        {/* Dashboard header */}
        <div className="mb-8">
          <h2 className="text-xl font-bold font-heading">Agent Dashboard</h2>
          <p className="text-sm text-muted-foreground mt-1">
            Manage your listings and leads
          </p>
        </div>
      </div>
    </aside>
  );
}

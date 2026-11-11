"use client";

import { type StegaBranded, stegaClean } from "next-sanity";
import { useTransition } from "react";
import { toast } from "sonner";
import { updateListingStatus } from "@/actions/properties";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { propertyStatusSchema } from "@/lib/sanity/validation";
import type { Property } from "@/sanity.types";

interface ListingStatusSelectProps {
  listingId: string;
  currentStatus: Property["status"] | StegaBranded<Property["status"]>;
}

const statusColors = {
  active: "bg-green-100 text-green-800",
  pending: "bg-yellow-100 text-yellow-800",
  sold: "bg-red-100 text-red-800",
};

export function ListingStatusSelect({
  listingId,
  currentStatus: rawStatus,
}: ListingStatusSelectProps) {
  const currentStatus = stegaClean(rawStatus);
  const [isPending, startTransition] = useTransition();

  const handleStatusChange = (value: string | null) => {
    const result = propertyStatusSchema.safeParse(value);
    if (!result.success) return;

    startTransition(async () => {
      try {
        await updateListingStatus(listingId, result.data);
        toast.success("Status updated");
      } catch {
        toast.error("Failed to update status");
      }
    });
  };

  return (
    <Select
      value={currentStatus}
      onValueChange={handleStatusChange}
      disabled={isPending}
    >
      <SelectTrigger className="w-[120px]">
        <SelectValue>
          <Badge variant="outline" className={statusColors[currentStatus]}>
            {currentStatus.charAt(0).toUpperCase() + currentStatus.slice(1)}
          </Badge>
        </SelectValue>
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="active">
          <Badge variant="outline" className={statusColors.active}>
            Active
          </Badge>
        </SelectItem>
        <SelectItem value="pending">
          <Badge variant="outline" className={statusColors.pending}>
            Pending
          </Badge>
        </SelectItem>
        <SelectItem value="sold">
          <Badge variant="outline" className={statusColors.sold}>
            Sold
          </Badge>
        </SelectItem>
      </SelectContent>
    </Select>
  );
}

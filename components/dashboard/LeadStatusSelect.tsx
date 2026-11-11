"use client";

import { type StegaBranded, stegaClean } from "next-sanity";
import { useTransition } from "react";
import { toast } from "sonner";
import { updateLeadStatus } from "@/actions/leads";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { leadStatusSchema } from "@/lib/sanity/validation";
import type { Lead } from "@/sanity.types";

interface LeadStatusSelectProps {
  leadId: string;
  currentStatus: Lead["status"] | StegaBranded<Lead["status"]>;
}

const statusColors = {
  new: "bg-blue-100 text-blue-800",
  contacted: "bg-yellow-100 text-yellow-800",
  closed: "bg-green-100 text-green-800",
};

export function LeadStatusSelect({
  leadId,
  currentStatus: rawStatus,
}: LeadStatusSelectProps) {
  const currentStatus = stegaClean(rawStatus);
  const [isPending, startTransition] = useTransition();

  const handleStatusChange = (value: string | null) => {
    const result = leadStatusSchema.safeParse(value);
    if (!result.success) return;

    startTransition(async () => {
      try {
        await updateLeadStatus(leadId, result.data);
        toast.success("Status updated");
      } catch (_error) {
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
        <SelectItem value="new">
          <Badge variant="outline" className={statusColors.new}>
            New
          </Badge>
        </SelectItem>
        <SelectItem value="contacted">
          <Badge variant="outline" className={statusColors.contacted}>
            Contacted
          </Badge>
        </SelectItem>
        <SelectItem value="closed">
          <Badge variant="outline" className={statusColors.closed}>
            Closed
          </Badge>
        </SelectItem>
      </SelectContent>
    </Select>
  );
}

"use client";

import { Check, Loader2, MessageSquare } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState, useTransition } from "react";
import { toast } from "sonner";
import { createLead } from "@/actions/leads";
import { Button } from "@/components/ui/button";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "../ui/tooltip";

interface ContactAgentButtonProps {
  propertyId: string;
  agentId: string;
  isAuthenticated: boolean;
  hasExistingRequest: boolean;
  isOwnListing: boolean;
}

export function ContactAgentButton({
  propertyId,
  agentId,
  isAuthenticated,
  hasExistingRequest,
  isOwnListing,
}: ContactAgentButtonProps) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [isSubmitted, setIsSubmitted] = useState(false);
  const isContacted = hasExistingRequest || isSubmitted;

  const handleClick = () => {
    if (isOwnListing) return;
    if (!isAuthenticated) {
      router.push("/sign-in");
      return;
    }

    startTransition(async () => {
      try {
        const result = await createLead(propertyId, agentId);
        if (result.requiresOnboarding) {
          toast.info("Please complete your profile first");
          router.push("/onboarding");
          return;
        }
        if (!result.success) {
          toast.error(result.message ?? "Failed to contact agent. Please try again.");
          return;
        }
        if (result.success) {
          setIsSubmitted(true);
          toast.success(
            "Contact request sent! The agent will reach out to you soon.",
          );
        }
      } catch (_error) {
        toast.error("Failed to contact agent. Please try again.");
      }
    });
  };

  if (isOwnListing) {
    return (
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger
            render={<span />}
            tabIndex={0}
            className="block w-full"
          >
            <Button className="w-full" disabled>
              Your Listing
            </Button>
          </TooltipTrigger>

          <TooltipContent side="bottom">
            This is your own listing.
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    );
  }

  if (isContacted) {
    return (
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger
            render={<span />}
            tabIndex={0}
            className="block w-full"
          >
            <Button className="w-full" disabled>
              <Check className="h-5 w-5 mr-2" />
              Request Sent
            </Button>
          </TooltipTrigger>

          <TooltipContent side="bottom">
            You've already sent a contact request to this agent.
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    );
  }

  return (
    <Button className="w-full" onClick={handleClick} disabled={isPending}>
      {isPending ? (
        <Loader2 className="h-5 w-5 mr-2 animate-spin" />
      ) : (
        <MessageSquare className="h-5 w-5 mr-2" />
      )}
      {isAuthenticated ? "Contact Agent" : "Sign in to Contact"}
    </Button>
  );
}

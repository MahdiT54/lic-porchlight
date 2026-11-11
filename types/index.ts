import type { Agent, Geopoint, User } from "@/sanity.types";

// Derive action inputs from the generated documents instead of duplicating fields.
export type UserProfileData = Required<Pick<User, "name" | "phone">>;
export type UserOnboardingData = UserProfileData & Pick<User, "email">;

export type AgentProfileData = Required<
  Pick<Agent, "bio" | "licenseNumber" | "phone">
> &
  Pick<Agent, "agency">;
export type AgentOnboardingData = AgentProfileData;

export type GeoPoint = Required<Pick<Geopoint, "lat" | "lng">>;

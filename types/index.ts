// i made a type library to access to a bunch of types throughout the app centralized in one place

import type { StegaBranded } from "next-sanity";
import type { USER_SAVED_LISTINGS_QUERY_RESULT } from "@/sanity.types";

// Shared card projection, with support for Visual Editing's encoded strings.
type PropertyCardResult = NonNullable<USER_SAVED_LISTINGS_QUERY_RESULT>[number];
export type PropertyCardData =
  | PropertyCardResult
  | StegaBranded<PropertyCardResult>;

// Read contracts come from query projections, never handwritten document shapes.
export type User = NonNullable<
  import("@/sanity.types").USER_PROFILE_QUERY_RESULT
>;
export type Agent = NonNullable<
  import("@/sanity.types").AGENT_PROFILE_QUERY_RESULT
>;
export type Property = NonNullable<
  import("@/sanity.types").PROPERTY_DETAIL_QUERY_RESULT
>;
export type Lead = import("@/sanity.types").AGENT_LEADS_QUERY_RESULT[number];
export type Amenity = import("@/sanity.types").AMENITIES_QUERY_RESULT[number];
export type Address = import("@/sanity.types").Property["address"];
export type GeoPoint = { lat: number; lng: number };
export type SanityImage = NonNullable<Property["images"]>[number];

// Mutation input contracts are inferred from the boundary validators.
export type UserProfileData = import("zod").infer<
  typeof import("@/lib/sanity/validation").profileSchema
>;
export type UserOnboardingData = UserProfileData & { email: string };
export type AgentProfileData = import("zod").infer<
  typeof import("@/lib/sanity/validation").agentProfileSchema
>;
export type AgentOnboardingData = AgentProfileData;
export type ListingFormData = import("@/lib/sanity/validation").ListingInput;

// Search params
export interface PropertySearchParams {
  minPrice?: number;
  maxPrice?: number;
  beds?: number;
  baths?: number;
  type?: string;
  city?: string;
  page?: number;
}

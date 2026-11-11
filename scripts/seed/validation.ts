import { z } from "zod";
import {
  agentProfileSchema,
  documentIdSchema,
  emailSchema,
  leadStatusSchema,
  listingSchema,
  profileSchema,
} from "../../lib/sanity/validation";

export const seedAmenitySchema = z.object({
  _id: documentIdSchema,
  value: z.string().min(1),
  label: z.string().min(1),
  icon: z.string().optional(),
  order: z.number().int().optional(),
});
export const seedAgentSchema = agentProfileSchema.extend({
  _id: documentIdSchema,
  userId: z.string().min(1),
  name: profileSchema.shape.name,
  email: emailSchema,
  photoUrl: z.url().optional(),
  onboardingComplete: z.boolean(),
});
export const seedPropertySchema = listingSchema.extend({
  _id: documentIdSchema,
  slug: z.string().min(1),
  agentId: documentIdSchema.optional(),
  location: listingSchema.shape.location.unwrap(),
  featured: z.boolean(),
  imageUrls: z.array(z.url()),
});
export const seedUserSchema = profileSchema.extend({
  _id: documentIdSchema,
  clerkId: z.string().min(1),
  email: emailSchema,
  savedListings: z.array(documentIdSchema),
});
export const seedLeadSchema = z.object({
  _id: documentIdSchema,
  propertyId: documentIdSchema,
  agentId: documentIdSchema.optional(),
  buyerName: z.string().min(1),
  buyerEmail: emailSchema,
  buyerPhone: z.string().optional(),
  message: z.string().optional(),
  status: leadStatusSchema,
  daysAgo: z.number().int().nonnegative(),
});
export const seedAgentResultSchema = z
  .object({ _id: documentIdSchema, name: z.string().min(1) })
  .nullable();

import { z } from "zod";

// Studio validation does not run for API writes. Validate at server-action boundaries.
export const documentIdSchema = z
  .string()
  .min(1)
  .max(128)
  .regex(/^[a-zA-Z0-9_-][a-zA-Z0-9_.-]*$/);
export const profileFields = {
  name: z.string().trim().min(2, "Name must be at least 2 characters"),
  phone: z.string(),
};
export const profileSchema = z.object(profileFields);
export const agentProfileSchema = z.object({
  bio: z.string().trim().min(1),
  licenseNumber: z.string().trim().min(1),
  agency: z.string().optional(),
  phone: z.string().trim().min(1),
});
export const propertyStatusSchema = z.enum(["active", "pending", "sold"]);
export const leadStatusSchema = z.enum(["new", "contacted", "closed"]);
export const emailSchema = z.email();
export const listingSchema = z.object({
  title: z
    .string()
    .trim()
    .min(1)
    .refine(
      (value) => /[a-zA-Z0-9_]/.test(value),
      "Title must contain a letter or number",
    ),
  description: z.string(),
  price: z.number().positive(),
  propertyType: z.enum(["house", "apartment", "condo", "townhouse", "land"]),
  status: propertyStatusSchema.optional(),
  bedrooms: z.number().int().nonnegative(),
  bathrooms: z.number().nonnegative(),
  squareFeet: z.number().nonnegative(),
  yearBuilt: z
    .number()
    .int()
    .min(1800)
    .max(new Date().getFullYear())
    .optional(),
  address: z.object({
    street: z.string().trim().min(1),
    city: z.string().trim().min(1),
    state: z.string().trim().min(1),
    zipCode: z.string().trim().min(1),
  }),
  location: z
    .object({
      lat: z.number().min(-90).max(90),
      lng: z.number().min(-180).max(180),
    })
    .optional(),
  amenities: z
    .array(z.string().min(1))
    .refine(
      (items) => new Set(items).size === items.length,
      "Amenities must be unique",
    )
    .optional(),
  images: z
    .array(
      z.object({
        _type: z.literal("image"),
        _key: z.string().min(1),
        asset: z.object({
          _type: z.literal("reference"),
          _ref: documentIdSchema,
        }),
        alt: z.string().optional(),
      }),
    )
    .optional(),
});
export type ListingInput = z.infer<typeof listingSchema>;

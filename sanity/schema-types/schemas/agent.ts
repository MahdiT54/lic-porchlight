import { Contact } from "lucide-react";
import { defineField, defineType } from "sanity";

export const agent = defineType({
  name: "agent",
  type: "document",
  title: "Agent",
  icon: Contact,
  fields: [
    defineField({
      name: "clerkId",
      type: "string",
      title: "Clerk user ID",
      description:
        "Set by the authenticated server. Public association only; never use this editable field to grant permissions.",
      readOnly: true,
      validation: (r) => r.required().regex(/^user_\S+$/),
    }),
    defineField({
      name: "name",
      type: "string",
      title: "Public display name",
      validation: (r) => r.required().max(100),
    }),
    defineField({
      name: "slug",
      type: "slug",
      options: { source: "name" },
      validation: (r) => r.required(),
    }),
    defineField({
      name: "bio",
      type: "text",
      rows: 5,
      validation: (r) => r.max(2000),
    }),
    defineField({
      name: "photo",
      type: "image",
      options: { hotspot: true },
      fields: [
        defineField({
          name: "alt",
          type: "string",
          validation: (r) => r.required(),
        }),
      ],
    }),
    defineField({
      name: "brokerage",
      type: "string",
      validation: (r) => r.required(),
    }),
    defineField({
      name: "licenseNumber",
      type: "string",
      validation: (r) => r.required(),
    }),
    defineField({
      name: "licenseState",
      type: "string",
      validation: (r) => r.required(),
    }),
    defineField({
      name: "publicEmail",
      type: "string",
      description:
        "Optional business contact, published publicly. Not the Clerk account email.",
      validation: (r) => r.email(),
    }),
    defineField({
      name: "publicPhone",
      type: "string",
      description: "Optional business number, published publicly.",
    }),
  ],
  preview: { select: { title: "name", subtitle: "brokerage", media: "photo" } },
});

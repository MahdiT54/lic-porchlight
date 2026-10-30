import { UserRound } from "lucide-react";
import { defineArrayMember, defineField, defineType } from "sanity";

export const user = defineType({
  name: "user",
  type: "document",
  title: "User preferences (private dataset only)",
  icon: UserRound,
  fields: [
    defineField({
      name: "clerkId",
      type: "string",
      title: "Clerk user ID",
      description:
        "Written by authenticated server code; identity, email, and credentials remain in Clerk.",
      readOnly: true,
      validation: (r) => r.required().regex(/^user_\S+$/),
    }),
    defineField({
      name: "savedProperties",
      type: "array",
      of: [
        defineArrayMember({
          type: "reference",
          to: [{ type: "property" }],
          weak: true,
        }),
      ],
      validation: (r) => r.unique(),
    }),
    defineField({
      name: "preferredCities",
      type: "array",
      of: [defineArrayMember({ type: "string" })],
      validation: (r) => r.unique().max(20),
    }),
    defineField({
      name: "minimumBudget",
      type: "number",
      validation: (r) => r.min(0).integer(),
    }),
    defineField({
      name: "maximumBudget",
      type: "number",
      validation: (r) =>
        r
          .min(0)
          .integer()
          .custom((value, context) => {
            const minimum = context.document?.minimumBudget;
            return (
              value === undefined ||
              typeof minimum !== "number" ||
              value >= minimum ||
              "Maximum budget must be at least the minimum budget."
            );
          }),
    }),
  ],
  preview: {
    select: { title: "clerkId" },
    prepare: ({ title }) => ({
      title: title || "Unlinked user preferences",
      subtitle: "Private application data",
    }),
  },
});

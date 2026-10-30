import { Mail } from "lucide-react";
import { defineField, defineType } from "sanity";

export const lead = defineType({
  name: "lead",
  type: "document",
  title: "Inquiry (private dataset only)",
  icon: Mail,
  initialValue: { status: "new" },
  fields: [
    defineField({
      name: "clerkId",
      type: "string",
      title: "Submitting Clerk user ID",
      readOnly: true,
      description:
        "Optional for guest inquiries; derive from the server session, never a submitted form field.",
      validation: (r) => r.regex(/^user_\S+$/),
    }),
    defineField({
      name: "property",
      type: "reference",
      to: [{ type: "property" }],
      validation: (r) => r.required(),
    }),
    defineField({
      name: "agent",
      type: "reference",
      to: [{ type: "agent" }],
      description:
        "Assigned recipient at submission time; preserve if the listing later changes agent.",
      validation: (r) => r.required(),
    }),
    defineField({
      name: "name",
      type: "string",
      validation: (r) => r.required().max(100),
    }),
    defineField({
      name: "email",
      type: "string",
      validation: (r) => r.required().email(),
    }),
    defineField({
      name: "phone",
      type: "string",
      validation: (r) => r.max(40),
    }),
    defineField({
      name: "message",
      type: "text",
      rows: 5,
      validation: (r) => r.required().max(4000),
    }),
    defineField({
      name: "status",
      type: "string",
      options: { list: ["new", "contacted", "qualified", "closed"] },
      validation: (r) =>
        r
          .required()
          .custom(
            (value) =>
              value === undefined ||
              ["new", "contacted", "qualified", "closed"].includes(value) ||
              "Choose a listed value.",
          ),
    }),
  ],
  preview: { select: { title: "name", subtitle: "status" } },
});

import { Tag } from "lucide-react";
import { defineField, defineType } from "sanity";

export const amenity = defineType({
  name: "amenity",
  type: "document",
  title: "Amenity",
  icon: Tag,
  fields: [
    defineField({
      name: "title",
      type: "string",
      validation: (r) => r.required().max(80),
    }),
    defineField({
      name: "slug",
      type: "slug",
      options: { source: "title" },
      validation: (r) => r.required(),
    }),
    defineField({
      name: "category",
      type: "string",
      options: { list: ["interior", "building", "outdoor", "accessibility"] },
      validation: (r) =>
        r
          .required()
          .custom(
            (value) =>
              value === undefined ||
              ["interior", "building", "outdoor", "accessibility"].includes(
                value,
              ) ||
              "Choose a listed value.",
          ),
    }),
  ],
  preview: { select: { title: "title", subtitle: "category" } },
});

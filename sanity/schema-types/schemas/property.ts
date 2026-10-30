import { Home } from "lucide-react";
import { defineArrayMember, defineField, defineType } from "sanity";

export const property = defineType({
  name: "property",
  title: "Property",
  type: "document",
  icon: Home,
  groups: [
    { name: "listing", default: true },
    { name: "details" },
    { name: "media" },
  ],
  initialValue: { status: "draft", featured: false, currency: "USD" },
  fields: [
    defineField({
      name: "title",
      type: "string",
      group: "listing",
      validation: (r) => r.required().max(150),
    }),
    defineField({
      name: "slug",
      type: "slug",
      group: "listing",
      options: { source: "title", maxLength: 96 },
      validation: (r) => r.required(),
    }),
    defineField({
      name: "agent",
      type: "reference",
      to: [{ type: "agent" }],
      group: "listing",
      validation: (r) => r.required(),
    }),
    defineField({
      name: "status",
      type: "string",
      group: "listing",
      options: { list: ["draft", "active", "pending", "sold", "withdrawn"] },
      validation: (r) =>
        r
          .required()
          .custom(
            (value) =>
              value === undefined ||
              ["draft", "active", "pending", "sold", "withdrawn"].includes(
                value,
              ) ||
              "Choose a listed value.",
          ),
    }),
    defineField({
      name: "featured",
      type: "boolean",
      group: "listing",
      description: "Include in editorially featured listings.",
    }),
    defineField({
      name: "price",
      type: "number",
      group: "listing",
      description: "Asking price in whole currency units.",
      validation: (r) => r.required().positive().integer(),
    }),
    defineField({
      name: "currency",
      type: "string",
      group: "listing",
      options: { list: ["USD"] },
      validation: (r) =>
        r
          .required()
          .custom(
            (value) =>
              value === undefined ||
              ["USD"].includes(value) ||
              "Choose a listed value.",
          ),
    }),
    defineField({
      name: "propertyType",
      type: "string",
      group: "details",
      options: {
        list: ["house", "condo", "co-op", "townhouse", "multi-family", "land"],
      },
      validation: (r) =>
        r
          .required()
          .custom(
            (value) =>
              value === undefined ||
              [
                "house",
                "condo",
                "co-op",
                "townhouse",
                "multi-family",
                "land",
              ].includes(value) ||
              "Choose a listed value.",
          ),
    }),
    defineField({
      name: "description",
      type: "array",
      group: "details",
      of: [defineArrayMember({ type: "block" })],
      validation: (r) => r.required().min(1),
    }),
    defineField({
      name: "bedrooms",
      type: "number",
      group: "details",
      validation: (r) => r.required().min(0).integer(),
    }),
    defineField({
      name: "bathrooms",
      type: "number",
      group: "details",
      validation: (r) => r.required().min(0).precision(1),
    }),
    defineField({
      name: "squareFeet",
      type: "number",
      group: "details",
      validation: (r) => r.required().positive().integer(),
    }),
    defineField({
      name: "yearBuilt",
      type: "number",
      group: "details",
      validation: (r) =>
        r
          .integer()
          .min(1600)
          .max(new Date().getFullYear() + 10),
    }),
    defineField({
      name: "address",
      type: "object",
      group: "details",
      validation: (r) => r.required(),
      fields: [
        defineField({
          name: "street",
          type: "string",
          validation: (r) => r.required(),
        }),
        defineField({ name: "unit", type: "string" }),
        defineField({
          name: "city",
          type: "string",
          validation: (r) => r.required(),
        }),
        defineField({
          name: "state",
          type: "string",
          validation: (r) => r.required(),
        }),
        defineField({
          name: "zipCode",
          type: "string",
          validation: (r) => r.required(),
        }),
        defineField({
          name: "country",
          type: "string",
          initialValue: "US",
          validation: (r) => r.required().length(2),
        }),
      ],
    }),
    defineField({ name: "location", type: "geopoint", group: "details" }),
    defineField({
      name: "amenities",
      type: "array",
      group: "details",
      of: [defineArrayMember({ type: "reference", to: [{ type: "amenity" }] })],
      validation: (r) => r.unique(),
    }),
    defineField({
      name: "images",
      type: "array",
      group: "media",
      description: "The first image is the listing cover.",
      validation: (r) => r.required().min(1).max(40),
      of: [
        defineArrayMember({
          type: "image",
          options: { hotspot: true },
          validation: (r) => r.required().assetRequired(),
          fields: [
            defineField({
              name: "alt",
              type: "string",
              validation: (r) => r.required().max(200),
            }),
          ],
        }),
      ],
    }),
    defineField({
      name: "virtualTourUrl",
      type: "url",
      group: "media",
      validation: (r) => r.uri({ scheme: ["https"] }),
    }),
  ],
  preview: {
    select: { title: "title", subtitle: "status", media: "images.0" },
  },
});

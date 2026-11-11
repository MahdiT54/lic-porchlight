import { defineArrayMember, defineField, defineType } from "sanity";

export const property = defineType({
  name: "property",
  title: "Property",
  type: "document",
  fields: [
    defineField({
      name: "title",
      title: "Title",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "slug",
      title: "Slug",
      type: "slug",
      options: {
        source: "title",
        maxLength: 96,
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "description",
      title: "Description",
      type: "text",
      rows: 4,
    }),
    defineField({
      name: "price",
      title: "Price",
      type: "number",
      validation: (Rule) => Rule.required().positive(),
    }),
    defineField({
      name: "propertyType",
      title: "Property Type",
      type: "string",
      options: {
        list: [
          { title: "House", value: "house" },
          { title: "Apartment", value: "apartment" },
          { title: "Condo", value: "condo" },
          { title: "Townhouse", value: "townhouse" },
          { title: "Land", value: "land" },
        ],
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "status",
      title: "Status",
      type: "string",
      options: {
        list: [
          { title: "Active", value: "active" },
          { title: "Pending", value: "pending" },
          { title: "Sold", value: "sold" },
        ],
      },
      initialValue: "active",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "bedrooms",
      title: "Bedrooms",
      type: "number",
      validation: (Rule) => Rule.required().integer().min(0),
    }),
    defineField({
      name: "bathrooms",
      title: "Bathrooms",
      type: "number",
      validation: (Rule) => Rule.required().min(0),
    }),
    defineField({
      name: "squareFeet",
      title: "Square Feet",
      type: "number",
      validation: (Rule) => Rule.required().min(0),
    }),
    defineField({
      name: "yearBuilt",
      title: "Year Built",
      type: "number",
      validation: (Rule) =>
        Rule.integer().min(1800).max(new Date().getFullYear()),
    }),
    defineField({
      name: "address",
      validation: (Rule) => Rule.required(),
      title: "Address",
      type: "object",
      fields: [
        defineField({
          name: "street",
          validation: (Rule) => Rule.required(),
          title: "Street",
          type: "string",
        }),
        defineField({
          name: "city",
          validation: (Rule) => Rule.required(),
          title: "City",
          type: "string",
        }),
        defineField({
          name: "state",
          validation: (Rule) => Rule.required(),
          title: "State",
          type: "string",
        }),
        defineField({
          name: "zipCode",
          validation: (Rule) => Rule.required(),
          title: "ZIP Code",
          type: "string",
        }),
      ],
    }),
    defineField({
      name: "location",
      title: "Location",
      type: "geopoint",
      description: "Map location for property",
    }),
    defineField({
      name: "images",
      title: "Images",
      type: "array",
      of: [
        defineArrayMember({
          type: "image",
          validation: (Rule) => Rule.required().assetRequired(),
          options: {
            hotspot: true,
          },
          fields: [
            defineField({
              name: "alt",
              title: "Alt Text",
              type: "string",
            }),
          ],
        }),
      ],
    }),
    defineField({
      name: "amenities",
      title: "Amenities",
      type: "array",
      of: [defineArrayMember({ type: "string" })],
      validation: (Rule) => Rule.unique(),
      description: "Amenity values are managed in the Amenities collection",
    }),
    defineField({
      name: "agent",
      title: "Agent",
      type: "reference",
      to: [{ type: "agent" }],
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "lotSize",
      title: "Lot Size (sq ft)",
      type: "number",
      validation: (Rule) => Rule.min(0),
    }),
    defineField({
      name: "openHouseDate",
      title: "Open House Date",
      type: "datetime",
      description: "Scheduled open house date/time (if any)",
    }),
    defineField({
      name: "originalPrice",
      title: "Original Price",
      type: "number",
      description: "Original listing price (if reduced)",
      validation: (Rule) => Rule.positive(),
    }),
    defineField({
      name: "featured",
      title: "Featured",
      type: "boolean",
      initialValue: false,
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "createdAt",
      title: "Created At",
      type: "datetime",
      initialValue: () => new Date().toISOString(),
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "updatedAt",
      title: "Updated At",
      type: "datetime",
    }),
  ],
  preview: {
    select: {
      title: "title",
      price: "price",
      status: "status",
      media: "images.0",
    },
    prepare({ title, price, status, media }) {
      return {
        title,
        subtitle: `$${price?.toLocaleString()} - ${status}`,
        media,
      };
    },
  },
});

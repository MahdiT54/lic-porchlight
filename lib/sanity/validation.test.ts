import assert from "node:assert/strict";
import { test } from "node:test";
import {
  documentIdSchema,
  leadStatusSchema,
  listingSchema,
  profileSchema,
} from "./validation";

const land = {
  title: "Vacant lot",
  description: "",
  price: 10000,
  propertyType: "land",
  bedrooms: 0,
  bathrooms: 0,
  squareFeet: 0,
  address: {
    street: "1 Main St",
    city: "Queens",
    state: "NY",
    zipCode: "11101",
  },
};

test("land and incomplete optional media remain valid", () => {
  const result = listingSchema.parse(land);
  assert.equal(result.bedrooms, 0);
  assert.equal(result.images, undefined);
  assert.equal(result.location, undefined);
});

test("reject invalid listing input before it reaches Sanity", () => {
  for (const patch of [
    { title: " " },
    { title: "!!!" },
    { price: 0 },
    { price: NaN },
    { bedrooms: -1 },
    { bedrooms: 1.5 },
    { squareFeet: Infinity },
    { address: { ...land.address, city: " " } },
    { location: { lat: 91, lng: 0 } },
    { location: { lat: 0 } },
    { propertyType: "castle" },
    { status: "deleted" },
    { images: [{ _type: "image", _key: "one" }] },
    { amenities: ["pool", "pool"] },
  ]) {
    assert.equal(
      listingSchema.safeParse({ ...land, ...patch }).success,
      false,
      JSON.stringify(patch),
    );
  }
});

test("profiles trim names, reject empty names, and allow an optional phone", () => {
  assert.deepEqual(profileSchema.parse({ name: "  Alice  ", phone: "" }), {
    name: "Alice",
    phone: "",
  });
  assert.equal(
    profileSchema.safeParse({ name: " ", phone: "" }).success,
    false,
  );
});

test("reject IDs that can inject patch selectors and unknown lead statuses", () => {
  assert.equal(documentIdSchema.safeParse('id"]]').success, false);
  assert.equal(documentIdSchema.safeParse("property-123").success, true);
  assert.equal(leadStatusSchema.safeParse("unexpected").success, false);
});

test("all bundled seed fixtures satisfy the validation contracts", async () => {
  const { readFile } = await import("node:fs/promises");
  const { z } = await import("zod");
  const {
    seedAmenitySchema,
    seedAgentSchema,
    seedPropertySchema,
    seedUserSchema,
    seedLeadSchema,
  } = await import("../../scripts/seed/validation");
  for (const [name, schema] of [
    ["amenities", seedAmenitySchema],
    ["agents", seedAgentSchema],
    ["properties", seedPropertySchema.required({ agentId: true })],
    ["users", seedUserSchema],
    ["leads", seedLeadSchema.required({ agentId: true })],
  ] as const) {
    const contents = JSON.parse(
      await readFile(`scripts/seed/data/${name}.json`, "utf8"),
    );
    assert.equal(z.array(schema).safeParse(contents).success, true, name);
  }
});

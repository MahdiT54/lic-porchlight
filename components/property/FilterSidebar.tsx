import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

interface FilterSidebarProps {
  amenities: { _id: string; value: string | null; label: string | null }[];
  values?: Record<string, string | undefined>;
}

const numericFields = [
  ["minPrice", "Minimum price"],
  ["maxPrice", "Maximum price"],
  ["minSqft", "Minimum square feet"],
  ["maxSqft", "Maximum square feet"],
  ["minYear", "Earliest year built"],
  ["maxYear", "Latest year built"],
  ["minLotSize", "Minimum lot size"],
  ["maxLotSize", "Maximum lot size"],
  ["daysOnMarket", "Maximum days on market"],
] as const;

export function FilterSidebar({ amenities, values = {} }: FilterSidebarProps) {
  const selectedAmenities = values.amenities?.split(",") ?? [];
  return (
    <form
      action="/properties"
      method="get"
      className="space-y-5 rounded-2xl border border-border/50 bg-background p-6"
    >
      <h2 className="text-xl font-semibold">Filter properties</h2>
      <label htmlFor="filter-city" className="grid gap-2 text-sm">
        City, state, or ZIP code
        <Input id="filter-city" name="city" defaultValue={values.city} />
      </label>
      <label className="grid gap-2 text-sm">
        Property type
        <select
          name="type"
          defaultValue={values.type ?? "all"}
          className="rounded-md border bg-background p-2"
        >
          <option value="all">All types</option>
          {["house", "apartment", "condo", "townhouse", "land"].map((type) => (
            <option key={type} value={type}>
              {type.charAt(0).toUpperCase() + type.slice(1)}
            </option>
          ))}
        </select>
      </label>
      <div className="grid grid-cols-2 gap-3">
        {(["beds", "baths"] as const).map((name) => (
          <label key={name} className="grid gap-2 text-sm">
            {name === "beds" ? "Bedrooms" : "Bathrooms"}
            <select
              name={name}
              defaultValue={values[name] ?? "0"}
              className="rounded-md border bg-background p-2"
            >
              <option value="0">Any</option>
              {["1", "2", "3", "4", "5+"].map((value) => (
                <option key={value} value={value}>
                  {value}
                </option>
              ))}
            </select>
          </label>
        ))}
      </div>
      {numericFields.map(([name, label]) => (
        <label
          key={name}
          htmlFor={`filter-${name}`}
          className="grid gap-2 text-sm"
        >
          {label}
          <Input
            id={`filter-${name}`}
            type="number"
            min="0"
            step={name.includes("LotSize") ? "any" : "1"}
            name={name}
            defaultValue={values[name]}
          />
        </label>
      ))}
      {(
        [
          ["openHouse", "Upcoming open house"],
          ["priceReduced", "Price reduced"],
        ] as const
      ).map(([name, label]) => (
        <label key={name} className="flex items-center gap-2 text-sm">
          <input
            type="checkbox"
            name={name}
            value="true"
            defaultChecked={values[name] === "true"}
          />
          {label}
        </label>
      ))}
      {amenities.length > 0 && (
        <label className="grid gap-2 text-sm">
          Amenities (select all that apply)
          <select
            name="amenities"
            multiple
            defaultValue={selectedAmenities}
            className="min-h-32 rounded-md border bg-background p-2"
          >
            {amenities
              .filter((amenity) => amenity.value)
              .map((amenity) => (
                <option key={amenity._id} value={amenity.value ?? ""}>
                  {amenity.label ?? amenity.value}
                </option>
              ))}
          </select>
        </label>
      )}
      <Button type="submit" className="w-full">
        Apply filters
      </Button>
      <Link href="/properties" className="block text-center text-sm underline">
        Clear all filters
      </Link>
    </form>
  );
}

import {
  Building2,
  ListChecks,
  MessageSquare,
  UserRound,
  Users,
} from "lucide-react";
import type { StructureResolver } from "sanity/structure";

export const structure: StructureResolver = (S) =>
  S.list()
    .title("LIC Porchlight")
    .items([
      S.documentTypeListItem("property").title("Properties").icon(Building2),
      S.documentTypeListItem("lead").title("Leads").icon(MessageSquare),
      S.divider(),
      S.documentTypeListItem("agent").title("Agents").icon(UserRound),
      S.documentTypeListItem("user").title("Users").icon(Users),
      S.divider(),
      S.documentTypeListItem("amenity").title("Amenities").icon(ListChecks),
      // Keep future document types accessible until they get a custom position.
      ...S.documentTypeListItems().filter(
        (item) =>
          !["property", "lead", "agent", "user", "amenity"].includes(
            item.getId() ?? "",
          ),
      ),
    ]);

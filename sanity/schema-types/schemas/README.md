# Porchlight content model

Public content: `property` references one `agent` and shared `amenity` documents.
Addresses, photos, and listing facts belong to the property. Agent business contact
details are explicitly public and must be supplied with the agent's consent.
Prices are whole USD units, area is square feet, and the first photo is the cover.
Listings start in `draft`; Sanity publication and listing status are separate.

Private application data: `user` holds preferences and saved property references;
`lead` holds inquiry contact information and the assigned agent at submission time.
These types are registered for modeling, but MUST NOT be populated in a public
dataset. Either use a private dataset for all five types with server-only reads,
or move private application data to a separate database. A separate Sanity dataset
requires explicit cross-dataset references rather than these ordinary references.
Studio titles, readOnly, hidden, and validation are not access controls.

Clerk owns credentials, sessions, account identifiers, and authorization. Store the
Clerk `user_...` ID in `clerkId`, not in Sanity's `_id`; let Sanity generate IDs.
Agent profiles deliberately have no reference to private user preferences, so
public queries cannot accidentally dereference those preferences.

Server mutations must authenticate with Clerk, derive clerkId from the session,
enforce document ownership/agent entitlements, and validate input independently.
Never grant agent privileges based on an editable Sanity field. Query by clerkId
before creating a profile; enforce uniqueness and handle concurrent requests in
the write service (Studio validation is not a database uniqueness constraint).
Sync only the identity fields you actually need, using verified Clerk webhooks
if needed; webhook handlers and write endpoints are not implemented here.
Define account deletion/anonymization and inquiry retention before collecting data.

Suggested editorial order: amenities -> agents -> properties. Private user
preferences and inquiries should normally be created by server code.

The existing registry imports all five files. Existing featured-listing queries
use the preserved `featured`, `status`, `images`, `address`, and pricing fields.
The frontend's handwritten types and GROQ projections should be checked before
enabling live content; generate types from the schemas and actual queries rather
than assuming document shapes equal projected frontend shapes.

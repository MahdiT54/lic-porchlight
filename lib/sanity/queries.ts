import { defineQuery } from "next-sanity";

// Img fragment for reuse
const imageFragment = /* groq */ `
   asset-> {
   _id,
   url,
   metadata {lqip, dimensions} }
},
alt
`;

// sanity uses groq querying language to fetch data from the Sanity CMS. The following query fetches featured properties that are active and limits the results to 6. It retrieves various fields including id, title, slug, price, bedrooms, bathrooms, square feet, address, image (with the defined image fragment), and location.
// query the schema for "property" where the status is "active" and the "featured" field is true, limiting the results to 6. The query retrieves various fields including id, title, slug, price, bedrooms, bathrooms, square feet, address, image (with the defined image fragment), and location.
export const FEATURED_PROPERTIES_QUERY = defineQuery(/* groq */ `
    *[_type == "property" && featured == true && status == "active"] [0...6] { 
    _id,
    title,
    "slug": slug.current,
    price,
    bedrooms,
    bathrooms,
    squareFeet,
    address,
    "image": images[0] { ${imageFragment} },
    location
    }
`);

// pro

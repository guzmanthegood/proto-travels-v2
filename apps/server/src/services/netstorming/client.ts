import { Hotel } from "../../schema/types"; // Import the generated Hotel type

// Fake hotel data (mocked response)
const hotels: Hotel[] = [
  { code: "H001", name: "The Grand Elysium", promo: false, city: "New York" },
  { code: "H002", name: "Aurora Suites", promo: true, city: "Los Angeles" },
  { code: "H003", name: "Oceanview Paradise", promo: false, city: "Miami" },
  { code: "H004", name: "Mountain Haven", promo: true, city: "Denver" },
  {
    code: "H005",
    name: "Golden Gate Lodge",
    promo: false,
    city: "San Francisco",
  },
  { code: "H006", name: "Sunrise Retreat", promo: true, city: "Orlando" },
  { code: "H007", name: "Lunar Lagoon", promo: false, city: "Seattle" },
  { code: "H008", name: "Emerald Bay Resort", promo: true, city: "San Diego" },
  {
    code: "H009",
    name: "Whispering Pines Inn",
    promo: false,
    city: "Salt Lake City",
  },
  { code: "H010", name: "Crimson Horizon", promo: true, city: "Houston" },
  { code: "H011", name: "The Velvet Crown", promo: false, city: "Austin" },
  { code: "H012", name: "Silver Sands Hotel", promo: true, city: "Las Vegas" },
  { code: "H013", name: "Azure Peaks Lodge", promo: false, city: "Phoenix" },
  { code: "H014", name: "The Majestic Palm", promo: true, city: "Honolulu" },
  { code: "H015", name: "Scarlet River Inn", promo: false, city: "Portland" },
  { code: "H016", name: "Jade Garden Suites", promo: true, city: "Chicago" },
  { code: "H017", name: "Starlight Sanctuary", promo: false, city: "Dallas" },
  { code: "H018", name: "The Crystal Harbor", promo: true, city: "Tampa" },
  {
    code: "H019",
    name: "Blossom Creek Lodge",
    promo: false,
    city: "San Antonio",
  },
  { code: "H020", name: "Amber Glow Hotel", promo: true, city: "Nashville" },
  { code: "H021", name: "The Ruby Oasis", promo: false, city: "Atlanta" },
  {
    code: "H022",
    name: "The Sapphire Horizon",
    promo: true,
    city: "Charlotte",
  },
  { code: "H023", name: "The Serene Coast", promo: false, city: "Savannah" },
  { code: "H024", name: "The Onyx Tower", promo: true, city: "Philadelphia" },
  { code: "H025", name: "The Mystic Dunes", promo: false, city: "Boston" },
  {
    code: "H026",
    name: "Golden Horizon Resort",
    promo: true,
    city: "Las Vegas",
  },
  {
    code: "H027",
    name: "The Sapphire Shores",
    promo: false,
    city: "Santa Monica",
  },
  { code: "H028", name: "The Opal Retreat", promo: true, city: "Key West" },
  { code: "H029", name: "The Amethyst Cove", promo: false, city: "Charleston" },
  { code: "H030", name: "The Ruby Lagoon", promo: true, city: "Palm Springs" },
];

// Mock implementation of fetchHotelsFromNetstorming
export const fetchHotelsFromNetstorming = async (
  searchInput: any
): Promise<Hotel[]> => {
  console.log(
    "[Netstorming Client] Simulating fetch with search input:",
    searchInput
  );

  // Return the entire mocked hotels list for now
  return hotels;
};

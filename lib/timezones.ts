export type City = {
  name: string;
  country: string;
  iana: string;
};

export type TimeZoneGroup = {
  label: string;
  cities: City[];
};

export const WORLD_ZONES: Record<string, TimeZoneGroup> = {
  "UTC-7": {
    label: "UTC -07:00 (Mountain Time)",
    cities: [
      { name: "Colorado Springs", country: "USA", iana: "America/Denver" },
      { name: "Salt Lake City", country: "USA", iana: "America/Denver" },
      { name: "Phoenix", country: "USA", iana: "America/Phoenix" }, // Phoenix doesn't observe DST!
    ],
  },
  "UTC-5": {
    label: "UTC -05:00 (Eastern Time)",
    cities: [
      { name: "New York", country: "USA", iana: "America/New_York" },
      { name: "Toronto", country: "Canada", iana: "America/Toronto" },
    ],
  },
  "UTC+0": {
    label: "UTC +00:00 (Western European)",
    cities: [
      { name: "London", country: "UK", iana: "Europe/London" },
      { name: "Lisbon", country: "Portugal", iana: "Europe/Lisbon" },
    ],
  },
  "UTC+9": {
    label: "UTC +09:00 (Japan/Korea)",
    cities: [
      { name: "Tokyo", country: "Japan", iana: "Asia/Tokyo" },
      { name: "Seoul", country: "South Korea", iana: "Asia/Seoul" },
    ],
  },
};

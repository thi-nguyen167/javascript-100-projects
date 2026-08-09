interface TimeZoneOption {
  label: string;
  value: string; // IANA timezone identifier
  city: string;
  country: string;
}

const TIMEZONE_OPTIONS: TimeZoneOption[] = [
  {
    label: "UTC +00:00 (London)",
    value: "Europe/London",
    city: "London",
    country: "United Kingdom",
  },
  {
    label: "UTC +01:00 (Paris)",
    value: "Europe/Paris",
    city: "Paris",
    country: "France",
  },
  {
    label: "UTC +01:00 (Berlin)",
    value: "Europe/Berlin",
    city: "Berlin",
    country: "Germany",
  },
  {
    label: "UTC -05:00 (New York)",
    value: "America/New_York",
    city: "New York",
    country: "USA",
  },
  {
    label: "UTC -08:00 (Los Angeles)",
    value: "America/Los_Angeles",
    city: "Los Angeles",
    country: "USA",
  },
  {
    label: "UTC +09:00 (Tokyo)",
    value: "Asia/Tokyo",
    city: "Tokyo",
    country: "Japan",
  },
  {
    label: "UTC +08:00 (Singapore)",
    value: "Asia/Singapore",
    city: "Singapore",
    country: "Singapore",
  },
  {
    label: "UTC +05:30 (Mumbai)",
    value: "Asia/Kolkata",
    city: "Mumbai",
    country: "India",
  },
  {
    label: "UTC +10:00 (Sydney)",
    value: "Australia/Sydney",
    city: "Sydney",
    country: "Australia",
  },
  {
    label: "UTC +03:00 (Moscow)",
    value: "Europe/Moscow",
    city: "Moscow",
    country: "Russia",
  },
  {
    label: "UTC -03:00 (São Paulo)",
    value: "America/Sao_Paulo",
    city: "São Paulo",
    country: "Brazil",
  },
  {
    label: "UTC +04:00 (Dubai)",
    value: "Asia/Dubai",
    city: "Dubai",
    country: "UAE",
  },
];

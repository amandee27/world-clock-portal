import express from "express";
import cors from "cors";
import { DateTime } from "luxon";
import tzLookup from "tz-lookup";
import allCities from "all-the-cities";
import countriesLib from "i18n-iso-countries";
import { createRequire } from "module";

const require = createRequire(import.meta.url);
const enLocale = require("i18n-iso-countries/langs/en.json");

// Register English locale for country names
countriesLib.registerLocale(enLocale);

const app = express();
const PORT = 3000;

const FRONT_END_URL = process.env.FRONT_END_URL || "http://localhost:5173";

// Enable CORS (allow frontend like localhost:5173)
app.use(cors({ origin: FRONT_END_URL }));

// --- Load and prepare city data ---
const MIN_POPULATION = 300000; // filter for "major" cities

const MAJOR_CITIES = allCities
  .filter((c) => c.population >= MIN_POPULATION)
  .map((c) => {
    const [lon, lat] = c.loc.coordinates;
    let timezone = null;
    try {
      timezone = tzLookup(lat, lon);
    } catch {
      timezone = null;
    }
    return {
      city: c.name,
      countryCode: c.country,
      lat,
      lon,
      population: c.population,
      timezone,
    };
  })
  .filter((c) => c.timezone);

// Convert country code → full name
const getCountryName = (code) =>
  countriesLib.getName(code, "en", { select: "official" }) ||
  countriesLib.getName(code, "en") ||
  code;

// Get current timezone offset (hours)
const getOffsetHours = (tz) => {
  const dt = DateTime.now().setZone(tz);
  return dt.offset / 60; // convert minutes → hours
};

// --- API endpoint ---
app.get("/cities", (req, res) => {
  const q = (req.query.query || "").trim().toLowerCase();
  if (!q) {
    return res.status(400).json({ error: "Query parameter is required" });
  }

  const results = MAJOR_CITIES.filter((c) => {
    const cityMatch = c.city.toLowerCase().startsWith(q);
    const countryMatch = getCountryName(c.countryCode)
      .toLowerCase()
      .includes(q);
    return cityMatch || countryMatch;
  })
    .slice(0, 50) // limit results
    .map((c) => ({
      city: c.city,
      country: getCountryName(c.countryCode),
      offset: getOffsetHours(c.timezone),
      timezone: c.timezone,
      lat: c.lat,
      lon: c.lon,
      population: c.population,
    }));

  res.json(results);
});

// --- Start the server ---
app.listen(PORT, () =>
  console.log(
    `🚀 Server running at http://localhost:${PORT} and front-end URL is ${FRONT_END_URL}`
  )
);

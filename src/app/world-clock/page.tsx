"use client";

import { useState, useEffect, useCallback, useMemo } from "react";
import ProjectHeader from "../../../components/ProjectHeader";
import { projectsData } from "../../../lib/data";
import { TIMEZONE_OPTIONS, type TimeZoneOption } from "../../../lib/timezone";

const getLocalTimeZone = (): string => {
  try {
    return Intl.DateTimeFormat().resolvedOptions().timeZone;
  } catch {
    return "UTC";
  }
};

const formatTime = ({ date, timeZone }: { date: Date; timeZone: string }) => {
  return new Intl.DateTimeFormat("en-GB", {
    timeZone,
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: false,
  }).format(date);
};

const formatDate = ({ date, timeZone }: { date: Date; timeZone: string }) => {
  return new Intl.DateTimeFormat("en-US", {
    timeZone,
    month: "long",
    day: "numeric",
    year: "numeric",
  }).format(date);
};

const getZone = ({ date, timeZone }: { date: Date; timeZone: string }) => {
  try {
    const parts = new Intl.DateTimeFormat("en-US", {
      timeZone,
      timeZoneName: "short",
    }).formatToParts(date);
    const tzPart = parts.find((p) => p.type === "timeZoneName");
    return tzPart?.value ?? timeZone;
  } catch {
    return "timeZone";
  }
};

const formatShortTime = ({
  date,
  timeZone,
}: {
  date: Date;
  timeZone: string;
}) => {
  return new Intl.DateTimeFormat("en-GB", {
    timeZone,
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  }).format(date);
};

// DST-aware UTC offset (in minutes) for a timezone at a given instant.
const getOffsetMinutes = ({
  date,
  timeZone,
}: {
  date: Date;
  timeZone: string;
}) => {
  const parts = new Intl.DateTimeFormat("en-US", {
    timeZone,
    hour12: false,
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
  }).formatToParts(date);

  const map: Record<string, string> = {};
  parts.forEach((p) => {
    if (p.type !== "literal") map[p.type] = p.value;
  });

  const asUTC = Date.UTC(
    Number(map.year),
    Number(map.month) - 1,
    Number(map.day),
    Number(map.hour) === 24 ? 0 : Number(map.hour),
    Number(map.minute),
    Number(map.second),
  );

  return (asUTC - date.getTime()) / 60000;
};

const getRelativeOffsetLabel = ({
  date,
  targetZone,
  localZone,
}: {
  date: Date;
  targetZone: string;
  localZone: string;
}) => {
  const diffMinutes =
    getOffsetMinutes({ date, timeZone: targetZone }) -
    getOffsetMinutes({ date, timeZone: localZone });

  if (diffMinutes === 0) return "Same time";

  const hours = diffMinutes / 60;
  const sign = hours > 0 ? "+" : "";
  const rounded = Number.isInteger(hours) ? hours : Math.round(hours * 2) / 2;
  return `${sign}${rounded} Hour${Math.abs(rounded) === 1 ? "" : "s"}`;
};

export default function WorldClock() {
  const project = projectsData.find((p) => p.id === 3);

  const localTimeZone = useMemo(() => getLocalTimeZone(), []);

  const [now, setNow] = useState<Date>(new Date());
  const [selectedZoneValue, setSelectedZoneValue] = useState<string>(
    TIMEZONE_OPTIONS.find((tz) => tz.value !== localTimeZone)?.value ??
      TIMEZONE_OPTIONS[0].value,
  );
  const [zones, setZones] = useState<TimeZoneOption[]>([
    TIMEZONE_OPTIONS.find((tz) => tz.value === "America/New_York") ??
      TIMEZONE_OPTIONS[2],
  ]);

  const localZoneInfo = useMemo(
    () =>
      TIMEZONE_OPTIONS.find((tz) => tz.value === localTimeZone) ?? {
        label: localTimeZone,
        value: localTimeZone,
        city: localTimeZone.split("/").pop()?.replace("_", " ") ?? "Local",
        country: "",
      },
    [localTimeZone],
  );

  useEffect(() => {
    const interval = setInterval(() => setNow(new Date()), 1000);
    return () => clearInterval(interval);
  }, []);

  // Add Zone
  const handleAddZone = useCallback(() => {
    const zoneToAdd = TIMEZONE_OPTIONS.find(
      (tz) => tz.value === selectedZoneValue,
    );
    if (!zoneToAdd) return;
    if (zoneToAdd.value === localTimeZone) return; // skip duplicate of "current location"
    setZones((prev) => {
      if (prev.some((z) => z.value === zoneToAdd.value)) return prev;
      return [...prev, zoneToAdd];
    });
  }, [selectedZoneValue, localTimeZone]);

  const handleRemoveZone = useCallback((value: string) => {
    setZones((prev) => prev.filter((z) => z.value !== value));
  }, []);

  if (!project) {
    return (
      <div className="flex-1 flex items-center justify-center min-h-screen">
        Project not found
      </div>
    );
  }

  return (
    <section className="flex-1 w-full max-w-7xl mx-auto px-6 md:px-margin-desktop pt-16 pb-24 flex flex-col items-center mt-8 md:mt-12">
      <ProjectHeader
        challengeNumber={project.id.toString().padStart(3, "0")}
        title={project.title}
        description={project.desc}
      />

      {/* Filter time zone */}
      <div className="flex gap-4">
        <select
          value={selectedZoneValue}
          onChange={(e) => setSelectedZoneValue(e.target.value)}
          className="appearance-none bg-surface border border-outline-variant px-6 py-3 rounded-lg font-label-xs focus:ring-0 focus:border-primary cursor-pointer"
        >
          {TIMEZONE_OPTIONS.map((tz) => (
            <option key={tz.value} value={tz.value}>
              {tz.label}
            </option>
          ))}
        </select>
        <button
          onClick={handleAddZone}
          className="bg-primary text-white px-8 py-3 rounded-lg font-label-xs hover:opacity-90 transition-opacity"
        >
          Add Zone
        </button>
      </div>

      <div className="w-full max-w-4xl grid grid-cols-1 md:grid-cols-12 gap-8 my-8">
        {/* Clock */}
        <div className="col-span-12 lg:col-span-8 p-12 flex flex-col justify-between h-120 bg-on-primary border border-outline-variant shadow-lg">
          <div className="flex justify-between items-start">
            <div>
              <span className="uppercase font-code-sm text-xs md:text-sm tracking-widest text-secondary">
                Current Location
              </span>
              <h3 className="font-headline-md text-headline-md mt-1">
                {localZoneInfo.city}
                {localZoneInfo.country ? `, ${localZoneInfo.country}` : ""}
              </h3>
            </div>
            <div className="text-right">
              <span className="uppercase font-code-sm text-xs md:text-sm tracking-widest text-secondary">
                Date
              </span>
              <p className="font-body-md font-bold mt-1" id="current-date">
                {formatDate({ date: now, timeZone: localTimeZone })}
              </p>
            </div>
          </div>
          <div className="py-12">
            <div
              className="time-display font-headline-xl text-8xl md:text-9xl leading-none font-extrabold tracking-tighter"
              id="main-clock"
            >
              {formatTime({ date: now, timeZone: localTimeZone })}
            </div>
          </div>
        </div>

        {/* List countries */}
        <ul className="col-span-12 lg:col-span-4 flex flex-col gap-6">
          {zones.length === 0 && (
            <li className="p-8 bg-on-primary text-center font-body-md text-secondary">
              No zones added yet. Pick one above and hit &ldquo;Add Zone&rdquo;.
            </li>
          )}
          {zones.map((zone) => (
            <li
              key={zone.value}
              className="p-8 bg-on-primary flex justify-between items-center group cursor-pointer overflow-hidden transition-border duration-300 hover:border hover:border-outline-variant ease-in-out"
            >
              <div>
                <span className="uppercase font-code-sm text-xs md:text-sm tracking-widest text-secondary">
                  {zone.city}
                </span>
                <h4 className="font-headline-md text-headline-md text-on-surface mt-1">
                  {getZone({ date: now, timeZone: zone.value })}
                </h4>
              </div>
              <div className="flex items-center gap-4">
                <div className="text-right">
                  <div className="font-headline-md text-headline-md font-bold">
                    {formatShortTime({ date: now, timeZone: zone.value })}
                  </div>

                  <span className="uppercase font-code-sm text-xs md:text-sm tracking-widest text-secondary">
                    {getRelativeOffsetLabel({
                      date: now,
                      targetZone: zone.value,
                      localZone: localTimeZone,
                    })}
                  </span>
                </div>
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleRemoveZone(zone.value);
                  }}
                  aria-label={`Remove ${zone.city}`}
                  className="opacity-0 group-hover:opacity-100 transition-opacity text-error text-xl leading-none"
                >
                  ×
                </button>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

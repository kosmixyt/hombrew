"use client";

import React, { useEffect } from "react";
import toast from "react-hot-toast";

export type FreeIpApiResponse = {
  ipVersion: string;
  ipAddress: string;
  latitude: number;
  longitude: number;
  countryName: string;
  countryCode: string;
  timeZone: string;
  zipCode: string;
  cityName: string;
  regionName: string;
  isProxy: boolean;
  continent: string;
  continentCode: string;
  currency: {
    code: string;
    name: string;
  };
  language: string;
  timeZones: string[];
  tlds: string[];
};

export default function WhoisPage(props: { ip: string }) {
  const input = React.useRef<HTMLInputElement>(null);
  const [ip, setIp] = React.useState<FreeIpApiResponse | null>(null);
  useEffect(() => {
    input.current!.value = props.ip;
    input.current?.focus();
  }, []);
  const fetchIp = async () => {
    input.current?.blur();
    input.current!.disabled = true;
    const res = await fetch(
      `https://freeipapi.com/api/json/${input.current?.value}`,
    );
    const data = await res.json();
    input.current!.disabled = false;
    if (data.ipAddress.length === 0) {
      return toast.error("Invalid IP Address");
    }
    toast.success("IP Address Found");
    setIp(data);
  };

  return (
    <div className="flex min-h-screen w-full justify-center bg-slate-800 text-white">
      <div className="mt-20">
        <div className="text-center text-4xl">Whois</div>
        <input
          onKeyUp={(e) => e.key === "Enter" && fetchIp()}
          onClick={(e) => e.currentTarget.select()}
          ref={input}
          className="w-70 mt-4 h-12 rounded-lg border-2 border-white bg-transparent p-4 text-center text-4xl text-white outline-none"
          type="text"
        />
        {ip && (
          <div className="mt-10 rounded-lg bg-slate-800 p-6 shadow-lg">
            <h2 className="mb-4 text-2xl">IP Information</h2>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <strong>IP Address:</strong> {ip.ipAddress}
              </div>
              <div>
                <strong>IP Version:</strong> {ip.ipVersion}
              </div>
              <div>
                <strong>Country:</strong> {ip.countryName} ({ip.countryCode})
              </div>
              <div>
                <strong>Region:</strong> {ip.regionName}
              </div>
              <div>
                <strong>City:</strong> {ip.cityName}
              </div>
              <div>
                <strong>Zip Code:</strong> {ip.zipCode}
              </div>
              <div>
                <strong>Latitude:</strong> {ip.latitude}
              </div>
              <div>
                <strong>Longitude:</strong> {ip.longitude}
              </div>
              <div>
                <strong>Time Zone:</strong> {ip.timeZone}
              </div>
              <div>
                <strong>Continent:</strong> {ip.continent} ({ip.continentCode})
              </div>
              <div>
                <strong>Currency:</strong> {ip.currency.name} (
                {ip.currency.code})
              </div>
              <div>
                <strong>Language:</strong> {ip.language}
              </div>
              <div>
                <strong>Is Proxy:</strong> {ip.isProxy ? "Yes" : "No"}
              </div>
              <div>
                <strong>Top Level Domains:</strong> {ip.tlds.join(", ")}
              </div>
              <div>
                <strong>Time Zones:</strong> {ip.timeZones.join(", ")}
              </div>
            </div>
            <button
              onClick={() => setIp(null)}
              className="mt-6 w-full rounded-lg bg-red-600 py-2 text-white"
            >
              Clear
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

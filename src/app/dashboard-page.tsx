"use client";
import React, { useState, useEffect } from "react";
import { Event } from "./types";

interface DashboardPageProps {
  lumaEvent: Event;
}

export default function DashboardPage({ lumaEvent }: DashboardPageProps) {
  const getEventInfo = async () => {
    const response = await fetch(
      `/api/geteventinfo?event_api_id=${lumaEvent.event.api_id}`,
    );
    let json = await response.json();

    if (response.status === 401) {
      console.log("Not Signed In");
    } else {
      console.log("Event Info");
      console.log(json.message);
    }
  };

  useEffect(() => {
    getEventInfo();
  }, []);

  return (
    <div className="h-screen bg-cream flex flex-col items-center">
      <h1 className="mt-8 text-2xl">Luma Dashboard</h1>
    </div>
  );
}

"use client";
import React, { useState, useEffect } from "react";
import { UserEvents, Event } from "./types";
import EventPage from "@/app/event-page";
import DashboardPage from "@/app/dashboard-page";

export default function Home() {
  const [userEvents, setUserEvents] = useState<UserEvents>();
  const [selectedEvent, setSelectedEvent] = useState<Event>();
  const [showDashboard, setShowDashboard] = useState<boolean>(false);

  const getUserEvents = async () => {
    const response = await fetch("/api/getuserevents");
    let json = await response.json();

    if (response.status === 401) {
      console.log("Not Signed In");
    } else {
      let e = json.message as UserEvents;
      setUserEvents(e); 
    }
  };

  useEffect(() => {
    getUserEvents();
  }, []);

  const handleEventClick = (lumaEvent: Event) => {
    console.log(lumaEvent);
    setSelectedEvent(lumaEvent);
    setShowDashboard(true);
  }

  return (
    <div>
      {userEvents && !showDashboard &&  (
        <EventPage
          userEvents={userEvents}
          onEventClick={handleEventClick}
        />
      )}
      {selectedEvent && showDashboard && (
        <DashboardPage />
      )}
    </div>
  );
}

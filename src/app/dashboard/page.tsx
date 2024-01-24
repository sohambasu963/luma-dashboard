"use client";
import React, { useState, useEffect, useRef } from "react";
import { Event } from "../types";

interface DashboardPageProps {
  lumaEvent: Event;
}

export default function DashboardPage({ lumaEvent }: DashboardPageProps) {

  const [guestData, setGuestData] = useState<any[]>([]);
  const initialized = useRef(false)

  const getGuestEntries = async (paginationCursor: string) => {
    const response = await fetch(
        `/api/geteventguests?event_api_id=${lumaEvent.event.api_id}&pagination_cursor=${paginationCursor}`,
    );
    let json = await response.json();

    if (response.status === 401) {
      console.log("Not Signed In");
    } else {
      console.log("Event Info");
      console.log(json.message);
    }

    return json.message;
  };

  const getAllGuestEntries = async () => {
    let paginationCursor = '';
    while (true) {
        const guestEntries = await getGuestEntries(paginationCursor);
        setGuestData(prevGuestData => [...prevGuestData, ...guestEntries.entries]);
        if (!guestEntries.has_more) {
            break;
        } else {
            paginationCursor = guestEntries.next_cursor;
        }
    }
  }


  useEffect(() => {
    if (!initialized.current) {
        initialized.current = true;
        getAllGuestEntries();
    }
  }, []);


  return (
    <div className="h-screen bg-cream flex flex-col items-center">
      <h1 className="mt-8 text-2xl">Luma Dashboard</h1>
      <p>Guest Count: {guestData.length}</p>
    </div>
  );
}

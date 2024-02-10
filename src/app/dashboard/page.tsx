"use client";
import React, { useState, useEffect, useRef } from "react";
import { Event } from "../types";

interface DashboardPageProps {
  lumaEvent: Event;
}

export default function DashboardPage({ lumaEvent }: DashboardPageProps) {

  const [guestData, setGuestData] = useState<any[]>([]);
  const [genderData, setGenderData] = useState<{ male: number, female: number }>({ male: 0, female: 0 });
  const initialized = useRef(false);

  const updateGenderData = (entries: any) => {
    let maleCount = 0;
    let femaleCount = 0;
  
    entries.forEach((entry: any) => {
      if (entry.approval_status !== 'approved') return;
      const firstAnswer = entry.registration_answers[0]?.answer;
      if (/she|her/i.test(firstAnswer)) {
        femaleCount += 1;
      } else if (/he|him/i.test(firstAnswer)) {
        maleCount += 1;
      } else {
        const randomGender = Math.random() < 0.5 ? 'male' : 'female';
        if (randomGender === 'male') {
          maleCount += 1;
        } else {
          femaleCount += 1;
        }
      }
    });
  
    setGenderData(prevGenderData => ({
      male: prevGenderData.male + maleCount,
      female: prevGenderData.female + femaleCount
    }));
  }
  


  const getGuestEntries = async (paginationCursor: string) => {
    const response = await fetch(
        `/api/geteventguests?event_api_id=${lumaEvent.event.api_id}&pagination_cursor=${paginationCursor}`,
    );
    let json = await response.json();

    if (response.status === 401) {
      console.log("Not Signed In");
    } else {
      console.log(json.message);
    }

    updateGenderData(json.message.entries);
    setGuestData(prevGuestData => [...prevGuestData, ...json.message.entries]);
    if (json.message.has_more) {
      getGuestEntries(json.message.next_cursor)
    }
  };


  useEffect(() => {
    if (!initialized.current) {
        initialized.current = true;
        getGuestEntries("");
    }
  }, []);




  return (
    <div className="h-screen bg-cream flex flex-col items-center">
      <h1 className="mt-8 text-2xl">Luma Dashboard</h1>
      <p>Guest Count: {genderData.male + genderData.female}</p>
      <p>Males: {genderData.male}</p>
      <p>Females: {genderData.female}</p>
    </div>
  );
}

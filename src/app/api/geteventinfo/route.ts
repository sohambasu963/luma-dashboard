//https://api.lu.ma/event/get-for-manage-page?event_api_id={event id from getuserevents}

import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const eventId = searchParams.get("event_api_id");

  let initial = await fetch(
    "https://api.lu.ma/event/get-for-manage-page?event_api_id=" + eventId,
    {
      credentials: "include",
      headers: {
        "User-Agent":
          "Mozilla/5.0 (Macintosh; Intel Mac OS X 10.15; rv:122.0) Gecko/20100101 Firefox/122.0",
        Accept: "application/json, text/plain, */*",
        "Accept-Language": "en-CA,en-US;q=0.7,en;q=0.3",
        "x-luma-web-url":
          "https://lu.ma/home?gclid=EAIaIQobChMIpL3MoeDkgwMVlROtBh15VQZ0EAAYASAAEgJrmPD_BwE",
        "x-luma-client-type": "luma-web",
        "Sec-Fetch-Dest": "empty",
        "Sec-Fetch-Mode": "cors",
        "Sec-Fetch-Site": "same-site",
        Pragma: "no-cache",
        "Cache-Control": "no-cache",
        Cookie: request.headers.get("Cookie") ?? "",
      },
      referrer: "https://lu.ma/",
      method: "GET",
      mode: "cors",
    },
  );

  let data = await initial.json();
  if (data.message) {
    return NextResponse.json(data);
  }

  return NextResponse.json({ message: data });
}

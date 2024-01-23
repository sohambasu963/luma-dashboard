import { NextResponse } from "next/server";

export async function GET(request: Request) {
  let initial = await fetch("https://api.lu.ma/search/get-results?query=", {
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
  });

  let data = await initial.json();
  console.log(data);
  if (data.message && data.message == "Not signed in.") {
    return NextResponse.json(
      {
        message: data.message,
      },
      {
        status: 401,
      },
    );
  }

  return NextResponse.json({ message: data });
}

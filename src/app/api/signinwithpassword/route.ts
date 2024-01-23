import { NextResponse } from "next/server";
import { parseCookie } from "../utils";

export async function POST(request: Request) {
  const { email, password } = await request.json();

  let initial = await fetch("https://api.lu.ma/auth/sign-in-with-password", {
    credentials: "include",
    headers: {
      "User-Agent":
        "Mozilla/5.0 (Macintosh; Intel Mac OS X 10.15; rv:122.0) Gecko/20100101 Firefox/122.0",
      Accept: "application/json, text/plain, */*",
      "Accept-Language": "en-CA,en-US;q=0.7,en;q=0.3",
      "Content-Type": "application/json",
      "x-luma-web-url": "https://lu.ma/signin?next=%2Fsettings",
      "x-luma-client-type": "luma-web",
      "Sec-Fetch-Dest": "empty",
      "Sec-Fetch-Mode": "cors",
      "Sec-Fetch-Site": "same-site",
    },
    referrer: "https://lu.ma/",
    body: '{"email":"' + email + '","password":"' + password + '"}',
    method: "POST",
    mode: "cors",
  });

  let data = await initial.json();
  let cookies = parseCookie(initial.headers.get("Set-Cookie") ?? "");

  //console.log(initial.headers.get("Set-Cookie"))
  //console.log(parseCookie(initial.headers.get("Set-Cookie") ?? ""))

  return new Response(JSON.stringify(data), {
    status: 200,
    headers: {
      "Set-Cookie": `${cookies.key}=${cookies.value}` ?? undefined,
    } as HeadersInit,
  });
}

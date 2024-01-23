import { NextResponse } from "next/server";
import { cookies } from "next/headers";
export async function POST(request: Request) {
  const { email } = await request.json();

  const cookiesStore = cookies();

  let initial = await fetch("https://api.lu.ma/auth/email/start-with-email", {
    credentials: "omit",
    headers: {
      "User-Agent":
        "Mozilla/5.0 (Macintosh; Intel Mac OS X 10.15; rv:122.0) Gecko/20100101 Firefox/122.0",
      Accept: "application/json, text/plain, */*",
      "Accept-Language": "en-CA,en-US;q=0.7,en;q=0.3",
      "Content-Type": "application/json",
      "x-luma-client-hash": "f9e007ae5cbf9ea1ce7dbeba86a7807048a1b779",
      "x-luma-web-url": "https://lu.ma/signin",
      "x-luma-client-type": "luma-web",
      "Sec-Fetch-Dest": "empty",
      "Sec-Fetch-Mode": "no-cors",
      "Sec-Fetch-Site": "same-site",
      Pragma: "no-cache",
      "Cache-Control": "no-cache",
    },
    referrer: "https://lu.ma/",
    body: '{"email":"' + email + '"}',
    method: "POST",
    mode: "cors",
  });

  let data = await initial.json();

  console.log("Cookies:");
  console.log(initial.headers);
  console.log(initial.headers.get("Set-Cookie") ?? "NA");

  return NextResponse.json(data);
}

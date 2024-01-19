import { NextResponse } from 'next/server';
import { parseCookie } from '../utils';

export async function POST(request: Request) {

  const { email, code } = await request.json()
  
  let initial = await fetch("https://api.lu.ma/auth/email/sign-in-with-code", {
    credentials: "include",
    headers: {
      "User-Agent":
        "Mozilla/5.0 (Macintosh; Intel Mac OS X 10.15; rv:122.0) Gecko/20100101 Firefox/122.0",
      Accept: "application/json, text/plain, */*",
      "Accept-Language": "en-CA,en-US;q=0.7,en;q=0.3",
      "Content-Type": "application/json",
      "x-luma-web-url": "https://lu.ma/signin",
      "x-luma-client-type": "luma-web",
      "Sec-Fetch-Dest": "empty",
      "Sec-Fetch-Mode": "no-cors",
      "Sec-Fetch-Site": "same-site",
      Pragma: "no-cache",
      "Cache-Control": "no-cache",
    },
    referrer: "https://lu.ma/",
    body: '{"email":"' + email + '","code":"' + code + '"}',
    method: "POST",
    mode: "cors",
  });
  

  let data = await initial.json();
  let cookies = parseCookie(initial.headers.get("Set-Cookie") ?? "")

  //console.log(initial.headers.get("Set-Cookie")) 
  //console.log(parseCookie(initial.headers.get("Set-Cookie") ?? ""))
  
  return new Response(JSON.stringify(data), {
    status: 200,
    headers: { 
        'Set-Cookie': `${cookies.key}=${cookies.value}` ?? undefined, 
    } as HeadersInit,
  });
  
}

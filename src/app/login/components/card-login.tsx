"use client";
import React, { useState, useEffect } from "react";
import { Icons } from "@/components/ui/icons";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import * as z from "zod";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

const StartSchema = z.object({
  email: z.string(),
});

const SignInSchema = z.object({
  pass: z.string(),
});

export function CardLogin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [step, setStep] = useState("email");
  const [name, setName] = useState("");
  const router = useRouter();

  const handleLogin = async (
    e:
      | React.FormEvent<HTMLFormElement>
      | React.MouseEvent<HTMLButtonElement, MouseEvent>,
    method: string,
  ) => {
    e.preventDefault();

    console.log("handleLogin");
  };

  async function onEmailSubmit(data: z.infer<typeof StartSchema>) {
    setEmail(data.email);
    try {
      let output = await fetch("/api/startwithemail", {
        credentials: "omit",
        headers: {
          "Content-Type": "application/json",
        },
        body: '{"email":"' + data.email + '"}',
        method: "POST",
      });

      console.log(output.headers);
      let json = await output.json();
      if (json.has_password) {
        setStep("password");
      } else {
        setStep("code");
      }
      console.log("step: " + step);
      //getUserEvents();
    } catch (e) {
      console.log(e);
    }
  }

  async function onCodeSubmit(data: z.infer<typeof SignInSchema>) {
    console.log("onCodeSubmit: ", data.pass);
    try {
      let output = await fetch("/api/signinwithcode", {
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: '{"email":"' + email + '","code":"' + data.pass + '"}',
        method: "POST",
      });

      let json = await output.json();

      setStep("done");
      setName(json.name);
      console.log("Name: " + json.name);
      router.push("/");
      // getUserEvents();
    } catch (e) {
      console.log(e);
    }
  }

  async function onPasswordSubmit(data: z.infer<typeof SignInSchema>) {
    try {
      let output = await fetch("/api/signinwithpassword", {
        headers: {
          "Content-Type": "application/json",
        },
        body: '{"email":"' + email + '","password":"' + data.pass + '"}',
        method: "POST",
      });

      let json = await output.json();
      setStep("done");
      setName(json.name);
    } catch (e) {
      console.log(e);
    }
  }

  return (
    <Card className="w-1/4">
      {step === "email" && (
        <form
          onSubmit={(e) => {
            e.preventDefault();
            onEmailSubmit({ email });
          }}
        >
          <CardHeader className="space-y-1">
            <CardTitle className="text-3xl font-eb-garamond">Login</CardTitle>
            <CardDescription className="font-bricolage-grotesque">
              Enter your Luma login email below
            </CardDescription>
          </CardHeader>
          <CardContent className="grid gap-4">
            <div className="grid gap-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="name@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
          </CardContent>
          <CardFooter>
            <Button
              className="w-full bg-primary hover:bg-[#083970] transition-colors duration-500 ease-in-out"
              type="submit"
            >
              Next
            </Button>
          </CardFooter>
        </form>
      )}
      {step === "code" && (
        <form
          onSubmit={(e) => {
            e.preventDefault();
            onCodeSubmit({ pass: password });
          }}
        >
          <CardHeader className="space-y-1">
            <CardTitle className="text-3xl font-eb-garamond">
              Enter Code
            </CardTitle>
            <CardDescription className="font-bricolage-grotesque">
              Enter your code below
            </CardDescription>
          </CardHeader>
          <CardContent className="grid gap-4">
            <div className="grid gap-2">
              <Label htmlFor="code">Code</Label>
              <Input
                id="code"
                type="text"
                placeholder="Enter your code"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
          </CardContent>
          <CardFooter>
            <Button
              className="w-full bg-primary hover:bg-[#083970] transition-colors duration-500 ease-in-out"
              type="submit"
            >
              Submit
            </Button>
          </CardFooter>
        </form>
      )}
      {step === "password" && (
        <form
          onSubmit={(e) => {
            e.preventDefault();
            onPasswordSubmit({ pass: password });
          }}
        >
          <CardHeader className="space-y-1">
            <CardTitle className="text-3xl font-eb-garamond">
              Enter Password
            </CardTitle>
            <CardDescription className="font-bricolage-grotesque">
              Enter your password below
            </CardDescription>
          </CardHeader>
          <CardContent className="grid gap-4">
            <div className="grid gap-2">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="text"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
          </CardContent>
          <CardFooter>
            <Button
              className="w-full bg-primary hover:bg-[#083970] transition-colors duration-500 ease-in-out"
              type="submit"
            >
              Submit
            </Button>
          </CardFooter>
        </form>
      )}
    </Card>
  );
}

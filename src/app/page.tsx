"use client"
import { asyncHandlerFront } from "@/lib/asyncHandlerFront";
import { apiClient } from "@/utils/api-client";
import { useEffect } from "react";

export default function Home() {
  useEffect(() => {
    ; (
      async () => {
        await asyncHandlerFront(async () => {
          const res = await apiClient.getToken();

          console.log("res ==>", res);
        }, (error) => {
          console.log("error ==>", error.message);
        })
      }
    )()
  }, [])
  return (
    <div>
      Home page
    </div>
  );
}

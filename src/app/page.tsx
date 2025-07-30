"use client"

import { useEffect } from "react"
import { asyncHandlerFront } from "@/lib/asyncHandlerFront";
import { apiClient } from "@/utils/api-client";
import ReelComponent from "@/components/ReelComponent";

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
      <div className="w-full h-screen dark:bg-black/80 flex flex-col overflow-hidden">
        <div className="border-b border-b-white">
          <div className="max-w-full lg:max-w-5xl mx-auto flex flex-row justify-between items-center p-2">
            <div>
              <h2 className="dark:text-white text-black text-2xl sm:text-3xl">Reels Media</h2>
            </div>
            <div className="flex flex-row gap-2">
              <button className="btn-primary">Login</button>
              <button className="btn-primary">Signup</button>
            </div>
          </div>
        </div>
        <div className="flex justify-center mt-2">
          <ReelComponent />
        </div>
      </div>
    </div>
  )
}

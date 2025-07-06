"use client"
import axios from "axios";
import { useEffect } from "react";

export default function Home() {
  useEffect(() => {
    try {
      (
        async () => {
          const res = await axios.get("/api/auth/session")

          console.log("res ==>", res);
        }
      )()
    } catch (error) {
      if (axios.isAxiosError(error)) console.log("error ==>", error?.response?.data.message);
    }
  }, [])
  return (
    <div>
      Home page
    </div>
  );
}

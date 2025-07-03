"use client"
import axios from "axios";
import { useEffect } from "react";

export default function Home() {
  useEffect(() => {
    try {
      (
        async () => {
          const res = await axios.get("/api/auth/session", {
            withCredentials: true
          })

          console.log("res ==>", res);
        }
      )()
    } catch (error) {
      console.log("error ==>", error);
    }

  }, [])
  return (
    <div>
      Home page
    </div>
  );
}

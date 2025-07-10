"use client"

import { useState, useRef, useEffect } from "react"
import { asyncHandlerFront } from "@/lib/asyncHandlerFront";
import { apiClient } from "@/utils/api-client";
import ReelItem from "@/components/ReelItem";

export interface Reel {
  id: string
  videoUrl: string
  thumbnail: string
  user: {
    username: string
    avatar: string
    isVerified: boolean
  }
  description: string
  likes: number
  comments: number
  shares: number
  isLiked: boolean
  isBookmarked: boolean
}

const mockReels: Reel[] = [
  {
    id: "1",
    videoUrl: "/placeholder.svg?height=800&width=450",
    thumbnail: "/placeholder.svg?height=800&width=450",
    user: {
      username: "johndoe",
      avatar: "/placeholder.svg?height=40&width=40",
      isVerified: true,
    },
    description: "Amazing sunset timelapse from my rooftop! 🌅 #sunset #timelapse #photography",
    likes: 12500,
    comments: 234,
    shares: 89,
    isLiked: false,
    isBookmarked: false,
  },
  {
    id: "2",
    videoUrl: "/placeholder.svg?height=800&width=450",
    thumbnail: "/placeholder.svg?height=800&width=450",
    user: {
      username: "creativestudio",
      avatar: "/placeholder.svg?height=40&width=40",
      isVerified: false,
    },
    description: "Quick design tutorial: Creating smooth animations in Figma ✨ Follow for more tips!",
    likes: 8900,
    comments: 156,
    shares: 67,
    isLiked: true,
    isBookmarked: false,
  },
  {
    id: "3",
    videoUrl: "/placeholder.svg?height=800&width=450",
    thumbnail: "/placeholder.svg?height=800&width=450",
    user: {
      username: "foodielove",
      avatar: "/placeholder.svg?height=40&width=40",
      isVerified: true,
    },
    description: "Perfect pasta recipe in 60 seconds! 🍝 Save this for later #cooking #pasta #recipe",
    likes: 15600,
    comments: 445,
    shares: 234,
    isLiked: false,
    isBookmarked: true,
  },
  {
    id: "4",
    videoUrl: "/placeholder.svg?height=800&width=450",
    thumbnail: "/placeholder.svg?height=800&width=450",
    user: {
      username: "techreview",
      avatar: "/placeholder.svg?height=40&width=40",
      isVerified: true,
    },
    description: "iPhone 15 Pro Max camera test - the results will shock you! 📱 #tech #iphone #camera",
    likes: 23400,
    comments: 567,
    shares: 123,
    isLiked: true,
    isBookmarked: false,
  },
  {
    id: "5",
    videoUrl: "/placeholder.svg?height=800&width=450",
    thumbnail: "/placeholder.svg?height=800&width=450",
    user: {
      username: "fitnessjourney",
      avatar: "/placeholder.svg?height=40&width=40",
      isVerified: false,
    },
    description: "5-minute morning workout routine 💪 No equipment needed! #fitness #workout #morning",
    likes: 9800,
    comments: 234,
    shares: 78,
    isLiked: false,
    isBookmarked: true,
  },
]

export default function Home() {
  const [currentIndex, setCurrentIndex] = useState(0)
  const containerRef = useRef<HTMLDivElement>(null);

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

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowDown") {
        setCurrentIndex((prev) => Math.min(prev + 1, mockReels.length - 1));
      } else if (e.key === "ArrowUp") {
        setCurrentIndex((prev) => Math.max(prev - 1, 0));
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;
    const itemHeight = container.clientHeight;
    container.scrollTo({
      top: currentIndex * itemHeight,
      behavior: "smooth",
    });
  }, [currentIndex]);

  return (
    <div className="relative w-full h-screen dark:bg-black/80 flex justify-center overflow-hidden">
      <div
        ref={containerRef}
        className="md:max-w-md h-full overflow-y-scroll snap-y snap-mandatory scrollbar-hide"
        style={{
          scrollbarWidth: "none",
          msOverflowStyle: "none",
        }}
      >
        {mockReels.map((reel, index) => (
          <div key={reel.id} className="snap-start">
            <ReelItem reel={reel} isActive={index === currentIndex} />
          </div>
        ))}
      </div>

      {/* Scroll Indicators */}
      <div className="absolute right-2 top-1/2 transform -translate-y-1/2 flex flex-col space-y-2">
        {mockReels.map((_, index) => (
          <div
            key={index}
            className={`w-1 h-8 rounded-full transition-colors ${index === currentIndex ? "dark:bg-white bg-black" : "dark:bg-white/30 bg-black/70"}`}
          />
        ))}
      </div>
    </div>
  )
}

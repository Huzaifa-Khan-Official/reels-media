"use client"

import type { Reel } from "@/app/page"
import { Heart, MessageCircle, Share, Bookmark, MoreHorizontal, Play, VolumeX, Volume2 } from "lucide-react"
import { useEffect, useRef, useState } from "react"
import CommentModal from "./CommentModal"
import Image from "next/image"

const formatNumber = (num: number): string => {
  if (num >= 1000000) {
    return (num / 1000000).toFixed(1) + "M"
  }
  if (num >= 1000) {
    return (num / 1000).toFixed(1) + "K"
  }
  return num.toString()
}

const ReelItem = ({ reel, isActive }: { reel: Reel; isActive: boolean }) => {
  const [isPlaying, setIsPlaying] = useState(false)
  const [isMuted, setIsMuted] = useState(true)
  const [isLiked, setIsLiked] = useState(reel.isLiked)
  const [isBookmarked, setIsBookmarked] = useState(reel.isBookmarked)
  const [likes, setLikes] = useState(reel.likes)
  const [isCommentModalOpen, setIsCommentModalOpen] = useState(false)
  const [commentButtonPosition, setCommentButtonPosition] = useState<{ x: number; y: number } | undefined>()

  const videoRef = useRef<HTMLVideoElement>(null)
  const commentButtonRef = useRef<HTMLButtonElement>(null)

  useEffect(() => {
    if (isActive && videoRef.current) {
      videoRef.current.play()
      setIsPlaying(true)
    } else if (videoRef.current) {
      videoRef.current.pause()
      setIsPlaying(false)
    }
  }, [isActive])

  const togglePlay = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause()
      } else {
        videoRef.current.play()
      }
      setIsPlaying(!isPlaying)
    }
  }

  const toggleMute = () => {
    if (videoRef.current) {
      videoRef.current.muted = !isMuted
      setIsMuted(!isMuted)
    }
  }

  const toggleLike = () => {
    setIsLiked(!isLiked)
    setLikes(isLiked ? likes - 1 : likes + 1)
  }

  const toggleBookmark = () => {
    setIsBookmarked(!isBookmarked)
  }

  const handleCommentClick = () => {
    if (commentButtonRef.current) {
      const rect = commentButtonRef.current.getBoundingClientRect()
      setCommentButtonPosition({
        x: rect.left,
        y: rect.top,
      })
    }
    // setIsCommentModalOpen(true)
    setIsCommentModalOpen(!isCommentModalOpen)
  }

  const closeCommentModal = () => {
    setIsCommentModalOpen(false)
  }

  return (
    <>
      <div className="relative w-full h-screen bg-black flex items-center justify-center overflow-hidden">
        {/* Video */}
        <video
          ref={videoRef}
          className="w-full h-full object-cover"
          loop
          muted={isMuted}
          playsInline
          poster={reel.thumbnail}
        >
          <source src={reel.videoUrl} type="video/mp4" />
        </video>

        {/* Play/Pause Overlay */}
        <div className="absolute inset-0 flex items-center justify-center cursor-pointer" onClick={togglePlay}>
          {!isPlaying && (
            <div className="bg-black/50 rounded-full p-4">
              <Play className="w-12 h-12 text-white fill-white" />
            </div>
          )}
        </div>

        {/* Top Controls */}
        <div className="absolute top-4 left-4 right-4 flex justify-between items-center z-10">
          <div className="text-white font-semibold text-lg">Reels</div>
          <button onClick={toggleMute} className="bg-black/50 rounded-full p-2">
            {isMuted ? <VolumeX className="w-5 h-5 text-white" /> : <Volume2 className="w-5 h-5 text-white" />}
          </button>
        </div>

        {/* Bottom Content */}
        <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/80 via-black/40 to-transparent">
          <div className="flex items-end justify-between">
            {/* Left Content */}
            <div className="flex-1 mr-4">
              {/* User Info */}
              <div className="flex items-center mb-3">
                <Image
                  src={reel.user.avatar || "/placeholder.svg"}
                  alt={reel.user.username}
                  className="w-8 h-8 sm:w-10 sm:h-10 rounded-full mr-3"
                  width={40}
                  height={40}
                />
                <div className="flex items-center">
                  <span className="text-white font-semibold text-sm sm:text-base">@{reel.user.username}</span>
                  {reel.user.isVerified && (
                    <div className="w-4 h-4 bg-blue-500 rounded-full flex items-center justify-center ml-1">
                      <div className="w-2 h-2 bg-white rounded-full"></div>
                    </div>
                  )}
                </div>
                <button className="ml-4 px-3 py-1 border border-white rounded-full text-white text-xs font-semibold">
                  Follow
                </button>
              </div>

              {/* Description */}
              <p className="text-white text-sm sm:text-base leading-relaxed mb-2">{reel.description}</p>
            </div>

            {/* Right Actions */}
            <div className="flex flex-col items-center space-y-4 sm:space-y-6">
              {/* Like */}
              <button onClick={toggleLike} className="flex flex-col items-center cursor-pointer">
                <div className="bg-black/50 rounded-full p-2 sm:p-3">
                  <Heart className={`w-6 h-6 sm:w-7 sm:h-7 ${isLiked ? "text-red-500 fill-red-500" : "text-white"}`} />
                </div>
                <span className="text-white text-xs sm:text-sm font-medium mt-1">{formatNumber(likes)}</span>
              </button>

              {/* Comment */}
              <button ref={commentButtonRef} onClick={handleCommentClick} className="flex flex-col items-center cursor-pointer">
                <div className="bg-black/50 rounded-full p-2 sm:p-3">
                  <MessageCircle className="w-6 h-6 sm:w-7 sm:h-7 text-white" />
                </div>
                <span className="text-white text-xs sm:text-sm font-medium mt-1">{formatNumber(reel.comments)}</span>
              </button>

              {/* Share */}
              <button className="flex flex-col items-center">
                <div className="bg-black/50 rounded-full p-2 sm:p-3">
                  <Share className="w-6 h-6 sm:w-7 sm:h-7 text-white" />
                </div>
                <span className="text-white text-xs sm:text-sm font-medium mt-1">{formatNumber(reel.shares)}</span>
              </button>

              {/* Bookmark */}
              <button onClick={toggleBookmark} className="flex flex-col items-center cursor-pointer">
                <div className="bg-black/50 rounded-full p-2 sm:p-3">
                  <Bookmark
                    className={`w-6 h-6 sm:w-7 sm:h-7 ${isBookmarked ? "text-yellow-500 fill-yellow-500" : "text-white"}`}
                  />
                </div>
              </button>

              {/* More */}
              <button className="flex flex-col items-center">
                <div className="bg-black/50 rounded-full p-2 sm:p-3">
                  <MoreHorizontal className="w-6 h-6 sm:w-7 sm:h-7 text-white" />
                </div>
              </button>
            </div>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="absolute bottom-0 left-0 right-0 h-1 bg-white/20">
          <div className="h-full bg-white w-0 animate-pulse"></div>
        </div>
      </div>

      {/* Comment Modal */}
      <CommentModal
        isOpen={isCommentModalOpen}
        onClose={closeCommentModal}
        reelId={reel.id}
        commentCount={reel.comments}
        position={commentButtonPosition}
      />
    </>
  )
}

export default ReelItem

"use client";

import { Plus, Video, X } from "lucide-react";
import { useRef, useState } from "react";
import { toast } from "react-toastify";

export default function CreateTab({ isModalOpen, setIsModalOpen }: {
    isModalOpen: boolean; setIsModalOpen: (open: boolean) => void;
}) {
    const [currentStep, setCurrentStep] = useState<number>(1);
    const [selectedVideo, setSelectedVideo] = useState<File | null>(null);
    const [videoPreview, setVideoPreview] = useState<string | null>(null);
    const [title, setTitle] = useState<string>("");
    const [description, setDescription] = useState<string>("");
    const [isPublishing, setIsPublishing] = useState<boolean>(false);
    const inputRef = useRef<HTMLInputElement>(null);

    const handleVideoSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (file && file.type.startsWith("video/")) {
            setSelectedVideo(file);
            const previewUrl = URL.createObjectURL(file);
            setVideoPreview(previewUrl);
            setCurrentStep(2);
        }
    };

    const handlePublish = async () => {
        if (!selectedVideo) {
            toast.error("No video selected!");
            return;
        }

        console.log("Uploading:", selectedVideo);

        setIsPublishing(true);
        await new Promise((resolve) => setTimeout(resolve, 3000));
        toast.success("Reel published successfully! 🎉");
        resetModal();
        setIsPublishing(false);
    };

    const resetModal = () => {
        setCurrentStep(1);
        setSelectedVideo(null);
        setVideoPreview(null);
        setTitle("");
        setDescription("");
        setIsModalOpen(false);
    };

    return (
        <>
            {isModalOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 dark:bg-black/70 backdrop-blur-sm p-4">
                    <div className="relative w-full max-w-4xl max-h-[90vh] bg-white dark:bg-gray-900 rounded-lg shadow-xl overflow-hidden">
                        {/* Close button */}
                        <button
                            className="absolute top-3 right-3 z-10 p-2 text-gray-600 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white bg-white/80 dark:bg-gray-800/80 rounded-full backdrop-blur-sm transition-colors"
                            onClick={resetModal}
                            disabled={isPublishing}
                        >
                            <X className="w-4 h-4 sm:w-5 sm:h-5" />
                        </button>

                        {/* Header */}
                        <div className="p-4 sm:p-6 border-b border-gray-200 dark:border-gray-700">
                            <h3 className="text-lg sm:text-xl font-bold text-gray-900 dark:text-white">Create New Reel</h3>
                        </div>

                        {/* Content */}
                        <div className="p-4 sm:p-6 overflow-y-auto max-h-[calc(90vh-200px)]">
                            {/* Step 1: Upload Video */}
                            {currentStep === 1 && (
                                <div className="space-y-4 sm:space-y-6">
                                    <div
                                        className="border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg p-6 sm:p-8 text-center cursor-pointer hover:border-gray-400 dark:hover:border-gray-500 transition-colors"
                                        onClick={() => inputRef.current?.click()}
                                    >
                                        <Video className="w-12 h-12 sm:w-16 sm:h-16 mx-auto mb-3 sm:mb-4 text-gray-400" />
                                        <h4 className="text-base sm:text-lg font-semibold mb-2 text-gray-900 dark:text-white">
                                            Upload Your Video
                                        </h4>
                                        <p className="text-sm sm:text-base text-gray-500 dark:text-gray-400 mb-4">
                                            Choose a video file to create your reel
                                        </p>
                                        <input type="file" accept="video/*" onChange={handleVideoSelect} className="hidden" ref={inputRef} />
                                        <div className="inline-flex items-center px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors text-sm font-medium">
                                            Select Video
                                        </div>
                                    </div>

                                    <div className="text-xs sm:text-sm text-gray-500 dark:text-gray-400 space-y-1">
                                        <p>• Supported formats: MP4, MOV, AVI</p>
                                        <p>• Maximum file size: 100MB</p>
                                        <p>• Recommended duration: 15-60 seconds</p>
                                    </div>
                                </div>
                            )}

                            {/* Step 2: Add Details */}
                            {currentStep === 2 && (
                                <div className="space-y-4 sm:space-y-6">
                                    <div className="flex flex-col lg:flex-row gap-4 sm:gap-6">
                                        {/* Video Preview */}
                                        <div className="w-full lg:w-2/5">
                                            <h4 className="font-semibold mb-3 text-gray-900 dark:text-white text-sm sm:text-base">
                                                Video Preview
                                            </h4>
                                            {videoPreview && (
                                                <div className="aspect-[9/16] bg-black rounded-lg overflow-hidden mx-auto lg:mx-0">
                                                    <video src={videoPreview} controls className="w-full h-full object-cover" />
                                                </div>
                                            )}
                                        </div>

                                        {/* Details Form */}
                                        <div className="w-full lg:w-3/5 space-y-4">
                                            <div>
                                                <label className="block font-semibold mb-2 text-sm text-gray-900 dark:text-white">Title</label>
                                                <input
                                                    value={title}
                                                    onChange={(e) => setTitle(e.target.value)}
                                                    type="text"
                                                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent bg-white dark:bg-gray-800 text-gray-900 dark:text-white text-sm sm:text-base"
                                                    placeholder="Enter an engaging title..."
                                                    required
                                                    maxLength={100}
                                                />
                                                <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">{title.length}/100</p>
                                            </div>

                                            <div>
                                                <label className="block font-semibold mb-2 text-sm text-gray-900 dark:text-white">
                                                    Description
                                                </label>
                                                <textarea
                                                    placeholder="Tell your audience about this reel..."
                                                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent bg-white dark:bg-gray-800 text-gray-900 dark:text-white text-sm sm:text-base h-20 sm:h-24 resize-none"
                                                    value={description}
                                                    onChange={(e) => setDescription(e.target.value)}
                                                    maxLength={500}
                                                />
                                                <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">{description.length}/500</p>
                                            </div>

                                            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 sm:gap-4">
                                                <label className="flex items-center space-x-2 text-sm">
                                                    <input
                                                        type="checkbox"
                                                        className="w-4 h-4 text-primary-600 bg-gray-100 border-gray-300 rounded focus:ring-primary-500 dark:focus:ring-primary-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                                                        defaultChecked
                                                    />
                                                    <span className="text-gray-900 dark:text-white">Allow comments</span>
                                                </label>
                                                <label className="flex items-center space-x-2 text-sm">
                                                    <input
                                                        type="checkbox"
                                                        className="w-4 h-4 text-primary-600 bg-gray-100 border-gray-300 rounded focus:ring-primary-500 dark:focus:ring-primary-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                                                        defaultChecked
                                                    />
                                                    <span className="text-gray-900 dark:text-white">Public reel</span>
                                                </label>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )}
                        </div>

                        {/* Footer with Action Buttons */}
                        {currentStep === 2 && (
                            <div className="p-4 sm:p-6 border-t border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800/50">
                                <div className="flex flex-col sm:flex-row justify-between gap-3">
                                    <button
                                        className="px-4 py-2 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors text-sm font-medium order-2 sm:order-1"
                                        onClick={() => setCurrentStep(1)}
                                        disabled={isPublishing}
                                    >
                                        Back
                                    </button>
                                    <button
                                        className="px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors text-sm font-medium flex items-center justify-center gap-2 order-1 sm:order-2 cursor-pointer"
                                        onClick={handlePublish}
                                        disabled={!title.trim() || isPublishing}
                                    >
                                        {isPublishing ? (
                                            <>
                                                <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                                                Publishing...
                                            </>
                                        ) : (
                                            <>
                                                <Plus className="w-4 h-4" />
                                                Publish Reel
                                            </>
                                        )}
                                    </button>
                                </div>
                            </div>
                        )}

                        {/* Publishing Overlay */}
                        {isPublishing && (
                            <div className="absolute inset-0 bg-white/90 dark:bg-gray-900/90 backdrop-blur-sm flex items-center justify-center rounded-lg">
                                <div className="text-center p-6">
                                    <div className="w-12 h-12 border-4 border-primary-200 border-t-primary-600 rounded-full animate-spin mx-auto mb-4"></div>
                                    <h4 className="text-base sm:text-lg font-semibold mb-2 text-gray-900 dark:text-white">
                                        Publishing Your Reel
                                    </h4>
                                    <p className="text-sm text-gray-600 dark:text-gray-400">Please wait while we process your video...</p>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            )}
        </>
    );
}

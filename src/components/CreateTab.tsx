"use client";

import { Plus, Video, X } from "lucide-react";
import { useState } from "react";

export default function CreateTab({
    isModalOpen,
    setIsModalOpen,
}: {
    isModalOpen: boolean;
    setIsModalOpen: (open: boolean) => void;
}) {
    const [currentStep, setCurrentStep] = useState<number>(1);
    const [selectedVideo, setSelectedVideo] = useState<File | null>(null);
    const [videoPreview, setVideoPreview] = useState<string | null>(null);
    const [title, setTitle] = useState<string>("");
    const [description, setDescription] = useState<string>("");
    const [isPublishing, setIsPublishing] = useState<boolean>(false);

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
        setIsPublishing(true);
        // Simulate upload
        await new Promise((resolve) => setTimeout(resolve, 3000));
        alert("Reel published successfully! 🎉");

        // Reset
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
                <div className="fixed inset-0 z-50 flex items-center justify-center dark:bg-black/70 backdrop-blur-sm dark:text-white/90">
                    <div className="relative w-full h-screen max-w-2xl mx-4 bg-white dark:bg-gray-900 rounded-lg shadow-lg p-6">
                        {/* Close button */}
                        <button
                            className="absolute top-4 right-4 text-gray-600 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white"
                            onClick={resetModal}
                            disabled={isPublishing}
                        >
                            <X className="w-5 h-5" />
                        </button>

                        {/* Step Indicator */}
                        <div className="mb-6">
                            <h3 className="text-xl font-bold mb-2">Create New Reel</h3>
                            <div className="flex space-x-4">
                                <div
                                    className={`step ${currentStep >= 1 ? "text-primary font-semibold" : "text-gray-400"}`}
                                >
                                    Upload Video
                                </div>
                                <div
                                    className={`step ${currentStep >= 2 ? "text-primary font-semibold" : "text-gray-400"}`}
                                >
                                    Add Details
                                </div>
                            </div>
                        </div>

                        {/* Step 1: Upload Video */}
                        {currentStep === 1 && (
                            <div className="space-y-6">
                                <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center">
                                    <Video className="w-16 h-16 mx-auto mb-4 text-gray-400" />
                                    <h4 className="text-lg font-semibold mb-2">Upload Your Video</h4>
                                    <p className="text-gray-500 mb-4">Choose a video file to create your reel</p>
                                    <input
                                        type="file"
                                        accept="video/*"
                                        onChange={handleVideoSelect}
                                        className="file-input file-input-bordered file-input-primary w-full max-w-xs"
                                    />
                                </div>
                                <div className="text-sm text-gray-500">
                                    <p>• Supported formats: MP4, MOV, AVI</p>
                                    <p>• Maximum file size: 100MB</p>
                                    <p>• Recommended duration: 15-60 seconds</p>
                                </div>
                            </div>
                        )}

                        {/* Step 2: Add Details */}
                        {currentStep === 2 && (
                            <div className="space-y-6 overflow-y-auto">
                                <div className="flex flex-col md:flex-row gap-6">
                                    {/* Video Preview */}
                                    <div className="md:w-1/2">
                                        <h4 className="font-semibold mb-3">Video Preview</h4>
                                        {videoPreview && (
                                            <div className="aspect-[9/16] bg-black rounded-lg overflow-hidden max-w-xs mx-auto">
                                                <video
                                                    src={videoPreview}
                                                    controls
                                                    className="w-full h-full object-cover"
                                                />
                                            </div>
                                        )}
                                    </div>

                                    {/* Details Form */}
                                    <div className="md:w-1/2 space-y-4">
                                        <div>
                                            <label htmlFor="first_name" className="block font-semibold mb-2 text-sm text-gray-900 dark:text-white">First name</label>
                                            <input
                                                value={title}
                                                onChange={(e) => setTitle(e.target.value)}
                                                type="text"
                                                id="first_name"
                                                className="input"
                                                placeholder="Enter an engaging title..."
                                                required
                                                maxLength={100}
                                            />
                                            <p className="text-xs text-gray-500 mt-1">
                                                {title.length}/100
                                            </p>
                                        </div>

                                        <div>
                                            <label className="block mb-1 font-semibold">
                                                Description
                                            </label>
                                            <textarea
                                                placeholder="Tell your audience about this reel..."
                                                className="input textarea textarea-bordered w-full h-24"
                                                value={description}
                                                onChange={(e) => setDescription(e.target.value)}
                                                maxLength={500}
                                            />
                                            <p className="text-xs text-gray-500 mt-1">
                                                {description.length}/500
                                            </p>
                                        </div>

                                        <div className="flex items-center justify-between">
                                            <label className="flex items-center space-x-2">
                                                <span>Allow comments</span>
                                                <input
                                                    type="checkbox"
                                                    className="toggle toggle-primary"
                                                    defaultChecked
                                                />
                                            </label>
                                            <label className="flex items-center space-x-2">
                                                <span>Public reel</span>
                                                <input
                                                    type="checkbox"
                                                    className="toggle toggle-primary"
                                                    defaultChecked
                                                />
                                            </label>
                                        </div>
                                    </div>
                                </div>

                                {/* Action Buttons */}
                                <div className="flex justify-between pt-4">
                                    <button
                                        className="btn btn-outline"
                                        onClick={() => setCurrentStep(1)}
                                        disabled={isPublishing}
                                    >
                                        Back
                                    </button>
                                    <button
                                        className="btn btn-primary"
                                        onClick={handlePublish}
                                        disabled={!title.trim() || isPublishing}
                                    >
                                        {isPublishing ? (
                                            <>
                                                <span className="loading loading-spinner loading-sm"></span>
                                                Publishing...
                                            </>
                                        ) : (
                                            <>
                                                <Plus className="w-4 h-4 mr-2" />
                                                Publish Reel
                                            </>
                                        )}
                                    </button>
                                </div>
                            </div>
                        )}

                        {/* Publishing Overlay */}
                        {isPublishing && (
                            <div className="absolute inset-0 bg-white/80 dark:bg-black/80 backdrop-blur-sm flex items-center justify-center rounded-lg">
                                <div className="text-center">
                                    <div className="loading loading-spinner loading-lg text-primary mb-4"></div>
                                    <h4 className="text-lg font-semibold mb-2">
                                        Publishing Your Reel
                                    </h4>
                                    <p className="text-gray-600 dark:text-gray-400">
                                        Please wait while we process your video...
                                    </p>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            )}
        </>
    );
}

"use client"

import { configs } from "@/constants/configs";
import { asyncHandlerFront } from "@/lib/asyncHandlerFront";
import { apiClient } from "@/utils/api-client";
import { upload} from "@imagekit/next";
import { useState } from "react";
import { toast } from "react-toastify";

interface ImageKitUploadResponse {
    fileId: string;
    url: string
    thumbnailUrl: string;
    name: string;
}

interface FileUploadProps {
    onSuccess: (res: ImageKitUploadResponse) => void;
    onProgress?: (progress: number) => void;
    fileType?: "image" | "video";
}

const FileUpload = ({
    onSuccess,
    onProgress,
    fileType
}: FileUploadProps) => {
    const [uploading, setUploading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const validateFile = (file: File) => {
        if (fileType === "video") {
            if (!file.type.startsWith("video/")) {
                setError("Please select a video file.");
            }
        }

        if (file.size > 100 * 1024 * 1024) {
            setError("File size should be less than 100MB.");
        }

        return true;
    }

    const handleChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];

        if (!file || !validateFile(file)) return;

        setUploading(true);
        setError(null);

        await asyncHandlerFront(
            async () => {
                const authRes = await apiClient.imageKitAuth();

                const { token, signature, expire } = authRes.data;

                const res = await upload({
                    file,
                    fileName: file.name,
                    publicKey: configs.imageKitPublicKey,
                    signature,
                    expire,
                    token,
                    onProgress: (event) => {
                        if (event.lengthComputable && onProgress) {
                            const percent = Math.round((event.loaded / event.total) * 100);

                            onProgress(percent);
                        }
                    }
                });

                if (!res.url || !res.name || !res.fileId) {
                    throw new Error("Upload failed: missing required fields in response.");
                }
                onSuccess({
                    fileId: res.fileId as string,
                    url: res.url as string,
                    thumbnailUrl: res.thumbnailUrl as string,
                    name: res.name as string,
                });
            },
            (err) => {
                toast.error(error || err.message);
            }
        );
        setUploading(false);
    }

    return (
        <>
            <input
                type="file"
                accept={fileType === "video" ? "video/*" : "image/*"}
                onChange={handleChange}
            />
            {
                uploading && (
                    <span>Loading...</span>
                )
            }
        </>
    );
};

export default FileUpload;
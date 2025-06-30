"use client"

import { configs } from "@/constants/configs";
import {
    ImageKitAbortError,
    ImageKitInvalidRequestError,
    ImageKitServerError,
    ImageKitUploadNetworkError,
    upload,
} from "@imagekit/next";
import axios from "axios";
import { useRef, useState } from "react";
import { toast } from "react-toastify";

interface FileUploadProps {
    onSuccess: (res: any) => void;
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

        try {
            const authRes = await axios.get("/api/auth/imagekit-auth");

            const { token, signature, expire } = authRes.data;

            const res = await upload({
                file,
                fileName: file.name,
                publicKey: configs.imageKitPublicKey,
                signature,
                expire,
                token,
                onProgress: (event) => {
                    if(event.lengthComputable && onProgress) {
                        const percent = Math.round((event.loaded / event.total) * 100);

                        onProgress(percent); 
                    }
                }
            });

            onSuccess(res);
        } catch (error) {
            toast.error("Upload failed, please try again.");
        } finally {
            setUploading(false);
        }
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
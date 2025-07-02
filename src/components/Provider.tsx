"use client"
import { configs } from "@/constants/configs"
import { ImageKitProvider } from "@imagekit/next"
import { SessionProvider } from "next-auth/react"

const urlEndPoint = configs.urlEndpoint;

export default function Provider({ children }: { children: React.ReactNode }) {
    return (<SessionProvider refetchInterval={5 * 60}>
        <ImageKitProvider urlEndpoint={urlEndPoint}>
            {children}
        </ImageKitProvider>
    </SessionProvider>)
}
export const configs = {
    mongodbUri: process.env.MONGODB_URI!,
    nextAuthSecret: process.env.NEXTAUTH_SECRET!,
    imageKitPublicKey: process.env.NEXT_PUBLIC_PUBLIC_KEY!,
    imageKitPrivateKey: process.env.IMAGEKIT_PRIVATE_KEY!,
    urlEndpoint: process.env.NEXT_PUBLIC_URL_ENDPOINT!,
}
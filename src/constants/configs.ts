export const configs = {
    mongodbUri: process.env.MONGODB_URI!,
    nextAuthSecret: process.env.NEXTAUTH_SECRET!,
    imageKitPublicKey: process.env.NEXT_PUBLIC_PUBLIC_KEY!,
    imageKitPrivateKey: process.env.IMAGEKIT_PRIVATE_KEY!,
    urlEndpoint: process.env.NEXT_PUBLIC_URL_ENDPOINT!,
    gmail_user_mail: process.env.GMAIL_USER_MAIL!,
    gmail_app_password: process.env.GMAIL_APP_PASSWORD!,
}
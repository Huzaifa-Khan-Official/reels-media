import { configs } from "@/constants/configs";
import { getUploadAuthParams } from "@imagekit/next/server";

export async function GET() {
    try {
        const { token, expire, signature } = getUploadAuthParams({
            privateKey: configs.imageKitPrivateKey as string,
            publicKey: configs.imageKitPublicKey as string,
        });

        return Response.json({
            token,
            expire,
            signature,
            publicKey: configs.imageKitPublicKey
        })
    } catch (error) {
        console.log("Error at imagekit auth ==>", error);
        return Response.json({ error: "Authentication failed for imagekit" }, { status: 500 }
        );
    }
}
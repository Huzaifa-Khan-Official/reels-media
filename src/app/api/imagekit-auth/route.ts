import { configs } from "@/constants/configs";
import { asyncHandler } from "@/utils/asyncHandler";
import { nextResponse } from "@/utils/Response";
import { getUploadAuthParams } from "@imagekit/next/server";

export const GET = asyncHandler(
    async () => {
        const { token, expire, signature } = getUploadAuthParams({
            privateKey: configs.imageKitPrivateKey as string,
            publicKey: configs.imageKitPublicKey as string,
        });

        return nextResponse(200, "Success", {
            token,
            expire,
            signature,
            publicKey: configs.imageKitPublicKey
        })
    }
)
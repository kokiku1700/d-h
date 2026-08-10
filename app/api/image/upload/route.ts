import cloudinary from "@/lib/cloudinary";
import { getSession } from "@/lib/session";
import { UploadApiResponse } from "cloudinary";

export const runtime = "nodejs";

export async function POST ( req: Request ) {
    try {
        const session = await getSession();

        if ( !session ) {
            return Response.json(
                {
                    ok: false,
                    message: "로그인이 필요합니다."
                },
                {
                    status: 401,
                }
            );
        };

        const formData = await req.formData();
        const file = formData.get("file");

        if ( !(file instanceof File) ) {
            return Response.json(
                {
                    ok: false,
                    message: "이미지 파일이 없습니다.",
                },
                {
                    status: 400,
                }
            );
        };

        if ( !file.type.startsWith("image/") ) {
            return Response.json(
                {
                    ok: false,
                    message: "이미지 파일만 업로드할 수 있습니다.",
                },
                {
                    status: 400,
                }
            );
        };

        const maxSize = 10 * 1024 * 1024;

        if ( file.size > maxSize ) {
            return Response.json(
                { ok: false,
                    message: "이미지는 10MB 이하만 업로드할 수 있습니다."
                },
                {
                    status: 400,
                },
            );
        };

        const arrayBuffer = await file.arrayBuffer();
        const buffer = Buffer.from(arrayBuffer);

        // UploadApiResponse는 cloudinary에서 데이터 반환 타입이다.
        const uploadResult = await new Promise<UploadApiResponse>(
            (resolve, reject) => {
                const uploadStream = cloudinary.uploader.upload_stream(
                    {
                        folder: "portfolio/projects",
                        resource_type: "image",
                    },
                    (error, result) => {
                        if ( error ) {
                            reject(error);
                            return;
                        };

                        if ( !result ) {
                            reject(new Error("업로드 결과가 없습니다."));
                            return;
                        };

                        resolve(result);
                    }
                );
                uploadStream.end(buffer);
            }
        );

        return Response.json(
            {
                ok: true,
                url: uploadResult.secure_url,
                publicId: uploadResult.public_id,
            },
            {
                status: 201,
            }
        );
    } catch ( error ) {
        console.error("Cloudinary 이미지 업로드 오류:", error);

        return Response.json(
            {
                ok: false,
                message: "이미지 업로드 중 오류가 발생했습니다.",
            },
            {
                status: 500,
            }
        );
    };
};
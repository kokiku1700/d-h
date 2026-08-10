import cloudinary from "@/lib/cloudinary";
import { getSession } from "@/lib/session";
import { UploadApiResponse } from "cloudinary";

// cloudinary에 저장하기 위한 api router.

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

        // 폼 태그 혹은 키-값 쌍 형태의 데이터를 생성하고 서버로 전송하게 해주는 api
        // fetch를 사용해 텍스트, 이미지, 파일 등을 보낼 때 유용
        // 아래의 경우 이미지 파일을 보내기 위해 선언.
        const formData = await req.formData();
        const file = formData.get("file");

        // 객체 instanceof 타입
        // 즉 객체가 해당 타입이 맞는지 확인 하는 연산자.
        // 아래의 경우 받은 데이터 file의 타입이 File인지 확인 
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

        // file의 시작 문자가 "image/"인지 판별
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

        // 업로드 가능한 파일 크기
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

        // File 객체의 데이터를 원시 이진 데이터로 변환
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
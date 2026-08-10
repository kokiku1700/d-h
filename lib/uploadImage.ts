type UploadImageResponse = {
    ok: boolean;
    url?: string;
    publicId: string;
    message?: string;
};

export async function uplaodImage ( file: File ): Promise<string> {
    const formData = new FormData();

    formData.append("file", file);

    const res = await fetch("/api/image/upload", {
        method: "POST",
        body: formData,
    });

    const data: UploadImageResponse = await res.json();

    if ( !res.ok || !data.url ) {
        throw new Error(data.message || "이미지 업로드에 실패했습니다.");
    };

    return data.url;
};
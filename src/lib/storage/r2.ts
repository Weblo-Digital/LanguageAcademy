import { S3Client, PutObjectCommand, DeleteObjectCommand } from "@aws-sdk/client-s3";

const r2 = new S3Client({
  region: "auto",
  endpoint: `https://${process.env.R2_ACCOUNT_ID}.r2.cloudflarestorage.com`,
  credentials: {
    accessKeyId: process.env.R2_ACCESS_KEY_ID || "",
    secretAccessKey: process.env.R2_SECRET_ACCESS_KEY || "",
  },
});

export async function uploadToR2(file: File, path: string): Promise<{ publicUrl: string; key: string }> {
  // Clean filename to prevent spaces/special character issues
  const cleanFilename = file.name.replace(/\s+/g, "-").replace(/[^a-zA-Z0-9.-]/g, "");
  const key = `${path}/${Date.now()}-${cleanFilename}`;
  
  const arrayBuffer = await file.arrayBuffer();
  
  await r2.send(
    new PutObjectCommand({
      Bucket: process.env.R2_BUCKET_NAME || "",
      Key: key,
      Body: Buffer.from(arrayBuffer),
      ContentType: file.type,
    })
  );

  const publicUrl = `${process.env.R2_PUBLIC_URL}/${key}`;
  return { publicUrl, key };
}

export async function deleteFromR2(key: string): Promise<void> {
  await r2.send(
    new DeleteObjectCommand({
      Bucket: process.env.R2_BUCKET_NAME || "",
      Key: key,
    })
  );
}

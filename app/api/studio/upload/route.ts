import { NextResponse, type NextRequest } from "next/server";
import { getStudioAdminContext } from "@/lib/cms/auth";

const MAX_FILE_SIZE = 10 * 1024 * 1024;
const ALLOWED_TYPES = new Set(["image/jpeg", "image/png", "image/webp", "image/gif"]);

function extensionFor(file: File): string {
  const explicit = file.name.split(".").pop()?.toLowerCase();

  if (explicit && /^[a-z0-9]+$/.test(explicit)) {
    return explicit;
  }

  if (file.type === "image/png") {
    return "png";
  }

  if (file.type === "image/webp") {
    return "webp";
  }

  if (file.type === "image/gif") {
    return "gif";
  }

  return "jpg";
}

export async function POST(request: NextRequest) {
  const context = await getStudioAdminContext();

  if (!context) {
    return NextResponse.json({ error: "You must be signed in as an admin." }, { status: 401 });
  }

  try {
    const { supabase, user } = context;
    const formData = await request.formData();
    const file = formData.get("file");
    const intent = formData.get("intent") === "cover" ? "covers" : "body";
    const altText = String(formData.get("altText") ?? "").trim();

    if (!(file instanceof File)) {
      return NextResponse.json({ error: "No file uploaded." }, { status: 400 });
    }

    if (!ALLOWED_TYPES.has(file.type)) {
      return NextResponse.json({ error: "Upload a JPG, PNG, WebP, or GIF image." }, { status: 400 });
    }

    if (file.size > MAX_FILE_SIZE) {
      return NextResponse.json({ error: "Image must be 10MB or smaller." }, { status: 400 });
    }

    const extension = extensionFor(file);
    const path = `blog/${intent}/${new Date().getFullYear()}/${crypto.randomUUID()}.${extension}`;
    const { error: uploadError } = await supabase.storage
      .from("blog-media")
      .upload(path, file, {
        cacheControl: "31536000",
        contentType: file.type,
        upsert: false
      });

    if (uploadError) {
      return NextResponse.json({ error: uploadError.message }, { status: 400 });
    }

    const {
      data: { publicUrl }
    } = supabase.storage.from("blog-media").getPublicUrl(path);

    const { data: asset, error: insertError } = await supabase
      .from("media_assets")
      .insert({
        bucket: "blog-media",
        path,
        public_url: publicUrl,
        filename: file.name,
        content_type: file.type,
        size_bytes: file.size,
        alt_text: altText || null,
        uploaded_by: user.id
      })
      .select("*")
      .single();

    if (insertError) {
      return NextResponse.json({ error: insertError.message }, { status: 400 });
    }

    return NextResponse.json({ asset });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Upload failed.";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}

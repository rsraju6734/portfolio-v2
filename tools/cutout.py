"""
Make a transparent portrait cutout from your original photo — runs 100% on
your own computer (the photo is never uploaded anywhere).

Usage (from the project folder):
    .venv\\Scripts\\python tools\\cutout.py tools\\photos\\original.jpg

Creates:
    tools/photos/portrait-cutout.png    (transparent, full-quality master)
    public/images/portrait-cutout.webp  (transparent, smaller — used by the site)

What it does:
  1. Fixes the photo orientation (phone rotation info).
  2. Removes the background with the `u2net_human_seg` model (made for people),
     with alpha matting for softer, natural hair edges.
  3. Applies a very light, global lighting/clarity lift. Your face and
     features are NOT changed — no retouching, no reshaping, no AI faces.
  4. Trims empty space and limits the size for fast loading.
"""
import sys
from pathlib import Path

from PIL import Image, ImageEnhance, ImageOps
from rembg import new_session, remove

MAX_HEIGHT = 1600


def main(src: str, crop: str | None = None) -> None:
    src_path = Path(src)
    if not src_path.exists():
        sys.exit(f"Photo not found: {src_path}")

    out_dir = Path(__file__).resolve().parent.parent / "public" / "images"
    out_dir.mkdir(parents=True, exist_ok=True)

    img = Image.open(src_path)
    img = ImageOps.exif_transpose(img).convert("RGB")  # correct rotation
    if crop:  # optional "left,top,right,bottom" to cut away screenshot borders
        img = img.crop(tuple(int(v) for v in crop.split(",")))

    # gentle, natural light/clarity lift (global only)
    img = ImageEnhance.Brightness(img).enhance(1.03)
    img = ImageEnhance.Contrast(img).enhance(1.05)
    img = ImageEnhance.Sharpness(img).enhance(1.15)

    session = new_session("u2net_human_seg")
    cut = remove(
        img,
        session=session,
        alpha_matting=True,
        alpha_matting_foreground_threshold=240,
        alpha_matting_background_threshold=12,
        alpha_matting_erode_size=8,
        post_process_mask=True,
    )

    bbox = cut.getchannel("A").point(lambda a: 255 if a > 8 else 0).getbbox()
    if bbox:
        cut = cut.crop(bbox)
    if cut.height > MAX_HEIGHT:
        w = round(cut.width * MAX_HEIGHT / cut.height)
        cut = cut.resize((w, MAX_HEIGHT), Image.LANCZOS)

    png = Path(__file__).resolve().parent / "photos" / "portrait-cutout.png"  # full-quality master
    png.parent.mkdir(exist_ok=True)
    webp = out_dir / "portrait-cutout.webp"
    cut.save(png, optimize=True)
    cut.save(webp, quality=90, method=6)
    print(f"Saved {png} and {webp} ({cut.width}x{cut.height})")


if __name__ == "__main__":
    if len(sys.argv) < 2:
        sys.exit(__doc__)
    main(sys.argv[1], sys.argv[2] if len(sys.argv) > 2 else None)

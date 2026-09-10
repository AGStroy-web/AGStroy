from pathlib import Path
from PIL import Image


ROOT = Path("images")

EXTENSIONS = {
    ".jpg",
    ".jpeg",
    ".png",
    ".bmp",
    ".tiff",
    ".tif",
    ".gif",
}


def convert_images():
    for path in ROOT.rglob("*"):
        if not path.is_file():
            continue

        if path.suffix.lower() not in EXTENSIONS:
            continue

        output_path = path.with_suffix(".webp")

        try:
            with Image.open(path) as image:
                if image.mode in ("RGBA", "LA", "P"):
                    image = image.convert("RGBA")
                else:
                    image = image.convert("RGB")

                image.save(
                    output_path,
                    "WEBP",
                    quality=90,
                    method=6
                )

            # Удаляем оригинал только после успешной конвертации
            path.unlink()

            print(f"[OK] {path} -> {output_path}")

        except Exception as e:
            print(f"[ERROR] {path}: {e}")


if __name__ == "__main__":
    convert_images()
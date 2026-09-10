from pathlib import Path
from PIL import Image
from pillow_heif import register_heif_opener

# Добавляем поддержку HEIC/HEIF
register_heif_opener()

folder = Path("images")

# Все файлы изображений
extensions = {
    ".jpg", ".jpeg", ".png", ".webp",
    ".heic", ".heif", ".bmp", ".tiff", ".tif"
}

files = sorted(
    [
        file for file in folder.iterdir()
        if file.is_file() and file.suffix.lower() in extensions
    ],
    key=lambda x: x.name.lower()
)

for i, file in enumerate(files, start=1):
    new_path = folder / f"photo{i}.png"

    try:
        with Image.open(file) as img:
            # Сохраняем прозрачность, если она есть
            if img.mode in ("RGBA", "LA"):
                img = img.convert("RGBA")
            else:
                img = img.convert("RGB")

            img.save(new_path, "PNG")

        # Удаляем исходный файл
        if file != new_path:
            file.unlink()

        print(f"{file.name} → {new_path.name}")

    except Exception as e:
        print(f"Ошибка: {file.name} — {e}")

print(f"\nГотово! Обработано файлов: {len(files)}")
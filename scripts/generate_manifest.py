from pathlib import Path
import json


IMAGES_DIR = Path("images")

FOLDERS = {
    "all": "vse",
    "furniture": "mebel",
    "sinks": "rakovina",
    "plumbing": "santeh",
    "other": "ostalnoe",
}

EXTENSIONS = {
    ".png",
    ".jpg",
    ".jpeg",
    ".webp",
    ".gif",
}


manifest = {}


for category, folder_name in FOLDERS.items():

    folder = IMAGES_DIR / folder_name

    files = []

    if folder.exists():

        for file in folder.iterdir():

            if (
                file.is_file()
                and file.suffix.lower() in EXTENSIONS
            ):
                files.append(file)


    # Сортировка по номеру photo1, photo2, photo10...
    def photo_number(path):
        stem = path.stem

        try:
            return int(stem.replace("photo", ""))
        except ValueError:
            return 999999


    files.sort(key=photo_number)


    manifest[category] = [
        f"images/{folder_name}/{file.name}"
        for file in files
    ]


with open(
    "images.json",
    "w",
    encoding="utf-8"
) as file:

    json.dump(
        manifest,
        file,
        ensure_ascii=False,
        indent=2
    )


print("Готово!")

for category, files in manifest.items():
    print(
        f"{category}: {len(files)} фотографий"
    )
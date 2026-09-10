from pathlib import Path
import random
import shutil


# Корневая папка с изображениями
IMAGES_DIR = Path("images")

# Папки-источники
SOURCE_FOLDERS = [
    IMAGES_DIR / "mebel",
    IMAGES_DIR / "ostalnoe",
    IMAGES_DIR / "rakovina",
    IMAGES_DIR / "santeh",
]

# Папка, куда будут скопированы фотографии
TARGET_FOLDER = IMAGES_DIR / "vse"


# Поддерживаемые форматы изображений
IMAGE_EXTENSIONS = {
    ".jpg",
    ".jpeg",
    ".png",
    ".webp",
    ".gif",
}


def main():
    # Создаём папку vse, если её нет
    TARGET_FOLDER.mkdir(parents=True, exist_ok=True)

    # --------------------------------------------------
    # 1. Удаляем старые фотографии из images/vse
    # --------------------------------------------------

    for file in TARGET_FOLDER.iterdir():
        if file.is_file():
            file.unlink()

    print("Папка images/vse очищена.")


    # --------------------------------------------------
    # 2. Собираем все фотографии
    # --------------------------------------------------

    photos = []

    for folder in SOURCE_FOLDERS:

        if not folder.exists():
            print(f"Папка не найдена: {folder}")
            continue

        for file in folder.iterdir():

            if (
                file.is_file()
                and file.suffix.lower() in IMAGE_EXTENSIONS
            ):
                photos.append(file)


    print(f"Найдено фотографий: {len(photos)}")


    # --------------------------------------------------
    # 3. Перемешиваем фотографии
    # --------------------------------------------------

    random.shuffle(photos)


    # --------------------------------------------------
    # 4. Копируем и переименовываем
    # --------------------------------------------------

    for number, source_file in enumerate(photos, start=1):

        # Сохраняем исходное расширение
        extension = source_file.suffix.lower()

        # Новое имя:
        # photo1.png
        # photo2.jpg
        # photo3.webp
        # и т.д.
        target_file = (
            TARGET_FOLDER
            / f"photo{number}{extension}"
        )

        shutil.copy2(
            source_file,
            target_file
        )

        print(
            f"{number:3} | "
            f"{source_file} -> {target_file}"
        )


    print()
    print("Готово!")
    print(
        f"Скопировано фотографий: {len(photos)}"
    )


if __name__ == "__main__":
    main()
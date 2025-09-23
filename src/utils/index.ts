import { v4 as uuidv4 } from "uuid";
import moment from "moment";

export function getAvatarText(username: string | undefined) {
  return username
    ?.split(" ")
    .slice(0, 2)
    .map((str) => str[0].toUpperCase())
    .join("");
}

export function getRandomId(name: string) {
  return uuidv4();
}

export function getFormattedDate(input: Date | string) {
  let now = moment(Date.now());
  let date = moment(input).utc(true);

  if (date.diff(now, "weeks") > -1) {
    return date.fromNow();
  }
  return date.format("YYYY/MM/DD");
}

export function getUserAge(birthday: string) {
  if (!birthday) return "Unknown";

  let now = moment(Date.now()),
    date = moment(birthday),
    diff = now.diff(date, "years");

  return Math.floor(diff / 10) * 10 + "'s";
}

export function resizeImage(
  file: File,
  maxWidth: number,
  maxHeight: number
): Promise<File> {
  return new Promise((resolve, reject) => {
    const img = new Image();
    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");

    if (!ctx) {
      reject(new Error("Failed to get canvas context"));
      return;
    }

    img.onload = function () {
      const ratio = Math.min(maxWidth / img.width, maxHeight / img.height);
      const newWidth = img.width * ratio;
      const newHeight = img.height * ratio;

      canvas.width = newWidth;
      canvas.height = newHeight;

      ctx.drawImage(img, 0, 0, newWidth, newHeight);

      canvas.toBlob((blob) => {
        if (!blob) {
          reject(new Error("Failed to create blob from canvas"));
          return;
        }

        const resizedFile = new File([blob], file.name, {
          type: file.type,
          lastModified: Date.now(),
        });

        resolve(resizedFile);
      }, file.type);
    };

    img.onerror = () => {
      reject(new Error("Failed to load image"));
    };

    img.src = URL.createObjectURL(file);
  });
}

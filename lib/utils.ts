import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function getAudioLength(audio: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const fileReader = new FileReader();
    const audioContext = new AudioContext();

    fileReader.readAsArrayBuffer(audio);

    fileReader.onload = () => {
      const audioData = fileReader.result;
      if (audioData instanceof ArrayBuffer) {
        audioContext.decodeAudioData(
          audioData,
          (buffer) => {
            const audioLength = buffer.duration;
            const minutes = Math.floor(audioLength / 60);
            const remainingSeconds = Math.floor(audioLength % 60);
            const formattedTime = `${minutes}:${remainingSeconds
              .toString()
              .padStart(2, "0")}`;
            resolve(formattedTime);
          },
          (error) => {
            reject(error);
          }
        );
      } else {
        reject(new Error("Failed to read audio data"));
      }
    };

    fileReader.onerror = (error) => {
      reject(error);
    };
  });
}

export function isAudio(data: string) {
  const audio = data.split("/");
  return audio[0] === "audio";
}

export function formatTime(seconds: number): string {
  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = Math.floor(seconds % 60);
  return `${minutes}:${remainingSeconds < 10 ? "0" : ""}${remainingSeconds}`;
}

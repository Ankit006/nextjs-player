import { z } from "zod";

const imageFileSchema = z
  .instanceof(File)
  .refine(
    (file) => {
      return /^image\/(png|jpg|jpeg|gif|bmp)$/i.test(file.type);
    },
    {
      message: "Invalid image format",
    }
  )
  .refine((file) => file.size > 0 && file.size <= 5 * 1024 * 1024, {
    message: "Image file size must be less than 5MB",
  });

const audioFileSchema = z
  .instanceof(File)
  .refine(
    (file) => {
      return /^audio\/(mp3|wav|ogg|m4a|mpeg)$/i.test(file.type);
    },
    {
      message: "Invalid audio format",
    }
  )
  .refine((file) => file.size > 0 && file.size <= 10 * 1024 * 1024, {
    message: "Audio file size must be less than 10MB",
  });

export const validateSongForm = z.object({
  audio: audioFileSchema,
  poster: imageFileSchema,
  name: z.string().min(1, "Name is required"),
  artist: z.string().min(1, "Artist is required"),
  duration: z.string().min(1),
});

export interface ISongFormError {
  audio: string[];
  poster: string[];
  name: string[];
  artist: string[];
  duration: string[];
}

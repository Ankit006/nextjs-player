import { ISong } from "@/models/models";
import { songs } from "@/data/data";

export async function getSongs(): Promise<ISong[]> {
  return songs;
}

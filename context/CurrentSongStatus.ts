import { createContext, Dispatch, SetStateAction, useContext } from "react";

export const CurrentSongStatus = createContext<
  | {
      isPlaying: boolean;
      setIsPlaying: Dispatch<SetStateAction<boolean>>;
    }
  | undefined
>(undefined);

export function useSongStatusContext() {
  const context = useContext(CurrentSongStatus);
  if (!context) {
    throw new Error(
      "useSongStatusContext must be used within a CurrentSongStatusProvider"
    );
  }
  return context;
}

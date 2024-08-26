"use client";
import Header from '@/components/custom/Header';
import Player from '@/components/custom/Player';
import SongList from '@/components/custom/SongList';
import { AudioListContext } from '@/context/audioListContext';
import { CurrentSongContext } from '@/context/CurrentSongContext';
import { CurrentSongStatus } from '@/context/CurrentSongStatus';
import { ISong } from '@/models/models';
import { useState } from 'react';

export default function Home() {
  const [songs, setSongs] = useState<ISong[]>([])
  const [currentSong, setCurrentSong] = useState<ISong | undefined>(undefined)
  const [isPlaying, setIsPlaying] = useState(false);
  return (
    <main>
      <AudioListContext.Provider value={{ songs, setSongs }}>
        <CurrentSongContext.Provider value={{ currentSong, setCurrentSong }}>
          <CurrentSongStatus.Provider value={{ isPlaying, setIsPlaying }}>
            <section className='container mx-auto pt-12'>
              <Header />
              <div className='mt-12'>
                <SongList />
              </div>
            </section>
            <Player />
          </CurrentSongStatus.Provider>
        </CurrentSongContext.Provider>
      </AudioListContext.Provider>
    </main>
  )
}

import { useAudioContext } from '@/context/audioListContext'
import { useCurrentSongContext } from '@/context/CurrentSongContext'
import { useSongStatusContext } from '@/context/CurrentSongStatus'
import Image from 'next/image'
import React from 'react'

export default function SongListGrid() {
    const { songs } = useAudioContext()
    const { setCurrentSong } = useCurrentSongContext()
    const { setIsPlaying } = useSongStatusContext()
    return (
        <div className='grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4'>
            {songs.map((song) => <div key={song.name} className='cursor-pointer' onClick={() => {
                setCurrentSong(song)
                setIsPlaying(true)
            }}>
                <Image src={URL.createObjectURL(song.poster)} alt={song.name} width={200} height={170} className='w-[200px] h-[170px] object-cover rounded-md' />
                <p className='text-lg mt-2 hover:underline'>{song.name}</p>
                <p className='text-sm'>{song.artist}</p>
                <p className='text-sm'>{song.duration}</p>
            </div>)}
        </div>
    )
}

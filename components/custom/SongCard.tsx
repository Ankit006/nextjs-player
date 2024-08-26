import { useCurrentSongContext } from '@/context/CurrentSongContext'
import { useSongStatusContext } from '@/context/CurrentSongStatus'
import { ISong } from '@/models/models'
import React from 'react'

export default function SongCard({ song, index }: { song: ISong, index: number }) {
    const { setCurrentSong } = useCurrentSongContext()
    const { setIsPlaying } = useSongStatusContext()
    return (
        <div className='flex items-center justify-between'>

            <div className='flex items-center space-x-5'>
                <span>{index + 1}</span>
                <div>
                    <button onClick={() => {
                        setCurrentSong(song)
                        setIsPlaying(true)
                    }} className='text-lg capitalize hover:underline cursor-pointer'>{song.name}</button>
                    <p className='text-sm font-light'>
                        {song.artist}
                    </p>
                </div>
            </div>
            <p>{song.duration}</p>
        </div>
    )
}

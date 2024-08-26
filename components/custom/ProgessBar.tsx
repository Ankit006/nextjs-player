import { formatTime } from '@/lib/utils';
import React, { RefObject, useCallback, useEffect, useState } from 'react'

export default function ProgessBar({ audioRef, duration }: { audioRef: RefObject<HTMLAudioElement>, duration: string }) {
    const [percentagePlayed, setPercentagePlayed] = useState(0);
    const [currentTime, setCurrentTime] = useState(0);

    const handleTimeUpdate = useCallback(() => {
        if (audioRef.current) {
            const currentTime = audioRef.current.currentTime;
            const duration = audioRef.current.duration;

            if (duration > 0) {
                const percentage = Math.floor((currentTime / duration) * 100);
                setCurrentTime(currentTime)
                setPercentagePlayed(percentage);
            }
        }
    }, [audioRef])

    useEffect(() => {
        const audioElement = audioRef.current;
        if (audioElement) {
            audioElement.addEventListener('timeupdate', handleTimeUpdate);


            return () => {
                audioElement.removeEventListener('timeupdate', handleTimeUpdate);
            };
        }
    }, [audioRef, handleTimeUpdate]);

    return (
        <div className="w-full bg-gray-300 h-1 rounded">
            <div
                className="bg-green-500 h-full rounded"
                style={{ width: `${percentagePlayed}%` }}
            />
            <div className='mt-1 flex items-center justify-between'>
                <p className='text-sm'>{formatTime(currentTime)}</p>
                <p className='text-sm'>{duration}</p>

            </div>
        </div>
    )
}

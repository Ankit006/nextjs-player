import React from 'react'

export default function ErrorText({ text }: { text: string }) {
    return (
        <p className='font-semibold text-sm text-red-500'>{text}</p>
    )
}

import React, {useRef, useEffect} from 'react'

const TimerControl = ({isRunning, onToggle, onReset}) => {
    const startButtonRef = useRef(null);

    useEffect(()=>{
        if(startButtonRef.current){
            startButtonRef.current.focus();
        }
    }, [])

    return (
        <>
            <button ref={startButtonRef} className='mt-4 px-4 py-2 rounded bg-green-500 text-white hover:bg-green-600 mr-3' onClick={onToggle}>
            { isRunning ? 'Pause': 'Start' }
            </button>
            <button className='mt-4 px-4 py-2 rounded bg-red-500 text-white hover:bg-red-600' onClick={onReset}>
                Reset
            </button>
        </>
    )
}

export default TimerControl;
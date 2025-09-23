import React,{ useRef, useState, useEffect} from 'react'
import TimerDisplay from './TimerComponent/TimerDisplay';
import TimerControl from './TimerComponent/TimerControl';

const Timer = () => {
      const timeRef = useRef(null)

  const [time, setTime] = useState(() => {
    return Number(localStorage.getItem('time') || 0 )
  });

  useEffect(()=>{
    localStorage.setItem('time', time)
  },[time])

  const [isRunning, setIsRunning] = useState(false)

  const toggleTimer = () => {
    if(isRunning){
        //clear Interval to stop the timer
        clearInterval(timeRef.current)
        timeRef.current = null;
    }else{
        //Start timer
        timeRef.current = setInterval(()=>{
          setTime((prevtime)=> prevtime + 1)
        },1000)
    }

    setIsRunning(!isRunning)
  }

  // reset timer 
  const resetTimer = () => {
    clearInterval(timeRef.current);
    setIsRunning(false)
    timeRef.current = null;
    setTime(0);
    localStorage.removeItem('time')
  }

  return (
    <>
      <TimerDisplay time={time} />
      <TimerControl isRunning={isRunning} onToggle={toggleTimer} onReset={resetTimer}  />
    </>
  )
}

export default Timer
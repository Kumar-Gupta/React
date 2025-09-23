import React from 'react'

export const Star = ({star, color, hover, rating, clicked, hoverEnter, hoverLeave}) => {
  return (
    <span
     style={{color: star <= (hover || rating) ? color : "#ccc"}}
     onClick={()=> clicked(star)}
     onMouseEnter={()=> hoverEnter(star)}
     onMouseLeave={()=> hoverLeave(0)}
    >{'\u2605'}</span>
  )
}

export default Star;
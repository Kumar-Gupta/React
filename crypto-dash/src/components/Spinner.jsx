import React, {CSSProperties} from 'react'
import {BarLoader} from 'react-spinners'

const override= {
  display: "block",
  margin: "0 auto",
};

const Spinner = ({color='black',size='150'}) => {
  return (
    <BarLoader
        color= {color}
        cssOverride={override}
        size={150}
        aria-label="Loading Spinner"
    />
  )
}

export default Spinner
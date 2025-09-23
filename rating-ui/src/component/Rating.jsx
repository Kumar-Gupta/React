import { useState } from "react";
import Star from "./Star";
import Modal from "./Modal";
import Button from "./Button";

const  Rating= ({heading = "Enter your rating", color='gold'}) => {
    const [rating, setRating] = useState(0);
    const [hover, setHover] = useState(0);
    const [submitted, setSubmitted] = useState(false)

    const stars = Array.from({length:5},(_,i) => i +1 );
    const Feedback = ['Terrible','Poor','Fair','Good','Excellent']

    const handleSubmit = () => {
      if(rating>=0){
        setSubmitted(true);
      }
    }

    const closeModal = () =>{
      setSubmitted(false);
      setRating(0);
      setHover(0)
    }

  return (
    <div className='rating-container'>
        <h2>{heading}</h2>
        <div className="stars">
            {stars.map((star)=> (
              <Star 
              key={star}
              star={star}
              color={color}
              hover={hover}
              rating={rating}
              clicked= {setRating}
              hoverEnter = {setHover}
              hoverLeave = {setHover}
              />
            ) )}
            
        </div>
        {rating > 0 && <p className="feedback">{Feedback[rating - 1]}</p>}

        {/* <button 
        className="submit-btn"
        onClick={handleSubmit}
        disabled={rating === 0}
        >Submit</button> */}

        <Button className="submit-btn" onClick={handleSubmit} disabled={rating===0}>Submit</Button>

        {/* modal  */}
        {
          submitted && ( <Modal rating = {rating} handleModal={closeModal} /> )
        }
    </div>
  )
}

export default Rating
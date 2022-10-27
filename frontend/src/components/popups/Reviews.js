import "bootstrap/dist/css/bootstrap.min.css";
import "../../styles/Popup.css";
import { useState, useEffect } from "react";

import Card from "react-bootstrap/Card";
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';





const Reviews = (props) => {
  const {selection} = props;

  const movieID = selection.movieID

  const [reviews, setReviews] = useState([])
  const [userReview, setUserReview] = useState("")

  const getReviews = (movieID) => {
    fetch("/reviewsMovie", {
          headers: {
            'movieID': selection.movieID
          }
        })
        .then((data) => data.json())
        .then((arr) => {  
          setReviews(arr)
        })
  }

  useEffect(()=> {
    getReviews(movieID)
  },[])

  const renderCard = (card) => {
    return (
      <Card key={card.movieID} className="movieCard">
        <Card.Title className="movieTitle">
          {card.author}
        </Card.Title>
        <Card.Text>
          {card.review}
        </Card.Text>
      </Card>
    )
  };

  const postReview = (userReview) => {
    fetch("/movie/userReviewToDB", {
      method: "post",
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        movieID: movieID,
        review: userReview
      })
    })
  }




  return (
    <>
      <h5><em>Users Reviews:</em></h5>
      <div className="movieSection">
        {reviews.map(renderCard)}
      </div>
      <h5><em>*This is the review submit form</em></h5>
      <Form>
        <Form.Group>
          <Form.Label>
            Your review will be anonymous, so please share your opinion.
          </Form.Label>
          <Form.Control onChange={(e) => setUserReview(e.target.value)} type="text" placeholder="Write your review here" />
        </Form.Group>
        <Button onClick={() => {postReview(userReview)}} variant="primary">
        Submit
        </Button>
      </Form>
    </>
  )
}

export default Reviews;
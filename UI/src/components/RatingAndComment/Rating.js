import React from 'react';
import './Rating.css';
import { FaStar } from 'react-icons/fa';
import axios from 'axios';
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';


export default function Rating(props) {
  async function submitReview() {
    const review = {
      Product_ID: id,
      Business_Name: localStorage.getItem("username"),
      Review: {
        Rating: (ratingToWrite === 2)?ratingToWrite -1 :ratingToWrite ,
        Comment: commentToWrite,
      },
    };
    const token = localStorage.getItem('access_token');
    const Review_ID = 9090;

    try {
      const response = await axios.post(
        'http://localhost:9999/user/ProductFeedback',
        review,
        {
          headers: {
            Authorization: `${token}`,
          },
        }
      );
      console.log('rating', ratingToWrite);
      console.log('comment', commentToWrite);
    } catch (error) {
      console.error(error);
    }
  }

  const [ratingToWrite, setRatingToWrite] = useState(0);
  const [commentToWrite, setCommentToWrite] = useState('');
  const { id } = useParams();
  const [comments, setComments] = useState([]);
  const [rateToShow, setRateToShow] = useState(0);
  useEffect(() => {
    const token = localStorage.getItem('access_token');
    axios
      .get(`http://localhost:9999/product/reviews/` + id, {
        headers: {
          Authorization:
          `${token}`,
        },
      })
      .then((response) => {
        const { data } = response;
        setComments(data);
        if (data.length >= 0) {
          setRateToShow(data[0].Rating);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }, [props.id]);

  const colors = {
    orange: '#FFBA55',
    grey: '#a9a9a9',
  };

  const [currentValue, setCurrentValue] = React.useState(0);
  const [hoverValue, setHoverValue] = React.useState(undefined);

  const handleClick = (value) => {
    setRatingToWrite(value);
    // if(ratingToWrite === 1){
    //   rateToShow=ratingToWrite-1;
    //   console.log("newwwwwwwwwww")
    //   console.log(rateToShow)
    // }
    setCurrentValue(value);
  };

  const handleMouseOver = (value) => {
    setHoverValue(value);
  };

  const handleMouseLeave = () => {
    setHoverValue(undefined);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const newCommentObj = {
      Comment: commentToWrite,
      Rating: (ratingToWrite === 0)?ratingToWrite -1 :ratingToWrite ,
    };
    setComments([newCommentObj, ...comments]);
    setCurrentValue(0);
    submitReview();

    // Reset the comment and rating inputs
    setCommentToWrite('');
    setRatingToWrite(undefined);
  };

  const stars = Array(5).fill(0);

  return (
    <>
      <div style={styles.container} className='container'>
        <div>
          <div className='stars'>
            <h1>Rate and Comment</h1>
            <br />
          </div>
          <div className='comment-list'>
            {comments.map((comment, index) => (
              <div className='comment' key={index}>
                <div className='comment-header'>
                <span className='comment-rating'>

                    {[1, 2, 3, 4, 5].map((value) => (

                      <FaStar

                        key={value}

                        //value={comment.Rating}

                        className={

                          value <= comment.Rating ? 'star-filled' : 'star'

                        }

                      />

                    ))}

           
                  </span>
                </div>
                <div className='comment-body'>{comment.Business_Name} : {comment.Comment} </div>
                
              </div>
            ))}
          </div>
          <div className='formComponent'>
            <form className='form1' onSubmit={handleSubmit}>
              <br />
              <div className='stars1'>
                {stars.map((_, index) => {
                  return (
                    <FaStar
                      key={index}
                      size={20}
                      style={{
                        cursor: 'pointer',
                      }}
                      color={
                        (hoverValue || currentValue) > index
                          ? colors.orange
                          : colors.grey
                      }
                      onClick={() => handleClick(index + 1)}
                      onMouseOver={() => handleMouseOver(index + 1)}
                      onMouseLeave={handleMouseLeave}
                    />
                  );
                })}
              </div>
              <textarea
                placeholder='Leave a comment...'
                value={commentToWrite}
                onChange={(e) => setCommentToWrite(e.target.value)}
                className='textarea'
                id='comment'
              />
              <button type='submit' className='button1'>
                Submit
              </button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}

const styles = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: '2%',
    overflow: 'scroll',
    height: '700px',
  },
};

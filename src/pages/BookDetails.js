import React, { useContext, useState } from "react";
import { useParams, useHistory } from "react-router-dom";
import { BookContext } from "../context/books";
import { BookCommentContext } from "../context/books_comment";
import { CartContext } from "../context/cart";
import { createBookCommentType } from '../api/mutations'
import { API, graphqlOperation, Storage } from "aws-amplify";
import { Auth } from 'aws-amplify';
import { Link } from "react-router-dom";
import { text } from "@fortawesome/fontawesome-svg-core";

const BookDetails = () => {
  const { id } = useParams();
  const history = useHistory();
  const { books } = useContext(BookContext);
  const { bookcomments } = useContext(BookCommentContext);
  const { addToCart } = useContext(CartContext);
  const [bookCommentDetails, setBookCommentDetails] = useState({ textComment: "", book_id: id});
  var userName = 'User';
  var lineCount = 0;

// Promise Function. then resolves function
const GetInfo = async () => {
  return Auth.currentUserInfo().then(function(result) {
      return result;
  });
}

const RInfo = () => {
  const history = useHistory();
  // Promise Function
  try {
      GetInfo().then(function(item) {
          if (item != null) {
          userName = item.username;
          }
          else {
            userName = "User";
          }
     })
  } catch (error) {
      
  }

} 

  const handleSubmit = async (e) => {

    // Set comment user name to logged in amplify user
    bookCommentDetails.userNameComment = userName;

    e.preventDefault();
    try {
        if (!bookCommentDetails.textComment) return
        await API.graphql(graphqlOperation(createBookCommentType, { input: bookCommentDetails }))
        setBookCommentDetails({ textComment: "", description: ""})
        console.log("SUCCESFULLY CREATED COMMENT");
        window.location.reload();
    } catch (err) {
        console.log('error creating todo:', err)
    }
}

// Get User Info
RInfo();

function setid() {
  var bg = document.getElementById('comment-format-more');
}

  const book = books.find((book) => {
    return book.id === id;
  });


  // filter books for comments from that book
  const bookcomment = bookcomments.filter((bookcomments) => {
    return bookcomments.book_id === id;
  });

  if (!book) {
    return <h3>Loading...</h3>;
  }

  const { image: url, video: url1 ,title, description, author, price } = book;

  window.onresize = displayWindowSize;
  window.onload=new function() { setTimeout(function() { myFunction(); },300);};
  // window.onload=new function() { myFunction()};
  function myFunction() {
    try {
    displayWindowSize();
    }
    catch{
      console.log("Could Not Change Window Size");
    }
  }

  function displayWindowSize() {
    var width = window.innerWidth;
    var height = window.innerHeight;
    console.log(height);
    let comments_seperator = document.getElementById("comments-seperator");
    let detail_description = document.getElementById("detail-description");

    if (width < 880) {
      try {
      detail_description.style.marginTop = "50px";
      }
      catch {
        console.log("Error");
      }
    }

    if (width < 580) {
      try {
      detail_description.style.marginTop = "150px";
      }
      catch {
        console.log("Error");
      }
    }

    if (width < 350) {
      try {
      detail_description.style.marginTop = "450px";
      }
      catch {
        console.log("Error");
      }
    }

    if (width < 1430) {
      try {
      comments_seperator.style.marginTop = "370px";
      } 
      catch {
        console.log("Error");
      }
    }
    if (width < 880) {
      try {
      comments_seperator.style.marginTop = "400px";
      }
      catch {
        console.log("Error");
      }
    }

    if (width < 600) {
      try {
      comments_seperator.style.marginTop = "600px";
      }
      catch {
        console.log("Error");
      }
    }

    if (width < 480) {
      try {
      comments_seperator.style.marginTop = "900px";
      }
      catch {
        console.log("Error");
      }
    }

    if (width > 1430) {
      try {
      comments_seperator.style.marginTop = "0px"
      }
      catch {
        console.log("Error");
      }
    }
    if (width > 880 && width < 1430) {
      try {
      comments_seperator.style.marginTop = "400px";
      }
      catch {
        console.log("Error");
      }
    }

    if (height < 600) {
      try {
      detail_description.style.marginTop = "100px";
      comments_seperator.style.marginTop = "500px";
      }
      catch {
        console.log("Error");
      }
    }

    if (height < 440) {
      try {
      detail_description.style.marginTop = "150px";
      comments_seperator.style.marginTop = "750px";
      }
      catch {
        console.log("Error");
      }
    }

    if (height < 380) {
      try {
      detail_description.style.marginTop = "200px";
      comments_seperator.style.marginTop = "800px";
      }
      catch {
        console.log("Error");
      }
    }

    if (height < 380) {
      try {
      detail_description.style.marginTop = "300px";
      comments_seperator.style.marginTop = "1000px";
      }
      catch {
        console.log("Error");
      }
    }

    if (height < 200) {
      try {
      detail_description.style.marginTop = "400px";
      comments_seperator.style.marginTop = "1200px";
      }
      catch {
        console.log("Error");
      }
    }

  };

    return (
      <div>

      <div className="customCommentHead">
      <div>
      <section className="book-details">
        <div className="video-image-flex">
          <div className="detail-image">
            <img className="detailImageResizer" src={url} alt="10x Rule" />
          </div>

          <div>
          {url1.length > 5 ? <div>
            <video width="380" height="360" controls>
          <source src={url1} />
          </video>
          </div> : <div></div>}
          </div>  
        </div>
  
        <div id="detail-description" className="detail-description">
          <h2>{title}</h2>
          <p>{description}
          </p>
          <h3>{author}</h3>
          <div className="total">
          <h4 className="total1">&nbsp; Price - $ {price} &nbsp;</h4>
          </div>
          <button
            className="btn"
            onClick={() => {
              addToCart({ ...book, id });
              history.push("/cart");
            }}
          >
            Add to Cart
          </button>
        </div>
      </section>
      </div>
  
      <div id="customBlockCommentDiv"></div>
      <div id="comments-seperator">
        <section className="customCommentHead">
        <div id="customCommentHead">All Comments ({bookcomment.length})</div>
        </section>
    
        <section>               
        <header className="form-header">
        </header>
        <form className="form-wrapper" onSubmit={handleSubmit}>
            <div className="form-fields">
                <div className="description-form">
                    <p><label htmlFor="textComment">Add a comment</label></p>
                    <p><textarea className="inputs"
                        name="textComment"
                        type="text"
                        rows="4"
                        placeholder="Type a comment..."
                        onChange={(e) => setBookCommentDetails({ ...bookCommentDetails, textComment: e.target.value, userNameComment: userName })}
                        required
                    /></p>
                </div>
                <div className="submit-form">
                    <button className="btn1" type="submit">Submit Comment</button>
                </div>
            </div>
        </form>
        </section>
    
        <div className="comment-outside">
          
            <section className="comments">
            <div className="comment-flex">
                    <section>
                    <article className="comment-header">
                    <div className="comment-header-1">User</div>
                    </article>
                  </section>
                  <section>
                    <article className="comment-header-2">
                    <div className="comment-header-1-b">Comments</div>
                    </article>
                  </section>
            </div>
            </section>
    
          <section className="comments">
                {bookcomment.sort((a, b) => a.createdAt < b.createdAt ? 1:-1).map(({ textComment, userNameComment}) => (
                  <div>
                    <div className="comment-flex">
                    <section>
                    <article key={id} className="comment-name-format-more">
                        <div className="comment-name-format">{userNameComment}</div>
                    </article>
                  </section>
                    <section>
                      <article key={id} id="comment-format-more" style={{ height: Math.max((Math.ceil(textComment.length / 100)) * 29, 50)}}>
                          <div className="comment-format">{textComment}</div>
                      </article>
                    </section>
                    </div>
                  </div>
                ))}
            </section>
        </div>
      </div>             
      </div>

      </div>
    );

};

export default BookDetails;

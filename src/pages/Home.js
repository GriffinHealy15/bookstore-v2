import React, { useContext } from "react";
import { Link } from "react-router-dom";
import Hero from "../components/Hero";

import { BookContext } from "../context/books";


// Home File 12/17/2020

const Home = () => {
    const { featured } = useContext(BookContext);

    if (!featured.length) {
        return <h1 className="cart-empty2">
        <h3 className="cart-empty1">Currently There Are No Featured Items</h3>
        </h1>
    }
    
    return (
        <>
            <Hero />
            <section className="books">
                <header className="featured-head">
                    <h3>Featured Products</h3>
                </header>
            </section>
                <div className="books">
                    {featured.sort((a, b) => a.createdAt < b.createdAt ? 1:-1).map(({ id, image, title }) => (
                        <Link className="outerBook" to={`books/${id}`}>
              
                        <div className="featured-book-title">
                            <Link to={`books/${id}`} className="btn5">
                            {title.length > 18 ? 
                            <div>{title[0]}{title[1]}{title[2]}{title[3]}{title[4]}{title[5]}
                            {title[6]}{title[7]}{title[8]}{title[9]}{title[10]}{title[11]}
                            {title[12]}{title[13]}{title[14]}{title[15]}{title[16]}{title[17]}{title[18]}...</div> : 
                            <div>{title[0]}{title[1]}{title[2]}{title[3]}{title[4]}{title[5]}
                            {title[6]}{title[7]}{title[8]}{title[9]}{title[10]}{title[11]}
                            {title[12]}{title[13]}{title[14]}{title[15]}{title[16]}{title[17]}{title[18]} </div>}
                            </Link>
                        </div>

                        {/* <article key={id} className="book featured-book"> */}
                        <article key={id}>
                            <div className="book-image">
                                <img className="imageResizer" src={image} alt={title}/>
                            </div>
                            {/* <Link to={`books/${id}`} className="btn book-link">View Details</Link> */}
                        </article>
                        <Link to={`books/${id}`} className="btn4 book-link">
                            &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; View Details
                            &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;</Link>
                        </Link>
                    ))}
                </div>
                <body id="customBlock"></body>
                <body id="customBlock"></body>
            
        </>
    )
}

export default Home;
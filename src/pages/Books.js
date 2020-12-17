import React, { useContext } from 'react'
import { Link } from "react-router-dom";
import { BookContext } from '../context/books';
import Hero from "../components/Hero";

const Books = () => {
    const { books } = useContext(BookContext);

    if (!books.length) {
        return <h1 className="cart-empty2">
        <h3 className="cart-empty1">Currently There Are No Books Available</h3>
        </h1>
    }

    // <Hero />
    // <section className="books">
    //     <header className="featured-head">
    //         <h3>Featured Products</h3>
    //     </header>
    // </section>

    return (
        <>
        <Hero />
        <section className="books">
                <header className="featured-head">
                    <h3>All Products</h3>
                </header>
        </section>
        <section className="books">
            {books.sort((a, b) => a.createdAt < b.createdAt ? 1:-1).map(({ image: image, id, title }) => (
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
        </section>
        </>
    )
}

export default Books

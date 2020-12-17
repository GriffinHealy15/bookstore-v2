import React from 'react';
import { Link } from 'react-router-dom';

const Hero = () => {
    return (
        <div>
        <section className="hero">
            <h2>Shop Oasis</h2>
            <h3 className="heroBG">Find the items <br />you are searching for</h3>
            <Link className="btn3" to="/books">View All Products</Link>
        </section>
        <section>
        </section>
        </div>
    )
}

export default Hero

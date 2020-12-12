import React, { useState, useEffect, useContext } from 'react';
import '../stylesheets/ShopSection.scss';
import { MyContext } from '../utils/Context';

// Axios
import axios from '../utils/axios';

import Image from './Image';

function ShopSection(props) {

    const [activeSection, setActiveSection] = useState(props.activeSection);
    const [topsProduct, setTopsProduct] = useState([]);
    const [bottomsProduct, setBottomsProduct] = useState([]);
    const [miscProduct, setMiscProduct] = useState([]);
    const [allProduct, setAllProduct] = useState([]);
    const { searched, error } = useContext(MyContext);

    useEffect(() => {
        axios.get(`/products/${props.path}`)
            .then(res => {
                const product = res.data;
                setAllProduct(product);
                setTopsProduct(product.filter(item => item.category === 'tops'));
                setBottomsProduct(product.filter(item => item.category === 'bottoms'));
                setMiscProduct(product.filter(item => item.category === 'accessories'));
            });
    }, [props.path]);

    useEffect(() => {
        if (searched) {
            setActiveSection(searched)
        };
    }, [searched])

    return (
        <section className="featured-collections" id="ShopSection">
            <header>
                <h3 className="sub-heading">{props.path.toUpperCase()} PRODUCTS</h3>
                <div className="tab-button-container">
                    <button className={activeSection === 'all' ? "tab-item is-active" : "tab-item"} onClick={() => setActiveSection("all")}>ALL</button>
                    <button className={activeSection === 'tops' ? "tab-item is-active" : "tab-item"} onClick={() => setActiveSection("tops")}>TOPS</button>
                    <button className={activeSection === 'bottoms' ? "tab-item is-active" : "tab-item"} onClick={() => setActiveSection("bottoms")}>BOTTOMS</button>
                    <button className={activeSection === 'accessories' ? "tab-item is-active" : "tab-item"} onClick={() => setActiveSection("accessories")}>MISC</button>
                </div>
            </header>
            <section className='products'>
                {error ?
                    <div className='error-msg'>{error}</div>
                    :
                    activeSection === 'tops' ?
                        <>
                            {topsProduct.map((product, index) => (
                                <article key={index}>
                                    <Image
                                        to={`/Products/${product.base_sku}`}
                                        imgDivClass='img-div-home'
                                        imgClass='product-img-home'
                                        product={product}
                                    />
                                    <section className='name-and-price'>
                                        <h3>{product.name}</h3>
                                        <h4>${(product.price_cents / 100).toFixed(2)}</h4>
                                    </section>
                                </article>
                            ))}
                        </>
                        : activeSection === 'bottoms' ?
                            <>
                                {bottomsProduct.map((product, index) => (
                                    <article key={index}>
                                        <Image
                                            to={`/Products/${product.base_sku}`}
                                            imgDivClass='img-div-home'
                                            imgClass='product-img-home'
                                            product={product}
                                        />
                                        <section className='name-and-price'>
                                            <h3>{product.name}</h3>
                                            <h4>${(product.price_cents / 100).toFixed(2)}</h4>
                                        </section>
                                    </article>
                                ))}
                            </>
                            : activeSection === 'accessories' ?
                                <>
                                    {miscProduct.map((product, index) => (
                                        <article key={index}>
                                            <Image
                                                to={`/Products/${product.base_sku}`}
                                                imgDivClass='img-div-home'
                                                imgClass='product-img-home'
                                                product={product}
                                            />
                                            <section className='name-and-price'>
                                                <h3>{product.name}</h3>
                                                <h4>${(product.price_cents / 100).toFixed(2)}</h4>
                                            </section>
                                        </article>
                                    ))}
                                </>
                                :
                                <>
                                    {allProduct.map((product, index) => (
                                        <article key={index}>
                                            <Image
                                                to={`/Products/${product.base_sku}`}
                                                imgDivClass='img-div-home'
                                                imgClass='product-img-home'
                                                product={product}
                                            />
                                            <section className='name-and-price'>
                                                <h3>{product.name}</h3>
                                                <h4>${(product.price_cents / 100).toFixed(2)}</h4>
                                            </section>
                                        </article>
                                    ))}
                                </>
                }
            </section>
        </section>
    );
}

export default ShopSection;
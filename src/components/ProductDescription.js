import React, { useEffect } from 'react';

//stylesheets
import '../stylesheets/ProductDescription.scss';
import '../stylesheets/Image.scss';

//component
import Header from '../components/Header';
import ProductForm from '../components/ProductForm';
import Image from '../components/Image';

const ProductDescription = (props) => {

    useEffect(() => {
        window.scrollTo(0, 0);
    }, [])

    const { products } = props;

    const product = products[0];

    //converts cents to dollar amount
    const centsToUSD = (amount) => {
        var dollars = amount / 100;
        //var cents = amount % 100;

        return dollars;
    } 
    const price_USD = centsToUSD(product.price_cents);
    
    return (
        <div className="ProductDesc">
            <Header
                title={product.name}
                description={"$" + price_USD}
                headerClass="Other-Header sep"
                divClass="Container-Header"
                hClass="Product-Header"
                subHClass="Sub-Header"
            /> {/*header with custom title and sub header*/}
            <div className="product-img-wrapper">
                <Image
                    to='#'
                    product={product}
                    imgDivClass='img-div-product-page'
                    imgClass='product-img'
                />
            </div>
            <ProductForm products={products} />
        </div>
    );
};

export default ProductDescription;
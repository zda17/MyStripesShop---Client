import React, { useState, useEffect, useContext } from 'react';
import '../stylesheets/Search.scss';
import { useHistory, useLocation } from 'react-router-dom';
import { MyContext } from '../utils/Context';

const Search = () => {

    const [searchInput, setSearchInput] = useState();
    const { setSearched, setError, showSearch, setShowSearch } = useContext(MyContext);

    const history = useHistory();
    const location = useLocation();

    const tops = ['tops', 'top', 'shirt', 'shirts', 'long sleeve', 'long sleeves', 'long-sleeve', 'short sleeve', 'short sleeves', 'short-sleeve', 'short-sleeves', 'tanktop', 'tanktops', 'tank top', 'tank tops', 'tank', 'sweatshirt', 'sweatshirts', 'sweater', 'sweaters', 'jacket', 'jackets', 't shirt', 't-shirt', 'tshirt', 't shirts', 't-shirts', 'tshirts', 'tee', 'tees'];
    const bottoms = ['bottoms', 'bottom', 'pants', 'shorts', 'jeans'];
    const accessories = ['hats', 'hat', 'beanie', 'beanies', 'accessories', 'cap', 'caps'];

    useEffect(() => {
        if (showSearch) {
            document.getElementById("search").focus();
            document.addEventListener('click', function (e) {
                if (e.target.id !== 'search' && !e.target.className.includes('search')) {
                    setShowSearch(false);
                }
            })
        }
    }, [showSearch])

    const handleInputChange = e => {
        setSearchInput(e.target.value);
        document.getElementById('search').style.fontStyle = 'italic';
    }

    const setSearchedState = () => {
        let searchSuccess = false;
        for (let i = 0; i < tops.length; i++) {
            if (tops[i] == searchInput) {
                setSearched('tops');
                setError('');
                searchSuccess = true;
            }
        }
        for (let i = 0; i < bottoms.length; i++) {
            if (bottoms[i] == searchInput) {
                setSearched('bottoms');
                setError('');
                searchSuccess = true;
            }
        }
        for (let i = 0; i < accessories.length; i++) {
            if (accessories[i] == searchInput) {
                setSearched('accessories');
                setError('');
                searchSuccess = true;
            }
        }
        return searchSuccess;
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        setSearchedState();
        if (!setSearchedState()) {
            setError('Sorry, we couldn\'t find results for that. Try a different search!');
        }
        if (location.pathname !== '/Products/Mens') {
            history.push('/Products/Mens');
            // if women's clothes become available in the future, consider that here for the search
        }
        document.getElementById('search').style.fontStyle = 'normal';
    }

    return (
        <>
            {showSearch ?
                <form className='search-form' onSubmit={handleSubmit}>
                    <i className="fa fa-search search-icon" onClick={handleSubmit} />
                    <label className='search-field' htmlFor='search'>
                        <input type='text' name='search' id='search' onChange={handleInputChange} placeholder='Try "pants" or "shirts"'></input>
                        <input type='submit' value='' className='search-enter' />
                    </label>
                    <i onClick={() => setShowSearch(false)} className="fas fa-times"></i>
                </form>
                :
                <i onClick={() => setShowSearch(true)} className="fa fa-search search"></i>
            }
        </>
    )
}

export default Search;
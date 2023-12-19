import { MdClose } from 'react-icons/md';

import { useState } from 'react';
import router from 'next/router';

import ProductsAutoComplete from '../../ProductsAutoComplete';

const SearchOverlay = ({ activeStatus, getActiveStatus }) => {
    const [query, setQuery] = useState();

    const onSuggestionSelected = (_, { suggestion }) => {
        setQuery(suggestion.name);
        router.push(`/product/${suggestion.slug}`);
    };

    const onSuggestionCleared = () => {
        this.setQuery('');
    };

    return (
        <div className={`search-overlay ${activeStatus ? 'active' : ''}`}>
            {/*=======  close icon  =======*/}
            <button
                className='search-overlay__close-icon'
                onClick={() => {
                    getActiveStatus(false);
                    document
                        .querySelector('body')
                        .classList.remove('overflow-hidden');
                }}>
                <MdClose />
            </button>
            {/*=======  End of close icon  =======*/}
            {/*=======  search overlay content  =======*/}
            <div className='search-overlay__content'>
                <form className='space-mb--20'>
                    <ProductsAutoComplete />
                </form>
                {/* <form className='space-mb--20'>
                    <input type='search' placeholder='Search Products...' />
                </form>
                <div className='search-overlay__hint'>
                    # Hit enter to search!
                </div> */}
            </div>
            {/*=======  End of search overlay content  =======*/}
        </div>
    );
};

export default SearchOverlay;

import React from 'react';
import SearchButton from './SearchButton';
import './searchbar.css';


export default function SearchBar ( { searchTerm, setSearchTerm, handleSearch } ) {
   
    return(
        
        <div>
            <div className="search-container">
                <input
                    className="search-bar"
                    type="text"
                    placeholder="Search for Your Song Here..." 
                    value={searchTerm}  
                    onChange={(e) => setSearchTerm(e.target.value)}
        
                />
                <SearchButton className="search-button" onClick={handleSearch} />
            </div>
        </div>
    
    )
}
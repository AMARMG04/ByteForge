"use client"
import React from 'react';
import algoliasearch from 'algoliasearch/lite';
import { InstantSearch, Hits, SearchBox } from 'react-instantsearch';
import CustomSearchBox from './CustomSearchBox';
import CustomHits from './CustomHits';
const searchClient = algoliasearch('JYC30XTPPP', '504dd3b8b4126e24e9686038c701448e');

const Search = () => {
  
  return(
    <InstantSearch
      searchClient={searchClient}
      indexName="products"
    >
      {/* <SearchBox /> */}
      <CustomSearchBox />
      {/* <Hits /> */}
    </InstantSearch>

  );
};

export default Search;

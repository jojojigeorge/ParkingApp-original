import React, { createContext, useContext, useState } from 'react'

const SearchContext=createContext()
const SearchProvider = ({children}) => {
  const [searchvalue,setSearchValue]=useState('')
  return (
    <SearchContext.Provider value={[searchvalue,setSearchValue]}>
        {children}
    </SearchContext.Provider>
  )
}
// custom hook
const useSearch=()=>useContext(SearchContext)
export {useSearch,SearchProvider}

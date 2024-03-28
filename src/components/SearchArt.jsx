import Search from "antd/es/input/Search"
import { useState } from "react"

export const SearchBar = ({setKeySearch}) => {
    const [newSearch, setSearch] = useState('');
    
    const handleSubmit = (event) => {
        event.preventDefault();
        console.log(newSearch)
        setKeySearch(newSearch);
        setSearch('');
    }

    return (
        <form onSubmit={handleSubmit}>
            <Search placeholder="Search for artwork" addonAfter allowClear prefix value={newSearch} onChange={(event) => setSearch(event.target.value)}></Search>
        </form>
    )
}
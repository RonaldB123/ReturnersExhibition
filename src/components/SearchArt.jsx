import Search from "antd/es/input/Search"
import { useState } from "react"

export const SearchBar = ({setKeySearch}) => {
    const [newSearch, setSearch] = useState('');
    
    const handleSubmit = (event) => {
        event.preventDefault();
        setKeySearch(newSearch);
    }

    return (
        <form onSubmit={handleSubmit}>
            <Search placeholder="Search for artwork" prefix allowClear value={newSearch} onChange={(event) => setSearch(event.target.value)}></Search>
        </form>
    )
}
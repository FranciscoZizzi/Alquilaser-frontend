import React, {useState} from "react";

const SearchPage = () => {

    const [value, setValue] = useState<string>("");

    const handleChange = (event: React.FormEvent<HTMLInputElement>) => {
        setValue(event.currentTarget.value)
    }

    return (
        <div>
            Search Page
        </div>
    )
}

export default SearchPage
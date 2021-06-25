import React from 'react';
import { InputGroup, FormControl, Button } from 'react-bootstrap';
const SearchUsers =() => {
    return (
        <InputGroup>
            <FormControl
                type="text"
                placeholder="Search books"
                onChange={e => (e.target.value)}
            />
            <InputGroup.Append>
                <Button >
                    Search
                </Button>
            </InputGroup.Append>
        </InputGroup>
    );
}

export default SearchUsers;
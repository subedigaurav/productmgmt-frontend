import React, { useState } from 'react';
import { Button, InputGroup, FormControl } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const TopBar = ({ searchCallback }) => {
  const [searchQuery, setSearchQuery] = useState('');

  const linkStyle = {
    textDecoration: 'none',
    color: 'white',
    display: 'inline-block',
    width: '100%',
    height: '100%',
  };

  const onInputChangeHandler = (e) => {
    setSearchQuery(e.target.value);
  };

  const searchHandler = () => {
    searchCallback(searchQuery);
    setSearchQuery('');
  };

  const handleOnKeyDown = (e) => {
    if (e.key === 'Enter') {
      searchCallback(searchQuery);
      setSearchQuery('');
    }
  };

  return (
    <div>
      <InputGroup className="mb-3">
        <Button variant="success" style={{ margin: '5px' }}>
          <Link to="/addproduct" style={linkStyle}>
            Add Product
          </Link>
        </Button>
        <FormControl
          style={{ margin: '5px' }}
          placeholder="Enter text to search"
          value={searchQuery}
          onChange={onInputChangeHandler}
          onKeyDown={handleOnKeyDown}
        />
        <InputGroup.Append>
          <Button
            style={{ margin: '5px' }}
            variant="outline-primary"
            onClick={searchHandler}
          >
            Search
          </Button>
        </InputGroup.Append>
      </InputGroup>
    </div>
  );
};

export default TopBar;

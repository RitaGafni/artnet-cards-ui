import React, { useState, useEffect } from 'react';

export default function AmitTest() {
  const [searchParameters, setSearchParameters] = useState({
    searchType: 'basic',
    basicSearch: {},
    advancedSearch: {},
  });

  function setSearchType(searchType) {
    setSearchParameters({ searchType: searchType });
  }
}

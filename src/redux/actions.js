function fetchingData(page, searchKey, sortKey = "views") {
  return (dispatch) => {
    fetch(
      `https://pixabay.com/api/?key=14199001-636b551f98b19a34a876ea72c&q=${encodeURIComponent(
        searchKey
      )}&page=${page}`
    )
      .then((resp) => resp.json())
      .then((data) =>
        dispatch(
          fetchedData(
            data.hits.sort((a, b) => (a[sortKey] > b[sortKey] ? -1 : 1))
          )
        )
      );
  };
}

function fetchedData(data) {
  console.log(data);
  return {
    type: "FETCHED_DATA",
    payload: data,
  };
}

export { fetchingData };

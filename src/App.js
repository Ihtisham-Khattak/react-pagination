import "./App.css";
import ReactPaginate from "react-paginate";
import axios from "axios";
import React, { useEffect, useState } from "react";

function App() {
  const [task, setTask] = useState([]);
  // const [loading, setLoading] = useState(false);

  useEffect(() => {
    const getPageItems = async () => {
      await axios
        .get("https://jsonplaceholder.typicode.com/comments?_page=1&_limit=6")
        .then((res) => {
          setTask(res.data);
        })
        .catch((err) => console.error(err.message));
    };

    getPageItems();
  }, []);

  console.log(task);
  //get Current page by clicking on page number
  const fetchData = async (currentPage) => {
    const res = await axios.get(
      `https://jsonplaceholder.typicode.com/comments?_page=${currentPage}&_limit=6`
    );
    const data = await res.data;
    return data;
  };

  const onPageChangeEvent = async (data) => {
    let currentPage = data.selected + 1;

    const getFetchedData = await fetchData(currentPage);

    setTask(getFetchedData);
  };

  return (
    <div className="App">
      <div className="row mt-2">
        {task.map((tasks) => {
          return (
            <div className="col-sm-6 col-md-4 v my-2 " key={tasks.id}>
              <div className="card shadow-sm w-100 " style={{ minHeight: 225 }}>
                <div className="card-body">
                  <h5 className="card-title text-center h2">{tasks.id} </h5>
                  <h6 className="card-subtitle mb-2 text-muted text-center">
                    {tasks.title}
                  </h6>
                  <p className="card-text">{tasks.body}</p>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <ReactPaginate
        //Previous Page navigation
        previousLabel={"Previous"}
        //Next Page navifation
        nextLabel={"Next"}
        //Dot between numbers e.g. 1,2,3,4,.......,15
        breakLabel={"..."}
        //Total number of pages
        pageCount={15}
        //Number before and after the P and N
        marginPagesDisplayed={4}
        pageRangeDisplayed={3}
        //Event for changing the page
        onPageChange={onPageChangeEvent}
        //containerClass
        containerClassName={"pagination justify-content-center"}
        pageClassName={"page-item"}
        pageLinkClassName={"page-link"}
        //Previous button styling
        previousClassName={"page-item"}
        previousLinkClassName={"page-link"}
        //Next button styling
        nextClassName={"page-item"}
        nextLinkClassName={"page-link"}
        //Break styling
        breakClassName={"page-item"}
        breakLinkClassName={"page-link"}
        //Active Page number
        activeClassName={"active"}
      />
    </div>
  );
}

export default App;

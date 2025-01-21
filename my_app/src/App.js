import './App.css';
import { useEffect, useState } from 'react';
import { fetchData} from "./api"

const App = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;



// api calling 
useEffect(() => {
  getData();
}, []);

//  function to get data
const getData = async () => {
  try {
    const result = await fetchData(); 
    console.log("alokres", result);
    if (result && result.length > 0) {
      setData(result);
    } else {
      setData([]);
    }
  } catch (error) {
    console.error("Error fetching data:", error);
    setData([]);
  } finally {
    setLoading(false);
  }
};

// funtionn to get total number of pages
  const totalPages = Math.ceil(data.length / itemsPerPage);

  // funxtion to display data
  const displayedData = data.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );


  // data binding on page change 
  const handlePageChange = (page) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  // function to get page number
  const getPaginationNumbers = () => {
    const maxPageNumbersToShow = 5;
    const pages = [];

    if (totalPages <= maxPageNumbersToShow) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      const startPage = Math.max(1, currentPage - 2);
      const endPage = Math.min(totalPages, currentPage + 2);

      if (startPage > 1) pages.push(1);
      if (startPage > 2) pages.push('...');

      for (let i = startPage; i <= endPage; i++) {
        pages.push(i);
      }

      if (endPage < totalPages - 1) pages.push('...');
      if (endPage < totalPages) pages.push(totalPages);
    }

    return pages;
  };

  if (loading) return <div className="loading">Loading...</div>;

  return (
    <div className="app-container">
      <div className="content">
        <h3 className="title">Saas Lab Project</h3>
        <table className="table table-bordered">
          <thead>
            <tr>
              <th>S.No</th>
              <th>Percentage Funded</th>
              <th>Amount Pledged</th>
            </tr>
          </thead>
          <tbody>
            {displayedData.map((item, index) => (
              <tr key={index}>
                <td>{item["s.no"]}</td>
                <td>{item["percentage.funded"]}</td>
                <td>{item["amt.pledged"]}</td>
              </tr>
            ))}
          </tbody>
        </table>

        <nav>
          <ul className="pagination justify-content-center">
            <li className={`page-item ${currentPage === 1 ? 'disabled' : ''}`}>
              <button
                className="page-link"
                onClick={() => handlePageChange(currentPage - 1)}
              >
                Previous
              </button>
            </li>
            {getPaginationNumbers().map((page, index) =>
              typeof page === 'number' ? (
                <li
                  key={index}
                  className={`page-item ${currentPage === page ? 'active' : ''}`}
                >
                  <button
                    className="page-link"
                    onClick={() => handlePageChange(page)}
                  >
                    {page}
                  </button>
                </li>
              ) : (
                <li key={index} className="page-item disabled">
                  <span className="page-link">...</span>
                </li>
              )
            )}
            <li
              className={`page-item ${
                currentPage === totalPages ? 'disabled' : ''
              }`}
            >
              <button
                className="page-link"
                onClick={() => handlePageChange(currentPage + 1)}
              >
                Next
              </button>
            </li>
          </ul>
        </nav>
      </div>
    </div>
  );
};

export default App;

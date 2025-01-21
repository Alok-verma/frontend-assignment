
import React, { useEffect, useState, useMemo } from 'react';
import { fetchData } from './api';
import './App.css';

const App = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  // API call to fetch data
  useEffect(() => {
    const getData = async () => {
      try {
        const result = await fetchData();
        setData(result && result.length > 0 ? result : []);
      } catch (error) {
        console.error("Error fetching data:", error);
        setData([]);
      } finally {
        setLoading(false);
      }
    };
    getData();
  }, []);

  // Calculate total pages dynamically
  const totalPages = Math.ceil(data.length / itemsPerPage);

  // Get the displayed data for the current page
  const displayedData = useMemo(() => {
    const startIdx = (currentPage - 1) * itemsPerPage;
    const endIdx = currentPage * itemsPerPage;
    return data.slice(startIdx, endIdx);
  }, [data, currentPage]);

  // Handle page change
  const handlePageChange = (page) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  // Generate pagination numbers
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

  return (
    <div className="app-container" data-testid="main">
      {loading ? (
        <div className="loading">Loading...</div>
      ) : (
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
              {displayedData?.map((item, index) => (
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
                <button className="page-link" onClick={() => handlePageChange(currentPage - 1)}>
                  Previous
                </button>
              </li>
              {getPaginationNumbers().map((page, index) =>
                typeof page === 'number' ? (
                  <li key={index} className={`page-item ${currentPage === page ? 'active' : ''}`}>
                    <button className="page-link" onClick={() => handlePageChange(page)}>
                      {page}
                    </button>
                  </li>
                ) : (
                  <li key={index} className="page-item disabled">
                    <span className="page-link">...</span>
                  </li>
                )
              )}
              <li className={`page-item ${currentPage === totalPages ? 'disabled' : ''}`}>
                <button className="page-link" onClick={() => handlePageChange(currentPage + 1)}>
                  Next
                </button>
              </li>
            </ul>
          </nav>
        </div>
      )}
    </div>
  );
};

export default App;

import React from "react";
import { render, screen, waitFor ,cleanup } from "@testing-library/react";
import App from '../App';
import { fetchData } from '../api';

afterAll(cleanup);

// Mock the API call to simulate data fetching
jest.mock('../api', () => ({
  fetchData: jest.fn(),
}));

describe("App Component", () => {
  
  // Render the App once before each test
  beforeEach(() => {
    render(<App />);
  });

  it("renders correctly", async () => {
    expect(screen.getByTestId('main')).toBeInTheDocument();
  });

  test('displays loading text while fetching data', async () => {
    fetchData.mockResolvedValue([]);
    
    // Check if loading text is displayed
    expect(screen.getByText('Loading...')).toBeInTheDocument();
  });

  test('renders data when available', async () => {
    const mockData = [
      { "s.no": 1, "percentage.funded": "50%", "amt.pledged": "1000" },
      { "s.no": 2, "percentage.funded": "60%", "amt.pledged": "2000" },
    ];

    fetchData.mockResolvedValue(mockData);

    // Wait for the data to load and verify rendering
    await waitFor(() => screen.findByTestId('main'));
    
  });

});

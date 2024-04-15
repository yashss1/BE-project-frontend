import React, { useState } from 'react';
import { fetchData, postData, updateData } from './api';

function App() {
  const [displayedData, setDisplayedData] = useState(null);

  const handleFetchData = async () => {
    const data = await fetchData();
    setDisplayedData(data);
  };

  const handlePostData = async () => {
    const data = await postData({ name: 'John', job: 'Software Engineer' });
    setDisplayedData(data);
  };

  const handleUpdateData = async () => {
    const data = await updateData(1, { name: 'John Doe', job: 'Full Stack Developer' });
    setDisplayedData(data);
  };

  return (
    <div>
      <h1>Display Data</h1>
      <button onClick={handleFetchData}>Fetch Data</button>
      <button onClick={handlePostData}>Post Data</button>
      <button onClick={handleUpdateData}>Update Data</button>

      {displayedData && (
        <div>
          <h2>Displayed Data</h2>
          <pre>{JSON.stringify(displayedData, null, 2)}</pre>
        </div>
      )}
    </div>
  );
}

export default App;

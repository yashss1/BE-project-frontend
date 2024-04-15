// api.js

async function fetchData() {
    try {
      const response = await fetch('https://jsonplaceholder.typicode.com/users');
      const jsonData = await response.json();
      return jsonData;
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  }
  
  async function postData(data) {
    try {
      const response = await fetch('https://reqres.in/api/users', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
      });
      const jsonData = await response.json();
      return jsonData;
    } catch (error) {
      console.error('Error posting data:', error);
    }
  }
  
  async function updateData(id, newData) {
    try {
      const response = await fetch(`https://jsonplaceholder.typicode.com/users/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(newData)
      });
      const jsonData = await response.json();
      return jsonData;
    } catch (error) {
      console.error('Error updating data:', error);
    }
  }
  
  export { fetchData, postData, updateData };
  
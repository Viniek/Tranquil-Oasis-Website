const axios = require('axios');

async function testLogin() {
  try {
    const response = await axios.post('http://localhost:7000/api/users/login', {
      emailaddress: 'nje@gmail.com',
      password: '1234567'
    });

    const userData = response.data.data;
    console.log('Logged in user data:', userData);

    // Check if the first name is available
    if (userData.firstname) {
      console.log('First name is available:', userData.firstname);
    } else {
      console.error('First name is not available');
    }
  } catch (error) {
    console.error('Error logging in:', error.response ? error.response.data : error.message);
  }
}

testLogin();
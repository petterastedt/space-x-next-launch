require('dotenv').config()
const axios = require('axios')

const headers = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Credentials': true
}

exports.handler = async () => {
  try {
    const response = await axios.get(`${process.env.API_URL}/launches/upcoming`)

    return {
      statusCode: 200,
      headers,
      body: JSON.stringify(response.data)
    }
  } catch (error) {
    console.log(error)
    return {
      statusCode: 500,
      headers,
      body: JSON.stringify(error)
    }
  }
}
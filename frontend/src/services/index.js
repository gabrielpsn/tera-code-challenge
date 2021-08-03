import axios from 'axios'

axios.defaults.headers.post['Content-Type'] = 'application/json'
axios.defaults.headers.post['Accept'] = 'application/json'

export default {
    async getBooks () {
       let result = await axios.get('https://us-central1-tera-platform.cloudfunctions.net/url-tera-code-challenge')
       return result.data
    }
}
import axios from 'axios';

export const getuser = () => {
    axios.get('http://127.0.0.1:3000/users')
    .then(res => {
        console.log(res)

    }).catch(err => {
        console.log(err)
    })
}

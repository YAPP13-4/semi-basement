import axios from 'axios';
import { GET_USER } from 'src/api/apiConstants';

export const fetchUser = () => axios.get(GET_USER).then(res => res.data);

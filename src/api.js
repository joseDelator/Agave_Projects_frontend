import axios from 'axios';

export default axios.create({
  baseURL: `https://agaveprojectmangement-production.up.railway.app/`
});
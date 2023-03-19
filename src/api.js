import axios from 'axios';
console.log(process.env)
export default axios.create({
  baseURL: "https://agaveprojectmangement-production.up.railway.app/"
});



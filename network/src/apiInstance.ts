import axios from "axios";
import NetworkInstance from "../config/NetworkInstance";

const apiInstance = axios.create(NetworkInstance);

export default apiInstance;

import axios from 'axios';

const API_BASE_URL = 'http://localhost:4000/api';
export const AddRecipientsApi=async(data)=>{
    try {
    const response=await axios.post(`${API_BASE_URL}/addRecipient`,data);
    return response.data;       

    } catch (error) {
        console.log("Error fetching templates:", error);
        
        
    }
}
export const fetchRecipients=async()=>{
    try {
        const response=await axios.get(`${API_BASE_URL}/getRecipients`);
        return response.data;
        
    } catch (error) {
        console.log("Error fetching templates:", error);
        
    }
}
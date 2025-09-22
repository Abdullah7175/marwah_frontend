// Simple test to check if the packages API is working
const API_URL = "http://98.82.201.1:8000/api/web/packs";

console.log("Testing API endpoint:", API_URL);

fetch(API_URL, {
    method: "GET",
    headers: {
        'Content-Type': 'application/json',
    }
})
.then(response => {
    console.log("Response status:", response.status);
    console.log("Response ok:", response.ok);
    console.log("Response headers:", response.headers);
    
    if (!response.ok) {
        throw new Error(`HTTP ${response.status}: ${response.statusText}`);
    }
    return response.json();
})
.then(data => {
    console.log("Success! Received data:", data);
    console.log("Number of categories:", data.length);
    if (data.length > 0) {
        console.log("First category:", data[0]);
        console.log("Number of packages in first category:", data[0].list ? data[0].list.length : 0);
    }
})
.catch(error => {
    console.error("Error:", error);
});



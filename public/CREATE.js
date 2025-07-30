// funtion to presist the Data written
function saveFormToLocalStorage(){
    const title = document.getElementById('title').value;
    const content = document.getElementById('content').value;
    const blogData ={title,content};
    localStorage.setItem ('draftBlog',JSON.stringify(blogData));
}


// load Local storage data when the page is loaded 
window.addEventListener('DOMContentLoaded', ()=>{
    const savedData = localStorage.getItem('draftBlog');
    if(savedData){
        const{title,content}=JSON.pares(savedData);
        document.getElementById('title').value=title ||'';
        document.getElementById('content').value =content ||'';
    }
})

// Funtion to Submit the Date 
function submitPost(){
    let title = document.getElementById('title').value;
    let content = document.getElementById('content').value;

    
// Showing alert function if the fileds are empty
if (title.trim() === "" || content.trim() === ""){
    alert("Please fill all the fileds!");
    return;
} 

console.log("Title",title);
console.log("content",content);

// Send to backend 
fetch('http://localhost:3000/api/blogs',{
    
method:'Post',
headers:{
    'Content-Type':'application/json'
},
body:JSON.stringify({title,content})
})

.then(response => {
    if(!response.ok) throw new Error("Network response was not ok");
    return response.json();
})

.then(data=>{
    console.log('Post submitted sucessfully:', data);


//Show message on screen
const messageDiv =document.getElementById('success-message');
messageDiv.textContent = "✅ Blog post submitted successfully!"
messageDiv.style.color ="green";

//clear draft
localStorage.removeItem('draftBlog');


//clear from 
document.getElementById('title').value='';
document.getAnimations('content').value='';
})

.catch(error => {
    console.error('Error', error);
    const messageDiv =document.getElementById('success-message');
    messageDiv.textContent ="❌ Failed to submit post."
    messageDiv.style.color ="red";
});
}

// To Fetch the data for Home page
async function saveBlogToDb(blogData) {
    await fetch('http://localhost:3000/api/blogs',{
        method:'POST',
        headers: {'Content-Type':'application/json'},
        body: JSON.stringify(blogData),
    });
}










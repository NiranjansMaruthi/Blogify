
//fetch data from mongoDB

async function fetchandDisplayBlogs(){
    const res = await fetch('http://localhost:3000/api/blogs'); // backend APi route
     if (!res.ok) throw new Error("Failed to fetch blogs");
    const blogs = await res.json();
    blogs.forEach(createBlogCard); //Blog card created Automatic
}

//Function to display the blog 
function createBlogCard(blog){
    const card= document.createElement('div');
     card.className = 'card blog-card'; // ✅ Applies both classes
    
    const title= document.createElement('h5')
    title.textContent=blog.title;


    const hr =document.createElement('hr');
    
    const snippet = document.createElement('p')
    snippet.textContent =blog.content.slice(0,130)+'...';

    const readBtn =document.createElement('a')
    readBtn.href=`./read.html?id=${blog._id}`; /// Backend returning `_id`
    readBtn.className ='btn btn-primary';
    readBtn.textContent ='Read this';
 
    // Delete function
    const deleteBtn = document.createElement('button');
    deleteBtn.className = 'btn-D'; // Bootstrap red button
    deleteBtn.innerText = 'Delete';


    // ✅ Add delete logic
    deleteBtn.onclick = async () => {
        if (confirm('Are you sure you want to delete this blog post?')) {
            try {
                const res = await fetch(`http://localhost:3000/api/blogs/${blog._id}`, {
                    method: 'DELETE'
                });
                if (res.ok) {
                    card.remove(); // remove card from DOM
                    console.log('Blog deleted successfully',blog._id);
                } else {
                    alert('Failed to delete blog');
                }
            } catch (error) {
                console.error('Error deleting blog:', error);
            }
        }
    };


//add all the elements
    card.appendChild(title);
    card.appendChild(hr);
    card.appendChild(snippet);
    card.appendChild(readBtn); // read button 
    card.appendChild(deleteBtn); //delete button

    document.querySelector('.cards').appendChild(card);

}

// Call funtion on page load
window.addEventListener('DOMContentLoaded', fetchandDisplayBlogs);













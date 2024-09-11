const newFormHandler = async (event) => {
  event.preventDefault();

  const title = document.querySelector('#blog-title').value.trim();
  const content = document.querySelector('#blog-content').value.trim();

  if (title && content) {
    const response = await fetch(`/api/blogs`, {
      method: 'POST',
      body: JSON.stringify({ title, content }),
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (response.ok) {
      document.location.replace('/blog');
    } else {
      alert('Failed to create blog');
    }
  }
};

const delButtonHandler = async (event) => {
  if (event.target.hasAttribute('data-id')) {
    const id = event.target.getAttribute('data-id');

    const response = await fetch(`/api/blogs/${id}`, {
      method: 'DELETE',
    });

    if (response.ok) {
      document.location.replace('/blog');
    } else {
      alert('Failed to delete blog');
    }
  }
};


const newBlogForm = document.querySelector('.new-blog-form');
const blogList = document.querySelector('.blog-list');

if (newBlogForm) {
  newBlogForm.addEventListener('submit', newFormHandler);
}

if (blogList) {
  blogList.addEventListener('click', delButtonHandler);
}

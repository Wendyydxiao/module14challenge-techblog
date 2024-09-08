document.querySelector('#new-comment-form').addEventListener('submit', async (event) => {
    event.preventDefault();
  
    const content = document.querySelector('#comment-content').value.trim();
    const blogId = window.location.pathname.split('/').pop(); 
  
    if (content) {
      const response = await fetch('/api/comments', {
        method: 'POST',
        body: JSON.stringify({
          content,
          blog_id: blogId,
        }),
        headers: { 'Content-Type': 'application/json' },
      });
  
      if (response.ok) {
        document.location.reload();
      } else {
        alert('Failed to post comment');
      }
    }
  });
  
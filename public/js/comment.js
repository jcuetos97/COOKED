const commentFormHandler = async function(event) {
    event.preventDefault();
  
    const postId = document.querySelector('input[name="post-id"]').value;
    const content = document.querySelector('textarea[name="comment-body"]').value;
  
    if (content) {
      await fetch('/api/comment', {
        method: 'POST',
        body: JSON.stringify({
          post_id: postId,
          body: content
        }),
        headers: { 'Content-Type': 'application/json'}
      });
  
      document.location.reload();
    }
  };
  
  document
    .querySelector('#new-comment-form')
    .addEventListener('submit', commentFormHandler);
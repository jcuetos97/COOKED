const publishFormHandler = async (event) => {
    event.preventDefault();
  
    const title = document.querySelector('#title-newPost');
    const content = document.querySelector('#content-newPost');
    
    if (title && content) {
      const response = await fetch('/api/post/new', {
        method: 'POST',
        body: JSON.stringify ({    
            title: title.value.trim(),
            body: content.value.trim(), 
        }),
        headers: { 'Content-Type': 'application/json' },
      });
      if (response.ok) {
        document.location.replace("/dashboard");
      } else {
        alert('Failed to publish post.');
      }
    }
  };
  
  document
    .querySelector('.newPost-form')
    .addEventListener('submit', publishFormHandler);
  
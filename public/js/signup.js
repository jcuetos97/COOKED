const loginFormHandler = async (event) => {
    event.preventDefault();
  
    const username = document.querySelector('#username-signup');
    const password = document.querySelector('#password-signup');
  
    if (password && username) {
      const response = await fetch('/api/users/', {
        method: 'POST',
        body: JSON.stringify ({    
            username: username.value.trim(), 
            password: password.value.trim()
        }),
        headers: { 'Content-Type': 'application/json' },
      });
      if (response.ok) {
        document.location.replace("/");
      } else {
        alert('Failed to log in');
      }
    }
  };
  
  document
    .querySelector('.signup-form')
    .addEventListener('submit', loginFormHandler);
  
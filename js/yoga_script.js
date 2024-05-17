// Function to display links
function displayLinks() {
    var linkContainer = document.getElementById('link-container');
    linkContainer.innerHTML = '';
  
    // Fetch links from the backend API
    fetch('https://your-glitch-project.glitch.me/api/resources?category=yoga')
      .then(response => response.json())
      .then(data => {
        data.forEach(function (resource) {
          var linkElement = document.createElement('a');
          linkElement.href = resource.url;
          linkElement.target = '_blank';
          linkElement.textContent = resource.title;
          linkContainer.appendChild(linkElement);
          linkContainer.appendChild(document.createElement('br'));
        });
      })
      .catch(error => {
        console.error('Error fetching links:', error);
      });
  }
  
  // Function to add a new link
  function addLink() {
    var titleInput = document.getElementById('link-title');
    var urlInput = document.getElementById('link-url');
    var title = titleInput.value.trim();
    var url = urlInput.value.trim();
  
    if (title !== '' && url !== '') {
      if (!url.startsWith('http://') && !url.startsWith('https://')) {
        url = 'https://' + url;
      }
  
      // Send a POST request to the backend API to add the link
      fetch('https://your-glitch-project.glitch.me/api/resources', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          title: title,
          url: url,
          category: 'yoga'
        })
      })
        .then(response => response.json())
        .then(data => {
          displayLinks();
          titleInput.value = '';
          urlInput.value = '';
        })
        .catch(error => {
          console.error('Error adding link:', error);
        });
    }
  }
  
  // Call the displayLinks function when the page loads
  displayLinks();
  
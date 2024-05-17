// Function to login
function login() {
    var username = document.getElementById('username').value;
    if (username === 'admin') {
        document.getElementById('login-form').style.display = 'none';
        document.getElementById('admin-options').style.display = 'block';
        loadLinks();
    } else {
        alert('Invalid username');
    }
}

// Function to add a new resource
function addResource() {
    var title = document.getElementById('link-title').value;
    var url = document.getElementById('link-url').value;
    var category = document.getElementById('page-select').value;

    if (title !== '' && url !== '') {
        if (!url.startsWith('http://') && !url.startsWith('https://')) {
            url = 'https://' + url;
        }

        fetch('https://your-glitch-project.glitch.me/api/resources', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                title: title,
                url: url,
                category: category
            })
        })
        .then(response => response.json())
        .then(data => {
            loadLinks();
            document.getElementById('link-title').value = '';
            document.getElementById('link-url').value = '';
        })
        .catch(error => {
            console.error('Error adding resource:', error);
        });
    }
}

// Function to load resources
function loadLinks() {
    var category = document.getElementById('page-select').value;

    fetch('https://your-glitch-project.glitch.me/api/resources')
        .then(response => response.json())
        .then(data => {
            var linkList = document.getElementById('link-list');
            linkList.innerHTML = '';

            data.filter(resource => resource.category === category).forEach((resource, index) => {
                var listItem = document.createElement('li');
                listItem.innerHTML = `${resource.title} - <a href="${resource.url}" target="_blank">${resource.url}</a> <button onclick="removeResource('${resource._id}')">Remove</button>`;
                linkList.appendChild(listItem);
            });
        })
        .catch(error => {
            console.error('Error fetching resources:', error);
        });
}

// Function to remove a resource
function removeResource(id) {
    fetch(`https://your-glitch-project.glitch.me/api/resources/${id}`, {
        method: 'DELETE'
    })
    .then(response => response.json())
    .then(data => {
        loadLinks();
    })
    .catch(error => {
        console.error('Error deleting resource:', error);
    });
}

// Call the loadLinks function when the page loads
loadLinks();

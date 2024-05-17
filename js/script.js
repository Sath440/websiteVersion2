
        function searchResources() {
            var searchQuery = document.querySelector('.search-input').value.toLowerCase();
            var searchResults = document.querySelector('.search-results');
            searchResults.innerHTML = '';
        
            var resources = [];
        
            // Retrieve resources from local storage for each page
            var meditationResources = localStorage.getItem('medResources');
            if (meditationResources) {
                resources = resources.concat(JSON.parse(meditationResources));
            }
        
            var booksResources = localStorage.getItem('booksResources');
            if (booksResources) {
                resources = resources.concat(JSON.parse(booksResources));
            }
        
            var breathingResources = localStorage.getItem('breathingResources');
            if (breathingResources) {
                resources = resources.concat(JSON.parse(breathingResources));
            }
        
            var yogaResources = localStorage.getItem('yogaResources');
            if (yogaResources) {
                resources = resources.concat(JSON.parse(yogaResources));
            }
        
            var matchingResources = resources.filter(function (resource) {
                return resource.title.toLowerCase().includes(searchQuery);
            });
        
            if (matchingResources.length > 0) {
                var resultList = document.createElement('ul');
                matchingResources.forEach(function (resource) {
                    var listItem = document.createElement('li');
                    var link = document.createElement('a');
                    link.href = resource.url;
                    link.textContent = resource.title;
                    listItem.appendChild(link);
                    resultList.appendChild(listItem);
                });
                searchResults.appendChild(resultList);
            } else {
                searchResults.textContent = 'No matching resources found';
            }
        }

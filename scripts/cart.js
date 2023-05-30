function displayCartCount(i) {
  var count = document.getElementById('totalCount');
  count.className = 'totalCount';
  if (i>0) {
      count.innerHTML = `<p>${i}</p>`;
      count.style.opacity = 1;
  } else {
      count.style.opacity = 0;
  }
}



var retrievedCount = JSON.parse(localStorage.getItem('totalCntString'));
          displayCartCount(retrievedCount);

// Example to add data to the grid dynamically
const retrievedDataString = localStorage.getItem('dataString');
const retrievedData = JSON.parse(retrievedDataString);
        
// Get the grid container element
const gridContainer = document.querySelector('.grid-container');


for (const category of retrievedData.categories) {
  for (const product of category.products) {
    if (product.cnt > 0) {
      // Create a new grid item element
      const gridItem = document.createElement('div');
      gridItem.classList.add('grid-item'); // Add class for styling
      gridItem.innerHTML = `<b id="${product.id}">${product.name}</b>`; // Set the data for the first column

      // Append the grid item element to the grid container
      gridContainer.appendChild(gridItem);

      // Create another grid item element for the second column
      const gridItem2 = document.createElement('div');
      gridItem2.classList.add('grid-item'); // Add class for styling
      gridItem2.innerHTML = `<b id="${product.id}">-</b> <b id="${product.id}">${product.cnt}</b> <b id="${product.id}">+</b>`; // Set the data for the second column

      // Append the grid item element to the grid container
      gridContainer.appendChild(gridItem2);

      // Get the minusElement based on its id
      const minusElement =  gridItem2.querySelector('b:first-child'); 
      const plusElement =  gridItem2.querySelector('b:last-child'); 
    
      
        minusElement.addEventListener('click', () => {
        const data = JSON.parse(localStorage.getItem('dataString'));
        
        const item = data.categories.reduce((acc, category) => {
            return acc.concat(category.products);
        }, []).find(item => item.id == product.id);
        if (item.cnt > 0) {
          item.cnt--;
        const pElement = gridItem2.querySelector('b:nth-child(2)'); 
        // Change the content of the <p> element
        pElement.textContent = item.cnt;
        var retrievedCount = JSON.parse(localStorage.getItem('totalCntString'));
        retrievedCount--;
        displayCartCount(retrievedCount);

        localStorage.setItem('totalCntString', JSON.stringify(retrievedCount));
        localStorage.setItem('dataString', JSON.stringify(data));
        }
        }); 

        plusElement.addEventListener('click', () => {
          const data = JSON.parse(localStorage.getItem('dataString'));
          
          const item = data.categories.reduce((acc, category) => {
              return acc.concat(category.products);
          }, []).find(item => item.id == product.id);
          
            item.cnt++;
          const pElement = gridItem2.querySelector('b:nth-child(2)'); 
          // Change the content of the <p> element
          pElement.textContent = item.cnt;
          var retrievedCount = JSON.parse(localStorage.getItem('totalCntString'));
          retrievedCount++;
          displayCartCount(retrievedCount);
  
          localStorage.setItem('totalCntString', JSON.stringify(retrievedCount));
          localStorage.setItem('dataString', JSON.stringify(data));
          
          }); 
    }
  }
}
 
const h2Element = document.getElementById('myH3');

  // Add event listener to the h2 element
  h2Element.addEventListener('click', () => {
    // Show message
    alert('Uspješna kupnja!');

    // Remove local storage data
    localStorage.clear();

    // Redirect to a different HTML page
    window.location.href = 'index.html';
  });
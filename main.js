let productsArray = []
let selectedproduct = {}
window.onload = (event) => {

    console.log('POS');
    fetch('https://63eca9a132a08117239f4c48.mockapi.io/products/')
        .then(response => response.json())
        .then((data) => {
            productsArray = data
            console.log(data);

            let divRow = document.getElementById('rowm')
            data.forEach(element => {

                divRow.innerHTML += `
                <div class="col-4">
                <div class="card" style="width: 18rem;">
                  <img src="${element.thumbnail}" class="card-img-top" alt="${element.title} image">
                  <div class="card-body">
                    <h5 class="card-title">${element.title}</h5>
                    <p class="card-text">${element.description}</p>
                    <!-- Button trigger modal -->
                    <button type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModal">
                      Launch demo modal
                    </button>

                    <button type="button" onclick = "populateForm(${element.id})"  class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#staticBackdrop">
                    EDIT
                    </button>
                    <button type="button" onclick = "deleteProduct(${element.id})"  class="btn btn-primary">
                    DELETE
                    </button>
        
                  </div>
                </div>
              </div>
                `
            });
        })

};


function createProduct() {
    let httpmethod = ""
    let urlID = ""

    if (selectedproduct == {}) {
        httpmethod = "POST"
        urlID = "https://63eca9a132a08117239f4c48.mockapi.io/products"
    } else {
        httpmethod = "PUT"
        urlID = `https://63eca9a132a08117239f4c48.mockapi.io/products/${selectedproduct.id}`

    }

    let _title = document.getElementById('_title').value
    let _description = document.getElementById('_description').value
    let _rating = document.getElementById('_rating').value
    let _stock = document.getElementById('_stock').value
    let _brand = document.getElementById('_brand').value
    let _category = document.getElementById('_category').value
    let _thumbnail = document.getElementById('_thumbnail').value

    let createData = {
        title: _title,
        description: _description,
        rating: parseInt(_rating),
        stock: parseInt(_stock),
        brand: _brand,
        category: _category,
        thumbnail: _thumbnail
    }

    fetch(urlID, {
        method: httpmethod,
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify(createData)
    })
        .then(response => response.json())
        .then(data => console.log(data))
        .catch(error => console.log(error))

}

function populateForm(productID) {

    let prod = productsArray.find(product => product.id == productID)
    selectedproduct = prod

    document.getElementById('_title').value = selectedproduct.title
    document.getElementById('_description').value = selectedproduct.description
    document.getElementById('_rating').value = selectedproduct.rating
    document.getElementById('_stock').value = selectedproduct.stock
    document.getElementById('_brand').value = selectedproduct.brand
    document.getElementById('_category').value = selectedproduct.category
    document.getElementById('_thumbnail').value = selectedproduct.thumbnail


}
function deleteProduct(productID) {

    fetch(`https://63eca9a132a08117239f4c48.mockapi.io/products/${productID}`, {
        method: 'DELETE',
        headers: { 'content-type': 'application/json' }
    })
        .then(response => response.json())
        .then(data => console.log(data))
        .catch(error => console.log(error))

}
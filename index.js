const btnContainer = document.getElementById('btn-container');
const fetchCategories = () => {
    const url = 'https://openapi.programming-hero.com/api/videos/categories'
    fetch(url)
        .then(res => res.json())
        // const allBtn = data.data
        .then(({ data }) => {
            data.forEach((card) => {
                // console.log(card);

                const newBtn = document.createElement('button')

                newBtn.className = 'category-btn btn btn-ghost bg-slate-700 text-white'

                newBtn.innerText = card.category;
                // find id when clicking

                btnContainer.appendChild(newBtn)

                newBtn.addEventListener('click', () => {
                fetchDataCategories(card.category_id)
                const allBtns = document.querySelectorAll('.category-btn');

                for(const btn of allBtns){
                  btn.classList.remove('bg-red-500');
                }
                newBtn.classList.add('bg-red-500');
               
              })
            })
        })
}

const cardContainer = document.getElementById('card-container')

let selectedCat = 1000;
let sortView = false;
const sort = document.getElementById("sort");

sort.addEventListener('click', () =>{
  sortView = true;
  fetchDataCategories(selectedCat, sortView)
})

const fetchDataCategories = (categoryID, sortView) => {

    selectedCat = categoryID;

    fetch(`https://openapi.programming-hero.com/api/videos/category/${categoryID}`)   
        .then(res => res.json())
        .then(({ data }) => {
            // sort
            if(sortView){
              data.sort((a,b) => {
                const first = a.others.views;
                const second = b.others.views;
                const firstNum = parseFloat(first.replace("k", '')) || 0;
                const secondNum = parseFloat(second.replace("k", '')) || 0;

                return secondNum - firstNum;
              })
            }
            // clear previous data
            cardContainer.innerHTML = '';

            data.forEach((video) => {
                let verifiedBadge = "";

                if(video.authors[0].verified === true){
                  verifiedBadge = `<img class="h-5 w-5 " src="./img/Icon.png" alt="">`
                }

                console.log(video);
                const newCard = document.createElement('div');

                newCard.innerHTML = `
                <div class="card w-96 bg-base-100 shadow-xl mt-10">
                <figure><img src="${video.thumbnail}" alt="Shoes" /></figure>
                <div class="card-body">
                  <h2 class="card-title">${video.title}</h2>

                  <p>${video.authors[0].profile_picture}</p>
                  <p>${video.others.views}</p>

                  <div class="card-actions">
                    ${verifiedBadge}
                    
                  </div>
                </div>
              </div>
            `
            cardContainer.appendChild(newCard);
            
            })
        }
        )
}

fetchCategories()
fetchDataCategories(selectedCat,sortView)
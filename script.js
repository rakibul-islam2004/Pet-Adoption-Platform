// mobile menu
const menuIcon = document.getElementById('menu-icon');
const menuList = document.getElementById('menu-list');
const main = document.querySelector('main');
const nav = document.querySelector('nav');

menuIcon.addEventListener("click", () => {
if (menuList.classList.contains('hidden')) {
    menuList.classList.remove('hidden');
    menuIcon.className = "fa-solid fa-xmark"; 
} else {
    menuList.classList.add('hidden');
    menuIcon.className = "fa-solid fa-bars"; 
}
});

main.addEventListener("click", () => {
menuList.classList.add('hidden');
menuIcon.className = "fa-solid fa-bars";
});


// loader
const showLoader = () => {
    document.getElementById('leftContainer').innerHTML='';
    document.getElementById('leftContainer').classList.remove('grid');  
    const loader = document.createElement('div');
     
    loader.id = 'preLoader'; 
    loader.innerHTML=`<span class="loading loading-spinner text-info flex justify-center mx-auto w-28 h-28 py-52"></span>`;
    document.getElementById('leftContainer').appendChild(loader);
    loader.className="block";
      
};

const hideLoader = () => {
    document.getElementById('leftContainer').classList.add('grid');  
    const loader = document.getElementById('preLoader');
    loader.className="hidden";
};

// button Section
const fetchingCategories = async() => {
    const res = await fetch("https://openapi.programming-hero.com/api/peddy/categories");
    const data = await res.json();
    for(const value of data.categories) {
        createButton(value.category_icon, value.category);       
    }
}

const createButton = (icon, category) => {
    const buttons = document.getElementById('buttons');
    const button = document.createElement('button');
    button.innerHTML = `              
    <div class="col-span-1 flex justify-center items-center gap-2">
        <div><img src='${icon}' alt="" class="w-6 h-6" /></div>
        <h4>${category}</h4>
    </div>`;
    button.classList.add('btn', 'buttonStyle',`btn-${category}`,'categoryBtn');

    buttons.appendChild(button);

    button.addEventListener('click', () => {
        fetchingPetsData(category);
        activeButton(category);
    });
}

activeButton = (category) => {
    const activeBtn = document.querySelector(`.btn-${category}`);
    const categoryBtn = document.querySelectorAll(".categoryBtn");
    categoryBtn.forEach(element => {
        element.classList.remove('activeBtnBg');
    });
    activeBtn.classList.add('activeBtnBg');   
}



// Cards Section
const fetchingPetsData = async(category = '') => {
    showLoader();
    const endpoint = category ? `category/${category}` : 'pets';

    const res = await fetch(`https://openapi.programming-hero.com/api/peddy/${endpoint}`);
    const data = await res.json();
    
    setTimeout(() => {
        hideLoader();
    
    
    document.getElementById('leftContainer').innerHTML = '';

    
    if(endpoint == 'pets'){
        const pets = data.pets;        
        for(const pet of pets) {
            createCard(pet,pet.breed, pet.date_of_birth, pet.pet_name, pet.gender, pet.price,
                 pet.image,pet.vaccinated_status,pet.pet_details);
        }
    }
    else{
        const pets = data.data;
        if(pets.length == 0){
            document.getElementById('leftContainer').classList.remove('grid');
            document.getElementById('leftContainer').innerHTML = `
                <div class = "min-h-screen w-full flex flex-col gap-5 justify-center items-center px-4">
                <img src="images/error.webp" class="w-36 h-36 md:w-52 md:h-56" />
                <h2 class="text-center text-xl font-bold">No Information Available</h2>
                <p class="text-center" >It is a long established fact that a reader will be distracted by the readable content of a page when looking at 
                 its layout. The point of using Lorem Ipsum is that it has a.</p>
                <div>`;

            return;
        }
        else{
            document.getElementById('leftContainer').classList.add('grid');
        }

    
        for(const pet of pets) {
            createCard(pet,pet.breed, pet.date_of_birth, pet.pet_name, pet.gender, pet.price,
                 pet.image,pet.vaccinated_status,pet.pet_details);
            }
        }
    },2000);
    
        
}

const createCard = (pet,breed, date, petName, gender, price, image,vaccinated_status,pet_details) => {
    const cardsContainer = document.getElementById('leftContainer');
    const card = document.createElement('div');

    card.classList.add('card', 'border-2', 'border-gray-200', 'rounded-md','p-1', 'md:p-5');
    const isBreed = (breed == undefined || null) ? "Not Available" : breed ;
    const isDate = (date == undefined || null) ? "Not Available" : date.slice(0,4);
    const isGender = (gender == undefined || null) ? "Not Available" : gender ;
    const isPrice = (price == undefined || null) ? "Not Available" : price + " $" ;
    
    // Set data attributes for showDetails + Sort by value (only price)
    card.dataset.image = image;
    card.dataset.breed = isBreed;
    card.dataset.date = isDate;
    card.dataset.petName = petName;
    card.dataset.gender = isGender;
    card.dataset.image = image;
    card.dataset.price = isPrice;

    card.dataset.vaccinated = vaccinated_status ? "Vaccinated" : "Not Vaccinated";
    card.dataset.details = pet_details || "No details available";


    card.innerHTML = `
    <div class="flex flex-col pb-5 gap-2">
        <img src="${image}" alt="" class="cardImage h-40 w-full rounded-md rounded-md" />
        <h2 class="text-xl font-bold">${petName}</h2>
        <p class="flex gap-1">
            <img src="images/Frame.png" alt="" class="w-5 h-6"/>
            Breed: ${isBreed}
        </p>
        <p class="flex gap-1">
            <img src="images/Frame (1).png" alt="" class="w-5 h-6"/>Birth: ${isDate}
        </p>
        <p class="flex gap-1">
            <img src="images/Frame (2).png" alt="" class="w-5 h-6"/>Gender: ${isGender}
        </p>
        <p class="flex gap-1">
            <img src="images/Frame (3).png" alt="" />Price: ${isPrice}
        </p>
    </div>
    <hr />
    <div class="flex justify-between pt-5">
        <button class="btn p-0 likeButton">
            <img src="images/Frame 1171276314.png" alt="" class="h-[100%]" />
        </button>
        <button class="btn text-green-800 adoptButton">Adopt</button>
        <button class="btn text-green-800 detailsButton">Details</button>
    </div>`;
    cardsContainer.appendChild(card);
}

fetchingCategories();
fetchingPetsData();

// Cards Button Functionality
document.getElementById('leftContainer').addEventListener('click', (event) => {
    if (event.target.closest('.likeButton')) {
        const card = event.target.closest('.card');
        const image = card.querySelector('.cardImage');
        addImage(image.src);
    } else if (event.target.closest('.adoptButton')) {
        const card = event.target.closest('.card');
        showCongra();
        

    } else if (event.target.closest('.detailsButton')) {
        const card = event.target.closest('.card');

        // using dataset
        const image = card.dataset.image;
        const breed = card.dataset.breed;
        const date = card.dataset.date;
        const petName = card.dataset.petName;
        const gender = card.dataset.gender;
        const price = card.dataset.price;
        const vaccinated_status = card.dataset.vaccinated;
        const pet_details = card.dataset.details;

        showDetails(image,breed,date,petName,gender,price,vaccinated_status,pet_details);
    }
});

const addImage = (image) => {
    const rightContainer = document.getElementById('rightContainer');
    const imageDiv = document.createElement('div');
    imageDiv.classList.add('md:p-2','border-gray-200','border','rounded-md','h-28','md:h-32');
    imageDiv.innerHTML = `<img src="${image}" alt="" class="h-full rounded-md w-full" />`;
    rightContainer.appendChild(imageDiv)
};

const showCongra = () =>{
    const congraModal = document.getElementById('congraModal');
    const countdownElement = document.getElementById('countdown');
    let countdown = 3; 

    congraModal.showModal();

    countdownElement.innerText = countdown;

    const interval = setInterval(() => {
        countdown -= 1;
        countdownElement.innerText = countdown;

        if (countdown <= 0) {
            clearInterval(interval);  
            congraModal.close();
        }
    }, 1000);
};

const showDetails = (image,breed,date,petName,gender,price,vaccinated_status,pet_details) => {
    const detailsModal = document.getElementById('detailsModal');

    detailsModal.innerHTML = '';

    const detailsContainer = document.createElement('div');
    detailsContainer.classList.add('modal-box');

    detailsContainer.innerHTML = `      <div class="modal-content">
        <div class="flex flex-col pb-5 gap-2">
          
          <img src="${image}" alt="" class="cardImage h-48 w-full rounded-md" />
          
          <h2 class="text-xl font-bold py-2">${petName}</h2>
          <div class="flex md:gap-10">
          <div>
          <p class="flex gap-1">
            <img src="images/Frame.png" alt="" class="h-6"/>
            Breed: ${breed}
          </p>
          <p class="flex gap-1">
            <img src="images/Frame (2).png" alt="" class="h-6"/>
            Gender: ${gender}
          </p>

          <p class="flex gap-1">
            <img src="images/Frame (4).png" alt="" class="h-6" />
            Vaccinated status: ${vaccinated_status}
          </p>
         </div>
         <div>
          <p class="flex gap-1">
            <img src="images/Frame (1).png" alt="" class="h-6"/>
            Birth: ${date}
          </p>
          <p class="flex gap-1">
            <img src="images/Frame (3).png" alt="" class="h-6" />
            Price: ${price}
          </p>
         </div>
        </div>
          <hr>
          <h2 class="text-xl font-bold py-2">Details Information</h2>
          <p>${pet_details}</p>
        </div>
      </div>
      <!-- Modal Action (Button) -->
      <div class="modal-footer">
        <form method="dialog" class="w-full flex justify-center">
          <button class="btn w-full text-[#0E7A81]">Close</button>
        </form>
      </div>`

    detailsModal.appendChild(detailsContainer);

    detailsModal.showModal();
};

// Sort By Price Descending
const sortButton = document.getElementById('sortButton');
sortButton.addEventListener('click',() => sortByPrice())

const sortByPrice = () => {
    const leftContainer = document.getElementById('leftContainer');
    const cards = Array.from(document.querySelectorAll(".card"));

    cards.sort((a,b) => {
        const priceA = parseFloat(a.dataset.price);
        const priceB = parseFloat(b.dataset.price);

        return priceB- priceA;
    });

    leftContainer.innerHTML='';
    cards.forEach( (card) => leftContainer.appendChild(card));

};
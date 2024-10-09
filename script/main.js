
// fetch 4 category
const handlePetsByCategory =async ()=>{
    const response = await fetch(`https://openapi.programming-hero.com/api/peddy/categories`);
    const data = await response.json();
    
    displayByCategory( data.categories)  
}
const handleOnClickCategory =async (id, category)=>{
    // alert(`id and category clicked: ${id} - ${category}`)
    showSpiner();

    try {
        const response = await fetch(`https://openapi.programming-hero.com/api/peddy/category/${category}`);
    console.log(response)
    const data = await response.json();
    
    // all active btn will deactive when focus one button 
    deactivateAllButtons();
    
    console.log( data.data) 
    const activebtn = document.getElementById(`btn-${id}`);
    activebtn.classList.add('rounded-full', 'bg-green-100');
    activebtn.classList.remove('rounded-2xl')
    console.log(activebtn)

    displayAllPets( data.data) 
    } catch (error) {
        console.log('something wrong',error)
    }finally{
        hideSpiner();
    }
}
const deactivateAllButtons= ()=>{
    const buttons = document.getElementsByClassName('cate-btn')
    console.log(buttons)
    for(let button of buttons){
        button.classList.remove('rounded-full', 'bg-green-100')
    }
    activeAllbutton();
}
const activeAllbutton=()=>{
    const buttonActive = document.getElementsByClassName('cate-btn')
    for(let button of buttonActive){
    button.classList.add("rounded-2xl")
    }
}
// kept 4 category within div button
const displayByCategory =(categories)=>{
    const categoriesContainer = document.getElementById('categories-container')
    
    categories.forEach(item => {
        const {category, id} = item
        // console.log(item)
        const div = document.createElement('div');
        div.innerHTML=`
            <button onclick="handleOnClickCategory('${id}', '${category}')" id="btn-${id}"
                class="w-full p-2 border-2 rounded-2xl flex justify-center items-center gap-3 hover:bg-green-100 cate-btn">
                <img src="${item.category_icon}" alt="${item.category}">
                <h3 class="font-inter font-bold text-2xl">${item.category}</h3>
                </button>
        `
        categoriesContainer.appendChild(div)
    })
}

// fetched all pets/ used for modal also
const loadAllPets = async () =>{
    document.getElementById('pets-container').innerHTML = "";
    const url = (`https://openapi.programming-hero.com/api/peddy/pets`)
    showSpiner();
    setTimeout(async()=>{
    try {
        const response = await fetch(url)
        const data = await response.json()
        displayAllPets(data.pets)
    } catch (error) {
        console.error('there is something wrong here', error)
    }finally{
        hideSpiner();
    }
    }, 3000)
    // console.log(data.pets)
}
//adding spiner here
const showSpiner = ()=>{
    const spinContent = document.getElementById('spinner');
    spinContent.classList.remove('hidden');
    spinContent.classList.add('flex', 'justify-center', 'items-center', 'min-h-screen');
    const categoriesContainer = document.getElementById('pets-container');
    categoriesContainer.classList.add('hidden');
}
const hideSpiner = ()=>{
    const spinContent = document.getElementById('spinner');
    spinContent.classList.add('hidden')
    const categoriesContainer = document.getElementById('pets-container')
    categoriesContainer.classList.remove('hidden')
}
// after fatched, display all pets
const displayAllPets = async (pets)=>{
    const petsContainer = document.getElementById('pets-container');
    petsContainer.innerHTML ="";
    if(pets.length == 0){
        petsContainer.classList.remove('grid')
        petsContainer.innerHTML=`
            <div class="min-h-screen flex flex-col gap-5 justify-center items-center">
                <img src="./images/error.webp"/>
                <h3 class="font-inter font-bold text-3xl">No Information Available</h3>
                <p class="font-lato text-center">It is a long established fact that a reader will be distracted by the readable content of a page when looking at </br> 
                    its layout. The point of using Lorem Ipsum is that it has a.</p>
            </div>
        `
        return
    }else{
        petsContainer.classList.add('grid')
    }
    pets.forEach(pet => {
        // console.log(pet)
        const div = document.createElement('div');
        div.innerHTML = `
            <div class="border-2 rounded-2xl p-3">
                <!-- cards info -->
                <div class="mb-5">
                    <div class=" h-[200px]"><img class="w-full h-full rounded-2xl bg-gray-700" object-cover src="${pet.image}" alt=""></div>
                </div>
                <div>
                    <h1 class="font-inter font-bold text-xl"> ${pet.pet_name}</h1>
                    <!-- food -->
                    <div class="flex items-center gap-1">
                        <div class="flex flex-col">
                            <p class="-my-2"><i class="fa-light fa-bread-slice rounded-sm text-xs"></i><i class="fa-light fa-bread-slice rounded-sm text-xs"></i></p>
                            <p class="-my-2"><i class="fa-light fa-bread-slice rounded-sm text-xs"></i><i class="fa-light fa-bread-slice rounded-sm text-xs"></i></p>
                        </div>
                    <h3 class="font-lato">Bread: ${pet.breed ? pet.breed : 'No Info'}</h3>
                    </div>
                    <!-- birth -->
                    <div class="flex items-center gap-1 text-center">
                        <i class="fa-solid fa-calendar my-2"></i>
                        <h3 class="font-lato">Birth: ${pet.date_of_birth ? pet.date_of_birth: 'Unknown'}</h3>
                    </div>
                    <!-- gender -->
                    <div class="flex items-center gap-1 text-center">
                        <i class="fa-solid fa-person-half-dress my-2"></i>
                        <h3 class="font-lato">Gender: ${pet.gender ? pet.gender : 'Unavilable'}</h3>
                    </div>
                    <!-- price -->
                    <div class="flex items-center gap-1 text-center">
                        <i class="fa-solid fa-dollar-sign my-2"></i>
                        <h3 class="font-lato">Price: ${pet.price ? pet.price: 'Unavilable'}</h3>
                    </div>
                    <!-- divider -->
                        <div class="border-b-2 border-dashed my-5"></div>
                    <!-- card's actionable button -->
                    <div class="flex justify-center items-center gap-2 p-1">
                        <div onclick="addedLikedPet('${pet.image}')" class="border hover:btn border-slate-300 hover:border-custom-color px-5 rounded-lg py-2 cursor-pointer"  data-post='${JSON.stringify(pet)}'>
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6 text-custom-color font-bold">
                                <path stroke-linecap="round" stroke-linejoin="round" d="M6.633 10.25c.806 0 1.533-.446 2.031-1.08a9.041 9.041 0 0 1 2.861-2.4c.723-.384 1.35-.956 1.653-1.715a4.498 4.498 0 0 0 .322-1.672V2.75a.75.75 0 0 1 .75-.75 2.25 2.25 0 0 1 2.25 2.25c0 1.152-.26 2.243-.723 3.218-.266.558.107 1.282.725 1.282m0 0h3.126c1.026 0 1.945.694 2.054 1.715.045.422.068.85.068 1.285a11.95 11.95 0 0 1-2.649 7.521c-.388.482-.987.729-1.605.729H13.48c-.483 0-.964-.078-1.423-.23l-3.114-1.04a4.501 4.501 0 0 0-1.423-.23H5.904m10.598-9.75H14.25M5.904 18.5c.083.205.173.405.27.602.197.4-.078.898-.523.898h-.908c-.889 0-1.713-.518-1.972-1.368a12 12 0 0 1-.521-3.507c0-1.553.295-3.036.831-4.398C3.387 9.953 4.167 9.5 5 9.5h1.053c.472 0 .745.556.5.96a8.958 8.958 0 0 0-1.302 4.665c0 1.194.232 2.333.654 3.375Z" />
                            </svg>                                  
                        </div>
                        <div class="border border-slate-300 px-5 hover:border-custom-color rounded-lg py-2">
                            <button onclick="counterTime()" class="font-lato font-extrabold text-custom-color">Adopt</button>
                        </div>
                        <div class="border border-slate-300 hover:border-custom-color px-5 rounded-lg py-2">
                            <button onclick="loadModalDetails('${pet.petId}')" class="font-lato font-extrabold text-custom-color">Details</button>
                        </div>
                    </div>
                </div>
            </div>
        `
        petsContainer.appendChild(div)
    });

}
// sort the pet in price 
const sortInPrice= (totalPrice)=>{
    return totalPrice.sort((x, y)=>{
        const priceX = x.price ? parseFloat(x.price) : 0;
        const priceY = y.price ? parseFloat(y.price) : 0;
        const descendSort = priceY - priceX;
        console.log(descendSort)
        return descendSort;
    });
}
// sorted the pets 
const sorting =async ()=>{
    showSpiner();
    const res = await fetch('https://openapi.programming-hero.com/api/peddy/pets')
    // console.log(res)
    const data = await res.json()
    // console.log(data)
    const sortedPrice = sortInPrice(data.pets);
    const petsContainer = document.getElementById('pets-container');
    hideSpiner();
    displayAllPets(sortedPrice)
}
// after diplay all pets, onclicking pet will add right side in a tow col row
const addedLikedPet = (image)=>{
        const likedPetContainer = document.getElementById('liked-pets-container');
        const div = document.createElement('div');
        div.innerHTML = `

            <img class="w-full rounded-2xl bg-gray-700 mb-2" src="${image}" alt="">

        `
    likedPetContainer.appendChild(div)
}

const loadModalDetails=async(petId)=>{
    // console.log(petId)
    const response = await fetch(`https://openapi.programming-hero.com/api/peddy/pet/${petId}`)
    console.log(response)
    const data = await response.json()
    // console.log(data.petData)
    displayModalDetails(data.petData)
}
const displayModalDetails=(petData)=>{
    console.log(petData)
    const petDetailsContainer = document.getElementById('momdal-content');
    petDetailsContainer.innerHTML=`
         <!-- cards info -->
                <div class="mb-5">
                    <div class=" h-full"><img class="w-full h-full rounded-2xl bg-gray-700" object-cover src="${petData.image}" alt=""></div>
                </div>
                <div>
                    <h1 class="font-inter font-bold text-2xl"> ${petData.pet_name}</h1>
                  
                    <div class="flex justify-between">
                    
                        <!--left side content -->
                      <div>
                        <!-- food -->
                        <div class="flex items-center gap-1">
                        <div class="flex flex-col">
                            <p class="-my-2"><i class="fa-light fa-bread-slice rounded-sm text-xs"></i><i class="fa-light fa-bread-slice rounded-sm text-xs"></i></p>
                            <p class="-my-2"><i class="fa-light fa-bread-slice rounded-sm text-xs"></i><i class="fa-light fa-bread-slice rounded-sm text-xs"></i></p>
                        </div>
                        <h3 class="font-lato">Bread: ${petData.breed ? petData.breed : 'No Info'}</h3>
                        </div>
                        <!-- gender -->
                        <div class="flex items-center gap-1 text-center">
                            <i class="fa-solid fa-person-half-dress my-2"></i>
                            <h3 class="font-lato">Gender: ${petData.gender ? petData.gender : 'Unavilable'}</h3>
                        </div>
                        <!-- Vaccinated status -->
                        <div class="flex items-center gap-1 text-center">
                            <i class="fa-regular fa-shield-virus my-2"></i>
                            <h3 class="font-lato">Vaccinated status: ${petData.vaccinated_status ? petData.vaccinated_status : 'Unavilable'}</h3>
                        </div>
                     </div>
                        <div>
                            <!-- birth -->
                            <div class="flex items-center gap-1 text-center">
                                <i class="fa-solid fa-calendar my-2"></i>
                                <h3 class="font-lato">Birth: ${petData.date_of_birth ? petData.date_of_birth: 'Unknown'}</h3>
                            </div>
                            <!-- price -->
                            <div class="flex items-center gap-1 text-center">
                                <i class="fa-solid fa-dollar-sign my-2"></i>
                                <h3 class="font-lato">Price: ${petData.price ? petData.price: 'Unavilable'}</h3>
                            </div>
                        </div>
                    </div>
                    <!-- divider -->
                    <div class="border-b-2 border-dashed my-5"></div>
                    <div>
                        <h3 class="font-inter font-semibold">Details Information</h3>
                        <p>
                          ${petData.pet_details}
                        </p>
                    </div>

                </div>
    `
    // 1stway try to get modal
    // document.getElementById('showModalData').click();
    document.getElementById('myCustomModal').showModal();
}

const adoptModal = ()=>{
    // const adoptContent = getElementById('adopt-modal-content');
    const modalShow = document.getElementById('adoptCustomModal');
    modalShow.showModal();
}
const counterTime = ()=>{
    adoptModal();

    const counter = document.getElementById('count-down');

    let count = 3;
    counter.textContent = `${count}`;
    const intervalTime = setInterval(function(){
        count--;
        if(count>0){
            counter.textContent = `${count}`;
        }else{
            clearInterval(intervalTime);
            closeModal()
        }
    }, 1000)
}
const closeModal = ()=>{
    const modalShow = document.getElementById('adoptCustomModal');
    modalShow.close()
}
handlePetsByCategory();
loadAllPets();
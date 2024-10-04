function loadCategory(id) {
    fetch('https://openapi.programming-hero.com/api/phero-tube/categories')
        .then(res => res.json())
        .then(data => displayCategory(data.categories))
}


function activeButton(id){
    const Buttons = document.getElementsByClassName('btn-list');
    for(x of Buttons){
        x.classList.remove('bg-green-400');

    }

    document.getElementById(`btn-${id}`).classList.add('bg-green-400');
}


function loadCategoryVideos(id){
     activeButton(id);
    fetch(`https://openapi.programming-hero.com/api/phero-tube/category/${id}`)
    .then(res=>res.json())
    .then(data=>disPlayVideo(data.category))
}

function displayCategory(categories) {
    const categoryContainer = document.getElementById('categoryContainer');
    categories.forEach(category => {
        const button = document.createElement('div');
        button.innerHTML=
         `
        <button onclick="loadCategoryVideos(${category.category_id})" class="btn btn-list" id="btn-${category.category_id}">${category.category}</button>
        
        `
        ;

         categoryContainer.appendChild(button);
        
    });
}

function loadVideo() {

    fetch('https://openapi.programming-hero.com/api/phero-tube/videos')
        .then(res => res.json())
        .then(data => disPlayVideo(data.videos))
}

function disPlayVideo(videos) {
     
    if(videos.length===0){
        const videoContainer = document.getElementById('video-container');
        videoContainer.classList.remove('grid');
        videoContainer.classList.add('flex', 'justify-center');
        videoContainer.innerHTML="";
        const card = document.createElement('div');
        card.innerHTML=`
        <img src='images/Icon.png'>
        <p>No Content Here </p>
        
        `

        videoContainer.appendChild(card);
    }
   
    else{
        const videoContainer = document.getElementById('video-container');
        videoContainer.classList.add('grid');
        videoContainer.innerHTML="";

        videos.forEach(video => {
            const card = document.createElement('div');
            card.innerHTML =
        `
    <div class=" shadow-xl p-4 bg-ase-100">
      <figure class="h-[200px]">
        <img
          src="${video.thumbnail}"
          alt="Shoes" class="   object-cover" />
      </figure>
    
       <div class=" flex px-0 py-2 justify-between" >
       <div> <img src="${video.authors[0].profile_picture}" class=" w-10 h-10 rounded-full">  </div>
    
       <div> 
        <p class=" font-bold">${video.title}</p>
         <div class=" flex"> 
        <p class=" font-bold">${video.authors[0].profile_name}</P>
    
        <p>${video.authors[0].verified==true?'<img src="https://img.icons8.com/?size=48&id=D9RtvkuOe31p&format=png" class="w-5 h-5 rounded-full">':""}</P>
       </div>
    
       </div>
      
      
      
      <div>
    
     
     
      </div>
    
        `
        videoContainer.appendChild(card);
        })
    
    }
    
}

document.getElementById('search-text').addEventListener('keyup' , (e)=>{
    const Text = (e.target.value);
    console.log(Text);
    searchTitle(Text);
})


function searchTitle(Text){
    fetch(`https://openapi.programming-hero.com/api/phero-tube/videos?title=${Text}`)
    .then(res=>res.json())
    .then(data=>disPlayVideo((data.videos)))
    
    
}

loadCategory();


loadVideo();
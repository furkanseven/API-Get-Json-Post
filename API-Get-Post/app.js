const btnJSONAPI=document.getElementById('api-json');
btnJSONAPI.addEventListener('click',getJSONfromAPI);

const btnJSONekle=document.getElementById('json-veri-ekle');
btnJSONekle.addEventListener('click',JSONveriEkle);

const sonucDiv=document.getElementById('sonuc');


function getJSONfromAPI(e){
    e.preventDefault();

    fetch('https://jsonplaceholder.typicode.com/users').then(response=>response.json())
    .then(sonuc=>screenPrint(sonuc));
}

async function JSONveriEkle(e){
    e.preventDefault();

    const response = await fetch('https://jsonplaceholder.typicode.com/posts',{ //uzun surecek yapının başına await ekledik ve dönen bu değeri değişkene atadık
        method:'POST',
        body:JSON.stringify({//javascript nesnemizi JSON'a çevirdik.
            title:'EKLEDİĞİM DENEME BAŞLIK',
            body:'Eklediği body içerik alanı',
            userId:41
        }),
        headers:{'Content-Type': 'application/json'}//eklediğimiz nesnenin json oldğunu belirttrik
        
    })
    const sonuc=await response.json();//Burasıda bir promise döndüğü için await diyoruz 
    console.log(sonuc);
    //sonucDiv.innerHTML=sonuc;//respons isimli javascript objesi yolladık ekranda (((object object değerleri görürüz)))
    jsonAddScreen(sonuc);
}


function jsonAddScreen(response){
    document.querySelector('#sonuc').innerHTML=`
    <div class="title"><h2>${JSON.stringify(response.title)}</h2></div><hr>
        <div class="body"><h2>${JSON.stringify(response.body)}</h2></div><hr>
        <div class="userid"><h2>${JSON.stringify(response.userId)}</h2></div><hr>
    `
}



function screenPrint(data){
    print="";
    data.forEach(user=>{
        print+=`<li>${user.name}<br>${user.email}<hr></li>`
    });
    sonucDiv.innerHTML=print;
}
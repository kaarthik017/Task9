var h1= createElement('h1','heading','New York Today');

/*function to create navbar*/
function createNavbar(){

var nav = createElement('nav','navbar sticky-top navbar-light bg-light');
var form = createElement('form','form-inline');
var section = ['arts', 'fashion', 'food', 'health', 'home', 'insider', 'magazine', 'movies', 'nyregion', 'obituaries', 'opinion', 'realestate', 'science', 'sports', 'sundayreview', 'theater', 't-magazine', 'travel', 'upshot', 'us', 'world'];
section.forEach((article)=>{
    var button = createElement('button','btn btn-outline-success',article,article);
    button.type = "button";
    form.append(button);
    button.addEventListener('click',selectDataByButtonClick,false);
    
});

nav.append(form);
return nav;
}

/*function for selecting article type and loading data data into container*/
async function selectDataByButtonClick(event){

    try{
    var article = event.target.id;
    var url = await fetch(`https://api.nytimes.com/svc/topstories/v2/${article}.json?api-key=A4Pynlbpw0RrbBHgJ2Nc7l1qn6GOkOCn`);
    var apiUrl = await url.json();
    var result = apiUrl.results;
    
    
    var container = document.getElementById('container');
    
    var containerData = createBodycontents(result);
    if(container !== null){
    document.body.replaceChild(containerData,container);
    }else{
        document.body.append(containerData);
    }
   
    }
    catch(err){
        console.log('Data not Found');
       
    }  
};

/* load data in container class based on button click*/
function createBodycontents(result){
var container = createElement('div','container','','container');
var row = createElement('div','row no-gutters');
result.forEach((data)=>{
var col = createElement('div','col-lg-6');
var card = createElement('div','card');
var row1 = createElement('div','row no-gutters');
var col1 = createElement('div','col-md-7');
var cardBody = createElement('div','card-body');
var h6 = createElement('h6','card-title section',data.section);
var h3 = createElement('h3','card-title title',data.title);
var date = createElement('p','card-text',data.updated_date.slice(0,10));
var article = createElement('p','card-text',data.abstract);
var abstract = createElement('p','text-left',data.byline);
var link = createElement('a','card-link','Continue Reading');
link.target = "blank";
link.href = data.url;
var col2 = createElement('div','col-md-5');
var image = createElement('img','card-img');
image.src = data.multimedia[0].url;

col2.append(image);
cardBody.append(h6,h3,date,article,abstract,link);
col1.append(cardBody);
row1.append(col1,col2);
card.append(row1);
col.append(card);
row.append(col);
});
container.append(row);
return container;
};

/*initial call while loading the screen*/
var navBar = createNavbar();
document.body.append(h1,navBar);

/*function to create HTML element*/
function createElement(elem,elemclass='',content='',elemid=''){
    let element = document.createElement(elem);
    element.setAttribute('class',elemclass);
    element.setAttribute('id',elemid);
    element.innerHTML = content;
    return element;
}


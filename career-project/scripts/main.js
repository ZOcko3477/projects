/* 
Please do not touch this JS.
*/
//allows us to use different css styling when there is no JS active on the page
const bod = document.querySelector('body');
bod.classList.remove('no-js');
bod.classList.add('js');

//stores the nav and the menu link
const mainNav = document.querySelector('nav.pathway');
const menuLink = document.querySelector('.menu-link');
const btnParent = document.querySelector('.back-to-top');

//items for the intersectionObserver
const options = { };
const observer = new IntersectionObserver(showButton, options);
const careerTitle = document.querySelector('main header h2'); 

//adds an event listener to toggle the class of active on both the menu link and the main nav so that element can be "opened up" on click
menuLink.addEventListener( "click", function(){
    menuLink.classList.toggle('active');
    mainNav.classList.toggle('active');
    text = menuLink.textContent;
    //checks to see if the element has the class of active
    setTimeout( function(){
        if(menuLink.classList.contains('active')){ 
            text = text.replace("Open", "Close");    
        }else{
            text = text.replace("Close", "Open");    
        }
        menuLink.textContent = text;
    }, 2000)
 
    return false; //exits the function
})

//grabs all the anchor tags that are internal referenced by the #
const links = document.querySelectorAll('a[href^="#"]');

//modern for loop.
for (const link of links) {
//adds an event listener to each one of the internal links.
    link.addEventListener("click", clickHandler);
}

function clickHandler(e) {
  e.preventDefault();
  const href = this.getAttribute("href");
  //finding what the client height of the internal nav is important because when it is sticky the nav is sometimes out of the document flow and the element's absence must be compensated for (why the need for offset-navH)
  const navH = document.querySelector('nav#internal').clientHeight;
  let offsetTop = document.querySelector(href).offsetTop-navH;
    if(this.classList.contains('back-to-top')){
        offsetTop = document.querySelector(href).offsetTop;
    }


  scroll({
    top: offsetTop,
    behavior: "smooth"
  });
}

//intersection observer code
function showButton(entries, observer){ 
    entries.forEach(entry => {
        //if the careerTitle is visible on the page, then the scroll to top button is hidden since we are at the top.
        //so much nicer than the window scroll event listener!

        if(entry.isIntersecting){
            btnParent.classList.add("hidden");
            console.log(btnParent);
        }else{
            btnParent.classList.remove("hidden");
        }
    })

}

//tell the observer which element to observe
observer.observe(careerTitle);



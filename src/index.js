import "./styles.css";


// Select and cache the <main> element in a variable named mainEl.
const mainEl = document.querySelector('main')

// Set the background color of mainEl to the value stored in the --main-bg CSS custom property.
mainEl.style.backgroundColor = 'var(--main-bg)'

// Hint: Assign a string that uses the CSS var() function like this: 'var(--main-bg)'.
// Set the content of mainEl to <h1>DOM Manipulation</h1>. There are a variety of ways to do this; pick whichever one that you think works best in this situation.
mainEl.innerHTML = '<h1>DOM Manipulation</h1>'

// Add a class of flex-ctr to mainEl.
// Hint: Use the Element.classList API.
mainEl.classList.add('flex-ctr')




//part 2



// Select and cache the <nav id="top-menu"> element in a variable named topMenuEl.
const topMenuEl = document.querySelector('#top-menu')

// Set the height of the topMenuEl element to be 100%.
topMenuEl.style.height = '100%'

// Set the background color of topMenuEl to the value stored in the --top-menu-bg CSS custom property.
topMenuEl.style.backgroundColor = 'var(--top-menu-bg)'

//   Add a class of flex-around to topMenuEl.
topMenuEl.classList.add('flex-around')


//part 3


// Very often, you will be working with data provided by external sources in a variety of ways. For this project, copy the following data structure to the top of your index.js file; you will use it to create your menu buttons.
// "// Menu data structure

var menuLinks = [
  { text: 'about', href: '/about' },
  { text: 'catalog', href: '/catalog' },
  { text: 'orders', href: '/orders' },
  { text: 'account', href: '/account' },
];

// If this data was provided by an external source, it would allow that source to control how our menu is built. We would simply implement the logic, and allow the data to decide what displays. This is not typically done with menus, but it can be done with any DOM element.
// To continue:
// Iterate over the entire menuLinks array and for each "link" object:
// Create an <a> element.
// On the new element, add an href attribute with its value set to the href property of the "link" object.
// Set the new element's content to the value of the text property of the "link" object.
// Append the new element to the topMenuEl element.

menuLinks.forEach(function(link){
  const aEl = document.createElement('a')
  aEl.href = link.href
  aEl.textContent = link.text
  topMenuEl.appendChild(aEl)
})



// lab 316.3 part 3 creating a submenu


// Select and cache the <nav id="sub-menu"> element in a variable named subMenuEl.
const subMenuEl = document.querySelector('#sub-menu')

// Set the height subMenuEl element to be "100%".
subMenuEl.style.height = '100%'

// Set the background color of subMenuEl to the value stored in the --sub-menu-bg CSS custom property.
subMenuEl.style.backgroundColor = 'var(--sub-menu-bg)'


// Add the class of flex-around to the subMenuEl element.
subMenuEl.classList.add('flex-around')

// Set the CSS position property of subMenuEl to the value of absolute.
// Set the CSS top property of subMenuEl to the value of 0.

subMenuEl.style.position = 'absolute'
subMenuEl.style.top = '0'

// part 4

var menuLinks = [
  {text: 'about', href: '/about'},
  {text: 'catalog', href: '#', subLinks: [
    {text: 'all', href: '/catalog/all'},
    {text: 'top selling', href: '/catalog/top'},
    {text: 'search', href: '/catalog/search'},
  ]},
  {text: 'orders', href: '#' , subLinks: [
    {text: 'new', href: '/orders/new'},
    {text: 'pending', href: '/orders/pending'},
    {text: 'history', href: '/orders/history'},
  ]},
  {text: 'account', href: '#', subLinks: [
    {text: 'profile', href: '/account/profile'},
    {text: 'sign out', href: '/account/signout'},
  ]},
];



// Select and cache the all of the <a> elements inside of topMenuEl in a variable named topMenuLinks.
const topMenuLinks = document.querySelectorAll('#top-menu a')


// Attach a delegated 'click' event listener to topMenuEl.

// The first line of code of the event listener function should call the event object's preventDefault() method.
// The second line of code of the function should immediately return if the element clicked was not an <a> element.
// Log the content of the <a> to verify the handler is working.


// The event listener should add the active class to the <a> element that was clicked, unless it was already active, in which case it should remove it.
// The event listener should remove the active class from each other <a> element in topMenuLinks - whether the active class exists or not.
// Hint: Removing a non-existent class from an element does not cause an error!


// topMenuEl.addEventListener('click', function(e){
//   e.preventDefault()
//   if(e.target.tagName !== 'A') return
//   if (e.target.classList.contains('active')) {
//     e.target.classList.remove('active')
//   } else {
//     removeAllActive(topMenuLinks)
//     e.target.classList.add('active')
//   }
// })

// function removeAllActive(links){
//   links.forEach(function(link){
//     link.classList.remove('active')
//   })
// }



// part 5



// Within the event listener, if the clicked <a> element does not yet have a class of "active" (it was inactive when clicked):
// If the clicked <a> element's "link" object within menuLinks has a subLinks property (all do, except for the "link" object for ABOUT), set the CSS top property of subMenuEl to 100%.
// Otherwise, set the CSS top property of subMenuEl to 0.
// Hint: Caching the "link" object will come in handy for passing its subLinks array later.


topMenuEl.addEventListener('click', function(e){
  e.preventDefault()
  if(e.target.tagName !== 'A') return
  if (e.target.classList.contains('active')) {
    e.target.classList.remove('active')
  } else {
    removeAllActive(topMenuLinks)
    e.target.classList.add('active')
    const link = menuLinks.find(function(menuLink){
      return menuLink.text === e.target.textContent.toLowerCase()
    })
    if (link.subLinks) {
      subMenuEl.style.top = '100%'
      buildSubMenu(link.subLinks)
    } else {
      subMenuEl.style.top = '0'
      mainEl.innerHTML = `<h1>${e.target.textContent}</h1>`
    }
  }
})

function removeAllActive(links){
  links.forEach(function(link){
    link.classList.remove('active')
  })
}


// The submenu needs to be dynamic based on the clicked link. To facilitate that, we will create a helper function called buildSubmenu that does the following:

// Clear the current contents of subMenuEl.
// Iterate over the subLinks array, passed as an argument, and for each "link" object:
// Create an <a> element.
// Add an href attribute to the <a>, with the value set by the href property of the "link" object.
// Set the element's content to the value of the text property of the "link" object.
// Append the new element to the subMenuEl.

function buildSubMenu(subLinks){
  subMenuEl.textContent = '';
  subLinks.forEach((link) => {
    const aEl = document.createElement('a');
    aEl.href = link.href;
    aEl.textContent = link.text;
    subMenuEl.appendChild(aEl)
  })
}


// part 5 last part

// The submenu needs to be dynamic based on the clicked link. To facilitate that, we will create a helper function called buildSubmenu that does the following:

// Attach a delegated 'click' event listener to subMenuEl.
// The first line of code of the event listener function should call the event object's preventDefault() method.
// The second line of code within the function should immediately return if the element clicked was not an <a> element.
// Log the content of the <a> to verify the handler is working.
// Next, the event listener should set the CSS top property of subMenuEl to 0.
// Remove the active class from each <a> element in topMenuLinks.
// Update the contents of mainEl, within an <h1>, to the contents of the <a> element clicked within subMenuEl.
// If the ABOUT link is clicked, an <h1>About</h1> should be displayed.



subMenuEl.addEventListener('click', function(e){
  e.preventDefault()
  if(e.target.tagName !== 'A') return
  subMenuEl.style.top = '0';
  topMenuLinks.forEach(link => link.classList.remove('active'))
  mainEl.innerHTML = `<h1>${e.target.textContent}</h1>`
})

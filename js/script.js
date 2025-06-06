

const passwordField = document.getElementById('password');
const lengthInput = document.getElementById('length');
const form = document.getElementById('passwordForm');
const strengthLevel = document.querySelector('.strength-level');
const copiedText = document.querySelector('.copied');
const rectangles = document.getElementsByClassName('rectangle');


const checkUpper = document.getElementById("checkbox-1");
const checkLower = document.getElementById("checkbox-2");
const checkNumbers = document.getElementById("checkbox-3");
const checkSymbols = document.getElementById("checkbox-4");

const checkboxes = [checkUpper, checkLower, checkNumbers, checkSymbols];
const set1 = "ABCDEFGHIJKLMNOPQRSTUVWXYZ" ; 
const set2 = "abcdefghijklmnopqrstuvwxyz";
const set3 = "0123456789";
const set4 = "!@#$%^&*(),.?\":{}|<>";
let category = '';


strengthLevel.innerText = ''; 

function showToast(message) {
  const toast =document.querySelector('.toast');

  toast.innerText = message;
  toast.style.display = 'block';
  toast.style.opacity = '1';
  toast.style.position = 'fixed';
  toast.style.zIndex = 5;

  toast.style.left = '50%';
  toast.style.bottom = '60%';
  toast.style.transform = 'translateX(-50%)';
  

  setTimeout(() => {
    toast.style.transition = 'opacity 0.5s';
    toast.style.opacity = '0';
    setTimeout(() => {
      toast.style.display = 'none';
      toast.style.transition = '';
    }, 500);
  }, 1500);
}

document.getElementById('copyIcon').addEventListener('click', function (e) {
    navigator.clipboard.writeText(passwordField.innerText).then(() => {
       copiedText.style.display = 'block';
       copiedText.style.opacity = '1';
       setTimeout(() => {
          copiedText.style.transition = 'opacity 0.5s';
          copiedText.style.opacity = '0';
          setTimeout(() => {
             copiedText.style.display = 'none';
             copiedText.style.transition = '';
    }, 500);
  }, 1500);
     
    
    }).catch(err => {
      console.error('Error copying text:', err);
    });
});



 function countStrength(length){
    let setCount = 0;
    for (let i = 0; i < checkboxes.length; i++) {
      if (checkboxes[i].checked) {
        setCount++;
      }
    }
    if  (setCount <  1) {
      category = 'Too Weak!';
      
    } else if ((setCount === 1) && (checkNumbers.checked) && (length<= 7)){
      category = 'Too Weak!';

    } 
     else if ((setCount === 1) && (length <= 7)){
      category = 'Weak';
    }
      
    else if ((setCount > 1) && (length < 8)){
      category = 'Weak';
    }
    else if ((setCount === 1) && (length >= 8)){
      category = 'Medium';
    }
     else if ((setCount > 1) && (length >= 8)){
      category = 'Strong';
    }

    else category = '';

    return category;
  }

function generatePassword(length) {
  let password = "";
  let allowedChars = "";

  if (checkUpper.checked) {
    allowedChars += set1;
  }
  if (checkLower.checked) {
    allowedChars += set2;
  }
  if (checkNumbers.checked) {
    allowedChars += set3;
  }
  if (checkSymbols.checked) {
    allowedChars += set4;
  }

  if (allowedChars === "") {
    
    let color = '#18171F'; 
    let border = '2px solid #E6E5EA'; 
    for (let i = 0; i < rectangles.length; i++) {
      rectangles[i].style.backgroundColor = color;
      rectangles[i].style.border = border;
    }
    strengthLevel.innerText = ''; 

    showToast('Please select at least \n one character set.');
    return;
  }

  for (let i = 0; i < length; i++) {
    const randomIndex = Math.floor(Math.random() * allowedChars.length);
    password += allowedChars[randomIndex];
  }

 return password;
}

form.addEventListener('submit', function (event) {
  event.preventDefault(); 
  let lengthValue = parseInt(lengthInput.value, 10);
  
  
  let psw = generatePassword(lengthValue);

 
  
   if (!psw){
       strengthLevel.innerText = '';
       passwordField.innerText = '';
       return ;
   }
      
     
      category = countStrength(lengthValue);

      colorizeRectangles(category);
 
      strengthLevel.innerText = category;
      passwordField.innerText = psw;
}
)

function colorizeRectangles(category) {
  let numOfColored = 0;
  let color = '#18171F'; 
  let border = '2px solid #E6E5EA'; 
 
  if (category === 'Too Weak') {
    numOfColored = 1;
    color = '#F64A4A';
  } else if (category === 'Weak') {
    numOfColored = 2;
    color = '#FE7C58';
  } else if (category === 'Medium') {
    numOfColored = 3;
    color = '#F8CD65';
  } else if (category === 'Strong') {
    numOfColored = 4;
    color = '#A4FFAF';
  }

 
  for (let i = 0; i < rectangles.length; i++) {
    if (i < numOfColored) {
      rectangles[i].style.backgroundColor = color;
      rectangles[i].style.border = 'none';
    } else {
      rectangles[i].style.backgroundColor = '#18171F';
      rectangles[i].style.border = border;
    }
  }
}



  
  

  
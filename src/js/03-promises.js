import Notiflix from 'notiflix'; 
const formEl = document.querySelector('.form') 
const amountEl = document.querySelector('input[name = "amount"]') 
const delayEl = document.querySelector('input[name = "delay"]') 
const stepEl = document.querySelector('input[name = "step"]') 
 
formEl.addEventListener('submit', onFormElSubmit) 
 
function onFormElSubmit(evt) { 
  evt.preventDefault() 
   
  let amountInput = +amountEl.value 
  let delayInput = +delayEl.value 
  let stepInput = +stepEl.value 
 
  for (let i = 1; i <= amountInput; i += 1) { 
  createPromise(i, delayInput) 
  .then(({ position, delay }) => { 
   Notiflix.Notify.success(`✅ Fulfilled promise ${position} in ${delay}ms`) 
  }) 
  .catch(({ position, delay }) => { 
  Notiflix.Notify.failure(`❌ Rejected promise ${position} in ${delay}ms`) 
}) 
    delayInput += stepInput 
  } 
  } 
     
function createPromise(position, delay) { 
  return new Promise((resolve, reject) => { 
     const shouldResolve = Math.random() > 0.3; 
    setTimeout(() => { 
    if (shouldResolve) { 
    resolve({position, delay}) 
  } else { 
    reject({position, delay}) 
  } 
},delay) 
 }) 
}
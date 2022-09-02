import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import {Notify} from 'notiflix';

const refs = {
  input: document.querySelector('#datetime-picker'),
  btnStart: document.querySelector('[data-start]'),
  spanDays: document.querySelector('[data-days]'),
  spanHours: document.querySelector('[data-hours]'),
  spanMinutes: document.querySelector('[data-minutes]'),
  spanSeconds: document.querySelector('[data-seconds]'),
};

refs.btnStart.disabled = true;
const CURRENT_DAY = new Date();
let SELECTED_DAY = new Date()
let difference = null


const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {

    if (selectedDates[0] < CURRENT_DAY) {
      Notify.failure('Please choose a date in the future');
      refs.btnStart.disabled = true;
    } else {
      refs.btnStart.disabled = false;
      Notify.success('This time is right');
      
      SELECTED_DAY = selectedDates[0]
      
    }
  },
};

flatpickr(refs.input, options);
require("flatpickr/dist/themes/dark.css")

refs.btnStart.addEventListener('click', onStartBtnClick);

function onStartBtnClick() {
  refs.btnStart.disabled = true;
  refs.input.disabled = true
  timerID = setInterval(() => {
    difference = SELECTED_DAY - Date.now()
    let ccc = convertMs(difference)
    if (difference <= 0) {
      Notify.info('Your time is over');
      clearInterval(timerID);
    } else {
      addLeadingZero(ccc)
    }
}, 1000);

}

function convertMs(ms) {
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  const days = Math.floor(ms / day)
  const hours = Math.floor((ms % day) / hour)
  const minutes = Math.floor(((ms % day) % hour) / minute)
  const seconds = Math.floor((((ms % day) % hour) % minute) / second)

  return { days, hours, minutes, seconds }
}

function addLeadingZero ({ days, hours, minutes, seconds })  {

  refs.spanDays.textContent = days.toString().padStart(2, '0');
  refs.spanHours.textContent = hours.toString().padStart(2, '0');
  refs.spanMinutes.textContent = minutes.toString().padStart(2, '0');
  refs.spanSeconds.textContent = seconds.toString().padStart(2, '0');
}



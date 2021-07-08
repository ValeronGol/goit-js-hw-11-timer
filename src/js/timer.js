import timerHTML from '../templates/timer.hbs';

class CountdownTimer {
  constructor({ selector, targetDate, timerName }) {
    this.selector = selector;
    this.targetDate = targetDate;
    this.timerName = timerName;
    this.makeTimer();
    this.makeTitle();
    this.start();
  }

  makeTimer() {
    document.body.insertAdjacentHTML('afterbegin', timerHTML());
    document.querySelector('.timer').id = this.selector;
  }
  makeTitle() {
    const timer = document.getElementById(this.selector);
    const title = document.createElement('h1');
    title.textContent = this.timerName;
    timer.before(title);
  }

  start() {
    const refs = {
      days: document.querySelector('span[data-value="days"]'),
      hours: document.querySelector('span[data-value="hours"]'),
      mins: document.querySelector('span[data-value="mins"]'),
      secs: document.querySelector('span[data-value="secs"]'),
    };

    setInterval(() => {
      const deltaTime = this.targetDate - Date.now();
      const { days, hours, mins, secs } = this.getTimeComponents(deltaTime);

      refs.days.textContent = `${days}`;
      refs.hours.textContent = `${hours}`;
      refs.mins.textContent = `${mins}`;
      refs.secs.textContent = `${secs}`;
    }, 1000);
  }

  getTimeComponents(time) {
    const days = this.pad(Math.floor(time / (1000 * 60 * 60 * 24)));
    const hours = this.pad(Math.floor((time % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)));
    const mins = this.pad(Math.floor((time % (1000 * 60 * 60)) / (1000 * 60)));
    const secs = this.pad(Math.floor((time % (1000 * 60)) / 1000));
    return { days, hours, mins, secs };
  }

  pad(value) {
    return String(value).padStart(2, '0');
  }
}
const timer1 = new CountdownTimer({
  selector: '#timer-1',
  targetDate: new Date('Jul 13, 2021'),
  timerName: 'До начала отпуска осталось',
});
const timer2 = new CountdownTimer({
  selector: '#timer-2',
  targetDate: new Date('Jul 27, 2021'),
  timerName: 'До дня рождения моей бабушки осталось',
});
const timer3 = new CountdownTimer({
  selector: '#timer-3',
  targetDate: new Date('Aug 31, 2021'),
  timerName: 'До окончания лета осталось',
});

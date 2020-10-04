import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SharedService {

  constructor() { }

  public getDate = () => {
    const d = new Date();
    const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
    const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    const year = d.getFullYear();
    const date = d.getDate();
    const monthIndex = d.getMonth();
    const monthName = months[monthIndex];
    const dayIndex = d.getDay();
    const dayName = days[dayIndex];
    // const time = this.formatAMPM(d);
    // const formatted = `${time}, ${dayName}, ${date} ${monthName} ${year}`;
    const formatted = `${dayName}, ${date} ${monthName} ${year}`;
    return formatted;
  }

  getTime = () => {
    let date;
    date = new Date();
    let hours = date.getHours();
    let minutes = date.getMinutes();
    // let seconds = date.getSeconds();
    const ampm = hours >= 12 ? 'PM' : 'AM';
    hours = hours % 12;
    hours = hours ? hours : 12; // the hour '0' should be '12'
    hours = hours < 10 ? '0' + hours : hours; // the hour '0' should be '12'
    minutes = minutes < 10 ? '0' + minutes : minutes;
    // seconds = seconds < 10 ? '0' + seconds : seconds;
    const strTime = hours + ':' + minutes +  ' ' + ampm;
    return strTime;
  }


  welcomeStatus = () => {
    const d = new Date();
    const hours = d.getHours();
    if (hours >= 0 && hours < 12) {
      return 'Good Morning';
    } else if (hours >= 12 && hours < 17) {
      return 'Good Afternoon';
    } else {
      return 'Good Evening';
    }
  }

  public getCustomDateTime = (val) => {
    const d = new Date(val);
    const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
    const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    const year = d.getFullYear();
    const date = d.getDate();
    const monthIndex = d.getMonth();
    const monthName = months[monthIndex];
    const dayIndex = d.getDay();
    const dayName = days[dayIndex];
    const formatted = `${dayName}, ${date} ${monthName} ${year}`;
    return formatted;
  }

  getCustomTime = (val) => {
    let date;
    date = new Date(val);
    let hours = date.getHours();
    let minutes = date.getMinutes();
    let seconds = date.getSeconds();
    const ampm = hours >= 12 ? 'pm' : 'am';
    hours = hours % 12;
    hours = hours ? hours : 12; // the hour '0' should be '12'
    hours = hours < 10 ? '0' + hours : hours; // the hour '0' should be '12'
    minutes = minutes < 10 ? '0' + minutes : minutes;
    seconds = seconds < 10 ? '0' + seconds : seconds;
    const strTime = hours + ':' + minutes + ':' + seconds + ' ' + ampm;
    return strTime;
  }
}

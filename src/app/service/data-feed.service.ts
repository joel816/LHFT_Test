import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { io } from 'socket.io-client';
import { DataElement } from '../model/interface.model';

@Injectable({
  providedIn: 'root'
})
export class DataFeedService {

  socket: any;
  cacheElements: Array<DataElement> = [];

  constructor() { 
    this.socket = io('http://localhost:5000/elements');
  }

  fetchData() {
    return new Observable((subscriber) => {
      this.socket.on('new_data', (data) => {
        subscriber.next(data);
        // cache last 5 minutes only
        this.cacheElements = data.concat(this.cacheElements);   
        this.removeOutdatedElementFromCache();
      })
    })
  }

  stopFetchingData() {
    this.socket.emit('stop_fetch_data');
  }

  startFetchingData() {
    this.socket.emit('start_fetch_data');
  }

  updateConfig(data: any) {
    this.socket.emit('update_config', data);
  }

  getHistoryFromCache(): Array<DataElement> {
    this.removeOutdatedElementFromCache();
    return this.cacheElements;
  }

  removeOutdatedElementFromCache() {
    let lastKeptTime = new Date();
    lastKeptTime.setMinutes(lastKeptTime.getMinutes() - 5);
    this.cacheElements = this.cacheElements.filter(e => {
      return new Date(e.create_time) > lastKeptTime;
    });
  }

}

import { Invoke, Update, UpdateHandler } from "./types";

export default new class ApiWS {
  private ws = new WebSocket("ws://192.168.1.20:8080/ws");
  private _isOpen = false;
  private listeners: UpdateHandler[] = [];

  constructor() {
    this.ws.onopen = () => {
      this._isOpen = true;
      console.log("[ApiWS]: connection open succesfully");
    }

    this.ws.onmessage = (event) => {
      try {
        const data: Update = JSON.parse(event.data as string);
        console.log(data);
        
        this.listeners.forEach(callback => callback(data));
      } catch (e) {
        console.error("Error parsing JSON:", e);
      }
    }
    
    this.ws.onerror = (error) => {
      console.error("[ApiWS]: ws error:", error);
    }

    this.ws.onclose = () => {
      this._isOpen = false;
      console.log("[ApiWS]: lost connection");
    }
  }

  public onUpdate(callback: UpdateHandler) {
    this.listeners.push(callback);
  }

  public offUpdate(callback: UpdateHandler) {
    this.listeners = this.listeners.filter(cb => cb !== callback);
  }

  public invoke(data: Invoke) {
    if (!this._isOpen) {
      console.error("[ApiWS]: can not invoke method. No connection");
      return;
    }
    
    this.ws.send(JSON.stringify(data));
  }

  get isOpen() {
    return this._isOpen;
  }
}
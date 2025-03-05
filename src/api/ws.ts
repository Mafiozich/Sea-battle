import { Invoke, Update, UpdateHandler } from "./types";

export default new class ApiWS {
  private serverIp = "";
  private ws: WebSocket | null = null;
  private _isOpen = false;
  private listeners: UpdateHandler[] = [];

  constructor() {}

  public setServerIp(ip: string) {
    if (this.serverIp === ip) return;
    
    this.serverIp = ip;
    this.connect(); 
  }
  
  private connect() {
    if (this.ws) {
      this.ws.close();
      this._isOpen = false;
    }

    if (!this.serverIp) {
      console.error("[ApiWS]: Server IP not set!");
      return;
    }

    this.ws = new WebSocket(this.serverIp);

    this.ws.onopen = () => {
      this._isOpen = true;
      console.log("[ApiWS]: Connection opened successfully");
    };

    this.ws.onmessage = (event) => {
      try {
        const data: Update = JSON.parse(event.data);
        //console.log(data);
        
        this.listeners.forEach(callback => callback(data));
      } catch (e) {
        console.error("Error parsing JSON:", e);
      }
    };

    this.ws.onerror = (error) => {
      console.error("[ApiWS]: WebSocket error:", error);
    };

    this.ws.onclose = () => {
      this._isOpen = false;
      console.log("[ApiWS]: Connection closed");
    };
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
    
    if (this.ws) this.ws.send(JSON.stringify(data));
  }

  get isOpen() {
    return this._isOpen;
  }
}
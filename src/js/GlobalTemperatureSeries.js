
import temperature from '../assets/global_temperature.json'
export class GlobalTemperatureSeries {
  constructor(){
    this.temperature = temperature
    this.minYear = Math.min(...Object.keys(this.temperature))
    this.maxYear = Math.max(...Object.keys(this.temperature))
  }
  
}
export const temperature_index = 0
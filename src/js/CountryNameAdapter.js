export function convertCountryName(name) {
  switch(name){
    case "Dem. Rep. Congo":
      return "Congo"
    case "United States of America":
      return "United States"
    case "Central African Rep.":
      return "Central African Republic"
    case "S. Sudan":
      return "Central African Republic"
    case "Antarctica":
      return "French Southern And Antarctic Lands"
    case "Czechia":
      return "Czech Republic"
    default:
      return name
  }
}

const apiKey = "418ec631b2faec4e90780ea9845fb713";
const url = "https://api.openweathermap.org/data/2.5/weather";
let difKelvin = 273.15;

document.getElementById("botonBusqueda").addEventListener("click", () => {
  const ciudad = document.getElementById("ciudadEntrada").value;
  if (ciudad) {
    fectDatosClima(ciudad);
  }
});
document
  .getElementById("ciudadEntrada")
  .addEventListener("keyup", function (event) {
    // "Enter" es la tecla "Enter"
    if (event.key === "Enter") {
      // Cancela la acción predeterminada, si es necesario
      event.preventDefault();
      // Dispara el botón con un clic
      document.getElementById("botonBusqueda").click();
    }
  });

function fectDatosClima(ciudad) {
  fetch(`${url}?q=${ciudad}&appid=${apiKey}`)
    .then((response) => response.json())
    .then((response) => mostrarDatosClima(response));
}

function mostrarDatosClima(data) {
  console.log(data);
  const divDatosClima = document.getElementById("datosClima");
  divDatosClima.innerHTML = "";

  const ciudadNombre = data.name;
  const pais = data.sys.country;
  const temperatura = data.main.temp - difKelvin;
  const humedad = data.main.humidity;
  const presion = data.main.pressure;
  const velocidadViento = data.wind.speed;
  const descripcion = data.weather[0].description;
  const icono = data.weather[0].icon;
  const iconoUrl = `http://openweathermap.org/img/wn/${icono}@2x.png`;

  const ciudadTitulo = document.createElement("h2");
  ciudadTitulo.textContent = `${ciudadNombre}, ${pais}`;
  const temperaturaTitulo = document.createElement("p");
  temperaturaTitulo.textContent = `Temperatura: ${Math.floor(temperatura)}°C`;
  const humedadTitulo = document.createElement("p");
  humedadTitulo.textContent = `Humedad: ${humedad}%`;
  const presionTitulo = document.createElement("p");
  presionTitulo.textContent = `Presión: ${presion} hPa`;
  const velocidadVientoTitulo = document.createElement("p");
  velocidadVientoTitulo.textContent = `Velocidad del viento: ${velocidadViento} km/h`;
  const descripcionTitulo = document.createElement("p");
  descripcionTitulo.textContent = `Descripción: ${descripcion}`;
  const iconoImagen = document.createElement("img");
  iconoImagen.src = iconoUrl;

  divDatosClima.appendChild(ciudadTitulo);
  divDatosClima.appendChild(temperaturaTitulo);
  divDatosClima.appendChild(humedadTitulo);
  divDatosClima.appendChild(presionTitulo);
  divDatosClima.appendChild(velocidadVientoTitulo);
  divDatosClima.appendChild(descripcionTitulo);
  divDatosClima.appendChild(iconoImagen);
}

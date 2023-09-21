export const personTranslatedKeys = {
  "starships": "naves_estelares",
  "edited": "editado",
  "name": "nombre",
  "created": "creado",
  "url": "url",
  "gender": "genero",
  "vehicles": "vehiculos",
  "skin_color": "color_de_piel",
  "hair_color": "color_de_cabello",
  "height": "alto",
  "eye_color": "color_de_ojos",
  "mass": "masa",
  "films": "peliculas",
  "species": "especies",
  "homeworld": "mundo_natal",
  "birth_year": "ano_de_nacimiento"
};

export const planetTranslatedKeys = {
  "diameter": "diametro",
  "climate": "clima",
  "surface_water": "superficie_del_agua",
  "name": "nombre",
  "created": "creado",
  "url": "direccion_url",
  "rotation_period": "periodo_rotacion",
  "edited": "editado",
  "terrain": "terreno",
  "gravity": "gravedad",
  "orbital_period": "periodo_orbital",
  "films": "peliculas",
  "residents": "residentes",
  "population": "población",
};

export const vehicleTranslatedKeys = {
  "vehicle_id": "identificador_vehiculo",
  "vehicle_class": "clase_vehiculo",
  "passengers": "pasajeros",
  "pilots": "pilotos",
  "name": "nombre",
  "created": "creado",
  "url": "url",
  "cargo_capacity": "capacidad_de_carga",
  "edited": "editado",
  "consumables": "consumibles",
  "max_atmosphering_speed": "velocidad_maxima_de_atmosfera",
  "crew": "multitud",
  "length": "longitud",
  "films": "peliculas",
  "model": "modelo",
  "cost_in_credits": "coste_en_creditos",
  "manufacturer": "fabricante",
};

export function updateObjectKeys(obj: object, translatedKeys: any) {
  const data = JSON.stringify(obj);
  const mappedData = data.replace(/\"([^\"]+)\":/g, (match, name) => {
    return `"${translatedKeys[name] || name}":`;
  });
  return JSON.parse(mappedData);
}

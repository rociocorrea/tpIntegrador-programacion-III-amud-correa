//Logica para trabjar con archivos y rutas del proyecto

//necesitamos crear a mano una variable que apunte a la carpeta raiz del servidor para desde ahi apuntar a src/views (vistas) y src/public (archivos estaticos)

import { join } from "path" //nos permite unir segmentos de ruta

//construimos a mano un __dirname que apunta a la raiz del servidor

 //esto apunta a nuestro directori (src/api/utils)
const __dirname = join(import.meta.dirname, "../../../")//apunta a la raiz del servidor
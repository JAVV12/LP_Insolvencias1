/**
 * Promoción vigente.
 *
 * Se renderiza de forma estática y a propósito: el texto no depende de la fecha
 * del servidor ni del navegador, así que es predecible y no puede desincronizarse
 * entre lo que ve un visitante y lo que ve otro.
 *
 * A cambio, hay que cambiar el mes a mano al terminar septiembre. Si prefieres
 * que ruede solo, se puede hacer.
 */
export const PROMO = {
    /** Mes en que la asesoría no tiene costo. Se muestra en mayúsculas. */
    mes: "septiembre",
} as const;

/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package com.nexomarket.domain.exportacion;

import com.nexomarket.domain.catalogo.NodoCatalogo;

// ConcreteAbstraction
public class CatalogoExportable extends Exportable {
    private NodoCatalogo nodoRaiz;

    public CatalogoExportable(NodoCatalogo nodoRaiz, FormatoExportacion formato) {
        super(formato);
        this.nodoRaiz = nodoRaiz;
    }

    @Override
    public String generarReporte() {
        String datosJson = String.format("{\"categoria\": \"%s\", \"totalProductos\": %d, \"montoTotal\": %.2f}",
                nodoRaiz.obtenerNombre(), nodoRaiz.contarProductos(), nodoRaiz.obtenerPrecioTotal());
        return formato.exportar("Catálogo General de Productos", datosJson);
    }
}

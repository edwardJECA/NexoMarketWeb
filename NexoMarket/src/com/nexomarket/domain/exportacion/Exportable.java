/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package com.nexomarket.domain.exportacion;

// Abstraction
public abstract class Exportable {
    protected FormatoExportacion formato;

    public Exportable(FormatoExportacion formato) {
        this.formato = formato;
    }

    public abstract String generarReporte();
}
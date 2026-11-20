/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package com.nexomarket.domain.exportacion;

// ConcreteImplementor B
public class FormatoHTMLExport implements FormatoExportacion {
    @Override
    public String exportar(String titulo, String datosJson) {
        return "<div class=\"reporte\"><h1>" + titulo + "</h1><pre>" + datosJson + "</pre></div>";
    }
}

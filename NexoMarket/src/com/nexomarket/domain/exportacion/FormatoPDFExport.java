/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package com.nexomarket.domain.exportacion;

// ConcreteImplementor A
public class FormatoPDFExport implements FormatoExportacion {
    @Override
    public String exportar(String titulo, String datosJson) {
        return "[PDF NEXOMARKET]\nDocumento: " + titulo + "\nPayload: " + datosJson;
    }
}
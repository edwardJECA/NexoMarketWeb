/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package com.nexomarket.domain.catalogo;

import java.util.ArrayList;
import java.util.List;

// Composite
public class CategoriaComposite implements NodoCatalogo {
    private String nombre;
    private List<NodoCatalogo> hijos = new ArrayList<>();

    public CategoriaComposite(String nombre) {
        this.nombre = nombre;
    }

    public void agregar(NodoCatalogo nodo) {
        hijos.add(nodo);
    }

    @Override
    public String obtenerNombre() { return nombre; }

    @Override
    public double obtenerPrecioTotal() {
        return hijos.stream().mapToDouble(NodoCatalogo::obtenerPrecioTotal).sum();
    }

    @Override
    public int contarProductos() {
        return hijos.stream().mapToInt(NodoCatalogo::contarProductos).sum();
    }
}
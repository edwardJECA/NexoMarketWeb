/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package com.nexomarket.domain.memento;

import java.util.ArrayDeque;
import java.util.Deque;

public class HistorialPedidoCaretaker {
    private final Deque<PedidoMemento> historial = new ArrayDeque<>();

    public void guardar(PedidoMemento memento) {
        historial.push(memento);
    }

    public PedidoMemento deshacer() {
        if (historial.isEmpty()) {
            throw new IllegalStateException("No hay estados anteriores para deshacer.");
        }
        return historial.pop();
    }

    public boolean puedeDeshacer() {
        return !historial.isEmpty();
    }
}
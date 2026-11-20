/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package com.nexomarket.application.command;

import com.nexomarket.domain.memento.HistorialPedidoCaretaker;
import com.nexomarket.domain.pedido.state.Pedido;

public class PagarPedidoCommand implements Comando {
    private final Pedido pedido;
    private final HistorialPedidoCaretaker historial;

    public PagarPedidoCommand(Pedido pedido, HistorialPedidoCaretaker historial) {
        this.pedido = pedido;
        this.historial = historial;
    }

    @Override
    public void ejecutar() {
        historial.guardar(pedido.crearMemento());
        pedido.pagar();
    }

    @Override
    public void deshacer() {
        pedido.restaurar(historial.deshacer());
    }
}

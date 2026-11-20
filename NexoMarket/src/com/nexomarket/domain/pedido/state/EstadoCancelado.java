/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package com.nexomarket.domain.pedido.state;

public class EstadoCancelado implements EstadoPedido {
    @Override
    public void pagar(Pedido pedido) {
        throw new IllegalStateException("No se puede pagar un pedido CANCELADO.");
    }

    @Override
    public void enviar(Pedido pedido) {
        throw new IllegalStateException("No se puede enviar un pedido CANCELADO.");
    }

    @Override
    public void entregar(Pedido pedido) {
        throw new IllegalStateException("No se puede entregar un pedido CANCELADO.");
    }

    @Override
    public void cancelar(Pedido pedido) {
        throw new IllegalStateException("El pedido ya está CANCELADO.");
    }

    @Override
    public String getNombreEstado() {
        return "CANCELADO";
    }
}

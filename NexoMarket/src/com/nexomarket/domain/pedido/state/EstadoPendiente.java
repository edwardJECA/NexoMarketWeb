/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package com.nexomarket.domain.pedido.state;

public class EstadoPendiente implements EstadoPedido {
    @Override
    public void pagar(Pedido pedido) {
        pedido.setEstadoInterno(new EstadoPagado());
        pedido.notificarCambioEstado("Pedido pagado correctamente.");
    }

    @Override
    public void enviar(Pedido pedido) {
        throw new IllegalStateException("No se puede enviar un pedido PENDIENTE de pago.");
    }

    @Override
    public void entregar(Pedido pedido) {
        throw new IllegalStateException("No se puede entregar un pedido PENDIENTE.");
    }

    @Override
    public void cancelar(Pedido pedido) {
        pedido.setEstadoInterno(new EstadoCancelado());
        pedido.notificarCambioEstado("Pedido cancelado estando PENDIENTE.");
    }

    @Override
    public String getNombreEstado() {
        return "PENDIENTE";
    }
}
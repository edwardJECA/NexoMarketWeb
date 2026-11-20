/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package com.nexomarket.domain.pedido.state;

public class EstadoPagado implements EstadoPedido {
    @Override
    public void pagar(Pedido pedido) {
        throw new IllegalStateException("El pedido ya está PAGADO.");
    }

    @Override
    public void enviar(Pedido pedido) {
        pedido.setEstadoInterno(new EstadoEnviado());
        pedido.notificarCambioEstado("Pedido despachado a envío.");
    }

    @Override
    public void entregar(Pedido pedido) {
        throw new IllegalStateException("Debe ENVIARSE antes de marcar como ENTREGADO.");
    }

    @Override
    public void cancelar(Pedido pedido) {
        pedido.setEstadoInterno(new EstadoCancelado());
        pedido.notificarCambioEstado("Pedido PAGADO cancelado; procede reembolso.");
    }

    @Override
    public String getNombreEstado() {
        return "PAGADO";
    }
}

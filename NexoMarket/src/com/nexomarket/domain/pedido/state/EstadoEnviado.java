/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package com.nexomarket.domain.pedido.state;

public class EstadoEnviado implements EstadoPedido {
    @Override
    public void pagar(Pedido pedido) {
        throw new IllegalStateException("El pedido ya fue pagado y enviado.");
    }

    @Override
    public void enviar(Pedido pedido) {
        throw new IllegalStateException("El pedido ya está ENVIADO.");
    }

    @Override
    public void entregar(Pedido pedido) {
        pedido.setEstadoInterno(new EstadoEntregado());
        pedido.notificarCambioEstado("Pedido ENTREGADO al cliente.");
    }

    @Override
    public void cancelar(Pedido pedido) {
        throw new IllegalStateException("No se puede cancelar un pedido ya ENVIADO.");
    }

    @Override
    public String getNombreEstado() {
        return "ENVIADO";
    }
}
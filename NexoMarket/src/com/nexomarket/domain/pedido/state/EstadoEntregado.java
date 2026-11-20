/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package com.nexomarket.domain.pedido.state;

public class EstadoEntregado implements EstadoPedido {
    @Override
    public void pagar(Pedido pedido) {
        throw new IllegalStateException("El pedido ya está finalizado (ENTREGADO).");
    }

    @Override
    public void enviar(Pedido pedido) {
        throw new IllegalStateException("El pedido ya fue ENTREGADO.");
    }

    @Override
    public void entregar(Pedido pedido) {
        throw new IllegalStateException("El pedido ya está ENTREGADO.");
    }

    @Override
    public void cancelar(Pedido pedido) {
        throw new IllegalStateException("No se puede cancelar un pedido ENTREGADO.");
    }

    @Override
    public String getNombreEstado() {
        return "ENTREGADO";
    }
}
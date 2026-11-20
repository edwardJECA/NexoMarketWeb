/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package com.nexomarket.domain.memento;

import com.nexomarket.domain.pedido.state.EstadoPedido;

public class PedidoMemento {
    private final EstadoPedido estadoGuardado;
    private final double montoTotalGuardado;

    public PedidoMemento(EstadoPedido estadoGuardado, double montoTotalGuardado) {
        this.estadoGuardado = estadoGuardado;
        this.montoTotalGuardado = montoTotalGuardado;
    }

    public EstadoPedido getEstadoGuardado() {
        return estadoGuardado;
    }

    public double getMontoTotalGuardado() {
        return montoTotalGuardado;
    }
}
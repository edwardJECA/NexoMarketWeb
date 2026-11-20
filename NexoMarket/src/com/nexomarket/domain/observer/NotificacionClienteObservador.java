/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package com.nexomarket.domain.observer;

public class NotificacionClienteObservador implements ObservadorPedido {
    private final String correoCliente;

    public NotificacionClienteObservador(String correoCliente) {
        this.correoCliente = correoCliente;
    }

    @Override
    public void actualizar(String codigoPedido, String estadoNuevo, String detalle) {
        System.out.println("[EMAIL -> " + correoCliente + "] Tu pedido "
                + codigoPedido + " ahora está " + estadoNuevo + ": " + detalle);
    }
}

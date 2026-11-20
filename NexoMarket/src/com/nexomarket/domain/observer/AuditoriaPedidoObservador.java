/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package com.nexomarket.domain.observer;

public class AuditoriaPedidoObservador implements ObservadorPedido {
    @Override
    public void actualizar(String codigoPedido, String estadoNuevo, String detalle) {
        System.out.println("[AUDITORIA] Pedido " + codigoPedido
                + " -> Estado: " + estadoNuevo + " | " + detalle);
    }
}
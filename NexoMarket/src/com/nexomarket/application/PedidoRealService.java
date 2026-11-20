/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package com.nexomarket.application;

// RealSubject
class PedidoRealService implements IPedidoService {
    public PedidoRealService() {
        // Carga de recursos pesados/conexión BD
    }

    private void realizarConsultaPostgreSQL(int pedidoId) {
        System.out.println("--> [BD TypeORM/PostgreSQL] Ejecutando SELECT relacional pesado para Pedido #" + pedidoId + "...");
    }

    @Override
    public String obtenerDetallePedido(int pedidoId) {
        realizarConsultaPostgreSQL(pedidoId);
        return "Pedido #" + pedidoId + " | Cliente: 102 | Item: MacBook Pro 14 | Total: S/ 7499.90 | Estado: PREPARANDO";
    }
}

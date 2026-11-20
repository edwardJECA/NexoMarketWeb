/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package com.nexomarket.application;

// Proxy
public class PedidoServiceProxy implements IPedidoService {
    private PedidoRealService realService;
    private String rolUsuario;
    private int clienteIdAutenticado;
    private int clienteIdDuenoPedido;

    public PedidoServiceProxy(String rolUsuario, int clienteIdAutenticado, int clienteIdDuenoPedido) {
        this.rolUsuario = rolUsuario;
        this.clienteIdAutenticado = clienteIdAutenticado;
        this.clienteIdDuenoPedido = clienteIdDuenoPedido;
    }

    @Override
    public String obtenerDetallePedido(int pedidoId) {
        // 1. Protection Proxy: Control de acceso
        if ("INVITADO".equalsIgnoreCase(rolUsuario)) {
            return "[ACCESO DENEGADO] Usuarios invitados no pueden acceder a pedidos.";
        }

        if ("CLIENTE".equalsIgnoreCase(rolUsuario) && clienteIdAutenticado != clienteIdDuenoPedido) {
            return "[ACCESO DENEGADO] No tiene permisos para consultar este pedido.";
        }

        // 2. Virtual Proxy: Carga diferida (Lazy Initialization)
        if (realService == null) {
            realService = new PedidoRealService();
        }

        return realService.obtenerDetallePedido(pedidoId);
    }
}
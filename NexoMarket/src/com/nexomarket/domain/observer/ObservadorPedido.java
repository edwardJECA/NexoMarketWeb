/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package com.nexomarket.domain.observer;

public interface ObservadorPedido {
    void actualizar(String codigoPedido, String estadoNuevo, String detalle);
}
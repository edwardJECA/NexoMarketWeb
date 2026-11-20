/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package com.nexomarket.domain.pedido.state;

import com.nexomarket.domain.memento.PedidoMemento;
import com.nexomarket.domain.observer.ObservadorPedido;
import java.util.ArrayList;
import java.util.List;

public class Pedido {
    private final String codigo;
    private EstadoPedido estadoActual;
    private double montoTotal;
    private final List<ObservadorPedido> observadores = new ArrayList<>();

    public Pedido(String codigo, double montoTotal) {
        this.codigo = codigo;
        this.montoTotal = montoTotal;
        this.estadoActual = new EstadoPendiente();
    }

    public void suscribir(ObservadorPedido observador) {
        observadores.add(observador);
    }

    public void desuscribir(ObservadorPedido observador) {
        observadores.remove(observador);
    }

    void setEstadoInterno(EstadoPedido nuevoEstado) {
        this.estadoActual = nuevoEstado;
    }

    void notificarCambioEstado(String detalle) {
        String nombreEstado = estadoActual.getNombreEstado();
        for (ObservadorPedido obs : observadores) {
            obs.actualizar(codigo, nombreEstado, detalle);
        }
    }

    // Acciones delegadas al patrón State
    public void pagar() {
        estadoActual.pagar(this);
    }

    public void enviar() {
        estadoActual.enviar(this);
    }

    public void entregar() {
        estadoActual.entregar(this);
    }

    public void cancelar() {
        estadoActual.cancelar(this);
    }

    // Patrón Memento: crear y restaurar snapshot
    public PedidoMemento crearMemento() {
        return new PedidoMemento(this.estadoActual, this.montoTotal);
    }

    public void restaurar(PedidoMemento memento) {
        this.estadoActual = memento.getEstadoGuardado();
        this.montoTotal = memento.getMontoTotalGuardado();
        notificarCambioEstado("Estado restaurado mediante Memento.");
    }

    public String getCodigo() {
        return codigo;
    }

    public String getNombreEstado() {
        return estadoActual.getNombreEstado();
    }

    public double getMontoTotal() {
        return montoTotal;
    }

    public void setMontoTotal(double montoTotal) {
        this.montoTotal = montoTotal;
    }
}

/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package com.nexomarket.application.command;

import java.util.ArrayList;
import java.util.List;

public class InvocadorComandos {
    private final List<Comando> logEjecutados = new ArrayList<>();

    public void ejecutarComando(Comando comando) {
        comando.ejecutar();
        logEjecutados.add(comando);
    }

    public void deshacerUltimo() {
        if (logEjecutados.isEmpty()) {
            throw new IllegalStateException("No hay comandos ejecutados para deshacer.");
        }
        Comando ultimo = logEjecutados.remove(logEjecutados.size() - 1);
        ultimo.deshacer();
    }

    public int getTotalComandosEjecutados() {
        return logEjecutados.size();
    }
}

/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Main.java to edit this template
 */
package com.nexomarket.presentation;

import com.nexomarket.domain.catalogo.*;
import com.nexomarket.domain.exportacion.*;
import com.nexomarket.application.*;
import com.nexomarket.application.command.InvocadorComandos;
import com.nexomarket.application.command.PagarPedidoCommand;
import com.nexomarket.domain.memento.HistorialPedidoCaretaker;
import com.nexomarket.domain.observer.AuditoriaPedidoObservador;
import com.nexomarket.domain.observer.NotificacionClienteObservador;
import com.nexomarket.domain.pedido.state.Pedido;

public class Main {
    public static void main(String[] args) {
        System.out.println("==================================================");
        System.out.println("     NEXOMARKET - EJECUCIÓN EN NETBEANS          ");
        System.out.println("==================================================\n");

        // 1. CONSTRUCCIÓN DEL CATÁLOGOS (COMPOSITE)
        CategoriaComposite tecnologia = new CategoriaComposite("Tecnología");
        tecnologia.agregar(new ProductoHoja("Laptop Lenovo", 2399.00));
        tecnologia.agregar(new ProductoHoja("MacBook Pro 14", 7499.90));

        // 2. PRUEBA DEL PATRÓN BRIDGE
        System.out.println("--- DEMOSTRACIÓN PATRÓN BRIDGE ---");
        Exportable exportadorPDF = new CatalogoExportable(tecnologia, new FormatoPDFExport());
        Exportable exportadorHTML = new CatalogoExportable(tecnologia, new FormatoHTMLExport());

        System.out.println(exportadorPDF.generarReporte());
        System.out.println();
        System.out.println(exportadorHTML.generarReporte());

        // 3. PRUEBA DEL PATRÓN PROXY
        System.out.println("\n--- DEMOSTRACIÓN PATRÓN PROXY ---");
        
        System.out.println("\n[Prueba 1: Acceso como INVITADO]");
        IPedidoService proxyInvitado = new PedidoServiceProxy("INVITADO", 0, 102);
        System.out.println(proxyInvitado.obtenerDetallePedido(5001));

        System.out.println("\n[Prueba 2: Acceso como ADMIN (Carga Diferida a BD)]");
        IPedidoService proxyAdmin = new PedidoServiceProxy("ADMIN", 1, 102);
        System.out.println(proxyAdmin.obtenerDetallePedido(5001));
        
        // 4. DEMOSTRACIÓN PATRONES DE COMPORTAMIENTO (STATE, OBSERVER, COMMAND Y MEMENTO)
        System.out.println("\n--- DEMOSTRACIÓN STATE + OBSERVER + COMMAND + MEMENTO ---");

        Pedido pedido = new Pedido("PED-5001", tecnologia.obtenerPrecioTotal());
        pedido.suscribir(new AuditoriaPedidoObservador());
        pedido.suscribir(new NotificacionClienteObservador("cliente@nexomarket.pe"));

        HistorialPedidoCaretaker historial = new HistorialPedidoCaretaker();
        InvocadorComandos invocador = new InvocadorComandos();

        System.out.println("Estado inicial: " + pedido.getNombreEstado());

        // Ejecuta Command -> cambia State (PENDIENTE -> PAGADO) y dispara Observer
        invocador.ejecutarComando(new PagarPedidoCommand(pedido, historial));
        System.out.println("Estado después de pagar: " + pedido.getNombreEstado());

        // Intento de transición inválida según State (ejemplo: enviar sin haber pasado por flujo válido o verificar estado)
        try {
            pedido.entregar();
        } catch (IllegalStateException ex) {
            System.out.println("[Validación State] " + ex.getMessage());
        }

        // Deshace con Command + Memento -> restaura estado anterior y notifica a Observer
        invocador.deshacerUltimo();
        System.out.println("Estado tras deshacer (Memento): " + pedido.getNombreEstado());
    }
}
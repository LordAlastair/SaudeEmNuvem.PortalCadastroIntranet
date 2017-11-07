import { Injectable, NgZone, OnInit } from '@angular/core';

import { Paciente } from '../_models/paciente';
import { PouchDBService } from '../_services/pouchdb.service';

const uuidv4 = require('uuid/v4');

@Injectable()
export class PacienteService implements OnInit {
    private pacientes;

    constructor(private database: PouchDBService, private zone: NgZone) {
        // this.pacientes = JSON.parse(localStorage.getItem('pacientes') || '[]');
    }

    public ngOnInit() {
        // this.database.sync('http://localhost:4984/portalsus');
        // this.database.getChangeListener().subscribe(data => {
        //     for (let i = 0; i < data.change.docs.length; i++) {
        //         this.zone.run(() => {
        //             this.pacientes.push(data.change.docs[i]);
        //         });
        //     }
        // });
        // this.database.fetch().then(result => {
        //     this.pacientes = [];
        //     for (let i = 0; i < result.rows.length; i++) {
        //         this.pacientes.push(result.rows[i].doc);
        //     }
        // }, error => {
        //     console.error(error);
        // });
    }
    /**
     * Retorna uma lista com todos os pacientes sync com a base e armazenados no indexDb
     * @returns {Promise<any>}
     * @memberof PacienteService
     */
    buscarTodos(): Promise<any> {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                resolve(this.database.fetch());
            }, 500);
        });
    }

    /**
     * Retorna o registro do paciente encontrado, se não retorna o error
     * @param {string} codigo required
     * @returns {Promise<any[]>}
     * @memberof PacienteService
     */
    buscarPorCodigo(codigo: string): Promise<any[]> {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                resolve(this.database.get(codigo));
            }, 500);
        });
    }


    /**
     * Este metodo salva um novo paciente no sistema;
     * @param {Paciente} paciente
     * @returns {Promise<any>}
     * @memberof PacienteService
     */
    cadastrarPaciente(paciente: Paciente): Promise<any> {
        paciente.codigo = uuidv4();
        paciente.cns = this.geradorCNSValido();

        return new Promise((resolve, reject) => {
            setTimeout(() => {
                resolve(this.database.put(paciente.codigo, paciente));
            }, 500);
        });
    }

    atualizarPaciente(paciente: Paciente) {

    }

    // // create(paciente) {
    // //     paciente.codigo = this.geradorCNSValido();
    // //     this.pacientes.push(paciente);
    // //     this.salvarDadosLocalStore();
    // // }

    // salvarDadosLocalStore() {
    //     localStorage.setItem('pacientes', JSON.stringify(this.pacientes));
    // }

    private geradorCNSValido() {
        let gera0 = Math.floor((Math.random() * 3) + 1);

        if (gera0 === 3) {
            gera0 = Math.floor((Math.random() * 3) + 7);
        }

        const gera1 = Math.floor((Math.random() * 99999) + 1);
        const gera2 = Math.floor((Math.random() * 99999) + 1);

        let cns = gera0 + ('0' + gera1).slice(-5) + ('0' + gera2).slice(-5);
        let soma = (((Number(cns.substring(0, 1))) * 15) +
            ((Number(cns.substring(1, 2))) * 14) +
            ((Number(cns.substring(2, 3))) * 13) +
            ((Number(cns.substring(3, 4))) * 12) +
            ((Number(cns.substring(4, 5))) * 11) +
            ((Number(cns.substring(5, 6))) * 10) +
            ((Number(cns.substring(6, 7))) * 9) +
            ((Number(cns.substring(7, 8))) * 8) +
            ((Number(cns.substring(8, 9))) * 7) +
            ((Number(cns.substring(9, 10))) * 6) +
            ((Number(cns.substring(10, 11))) * 5));

        let resto = soma % 11;
        let dv = 11 - resto;

        dv = (dv === 11) ? 0 : dv;

        if (dv === 10) {
            soma = (((Number(cns.substring(0, 1))) * 15) +
                ((Number(cns.substring(1, 2))) * 14) +
                ((Number(cns.substring(2, 3))) * 13) +
                ((Number(cns.substring(3, 4))) * 12) +
                ((Number(cns.substring(4, 5))) * 11) +
                ((Number(cns.substring(5, 6))) * 10) +
                ((Number(cns.substring(6, 7))) * 9) +
                ((Number(cns.substring(7, 8))) * 8) +
                ((Number(cns.substring(8, 9))) * 7) +
                ((Number(cns.substring(9, 10))) * 6) +
                ((Number(cns.substring(10, 11))) * 5) + 2);

            resto = soma % 11;
            dv = 11 - resto;
            cns += '001' + String(dv);
        } else {
            cns += '000' + String(dv);
        }
        return cns;
    }
}

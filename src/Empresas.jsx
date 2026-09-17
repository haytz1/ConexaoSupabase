import { useEffect, useState } from "react";
import { supabase } from "./supabase";
import "./Empresas.css";

function Empresas() {

    const [empresas, setEmpresas] = useState([])

    const [funcionarios, setFuncionarios] = useState([])

    async function buscaFuncionarios(){

        const {error,data} = await supabase.from('funcionarios').select('*,empresas(nome,endereco)') // o * serve para puxar tudo da lista funcionarios e depois do uma , e chamo a outra tabela abro parenteses e falo oq irei puxar dela
        console.log(data)
        setFuncionarios(data)

    }

    async function buscaTodasEmpresas(){

        const {error,data} = await supabase.from('empresas').select()
        console.log(data)
        setEmpresas(data)
    }

    useEffect( ()=>{
        buscaTodasEmpresas()
        buscaFuncionarios()
    }, [] )

    return (
        <div >

            <div className="empresas-header">
                <h1>Relacionamento de Tabelas</h1>
                <p>Consulta na tabela empresas e funcionários</p>
            </div>


            <h2>Empresas</h2>

            <div className="tabela-card">
                <table className="empresas-table">
                    
                        <tr>
                            <th>ID</th>
                            <th>Nome</th>
                            <th>CNPJ</th>
                            <th>Endereço</th>
                        </tr>

                        {
                            empresas.map( i => 
                            <tr>

                                <td>{i.id}</td>
                                <td>{i.nome}</td>
                                <td>{i.cnpj}</td>
                                <td>{i.endereco}</td>

                            </tr>
                            )
                        }

                </table>
            </div>

            <h2>Funcionarios</h2>

            <div >
                <table >
                    
                        <tr>
                            <th>ID</th>
                            <th>Nome</th>
                            <th>Nome Da Empresa </th>
                            <th>Endereço Da Empresa</th>
                            <th>Cargo</th>
                            <th>Contato</th>
                        </tr>

                        {
                            funcionarios.map( i => 
                            <tr>

                                <td>{i.id}</td>
                                <td>{i.nome}</td>
                                <td>{i.empresas.nome}</td>
                                <td>{i.empresas.endereco}</td>
                                <td>{i.cargo == 0 ? 'Adiministrador' : 'Funcionario Comum' }</td>
                                <td>{i.contato}</td>

                            </tr>
                            )
                        }

                </table>
            </div>

        </div>
    );
}

export default Empresas;

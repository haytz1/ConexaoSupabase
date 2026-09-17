import { useEffect, useState } from "react";
import { supabase } from "./supabase";
import "./Empresas.css";

function Empresas() {

    const [empresas, setEmpresas] = useState([])

    const [funcionarios, setFuncionarios] = useState([])

    const [showFuncionarios, setShowFuncionarios] = useState(false)

    const [showEmpresas, setShowEmpresas] = useState(true)

    const [showModal, setShowModal] = useState(false)

    async function buscaFuncionarios(){

        const {error,data} = await supabase.from('funcionarios').select('*,empresas(*)') // o * serve para puxar tudo da lista funcionarios e depois do uma , e chamo a outra tabela abro parenteses e falo oq irei puxar dela
        console.log(data)
        setFuncionarios(data)

    }

    async function buscaTodasEmpresas(){

        const {error,data} = await supabase.from('empresas').select()
        console.log(data)
        setEmpresas(data)
    }

    async function buscaFuncionarioPorEmpresa(id_empresa){

        const {error,data} = await supabase.from('funcionarios').select('*,empresas(*)').eq('id_empresa', id_empresa )
        console.log(data)
        setFuncionarios(data)

        alterarVisualizaçao()
    }

    function alterarVisualizaçao(){

        if(showEmpresas == true){
            setShowEmpresas(false)
            setShowFuncionarios(true)
        } else {
            setShowEmpresas(true)
            setShowFuncionarios(false)
        }

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

            {   
                showEmpresas == true ?
                    <div className="tabela-card">
                        <h2>Empresas</h2>
                        <table className="empresas-table">
                            
                                <tr>
                                    <th>ID</th>
                                    <th>Nome</th>
                                    <th>CNPJ</th>
                                    <th>Endereço</th>
                                    <th>Ações</th>
                                </tr>

                                {
                                    empresas.map( i => 
                                    <tr>

                                        <td>{i.id}</td>
                                        <td>{i.nome}</td>
                                        <td>{i.cnpj}</td>
                                        <td>{i.endereco}</td>
                                        <td><button onClick={ ()=> buscaFuncionarioPorEmpresa(i.id) } >Ver Funcionarios</button></td>

                                    </tr>
                                    )
                                }

                        </table>
                    </div>
                :
                    <></>
            }


            {
                showFuncionarios == true ?
                    <div>
                        <button onClick={alterarVisualizaçao} >Voltar</button>
                        <br/><br/>
                        <button onClick={()=> setShowModal(true)} >Adicionar Novo</button>
                        <br/><br/><br/>
                        <h2>Funcionarios</h2>
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
                :
                    <></>
            }


            {
                showModal == true ?
                    <div>
                        <div onClick={()=> setShowModal(false)} className='fundopreto' ></div>
                        <div className='modal' >
                            <h2>Novo funcionario</h2>
                            <input placeholder="Nome" />
                            <input placeholder="Contato" />
                            <select>
                                <option value='1' >Funcionario Comum</option>
                                <option value='0' >Administrador</option>
                            </select>
                            <div className="modal-botoes" >
                                <button className="btn-salvar"  >Cadastrar Funcionario</button>
                                <button className="btn-cancelar" onClick={()=> setShowModal(false)} >Cancelar</button>
                            </div>
                        </div>
                    </div>
                :
                    <></>
            }






        </div>
    );
}

export default Empresas;

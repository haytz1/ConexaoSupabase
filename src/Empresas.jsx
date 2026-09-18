import { useEffect, useState } from "react";
import { supabase } from "./supabase";
import "./Empresas.css";

function Empresas() {

    const [empresas, setEmpresas] = useState([])

    const [funcionarios, setFuncionarios] = useState([])

    const [showFuncionarios, setShowFuncionarios] = useState(false)

    const [showEmpresas, setShowEmpresas] = useState(true)

    const [showModal, setShowModal] = useState(false)

    const [idEmpresa, setIdEmpresa] = useState("")
    const [ nome, setNome ] = useState('')
    const [ contato, setContato ] = useState('')
    const [ cargo, setCargo ] = useState('1')

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
        setIdEmpresa(id_empresa)

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

    async function inserirFuncionario(){

        const obj = {
            id_empresa: parseInt(idEmpresa),
            nome: nome,
            contato: contato,
            cargo: parseInt(cargo)
        }

        const {error} = await supabase.from('funcionarios').insert(obj)

        if (error == null){
            alert('Funcionario cadastrado com sucesso')
            setShowModal(false)
            buscaFuncionarioPorEmpresa(idEmpresa)
        } else {
            alert('Tem algo errado')
            return
        }

    }

    useEffect( ()=>{
        buscaTodasEmpresas()
        buscaFuncionarios()
    }, [] )

    return (
        <>

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
                                        <td><button onClick={ ()=>{buscaFuncionarioPorEmpresa(i.id); alterarVisualizaçao()}  } >Ver Funcionarios</button></td>

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
                        <button onClick={ ()=>{alterarVisualizaçao(); setIdEmpresa(" ") }} > Voltar</button>
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
                    <>
                        <div onClick={()=> setShowModal(false)} className='fundopreto' ></div>
                        <div className='modal' >
                            <h2>Novo funcionario</h2>
                            <input onChange={e => setNome(e.target.value)} placeholder="Nome" />
                            <input onChange={e => setContato(e.target.value)} placeholder="Contato" />
                            <select onChange={e => setCargo(e.target.value)}>
                                <option value='1' >Funcionario Comum</option>
                                <option value='0' >Administrador</option>
                            </select>
                            <div className="modal-botoes" >
                                <button className="btn-salvar" onClick={inserirFuncionario} >Cadastrar Funcionario</button>
                                <button className="btn-cancelar" onClick={()=> setShowModal(false)} >Cancelar</button>
                            </div>
                        </div>
                    </>
                :
                    <></>
            }






        </>
    );
}

export default Empresas;

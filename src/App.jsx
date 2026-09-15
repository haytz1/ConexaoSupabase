import { supabase } from './supabase'
import { useEffect, useState } from 'react'
import './app.css'

function App() {

    const[produtos, setProdutos] = useState([])

    const[nome, setNome] = useState("")
    const[preco, setPreco] = useState("")
    const[tamanho, setTamanho] = useState("")
    const[descricao, setDescricao] = useState("")

    async function buscaTodos(){
        const {data, error} = await supabase.from('produtos').select().order('id', {ascending: false }) // esse order serve para mudar a ordem de exibiçao ou seja agora esta mostrando os mais recenes adicionados em primeiro
        console.log(data)
        setProdutos(data)
    }

    async function inserir(){

        const capa = {
            nome: nome,
            preco: preco,
            tamanho: tamanho,
            descricao: descricao,
        }
        const {data, error} = await supabase.from('produtos').insert(capa)
        document.location.reload()
    
    }

    useEffect( ()=> {
        buscaTodos()
    }, [] )

    return (

        <div>

            <h1>Conexao com o SupaBase</h1>

            <input onChange={e => setNome(e.target.value)} placeholder='Nome do Produto' />
            <br/><br/>
            <input onChange={e => setPreco(e.target.value)} placeholder='Preço' />
            <br/><br/>
            <input onChange={e => setTamanho(e.target.value)} placeholder='Tamanho' />
            <br/><br/>
            <input onChange={e => setDescricao(e.target.value)} placeholder='Descriçao(opcional)' />
            <br/><br/>
            <button onClick={inserir} >Enviar</button>

            { 

              produtos.map( i => <p>
                {i.nome},
                tamanho: { i.tamanho } -
                R$ { i.preco } |
                Descriçao: {i.descricao}
            </p> )

            }

        </div>

    )
}

export default App

import {useEffect, useState} from "react"
import cardapio from './itens.json'; 
import Item from './Item';
import styles from './Itens.module.scss';

interface props{
  busca:string,
  filtro:number | null,
  ordenador:string
}
export default function Itens(props:props ) {
  const [lista, setLista] = useState(cardapio)
  const {busca, filtro, ordenador} = props

  function testaFiltro(id:number){
    if(filtro === null) return true
    return id === filtro
  }
  function testaBusca(title:string){
    if(!busca) return true
    const regex = new RegExp(busca, "i")
    return regex.test(title)
  }
function ordenarNovaLista(novaLista: typeof cardapio){
    const ordem = setOrdem(ordenador)
    if(!ordem)return novaLista

    return novaLista.sort((a, b)=> a[ordem] > b[ordem] ? 1 : -1)
}
  useEffect(()=>{
    const novaLista = cardapio.filter(item => testaBusca(item.title) && testaFiltro(item.category.id))
    setLista(ordenarNovaLista(novaLista))
  },[busca, filtro, ordenador])

function setOrdem(ordenador:string){
  switch(ordenador){
    case "porcao":
      return "size"
    case "qtd_pessoas":
      return "serving"
    case "preco":
      return "price"
    default:
      return ""
  }
}

  return (
    <div className={styles.itens}>
      {lista.map(item => (
        <Item key={item.id} {...item} />
      ))}
    </div>
  )
}
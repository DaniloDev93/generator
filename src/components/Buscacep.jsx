import './style/buscacep.sass'
import { BiSearchAlt } from 'react-icons/bi'
import { useState } from 'react'

import api from '../service/api'

const Buscacep = () => {

    const [input, setInput] = useState("");
    const [cep, setCep] = useState({});

    const buscandoCep = async() => { // utilizando o async por trabalhar com uma API externa podendo demorar a requisição.
        if (input === "" || input === null) { // validação!
            alert("preencha o campo input")
            return;
        } try {
            const response = await api.get(`${input}/json`);
            setCep(response.data); // passando os dados vindos da API para useState setCep
            setInput("")
            console.log(response.data);
        } catch (error) {
            alert("erro ao buscar");
        }
    }

    return(
        <>
            <div id="container">
                <h1>Buscador CEP</h1>

                <div id="container-input">
                    <input type="text" placeholder='Digite o cep...' value={input}
                    onChange={(e) => setInput(e.target.value)}/>
                    <button onClick={buscandoCep} className='btnSearch'><BiSearchAlt size={25}/></button>
                </div>

                
                {Object.keys(cep).length > 0 && (
                    // acima, acesso o useState CEP e verifico se ele é > 0, caso o usuário digite algum CEP,
                    // este bloco aparecerá com os dados vindos da API.
                    <main className='main'>
                        <h2>CEP: {cep.cep}</h2>
                        <span>Rua: {cep.logradouro}</span>
                        <span>Cidade: {cep.localidade}</span>
                        <span>Bairro: {cep.bairro}</span>
                        <span>Estado: {cep.uf}</span>
                    </main> 
                )}
                
            </div>
        </>
    )
}

export default Buscacep;
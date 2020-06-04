import React from 'react'
import {Link} from 'react-router-dom'

import './styles.css'

import logo from '../../assets/logo.svg'
import {FiArrowLeft} from 'react-icons/fi'

const CreatePoint = ()=>{
    return(
        <div id="page-create-point">
            <header>
                <img src={logo} alt=""/>
            <Link to="/">
                <FiArrowLeft />
                Voltar para home
            </Link>
            </header>

            <form action="">
                <h1>
                    Cadastro do<br/>ponto de coleta
                </h1>

                <fieldset>
                    <legend>
                        <h2>Dados</h2>
                    </legend>

                    <div className="field">
                        <label htmlFor="name">Nome da entidade</label>
                        <input
                            type="text"
                            name="name"
                            id="name"
                        />
                    </div>

                    <div className="field-group">
                        <div className="field">
                            <label htmlFor="email">Email</label>
                            <input
                                type="email"
                                name="email"
                                id="email"
                            />
                        </div>
                        <div className="field">
                            <label htmlFor="whatsapp">Whatsapp</label>
                            <input
                                type="text"
                                name="whatsapp"
                                id="whatsapp"
                            />
                        </div>
                    </div>


                    <legend>
                        <h2>Endereço</h2>
                        <span>Selecione o endereço abaixo</span>
                    </legend>
                    <div className="filed-group">
                        <div className="field">
                            <label htmlFor="uf">Estado (UF)</label>
                            <select name="uf" id="uf">
                                <option value="0">Selecione uma UF</option>
                            </select>
                        </div>
                    </div>
                    <div className="filed-group">
                        <div className="field">
                            <label htmlFor="cidade">Cidade</label>
                            <select name="cidade" id="cidade">
                                <option value="0">Selecione uma cidade</option>
                            </select>
                        </div>
                    </div>


                    <legend>
                        <h2>Ítens de coleta</h2>
                        <span>Selecione um ou mis ítens abaixo</span>
                    </legend>
                    <ul className="items-grid">
                        <li>
                            <img src="http://localhost:5252/uploads/eletronicos.svg" alt="Test"/>
                            <span>Eletrônicos</span>
                        </li>
                        <li className="selected">
                            <img src="http://localhost:5252/uploads/eletronicos.svg" alt="Test"/>
                            <span>Eletrônicos</span>
                        </li>
                        <li>
                            <img src="http://localhost:5252/uploads/eletronicos.svg" alt="Test"/>
                            <span>Eletrônicos</span>
                        </li>
                        <li>
                            <img src="http://localhost:5252/uploads/eletronicos.svg" alt="Test"/>
                            <span>Eletrônicos</span>
                        </li>
                        <li>
                            <img src="http://localhost:5252/uploads/eletronicos.svg" alt="Test"/>
                            <span>Eletrônicos</span>
                        </li>
                        <li>
                            <img src="http://localhost:5252/uploads/eletronicos.svg" alt="Test"/>
                            <span>Eletrônicos</span>
                        </li> 
                    </ul>
                </fieldset>

                <button type="submit">
                    Cadastrar ponto de coleta
                </button>

            </form>
            
        </div>
    )
}

export default CreatePoint
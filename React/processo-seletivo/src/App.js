import { Component } from 'react';

class App extends Component{
  constructor(props){
    super(props);
    this.state = {
      listaRepositorios : [],
      usuario : ''
    }
  }

  salvarNome = async (event) => {
    await this.setState({ usuario : event.target.value })

    console.log(this.state.usuario)
  }

  listarOrdem = () => {
    this.state.listaRepositorios.sort(function(a, b) {
      var keyA = new Date(a.updated_at),
        keyB = new Date(b.updated_at);
      // Compare the 2 dates
      if (keyA < keyB) return -1;
      if (keyA > keyB) return 1;
      return 0;
    });
  }

  buscarRepositorios = (event) => {
    event.preventDefault()
    
    console.log('O Brasil tá lascado!')

    fetch('https://api.github.com/users/' + this.state.usuario + '/repos',{
      method : 'GET'
    })

    .then(resposta => resposta.json())

    .then(dados => this.setState({ listaRepositorios : dados }))

    .then(this.listarOrdem)

    // .then(dados => this.setState({ listaRepositorios : this.state.listaRepositorios.created_at.sort((a,b) => b-a)}))

    .catch(erro => console.log(erro))
  }

  render(){
    return(
        <div>
            <main>
                <section>
                    {/* Lista de tipos de eventos */}
                    <h2>Lista de Repositórios</h2>
                    <table>
                        <thead>
                            <tr>
                                <th>#</th> {/* IDs */}
                                <th>Nome</th>
                                <th>Descrição</th>
                                <th>Data de Criação</th>
                                <th>Tamanho</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                this.state.listaRepositorios.slice(0, 10).map( (repositorio) => {
                                    return (
                                        <tr key={repositorio.id}>
                                            <td>{repositorio.id}</td>
                                            <td>{repositorio.name}</td>
                                            <td>{repositorio.description}</td>
                                            <td>{repositorio.created_at}</td>
                                            <td>{repositorio.size}</td>
                                        </tr>
                                    )
                                } )
                            }
                        </tbody>
                    </table>
                </section>

                <section>
                    {/* Cadastro de tipo de evento */}
                    <h2>Nome do usuário a ser buscado</h2>

                    <form onSubmit={this.buscarRepositorios}>
                        <div>
                            <input 
                                type="text"
                                value={this.state.usuario}
                                onChange={this.salvarNome}
                                placeholder="Nome do Usuário"
                            />
                            <button type="submit">Enviar</button>
                        </div>
                    </form>
                </section>
            </main>
        </div>
    )
  }
}


export default App;
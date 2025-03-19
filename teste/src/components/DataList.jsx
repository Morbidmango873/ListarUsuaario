import {useEffect, useState} from "react"
import'./../App.css';

export default function DataList(props){

    const [data, setData] = useState([]);

    useEffect (() => {
      console.log("data alterada");
      console.log(data);
    }, [data]);

    useEffect (() => {
      fetch("http://localhost:8800/")
      .then(response => response.json())
      .then(data => setData(data));
    }, []);

    return(
      
        <div>
          <div className="Header"> <h1 className="titulo">Lista de Usuarios</h1></div>
            <div className="Listas">
              <ul className="App-list">
                  {data.map((user) => (
                      <li>
                          {user.usuarios}
                          
                          <button onClick = {() => props.clicked(user)}  className="list-button">Ver Mais</button>
                          
                      </li>
                  ))}
              </ul>
            </div>
        </div>
    )
}


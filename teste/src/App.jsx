import { useState } from "react";
import DataList from "./components/DataList";

export default function App(){
  const [isModalOpen,setIsmodalOpen] = useState(false);
  const [userClicked,setUserClicked] = useState(null);




  function clicked(user){
    console.log("Clicou", user);
    setUserClicked(user);
    setIsmodalOpen(true);

  }

  function close(user){
    console.log("Clicou", user);
    setUserClicked(null);
    setIsmodalOpen(false);

  }


  return(
    <div>
      <DataList clicked={clicked}></DataList>
      {isModalOpen && <div ckassName="modal">modal
        <h5>{userClicked.name}</h5>
        <button onClick={close}>Fechar</button>
        </div>
      }
    </div>
  )
}
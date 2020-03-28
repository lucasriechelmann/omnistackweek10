import React from 'react';

import './styles.css';

function DevItem({ dev, onDelete }){
    let id = dev._id;
    function handleDelete(){
        onDelete(id);
    }
    return(
        <li className="dev-item">
            <header>
                <img src={dev.avatar_url} alt={dev.name}/>
                <div className="user-info">
                    <strong>{dev.name}</strong>
                    <span>{dev.techs.join(', ')}</span>
                </div>
                <button onClick={handleDelete} className="btn-delete">X</button>
            </header>
            <p>{dev.bio}</p>
            <a href={`https://github.com/${dev.github_username}`}>Acessar perfil no github</a>            
        </li>
    );
};

export default DevItem;
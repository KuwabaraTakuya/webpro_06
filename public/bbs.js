"use strict";

let number=0;
const bbs = document.querySelector('#bbs');
document.querySelector('#post').addEventListener('click', () => {
    const name = document.querySelector('#name').value;
    const message = document.querySelector('#message').value;

    const params = {  // URL Encode
        method: "POST",
        body:  'name='+name+'&message='+message,
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        }
    };
    console.log( params );
    const url = "/post";
    fetch( url, params )
    .then( (response) => {
        if( !response.ok ) {
            throw new Error('Error');
        }
        return response.json();
    })
    .then( (response) => {
        console.log( response );
        document.querySelector('#message').value = "";
    });
});

document.querySelector('#check').addEventListener('click', () => {
    const params = {  // URL Encode
        method: "POST",
        body:  '',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        }
    };
    const url = "/check";
    fetch( url, params )
    .then( (response) => {
        if( !response.ok ) {
            throw new Error('Error');
        }
        return response.json();
    })
    .then( (response) => {
        let value = response.number;
        console.log( value );

        console.log( number );
        if( number != value ) {
            const params = {
                method: "POST",
                body: 'start='+number,
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'               
                }
            }
            const url = "/read";
            fetch( url, params )
            .then( (response) => {
                if( !response.ok ) {
                    throw new Error('Error');
                }
                return response.json();
            })
            .then( (response) => {
                number += response.messages.length;
                for( let mes of response.messages ) {
                    console.log( mes );  
                    let cover = document.createElement('div');
                    cover.className = 'cover';
                    let name_area = document.createElement('span');
                    name_area.className = 'name';
                    name_area.innerText = mes.name;
                    let mes_area = document.createElement('span');
                    mes_area.className = 'mes';
                    mes_area.innerText = mes.message
                    let edit_area = document.createElement('input');
                    edit_area.type = 'text';
                    edit_area.id = 'edit_text';
                    let edit_button = document.createElement('button');
                    edit_button.innerText = '編集';
                    edit_button.type = 'button';
                    edit_button.id = 'edit';
                    edit_button.onclick = () => {
                        const newMessage = edit_area.value;
                        editPost(mes.id, newMessage); 
                    };
                    let delete_button = document.createElement('button');
                    delete_button.innerText = '削除';
                    delete_button.type = 'button';
                    delete_button.id = 'delete';
                    delete_button.onclick = () => deletePost(mes.id);

                    cover.appendChild(name_area);
                    cover.appendChild( mes_area );
                    cover.appendChild(edit_area);
                    cover.appendChild(edit_button);
                    cover.appendChild(delete_button);

                    bbs.appendChild( cover );
                }
            })
        }
    });
});

function editPost(id, newMessage) {
    const params = {
        method: "POST",
        body: 'message='+newMessage,
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        }
    };
    const url = `/edit/${id}`;
    fetch(url, params)
        .then((response) => {
            if (!response.ok) {
                throw new Error('Error');
            }
            return response.json();
        })
        .then((response) => {
            console.log( response );
            document.querySelector('#bbs').innerHTML = '';
            number = 0;
            document.querySelector('#check').click();
        });
}

function deletePost(id) {
    const params = {
        method: "POST",
        body: '',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        }
    };
    const url = `/delete/${id}`;
    fetch(url, params)
        .then((response) => {
            if (!response.ok) {
                throw new Error('Error');
            }
            return response.json();
        })
        .then((response) => {
            console.log( response );
            document.querySelector('#bbs').innerHTML = '';
            number = 0;
            document.querySelector('#check').click();
        });
}

document.querySelector("#searchButton").addEventListener("click", () => {
    const keyword = document.querySelector("#search").value;
    const params = {
        method: "POST",
        body: 'keyword='+keyword,
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        }
    };
    fetch("/search", params)
    .then( (response) => {
        if( !response.ok ) {
            throw new Error('Error');
        }
        return response.json();
    })
    .then(data => {
        bbs.innerHTML = ""; 
        for (let post of data.results) {
            let cover = document.createElement('div');
            cover.className = 'cover';
            cover.innerText = `${post.name}: ${post.message}`;
            bbs.appendChild(cover);
        }
        document.querySelector('#search').value = "";
    });
});

document.querySelector("#refreshButton").addEventListener("click", () => {
    document.querySelector('#bbs').innerHTML = ''; 
    number = 0; 
    document.querySelector('#check').click(); 
});
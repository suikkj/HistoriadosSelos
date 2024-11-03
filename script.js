document.getElementById('loginForm').addEventListener('submit', async (event) =>{
    event.preventDefault();
    const formData = new FormData(event.target);
    const data = Object.fromEntries(formData);

    const response = await fetch('/login', {
        method: 'POST',
        headers:{
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
    });

    const result = await responde.json();
    alert(result.mensagem || result.erro);

});
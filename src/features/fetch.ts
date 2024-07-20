export const fetchData = async (query = "") => {
    

    fetch('https://timtest.timenotes.io/api/v1/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },

    })
}
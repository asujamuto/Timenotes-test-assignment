import { useQuery } from '@tanstack/react-query';


export const getAuthData = async (email, password) => {
    try {
        const res = await fetch('https://timtest.timenotes.io/api/v1/login', {
            method: "POST",
            headers: {
                "Accept": "*/*",
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                email: email,
                password: password
            }),
        });

        return await res.json();
    } catch (error) {
        console.log(error);
        return { title: "error" };
    }
};

export const getTasks = async (token) => {
    const res = await fetch('https://timtest.timenotes.io/api/v1/tasks?page=1&per_page=10', {
        method: 'GET',
        headers: {
            'Authorization': token,
        },
    });
    return res.json();
};





export const saveTask = async (name: string, token: string) => {

    const info = {
        method: 'POST',
        headers:
        {
            "Content-Type": "application/json",
            "Authorization": token.toString(),
        },
        body: JSON.stringify({
            "name": name.toString()
        })
    }

    const res = await fetch('https://timtest.timenotes.io/api/v1/tasks',
        info);
    return res.json();
};



export const bookmark = async (id: number, token: string) => {

    const url_firstPart = 'https://timtest.timenotes.io/api/v1/tasks/'
    const url_lastPart = '/bookmark'
    const full_url = url_firstPart + id + url_lastPart

    const res = await fetch(full_url,{
        method: 'POST',
        headers:
        {
            "Authorization": token,
        },
    })
    return res.json();
};

export const unbookmark = async (id: number, token: string) => {

    const url_firstPart = 'https://timtest.timenotes.io/api/v1/tasks/'
    const url_lastPart = '/unbookmark'
    const full_url = url_firstPart + id + url_lastPart

    const res = await fetch(full_url,{
        method: 'POST',
        headers:
        {
            "Authorization": token,
        },
    }
);
    return res.json();
};




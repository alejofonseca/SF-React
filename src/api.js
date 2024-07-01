export const fetchData = async (route, options) => {
    const res = await fetch(route, options);
    if (!res.ok) {
        const err = await res.text();
    //console.log(JSON.parse(err));
        throw new Error(err);
    }
    
    const data = await res.json();
//console.log(data);
    return data;
};
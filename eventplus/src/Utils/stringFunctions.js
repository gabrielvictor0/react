//JS não é tipado então uma variável pode assumir vários tipos de dados
export const dateFormatDbToView = (data) => {

    data = data.substr(0, 10)//retorna apenas a data (2023-09-30)
    data = data.split("-")
    return `${data[2]}/${data[1]}/${data[0]}`;
}

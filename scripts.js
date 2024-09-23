// Selecionando elementos 
const form = document.querySelector("form")
const amount = document.getElementById("amount")
const expense = document.getElementById("expense")
const category = document.getElementById("category")

// Validando o input e o formatando para somente receber números 
amount.oninput = () => {
    let value = amount.value.replace(/\D/g, "")

    // Transformando em centavos para validar o input, dando uma melhor acessiblidade ao colocar o valor
    value = Number(value) / 100

    // Formatando o valor do input por meio da function 
amount.value = formatCurrencyBRL(value)
}

function formatCurrencyBRL(value) {
    // Retorna o valor formatado em reais.
    value = value.toLocaleString("pt-BR", {
        style: "currency",
        currency: "BRL",
    })

    return value
}

form.onsubmit = (event) => {
    event.preventDefault()
}
// Selecionando elementos do formulário 
const form = document.querySelector("form")
const amount = document.getElementById("amount")
const expense = document.getElementById("expense")
const category = document.getElementById("category")


// Selecionando a lista 
const expenseList = document.querySelector("ul") 

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

    // criando o objeto que vai capturar os dados inputados pelo user 
const newExpense = {
    id: new Date().getTime(),
    expense: expense.value, 
    category_id: category.value,
    category_name: category.options[category.selectedIndex].text,
    amount: amount.value,
    create_at: new Date(),
}

// Chamando a função que vai lançar as despesas na lista 
expenseAdd(newExpense)
}

// Criando a função que vai adicionar e formatar as despesas 
function expenseAdd(newExpense) {
    try { // Aqui criaremos os elementos que aparecerão na nossa lista 


// Criando o li e atribuindo uma classe, para adicioná-lo a ul 
const expenseItem = document.createElement("li")
expenseItem.classList.add("expense")

// Criando o ícone 
const expenseIcon = document.createElement("img")
expenseIcon.setAttribute("src", `img/${newExpense.category_id}.svg`)
expenseIcon.setAttribute("alt", newExpense.category_name)

// Criando a info da despesa 

// div + classe de estilo 
const expenseInfo = document.createElement("div")
expenseInfo.classList.add("expense-info")

// Criando o nome da despesa 

// strong 
const expenseName = document.createElement("strong")
expenseName.textContent = newExpense.expense

// Criando a categoria da despesa 
const expenseCategory = document.createElement("span")
expenseCategory.textContent = newExpense.category_name

// Adicionando nome e categoria na Div
expenseInfo.append(expenseName, expenseCategory)

// Criando o valor da despesa 
const expenseAmount = document.createElement("span")
expenseAmount.classList.add("expense-amount")
expenseAmount.innerHTML = `<small>R$</small>${newExpense.amount.toUpperCase().replace("R$", "")}`

// Criando ícone de remoção 

const removeIcon = document.createElement("img")
removeIcon.classList.add("remove-icon")
removeIcon.setAttribute("src", "img/remove.svg")
removeIcon.setAttribute("alt", "remover")

// Adicionando as informações ao item 
expenseItem.append(expenseIcon, expenseInfo, expenseAmount, removeIcon)

// Adicionando o item na lista 
expenseList.append(expenseItem)


    } catch (error) {
        alert("Não foi possível lançar essa despesa.")
        console.log(error)
    }
}
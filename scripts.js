// Selecionando elementos do formulário 
const form = document.querySelector("form")
const amount = document.getElementById("amount")
const expense = document.getElementById("expense")
const category = document.getElementById("category")


// Selecionando elementos da lista 
const expenseList = document.querySelector("ul") 
const expensesQuantity = document.querySelector("aside header p span")
const expensesTotal = document.querySelector("aside header h2")

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

// Limpa o forms 
formClear()

// atualiza os totais 
uptadeTotals()

    } catch (error) {
        alert("Não foi possível lançar essa despesa.")
        console.log(error)
    }
}

// Atualizando os totais 
function uptadeTotals(){
    try {
        // Recuperando os itens da lista 
        const items = expenseList.children // Essa propriedade mostra quantos filhos nosso camarada tem 

        // Atualiza a quantidade de itens da lista 
        expensesQuantity.textContent = `${items.length} ${items.length > 1 ? "despesas" : "despesa"} `

// variável para incrementar o total 
let total = 0

// Percorrendo os itens da lista para somar o total 
for(let item = 0; item < items.length; item++) {
const itemAmount = items[item].querySelector(".expense-amount")

// Remoção de caracteres não numéricos e substituição da , pelo .
let value = itemAmount.textContent.replace(/[^\d,]/g, "").replace(",", ".") // Esse regerx inclui todos os caracteres com excessão de , e .

// Convertendo para float 
value = parseFloat(value) // esse método admite casas decimais 

// Verificando se é um número válido 
if(isNaN(value)) {
    return alert("Não foi possível calcular o valor total, certifique-se de ter digitado um número.")
}

// Incrementa o valor total 
total += Number(value) // garantindo que será número e realizando a soma 

}

// criando a span para adicionar o R$ formatado 
const symbolBRL = document.createElement("small")
symbolBRL.textContent = "R$"

// Formata o valor e remove o R$ que será exibido pela small com estilo customizado
total = formatCurrencyBRL(total).toUpperCase().replace("R$", "")

// Limpa o conteúdo do elemento
expensesTotal.innerHTML = ""

// Adiciona o símbolo da moeda e o valor total formatado 
expensesTotal.append(symbolBRL, total)

    } catch (error) {
        alert("Não foi possível atualizar os totais")
        console.log(error)
    }
}

//Evento que captura o clique dos itens da lista 
expenseList.addEventListener("click", function(event) {
    //Verificando se o elemento clicado é o ícone de remoção
    if(event.target.classList.contains("remove-icon")) // Acessa o clique diretamente no remove-icon por meio dessa classe  
        {
// Obtendo a li pai do elemento clicado 
const item = event.target.closest(".expense") // O closest busca o pai mais próximo do elemento

// Remove o item da lista 
item.remove()
    }
    
// atualizando os totais 
uptadeTotals()

})

function formClear() {
    expense.value = ""
    category.value = ""
    amount.value = ""

    expense.focus()
}
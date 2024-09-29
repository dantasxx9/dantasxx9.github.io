let cart = [];
let total = 0;

function addToCart(item, price) {
    cart.push({ item, price });
    total += price;
    displayCart();
}

function addBeverage() {
    const refrigerante = document.getElementById("refrigerante").value;
    const tamanho = document.getElementById("tamanho").value;
    let price;

    switch (tamanho) {
        case 'Lata de 350ml':
            price = 5;
            break;
        case '1L':
            price = 8;
            break;
        case '2L':
            price = 12;
            break;
    }

    cart.push({ item: `${refrigerante} (${tamanho})`, price });
    total += price;
    displayCart();
}

function displayCart() {
    const pedidoList = document.getElementById("pedido-list");
    pedidoList.innerHTML = '';

    cart.forEach((item, index) => {
        const div = document.createElement("div");
        div.textContent = `${item.item} - R$ ${item.price.toFixed(2)}`;
        
        const removeButton = document.createElement("button");
        removeButton.textContent = "Remover";
        removeButton.onclick = () => removeFromCart(index);
        
        div.appendChild(removeButton);
        pedidoList.appendChild(div);
    });

    document.getElementById("total").textContent = `Total: R$ ${total.toFixed(2)}`;
}

function removeFromCart(index) {
    total -= cart[index].price;
    cart.splice(index, 1);
    displayCart();
}

function exibirFormularioPedido() {
    document.getElementById("formulario-pedido").style.display = "block";
}

function finalizarPedido() {
    const nome = document.getElementById("nome").value;
    const endereco = document.getElementById("endereco").value;
    const telefone = document.getElementById("telefone").value;
    const pagamento = document.getElementById("pagamento").value;
    const troco = document.getElementById("troco").value;

    let pedidoDetalhes = `Nome: ${nome}<br>Endereço: ${endereco}<br>Telefone: ${telefone}<br>Pagamento: ${pagamento}<br>Total: R$ ${total.toFixed(2)}`;
    if (troco) {
        pedidoDetalhes += `<br>Troco para: R$ ${troco}`;
    }

    document.getElementById("pedidoDetalhes").innerHTML = pedidoDetalhes;
    abrirModal();
}

function abrirModal() {
    document.getElementById("confirmModal").style.display = "block";
}

function fecharModal() {
    document.getElementById("confirmModal").style.display = "none";
    resetarPedido();
}

function resetarPedido() {
    cart = [];
    total = 0;
    displayCart();
    document.getElementById("pedidoForm").reset();
    document.getElementById("formulario-pedido").style.display = "none";
}

document.querySelector(".close").onclick = fecharModal;
window.onclick = function(event) {
    const modal = document.getElementById("confirmModal");
    if (event.target === modal) {
        fecharModal();
    }
};

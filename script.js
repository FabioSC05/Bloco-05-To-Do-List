const button = document.getElementById('criar-tarefa');
const lista = document.querySelector('ol');

function color(event) {
  const list = document.querySelectorAll('li');
  for (let index = 0; index < list.length; index += 1) {
    list[index].classList.remove('colorGray');
  }
  event.target.classList.add('colorGray');
}

function line(event) {
  event.target.classList.toggle('completed');
}

const order = localStorage;
let valor = '';
let valorDividido = '';
for (let index = 0; index < Object.keys(order).length; index += 1) {
  valor = Object.values(order).find((val, ind) => Object.keys(order)[ind] === `${index}`);
  valorDividido = valor.split('-');
  const li = document.createElement('li');
  const valueZero = valorDividido[0];
  li.innerHTML = valueZero;
  if (valorDividido[1] === 'both') {
    li.classList.add('completed');
    li.classList.add('colorGray');
    lista.appendChild(li);
    lista.lastElementChild.addEventListener('click', color);
    lista.lastElementChild.addEventListener('dblclick', line);
  } else if (valorDividido[1] === 'none') {
    lista.appendChild(li);
    lista.lastElementChild.addEventListener('click', color);
    lista.lastElementChild.addEventListener('dblclick', line);
  } else {
    li.classList.add(valorDividido[1]);
    lista.appendChild(li);
    lista.lastElementChild.addEventListener('click', color);
    lista.lastElementChild.addEventListener('dblclick', line);
  }
}

function reset() {
  const list = document.querySelectorAll('li');
  for (let index = 0; index < list.length; index += 1) {
    list[index].remove();
  }
}

const apagar = document.getElementById('apaga-tudo');
apagar.addEventListener('click', reset);

function final() {
  const list = document.querySelectorAll('li');
  for (let index = 0; index < list.length; index += 1) {
    if (list[index].classList.contains('completed')) {
      list[index].remove();
    }
  }
}

const finalizados = document.getElementById('remover-finalizados');
finalizados.addEventListener('click', final);

button.addEventListener('click', () => {
  const input = document.querySelector('input');
  const li = document.createElement('li');
  li.innerHTML = input.value;
  lista.appendChild(li);
  input.value = '';
  lista.lastElementChild.addEventListener('click', color);
  lista.lastElementChild.addEventListener('dblclick', line);

  apagar.addEventListener('click', reset);
  finalizados.addEventListener('click', final);
});

function saveAuxiliar(list, index) {
  if (list[index].classList.contains('completed') && list[index].classList.contains('colorGray')) {
    localStorage.setItem(index, `${list[index].innerHTML}-both`);
  } else if (list[index].classList.contains('completed')) {
    localStorage.setItem(index, `${list[index].innerHTML}-completed`);
  } else if (list[index].classList.contains('colorGray')) {
    localStorage.setItem(index, `${list[index].innerHTML}-colorGray`);
  } else {
    localStorage.setItem(index, `${list[index].innerHTML}-none`);
  }
}

function save() {
  const list = document.querySelectorAll('li');
  localStorage.clear();
  for (let index = 0; index < list.length; index += 1) {
    saveAuxiliar(list, index);
  }
}

const salvar = document.getElementById('salvar-tarefas');
salvar.addEventListener('click', save);

function elementUpAuxiliar(list, index) {
  const name = list[index].innerHTML;
  const li = document.createElement('li');
  if (list[index].classList.contains('completed')) {
    li.classList.add('completed');
    li.classList.add('colorGray');
  } else {
    li.classList.add('colorGray');
  }
  list[index].remove();
  li.innerHTML = name;
  li.addEventListener('click', color);
  li.addEventListener('dblclick', line);
  lista.insertBefore(li, lista.querySelectorAll('li')[index - 1]);
}

function elementUp() {
  const list = document.querySelectorAll('li');
  for (let index = 0; index < list.length; index += 1) {
    if (list[index].classList.contains('colorGray') && index !== 0) {
      elementUpAuxiliar(list, index);
    }
  }
}

function elementDownAuxiliar(list, index) {
  const name = list[index].innerHTML;
  const li = document.createElement('li');
  if (list[index].classList.contains('completed')) {
    li.classList.add('completed');
    li.classList.add('colorGray');
  } else {
    li.classList.add('colorGray');
  }
  list[index].remove();
  li.innerHTML = name;
  li.addEventListener('click', color);
  li.addEventListener('dblclick', line);
  lista.insertBefore(li, lista.querySelectorAll('li')[index + 1]);
}

function elementDown() {
  const list = document.querySelectorAll('li');
  for (let index = 0; index < list.length; index += 1) {
    if (list[index].classList.contains('colorGray') && index !== list.length - 1) {
      elementDownAuxiliar(list, index);
    }
  }
}

const moveUp = document.getElementById('mover-cima');
const moveDown = document.getElementById('mover-baixo');
moveUp.addEventListener('click', elementUp);
moveDown.addEventListener('click', elementDown);

function removed() {
  const list = document.querySelectorAll('li');
  for (let index = 0; index < list.length; index += 1) {
    if (list[index].classList.contains('colorGray')) {
      list[index].remove();
    }
  }
}

const remove = document.getElementById('remover-selecionado');
remove.addEventListener('click', removed);

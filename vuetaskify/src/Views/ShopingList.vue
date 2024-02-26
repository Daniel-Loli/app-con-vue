<template>
  <div class="container-prncipal">
    <div class="container-shopinglist">
      <h1 class="title">Shopping List</h1>
      <form class="form" @submit.prevent="agregarItem">
        <input v-model="title" class="input1" type="text" placeholder="Title">
        <input v-model="quantity" class="input2" type="number" placeholder="Quantity">
        <button class="btn" type="submit">Add to List</button>
      </form>
      <div class="container-items">
        <div v-for="item in shoppingItems" :key="item._id" class="info">
          <div>
            <strong>{{ item.quantity }}</strong>
            <p>{{ item.title }}</p>
          </div>
          <span>
            <svg @click="editarItem(item)" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" style="fill: rgba(0, 0, 0, 1);transform: ;msFilter:;">
              <path d="m18.988 2.012 3 3L19.701 7.3l-3-3zM8 16h3l7.287-7.287-3-3L8 13z"></path>
            </svg>
            <svg @click="eliminarItem(item._id)" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" style="fill: rgb(253, 210, 20);transform: ;msFilter:;">
              <path d="m16.192 6.344-4.243 4.242-4.242-4.242-1.414 1.414L10.535 12l-4.242 4.242 1.414 1.414 4.242-4.242 4.243 4.242 1.414-1.414L13.364 12l4.242-4.242z"></path>
            </svg>
          </span>
        </div>
      </div>
    </div>
    <div>
      <img src="../../public/Images/figura.png" alt="asd">
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import axios from 'axios';

const title = ref('');
const quantity = ref('');
const shoppingItems = ref([]);
const itemEditando = ref(null);

const obtenerDatos = async () => {
  try {
    const respuesta = await axios.get('http://localhost:3000/tus-datos');
    shoppingItems.value = respuesta.data;
  } catch (error) {
    console.error('Error al obtener datos del servidor:', error);
  }
};

const agregarItem = async () => {
  try {
    const nuevaCompra = {
      title: title.value,
      quantity: quantity.value,
    };

    if (itemEditando.value) {
      // Si itemEditando está presente, estamos editando
      await axios.put(`http://localhost:3000/actualizar-item/${itemEditando.value._id}`, nuevaCompra);
    } else {
      // Si itemEditando no está presente, estamos agregando
      await axios.post('http://localhost:3000/agregar-item', nuevaCompra);
    }

    // Reinicia los valores y obtén los datos actualizados
    title.value = '';
    quantity.value = '';
    obtenerDatos();

    // Reinicia el estado de itemEditando
    itemEditando.value = null;
  } catch (error) {
    console.error('Error al agregar/editar elemento:', error);
  }
};

const editarItem = (item) => {
  // Asigna los valores del item a las variables
  title.value = item.title;
  quantity.value = item.quantity;

  // Cambia el estado de itemEditando
  itemEditando.value = item;
};

const eliminarItem = async (itemId) => {
  try {
    await axios.delete(`http://localhost:3000/eliminar-item/${itemId}`);
    console.log('Elemento eliminado:', itemId);
    obtenerDatos();
  } catch (error) {
    console.error('Error al eliminar elemento:', error);
  }
};
</script>


<style >
    .container-shopinglist{
        background: #1D4350;  /* fallback for old browsers */
        background: -webkit-linear-gradient(to right, #A43931, #1D4350);  /* Chrome 10-25, Safari 5.1-6 */
        background: linear-gradient(to right, #A43931, #1D4350); /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */
        border-radius: 25px;
        width: fit-content;
        padding: 5px;

    }
    .title{
        font-size: 45px;
        color: #FFFFFF;
    }
    .form{
        display: flex;
        gap: 10px;
        padding: 20px;
    }

    
    .btn{
        color: #FFD700;
        border: 1px solid #FFD700;
        background-color: transparent;
 
    }
    .input1{
        width: 192px;
        border-radius: 3px;
        background-color: #c7c5c5;
        padding: 12px;
    }
    .input2{
        width: 64px;
        border-radius: 3px;
        background-color: #c7c5c5;
        padding: 12px;
    }
    .container-items{
        padding: 20px;
        margin-bottom: 60px;
    }
    .info{
        display: flex;
        justify-content: space-between;
        align-items: center;
        border-bottom: 1px solid #FFD700;
        
        
    }
    .info div{
        display: flex;
        gap: 10px;
        justify-content: center;
        align-items: center;

    }
    .info div p{
        color: #FFFFFF;
        font-size: 20px;
        opacity:calc(0.9)
    }
    .info div strong{
        color: #000000;
        background-color: #FFD700;
        width: auto;
        height: 24px;
        padding: 5px;
        display: flex;
        justify-content: center;
        align-items: center;
    }
    .info span{
        display: flex;
        justify-content: center;
        align-items: center;
    }
    .container-prncipal{
        display: grid;
        place-items: center;

    }
</style>
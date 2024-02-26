// server.js
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 3000;

// Define el esquema
const shoppingItemSchema = new mongoose.Schema({
  title: String,
  quantity: Number,
});

// Crea el modelo utilizando el esquema
const ShoppingItem = mongoose.model('ShoppingItem', shoppingItemSchema);

// Conéctate a MongoDB
mongoose.connect('mongodb://localhost:27017/shoppingList');

app.use(express.json());
app.use(cors());

app.get('/tus-datos', async (req, res) => {
  try {
    const items = await ShoppingItem.find();
    res.json(items);
  } catch (error) {
    console.error('Error al obtener datos:', error);
    res.status(500).json({ error: 'Error al obtener datos' });
  }
});

app.post('/agregar-item', async (req, res) => {
  const { title, quantity } = req.body;

  if (!title || !quantity) {
    return res.status(400).json({ error: 'Title y quantity son obligatorios' });
  }

  try {
    const newItem = new ShoppingItem({ title, quantity });
    await newItem.save();
    res.json(newItem);
  } catch (error) {
    console.error('Error al agregar elemento:', error);
    res.status(500).json({ error: 'Error al agregar elemento' });
  }
});

// Añade esta ruta en tu server.js o en un archivo específico para rutas
app.put('/actualizar-item/:id', async (req, res) => {
  const itemId = req.params.id;
  const { title, quantity } = req.body;

  try {
    const updatedItem = await ShoppingItem.findByIdAndUpdate(
      itemId,
      { title, quantity },
      { new: true } // Devuelve el documento actualizado
    );

    if (!updatedItem) {
      return res.status(404).json({ error: 'Elemento no encontrado' });
    }

    res.json(updatedItem);
  } catch (error) {
    console.error('Error al actualizar elemento:', error);
    res.status(500).json({ error: 'Error al actualizar elemento' });
  }
});

// Añade esta ruta en tu server.js o en un archivo específico para rutas
app.delete('/eliminar-item/:id', async (req, res) => {
  const itemId = req.params.id;

  try {
    const deletedItem = await ShoppingItem.findByIdAndDelete(itemId);

    if (!deletedItem) {
      return res.status(404).json({ error: 'Elemento no encontrado' });
    }

    res.json(deletedItem);
  } catch (error) {
    console.error('Error al eliminar elemento:', error);
    res.status(500).json({ error: 'Error al eliminar elemento' });
  }
});


app.listen(PORT, () => {
  console.log(`Servidor escuchando en el puerto ${PORT}`);
});

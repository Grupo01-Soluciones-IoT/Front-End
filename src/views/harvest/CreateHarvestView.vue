<template>
    <div class="create-harvest">
        <div class="card">
            <div class="font-semibold text-xl mb-4">Create Harvest</div>
            <form @submit.prevent="submitHarvest">
                <div class="mb-4">
                    <label for="yield" class="block text-sm font-medium">Yield</label>
                    <input type="text" v-model="harvest.yield" required class="input" />
                </div>
                <div class="mb-4">
                    <label for="condition" class="block text-sm font-medium">Condition</label>
                    <select v-model="harvest.condition" required class="input">
                        <option value="Very Bad">Very Bad</option>
                        <option value="Bad">Bad</option>
                        <option value="Normal">Normal</option>
                        <option value="Good">Good</option>
                        <option value="Excellent">Excellent</option>
                    </select>
                </div>
                <div class="mb-4">
                    <label for="urlImage" class="block text-sm font-medium">Image URL</label>
                    <select v-model="harvest.urlImage" required class="input">
                        <option v-for="image in imageOptions" :key="image" :value="image">{{ image }}</option>
                    </select>
                </div>
                <div class="mb-4">
                    <label for="month" class="block text-sm font-medium">Harvest Month</label>
                    <select v-model="harvest.month" required class="input">
                        <option value="January">January</option>
                        <option value="February">February</option>
                        <option value="March">March</option>
                        <option value="April">April</option>
                        <option value="May">May</option>
                        <option value="June">June</option>
                        <option value="July">July</option>
                        <option value="August">August</option>
                        <option value="September">September</option>
                        <option value="October">October</option>
                        <option value="November">November</option>
                        <option value="December">December</option>
                    </select>
                </div>
                <button type="submit" class="btn">Create Harvest</button>
            </form>
        </div>
    </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import apiService from '@/service/ApiService'; // Asegúrate de que la ruta sea correcta

const harvest = ref({
    id_user: Number(localStorage.getItem('userId')), // Obtener userId desde localStorage
    yield: '',
    condition: '',
    urlImage: '',
    month: '', // Cambiar date a month
    humidity: 0, // Inicializar
    temperature: 0, // Inicializar
});

// Lista de URLs de imágenes para elegir
const imageOptions = ref([
    "https://cdn.britannica.com/36/167236-050-BF90337E/Ears-corn.jpg",
    "https://www.lavanguardia.com/files/content_image_desktop_filter/files/fp/uploads/2021/07/09/60e81840d4549.r_d.2793-2793.jpeg",
    "https://upload.wikimedia.org/wikipedia/commons/0/0a/20201102.Hengnan.Hybrid_rice_Sanyou-1.6.jpg",
    // Agrega más URLs según sea necesario
]);

const generateRandomValues = () => {
    // Generar humedad entre 0% y 100%
    harvest.value.humidity = Math.floor(Math.random() * 101);
    // Generar temperatura entre 0°C y 40°C
    harvest.value.temperature = Math.floor(Math.random() * 41);
};

// Llamar a la función para generar los valores aleatorios al montar el componente
onMounted(generateRandomValues);

const submitHarvest = async () => {
    try {
        await apiService.createHarvest(harvest.value); // Asegúrate de que la función createHarvest exista
        alert('Harvest created successfully!');
        // Aquí podrías emitir un evento para actualizar el componente padre o redirigir a otra página
    } catch (error) {
        console.error('Error creating harvest:', error);
        alert('Failed to create harvest');
    }
};
</script>

<style scoped>
.input {
    width: 100%;
    padding: 8px;
    border: 1px solid #ccc;
    border-radius: 4px;
}

.btn {
    padding: 10px 15px;
    background-color: #4CAF50;
    color: white;
    border: none;
    border-radius: 4px;
    cursor: pointer;
}

.btn:hover {
    background-color: #45a049;
}
</style>

<script setup>
import { useLayout } from '@/layout/composables/layout';
import { onMounted, ref, watch, computed} from 'vue';
import apiService from '../../service/ApiService';
import CreateHarvestView from "@/views/harvest/CreateHarvestView.vue";
const { getPrimary, getSurface, isDarkTheme } = useLayout();

const chartData = ref(null);
const chartOptions = ref(null);

const items = ref([]);

const userId = Number(localStorage.getItem('userId'));

const harvests = ref([]);

const fetchHarvestData = async () => {
    try {
        const allHarvests = await apiService.getHarvestData();
        // Filtrar solo los harvests que tienen el userId
        harvests.value = allHarvests.filter(harvest => Number(harvest.id_user) === userId);
    } catch (error) {
        console.error('Error al cargar los datos de Harvest:', error);
    }
};
// Función para obtener los datos
const fetchItems = async () => {
    try {
        items.value = await apiService.getItems();
    } catch (error) {
        console.error('Error al cargar los artículos:', error);
    }
};

onMounted(fetchHarvestData);
onMounted(fetchItems);

const getStars = (condition) => {
    switch (condition) {
        case 'Very Bad':
            return 1;
        case 'Bad':
            return 2;
        case 'Normal':
            return 3;
        case 'Good':
            return 4;
        case 'Excellent':
            return 5;
        default:
            return 0;
    }
};
function setChartOptions() {
    const documentStyle = getComputedStyle(document.documentElement);
    const borderColor = documentStyle.getPropertyValue('--surface-border');
    const textMutedColor = documentStyle.getPropertyValue('--text-color-secondary');

    return {
        maintainAspectRatio: false,
        aspectRatio: 0.8,
        scales: {
            x: {
                stacked: true,
                ticks: {
                    color: textMutedColor
                },
                grid: {
                    color: 'transparent',
                    borderColor: 'transparent'
                }
            },
            y: {
                stacked: true,
                ticks: {
                    color: textMutedColor
                },
                grid: {
                    color: borderColor,
                    borderColor: 'transparent',
                    drawTicks: false
                }
            }
        }
    };
}

watch([getPrimary, getSurface, isDarkTheme], () => {
    chartData.value = setChartData();
    chartOptions.value = setChartOptions();
});
</script>

<template>
    <div class="grid grid-cols-12 gap-8">
        <div class="col-span-12 xl:col-span-12">
            <div class="card">
                <div class="font-semibold text-xl mb-4">Harvest Data</div>
                <div class="grid grid-cols-12 gap-4">
                    <div
                        v-for="harvest in harvests"
                        :key="harvest.id"
                        class="col-span-12 lg:col-span-6 xl:col-span-4"
                    >
                        <div class="card fixed-card">
                            <div class="font-semibold text-xl mb-4 truncate">{{ harvest.yield }}</div>
                            <img :src="harvest.urlImage" alt="Harvest image" class="mb-4 fixed-img" />
                            <p class="my-4">
                                Condition: {{ harvest.condition }} -
                                <i v-for="star in getStars(harvest.condition)" class="pi pi-star mx-1" :key="star"></i>
                                <i v-for="emptyStar in (5 - getStars(harvest.condition))" class="pi pi-star-o" :key="emptyStar"></i>
                            </p>
                            <p class="my-4">Humidity: <span> {{ harvest.humidity }} </span></p>
                            <p class="my-4">Temperature: {{ harvest.temperature }}</p>
                            <p class="my-4">Harvest Date: {{ harvest.date }}</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped>
/* Estilo para las tarjetas */
.fixed-carda {
    width: fluid; /* Fijar el ancho */
    height: 600px; /* Fijar el alto */
    overflow: hidden;
    display: flex;
    flex-direction: column;
    border-radius: 8px;
}

/* Imagen fija dentro de la tarjeta */
.fixed-img {
    height: 300px; /* Fijar el alto de la imagen */
    object-fit: cover; /* Asegurarse de que la imagen mantenga el aspecto */
    border-radius: 6px;
}

/* Texto truncado para que no exceda el tamaño de la tarjeta */
.truncate {
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
}

/* Limitar la descripción del texto */
.fixed-text {
    max-height: 80px;
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 3; /* Limitar a 3 líneas */
    -webkit-box-orient: vertical;
}
</style>

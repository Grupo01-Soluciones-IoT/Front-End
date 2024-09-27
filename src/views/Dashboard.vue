<script setup>
import { useLayout } from '@/layout/composables/layout';
import { ProductService } from '@/service/ProductService';
import { onMounted, ref, watch, computed} from 'vue';
import apiService from '../service/ApiService';
import HarvestView from "@/views/harvest/HarvestView.vue";
import NewsView from "@/views/harvest/NewsView.vue";

const { getPrimary, getSurface, isDarkTheme } = useLayout();

const products = ref(null);
const chartData = ref(null);
const chartOptions = ref(null);

const items = ref([]);
const currentPage = ref(1);
const itemsPerPage = 2; // Mostrar 3 elementos por página

const userId = Number(localStorage.getItem('userId'));

const harvests = ref([]); // Para almacenar los datos de HarvestData

// Función para obtener los datos de Harvest
const fetchHarvestData = async () => {
    try {
        const allHarvests = await apiService.getHarvestData(); // Llamar al servicio que obtiene los datos
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

// Calcular los elementos visibles en la página actual
const paginatedItems = computed(() => {
    const start = (currentPage.value - 1) * itemsPerPage;
    return items.value.slice(start, start + itemsPerPage);
});

// Total de páginas
const totalPages = computed(() => {
    return Math.ceil(items.value.length / itemsPerPage);
});

// Navegación de la paginación
const prevPage = () => {
    if (currentPage.value > 1) {
        currentPage.value--;
    }
};

const nextPage = () => {
    if (currentPage.value < totalPages.value) {
        currentPage.value++;
    }
};
const totalCrops = computed(() => harvests.value.length);

onMounted(fetchHarvestData);

// Ejecutar fetchItems cuando el componente se monte
onMounted(fetchItems);

onMounted(() => {
    ProductService.getProductsSmall().then((data) => (products.value = data));
    chartData.value = setChartData();
    chartOptions.value = setChartOptions();
});

function setChartData() {
    const documentStyle = getComputedStyle(document.documentElement);

    return {
        labels: ['Q1', 'Q2', 'Q3', 'Q4'],
        datasets: [
            {
                type: 'bar',
                label: 'Subscriptions',
                backgroundColor: documentStyle.getPropertyValue('--p-primary-400'),
                data: [4000, 10000, 15000, 4000],
                barThickness: 32
            },
            {
                type: 'bar',
                label: 'Advertising',
                backgroundColor: documentStyle.getPropertyValue('--p-primary-300'),
                data: [2100, 8400, 2400, 7500],
                barThickness: 32
            },
            {
                type: 'bar',
                label: 'Affiliate',
                backgroundColor: documentStyle.getPropertyValue('--p-primary-200'),
                data: [4100, 5200, 3400, 7400],
                borderRadius: {
                    topLeft: 8,
                    topRight: 8
                },
                borderSkipped: true,
                barThickness: 32
            }
        ]
    };
}
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
    <HarvestView/>
    <div class="grid grid-cols-12 gap-8 mt-5">
        <div class="col-span-12 lg:col-span-6 xl:col-span-4">
            <div class="card mb-0">
                <div class="flex justify-between mb-4">
                    <div>
                        <span class="block text-muted-color font-medium mb-4">Harvests</span>
                        <div class="text-surface-900 dark:text-surface-0 font-medium text-xl">{{ totalCrops }}</div>
                    </div>
                    <div class="flex items-center justify-center bg-orange-100 dark:bg-orange-400/10 rounded-border" style="width: 2.5rem; height: 2.5rem">
                        <i class="pi pi-sync text-orange-500 !text-xl"></i>
                    </div>
                </div>
                <span class="text-primary font-medium">52% + </span>
                <span class="text-muted-color">since last week</span>
            </div>
        </div>
        <div class="col-span-12 lg:col-span-6 xl:col-span-4">
            <div class="card mb-0">
                <div class="flex justify-between mb-4">
                    <div>
                        <span class="block text-muted-color font-medium mb-4">Crops</span>
                        <div class="text-surface-900 dark:text-surface-0 font-medium text-xl">281 (Static)</div>
                    </div>
                    <div class="flex items-center justify-center bg-cyan-100 dark:bg-cyan-400/10 rounded-border" style="width: 2.5rem; height: 2.5rem">
                        <i class="pi pi-sync text-cyan-500 !text-xl"></i>
                    </div>
                </div>
                <span class="text-primary font-medium">52 </span>
                <span class="text-muted-color">newly registered</span>
            </div>
        </div>
        <div class="col-span-12 lg:col-span-6 xl:col-span-4">
            <div class="card mb-0">
                <div class="flex justify-between mb-4">
                    <div>
                        <span class="block text-muted-color font-medium mb-4">Tasks</span>
                        <div class="text-surface-900 dark:text-surface-0 font-medium text-xl">281 (Static)</div>
                    </div>
                    <div class="flex items-center justify-center bg-cyan-100 dark:bg-cyan-400/10 rounded-border" style="width: 2.5rem; height: 2.5rem">
                        <i class="pi pi-sync text-cyan-500 !text-xl"></i>
                    </div>
                </div>
                <span class="text-primary font-medium">52 </span>
                <span class="text-muted-color">newly registered</span>
            </div>
        </div>
    </div>
    <NewsView/>
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

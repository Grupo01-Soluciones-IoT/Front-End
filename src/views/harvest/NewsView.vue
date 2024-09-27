<script setup>
import { useLayout } from '@/layout/composables/layout';
import { ProductService } from '@/service/ProductService';
import { onMounted, ref, watch, computed} from 'vue';
import apiService from '../../service/ApiService';

const { getPrimary, getSurface, isDarkTheme } = useLayout();

const products = ref(null);
const chartData = ref(null);
const chartOptions = ref(null);

const items = ref([]);
const currentPage = ref(1);
const itemsPerPage = 2; // Mostrar 3 elementos por página

const userId = Number(localStorage.getItem('userId'));

const harvests = ref([]); // Para almacenar los datos de HarvestData

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
    <div>
        <div class="flex flex-col md:flex-row gap-8 mt-8">
            <!-- Renderizar solo los elementos paginados -->
            <div v-for="item in paginatedItems" :key="item.id" class="col-span-12 lg:col-span-6 xl:col-span-4">
                <div class="card fixed-carda">
                    <div class="font-semibold text-xl mb-4 truncate">{{ item.title }}</div>
                    <img :src="item.imgUrl" alt="item image" class="mb-4 fixed-img" />
                    <Tabs value="0">
                        <TabList>
                            <Tab value="0">Description</Tab>
                            <Tab value="1">Details</Tab>
                        </TabList>
                        <TabPanels>
                            <TabPanel value="0">
                                <p class="m-0 fixed-text">{{ item.description }}</p>
                            </TabPanel>
                            <TabPanel value="1">
                                <p class="m-0">
                                    Created at: {{ new Date(item.createdAt).toLocaleString() }}
                                </p>
                            </TabPanel>
                        </TabPanels>
                    </Tabs>
                </div>
            </div>
        </div>

        <!-- Controles de paginación -->
        <div class="flex justify-center mt-4">
            <button @click="prevPage" :disabled="currentPage === 1" class="mr-4">
                Anterior
            </button>
            <button @click="nextPage" :disabled="currentPage === totalPages">
                Siguiente
            </button>
        </div>
    </div>

</template>

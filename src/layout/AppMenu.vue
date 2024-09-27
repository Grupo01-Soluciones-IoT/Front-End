<script setup>
import { ref } from 'vue';

import AppMenuItem from './AppMenuItem.vue';

const model = ref([
    {
        label: 'Home',
        items: [{ label: 'Dashboard', icon: 'pi pi-fw pi-home', to: '/dashboard' }]
    },
    {
        label: 'Profile',
        items: [
            { label: 'Edit Profile', icon: 'pi pi-fw pi-id-card', to: '/profile/edit-profile' },
            { label: 'Exit', icon: 'pi pi-fw pi-sign-out', to: '/auth/login' },
        ]
    },
    {
        label: 'Features',
        items: [
            { label: 'Harvest', icon: 'pi pi-chart-bar', to: '/harvest', class: 'rotated-icon' },
            { label: 'Crops', icon: 'pi pi-fw pi-slack', to: '/harvest/crops' },
            { label: 'Tasks', icon: 'pi pi-fw pi-list', to: '/harvest/tasks' },
            { label: 'News', icon: 'pi pi-fw pi-share-alt', to: '/harvest/news' }
        ]
    },
    {
        label: 'Documentation',
        items: [
            {
                label: 'Report Project',
                icon: 'pi pi-fw pi-book',
                url: 'https://github.com/Grupo01-Soluciones-IoT/Report-Project',
                target: '_blank'
            },
            {
                label: 'View Source',
                icon: 'pi pi-fw pi-github',
                url: 'https://github.com/Grupo01-Soluciones-IoT/Front-End',
                target: '_blank'
            }
        ]
    }
]);
</script>

<template>
    <ul class="layout-menu">
        <template v-for="(item, i) in model" :key="item">
            <app-menu-item v-if="!item.separator" :item="item" :index="i"></app-menu-item>
            <li v-if="item.separator" class="menu-separator"></li>
        </template>
    </ul>
</template>

<style lang="scss" scoped></style>

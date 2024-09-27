<script setup>
import { ref, onMounted } from 'vue';
import apiService from '../../service/ApiService'; // Importar el servicio API

// Obtener el userId del localStorage
const userId = Number(localStorage.getItem('userId'));

// Refs para los datos del perfil
const name = ref('');
const lastname = ref('');
const email = ref('');
const password = ref(''); // Este campo solo se llenará si el usuario quiere cambiarla
const phone = ref('');

// Función para cargar el perfil del usuario desde la API usando el userId
const loadUserProfile = async () => {
    try {
        // Obtener la información del usuario a partir del userId
        const users = await apiService.getUsers();
        const user = users.find((u) => Number(u.id) === userId);  // Asegurarse de comparar correctamente el ID

        // Si el usuario es encontrado, sobrescribir los campos con los datos obtenidos
        if (user) {
            name.value = user.name;
            lastname.value = user.lastname;
            email.value = user.email;
            phone.value = user.phone;
            password.value = user.password;
            // El campo de contraseña lo dejamos vacío por seguridad
        } else {
            alert('Usuario no encontrado.');
        }
    } catch (error) {
        console.error('Error al cargar el perfil del usuario:', error);
    }
};

// Función para actualizar el perfil del usuario
const updateUserProfile = async () => {
    try {
        const updatedUser = {
            name: name.value,
            lastname: lastname.value,
            email: email.value,
            password: password.value, // Solo actualizar si el usuario cambia la contraseña
            phone: phone.value,
        };

        await apiService.updateUser(userId, updatedUser); // Llamar al servicio API para actualizar
        alert('Perfil actualizado correctamente.');
    } catch (error) {
        console.error('Error al actualizar el perfil del usuario:', error);
        alert('Error al actualizar el perfil.');
    }
};

// Cargar los datos del perfil cuando el componente se monte
onMounted(loadUserProfile);
</script>

<template>
    <Fluid>
        <div class="card mt-8">
            <div class="flex flex-col md:flex-row">
                <div class="md:w-1/2 flex flex-col h-full">
                    <div class="card flex flex-col gap-4 flex-grow">
                        <div class="font-semibold text-xl items-center">Edit Profile</div>

                        <!-- Campos que se sobrescriben con los datos obtenidos -->
                        <div class="flex flex-col gap-2">
                            <label for="name1">Name</label>
                            <InputText id="name1" v-model="name" type="text" />
                        </div>

                        <div class="flex flex-col gap-2">
                            <label for="lastname1">Lastname</label>
                            <InputText id="lastname1" v-model="lastname" type="text" />
                        </div>

                        <div class="flex flex-col gap-2">
                            <label for="email1">Email</label>
                            <InputText id="email1" v-model="email" type="text" />
                        </div>

                        <div class="flex flex-col gap-2">
                            <label for="password1">Password</label>
                            <InputText id="password1" v-model="password" type="password" placeholder="Enter new password" />
                            <small>Enter your password to reset your password.</small>
                        </div>

                        <div class="flex flex-col gap-2">
                            <label for="phone1">Phone</label>
                            <InputText id="phone1" v-model="phone" type="text" />
                        </div>

                        <!-- Botón para actualizar el perfil -->
                        <Button label="Confirm" @click="updateUserProfile" :fluid="false"></Button>
                    </div>
                </div>
                <div class="w-full md:w-1/12">
                    <Divider layout="vertical" class="!hidden md:!flex"></Divider>
                </div>
                <div class="w-full md:w-5/12 flex items-center justify-center py-5">
                    <img src="../../assets/login/profile.svg" class="mb-14 w-64 shrink-0 mx-auto" alt="Profile image" />
                </div>
            </div>
        </div>
    </Fluid>
</template>

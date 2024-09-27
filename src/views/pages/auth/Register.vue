<template>
    <div class="background flex items-center justify-center min-h-screen min-w-[100vw] overflow-hidden">
        <div class="flex flex-col items-center justify-center">
            <div style="border-radius: 50px; padding: 0.2rem; background: linear-gradient(180deg, var(--primary-color) 15%, rgba(33, 150, 243, 0) 50%)">
                <div class="w-full bg-surface-0 dark:bg-surface-900 py-20 px-8 sm:px-20" style="border-radius: 47px">
                    <div class="text-center mb-8">
                        <img src="../../../assets/login/logo.svg" class="mb-8 w-36 shrink-0 mx-auto" alt="Logo de IagrOT" />
                        <span class="text-muted-color font-medium">Create an account</span>
                    </div>

                    <div>
                        <label for="name" class="block text-surface-900 dark:text-surface-0 text-xl font-medium mb-2">Name</label>
                        <InputText id="name" v-model="user.name" placeholder="Your Name" class="w-full md:w-[30rem] mb-4" required />

                        <label for="lastname" class="block text-surface-900 dark:text-surface-0 text-xl font-medium mb-2">Last Name</label>
                        <InputText id="lastname" v-model="user.lastname" placeholder="Your Last Name" class="w-full md:w-[30rem] mb-4" required />

                        <label for="email" class="block text-surface-900 dark:text-surface-0 text-xl font-medium mb-2">Email</label>
                        <InputText id="email" v-model="user.email" type="email" placeholder="Email Address" class="w-full md:w-[30rem] mb-4" required />

                        <label for="phone" class="block text-surface-900 dark:text-surface-0 text-xl font-medium mb-2">Phone</label>
                        <InputText id="phone" v-model="user.phone" type="tel" placeholder="Phone Number" class="w-full md:w-[30rem] mb-4" required />

                        <label for="password" class="block text-surface-900 dark:text-surface-0 font-medium text-xl mb-2">Password</label>
                        <Password id="password" v-model="user.password" placeholder="Password" :toggleMask="true" class="mb-4" fluid :feedback="false" required />

                        <Button label="Register" class="w-full" @click="registerUser" style="border-radius: 47px" />
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref } from 'vue';
import apiService from '../../../service/ApiService'; // Asegúrate de que la ruta sea correcta
import { useRouter } from "vue-router";

const router = useRouter();

const user = ref({
    name: '',
    lastname: '',
    email: '',
    password: '',
    phone: ''
});
const registerUser = async () => {
    try {
        await apiService.registerUser(user.value); // Asegúrate de que la función registerUser exista
        alert('Registro exitoso! Por favor inicie sesión.');
        await router.push({ name: 'login' }); // Redirigir al inicio de sesión
    } catch (error) {
        console.error('Error en el registro:', error);
        alert('Error: No se pudo registrar. Por favor, intente de nuevo.');
    }
};

</script>

<style scoped>
.background {
    background-image: url('../../../assets/login/background.png');
    background-size: cover;
    background-position: center; /* Cambiar según sea necesario */
}
</style>

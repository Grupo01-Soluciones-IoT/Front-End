<template>
    <div class="background flex items-center justify-center min-h-screen min-w-[100vw] overflow-hidden">
        <div class="flex flex-col items-center justify-center">
            <div style="border-radius: 50px; padding: 0.2rem; background: linear-gradient(180deg, var(--primary-color) 15%, rgba(33, 150, 243, 0) 50%)">
                <div class="w-full bg-surface-0 dark:bg-surface-900 py-20 px-8 sm:px-20" style="border-radius: 47px">
                    <div class="text-center mb-8">
                        <img src="../../../assets/login/logo.svg" class="mb-8 w-36 shrink-0 mx-auto" alt="Logo de IagrOT" />
                        <span class="text-muted-color font-medium">Sign in to continue</span>
                    </div>

                    <div>
                        <label for="email1" class="block text-surface-900 dark:text-surface-0 text-xl font-medium mb-2">Email</label>
                        <InputText id="email1" v-model="email" placeholder="Email Address" class="w-full md:w-[30rem] mb-4" required />

                        <label for="password1" class="block text-surface-900 dark:text-surface-0 font-medium text-xl mb-2">Password</label>
                        <Password id="password1" v-model="password" placeholder="Password" :toggleMask="true" class="mb-4" fluid :feedback="false" required />

                        <div class="flex items-center justify-between mt-2 mb-8 gap-8">
                            <div class="flex items-center">
                                <Checkbox v-model="checked" id="rememberme1" binary class="mr-2"></Checkbox>
                                <label for="rememberme1">Remember me</label>
                            </div>
                            <span class="font-medium no-underline ml-2 text-right cursor-pointer text-primary" @click="goToRegister">Sign up</span>
                        </div>
                        <Button label="Sign In" class="w-full" @click="signIn" style="border-radius: 47px" />
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue';
import apiService from '../../../service/ApiService';
import { useRouter } from "vue-router";

const router = useRouter();
const email = ref('');
const password = ref('');
const checked = ref(false);

const handleMouseMove = (event) => {
    const { clientX, clientY } = event;

    const xPos = (clientX / window.innerWidth) * 100;
    const yPos = (clientY / window.innerHeight) * 100;

    document.documentElement.style.setProperty('--bgX', `${100 - xPos}%`);
    document.documentElement.style.setProperty('--bgY', `${100 - yPos}%`);
};

const signIn = async () => {
    try {
        const user = await apiService.login(email.value, password.value);
        console.log('Login exitoso:', user);

        localStorage.setItem('userId', user.id);
        await router.push({ name: 'dashboard' });
        alert(`Bienvenido, ${user.name}`);
    } catch (error) {
        console.error('Error en el login:', error);
        alert('Error: Credenciales incorrectas');
    }
};

// Nueva función para ir al registro
const goToRegister = () => {
    router.push({ name: 'register' }); // Asegúrate de que el nombre de la ruta sea correcto
};

onMounted(() => {
    window.addEventListener('mousemove', handleMouseMove);
});

onBeforeUnmount(() => {
    window.removeEventListener('mousemove', handleMouseMove);
});
</script>

<style scoped>
.background {
    background-image: url('../../../assets/login/background.png');
    background-size: cover;
    background-position: var(--bgX, center) var(--bgY, center);
    transition: background-position 0.5s;
}
</style>

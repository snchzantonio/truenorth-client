<script setup lang="ts">
import { userToken } from '../../composables/userSession';
import { ref } from 'vue';
import { axiosClient } from './../../libs/axios';
</script>
<template>
    <v-sheet width="600" class="mx-auto">
        <v-form @submit.prevent>
            <v-container>
                <v-row>
                    <v-col cols="12">
                        <v-text-field v-model="userName" label="Username"></v-text-field>
                    </v-col>
                </v-row>
                <v-row>
                    <v-col cols="12">
                        <v-text-field v-model="userPassword" label="Password" :type="'password'"></v-text-field>
                    </v-col>
                </v-row>
                <v-row>
                    <v-col cols="12">
                        <v-btn type="submit" block class="mt-2" @click="onSubmit">Login!</v-btn>
                    </v-col>
                </v-row>
            </v-container>
        </v-form>
    </v-sheet>
</template>
<script lang="ts">
const userName = ref('');
const userPassword = ref('');

export default {
    methods: {
        async onSubmit(event: any) {
            console.log([
                userName.value,
                userPassword.value
            ]);

            const postBody = {
                "username": userName.value,
                "password": userPassword.value
            };
            try {
                const { data } = await axiosClient.post('/user/login/', postBody);
                console.log(data);
                userToken.value = data.token;
                this.$router.push({ name: 'calculator' });
            } catch (error) {
                console.log(error);
            }


        }
    }
};

</script>

<style scoped></style>
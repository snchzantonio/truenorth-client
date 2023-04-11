<script setup lang="ts">
import { userToken } from '../../composables/userSession';
import TopNavbar from './../../components/TopNavBar.vue';
import SimpleCalc from '../../components/SimpleCalc.vue';
import ComplexCalc from '../../components/ComplexCalc.vue';

import { ref } from 'vue';

const mode = ref('basic');
function onChangeMode() {
    if (mode.value === 'basic') {
        mode.value = 'extended';
        return;
    }

    mode.value = 'basic';

}
</script>

<template>
    <div>
        <TopNavbar />
        <v-btn @click="onChangeMode">Change mode</v-btn>
        <v-card v-if="mode === 'basic'">
            <SimpleCalc />
        </v-card>
        <v-card v-else>
            <ComplexCalc />
        </v-card>
        <br>
        Current mode: {{ mode }}
        <br>

    </div>
</template>
<style></style>

<script lang="ts">
export default {
    components: {
        TopNavbar
    },

    computed: {},

    mounted() {
    },

    data() {
        return {
        };
    },
};
</script>
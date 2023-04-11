<script setup lang="ts">
import { ref } from 'vue';
import { axiosClient } from './../libs/axios';
import { userToken } from '../composables/userSession';

const ComplexCalc = ref({
    mathExpression: '',
    result: 0,
});

async function calculate() {
    const postBody = {
        mathExpression: ComplexCalc.value.mathExpression,
    }
    console.log(axiosClient.defaults.headers.common);
    console.log(postBody);
    try {
        const { data } = await axiosClient.post('/operation/complex/', postBody);
        console.log(data);
        if (data.status) {
            ComplexCalc.value.result = data.value;
        }
    } catch (error) {
        console.log(error);
    }
}
</script>
<template>
    <v-container>
        <v-row>
            Math expression:
            <v-col>
                {{ ComplexCalc.mathExpression }}
            </v-col>
        </v-row>
        <v-row>
            Result: <br>
            <v-col>{{ ComplexCalc.result }}</v-col>
        </v-row>
        <v-row>
            <v-col> <v-btn @click="() => ComplexCalc.mathExpression += '7'">7</v-btn> </v-col>
            <v-col> <v-btn @click="() => ComplexCalc.mathExpression += '8'">8</v-btn> </v-col>
            <v-col> <v-btn @click="() => ComplexCalc.mathExpression += '9'">9</v-btn> </v-col>
            <v-col> <v-btn @click="() => ComplexCalc.mathExpression += '+'">+</v-btn> </v-col>
        </v-row>
        <v-row>
            <v-col><v-btn @click="() => ComplexCalc.mathExpression += '4'">4</v-btn></v-col>
            <v-col><v-btn @click="() => ComplexCalc.mathExpression += '5'">5</v-btn></v-col>
            <v-col><v-btn @click="() => ComplexCalc.mathExpression += '6'">6</v-btn></v-col>
            <v-col><v-btn @click="() => ComplexCalc.mathExpression += '-'">-</v-btn></v-col>
        </v-row>
        <v-row>
            <v-col><v-btn @click="() => ComplexCalc.mathExpression += '1'">1</v-btn></v-col>
            <v-col><v-btn @click="() => ComplexCalc.mathExpression += '2'">2</v-btn></v-col>
            <v-col><v-btn @click="() => ComplexCalc.mathExpression += '3'">3</v-btn></v-col>
            <v-col><v-btn @click="() => ComplexCalc.mathExpression += '/'">/</v-btn></v-col>
        </v-row>
        <v-row>
            <v-col><v-btn @click="() => ComplexCalc.mathExpression += '0'">0</v-btn></v-col>
            <v-col><v-btn @click="() => ComplexCalc.mathExpression += '.'">.</v-btn></v-col>
            <v-col><v-btn @click="() => ComplexCalc.mathExpression += '√'">√</v-btn></v-col>
            <v-col><v-btn @click="() => ComplexCalc.mathExpression += '*'">*</v-btn></v-col>
        </v-row>
        <v-row>
            <v-col><v-btn
                    @click="() => ComplexCalc.mathExpression = ComplexCalc.mathExpression.slice(0, -1)">Delete</v-btn></v-col>
            <v-col><v-btn @click="() => ComplexCalc.mathExpression += '('">(</v-btn></v-col>
            <v-col><v-btn @click="() => ComplexCalc.mathExpression += ')'">)</v-btn></v-col>
        </v-row>
        <v-row>
            <v-col><v-btn @click="() => {
                ComplexCalc.mathExpression = '';
            }">CLEAR!</v-btn></v-col>
            <v-col><v-btn @click="calculate">CALCULATE!</v-btn></v-col>
        </v-row>
    </v-container>
</template>
<template>
    <div class="login">
        <h1>User Test App</h1>
        <form action="" class="login__form">
            <div class="login__form__field">
                <label for="loginInput">Login</label>
                <input type="email" v-model="loginData" id="loginInput">                
            </div>
            <div class="login__form__field">
                <label for="passInput">Password</label>
                <input type="password" v-model="passwordData" id="passInput">
            </div>
            <div class="login__form__errors">
                <div class="login__form__errors__error"
                    v-for="error in validationErrors"
                    :key="error.message"
                >
                    {{ error.message }}
                </div>
            </div>
            <button type="button" @click="login()" class="login__form__submit-btn">Login</button>
        </form>
    </div>
</template>
<script lang="ts" setup>
// const axios = require('axios');
import axios from 'axios';
import router from '../../router/router';
import { reactive } from 'vue';

let loginData = '';
let passwordData = '';
let validationErrors = reactive(new Array);

const login = async () => {
    const userData = {
        login: loginData,
        password: passwordData
    }
    axios.post('http://localhost:3000/api/users/login', {
        user: userData
    })
    .then( res => {
        if (res.data.status === 'success') {
            router.push({
                name: 'user',
                params: {
                    id: res.data.userData.id
                }
            })
        } else {
            let vError = {
                message: "Your data is incorrect"
            }
            validationErrors.pop();
            validationErrors.push(vError);
        }
    })
};
</script>

<style lang="scss">
.login {
    margin: 0 auto;
    h1 {
        text-align: center;
    }
    &__form {
        width: 90%;
        margin: 0 auto;
        display: flex;
        flex-direction: column;
        padding: 10px;
        row-gap: 20px;
        &__field {
            display: flex;
            flex-direction: column;
            row-gap: 5px;
        }
        &__submit-btn {
            height: 30px;
            border-radius: 5px;
            background-color: green;
            width: 60%;
            align-self: center;
            margin-top: 20px;
        }
        input {
            background-color: transparent;
            border: 1px solid red;
            border-radius: 5px;
            height: 25px;
        }
        &__errors {
            color: red;
        }
    }
}
</style>
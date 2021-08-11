<template>
    <div>
        <h1 v-if="auth">You are already logged in. You should be able to get to the dashboard.</h1>
        <h1 v-else>Please log in</h1>
        <a href="#" @click="logout">Log out</a>
        <form class="login">
            <label class="login__label">Email</label>
            <input class="login__field" type="text" v-model="email">
            <label class="login__label">Password</label>
            <input class="login__field login__password" type="text" v-model="password">
            <a class="login__submit" href="" @click.prevent="logIn">Log In</a>
            <p>Don't have an account?<router-link to="/register">Sign up here</router-link></p>
        </form>
        <!-- <router-link to="/home">Home</router-link> -->
    </div>

</template>

<style lang="scss">
    .login {
        background-color: rgb(242, 242, 242);
        border-radius: 1.1rem;
        display: inline-block;
        position: absolute;
        left: 50%;
        top: 50%;
        transform: translate(-50%, -50%);
        padding: 1.5rem;
        font-size: 2rem;
    
        &__field, &__label {
            display: block;
            margin-bottom: 1rem;
            font-family: 'Open Sans', sans-serif;
        }

        &__password {
            margin-bottom: 2rem;
        }

        &__field {
            border: none;
            width: 100%;
            font-size: 1.5rem;
            padding: 0.7rem;
        }

        &__submit {
            display: block;
            text-decoration: none;
            background: black;
            color: white;
            text-align: center;
            padding: 0.8rem;
            font-family: 'Open Sans', sans-serif;
        }

        &__sign-up, p {
            text-decoration: none;
            font-family: 'Open Sans', sans-serif;
            font-size: 1.5rem;
        }

        p {
            margin-top: 1rem;
        }
    }
</style>

<script>
// import axios from 'axios';
export default {
    methods: {
        async logIn() {
            this.$store.dispatch('logIn', {
                email: this.email,
                password: this.password
            }).then(() => {
               this.$router.push('/');
            })
        
            // This works but we still have a break when the user refreshes. That means we need a mounted() function
            // and when this runs we need to check for cookies.
            
        },
        logout() {
            this.$store.dispatch('logOut')
        }
    },
    computed: {
        auth() {
            return this.$store.getters.isAuthenticated;
        }
    },
    data() {
        return {
            email: '',
            password: ''
        }
    },

    //mounted() {
        // axios.get('http://localhost:8000/api/user').then((response) => {
        //     console.log(response)
        // });
   // }
}
</script>
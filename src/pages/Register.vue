<template>
    <div>
        <form class="login">
            <label class="login__label">First Name</label>
            <input class="login__field" type="text" v-model="firstName">
            <label class="login__label">Last Name</label>
            <input class="login__field" type="text" v-model="lastName">
            <label class="login__label">Email</label>
            <input class="login__field" type="text" v-model="email">
            <label class="login__label">Password</label>
            <input class="login__field" type="password" v-model="password">
            <label class="login__label">Confirm Password</label>
            <input class="login__field login__field__password-confirm" type="password" v-model="passwordConfirmation">
            <a class="login__submit" href="" @click.prevent="register">Register</a>
            <p>Already have an account? <router-link to="/login" class="login__sign-up">Sign in here</router-link></p>
        </form>

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

            &__password-confirm {
                margin-bottom: 2rem;
            }
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

export default {
    methods: {
        async register() {
            this.$store.dispatch('signup', {
                first_name: this.firstName,
                last_name: this.lastName,
                email: this.email,
                password: this.password,
                password_confirmation: this.passwordConfirmation
            });
        }
    },
    data() {
        return {
            firstName: '',
            lastName: '',
            email: '',
            password: '',
            passwordConfirmation: ''
        }
    }
}
</script>
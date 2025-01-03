import { defineStore } from "pinia";

export const useUserStore = defineStore("user", {
    state: () => {
        const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
        const userData = JSON.parse(localStorage.getItem('userData')) || {
            firstName: 'Anonymous',
            lastName: '',
            email: ''
        };
        return {
            isLoggedIn,
            userData
        };
    },
    getters: {
        fullName: (state) => {
            return `${state.userData.firstName} ${state.userData.lastName}`.trim();
        },

        firstName: (state) => state.userData.firstName,

        isUserLoggedIn: (state) => state.isLoggedIn,
    },

    actions: {
        login() {
            this.isLoggedIn = true;
            localStorage.setItem('isLoggedIn', 'true');
            const storedUserData = JSON.parse(localStorage.getItem('userData'));
            if (storedUserData) {
                this.userData = storedUserData;
            }
            localStorage.setItem('userData', JSON.stringify(this.userData));
        },

        logout() {
            this.isLoggedIn = false;
            this.userData = {
                firstName: '',
                lastName: '',
                email: '',
            };
            localStorage.removeItem('isLoggedIn');
            localStorage.removeItem('userData');
        },
    },
});

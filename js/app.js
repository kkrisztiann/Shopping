var app = new Vue({
    el: '#app',
    data: {
        title: 'Bevásárló lista App',
        message: 'Hello Vue!',
        author: 'KK',
        company: 'Bajai SZC Türr István Technikum',
        termekek: [],
        termek: {},
        currentRoute: window.location.pathname,
        editmode: false
    },
    created() {
        this.frissit();
    },
    methods: {
        felvesz() {

            const requestOptions = {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    nev: this.termek.nev,
                    ar: this.termek.ar
                })
            };

            fetch("http://localhost:3000/termekek", requestOptions)
                .then(response => response.json())
                .then(data => {
                    this.ID = data.ID;
                    this.frissit();
                    this.termek = {};
                })

        },

        kivalaszt(id) {
            this.editmode = true;
            fetch("http://localhost:3000/termekek/" + id)
                .then(response => response.json())
                .then(data => (this.termek = data[0]));
        },

        megsem() {
            this.editmode = false;
            this.termek = {};
        },

        modosit(id) {
            const requestOptions = {
                method: "PATCH",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    nev: this.termek.nev,
                    ar: this.termek.ar
                })
            };

            fetch("http://localhost:3000/termekek/" + id, requestOptions)
                .then(response => response.json())
                .then(data => {
                    this.ID = data.ID;
                    this.frissit();
                    this.termek = {};
                    this.editmode = false;
                })
        },

        torles(id) {
            fetch('http://localhost:3000/termekek/ID/' + id, { method: 'DELETE' })
                .then(() => {
                    alert('Termék törölve');
                    this.frissit()
                });
        },

        frissit() {
            fetch("http://localhost:3000/termekek")
                .then(response => response.json())
                .then(data => (this.termekek = data));
        }
    }

});
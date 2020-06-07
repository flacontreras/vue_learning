<template>
  <div class="ion-page">
    <ion-header>
      <ion-toolbar>
        <ion-title>ZipInfo</ion-title>
      </ion-toolbar>
    </ion-header>
    <ion-content class="ion-padding">
      <ZipSearch v-on:get-zip="getZipInfo"/>
    </ion-content>
  </div>
</template>

<script>
import ZipSearch from '../components/ZipSearch';

export default {
  name: 'Home',
  components: {
    ZipSearch
  },
  data() {
    return {
      info: null
    }
  },
  methods: {
    async getZipInfo(zip) {
      const res = await fetch(`https://api.zippopotam.us/us/${zip}`);

      if (res.status == 404) {
        this.showAlert();
      }

      this.info = await res.json();
    },
    showAlert() {
    return this.$ionic.alertController
        .create({
            header: "Not Valid",
            message: "Please enter a valid US zipcode",
            buttons: ["OK"]
        })
        .then(a => a.present());
    }
  }
}
</script>

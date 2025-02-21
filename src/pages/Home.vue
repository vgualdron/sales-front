<template>
  <q-page class="">
    <table-product />
  </q-page>
</template>

<script>
import TableProduct from 'components/home/TableProduct.vue';

export default {
  components: {
    TableProduct,
  },
  data() {
    return {
      configCamera: {
        type: 'photo',
      },
    };
  },
  name: 'PageHome',
  computed: {
  },
};
</script>

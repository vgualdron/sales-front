<template>
  <q-page class="">
    <div class="row q-mt-md">
      <div class="col-12 text-center">
        <table-list-reports />
      </div>
    </div>
  </q-page>
</template>

<script>
import TableListReports from 'components/reportDinamic/TableListReports.vue';

export default {
  components: { TableListReports },
  data() {
    return {
    };
  },
  name: 'PageReportDinamic',
  mounted() {
  },
  methods: {
  },
};
</script>

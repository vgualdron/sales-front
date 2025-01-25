<template>
  <q-page class="">
    <table-report-deliveries />
  </q-page>
</template>

<script>
import TableReportDeliveries from 'components/reportDeliveries/TableReportDeliveries.vue';

export default {
  components: { TableReportDeliveries },
  data() {
    return {
    };
  },
  name: 'PageReportDeliveries',
};
</script>

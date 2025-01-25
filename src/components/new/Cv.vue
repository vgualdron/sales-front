<template>
  <div class="q-pa-md">
    <q-dialog
      v-model="showDialog"
      persistent
      full-width
    >
      <q-card>
        <q-card-section class="row q-pb-none">
          <div class="text-h6">HOJA DE VIDA</div>
          <q-space />
          <q-btn
            icon="close"
            flat
            round
            dense
            v-close-popup
          />
        </q-card-section>
        <q-separator />
        <q-card-section class="row q-pb-none block">
          <cv-app v-if="row.type_cv === 'pdf' && onlyTable" :id="row.id" :onlyTable="onlyTable"/>
          <cv-app v-if="row.type_cv === 'app'" :id="row.id"/>
          <cv-pdf v-else-if="row.id" :id="row.id"/>
        </q-card-section>
      </q-card>
    </q-dialog>
  </div>
</template>
<script>
import CvApp from './cv/CvApp.vue';
import CvPdf from './cv/CvPdf.vue';

export default {
  data() {
    return {
    };
  },
  props: {
    value: {
      type: Boolean,
      default: false,
    },
    row: {
      require: true,
    },
    onlyTable: {
      type: Boolean,
      default: false,
    },
  },
  computed: {
    showDialog: {
      get() {
        return this.value;
      },
      set(val) {
        this.$emit('input', val);
      },
    },
  },
  async created() {
    // await this.getItem();
  },
  methods: {
  },
  components: {
    CvApp,
    CvPdf,
  },
};
</script>
<style scoped>
  p {
    display: block;
    max-width: 640px;
    margin: auto;
  }
  .table-container {
    text-align: center;
  }
  .markup-table {
    display: block;
    max-width: 250px;
    min-width: 250px;
    margin: auto;
  }
  .z-index-btn {
    z-index: 20;
  }
  .q-card__section > .text-h6 {
    border: none;
  }
  .wrap-text {
    word-wrap: break-word;
    overflow-wrap: break-word;
    word-break: break-all;
    white-space: normal;
  }
  .div-container {
    border: solid 1px rgb(145, 140, 140);
    margin: 10px;
    padding: 5px;
    border-radius: 10px;
    width: 300px;
  }
  .q-banner {
    display: none !important;
  }
</style>

<template>
  <div class="q-pa-md">
    <q-dialog v-model="showDialog" persistent>
      <q-card style="width: 700px; max-width: 80vw;">
        <q-card-section class="row items-center q-pb-none">
          <div class="text-h6">Imprimir código de barras</div>
          <q-space />
          <q-btn icon="close" flat round dense v-close-popup />
        </q-card-section>
        <q-separator />
        <q-card-section style="max-height: 60vh" class="scroll text-center">
          <div ref="barcode">
            <div v-for="(n, index) in amount" :key="index" class="svg">
              <svg :ref="el => setRef(el, index)"></svg>
            </div>
          </div>
          <q-form @submit="onSubmit" class="row">
            <div class="col-6 q-pl-none">
              <q-input
                outlined
                v-model="reference"
                label="Referencia *"
                placeholder="Escriba la referencia"
                readonly/>
            </div>
            <div class="col-6 q-pl-sm">
              <q-input
                outlined
                v-model="amount"
                label="Cantidad *"
                placeholder="Escriba la cantidad actual"
                type="number"
                reactive-rules
                :rules="[val => val > 0 || 'Este campo es obligatorio']" />
            </div>
            <div class="col-12 text-right">
              <q-btn
                label="cancelar"
                type="reset"
                color="primary"
                :disable="isLoading"
                outline
                class="col"
                v-close-popup/>
                <q-btn
                  label="Imprimir"
                  type="submit"
                  color="primary"
                  :loading="isLoading"
                  class="col q-ml-sm" />
            </div>
          </q-form>
        </q-card-section>
      </q-card>
    </q-dialog>
  </div>
</template>
<script>
import JsBarcode from 'jsbarcode';

export default {
  data() {
    return {
      isLoading: false,
      reference: '',
      amount: 1,
      barcodeRefs: [],
    };
  },
  mounted() {
    this.reference = this.row.reference;
    this.$nextTick(() => {
      this.generateBarcodes();
    });
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
  props: {
    value: {
      type: Boolean,
      default: false,
    },
    row: {
      type: Object,
      require: true,
    },
  },
  methods: {
    async onSubmit() {
      this.printBarcode();
    },
    setRef(el, index) {
      if (el) {
        this.barcodeRefs[index] = el;
      }
    },
    generateBarcodes() {
      this.barcodeRefs.forEach((el) => {
        if (el) {
          JsBarcode(el, this.reference, {
            format: 'CODE128',
            width: 2,
            height: 50,
            displayValue: true,
          });
        }
      });
    },
    printBarcode() {
      const printWindow = window.open('', '_blank');
      printWindow.document.write('<html><body>');
      printWindow.document.write(`<svg>${this.$refs.barcode.innerHTML}</svg>`);
      printWindow.document.write('</body></html>');
      printWindow.document.close();
      printWindow.print();
    },
  },
};
</script>
<style scoped>
.svg {
  margin: 10px;
}
</style>

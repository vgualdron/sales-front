<template>
  <div class="q-pa-md">
    <q-dialog v-model="showDialog" persistent full-width full-height>
      <q-card>
        <q-card-section :class="`row items-center q-pb-none ${report.background} ${report.color}`">
          <div class="text-h6">{{ report.name }}</div>
          <q-space />
          <q-btn icon="close" flat round dense v-close-popup />
        </q-card-section>
        <q-separator />
        <q-card-section style="max-height: 80vh" class="scroll">
          <div class="row q-mt-md">
            <div class="col-12 text-center">
              <q-input
                debounce="400"
                color="primary"
                v-model="filter"
                class="q-ml-xs"
                placeholder="Buscar"
                clearable
                dense
                outlined
              >
                <template v-slot:append>
                  <q-icon name="search" />
                </template>
              </q-input>
            </div>
          </div>
          <q-table
            v-if="columns && columns.length > 0"
            :data="data"
            :columns="columns"
            row-key="id"
            :loading="isLoadingTable"
            :filter="filter"
            :filter-method="customFilterMethod"
            :pagination.sync="pagination"
            separator="cell"
            class="q-mt-md my-sticky-header-table"
            :row-class="'bg-purple'"
            :sticky-header="true"
            flat
            dense>
            <template v-if="hasPermission('reportsDinamic.export')" v-slot:top-right>
              <q-btn label="Exportar a Excel" size="sm" color="primary" @click="exportToExcel" />
            </template>
            <template v-slot:body="props">
              <q-tr :props="props">
                <q-td v-for="col in columns" :key="col.name" :props="props">
                  <template v-if="isNumericColumn(col.name)">
                    {{ formatNumber(props.row[col.name]) }}
                  </template>
                  <template v-else-if="isLinkColumn(col.name)">
                    <a
                      :href="props.row[col.name]"
                      target="_blank"
                      rel="noopener noreferrer"
                      style="color: blue; text-decoration: underline;">
                      VER
                    </a>
                  </template>
                  <template v-else>
                    {{ props.row[col.name] }}
                  </template>
                </q-td>
              </q-tr>
            </template>
            <template v-slot:bottom-row>
              <q-tr>
                <q-td v-for="col in columns" :key="col.name" colspan="1">
                  <template v-if="isNumericColumn(col.name)">
                    {{ formatNumber(calculateTotal(col.name)) }}
                  </template>
                  <template v-else>
                    -
                  </template>
                </q-td>
              </q-tr>
            </template>
          </q-table>
        </q-card-section>
      </q-card>
    </q-dialog>
  </div>
</template>
<script>
import * as XLSX from 'xlsx';
import { havePermission } from '../../helpers/havePermission';

export default {
  data() {
    return {
      isLoadingTable: false,
      itemSelected: {},
      pagination: {
        rowsPerPage: 0,
      },
      filter: '',
      isDiabledAdd: false,
      showModal: false,
      listingSelected: null,
      filteredRows: [],
    };
  },
  props: {
    value: {
      type: Boolean,
      default: false,
    },
    report: {
      type: Object,
      required: true,
    },
    data: {
      type: Array,
      required: true,
    },
    fields: {
      type: Array,
      required: true,
    },
  },
  mounted() {
    this.filteredRows = [...this.data];
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
    tableData() {
      const totalsRow = {
        id: 'totals',
        name: 'Totals',
      };
      this.columns.forEach((col) => {
        if (this.isNumericColumn(col.name)) {
          totalsRow[col.name] = this.calculateTotal(col.name);
        }
      });
      return [...this.data];
    },
    columns() {
      return this.fields;
    },
  },
  watch: {
    filter(value) {
      console.log('watch : ', value);
      if (value === '') {
        this.filteredRows = [...this.data];
      }
    },
  },
  methods: {
    customFilterMethod(rows, terms) {
      console.log('filter:', terms);

      if (!terms || terms.trim() === '') {
        // Si el filtro está vacío, devolver todas las filas
        return rows;
      }

      const filtered = rows.filter((row) => Object.keys(row).some((key) => {
        const value = row[key];
        return value !== null && value !== undefined && value.toString().toLowerCase().includes(terms.toLowerCase());
      }));

      this.filteredRows = filtered;

      return filtered;
    },
    hasPermission(value) {
      return havePermission(value);
    },
    formatText(val, length) {
      let response = val;
      if (val.length > length) {
        response = `${val.substring(0, length)}`;
      }
      return response;
    },
    exportToExcel() {
      const name = this.formatText(this.report.name, 31);
      const worksheet = XLSX.utils.json_to_sheet(this.data);
      const workbook = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(workbook, worksheet, name);
      XLSX.writeFile(workbook, `${name}.xlsx`);
    },
    isNumericColumn(columnName) {
      return columnName.startsWith('_') && this.data.every((row) => !Number.isNaN(this.parseNumber(row[columnName])) && Number.isFinite(this.parseNumber(row[columnName])));
    },
    isLinkColumn(columnName) {
      return columnName.startsWith('_LINK');
    },
    calculateFilteredTotal(rows, columnName) {
      console.log(rows);
      console.log(columnName);
      /* if (!rows || rows.length === 0) {
        return [];
      }
      return rows.reduce((sum, row) => {
        const value = this.parseNumber(row[columnName]);
        return !Number.isNaN(value) ? sum + value : sum;
      }, 0); */
    },
    calculateTotal(columnName) {
      const total = this.filteredRows.reduce((sum, row) => {
        const value = this.parseNumber(row[columnName]);
        if (!Number.isNaN(value)) {
          return sum + value;
        }
        return sum;
      }, 0);
      return (total);
    },
    parseNumber(value) {
      const valueStr = value.toString();
      const sanitizedValue = valueStr.replace(/\./g, '');
      return parseFloat(sanitizedValue);
    },
    formatNumber(value) {
      return new Intl.NumberFormat('es-ES', {
        style: 'decimal',
        maximumFractionDigits: 0,
        useGrouping: true,
      }).format(value);
    },
  },
  components: {
  },
};
</script>
<style lang="sass">
.my-sticky-header-table
  /* height or max-height is important */
  max-height: 450px

  .q-table__top,
  .q-table__bottom,
  thead tr:first-child th
    /* bg color is important for th; just specify one */
    background-color: white

  thead tr th
    position: sticky
    z-index: 1
  thead tr:first-child th
    top: 0

  /* this is when the loading indicator appears */
  &.q-table--loading thead tr:last-child th
    /* height of all previous header rows */
    top: 48px

  /* prevent scrolling behind sticky top row on focus */
  tbody
    /* height of all previous header rows */
    scroll-margin-top: 48px
</style>

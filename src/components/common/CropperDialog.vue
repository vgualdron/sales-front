<template>
  <div class="wrapper column items-center no-scroll">
    <!-- <div class="row space-between no-wrap"> -->
    <div class="column items-center no-wrap">
      <div class="row justify-between no-wrap q-mb-md" style="width: 93%">
        <q-btn round icon="rotate_left" color="primary" @click="rotateLeft()">
          <q-tooltip content-class="bg-secondary">Rotar a la izquierda</q-tooltip>
        </q-btn>
        <q-btn round icon="rotate_right" color="primary" @click="rotateRight()">
          <q-tooltip content-class="bg-secondary">Rotar a la derecha</q-tooltip>
        </q-btn>
        <q-btn round icon="settings_backup_restore" color="primary" @click="resetCropper()">
          <q-tooltip content-class="bg-secondary">Resetear</q-tooltip>
        </q-btn>
        <q-btn round icon="close" color="primary" v-close-popup>
          <q-tooltip content-class="bg-secondary">Cancelar</q-tooltip>
        </q-btn>
        <q-btn round icon="done" color="primary" @click="finish()" v-close-popup>
          <q-tooltip content-class="bg-secondary">Cortar y finalizar</q-tooltip>
        </q-btn>
      </div>
      <div class="container">
        <img :ref="id" :src="imageSrc" :id="id" alt="Image">
      </div>
      <p class="q-mt-md text-weight-bold">Preview:</p>
      <div v-if="preview" class="preview-container column items-center">
        <img class="preview" :src="destination">
      </div>
      <div v-else class="preview column items-center">
        Cargando ...
        <q-spinner size="3em" color="primary" />
      </div>
    </div>
  </div>
</template>
<script>
import Cropper from 'cropperjs';
import 'cropperjs/dist/cropper.css';

export default {
  name: 'CropperDialog',
  data() {
    return {
      cropper: {},
      destination: {},
      preview: false,
    };
  },
  props: {
    id: {
      type: String,
    },
    imageSrc: {
      type: [String, Object],
    },
    aspectRatio: {
      type: Object,
      default() {
        return {
          left: 1,
          right: 1,
        };
      },
    },
  },
  mounted() {
    this.startCropper();
  },
  methods: {
    startCropper() {
      this.cropper = new Cropper(this.$refs[this.id], {
        checkCrossOrigin: true,
        viewMode: 0,
        aspectRatio: this.aspectRatio.left / this.aspectRatio.right,
        crop: () => {
          // console.log(event.detail.x)
          // console.log(event.detail.y)
          // console.log(event.detail.width)
          // console.log(event.detail.height)
          // console.log(event.detail.rotate)
          // console.log(event.detail.scaleX)
          // console.log(event.detail.scaleY)
          this.preview = true;
          this.destination = this.cropper.getCroppedCanvas().toDataURL('image/jpeg');
        },
      });
    },
    destroyCropper() {
      this.cropper.destroy();
    },
    resetCropper() {
      this.cropper.reset();
    },
    rotateLeft() {
      this.cropper.rotate(-90);
    },
    rotateRight() {
      this.cropper.rotate(90);
    },
    finish() {
      this.$emit('destroy', this.destination);
    },
  },
};
</script>

<style lang="stylus" scoped>
  .wrapper
    max-width 80vw
    padding 10px
    @media screen and (min-width: 500px) {
      max-width 50vw
      @media screen and (min-width: 800px) {
        max-width 30vw
      }
    }
    background-color rgb(230, 230, 230)
  .container
    width 93%
    margin 3px
  .container img
    display block
    max-width 100%
    max-height 400px
  .preview-container
    width 93%
    padding 2px
    background-color #fff
    border-radius 3px
  .preview
    max-height 200px
</style>

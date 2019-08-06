<template>
  <div class="cell" :class="pieceClass" @transitionend="onTransitionEnd"></div>
</template>
<script>
const classByColor = { 1: "piece-black", 2: "piece-white" };
export default {
  props: ["color"],
  data() {
    return {
      flip: 0
    };
  },
  computed: {
    pieceClass() {
      const { flip, color } = this;
      if (color === 0) return "";
      if (flip === 0) {
        //没有翻转
        return classByColor[color];
      }
      if (flip === 1) {
        //翻转begin
        return [classByColor[3 - color], "flip"];
      } else {
        //翻转end
        return classByColor[color];
      }
    }
  },
  watch: {
    color(color, preColor) {
      if (color + preColor === 3) {
        this.flip = 1;
      }
    }
  },
  methods: {
    onTransitionEnd() {
      const change = [
        { from: 1, handler: () => (this.flip = 2) },
        {
          from: 2,
          handler: () => {
            this.flip = 0;
            this.$emit("flipEnd");
          }
        }
      ].find(({ from }) => from === this.flip);
      if (change) {
        change.handler();
      }
    }
  }
};
</script>

<style scoped>
.cell {
  float: left;
  height: 1em;
  width: 1em;
  background-color: darkgreen;
  position: relative;
  box-sizing: border-box;
  border: 1px solid white;
}
.piece-black::after,
.piece-white::after {
  content: "";
  position: absolute;
  left: 0;
  top: 0;
  right: 0;
  bottom: 0;
  width: 70%;
  height: 70%;
  margin: auto;
  border-radius: 50%;
  background: white;
  box-shadow: 0 0 3px rgba(0, 0, 0, 0.3);
  transition: transform 0.2s;
}
.piece-black::after {
  background-color: black;
  box-shadow: 0 0 3px rgba(0, 0, 0, 0.3);
}
.flip::after {
  transform: rotateY(90deg);
}
</style>

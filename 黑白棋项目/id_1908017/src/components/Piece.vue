<template>
  <div
    class="cell"
    :class="{ 1: 'piece-black', 2: 'piece-white' }[color]"
    v-on="$listeners"
  ></div>
</template>
<script>
export default {
  props: ["color"]
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
}
.piece-black::after {
  background-color: black;
  box-shadow: 0 0 3px rgba(0, 0, 0, 0.3);
}
</style>

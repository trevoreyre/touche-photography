<script>
export default {
  props: {
    width: {
      type: Number,
      default: 24,
    },
    height: {
      type: Number,
      default: 24,
    },
    viewBox: {
      type: String,
      default: "0 0 24 24",
    }
  }
};
</script>

<template>
  <svg
    xmlns="http://www.w3.org/2000/svg"
    :width="width"
    :height="height"
    :viewBox="viewBox"
  >
    <slot></slot>
  </svg>
</template>

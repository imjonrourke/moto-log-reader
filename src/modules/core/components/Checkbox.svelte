<script lang="ts">
  export let value = '';
  export let className = '';
  export let onChange = () => {};
</script>

<div class={className}>
  <label for={value}><slot /></label>
  <input
    id={value}
    name={value}
    type="checkbox"
    on:change={onChange}
  />
</div>

<style lang="scss">
  .checkbox {
    background: white;
    display: block;
    font-size: 10vmin;
    width: 1em;
    height: 1em;
    border: solid 2px grey;
    position: relative;
    cursor: pointer;
    > input {
      opacity: 0;
      position: absolute;
    }
  }

  .check {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    margin: -3px;
    clip-path: polygon(0 0, 50% 0, 100% 0, 100% 100%, 50% 100%, 0 100%);

    border: solid 4px hotpink;

    transition: 0.4s cubic-bezier(0.8, 0, 0.2, 1);
    transition-property: background-color, clip-path, border-color;
    transition-delay: 0.1s, 0s;

    input:checked + & {
      // clip-path: polygon(41% 52%, 26% 35%, 10% 51%, 37% 88%, 37% 88%, 37% 88%, 37% 88%, 37% 88%, 91% 33%, 78% 18%);
      background-color: hotpink;
      border-color: transparent;
      transition-delay: 0s;
      //clip-path: polygon(28% 38%, 41% 53%, 75% 24%, 86% 38%, 40% 78%, 15% 50%);
      clip-path: polygon(0 0, 100% 0, 100% 50%, 37.5% 50%, 37.5% 100%, 0 100%);
    }
  }
</style>
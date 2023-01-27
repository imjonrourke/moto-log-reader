<script lang="ts">
  export let value = '';
  export let className = '';
  export let checked = false;
  export let disabled = false;
  export let onChange = () => {};
  const classNames = (...classNames) => {
    return [className, ...classNames].join(' ');
  };
</script>

<div class={classNames('checkbox', className)}>
  <input
    type="checkbox"
    id={value}
    name={value}
    checked={checked}
    disabled={disabled}
    on:change={onChange}
  />
  <label for={value}>
    <span class="check"></span>
    <slot />
  </label>
</div>

<style lang="scss">
  input {
    opacity: 0;
    position: absolute;
  }
  label {
    position: relative;
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: flex-start;
    padding: calc(var(--spacingBase) / 4) var(--spacingBase);
  }
  .check {
    position: relative;
    background: white;
    //border: var(--border-size) solid var(--input--border-color);
    box-shadow: 0 0 0 var(--border-size) var(--input--border-color);
    margin: {
      right: var(--spacingBase);
    }
    input:checked + label & {
      box-shadow: 0 0 0 var(--border-size) var(--input--success);
      transition-delay: 0s;
    }
    input:disabled + label & {
      background-color: var(--background--disabled);
      border-color: var(--input--disabled);
    }
    &, &:before {
      display: block;
      width: 1em;
      height: 1em;
      transition: 0.3s cubic-bezier(0.8, 0, 0.2, 1);
    }
    &:before {
      content: '';
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      z-index: 10;
      clip-path: polygon(0 0, 50% 0, 100% 0, 100% 100%, 50% 100%, 0 100%);
      transition-property: background-color, clip-path, box-shadow, transform;
      transform: scale(1);
      input:checked + label &, input:checked + label & {
        transition-delay: 0s;
        border-color: transparent;
        box-shadow: none;
        //clip-path: polygon(
        //                0 30%,
        //                100% 30%,
        //                100% 62.5%,
        //                37.5% 62.5%,
        //                37.5% 100%,
        //                0 100%
        //);
        clip-path: polygon(
        0 15%,
        100% 15%,
        100% 47.5%,
        37.5% 47.5%,
        37.5% 85%,
        0 85%
        );
        //clip-path: polygon(
        //  0 0,
        //  100% 0,
        //  100% 32.5%,
        //  37.5% 32.5%,
        //  37.5% 70%,
        //  0 70%
        //);
        transform: scale(0.6) scaleY(-1) rotate(45deg);
        transform-origin: center;
      }
      input:checked + label & {
        background-color: var(--input--success);
      }
      input:disabled + label & {
        background-color: var(--background--disabled);
      }
    }
  }
</style>
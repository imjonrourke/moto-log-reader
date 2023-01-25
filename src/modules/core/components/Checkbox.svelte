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
    border: calc(var(--border-size) * 2) solid var(--input--border-color);
    margin: {
      right: var(--spacingBase);
    }
    input:checked + label & {
      border-color: var(--input--success);
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
      //margin: calc(var(--border-size) * -4) calc(var(--border-size) * -2);
      clip-path: polygon(0 0, 50% 0, 100% 0, 100% 100%, 50% 100%, 0 100%);
      transition-property: background-color, clip-path, border-color, transform;
      transition-delay: 0.1s, 0s;
      transform: scale(1) translate(-2px, -2px);
      input:checked + label &, input:checked + label & {
        transition-delay: 0s;
        border-color: transparent;
        clip-path: polygon(0 0, 100% 0, 100% 32.5%, 37.5% 32.5%, 37.5% 70%, 0 70%);
        transform: scale(0.6) scaleY(-1) rotate(45deg) translate(1px, 8px);
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
<script>
export default {
  name: "InputComponent",

  props: {
    error: {
      type: Array,
      required: false,
    },

    label: {
      type: String,
      required: false,
    },

    type: {
      type: String,
      default: "text",
    },

    name: {
      type: String,
      required: true,
    },

    modelValue: {
      type: String,
      required: true,
    },
  },

  emits: ["update:modelValue"],
};
</script>

<template>
  <div class="">
    <label :for="type" class="form-label fw-normal" v-if="label">{{
      label
    }}</label>
    <input
      class="form-control border-gray-1 bg-transparent text-light"
      style="height: 32px"
      :type="type"
      :name="name"
      :value="modelValue"
      @input="$emit('update:modelValue', $event.target.value)"
    />
    <div class="" style="min-height: 21px" v-if="error">
      <div class="form-error" v-for="element of error" :key="element.$uid">
        <div
          class="form-error__message text-danger fw-normal"
          style="font-size: 14px"
        >
          {{ element.$message }}
        </div>
      </div>
    </div>
  </div>
</template>

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

    remark: {
      type: String,
      required: false,
    },

    type: {
      type: String,
      default: "text",
    },

    name: {
      type: String,
      required: false,
    },

    modelValue: {
      type: String,
      required: false,
    },
  },

  emits: ["update:modelValue"],
};
</script>

<template>
  <div class="">
    <label :for="type" class="form-label fw-normal" v-if="label"
      >{{ label }}
      <span class="color-gray-1 fs-12" v-if="remark"
        >({{ remark }})</span
      ></label
    >
    <input
      class="form-control border-gray-1 bg-transparent text-light"
      style="height: 32px"
      :type="type"
      :name="name"
      :placeholder="modelValue"
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

import Vue from 'vue';

import FormOptions from '../FormOptions'

// :value="value"
// @input="$emit('input', $event.target.value)"

Vue.component("text-field-generator", {
    data: () => ({
        config: FormOptions,
    }),

    props: {
        field: {
            type: Object,
            required: true
        },
        value: [String, Number]
    },

    template: `
        <v-text-field 
            @input="$emit('input', {value: $event, model: field.model})"
            :regular="config.textFields.regular || field.regular"
            :solo="config.textFields.solo || field.solo"
            :filled="config.textFields.filled || field.filled"
            :outlined="config.textFields.outlined || field.outlined"
            :dense="config.textFields.dense || field.dense"
            :shaped="config.textFields.shapped || field.shapped"

            :autofocus="field.autofocus || false"
            :disabled="field.disabled || false"
            :readonly="field.readonly || false"
            :type="field.type || 'text'"

            :label="field.label || ''"
            :placheholder="field.placheholder || ''"

            :append-icon="field.appendIcon || ''"
            :append-outer-icon="field.appendOuterIcon || ''"
            :prepend-icon="field.prependIcon || ''"
            :prepend-inner-icon="field.prependInnerIcon || ''"
            
            :clearable="field.clearable || false"
            :clear-icon="field.clearIcon || 'fas fa-times'"

            :dark="field.dark || false"
            :color="field.color || 'primary'"
            :background-color="field.background || ''"
        ></v-text-field>
    `
});
<template>
<div>
    <v-text-field
        :value="value" 
        @input="setModel"

        :solo="config.textFields.solo"
        :solo-inverted="config.textFields.soloInverted"
        :filled="config.textFields.filled"
        :outlined="config.textFields.outlined"
        :shaped="config.textFields.shaped"
        :rounded="config.textFields.rounded"
        :dark="config.textFields.dark"
        :background-color="config.textFields.backgroundColor"
        :color="config.textFields.color"

        :append-icon="field.appendIcon"
        :prepend-icon="field.prependIcon"
        :append-outer-icon="field.appendOuterIcon"
        :prepend-inner-icon="field.prependInnerIcon"
        :clearable="field.clearable"
        :clear-icon="field.clearIcon"
        :label="field.label"
        :hint="field.hint"
        :autofocus="field.autofocus"
        :disabled="field.disabled"
        :readonly="field.readonly"
        :type="field.type"

        :rules="rules"
    ></v-text-field>
    </div>
</template>

<script>
import FormOptions from '../FormOptions'

export default {
    data: () => ({
        config: FormOptions,
        model: null,
    }),

    props: {
        field: {
            type: Object,
            required: true
        },
        value: [String, Number]
    },

    computed: {
        rules() {
            if(this.field.rules) {
                let rulesArray = new Array;
                for (const i in this.field.rules) {                    
                    switch (i) {
                        case 'max':
                            rulesArray.push(this.rulesMax(this.field.rules[i]));
                            break;
                        case 'min':
                            rulesArray.push(this.rulesMin(this.field.rules[i]));
                            break;
                        case 'maxN':
                            if(this.field.type == 'number') {
                                rulesArray.push(this.rulesMaxN(this.field.rules[i]));
                            }
                            break;
                        case 'minN':
                            if(this.field.type == 'number') {
                                rulesArray.push(this.rulesMinN(this.field.rules[i]));
                            }
                            break;
                        case 'required':
                            rulesArray.push(this.rulesRequired(this.field.rules[i]));
                            break;
                        default:
                            break;
                    }
                }
                if(this.field.type == "email") {
                    rulesArray.push(this.rulesMail())
                }
                return rulesArray;
            }
        }
    },

    mounted() {
        if(this.value) {
            this.model = this.value;
        }
    },

    methods: {
        setModel(e) {
            this.model = e;
            this.$emit('input', {value: e, model: this.field.model})
        },

        rulesMax(n) {
           if(this.model) {
               return this.model.length > n ? `Este campo no puede contener más de ${n} caracteres` : true;
           } else {
               return true;
           }
        },

        rulesMin(n) {
           if(this.model) {
               return this.model.length < n ? `Este campo debe contener al menos ${n} caracteres` : true;
           } else {
               return true;
           }
        },

        rulesMaxN(n) {
           if(this.model) {
               return Number(this.model) > n ? `Este campo no puede ser mayor a ${n}` : true;
           } else {
               return true;
           }
        },

        rulesMinN(n) {
           if(this.model) {
               return Number(this.model) < n ? `Este campo no puede ser menor a ${n}` : true;
           } else {
               return true;
           }
        },

        rulesRequired(r) {
            if(r) {
                return this.model ? true : 'Este campo es obligatorio';
            } else {
                return true;
            }
            
        },

        rulesMail() {
            if(this.model) {
                return /.+@.+\..+/.test(this.model) ? true : 'Ingrese una dirección de correo electronico valida'; 
            } else {
                return true;
            }
            
        },
    }
}
</script>

<style>

</style>
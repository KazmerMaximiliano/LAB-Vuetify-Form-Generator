<template>
    <v-form ref="form">
        <div v-if="fields">
            <v-row justify="center">
                <v-col 
                    v-for="(field, i) in form.fields" 
                    :key="i" 
                    :cols="field.col ? field.col.cols : 12"
                    :xs="field.col ? field.col.xs : 12"
                    :sm="field.col ? field.col.sm : 12"
                    :md="field.col ? field.col.md : 12"
                    :lg="field.col ? field.col.lg : 12"
                    :xl="field.col ? field.col.xl : 12"
                    class="py-0"
                >
                    <text-field-generator :field="field" :value="field.value || null" @input="setVelue"></text-field-generator>
                    
                </v-col>
            </v-row>
        </div>
    </v-form>
</template>

<script>
import TextFieldGenerator from './inputs/TextFieldGenerator'

export default {
    data: () => ({
        fields: {},
    }),

    props: {
        form: {
            type: Object,
            required: true
        }
    },

    components: {
        "text-field-generator": TextFieldGenerator
    },

    mounted() {
        this.setFields();
    },

    methods: {
        setFields() {
            for (let i = 0; i < this.form.fields.length; i++) {
                this.fields[this.form.fields[i].model] = this.form.fields[i].value || null;
            }
        },

        setVelue(e) {
            this.fields[e.model] = e.value;
        },

        reset() {
            this.$refs.form.reset();
            this.setFields();
        },

        validate() {
            this.$refs.form.validate();
        },

        submit() {
            return this.fields;
        }
    }
}
</script>
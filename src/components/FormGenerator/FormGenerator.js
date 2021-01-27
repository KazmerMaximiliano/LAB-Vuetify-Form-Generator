import Vue from 'vue';
import './inputs/TextFieldGenerator'

Vue.component('form-generator', {
    data: () => ({
        fields: null,
    }),

    props: {
        form: {
            type: Object,
            required: true
        }
    },

    template: `
        <v-form>
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
                        <text-field-generator :field="field" @input="setVelue"></text-field-generator>
                        
                    </v-col>
                </v-row>
            </div>
        </v-form>
    `,

    mounted() {
        this.setFields();
    },

    methods: {
        setFields() {
            let fields = new Object;
            for (let i = 0; i < this.form.fields.length; i++) {
                Object.defineProperty(fields, this.form.fields[i].model, {value: null, writable: true});
            }
            this.fields = fields;
        },

        setVelue(e) {
            this.fields[e.model] = e.value;
        },

        submit() {
            return this.fields;
        }
    }
});
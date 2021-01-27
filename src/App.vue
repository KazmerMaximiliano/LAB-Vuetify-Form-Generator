<template>
    <div>
        <v-app>
            <v-main>
                <Split style="height: 100vh;">
                    <SplitArea :size="50">
                        <v-container>
                            <div>
                                <v-tabs hide-slider v-model="menuTabs">
                                    <v-tab active-class="tab-menu">Vuetify Form Generator</v-tab>
                                    <v-tab active-class="tab-menu">Value</v-tab>
                                </v-tabs>
                            </div>
                            <v-card outlined class="form-card">
                                <v-card-text>
                                    <v-tabs-items v-model="menuTabs">
                                        <v-tab-item>
                                            <form-generator ref="form_gen" :form="form" class="mt-6"></form-generator>
                                            <v-row justify="center">
                                                <v-btn color="primary" @click="setData()" class="my-3">Enviar</v-btn>
                                            </v-row>
                                        </v-tab-item>
                                        <v-tab-item>
                                            {
                                                <div v-for="(field, i) in form.fields" :key="i" class="ml-4">
                                                    {{ field.model }}:
                                                    <span v-if="formData && formData[field.model]">{{ formData[field.model] }}</span>
                                                </div>
                                            }
                                            <v-divider class="my-2"></v-divider>
                                            <i>Presiona el botón "enviar" para obtener los datos</i>
                                        </v-tab-item>
                                    </v-tabs-items>
                                </v-card-text>
                            </v-card>
                        </v-container>
                    </SplitArea>
                    <SplitArea :size="50">
                        <v-container>
                            <v-card outlined min-height="90vh">
                                <v-card-title>Editor</v-card-title>
                                <v-divider></v-divider>
                                <br>
                                <v-card-text>
                                    <v-btn 
                                        color="primary" 
                                        fab 
                                        large 
                                        dark 
                                        right 
                                        absolute 
                                        style="top: 36px;"
                                        @click="saveCode()"
                                        :disabled="disabledSave"
                                    >
                                        <v-icon>fas fa-save</v-icon>
                                    </v-btn>
                                    <prism-editor v-model="code" :highlight="highlighter" line-numbers></prism-editor>
                                </v-card-text>
                            </v-card>
                        </v-container>
                        
                    </SplitArea>
                </Split>
            </v-main>
        </v-app>
        
    </div>
</template>

<script>
import { PrismEditor } from 'vue-prism-editor';
import 'vue-prism-editor/dist/prismeditor.min.css';
import { highlight, languages } from 'prismjs/components/prism-core';
import 'prismjs/components/prism-clike';
import 'prismjs/components/prism-javascript';
import 'prismjs/themes/prism-tomorrow.css';

export default {
    data: () => ({
        menuTabs: null,
        formData: null,
        form: {
            fields: [
                {
                    model: "name",
                    label: "Nombre",
                },
                {
                    model: "lastname",
                    label: "Apellido",
                },
                {
                    model: "dni",
                    label: "DNI",
                },
                {
                    model: "residence",
                    label: "Dirección",
                },
            ]
        },
        disabledSave: true,
        code: `
form: {
    fields: [
        {
            model: "name",
            label: "Nombre",
        },
        {
            model: "lastname",
            label: "Apellido",
        },
        {
            model: "dni",
            label: "DNI",
        },
        {
            model: "residence",
            label: "Dirección",
        },
    ]
},
        `
    }),

    watch: {
        code() {
            this.disabledSave = false;
        }
    },

    components: {
        PrismEditor
    },

    methods: {
        highlighter(code) {
            return highlight(code, languages.js);
        },

        saveCode() {
            let stringToCode = eval(`({${this.code}})`);
            this.form = stringToCode.form;
            this.disabledSave = true;
        },

        setData() {
            this.formData = this.$refs.form_gen.submit();
        }
    }
}
</script>

<style>
.tab-menu {
    border: 1px solid #e0e0e0;
    border-bottom: none;
}

.form-card {
    border-radius: 0px 0px 5px 5px !important;
}

.prism-editor__textarea:focus {
    outline: none;
}
</style>
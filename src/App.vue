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
                                            <v-row justify="space-around">
                                                <v-btn color="error" @click="resetForm()" class="my-3">Reiniciar</v-btn>
                                                <v-btn color="warning" @click="validateForm()" class="my-3">Validar</v-btn>
                                                <v-btn color="success" @click="setData()" class="my-3">Enviar</v-btn>
                                            </v-row>
                                        </v-tab-item>
                                        <v-tab-item>
                                            {{ formData }}
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
                            <div>
                                <v-tabs hide-slider>
                                    <v-tab active-class="tab-menu">Editor</v-tab>
                                </v-tabs>
                            </div>
                            <v-card outlined min-height="90vh" class="form-card">
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
        form: {},
        disabledSave: true,
        code: `
form: {
    fields: [
        {
            model: "name",
            label: "Nombre",
            type: "text",
            value: 'Jhon',
            col: {cols: 12, md: 6},
            rules: {
                required: true,
                min: 4,
                max: 18
            }
        },
        {
            model: "lastname",
            label: "Apellido",
            type: "text",
            value: 'Doe',
            col: {cols: 12, md: 6},
            rules: {
                required: true,
                min: 4,
                max: 18
            }
        },
        {
            model: "age",
            label: "Edad",
            type: "number",
            col: {cols: 12, md: 6},
            rules: {
                required: true,
                minN: 18,
                maxN: 99
            }
        },
        {
            model: "phone",
            label: "CEL | TEL",
            type: "number",
            col: {cols: 12, md: 6},
            rules: {
                min: 8,
                maxN: 14
            }
        },
        {
            model: "mail",
            label: "Correo Electronico",
            type: "email",
            rules: {
                required: true
            }
        },
        {
            model: "password",
            label: "Contraseña",
            type: "password",
            col: {cols: 12, md: 6},
            rules: {
                required: true,
                min: 8
            }
        },
        {
            model: "confirmPassword",
            label: "Confirmar Contraseña",
            type: "password",
            col: {cols: 12, md: 6},
            rules: {
                required: true,
                cmin: 8
            }
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

    mounted() {
        this.saveCode();
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

        resetForm() {
            this.$refs.form_gen.reset();
        },

        validateForm() {
            this.$refs.form_gen.validate();
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
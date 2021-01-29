Vue.component("checkbox-component", {
    template: `
        <div class="checkbox-component">
            <input :type="type" :id="value | namingFilter(prefixNaming)" :name="name" :value="value" :checked="shouldBeChecked"  @change="onChanged($event)" hidden >
            <label :for="value | namingFilter(prefixNaming)">{{ text }}</label>
        </div>
    `,
    model: {
        prop: "modelValue",
        event: "change"
    },
    props: {    
        modelValue: {
            default: false
        }, 
        name: {
            type: String,
            required: false,
            default: "dummy"
        },
        prefixNaming: {
            type: String,
            required: false,
            default: "dummy_"
        },
        text: {
            type: String,
            required: false,
            default: "text"
        },
        type: {
            type: String,
            required: false,
            default: "checkbox"
        },
        value: {
            type: String | Number,
            required: true,
            default: 0
        },
        trueValue: {
            default: true
        },
        falseValue: {
            default: false
        }
    },
    methods: {
        onChanged(event) {
            let isChecked = event.target.checked

            if (this.modelValue instanceof Array) {
                let newValue = [...this.modelValue]

                if (isChecked) {
                newValue.push(this.value)
                } else {
                newValue.splice(newValue.indexOf(this.value), 1)
                }

                this.$emit('change', newValue)
            } else {
                if(this.type == "radio") {
                    this.$emit('change', event.target.value)
                } else {
                    this.$emit('change', isChecked ? this.trueValue : this.falseValue)
                }
            }
            
        }
    },
    computed: {
        shouldBeChecked() {
            if (this.modelValue instanceof Array) {
              return this.modelValue.includes(this.value);
            }
            // Note that `true-value` and `false-value` are camelCase in the JS
            return this.modelValue === this.trueValue;
        }
    },
    filters: {
        namingFilter(value, prefixNaming) {
            
            return `${prefixNaming}_${value}`
        }
    }
})


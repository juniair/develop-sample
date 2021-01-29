Vue.component("select-component", {
    template:`
        <div>
            <select class="select_component" @change="updateSelect($event)">
                <option v-for="option in options" :key="option.id" :value="option.value" :selected="option.value === modelValue">{{ option.name }}</option>
            </select>
        </div>
    `,
    model: {
        prop: "modelValue",
        event:"change"
    },
    props: {
        converter: {
            type: Function,
            required:false,
            default: (value) => (value)
        },
        modelValue: {
            default: null
        },
        options: {
            type:Array,
            required:false,
            default: () => ([])
        },
        
    },
    methods: {
        updateSelect(event) {
            this.$emit('change', event.target.value)
        }
    }
})
<script>
export default {
    /**
     * @property component name
     */
    name:'ErrorMessage',

    props: {
        field_error: {
            type: String,
            default: () => '',
            required: false
        },
    },
}
</script>

<template>
    <div class="text-danger">
        {{ field_error }}
    </div>
</template>

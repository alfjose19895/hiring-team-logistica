<script>
export default {
    /**
     * @property component name
     */
    name:'ContentHeader',

    props: {
        titleHeader: {
            type: String,
            default: '',
            required: false
        },
    },
}
</script>

<template>
      <section class="content-header">
        <div class="row">
            <div class="col-md-12">
                <div class="card">
                    <div class="card-header">
                        <h3 class="card-title">{{ titleHeader }}</h3>
                    </div>
                </div>
            </div>
        </div>
    </section>
</template>

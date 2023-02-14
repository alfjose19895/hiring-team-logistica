<template>
    <select id="select2ajax-template" style="width: 100%" class="select2">
    </select>
  </template>
  
  <script>
    // import * as $ from 'jquery'
    export default {
        name: 'select2ajax',
        props: ['options', 'value','callback','placeholder'],
        template: '#select2ajax-template',
        mounted: function() {
        var vm = this;
        $(this.$el)
            // init select2
            .select2({           
                ajax: {              
                    url: this.callback,
                    dataType: 'json',
                    delay: 500,
                    cache: true,
                    data: function(params) {
                    var query = {
                        search: params.term,
                        _type: 'query',
                        q: params.term
                    };
                    // Query parameters will be ?search=[search]&_type=query&q=q
                    return query;
                    },
                    // Additional AJAX parameters go here; see the end of this chapter for the full code of this example
                    processResults: function(data) {
                    // Tranforms the top-level key of the response object from 'items' to 'results'
                    var result_data = $.map(data, function(obj) {
                        obj.text = obj.name;
                        return obj;
                    });
                    return {
                        results: result_data
                    };
                    }
                },
            placeholder: this.placeholder,
            minimumInputLength: 3,
            templateResult: function(repo) {            
                if (repo.id) {
                    return repo.text;
                }
                return repo.text;
            },
            templateSelection: function(repo) {
                if (repo.id) {
                    return repo.text;
                }
                return repo.text;
            }
            })
            .val(this.value)
            .trigger('change')
            // emit event on change.
            .on('change', function() {
            
            vm.$emit('input', this.value);
            });
        },
    
        watch: {
        value: function(value) {
            // update value
            $(this.$el).val(value);
        },
        options: function(options) {
            // update options
            $(this.$el)
            .empty()
            .select2({ data: options });
        }
        },
        destroyed: function() {
        $(this.$el)
            .off()
            .select2('destroy');
        }
    };
 
</script>
  
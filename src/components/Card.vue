<template>
    <div class="card" style="width: 18rem;">
        <div class="card-header">
            <slot name="cardHeader"></slot>
        </div>
        <div class="card-body">
            <slot name="cardBody"></slot>
        </div>
    </div>
</template>

<script>

export default {
    name: 'CardComp',
    


}
</script>

<style scoped>

</style>
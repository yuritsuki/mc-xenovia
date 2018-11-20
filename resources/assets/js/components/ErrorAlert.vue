<template>
    <div role="alert" aria-live="polite" aria-atomic="true" class="alert alert-danger my-2">
        <slot></slot>
    </div>
</template>

<script>
    export default {
        props: ['errors'],
    }
</script>
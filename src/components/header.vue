<template>
    <header>
        <h1>{{title}}</h1>
        <Button v-show="homePage" @btn-click="$emit('toggle-add-task')" :text="showAddTask ? 'Close' : 'Add task' " :color="showAddTask ? 'Red' : 'Green' "  />


    </header>
</template>


<script>
import Button from './button'

export default{
    name: 'Header',
    props: {
        title: String,
        showAddTask: Boolean
    },
    components: {
        Button
    },
    computed: {
        homePage() {
            if(this.$route.path === '/')
            {
                return true
            }
            else return false
        }
    }
}
</script> 

<style scoped>
header {
    display: flex;
    justify-content: space-between;
    align-items: center ;
    margin-bottom: 20px ;
}
h1 {
    margin-left: 37%;
}
</style>

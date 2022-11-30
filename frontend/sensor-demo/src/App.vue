<script>
import axios from 'axios'
export default{
  data(){
    return{
      sensors:[{id:1,name:"温度传感器"}]
    }
  },
   mounted(){
  this.getSensors()
 },
  methods:{
  async getSensors(){
   const res = await axios.get('https://relief527-improved-space-lamp-p6wrg749xvpf6p7q-8000.preview.app.github.dev/api/sensors/')
   this.sensors = res.data;
  },
   async deleteSensor(sensor){
   const res = await axios.delete('https://relief527-improved-space-lamp-p6wrg749xvpf6p7q-8000.preview.app.github.dev/api/sensors/'+sensor.id)
   this.getSensors();
},

    async addSensor(){
     await axios.post('https://relief527-improved-space-lamp-p6wrg749xvpf6p7q-8000.preview.app.github.dev/api/sensors/',
    {
     name: "New Sensor"
    }) 
     this.getSensors();
 }
}

}
</script>

<template>
  <button @click="getSensors">Get All Sensors</button>
  <button @click="addSensor">Add One Sensor</button>
  <ul>
    <li v-for="sensor in sensors">
      {{sensor.id}} - {{sensor.name}}
      <button @click="deleteSensor(sensor)">x</button>
    </li>
  </ul>
</template>

<style scoped>

</style>